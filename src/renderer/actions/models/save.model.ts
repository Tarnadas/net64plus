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

export interface SetGlobalHotkeysAction extends Action {
  globalHotkeys: boolean
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
  & SetGlobalHotkeysAction
  & AddApiKeyAction
  & SetVersionAction
  & SetServerOptionsAction
