import { app, BrowserWindow } from 'electron'
import * as rimraf from 'rimraf'

import * as path from 'path'
import * as fs from 'fs'

import { Connector } from './Connector'
import { Emulator } from './Emulator'
import { Connection } from './Connection'
import { ElectronSaveData } from '../models/State.model'

interface Global extends NodeJS.Global {
  save: {
    appSaveData?: ElectronSaveData
    appSavePath?: string
  }
}

export let connector: Connector
export let emulator: Emulator | undefined
export let connection: Connection | undefined

export const createEmulator = (
  { processId, characterId, inGameChatEnabled }:
  { processId: number, characterId: number, inGameChatEnabled: boolean }
) => {
  emulator = new Emulator(processId, characterId, inGameChatEnabled)
  emulator.displayChatMessage('- Net64 connected -')
}

export const deleteEmulator = () => {
  emulator = undefined
}

export const createConnection = (
  { domain, ip, port, username, characterId }:
  {
    domain: string | undefined, ip: string | undefined, port: number | undefined, username: string, characterId: number
  }
) => {
  connection = new Connection({ domain, ip, port, username, characterId })
}

export const deleteConnection = () => {
  if (connection) connection.disconnect()
  connection = undefined
}

;(async () => {
  const appSavePath = path.resolve(`${app.getPath('appData')}/net64plus`)
  if (!fs.existsSync(appSavePath)) {
    fs.mkdirSync(appSavePath)
  }
  (global as Global).save = {
    appSavePath
  }
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
        (global as Global).save.appSaveData = appSaveData
      }
    } catch (err) {}
  }

  const onReady = () => {
    const mainWindow = new BrowserWindow({
      width: process.env.NODE_ENV === 'development' ? 1400 : 670,
      height: 840,
      icon: path.join(__dirname, 'img/icon.png'),
      title: `Net64+ ${process.env.VERSION}`,
      webPreferences: {
        webSecurity: false,
        nodeIntegrationInWorker: true
      }
    })
    connector = new Connector(mainWindow)

    mainWindow.loadURL(path.normalize(`file://${__dirname}/index.html`))

    if (process.env.NODE_ENV === 'development') {
      require('electron-debug')({
        showDevTools: true
      })
      mainWindow.webContents.openDevTools()
    }
  }

  app.on('ready', onReady)

  app.on('window-all-closed', () => {
    app.quit()
  })

  app.on('activate', () => {
    onReady()
  })

  process.on('uncaughtException', (err: Error) => {
    fs.writeFileSync(`./error_log_${new Date()}.log`, err)
    app.quit()
  })
})()
