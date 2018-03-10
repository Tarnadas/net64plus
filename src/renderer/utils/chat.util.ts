import { store } from '..'
import { addGlobalChatMessage, clearGlobalChatMessages } from '../actions/chat'
import { ChatMessage } from '../../models/State.model'

const HISTORY_LENGTH = 100

export function addGlobalMessage (message: string, username: string) {
  const date = new Date()
  const chatMessage: ChatMessage = {
    key: date.getUTCMilliseconds(),
    time: `${String(date.getHours()).padStart(2, '00')}:${String(date.getMinutes()).padStart(2, '00')}:${String(date.getSeconds()).padStart(2, '00')}`,
    message,
    username
  }
  store.dispatch(addGlobalChatMessage(chatMessage))
}

export function clearGlobalMessages (): void {
  store.dispatch(clearGlobalChatMessages())
}
