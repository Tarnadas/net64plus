import './HotkeyButton.scss'

import * as React from 'react'

import { GamepadManager, ButtonState } from '../../GamepadManager'
import { gamepadManager } from '../..'
import { HotkeyShortcut } from '../../../main/HotkeyManager'

interface HotkeyButtonProps {
  shortcut: HotkeyShortcut
  hotkey?: string
  className?: string
  iconSrc?: string
  gamepadManager?: GamepadManager
  onClick?: (shortcut: HotkeyShortcut, hotkey?: string) => void
  onRightClick?: (shortcut: HotkeyShortcut) => void
}

interface HotkeyButtonState {
  hotkey?: string
  listening: boolean
}

export class HotkeyButton extends React.PureComponent<HotkeyButtonProps, HotkeyButtonState> {
  constructor (props: HotkeyButtonProps) {
    super(props)
    this.state = {
      hotkey: props.hotkey,
      listening: false
    }
    this.onClick = this.onClick.bind(this)
    this.onRightClick = this.onRightClick.bind(this)
    this.keyDownListener = this.keyDownListener.bind(this)
    this.buttonDownListener = this.buttonDownListener.bind(this)
    this.clickOutsideListener = this.clickOutsideListener.bind(this)
    this.removeListeners = this.removeListeners.bind(this)

    this.div = React.createRef()
  }

  private readonly div: React.RefObject<HTMLDivElement>

  componentDidUpdate (prevProps: HotkeyButtonProps) {
    const { hotkey } = this.props
    if (hotkey !== prevProps.hotkey) {
      this.setState({ hotkey })
    }
  }

  onClick () {
    document.addEventListener('keydown', this.keyDownListener)
    document.addEventListener('click', this.clickOutsideListener)
    if (gamepadManager) { gamepadManager.addButtonStateListener(this.buttonDownListener) }
    this.setState({ listening: true })
  }

  onRightClick () {
    // Remove hotkey
    this.setState({ hotkey: undefined })
    if (this.props.onRightClick) {
      this.props.onRightClick(this.props.shortcut)
    }
    this.removeListeners()
  }

  keyDownListener (event: KeyboardEvent) {
    this.setState({ hotkey: HotkeyButton.keyToAccelerator(event.key) })
    if (this.props.onClick) {
      this.props.onClick(this.props.shortcut, HotkeyButton.keyToAccelerator(event.key))
    }
    this.removeListeners()
  }

  buttonDownListener (buttonState: ButtonState) {
    const button = buttonState.find((button) => button.pressed)
    if (button !== undefined) {
      const hotkey = `button${button.key}`
      this.setState({ hotkey })
      if (this.props.onClick) {
        this.props.onClick(this.props.shortcut, hotkey)
      }
      this.removeListeners()
    }
  }

  clickOutsideListener (event: MouseEvent) {
    if (!!this.div.current && !this.div.current.contains(event.target as Node)) {
      this.removeListeners()
    }
  }

  removeListeners () {
    this.setState({ listening: false })
    document.removeEventListener('keydown', this.keyDownListener)
    document.removeEventListener('click', this.clickOutsideListener)
    if (gamepadManager) { gamepadManager.removeButtonStateListener(this.buttonDownListener) }
  }

  render () {
    const { iconSrc, className } = this.props
    const { hotkey, listening } = this.state
    const styles = {
      button: {
        flex: '0 0 auto',
        lineHeight: '40px',
        minWidth: '120px',
        height: '40px',
        color: listening ? '#FFF' : '#000',
        backgroundColor: listening ? '#323245' : '#ffe500',
        textAlign: 'center',
        cursor: 'pointer',
        outline: 'none',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        border: '0',
        borderRadius: '5px',
        boxShadow: '1px 4px 13px 0 rgba(0,0,0,0.5)',
        display: 'inline-block',
        fontSize: '13px'
      },
      icon: {
        padding: '4px',
        width: '40px',
        height: '40px',
        float: 'left',
        borderRadius: '4px'
      }
    } as const
    return (
      <div
        ref={this.div}
        className={`hotkey-button${listening ? ' hotkey-button-listening' : ''} ${className ?? ''}`.trim()}
        style={styles.button}
        onClick={this.onClick}
        onContextMenu={this.onRightClick}
      >
        {iconSrc ? <img style={styles.icon} src={iconSrc} /> : ''}
        <div>{listening ? '...' : hotkey ?? 'None'}</div>
      </div>
    )
  }

  /**
   * Converts a KeyboardEvent.key pre-defined value into an Electron accelerator value
   *
   * @param {string} [key] - A KeyboardEvent.key value
   * @returns {string | undefined} An Electron accelerator value
   * @see https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
   * @see https://www.electronjs.org/docs/api/accelerator
   */
  public static keyToAccelerator (key?: string): string | undefined {
    if (key === undefined) {
      return undefined
    }

    // If key is single alphanumeric then just use its value
    if (key.length === 1 && new RegExp(/^[a-zA-Z0-9]+$/).test(key)) {
      return key
    }

    // If key is a function key, use its value
    if (new RegExp(/^F\d+$/).test(key)) {
      return key
    }

    switch (key) {
      // Other Electron supported keys
      case ' ':
        return 'Space'

      case 'CapsLock':
        return 'Capslock'

      case 'NumLock':
        return 'Numlock'

      case 'ScrollLock':
        return 'Scrolllock'

      case 'ArrowDown':
        return 'Down'

      case 'ArrowLeft':
        return 'Left'

      case 'ArrowRight':
        return 'Right'

      case 'ArrowUp':
        return 'Up'

      case 'AudioVolumeUp':
        return 'VolumeUp'

      case 'AudioVolumeDown':
        return 'VolumeDown'

      case 'AudioVolumeMute':
        return 'VolumeMute'

      case 'MediaTrackNext':
        return 'MediaNextTrack'

      case 'MediaTrackPrevious':
        return 'MediaPreviousTrack'

      case 'Separator':
      case 'Decimal':
        return 'numdec'

      case 'Add':
        return 'numadd'

      case 'Subtract':
        return 'numsub'

      case 'Multiply':
        return 'nummult'

      case 'Divide':
        return 'numdiv'

      case 'Tab':
      case 'Backspace':
      case 'Delete':
      case 'Insert':
      case 'Enter':
      case 'Home':
      case 'End':
      case 'PageUp':
      case 'PageDown':
      case 'Escape':
      case 'PrintScreen':
      case 'MediaStop':
      case 'MediaPlayPause':
      case '[':
      case '{':
      case ']':
      case '}':
      case '\\':
      case '|':
      case ';':
      case ':':
      case "'":
      case '"':
      case ',':
      case '<':
      case '.':
      case '>':
      case '/':
      case '?':
      case '`':
      case '!':
      case '@':
      case '#':
      case '$':
      case '%':
      case '^':
      case '&':
      case '*':
      case '(':
      case ')':
      case '-':
      case '_':
      case '=':
      case '+':
        return key

      // 'Alt' modifiers
      case 'AltGraph':
      case 'Fn':
      case 'FnLock':
      case 'Alt':
        // key = "Alt" // Modifiers are not available in this release
        return undefined

      // 'Control' modifiers
      case 'Hyper':
      case 'Meta':
      case 'Symbol':
      case 'SymbolLock':
      case 'Control':
        // key = "Control" // Modifiers are not available in this release
        return undefined

      // 'Shift' modifiers
      case 'Super':
      case 'Shift':
        // key = "Shift" // Modifiers are not available in this release
        return undefined

      // Uncommon keys
      case 'Clear':
      case 'Cut':
      case 'Undo':
        return 'Delete'

      case 'Copy':
      case 'CrSel':
      case 'Paste':
      case 'Redo':
        return 'Insert'

      // Convert all UI keys to the escape key
      case 'Accept':
      case 'Again':
      case 'Attn':
      case 'Cancel':
      case 'ContextMenu':
      case 'Execute':
      case 'Find':
      case 'Finish':
      case 'Help':
      case 'Pause':
      case 'Play':
      case 'Props':
      case 'Select':
      case 'ZoomIn':
      case 'ZoomOut':
        return 'Escape'

      // There are too many possible keys so I am not going to produce an exhaustive list
      default:
        return undefined
    }
  }
}
