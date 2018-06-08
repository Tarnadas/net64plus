import * as React from 'react'

import { ChatMessage } from '../../../models/State.model'

interface ChatMessagePanelProps {
  message: ChatMessage
}

export class ChatMessagePanel extends React.PureComponent<ChatMessagePanelProps> {
  public render (): JSX.Element {
    const { message } = this.props
    return (
      <div>
        {
          `[${message.time}] ${message.username}: ${message.message}`
        }
      </div>
    )
  }
}
