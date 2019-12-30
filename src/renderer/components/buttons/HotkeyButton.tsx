import './HotkeyButton.scss'

import * as React from 'react'

interface HotkeyButtonProps {
  shortcut: string,
  hotkey?: string,
  className?: string,
  iconSrc?: string,
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
  }

  onClick () {
    // Activate listening mode
    const keyDownListener = (event: KeyboardEvent) => {
      // Disablde listening mode
      this.setState({ hotkey: event.key, listening: false })
      if (!!this.props.onClick) {
        this.props.onClick(this.props.shortcut, event.key)
      }
      document.removeEventListener('keydown', keyDownListener)
    };
    document.addEventListener('keydown', keyDownListener)
    this.setState({ listening: true })
  }

  onRightClick () {
    // Remove hotkey
    this.setState({ hotkey: undefined, listening: false })
    if (!!this.props.onRightClick) {
      this.props.onRightClick(this.props.shortcut)
    }
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
