import { Action } from 'redux'

import { Connection } from '../../Connection'

export interface SetUsernameAction extends Action {
  username: string
}

export interface SetCharacterAction extends Action {
  character: number
  connection: Connection
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
