import produce from 'immer'

import { initialState } from '.'
import { ChatAction } from '../actions/models/chat.model'
import { ChatState, ChatStateDraft } from '../../models/State.model'

const HISTORY_LENGTH = 100

export const chat = (state: ChatState = initialState.chat, action: ChatAction) =>
  produce<ChatState>(state, (draft: ChatStateDraft) => {
    switch (action.type) {
      case 'ADD_GLOBAL_CHAT_MESSAGE':
        draft.global = [...state.global, action.chatMessage]
        if (draft.global.length > HISTORY_LENGTH) {
          draft.global = draft.global.slice(1)
        }
        break
      case 'CLEAR_GLOBAL_CHAT_MESSAGES':
        draft.global = []
        break
    }
  })
