import { Action } from 'redux'

export interface SetUsernameAction extends Action {
  username: string
}

export interface SetCharacterAction extends Action {
  character: number
}

export interface SetEmuChatAction extends Action {
  emuChat: boolean
}

export interface AddApiKeyAction extends Action {
  apiKey: string
}

export interface SetVersionAction extends Action {
  version: string
}

export type SaveAction =
  SetUsernameAction
  & SetCharacterAction
  & SetEmuChatAction
  & AddApiKeyAction
  & SetVersionAction
