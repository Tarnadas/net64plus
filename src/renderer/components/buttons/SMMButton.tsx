import './SMMButton.scss'

import * as React from 'react'
import { Link } from 'react-router-dom'
import { shell } from 'electron'

// TODO https://github.com/KyleAMathews/deepmerge/issues/87
const deepMerge = require('deepmerge').default

export type ColorScheme = 'yellow' | 'green' | 'red'

export type IconStyle = 'dark' | 'bright'

interface SMMButtonProps {
  text: string
  iconSrc: string
  iconSrcHover?: string
  link?: string
  styles?: React.CSSProperties
  colorScheme?: ColorScheme
  iconStyle?: IconStyle
  // @deprecated
  enabled?: boolean
  disabled?: boolean
  external?: boolean
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
}

interface SMMButtonState {
  hover: boolean
}

export class SMMButton extends React.PureComponent<SMMButtonProps, SMMButtonState> {
  constructor (props: SMMButtonProps) {
    super(props)
    this.state = {
      hover: false
    }
    this.onOpenExternal = this.onOpenExternal.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }
  onOpenExternal () {
    if (this.props.link) shell.openExternal(this.props.link)
  }
  mouseEnter () {
    this.setState({
      hover: true
    })
    if (this.props.onMouseEnter) this.props.onMouseEnter()
  }
  mouseLeave () {
    this.setState({
      hover: false
    })
    if (this.props.onMouseLeave) this.props.onMouseLeave()
  }
  renderSubButton (styles: React.CSSProperties, iconStyle: React.CSSProperties) {
    return (
      <div>
        <div style={iconStyle}>
          <img style={styles.img} src={this.props.iconSrc} />
        </div>
        {
          this.props.text &&
          <div style={styles.text}>{this.props.text}</div>
        }
      </div>
    )
  }
  render () {
    const { className, disabled, text } = this.props
    const { hover } = this.state
    const colorScheme = this.props.colorScheme || 'yellow'
    const enabled = this.props.enabled == null
      ? true
      : this.props.enabled
    let styles: React.CSSProperties = {
      button: {
        flex: '0 0 auto',
        margin: '0 10px 10px 10px',
        lineHeight: '40px',
        minWidth: '120px',
        height: '40px',
        backgroundColor: enabled
          ? colorScheme === 'yellow'
            ? this.state.hover ? '#323245' : '#ffe500'
            : colorScheme === 'green'
              ? this.state.hover ? '#323245' : '#33cc33'
              : this.state.hover ? '#323245' : '#CC7034'
          : '#666',
        textAlign: 'left',
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
      },
      subButton: {
        img: {
          width: '100%',
          height: '100%'
        },
        text: {
          color: enabled
            ? hover
              ? '#fff'
              : '#323245'
            : '#fff',
          float: 'left',
          width: 'auto',
          padding: '0 5px'
        }
      }
    }
    if (this.props.styles) {
      styles = deepMerge(styles, this.props.styles)
    }
    const iconStyle: React.CSSProperties = Object.assign({},
      styles.icon,
      this.props.iconStyle === 'dark'
        ? { backgroundColor: 'rgb(50, 50, 69)' }
        : {},
      enabled
        ? hover
          ? this.props.iconStyle === 'dark'
            ? { backgroundColor: '#000' }
            : {}
          : {}
        : { backgroundColor: '#666' }
    )
    return (
      <div
        className={`smm-button${disabled ? ' smm-button-disabled' : ''}${className ? ` ${className}` : ''}`}
        style={styles.button}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={
          enabled
            ? this.props.onClick
              ? this.props.onClick
              : this.props.external
                ? this.onOpenExternal
                : undefined
            : undefined
        }
      >
        {
          this.props.link && !this.props.external
            ? <Link to={this.props.link}>
              {
                this.renderSubButton(styles.subButton, iconStyle)
              }
            </Link>
            : this.renderSubButton(styles.subButton, iconStyle)
        }
      </div>
    )
  }
}
