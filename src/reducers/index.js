import {
  createStore, applyMiddleware
} from 'redux'
import {
  combineReducers
} from 'redux-immutable'
import {
  fromJS
} from 'immutable'
import {
  routerMiddleware
} from 'react-router-redux'

import save from './save'
import router from './router'
import chat from './chat'

const APP_SAVE_DATA = {
  apiKey: ''
}

export default function initReducer (history, electronSave) {
  const appSaveData = electronSave.appSaveData || APP_SAVE_DATA
  appSaveData.version = process.env.NET64_VERSION
  const appSavePath = electronSave.appSavePath || ''
  let initialState = fromJS({
    save: {
      data: appSaveData,
      path: appSavePath
    },
    router: {
      location: null
    },
    chat: {
      global: {}
    }
  })
  let reducers = {
    save,
    router,
    chat
  }
  const middleware = applyMiddleware(routerMiddleware(history))
  return createStore(combineReducers(reducers), initialState, middleware)
}
