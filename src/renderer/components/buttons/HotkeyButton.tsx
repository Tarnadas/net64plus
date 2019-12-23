import './HotkeyButton.scss'

import * as React from 'react'

interface HotkeyButtonProps {
  characterId: number,
  hotkey?: string,
  className?: string,
  onClick?: (characterId: number, hotkey: string) => void,
  onRightClick?: (characterId: number) => void,
}

interface HotkeyButtonState {
  hotkey?: string,
  listening: boolean,
}

const CHARACTER_ICONS: { [characterId: number]: string } = {
  0: 'img/mario.png',
  1: 'img/luigi.png',
  2: 'img/yoshi.png',
  3: 'img/wario.png',
  4: 'img/peach.png',
  5: 'img/toad.png',
  6: 'img/waluigi.png',
  7: 'img/rosalina.png',
  8: 'img/sonic.png',
  9: 'img/knuckles.png',
  10: 'img/goomba.png',
  11: 'img/kirby.png',
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
        this.props.onClick(this.props.characterId, event.key)
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
      this.props.onRightClick(this.props.characterId)
    }
  }

  render () {
    const { characterId, className } = this.props
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
        fontSize: '13px'
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
        <img style={styles.icon} src={CHARACTER_ICONS[characterId]} />
        <div>{listening ? '...' : hotkey || 'None'}</div>
      </div>
    )
  }
}
