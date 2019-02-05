import produce from 'immer'

import { initialState } from '.'
import { ServerState, ServerStateDraft } from '../../models/State.model'
import { ServerActionType, ServerAction } from '../actions/models/server.model'

export const server = (state: ServerState = initialState.server, action: ServerAction) =>
  produce<ServerState>(state, (draft: ServerStateDraft) => {
    switch (action.type) {
      case ServerActionType.SET_SERVER_PROCESS:
        draft.process = action.process
        draft.exitCode = null
        break
      case ServerActionType.REMOVE_SERVER_PROCESS:
        try {
          if (draft.process && !draft.process.killed) draft.process.kill('SIGINT')
        } catch (err) {
          // process already closed
        }
        draft.process = null
        draft.exitCode = null
        draft.messages = []
        break
      case ServerActionType.EXIT_SERVER_PROCESS:
        draft.process = null
        draft.exitCode = action.code
        break
      case ServerActionType.ADD_SERVER_MESSAGE:
        draft.messages = [
          ...draft.messages,
          {
            key: Math.random().toString(36).substr(0, 6),
            message: action.message,
            isStdErr: action.isStdErr
          }
        ]
        break
    }
  })
