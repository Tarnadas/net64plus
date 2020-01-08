import { globalShortcut, BrowserWindow } from 'electron'
import { Connector } from './Connector'
const electronLocalshortcut = require('electron-localshortcut') // @types typings require a conflicting version of electron

export class HotkeyManager {
  private _username = ''
  public set username(value: string) { this._username = value }
  public get username(): string { return this._username }

  private _characterCyclingOrder: Array<{characterId: number, on: boolean}> = [];
  private _characterCyclingIndex: number = 0;

  public validCharacterHotkeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  public setHotkeys(hotkeyBindings: { [shortcut: string]: string | undefined }, globalHotkeysEnabled: boolean, connector: Connector, window: BrowserWindow) {
    electronLocalshortcut.unregisterAll(window)
    globalShortcut.unregisterAll()
    Object.entries(hotkeyBindings).forEach(([characterIdString, hotkey]) => {
      const username = this.username
      if (!!hotkey) {
        if (characterIdString.length === 1 && this.validCharacterHotkeys.includes(hotkey)) {
          const callback = () => {
            const characterId = parseInt(characterIdString, 10)
            connector.setCharacter(characterId)
            connector.sendPlayerUpdate({ username, characterId })
          }
          if (globalHotkeysEnabled) {
            globalShortcut.register(hotkey.toLocaleUpperCase(), callback)
          } else {
            electronLocalshortcut.register(window, hotkey.toLocaleUpperCase(), callback)
          }
        } else if (characterIdString === 'nextCharacter') {
          const callback = () => {
            console.log('next character')
            if (this._characterCyclingOrder.length > 0 && this._characterCyclingOrder.some((value) => value.on)) {
              let nextIndex = this._characterCyclingOrder.findIndex((value, index) => value.on && index > this._characterCyclingIndex)
              if (nextIndex === -1) {
                nextIndex = this._characterCyclingOrder.findIndex((value) => value.on)
              }
              if (nextIndex !== -1) {
                console.log(nextIndex)
                this._characterCyclingIndex = nextIndex
                const characterId = this._characterCyclingOrder[this._characterCyclingIndex].characterId
                console.log({ characterId })
                connector.setCharacter(characterId)
                connector.sendPlayerUpdate({ username, characterId })
              }
            }
          }
          if (globalHotkeysEnabled) {
            globalShortcut.register(hotkey.toLocaleUpperCase(), callback)
          } else {
            electronLocalshortcut.register(window, hotkey.toLocaleUpperCase(), callback)
          }
        } else if (characterIdString === 'previousCharacter') {
          const callback = () => {
            console.log('previous character')
            if (this._characterCyclingOrder.length > 0 && this._characterCyclingOrder.some((value) => value.on)) {
              let prevIndex
              for (let i = this._characterCyclingIndex - 1; i >= 0; i--) {
                const value = this._characterCyclingOrder[i]
                if (value.on) {
                  prevIndex = i
                  break
                }
              }
              if (prevIndex === undefined) {
                for (let i = this._characterCyclingOrder.length - 1; i >= this._characterCyclingIndex; i--) {
                  const value = this._characterCyclingOrder[i]
                  if (value.on) {
                    prevIndex = i
                    break
                  }
                }
              }
              if (prevIndex !== undefined) {
                this._characterCyclingIndex = prevIndex
                const characterId = this._characterCyclingOrder[this._characterCyclingIndex].characterId
                console.log({ characterId })
                connector.setCharacter(characterId)
                connector.sendPlayerUpdate({ username, characterId })
              }
            }
          }
          if (globalHotkeysEnabled) {
            globalShortcut.register(hotkey.toLocaleUpperCase(), callback)
          } else {
            electronLocalshortcut.register(window, hotkey.toLocaleUpperCase(), callback)
          }          
        }
      }
    })
  }

  public setCharacterCyclingOrder(characterCyclingOrder: Array<{characterId: number, on: boolean}>) {
    this._characterCyclingOrder = characterCyclingOrder
    this._characterCyclingIndex = 0
  }

}
