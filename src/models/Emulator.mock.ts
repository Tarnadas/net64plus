import { FilteredEmulator } from './Emulator.model';
import { Process } from '../declarations/winprocess';

export const testEmulatorPid = -1337

export const testEmulator: FilteredEmulator = {
  name: 'Test Emu',
  pid: testEmulatorPid,
  windowName: 'Test Super Mario 64 - Project64'
}

const MEMORY_SIZE = 0xFFFFFF;

export class TestProcess implements Process {
  private memory = Buffer.alloc(MEMORY_SIZE)

  constructor() {
    this.memory.writeUInt32LE(0x3C1A8032, 0)
    this.memory.writeUInt32LE(0x275A7650, 4)
  }

  public open() {}

  public readMemory(offset: number, length: number): number | Buffer {
    let buffer: Buffer
    if (offset + length > MEMORY_SIZE) {
      buffer = Buffer.alloc(length)
    } else {
      buffer = this.memory.slice(offset, offset + length)
    }
    // console.log('READ', offset, length, buffer)
    return buffer
  }

  public writeMemory() {}
}