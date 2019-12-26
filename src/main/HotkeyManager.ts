import { globalShortcut, BrowserWindow } from 'electron'
import { Connector } from './Connector'
const electronLocalshortcut = require('electron-localshortcut') // @types typings require a conflicting version of electron

export class HotkeyManager {
  private _username = ''
  public set username(value: string) { this._username = value }
  public get username(): string { return this._username }

  public setHotkeys(hotkeyBindings: { [characterId: number]: string | undefined }, globalHotkeysEnabled: boolean, connector: Connector, window: BrowserWindow) {
    this.setLocalHotkeys(globalHotkeysEnabled ? {} : hotkeyBindings, connector, window)
    this.setGlobalHotkeys(globalHotkeysEnabled ? hotkeyBindings : {}, connector)
  }

  private setLocalHotkeys(hotkeyBindings: { [characterId: number]: string | undefined }, connector: Connector, window: BrowserWindow) {
    electronLocalshortcut.unregisterAll(window)
    Object.entries(hotkeyBindings).forEach(([characterIdString, hotkey]) => {
      if (!!hotkey) {       
        electronLocalshortcut.register(window, hotkey.toLocaleUpperCase(), () => {
          const username = this.username
          const characterId = parseInt(characterIdString, 10)
          connector.setCharacter(characterId)
          connector.sendPlayerUpdate({ username, characterId })
        })
      }
    })
  }

  private setGlobalHotkeys(hotkeyBindings: { [characterId: number]: string | undefined }, connector: Connector) {
    globalShortcut.unregisterAll()
    Object.entries(hotkeyBindings).forEach(([characterIdString, hotkey]) => {
      if (!!hotkey) {
        globalShortcut.register(hotkey.toLocaleUpperCase(), () => {
          const username = this.username
          const characterId = parseInt(characterIdString, 10)
          connector.setCharacter(characterId)
          connector.sendPlayerUpdate({ username, characterId })
        })
      }
    })
  }

}
