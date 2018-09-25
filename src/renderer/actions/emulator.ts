import {
  SetEmulatorError, EmulatorActionType, IsConnectedToEmulatorAction, UpdateEmulatorsAction
} from './models/emulator.model'
import { FilteredEmulator } from '../../models/Emulator.model'

export function updateEmulators (emulators: FilteredEmulator[]): UpdateEmulatorsAction {
  return {
    type: EmulatorActionType.UPDATE_EMULATORS,
    emulators
  }
}

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
