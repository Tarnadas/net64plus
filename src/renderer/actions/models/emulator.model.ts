import { Action } from 'redux'

import { FilteredEmulator } from '../../../models/Emulator.model'

export interface UpdateEmulatorsAction extends Action {
  emulators: FilteredEmulator[]
}

export interface IsConnectedToEmulatorAction extends Action {
  isConnectedToEmulator: boolean
}

export interface SetEmulatorError extends Action {
  error?: string
}

export type EmulatorAction =
  UpdateEmulatorsAction
  & IsConnectedToEmulatorAction
  & SetEmulatorError

export enum EmulatorActionType {
  UPDATE_EMULATORS = 'UPDATE_EMULATORS',
  SET_ERROR = 'SET_EMULATOR_ERROR',
  IS_CONNECTED_TO_EMULATOR = 'IS_CONNECTED_TO_EMULATOR'
}
