import React from 'react'
import { connect } from 'react-redux'

import SMMButton from '../buttons/SMMButton'

const MAX_LENGTH_CHAT_MESSAGE = 24

class ChatArea extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
    this.onMessageChange = this.onMessageChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onSend = this.onSend.bind(this)
    this.renderChatMessages = this.renderChatMessages.bind(this)
  }
  componentDidUpdate (prevProps) {
    if (prevProps.chat !== this.props.chat) {
      this.chat.scrollTop = this.chat.scrollHeight
    }
  }
  onMessageChange (e) {
    let value = e.target.value
    if (value.length > MAX_LENGTH_CHAT_MESSAGE) {
      value = value.substr(0, MAX_LENGTH_CHAT_MESSAGE)
    }
    this.setState({
      message: value
    })
  }
  onKeyPress (e) {
    if (e.key === 'Enter') {
      if (this.state.message) {
        this.props.connection.sendChatMessage(this.state.message)
        this.setState({
          message: ''
        })
      }
    }
  }
  onSend () {
    if (this.state.message) {
      this.props.connection.sendChatMessage(this.state.message)
      this.setState({
        message: ''
      })
    }
  }
  renderChatMessages (chat) {
    return chat.map(
      message =>
        <div key={message.key}>
          {
            `[${message.time}] ${message.username}: ${message.message}`
          }
        </div>
    ).toJS()
  }
  render () {
    const styles = {
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
        flex: '1 0 150px',
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
        <div id='scroll' style={styles.chat} ref={x => { this.chat = x }}>
          {
            this.renderChatMessages(this.props.chat)
          }
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  connection: state.getIn(['connection', 'connection']),
  chat: state.getIn(['chat', 'global'])
}))(ChatArea)
