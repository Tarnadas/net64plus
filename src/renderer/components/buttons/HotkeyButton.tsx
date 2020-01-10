import './HotkeyButton.scss'

import * as React from 'react'
const ReactDOM = require('react-dom') // @types/react-dom is out of date

import { GamepadManager, ButtonState } from '../../GamepadManager'
import { gamepadManager } from '../..'

interface HotkeyButtonProps {
  shortcut: string,
  hotkey?: string,
  className?: string,
  iconSrc?: string,
  gamepadManager?: GamepadManager,
  onClick?: (shortcut: string, hotkey: string) => void,
  onRightClick?: (shortcut: string) => void,
}

interface HotkeyButtonState {
  hotkey?: string,
  listening: boolean,
}

export class HotkeyButton extends React.PureComponent<HotkeyButtonProps, HotkeyButtonState> {
  constructor(props: HotkeyButtonProps) {
    super(props)
    this.state = {
      hotkey: props.hotkey,
      listening: false,
    }
    this.onClick = this.onClick.bind(this)
    this.onRightClick = this.onRightClick.bind(this)
    this.keyDownListener = this.keyDownListener.bind(this)
    this.buttonDownListener = this.buttonDownListener.bind(this)
    this.clickOutsideListener = this.clickOutsideListener.bind(this)
    this.removeListeners = this.removeListeners.bind(this)
  }

  private node: Node | undefined

  componentDidMount () {
    this.node = ReactDOM.findDOMNode(this);
  }

  componentWillReceiveProps (nextProps: HotkeyButtonProps) {
    const { hotkey } = nextProps
    if (hotkey !== this.state.hotkey) {
      this.setState({ hotkey })
    }
  }

  onClick () {
    document.addEventListener('keydown', this.keyDownListener)
    document.addEventListener('click', this.clickOutsideListener)
    if (!!gamepadManager) { gamepadManager.addButtonStateListener(this.buttonDownListener) }
    this.setState({ listening: true })
  }

  onRightClick () {
    // Remove hotkey
    this.setState({ hotkey: undefined })  
    if (!!this.props.onRightClick) {
      this.props.onRightClick(this.props.shortcut)
    }
    this.removeListeners()
  }

  keyDownListener (event: KeyboardEvent) {
    this.setState({ hotkey: event.key })
    if (!!this.props.onClick) {
      this.props.onClick(this.props.shortcut, event.key)
    }
    this.removeListeners()
  }   

  buttonDownListener (buttonState: ButtonState) {
    const button = buttonState.find((button) => button.pressed)
    if (button !== undefined) {
      const hotkey = `button${button.key}`
      this.setState({ hotkey })
      if (!!this.props.onClick) {
        this.props.onClick(this.props.shortcut, hotkey)
      }
      this.removeListeners()
    }
  }

  clickOutsideListener (event: MouseEvent) {
    if (!!this.node && !this.node.contains(event.target as Node)) {
      this.removeListeners()
    }
  }

  removeListeners () {
    this.setState({ listening: false })
    document.removeEventListener('keydown', this.keyDownListener)
    document.removeEventListener('click', this.clickOutsideListener)
    if (!!gamepadManager) { gamepadManager.removeButtonStateListener(this.buttonDownListener) }
  }

  render () {
    const { iconSrc, className } = this.props
    const { hotkey, listening } = this.state
    let styles: any = {
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
        fontSize: '13px',
      },
      icon: {
        padding: '4px',
        width: '40px',
        height: '40px',
        float: 'left',
        borderRadius: '4px',
      },
    }
    return (
      <div
        className={`hotkey-button${listening ? ' hotkey-button-listening': ''} ${className || ''}`.trim()}
        style={styles.button}
        onClick={this.onClick}
        onContextMenu={this.onRightClick}
      >
        {!!iconSrc ? <img style={styles.icon} src={iconSrc} /> : ''}
        <div>{listening ? '...' : hotkey || 'None'}</div>
      </div>
    )
  }
}
