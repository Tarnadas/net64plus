import { Connector } from './Connector'

export type ButtonState = Array<{
  /** The button identifier */
  key: number,
  /** The analog value of the button */
  value: number,
  /** Whether the button is pressed */
  pressed: boolean,
}>

export class GamepadManager { // Currently only supports one gamepad
  private window: Window
  private connector: Connector
  private _buttonState: ButtonState | undefined = undefined
  private _buttonStateListeners: ((buttonState: ButtonState) => void)[] = []

  constructor(window: Window, connector: Connector) {
    this.window = window
    this.connector = connector
    this.window.addEventListener('gamepadconnected', (event) => {
      const gamepadEvent = event as GamepadEvent
      console.log(gamepadEvent)
      requestAnimationFrame(this.updateState)
    })

    this.updateState = this.updateState.bind(this)
    this.emitButtonState = this.emitButtonState.bind(this)
  }

  updateState() {
    const gamepads = this.window.navigator.getGamepads()
    if (!!gamepads && !!gamepads[0]) {
      const gamepad = gamepads[0]!

      // for (const [index, button] of gamepad.buttons.entries()) {
      //   if (button.pressed) { console.log(index) }
      // }

      // console.log(this._buttonState)

      // If this is the initializer, skip change detection
      if (this._buttonState === undefined) {
        this._buttonState = gamepad.buttons.map((gamepadButton, index) => ({ key: index, pressed: gamepadButton.pressed, value: gamepadButton.value }))
        requestAnimationFrame(this.updateState)
        return;
      }

      // Detect changes in button state since last poll
      let changes: ButtonState = []
      for (let index = 0; index < gamepad.buttons.length; index++) {
        const button = gamepad.buttons[index]
        const oldButton = this._buttonState[index]
        if (oldButton === undefined || oldButton.pressed !== button.pressed || oldButton.value !== button.value) {
          changes.push({ key: index, pressed: button.pressed, value: button.value })
        }
      }
      if (changes.length > 0) {
        this._buttonState = gamepad.buttons.map((gamepadButton, index) => ({ key: index, pressed: gamepadButton.pressed, value: gamepadButton.value }))
        // Emit an event to renderer and main with the changes
        this.emitButtonState(changes)
      }
    }
    requestAnimationFrame(this.updateState)
  }

  emitButtonState(buttonState: ButtonState) {
    this.connector.emitButtonState({ buttonState })
    this._buttonStateListeners.forEach((callback) => callback(buttonState))
  }

  addButtonStateListener(callback: ((buttonState: ButtonState) => void)) {
    this._buttonStateListeners.push(callback)
  }

  removeButtonStateListener(callback: ((buttonState: ButtonState) => void)) {
    const index = this._buttonStateListeners.findIndex((value) => value === callback)
    if (index !== -1) {
      this._buttonStateListeners.splice(index, 1)
    }
  }

}
