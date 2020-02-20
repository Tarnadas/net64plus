import * as React from 'react'
import { shell } from 'electron'

interface ExternalLinkProps extends React.Props<any> {
  href: string
}

export class ExternalLink extends React.PureComponent<ExternalLinkProps> {
  constructor (public props: ExternalLinkProps) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    shell.openExternal(this.props.href)
  }

  render () {
    return <span
      style={{
        cursor: 'pointer',
        color: 'rgb(40, 24, 176)' // '#56d6ff'
      }}
      onClick={this.onClick}>
      { this.props.children }
    </span>
  }
}
