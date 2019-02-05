import './ConsolePanel.scss'

import * as React from 'react'

import { ConsoleServerMessage } from '../../../models/State.model'

interface ConsolePanelProps {
  messages: ConsoleServerMessage[]
}

export class ConsolePanel extends React.PureComponent<ConsolePanelProps> {
  private renderConsoleMessages (): JSX.Element[] {
    const { messages } = this.props
    return messages.map(message => (
      <div
        key={message.key}
        className={message.isStdErr ? 'console-panel-message-warning' : ''}
      >
        { message.message }
      </div>
    ))
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
