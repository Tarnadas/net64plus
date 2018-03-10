import { AddGlobalChatMessageAction, ClearGlobalChatMessagesAction } from './models/chat.model'
import { ChatMessage } from '../../models/State.model'

export function addGlobalChatMessage (chatMessage: ChatMessage): AddGlobalChatMessageAction {
  return {
    type: 'ADD_GLOBAL_CHAT_MESSAGE',
    chatMessage
  }
}

export function clearGlobalChatMessages (): ClearGlobalChatMessagesAction {
  return {
    type: 'CLEAR_GLOBAL_CHAT_MESSAGES'
  }
}
