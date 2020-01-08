import * as React from 'react'

interface ToggleButtonProps {
  on?: boolean,
  onIconSrc?: string,
  offIconSrc?: string,
  onText?: string,
  offText?: string,
  onClick?: (toggled: boolean) => void,
}

interface ToggleButtonState {
  on: boolean,
}

export class ToggleButton extends React.PureComponent<ToggleButtonProps, ToggleButtonState> {
  constructor(props: ToggleButtonProps) {
    super(props)
    this.state = {
      on: !!props.on,
    }
    this.onClick = this.onClick.bind(this)
  }

  componentWillReceiveProps (nextProps: ToggleButtonProps) {
    const { on } = nextProps
    if (on !== undefined && on !== this.state.on) {
      this.setState({ on })
    }
  }

  onClick () {
    const on = !this.state.on
    this.setState({ on })
    if (!!this.props.onClick) {
      this.props.onClick(on)
    }
  }

  render () {
    const { onIconSrc, offIconSrc, onText, offText } = this.props
    const { on } = this.state
    let styles: any = {
      button: {
        flex: '0 0 auto',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '40px',
        minWidth: '120px',
        height: '40px',
        color: !on ? '#FFF' : '#000',
        backgroundColor: !on ? '#323245' : '#ffe500',
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
    }
    return (
      <div
        style={styles.button}
        onClick={this.onClick}
      >
        {this.props.children}
        {on ?
          <div>{onText || ''}</div>
          :
          <div>{offText || ''}</div>
        }
        {on ?
          <div>{!!onIconSrc ? <img style={styles.icon} src={onIconSrc} /> : ''}</div>
          :
          <div>{!!offIconSrc ? <img style={styles.icon} src={offIconSrc} /> : ''}</div>
        }
      </div>
    )
  }
}
