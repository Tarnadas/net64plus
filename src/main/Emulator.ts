import winProcess, { Process } from 'winprocess'

import * as fs from 'fs'
import * as path from 'path'

import { connector, deleteEmulator } from '.'
import { buf2hex } from '../utils/Buffer.util'

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

  /**
   * Emulator constructor.
   *
   * @param {number} processId - Process ID to load
   * @param {number} characterId - Character ID from settings
   * @param {boolean} [inGameChatEnabled=false] - Whether in game chat should be enabled
   */
  constructor (processId: number, characterId: number, inGameChatEnabled = false) {
    this.inGameChatEnabled = inGameChatEnabled
    this.process = winProcess.Process(processId)
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
    this.patchMemory(characterId)
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
    connector.setEmulatorError('Insufficient permission to read memory. Try starting Net64+ with admin privileges')
    throw new Error('Insufficient permission')
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
}
