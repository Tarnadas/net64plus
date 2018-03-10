import { Action } from 'redux'

import { ChatMessage } from '../../../models/State.model'

export interface AddGlobalChatMessageAction extends Action {
  chatMessage: ChatMessage
}

export type ClearGlobalChatMessagesAction = Action

export type ChatAction =
  AddGlobalChatMessageAction
  & ClearGlobalChatMessagesAction
