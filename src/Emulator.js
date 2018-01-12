import winProcess from 'winprocess'

import fs from 'fs'
import path from 'path'

/**
 * An Emulator object represents the connection
 * to the loaded emulator.
 * @module Emulator
 */
export default class Emulator {
  /**
   * Emulator constructor.
   *
   * @param {number} processId - Process ID to load
   * @param {number} characterId - Character ID from settings
   */
  constructor (processId, characterId) {
    this.process = winProcess.Process(processId)
    this.process.open()
    this.base = -1
    for (let i = 0x00000000; i <= 0x72D00000; i += 0x1000) {
      const buf1 = this.process.readMemory(i, 4)
      if (typeof buf1 !== 'object') continue
      const val1 = buf1.readUInt32LE(0)
      if (val1 !== 0x3C1A8032) continue
      const buf2 = this.process.readMemory(i + 4, 4)
      if (typeof buf2 !== 'object') continue
      const val2 = buf2.readUInt32LE(0)
      if (val2 !== 0x275A7650) continue
      this.base = i
    }
    const basePath = process.env.NODE_ENV === 'test' ? './build/patches' : './patches'
    const patches = fs.readdirSync(basePath)
    for (const patch of patches) {
      this.writeMemory(parseInt(patch, 16), fs.readFileSync(path.join(basePath, patch)))
    }
    const b = Buffer.allocUnsafe(1)
    b.writeUInt8(characterId + 1, 0)
    this.writeMemory(0xFF5FF3, b) // character ID
    b.writeUInt8(0, 0)
    this.writeMemory(0xFF5FFC, b) // isServer flag
  }
  writeMemory (offset, buffer) {
    this.process.writeMemory(this.base + offset, buffer)
  }

  /**
   * Reads memory.
   *
   * @param {number} offset - Offset to read from
   * @param {number} length - How many
   * @returns {Buffer} Memory buffer
   */
  readMemory (offset, length) {
    return this.process.readMemory(this.base + offset, length)
  }

  /**
   * Set player ID after successfull server handshake.
   *
   * @param {number} playerId - Player ID to send
   */
  setPlayerId (playerId) {
    this.writeMemory(0xFF7703, playerId)
  }

  /**
   * Write server flag to memory.
   * There must always be one user in charge of various decisions for minigames.
   *
   * @param {number} isServer - Server flag to write
   */
  setServerFlag (isServer) {
    this.writeMemory(0xFF5FFC, isServer)
  }

  /**
   * Writes new character ID into memory.
   *
   * @param {number} characterId - Character ID to write to
   */
  changeCharacter (characterId) {
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
  displayChatMessage (message, msgLength) {
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
