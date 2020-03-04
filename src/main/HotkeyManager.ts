import { globalShortcut, BrowserWindow } from 'electron'
import { Connector } from './Connector'
import { ButtonState } from '../renderer/GamepadManager'

// @types typings require a conflicting version of electron
// eslint-disable-next-line @typescript-eslint/no-var-requires
const electronLocalshortcut = require('electron-localshortcut')

export enum HotkeyShortcut {
  MARIO = '0',
  LUIGI = '1',
  YOSHI = '2',
  WARIO = '3',
  PEACH = '4',
  TOAD = '5',
  WALUIGI = '6',
  ROSALINA = '7',
  SONIC = '8',
  KNUCKLES = '9',
  GOOMBA = '10',
  KIRBY = '11',
  NEXT_CHARACTER = 'nextCharacter',
  PREVIOUS_CHARACTER = 'previousCharacter'
}

export class HotkeyManager {
  public username = ''

  private _hotkeysEnabled = true
  public set hotkeysEnabled (value: boolean) { this._hotkeysEnabled = value }
  public get hotkeysEnabled (): boolean { return this._hotkeysEnabled }

  private _characterCyclingOrder: Array<{characterId: number, on: boolean}> = []
  private _characterCyclingIndex = 0;

  private _hotkeyBindings: { [shortcut in HotkeyShortcut]?: string[] } = {}

  public hotkeyIsButton (hotkey: string): boolean {
    return new RegExp(/^button\d+$/).test(hotkey)
  }

  public setHotkeys (
    hotkeyBindings: { [shortcut in HotkeyShortcut]: string[] },
    globalHotkeysEnabled: boolean,
    connector: Connector,
    window: BrowserWindow
  ) {
    this._hotkeyBindings = hotkeyBindings
    electronLocalshortcut.unregisterAll(window)
    globalShortcut.unregisterAll()

    Object.entries(hotkeyBindings).forEach(([characterIdString, hotkeys]) => {
      const username = this.username
      if (hotkeys) {
        for (const hotkey of hotkeys) {
          if (this.isNumeric(characterIdString)) {
            const callback = () => {
              const characterId = parseInt(characterIdString, 10)
              this.changeCharacter({ username, characterId, connector })
            }

            if (!this.hotkeyIsButton(hotkey)) {
              if (globalHotkeysEnabled) {
                globalShortcut.register(hotkey.toLocaleUpperCase(), callback)
              } else {
                electronLocalshortcut.register(window, hotkey.toLocaleUpperCase(), callback)
              }
            }
          } else if (characterIdString === HotkeyShortcut.NEXT_CHARACTER) {
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

            if (!this.hotkeyIsButton(hotkey)) {
              if (globalHotkeysEnabled) {
                globalShortcut.register(hotkey.toLocaleUpperCase(), callback)
              } else {
                electronLocalshortcut.register(window, hotkey.toLocaleUpperCase(), callback)
              }
            }
          } else if (characterIdString === HotkeyShortcut.PREVIOUS_CHARACTER) {
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

            if (!this.hotkeyIsButton(hotkey)) {
              if (globalHotkeysEnabled) {
                globalShortcut.register(hotkey.toLocaleUpperCase(), callback)
              } else {
                electronLocalshortcut.register(window, hotkey.toLocaleUpperCase(), callback)
              }
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
        // Filter out any bindings that don't have any button hotkeys
        .filter(([_, hotkeys]) => hotkeys?.some((hotkey) => hotkey.includes('button')))
        .forEach(([characterIdString, hotkeys]) => {
          // Filter out any hotkeys that are not button hotkeys
          hotkeys = hotkeys ? hotkeys.filter((hotkey) => hotkey.includes('button')) : []
          for (const hotkey of hotkeys) {
            // Check if button was pressed
            if (buttonState.some((button) => hotkey === `button${button.key}` && button.pressed)) {
              if (this.isNumeric(characterIdString)) { // Character hotkey
                const characterId = parseInt(characterIdString, 10)
                this.changeCharacter({ username, characterId, connector })
              } else if (characterIdString === HotkeyShortcut.NEXT_CHARACTER) {
                const nextIndex = this.getNextCharacterId(this._characterCyclingOrder, this._characterCyclingIndex)
                if (nextIndex !== undefined) {
                  this._characterCyclingIndex = nextIndex
                  const characterId = this._characterCyclingOrder[this._characterCyclingIndex].characterId
                  this.changeCharacter({ username, characterId, connector })
                }
              } else if (characterIdString === HotkeyShortcut.PREVIOUS_CHARACTER) {
                const prevIndex = this.getPreviousCharacterId(this._characterCyclingOrder, this._characterCyclingIndex)
                if (prevIndex !== undefined) {
                  this._characterCyclingIndex = prevIndex
                  const characterId = this._characterCyclingOrder[this._characterCyclingIndex].characterId
                  this.changeCharacter({ username, characterId, connector })
                }
              }
            }
          }
        })
    }
  }

  private getNextCharacterId (
    characterCyclingOrder: Array<{characterId: number, on: boolean}>,
    characterCyclingIndex: number
  ): number | undefined {
    let nextIndex = characterCyclingOrder.findIndex((value, index) => value.on && index > characterCyclingIndex)
    if (nextIndex === -1) {
      nextIndex = characterCyclingOrder.findIndex((value) => value.on)
    }
    return nextIndex === -1 ? undefined : nextIndex
  }

  private getPreviousCharacterId (
    characterCyclingOrder: Array<{characterId: number, on: boolean}>,
    characterCyclingIndex: number
  ): number | undefined {
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
    // Self comparison is needed to check complex string values
    // eslint-disable-next-line no-self-compare
    return +value === +value
  }

  /**
   * @function changeCharacter - Boilerplate logic for changing a character
   * @param {Object} parameters - Parameters
   * @property {string} parameters.username - Player username
   * @property {number} parameters.characterId - Id of the character to change to
   * @property {Connector} parameters.connector - Connector to emit character change data to
   */
  private changeCharacter ({ username, characterId, connector }:
  { username: string, characterId: number, connector: Connector }
  ) {
    if (this._hotkeysEnabled) {
      connector.setCharacter(characterId)
      connector.sendPlayerUpdate({ username, characterId })
    }
  }
}
