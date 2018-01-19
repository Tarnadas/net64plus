import { SetEmulatorAction } from './models/emulator.model'

import { Emulator } from '../Emulator'

export function setEmulator (emulator: Emulator): SetEmulatorAction {
  return {
    type: 'SET_EMULATOR',
    emulator
  }
}
