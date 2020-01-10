import { Action } from 'redux'

import {
  SetUsernameAction,
  SetCharacterAction,
  SetEmuChatAction,
  AddApiKeyAction,
  SetVersionAction,
  SetServerOptionsAction,
  SetGlobalHotkeysEnabledAction,
  SetGamepadIdAction
} from './models/save.model'
import { ElectronServerSaveData } from '../../models/State.model'

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
export function setGlobalHotkeysEnabled (globalHotkeysEnabled: boolean): SetGlobalHotkeysEnabledAction {
  return {
    type: 'SET_GLOBAL_HOTKEYS',
    globalHotkeysEnabled
  }
}
export function setHotkeyBindings (hotkeyBindings: { [shortcut: string]: string | undefined }) {
  return {
    type: 'SET_HOTKEY_BINDINGS',
    hotkeyBindings
  }
}
export function setGamepadId (gamepadId: string | undefined): SetGamepadIdAction {
  return {
    type: 'SET_GAMEPAD_ID',
    gamepadId
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

export function saveServerOptions (serverOptions: ElectronServerSaveData, apiKey: string): SetServerOptionsAction {
  return {
    type: 'SAVE_SERVER_OPTIONS',
    serverOptions,
    apiKey
  }
}
