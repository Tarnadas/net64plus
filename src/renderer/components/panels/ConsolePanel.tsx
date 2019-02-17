import './ConsolePanel.scss'

import * as React from 'react'

import { ConsoleServerMessage, IoChannel } from '../../../models/State.model'

interface ConsolePanelProps {
  messages: ConsoleServerMessage[]
}

export class ConsolePanel extends React.PureComponent<ConsolePanelProps> {
  private renderConsoleMessages (): JSX.Element[] {
    const { messages } = this.props
    return messages.map(message => {
      let className = ''
      switch (message.channel) {
        case IoChannel.Warn:
          className = 'console-panel-message-warning'
          break
        case IoChannel.Err:
          className = 'console-panel-message-error'
          break
      }
      return <div
        key={message.key}
        className={className}
      >
        { message.message }
      </div>
    })
  }

  public render (): JSX.Element {
    return (
      <div className='console-panel'>
        <div className='console-panel-messages'>
          { this.renderConsoleMessages() }
        </div>
      </div>
    )
  }
}
