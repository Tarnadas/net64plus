import winProcess from 'winprocess'

import fs from 'fs'
import path from 'path'

export default class Emulator {
  constructor (processId) {
    this.process = winProcess.Process(processId)
    console.log(this.process)
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
    const basePath = './patches'
    const patches = fs.readdirSync(basePath)
    for (const patch of patches) {
      this.writeMemory(parseInt(patch, 16), fs.readFileSync(path.join(basePath, patch)))
    }
    const b = Buffer.allocUnsafe(1)
    b.writeUInt8(1, 0)
    this.writeMemory(0x365FF3, b, false) // character ID
    this.writeMemory(0x365FFC, b, false) // isServer flag
    this.writeMemory(0x367703, b, false) // player ID
    this.process.close()
  }
  writeMemory (offset, buffer, shouldOpen = true) {
    if (shouldOpen) {
      this.process.open()
      this.process.writeMemory(this.base + offset, buffer)
      this.process.close()
    } else {
      this.process.writeMemory(this.base + offset, buffer)
    }
  }
}
