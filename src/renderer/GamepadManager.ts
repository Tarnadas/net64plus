import { Connector } from './Connector'

export type ButtonState = Array<{
  /** The button identifier */
  key: number,
  /** The analog value of the button */
  value: number,
  /** Whether the button is pressed */
  pressed: boolean,
}>

export class GamepadManager {
  private readonly window: Window
  private readonly connector: Connector
  private _buttonState: ButtonState | undefined = undefined
  private readonly _buttonStateListeners: Array<(buttonState: ButtonState) => void> = []

  public selectedGamepad: Gamepad | undefined = undefined

  constructor (window: Window, connector: Connector, defaultGamepadId?: string) {
    this.window = window
    this.connector = connector
    this.window.addEventListener('gamepadconnected', (event) => {
      // If the default gamepad id is connected, and no other gamepad is selected, automatically bind
      const gamepadEvent = event as GamepadEvent
      if (this.selectedGamepad === undefined && gamepadEvent.gamepad.id === defaultGamepadId) {
        this.selectedGamepad = gamepadEvent.gamepad
      }
    })

    this.updateState = this.updateState.bind(this)
    this.emitButtonState = this.emitButtonState.bind(this)
    this.getConnectedGamepads = this.getConnectedGamepads.bind(this)

    requestAnimationFrame(this.updateState)
  }

  updateState () {
    const selectedGamepad = this.selectedGamepad
    if (selectedGamepad) {
      const gamepad = this.getConnectedGamepads().find((gamepad) =>
        (gamepad ? gamepad.id : undefined) === selectedGamepad.id
      )
      if (gamepad) {
        // If this is the initializer, skip change detection
        if (this._buttonState === undefined) {
          this._buttonState = gamepad.buttons.map((gamepadButton, index) =>
            ({ key: index, pressed: gamepadButton.pressed, value: gamepadButton.value })
          )
          requestAnimationFrame(this.updateState)
          return
        }

        // Detect changes in button state since last poll
        const changes: ButtonState = []
        for (let index = 0; index < gamepad.buttons.length; index++) {
          const button = gamepad.buttons[index]
          const oldButton = this._buttonState[index]
          if (oldButton === undefined || oldButton.pressed !== button.pressed || oldButton.value !== button.value) {
            changes.push({ key: index, pressed: button.pressed, value: button.value })
          }
        }
        if (changes.length > 0) {
          this._buttonState = gamepad.buttons.map((gamepadButton, index) =>
            ({ key: index, pressed: gamepadButton.pressed, value: gamepadButton.value })
          )
          // Emit an event to renderer and main with the changes
          this.emitButtonState(changes)
        }
      }
    }
    requestAnimationFrame(this.updateState)
  }

  private emitButtonState (buttonState: ButtonState) {
    this.connector.emitButtonState({ buttonState })
    this._buttonStateListeners.forEach((callback) => callback(buttonState))
  }

  public addButtonStateListener (callback: ((buttonState: ButtonState) => void)) {
    this._buttonStateListeners.push(callback)
  }

  public removeButtonStateListener (callback: ((buttonState: ButtonState) => void)) {
    const index = this._buttonStateListeners.findIndex((value) => value === callback)
    if (index !== -1) {
      this._buttonStateListeners.splice(index, 1)
    }
  }

  public getConnectedGamepads () {
    return Array.from(this.window.navigator.getGamepads())
  }
}
