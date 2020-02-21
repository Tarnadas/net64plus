import { Action } from 'redux'

import { ElectronServerSaveData } from '../../../models/State.model'

export interface SetUsernameAction extends Action {
  username: string
}

export interface SetCharacterAction extends Action {
  character: number
}

export interface SetEmuChatAction extends Action {
  emuChat: boolean
}

export interface SetGlobalHotkeysEnabledAction extends Action {
  globalHotkeysEnabled: boolean
}

export interface SetHotkeyBindingsAction extends Action {
  hotkeyBindings: { [shortcut: string]: string[] }
}

export interface SetCharacterCyclingOrderAction extends Action {
  characterCyclingOrder: Array<{characterId: number, on: boolean}>
}

export interface SetGamepadIdAction extends Action {
  gamepadId: string | undefined
}

export interface AddApiKeyAction extends Action {
  apiKey: string
}

export interface SetVersionAction extends Action {
  version: string
}

export interface SetServerOptionsAction extends Action {
  serverOptions: ElectronServerSaveData
  apiKey: string
}

export type SaveAction =
  SetUsernameAction
  & SetCharacterAction
  & SetEmuChatAction
  & SetGlobalHotkeysEnabledAction
  & SetHotkeyBindingsAction
  & SetCharacterCyclingOrderAction
  & SetGamepadIdAction
  & AddApiKeyAction
  & SetVersionAction
  & SetServerOptionsAction
