import {
  SetEmulatorError, EmulatorActionType, IsConnectedToEmulatorAction
} from './models/emulator.model'

export function isConnectedToEmulator (isConnectedToEmulator: boolean): IsConnectedToEmulatorAction {
  return {
    type: EmulatorActionType.IS_CONNECTED_TO_EMULATOR,
    isConnectedToEmulator
  }
}

export function setEmulatorError (error?: string): SetEmulatorError {
  return {
    type: EmulatorActionType.SET_ERROR,
    error
  }
}
