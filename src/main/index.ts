import { app, BrowserWindow } from 'electron'

import * as path from 'path'
import * as fs from 'fs'
import * as RPCClientInstance from 'discord-rich-presence'

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
  try {
    emulator = new Emulator(processId, characterId, inGameChatEnabled)
    emulator.displayChatMessage('- Net64 connected -')
  } catch (err) {
    console.warn(err)
  }
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
export const RPCClient = new RPCClientInstance('550708311582834700')
export var RPCState = {}
export function updateRPC(update: Object, clean?: boolean) {
  if (clean) {RPCState = {}}
  Object.assign(RPCState, update)
  RPCClient.updatePresence(RPCState)
}
;(() => {
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
    updateRPC({state: 'Ready', details: 'Ready', largeImageKey: 'net64', largeImageText: `Net64+ ${process.env.VERSION}`})
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
    RPCClient.disconnect()
    app.quit()
  })

  app.on('activate', () => {
    onReady()
  })

  process.on('uncaughtException', (err: Error) => {
    const errorFolderPath = path.resolve(__dirname, 'error')
    const filePath = path.resolve(
      errorFolderPath,
      `./error_log_${new Date().toISOString().split('.')[0].replace(/:/g, '').replace(/-/g, '')}.log`
    )
    if (!fs.existsSync(errorFolderPath)) {
      fs.mkdirSync(errorFolderPath)
    }
    fs.writeFileSync(
      filePath,
      `\
Here is a detailed error log of the unhandled exception that caused Net64+ to crash.\n
Please report this error log on GitHub: https://github.com/tarnadas/net64plus/issues\n\n\
Error name: ${err.name}\n\
Error message: ${err.message}\n\
StackTrace: ${err.stack}`
    )
    app.quit()
  })
})()
