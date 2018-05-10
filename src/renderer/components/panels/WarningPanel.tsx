import './WarningPanel.scss'

import * as React from 'react'

interface WarningPanelProps {
  warning: string
}

export class WarningPanel extends React.PureComponent<WarningPanelProps> {
  render () {
    const { warning } = this.props
    return (
      <div className='warning-panel-wrapper'>
        {
          warning &&
          <div className='warning-panel'>
            <img src='img/warning.svg' />
            <div>{ warning }</div>
          </div>
        }
      </div>
    )
  }
}
