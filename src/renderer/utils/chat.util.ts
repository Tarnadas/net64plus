import * as marked from 'marked'
import { emojify } from 'node-emoji'

import { store } from '..'
import { addGlobalChatMessage, clearGlobalChatMessages } from '../actions/chat'
import { ChatMessage } from '../../models/State.model'

const { sanitize } = require('dompurify').default

export function addGlobalMessage (message: string, username: string) {
  const date = new Date()
  const sanitizedMessage = sanitize(emojify(marked(message.replace(/<.*>/g, ''))))
  const chatMessage: ChatMessage = {
    key: date.getUTCMilliseconds(),
    time: `${String(date.getHours()).padStart(2, '00')}:${String(date.getMinutes()).padStart(2, '00')}:${String(date.getSeconds()).padStart(2, '00')}`,
    message: sanitizedMessage,
    username
  }
  store.dispatch(addGlobalChatMessage(chatMessage))
}

export function clearGlobalMessages (): void {
  store.dispatch(clearGlobalChatMessages())
}
