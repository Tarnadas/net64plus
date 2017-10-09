import electron from 'electron'
import rimraf from 'rimraf'

import path from 'path'
import fs from 'fs'

const app = electron.app
const BrowserWindow = electron.BrowserWindow;

(async () => {
  let mainWindow = null
  const appSavePath = path.resolve(`${app.getPath('appData')}/net64plus`)
  if (!fs.existsSync(appSavePath)) {
    fs.mkdirSync(appSavePath)
  }
  global.save = {
    appSavePath
  }
  if (fs.existsSync(path.join(appSavePath, 'save.json'))) {
    const appSaveData = JSON.parse(fs.readFileSync(path.join(appSavePath, 'save.json')))
    if (appSaveData == null) {
      await new Promise(resolve => {
        rimraf(appSavePath, err => {
          if (err) {
            console.log(err)
          } else {
            fs.mkdirSync(appSavePath)
          }
          resolve()
        })
      })
    } else {
      global.save.appSaveData = appSaveData
    }
  }

  const onReady = () => {
    mainWindow = new BrowserWindow({
      width: 1100,
      height: 800,
      icon: path.join(__dirname, 'img/icon.png'),
      title: `Net64+ ${process.env.VERSION}`,
      webPreferences: {
        webSecurity: false
      }
    })

    mainWindow.loadURL(path.normalize(`file://${__dirname}/index.html`))

    if (process.env.NODE_ENV === 'development') {
      require('electron-debug')({
        showDevTools: true
      })
      mainWindow.webContents.openDevTools()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', onReady)

  app.on('window-all-closed', () => {
    app.quit()
  })

  app.on('activate', () => {
    onReady()
  })

  app.on('uncaughtException', (err) => {
    fs.writeFileSync('./error_log.txt', err)
    app.quit()
  })
})()
