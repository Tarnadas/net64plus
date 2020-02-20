import { globalShortcut, BrowserWindow } from 'electron'
import { Connector } from './Connector'
import { ButtonState } from '../renderer/GamepadManager'
const electronLocalshortcut = require('electron-localshortcut') // @types typings require a conflicting version of electron

export class HotkeyManager {
  private _username = ''
  public set username(value: string) { this._username = value }
  public get username(): string { return this._username }

  private _hotkeysEnabled = true
  public set hotkeysEnabled(value: boolean) { this._hotkeysEnabled = value }
  public get hotkeysEnabled(): boolean { return this._hotkeysEnabled }

  private _characterCyclingOrder: Array<{characterId: number, on: boolean}> = []
  private _characterCyclingIndex: number = 0;

  private _hotkeyBindings: { [shortcut: string]: string | undefined } = {}

  public validKeyboardHotkeys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  public setHotkeys (hotkeyBindings: { [shortcut: string]: string | undefined }, globalHotkeysEnabled: boolean, connector: Connector, window: BrowserWindow) {
    this._hotkeyBindings = hotkeyBindings
    electronLocalshortcut.unregisterAll(window)
    globalShortcut.unregisterAll()
    Object.entries(hotkeyBindings).forEach(([characterIdString, hotkey]) => {
      const username = this.username
      if (!!hotkey) {
        if (this.isNumeric(characterIdString)) {
          const callback = () => {
            const characterId = parseInt(characterIdString, 10)
            this.changeCharacter({ username, characterId, connector })
          }

          if (this.validKeyboardHotkeys.includes(hotkey.toLocaleUpperCase())) {
            if (globalHotkeysEnabled) {
              globalShortcut.register(hotkey.toLocaleUpperCase(), callback)
            } else {
              electronLocalshortcut.register(window, hotkey.toLocaleUpperCase(), callback)
            }
          }
        } else if (characterIdString === 'nextCharacter') {
          const callback = () => {
            if (this._characterCyclingOrder.length > 0 && this._characterCyclingOrder.some((value) => value.on)) {
              const nextIndex = this.getNextCharacterId(this._characterCyclingOrder, this._characterCyclingIndex)
              if (nextIndex !== undefined) {
                this._characterCyclingIndex = nextIndex
                const characterId = this._characterCyclingOrder[this._characterCyclingIndex].characterId
                this.changeCharacter({ username, characterId, connector })
              }
            }
          }

          if (this.validKeyboardHotkeys.includes(hotkey.toLocaleUpperCase())) {
            if (globalHotkeysEnabled) {
              globalShortcut.register(hotkey.toLocaleUpperCase(), callback)
            } else {
              electronLocalshortcut.register(window, hotkey.toLocaleUpperCase(), callback)
            }
          }
        } else if (characterIdString === 'previousCharacter') {
          const callback = () => {
            if (this._characterCyclingOrder.length > 0 && this._characterCyclingOrder.some((value) => value.on)) {
              const prevIndex = this.getPreviousCharacterId(this._characterCyclingOrder, this._characterCyclingIndex)
              if (prevIndex !== undefined) {
                this._characterCyclingIndex = prevIndex
                const characterId = this._characterCyclingOrder[this._characterCyclingIndex].characterId
                this.changeCharacter({ username, characterId, connector })
              }
            }
          }

          if (this.validKeyboardHotkeys.includes(hotkey.toLocaleUpperCase())) {
            if (globalHotkeysEnabled) {
              globalShortcut.register(hotkey.toLocaleUpperCase(), callback)
            } else {
              electronLocalshortcut.register(window, hotkey.toLocaleUpperCase(), callback)
            }
          }        
        }
      }
    })
  }

  public setCharacterCyclingOrder (characterCyclingOrder: Array<{characterId: number, on: boolean}>) {
    this._characterCyclingOrder = characterCyclingOrder
    this._characterCyclingIndex = 0
  }

  public onGamepadButtonStateChanged (buttonState: ButtonState, connector: Connector) {
    if (buttonState.some((button) => button.pressed)) {
      const username = this.username
      Object.entries(this._hotkeyBindings)
        .filter(([_, hotkey]) => !!hotkey && hotkey.includes('button'))
        .forEach(([characterIdString, hotkey]) => {
          if (!!hotkey) {
            if (buttonState.some((button) => hotkey === `button${button.key}` && button.pressed)) { // Check if button was pressed
              if (this.isNumeric(characterIdString)) { // Character hotkey
                const characterId = parseInt(characterIdString, 10)
                this.changeCharacter({ username, characterId, connector })
              } else if (characterIdString === 'nextCharacter') {
                const nextIndex = this.getNextCharacterId(this._characterCyclingOrder, this._characterCyclingIndex)
                if (nextIndex !== undefined) {
                  this._characterCyclingIndex = nextIndex
                  const characterId = this._characterCyclingOrder[this._characterCyclingIndex].characterId
                  this.changeCharacter({ username, characterId, connector })
                }
              } else if (characterIdString === 'previousCharacter') {
                const prevIndex = this.getPreviousCharacterId(this._characterCyclingOrder, this._characterCyclingIndex)
                if (prevIndex !== undefined) {
                  this._characterCyclingIndex = prevIndex
                  const characterId = this._characterCyclingOrder[this._characterCyclingIndex].characterId
                  this.changeCharacter({ username, characterId, connector })
                }
              }
            }
          }
      });
    }
  }

  private getNextCharacterId (characterCyclingOrder: Array<{characterId: number, on: boolean}>, characterCyclingIndex: number): number | undefined {
    let nextIndex = characterCyclingOrder.findIndex((value, index) => value.on && index > characterCyclingIndex)
    if (nextIndex === -1) {
      nextIndex = characterCyclingOrder.findIndex((value) => value.on)
    }
    return nextIndex === -1 ? undefined : nextIndex
  }

  private getPreviousCharacterId (characterCyclingOrder: Array<{characterId: number, on: boolean}>, characterCyclingIndex: number): number | undefined {
    let prevIndex
    for (let i = characterCyclingIndex - 1; i >= 0; i--) {
      const value = characterCyclingOrder[i]
      if (value.on) {
        prevIndex = i
        break
      }
    }
    if (prevIndex === undefined) {
      for (let i = characterCyclingOrder.length - 1; i >= characterCyclingIndex; i--) {
        const value = characterCyclingOrder[i]
        if (value.on) {
          prevIndex = i
          break
        }
      }
    }
    return prevIndex
  }

  private isNumeric (value: string): boolean {
    return +value === +value
  }

  /**
   * @function changeCharacter - Boilerplate logic for changing a character
   * @param {Object} parameters
   * @property {string} parameters.username - Player username
   * @property {number} parameters.characterId - Id of the character to change to
   * @property {Connector} parameters.connector - Connector to emit character change data to
   */
  private changeCharacter ({ username, characterId, connector }: { username: string, characterId: number, connector: Connector }) {
    if (this._hotkeysEnabled) {
      connector.setCharacter(characterId)
      connector.sendPlayerUpdate({ username, characterId })
    }
  }

}
