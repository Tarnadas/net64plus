import { snapshot } from 'process-list'
import * as parse from 'csv-parse'

import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import { spawn } from 'child_process'

import { connector, deleteEmulator } from '.'
import { FilteredEmulator, Position } from '../models/Emulator.model'
import { testEmulatorPid, TestProcess } from '../models/Emulator.mock'
import { buf2hex } from '../utils/Buffer.util'
import winprocess, { Process } from '../declarations/winprocess'

const tasklist = promisify(snapshot)
let winProcess: winprocess
if (process.platform === 'win32') {
  winProcess = require('winprocess')
}

enum ConnectionFlag {
  IS_DISCONNECTED = 0,
  IS_SERVER = 1,
  IS_CONNECTED = 2
}

/**
 * An Emulator object represents the connection
 * to the loaded emulator.
 */
export class Emulator {
  public baseAddress: number

  public inGameChatEnabled = false

  private process: Process

  public static async updateEmulators () {
    let emulators: FilteredEmulator[] = []
    try {
      emulators = await this.getEmulatorsFromTasklist()
    } catch (err) {
      emulators = await this.getEmulatorsFromNativeNodeBinaries()
    }
    connector.updateEmulators(emulators)
  }

  private static async getEmulatorsFromTasklist (): Promise<FilteredEmulator[]> {
    return (await Promise.all((await new Promise<string[][]>((resolve, reject) => {
      try {
        const tasklist = spawn('tasklist', ['/FO', 'CSV', '/NH'])
        let stdout = ''
        tasklist.stdout.on('data', data => {
          stdout += data.toString()
        })
        tasklist.stderr.on('data', data => {
          console.error(`tasklist stderr: ${data}`)
        })
        tasklist.on('error', err => reject(err))
        tasklist.on('close', code => {
          if (code !== 0) {
            console.warn(`tasklist process exited with code ${code}`)
            return
          }
          parse(stdout, {}, (err: Error | undefined, data: string[][]) => {
            if (err) reject(err)
            resolve(data)
          })
        })
      } catch (err) {
        console.error(err)
        reject(err)
      }
    }))
      .filter((process: string[]) => process[0].match(/project64/i))
      .map(process =>
        new Promise<string[]>((resolve, reject) => {
          const tasklist = spawn('tasklist', ['/FI', `PID eq ${process[1]}`, '/FO', 'CSV', '/NH', '/V'])
          let stdout = ''
          tasklist.stdout.on('data', data => {
            stdout += data.toString()
          })
          tasklist.stderr.on('data', data => {
            console.error(`tasklist stderr: ${data}`)
          })
          tasklist.on('close', code => {
            if (code !== 0) {
              console.warn(`tasklist process exited with code ${code}`)
            }
            parse(stdout, {}, (err: Error | undefined, data: string[][]) => {
              if (err) reject(err)
              if (data.length === 0) reject(new Error(`tasklist couldn't find process with PID ${process[1]}`))
              resolve(data[0])
            })
          })
        })
      )))
      .map((process: string[]) => ({
        name: process[0],
        pid: parseInt(process[1]),
        windowName: process[8]
      }))
  }

  private static async getEmulatorsFromNativeNodeBinaries (): Promise<FilteredEmulator[]> {
    return (await tasklist({
      name: true,
      pid: true
    }))
      .filter(({ name }: FilteredEmulator) => name.match(/project64/i))
  }

  /**
   * Emulator constructor.
   *
   * @param {number} processId - Process ID to load
   * @param {number} characterId - Character ID from settings
   * @param {boolean} [inGameChatEnabled=false] - Whether in game chat should be enabled
   */
  constructor (processId: number, characterId: number, inGameChatEnabled = false) {
    this.inGameChatEnabled = inGameChatEnabled
    this.process = processId === testEmulatorPid ? new TestProcess() : winProcess.Process(processId)
    this.process.open()
    this.baseAddress = -1
    for (let i = 0x00000000; i <= 0x72D00000; i += 0x1000) {
      const buf1 = this.process.readMemory(i, 4)
      if (typeof buf1 !== 'object') continue
      const val1 = buf1.readUInt32LE(0)
      if (val1 !== 0x3C1A8032) continue
      const buf2 = this.process.readMemory(i + 4, 4)
      if (typeof buf2 !== 'object') continue
      const val2 = buf2.readUInt32LE(0)
      if (val2 !== 0x275A7650) continue
      this.baseAddress = i
    }
    if (!this.checkMemory()) {
      throw new Error('Memory check failed')
    }
    this.patchMemory(characterId)
    connector.connectEmulator()
  }

  private checkMemory (): boolean {
    try {
      this.readMemory(0xFF5FF0, 0x10)
      return true
    } catch (err) {}
    return false
  }

  private async patchMemory (characterId: number): Promise<void> {
    const basePath = process.env.NODE_ENV === 'test' ? './build/patches' : './patches'
    const patches = fs.readdirSync(basePath)
    const patchBuffersPromise: Promise<{patchId: number, data: Buffer}>[] = []
    for (const patch of patches) {
      patchBuffersPromise.push(
        new Promise((resolve, reject) => {
          fs.readFile(path.join(basePath, patch), (err, data) => {
            if (err) reject(err)
            resolve({
              patchId: parseInt(patch, 16),
              data
            })
          })
        })
      )
    }
    const patchBuffers = await Promise.all(patchBuffersPromise)
    for (const patchBuffer of patchBuffers) {
      this.writeMemory(patchBuffer.patchId, patchBuffer.data)
    }

    this.changeCharacter(characterId)
    this.reset()
  }

  /**
   * @param {number} offset - Offset
   * @param {Buffer} buffer - Buffer
   */
  public writeMemory (offset: number, buffer: Buffer) {
    this.process.writeMemory(this.baseAddress + offset, buffer)
  }

  /**
   * Reads memory.
   *
   * @param {number} offset - Offset to read from
   * @param {number} length - How many
   * @returns {Buffer} Memory buffer
   */
  public readMemory (offset: number, length: number): Buffer {
    const memory = this.process.readMemory(this.baseAddress + offset, length)
    if (memory instanceof Buffer) {
      return memory
    }
    deleteEmulator()
    // let errorMessage = 'An error occured. Please double check whether your memory is set to 16MB and/or try starting Net64+ and PJ64 with admin privileges'
    let errorMessage = 'An unknown error occured'
    switch (memory) {
      case 6:
        errorMessage = 'Insufficient permission to read memory. Try starting Net64+ with admin privileges'
        break
      case 299:
        errorMessage = 'Your memory is not set to 16MB. You are either not using the shipped emulator or you did not restart the emulator after chaning your settings to 16MB'
        break
    }
    connector.setEmulatorError(errorMessage)
    throw new Error(errorMessage)
  }

  public reset (): void {
    this.setGameMode(1)
    this.setConnectionFlag(2)
    const buffer = Buffer.alloc(0x1C)
    for (let i = 0; i < 24; i++) {
      this.writeMemory(0xFF7800 + 0x100 * i, buffer)
    }
  }

  /**
   * Set player ID after successfull server handshake.
   *
   * @param {number} playerId - Player ID to send
   */
  public setPlayerId (playerId: number): void {
    const playerIdBuffer = Buffer.allocUnsafe(1)
    playerIdBuffer.writeUInt8(playerId, 0)
    this.writeMemory(0xFF7703, playerIdBuffer)
  }

  public setConnectionFlag (connectionFlag: ConnectionFlag): void {
    const tokenBuffer = Buffer.allocUnsafe(1)
    tokenBuffer.writeUInt8(connectionFlag, 0)
    this.writeMemory(0xFF5FFC, tokenBuffer)
  }

  public setGameMode (gameMode: number): void {
    const gameModeBuffer = Buffer.from(new Uint8Array([gameMode]).buffer as ArrayBuffer)
    const emptyBuffer = Buffer.alloc(0xC)
    emptyBuffer.writeUInt8(gameMode, 6)
    this.writeMemory(0xFF5FF7, gameModeBuffer)
    this.writeMemory(0xFF7710, emptyBuffer)
    this.writeMemory(0xFF7810, emptyBuffer)
    connector.consoleInfo('Changed Gamemode. 0xFF5FF0: ', buf2hex(this.readMemory(0xFF5FF0, 0x10)))
  }

  /**
   * Writes new character ID into memory.
   *
   * @param {number} characterId - Character ID to write to
   */
  public changeCharacter (characterId: number): void {
    const b = Buffer.allocUnsafe(1)
    b.writeUInt8(characterId + 1, 0)
    this.writeMemory(0xFF5FF3, b)
    if (process.env.NODE_ENV === 'development') {
      connector.consoleInfo(`Switched character to ID ${characterId}`)
    }
  }

  /**
   * Displays a chat message in-game.
   *
   * @param {string} message - Message to display
   */
  public displayChatMessage (message: string) {
    const messageBuffer = Buffer.from(message)
    const triggerMessage = Buffer.alloc(4)
    const chatMessage = Buffer.alloc(24)
    try {
      messageBuffer.copy(chatMessage, 0, 0, Math.min(24, chatMessage.length))
      chatMessage.swap32()
      this.writeMemory(0xFF7680, triggerMessage)
      this.writeMemory(0xFF7684, chatMessage)
    } catch (err) {
      // TODO
      console.error(err)
    }
  }

  public getPlayerRotation (): number {
    return this.readMemory(0xFF7709, 1).readUInt8(0)
  }

  public getPlayerPositions (): {self: Position, positions: (Position | null)[]} {
    const positions: (Position | null)[] = new Array(24).fill(null)
    const playerId = this.readMemory(0xFF7703, 1).readUInt8(0)
    const x = this.readMemory(0xFF7706, 2).readInt16LE(0)
    const y = this.readMemory(0xFF770A, 2).readInt16LE(0)
    const rotation = this.readMemory(0xFF7708, 2).readUInt16LE(0)
    const self = {
      x,
      y,
      rotation
    }
    for (let offset = 0xFF7800, i = 0; offset < 0xFF9100; offset += 0x100, i++) {
      if (playerId === i + 1) {
        positions[i] = null
      } else {
        const x = this.readMemory(offset + 6, 2).readInt16LE(0)
        const y = this.readMemory(offset + 0xA, 2).readInt16LE(0)
        const rotation = this.readMemory(offset + 8, 2).readUInt16LE(0)
        positions[i] = {
          x,
          y,
          rotation
        }
      }
    }
    return {self, positions}
  }
}
