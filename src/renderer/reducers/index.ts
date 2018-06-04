import { createStore, applyMiddleware, combineReducers, Store, ReducersMapObject } from 'redux'
import { routerMiddleware, RouterState } from 'react-router-redux'
import { History } from 'history'
import produce from 'immer'

import { save } from './save'
import { router } from './router'
import { connection } from './connection'
import { chat } from './chat'
import { MIN_LENGTH_USERNAME, MAX_LENGTH_USERNAME } from '../components/views/SettingsView'
import { State, SaveState, ElectronSaveData, StateDraft } from '../../models/State.model'

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
  let appSaveData: ElectronSaveData = Object.assign({}, APP_SAVE_DATA, electronSave.appSaveData)
  const username = appSaveData.username.replace(/\W/g, '')
  if (
    username !== appSaveData.username ||
    username.length < MIN_LENGTH_USERNAME ||
    username.length > MAX_LENGTH_USERNAME
  ) {
    appSaveData = Object.assign({}, APP_SAVE_DATA)
  }
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
