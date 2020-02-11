import { FilteredEmulator } from './Emulator.model';
import { Process } from '../declarations/winprocess';

export const testEmulatorPid = -1337

export const testEmulator: FilteredEmulator = {
  name: 'Test Emu',
  pid: testEmulatorPid,
  windowName: 'Test Super Mario 64 - Project64'
}

const MEMORY_SIZE = 0xFFFFFF;
const PLAYER_DATA_OFFSET = 0xFF7706;
const PLAYER_DATA_OFFSET_END = 0xFF770C;

export class TestProcess implements Process {
  private memory = Buffer.alloc(MEMORY_SIZE)

  constructor() {
    this.memory.writeUInt32LE(0x3C1A8032, 0)
    this.memory.writeUInt32LE(0x275A7650, 4)
    setInterval(this.updatePlayerLocation.bind(this), 500)
  }

  private updatePlayerLocation () {
    for (let i = PLAYER_DATA_OFFSET; i < PLAYER_DATA_OFFSET_END; i++) {
      this.memory.writeUInt8((this.memory.readUInt8(i) + 1) % 255, i)
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