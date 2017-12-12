import React from 'react'
import { shell } from 'electron'

export default class ExternalLink extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick () {
    shell.openExternal(this.props.href)
  }
  render () {
    return <span style={{
      cursor: 'pointer',
      color: 'rgb(40, 24, 176)' // '#56d6ff'
    }} onClick={this.onClick}>
      { this.props.children }
    </span>
  }
}
