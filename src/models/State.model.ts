import { RouterState as ReactRouterState } from 'react-router-redux'
import { Dispatch } from 'redux'

import { Emulator } from '../Emulator'
import { Connection } from '../Connection'

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

/* export interface AccountState {

} */

export interface EmulatorStateDraft {
  instance: Emulator | null
}
export type EmulatorState = Readonly<EmulatorStateDraft>

export interface ConnectionStateDraft {
  connection: Connection | null
  hasToken: boolean
  error: string
}
export type ConnectionState = Readonly<ConnectionStateDraft>

export interface ChatMessage {
  key: number
  time: string
  message: string
  username: string
}

export interface ChatStateDraft {
  global: ChatMessage[]
}
export type ChatState = Readonly<ChatStateDraft>

export interface State {
  readonly save: SaveState
  readonly router: RouterState
  // readonly account: AccountState
  readonly emulator: EmulatorState
  readonly connection: ConnectionState
  readonly chat: ChatState
}
