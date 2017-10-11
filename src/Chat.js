import { List } from 'immutable'

import { store } from './renderer'
import { setChatMessages } from './actions/chat'

const HISTORY_LENGTH = 100

export default class Chat {
  constructor () {
    this.messages = List()
  }
  addMessage (message, username) {
    const date = new Date()
    message = {
      key: date.getUTCMilliseconds(),
      time: `${String(date.getHours()).padStart(2, '00')}:${String(date.getMinutes()).padStart(2, '00')}:${String(date.getSeconds()).padStart(2, '00')}`,
      message,
      username
    }
    this.messages = this.messages.push(message)
    if (this.messages.size > HISTORY_LENGTH) {
      this.messages.slice(1)
    }
    store.dispatch(setChatMessages(this.messages))
  }
  clear () {
    this.messages = List()
    store.dispatch(setChatMessages(this.messages))
  }
}
