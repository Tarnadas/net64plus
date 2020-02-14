import { FilteredEmulator } from './Emulator.model';
import { Process } from '../declarations/winprocess';

export const testEmulatorPid = -1337

export const testEmulator: FilteredEmulator = {
  name: 'Test Emu',
  pid: testEmulatorPid,
  windowName: 'Test Super Mario 64 - Project64'
}

const MEMORY_SIZE = 0xFFFFFF
const PLAYER_POS_X_OFFSET = 0xFF7706
const PLAYER_POS_Y_OFFSET = 0xFF770A
const PLAYER_ROTATION_OFFSET = 0xFF7708
const PLAYER_COURSE_OFFSET = 0xFF770F

export class TestProcess implements Process {
  private memory = Buffer.alloc(MEMORY_SIZE)

  constructor() {
    this.memory.writeUInt32LE(0x3C1A8032, 0)
    this.memory.writeUInt32LE(0x275A7650, 4)
    setInterval(this.updatePlayerLocation.bind(this), 500)
  }

  private updatePlayerLocation () {
    for (let offset = 0; offset <= 0x100; offset += 0x100) {
      this.memory.writeInt16LE((Math.abs(this.memory.readInt16LE(PLAYER_POS_X_OFFSET + offset)) - 1), PLAYER_POS_X_OFFSET + offset)
      this.memory.writeInt16LE((Math.abs(this.memory.readInt16LE(PLAYER_POS_Y_OFFSET + offset)) - 1), PLAYER_POS_Y_OFFSET + offset)
      this.memory.writeUInt16LE(((this.memory.readUInt16LE(PLAYER_ROTATION_OFFSET + offset) + 0x80) % 0xFFFF), PLAYER_ROTATION_OFFSET + offset)
      this.memory.writeUInt8(4, PLAYER_COURSE_OFFSET + offset)
    }
  }

  public open () {}

  public readMemory (offset: number, length: number): number | Buffer {
    let buffer: Buffer
    if (offset + length > MEMORY_SIZE) {
      buffer = Buffer.alloc(length)
    } else {
      buffer = this.memory.slice(offset, offset + length)
    }
    return buffer
  }

  public writeMemory (offset: number, buffer: Buffer) {
    this.memory.fill(buffer, offset, offset + buffer.length)
  }
}