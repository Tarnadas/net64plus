import winProcess, { Process } from 'winprocess'

import * as fs from 'fs'
import * as path from 'path'

/**
 * An Emulator object represents the connection
 * to the loaded emulator.
 */
export class Emulator {
  public baseAddress: number

  private process: Process

  /**
   * Emulator constructor.
   *
   * @param {number} processId - Process ID to load
   * @param {number} characterId - Character ID from settings
   */
  constructor (processId: number, characterId: number) {
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

    const b = Buffer.allocUnsafe(1)
    b.writeUInt8(characterId + 1, 0)
    this.writeMemory(0xFF5FF3, b) // character ID
    b.writeUInt8(0, 0)
    this.writeMemory(0xFF5FFC, b) // isServer flag
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
    return this.process.readMemory(this.baseAddress + offset, length)
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

  /**
   * Write server flag to memory.
   * There must always be one user in charge of various decisions for minigames.
   *
   * @param {Buffer} isServer - Server flag to write
   */
  public setServerFlag (isServer: Buffer): void {
    this.writeMemory(0xFF5FFC, isServer)
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
  }

  /**
   * Displays a chat message in-game.
   *
   * @param {string} message - Message to display
   * @param {number} msgLength - Message length
   */
  public displayChatMessage (message: string, msgLength: number) {
    const messageBuffer = Buffer.from(message)
    const triggerMessage = Buffer.alloc(4)
    const chatMessage = Buffer.alloc(24)
    try {
      messageBuffer.copy(chatMessage, 0, 0, msgLength)
      chatMessage.swap32()
      this.writeMemory(0xFF7680, triggerMessage)
      this.writeMemory(0xFF7684, chatMessage)
    } catch (err) {
      // TODO
      console.error(err)
    }
  }
}
