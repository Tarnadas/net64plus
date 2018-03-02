import { SetEmulatorAction } from './models/emulator.model'

import { Emulator } from '../Emulator'

export function setEmulator (emulator: Emulator | null): SetEmulatorAction {
  return {
    type: 'SET_EMULATOR',
    emulator
  }
}
