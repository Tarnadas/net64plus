import * as React from 'react'
import { connect } from 'react-redux'
import * as marked from 'marked'
import { emojify } from 'node-emoji'

import { connector } from '../..'
import { SMMButton } from '../buttons/SMMButton'
import { State, ChatMessage } from '../../../models/State.model'

interface ChatAreaProps {
  chat: ChatMessage[]
}

interface ChatAreaState {
  message: string
}

const MAX_LENGTH_CHAT_MESSAGE = 100

class Area extends React.PureComponent<ChatAreaProps, ChatAreaState> {
  private chat: HTMLElement | null = null

  constructor (public props: ChatAreaProps) {
    super(props)
    this.state = {
      message: ''
    }
    this.onMessageChange = this.onMessageChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onSend = this.onSend.bind(this)
    this.renderChatMessages = this.renderChatMessages.bind(this)
  }
  componentDidUpdate (prevProps: ChatAreaProps) {
    if (prevProps.chat === this.props.chat || !this.chat) return
    this.chat.scrollTop = this.chat.scrollHeight
  }
  onMessageChange (e: React.ChangeEvent<any>) {
    let value = e.target.value
    if (value.length > MAX_LENGTH_CHAT_MESSAGE) {
      value = value.substr(0, MAX_LENGTH_CHAT_MESSAGE)
    }
    this.setState({
      message: value
    })
  }
  onKeyPress (e: React.KeyboardEvent<any>) {
    if (e.key !== 'Enter') return
    if (!this.state.message) return
    this.sendChatMessage(this.state.message)
  }
  onSend () {
    if (!this.state.message) return
    this.sendChatMessage(this.state.message)
  }
  private sendChatMessage (message: string): void {
    if (message[0] === '/') {
      const [ command, ...args ] = message.substr(1).split(' ')
      connector.sendCommandMessage(command, args)
    } else {
      connector.sendGlobalChatMessage(this.state.message)
    }
    this.setState({
      message: ''
    })
  }
  renderChatMessages (chat: ChatMessage[]) {
    return chat.map(
      message => {
        const html = emojify(marked(`[${message.time}] ${message.username}: ${message.message}`))
          .replace('<p>', '<p class="header">')
        return (
          <div
            key={message.key}
            dangerouslySetInnerHTML={{
              __html: html
            }}
          />
        )
      }
    )
  }
  render () {
    const styles: React.CSSProperties = {
      area: {
        display: 'flex',
        flexDirection: 'column',
        color: '#000',
        flex: '1 0 auto',
        margin: '8px',
        fontSize: '18px',
        alignItems: 'flex-start'
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        minHeight: '50px'
      },
      chat: {
        display: 'flex',
        overflowY: 'auto',
        overflowX: 'hidden',
        flexDirection: 'column',
        backgroundColor: '#fff',
        flex: '1 0 250px',
        width: '100%',
        fontFamily: 'arial'
      },
      input: {
        fontSize: '18px',
        flex: '1 1 auto'
      }
    }
    return (
      <div style={styles.area}>
        <div style={styles.header}>
          <input style={styles.input} value={this.state.message} onChange={this.onMessageChange} onKeyPress={this.onKeyPress} />
          <SMMButton text='Send' iconSrc='img/submit.png' onClick={this.onSend} />
        </div>
        <div className='chat scroll' style={styles.chat} ref={x => { this.chat = x }}>
          {
            this.renderChatMessages(this.props.chat)
          }
        </div>
      </div>
    )
  }
}
export const ChatArea = connect((state: State) => ({
  chat: state.chat.global
}))(Area)
