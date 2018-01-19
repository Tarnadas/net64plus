import { Action } from 'redux'

import { Emulator } from '../../Emulator'

export interface SetEmulatorAction extends Action {
  emulator: Emulator
}

export type EmulatorAction =
  SetEmulatorAction
