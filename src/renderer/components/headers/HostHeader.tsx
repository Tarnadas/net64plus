import './HostHeader.scss'

import * as React from 'react'

interface HostHeaderProps {
  version: string
}

export class HostHeader extends React.PureComponent<HostHeaderProps> {
  public render (): JSX.Element {
    const { version } = this.props
    return (
      <div className='host-header'>
        Host Net64+ Server
        <div className='host-header-version'>v{ version }</div>
      </div>
    )
  }
}
