import { RouterState as ReactRouterState } from 'react-router-redux'

import { Server } from '../models/Server.model'

export interface ElectronSaveDataDraft {
  apiKey: string
  username: string
  character: number
  emuChat: boolean
  lastIp: string
  lastPort: number
  version: string
}
export type ElectronSaveData = Readonly<ElectronSaveDataDraft>

export interface SaveStateDraft<T> {
  appSaveData: T
  appSavePath: string
}
export type SaveState = Readonly<SaveStateDraft<ElectronSaveData>>

export type RouterStateDraft = ReactRouterState
export type RouterState = Readonly<RouterStateDraft>

export interface ConnectionStateDraft {
  server: Server | null
  authenticated: boolean
  authenticationThrottle: number
  hasToken: boolean
  error: string
}
export type ConnectionState = Readonly<ConnectionStateDraft>

export interface EmulatorStateDraft {
  isConnectedToEmulator: boolean
  error: string
}

export type EmulatorState = Readonly<EmulatorStateDraft>

export interface ChatMessage {
  key: number
  time: string
  message: string
  username: string
  isTrusted: boolean
}

export interface ChatStateDraft {
  global: ChatMessage[]
}
export type ChatState = Readonly<ChatStateDraft>

export interface StateDraft {
  save: SaveState
  router: RouterState
  connection: ConnectionState
  emulator: EmulatorState
  chat: ChatState
}
export type State = Readonly<StateDraft>
