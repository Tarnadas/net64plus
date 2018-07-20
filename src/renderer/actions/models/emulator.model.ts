import { Action } from 'redux'

export interface IsConnectedToEmulatorAction extends Action {
  isConnectedToEmulator: boolean
}

export interface SetEmulatorError extends Action {
  error?: string
}

export type EmulatorAction =
  IsConnectedToEmulatorAction
  & SetEmulatorError

export enum EmulatorActionType {
  SET_ERROR = 'SET_EMULATOR_ERROR',
  IS_CONNECTED_TO_EMULATOR = 'IS_CONNECTED_TO_EMULATOR'
}
