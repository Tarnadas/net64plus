import { Action } from 'redux'

import {
  SetUsernameAction,
  SetCharacterAction,
  SetEmuChatAction,
  AddApiKeyAction,
  SetVersionAction
} from './models/save.model'

export function setUsername (username: string): SetUsernameAction {
  return {
    type: 'SET_USERNAME',
    username
  }
}

export function setCharacter (character: number): SetCharacterAction {
  return {
    type: 'SET_CHARACTER',
    character
  }
}
export function setEmuChat (emuChat: boolean): SetEmuChatAction {
  return {
    type: 'SET_EMU_CHAT',
    emuChat
  }
}

export function addApiKey (apiKey: string): AddApiKeyAction {
  return {
    type: 'ADD_API_KEY',
    apiKey
  }
}

export function deleteApiKey (): Action {
  return {
    type: 'DELETE_API_KEY'
  }
}

export function setVersion (version: string): SetVersionAction {
  return {
    type: 'SET_VERSION',
    version
  }
}
