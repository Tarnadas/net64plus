import { Action } from 'redux'

import { Emulator } from '../../Emulator'

export interface SetEmulatorAction extends Action {
  emulator: Emulator | null
}

export type EmulatorAction =
  SetEmulatorAction
