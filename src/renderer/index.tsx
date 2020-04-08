import '../styles/global.scss'

import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { Store } from 'redux'
import { ConnectedRouter } from 'react-router-redux'
import * as rimraf from 'rimraf'
import { remote } from 'electron'
import { History, createMemoryHistory as createHistory } from 'history'

import * as fs from 'fs'
import * as path from 'path'

import { initReducer } from './reducers'
import { Connector } from './Connector'
import { AppView } from './components/views/AppView'
import { State, SaveState, SaveStateDraft, ElectronSaveData } from '../models/State.model'
import { GamepadManager } from './GamepadManager'

export let store: Store<State>
export const connector = new Connector()
export let gamepadManager: GamepadManager

// eslint-disable-next-line @typescript-eslint/no-floating-promises
;(async () => {
  const history: History = createHistory()
  const save: SaveState = await loadSaveData()
  connector.changeEmuChat(save.appSaveData.emuChat)
  connector.changeHotkeyBindings({
    hotkeyBindings: save.appSaveData.hotkeyBindings || {},
    globalHotkeysEnabled: !!save.appSaveData.globalHotkeysEnabled,
    username: save.appSaveData.username
  })
  connector.changeCharacterCyclingOrder({ characterCyclingOrder: save.appSaveData.characterCylingOrder })
  gamepadManager = new GamepadManager(window, connector, save.appSaveData.gamepadId)
  store = initReducer(history, save)

  render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route path='/' component={AppView} />
      </ConnectedRouter>
    </Provider>, document.getElementById('root')
  )
})()

process.on('uncaughtException', (err: Error) => {
  console.error(err)
})

async function loadSaveData (): Promise<SaveStateDraft<ElectronSaveData>> {
  const appSavePath = remote.app.getPath('userData')
  if (!fs.existsSync(appSavePath)) {
    fs.mkdirSync(appSavePath)
  }
  const save: SaveStateDraft<ElectronSaveData> = {
    appSavePath
  } as any
  if (fs.existsSync(path.join(appSavePath, 'save.json'))) {
    try {
      const appSaveData = JSON.parse(fs.readFileSync(path.join(appSavePath, 'save.json'), {
        encoding: 'utf8'
      }))
      if (appSaveData == null) {
        await new Promise(resolve => {
          rimraf(appSavePath, err => {
            if (err) {
              console.error(err)
            } else {
              fs.mkdirSync(appSavePath)
            }
            resolve()
          })
        })
      } else {
        save.appSaveData = appSaveData
      }
    } catch (err) {}
  }
  return save
}
