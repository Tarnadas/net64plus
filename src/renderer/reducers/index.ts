import { createStore, applyMiddleware, combineReducers, Store, ReducersMapObject } from 'redux'
import { routerMiddleware, RouterState } from 'react-router-redux'
import { History } from 'history'

import { save } from './save'
import { router } from './router'
import { connection } from './connection'
import { chat } from './chat'
import { State, SaveState, ElectronSaveData } from '../../models/State.model'

export let initialState: State

const APP_SAVE_DATA: ElectronSaveData = {
  apiKey: '',
  username: '',
  character: 0,
  emuChat: false,
  lastIp: 'smmdb.ddns.net',
  lastPort: 3678,
  version: ''
}

export function initReducer (history: History, electronSave: SaveState): Store<State> {
  const appSaveData: ElectronSaveData = Object.assign({}, APP_SAVE_DATA, electronSave.appSaveData)
  const appSavePath: string = electronSave.appSavePath || ''
  initialState = {
    save: {
      appSaveData,
      appSavePath
    },
    router: {
      location: null
    },
    connection: {
      isConnectedToEmulator: false,
      server: null,
      hasToken: false,
      error: ''
    },
    chat: {
      global: []
    }
  }
  let reducers = {
    save,
    router,
    connection,
    chat
  }
  const middleware = applyMiddleware(routerMiddleware(history))
  return createStore(combineReducers(reducers as any), initialState, middleware)
}
