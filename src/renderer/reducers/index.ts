import { createStore, applyMiddleware, combineReducers, Store } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { History } from 'history'

import { save } from './save'
import { router } from './router'
import { connection } from './connection'
import { emulator } from './emulator'
import { server } from './server'
import { chat } from './chat'
import { snackbar } from './snackbar'
import { serverMiddleware } from '../middlewares/server-middleware'
import { snackbarMiddleware } from '../middlewares/snackbar-middleware'
import { MIN_LENGTH_USERNAME, MAX_LENGTH_USERNAME } from '../components/views/SettingsView'
import { State, SaveState, ElectronSaveData } from '../../models/State.model'

export let initialState: State

const APP_SAVE_DATA: ElectronSaveData = {
  apiKey: '',
  username: '',
  character: 0,
  emuChat: false,
  lastIp: 'smmdb.net',
  lastPort: 3678,
  version: '',
  serverOptions: {
    name: 'A Net64+ Server',
    description: 'The **best** Net64+ server ever\n\n:unicorn_face:',
    gamemode: 1,
    enableGamemodeVote: true,
    passwordRequired: false,
    password: '',
    port: 3678,
    enableWebHook: false
  }
}

export function initReducer (history: History, electronSave: SaveState): Store<State> {
  let appSaveData: ElectronSaveData = Object.assign({}, APP_SAVE_DATA)
  try {
    if (electronSave.appSaveData) {
      appSaveData = Object.assign(appSaveData, JSON.parse(JSON.stringify(electronSave.appSaveData)))
      Object.assign(appSaveData.serverOptions, APP_SAVE_DATA.serverOptions, electronSave.appSaveData.serverOptions)
    }
  } catch (err) {
    appSaveData = Object.assign({}, APP_SAVE_DATA)
  }
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
      server: null,
      authenticated: true,
      authenticationThrottle: 0,
      hasToken: false,
      error: ''
    },
    emulator: {
      emulators: [],
      isConnectedToEmulator: false,
      error: ''
    },
    server: {
      process: null,
      exitCode: null,
      server: null,
      messages: []
    },
    chat: {
      global: []
    },
    snackbar: {
      message: null
    }
  }
  const reducers = {
    save,
    router,
    connection,
    emulator,
    server,
    chat,
    snackbar
  }
  const middleware = applyMiddleware(serverMiddleware as any, snackbarMiddleware as any, routerMiddleware(history))
  return createStore(combineReducers(reducers as any), initialState, middleware) as any
}
