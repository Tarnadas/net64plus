import produce from 'immer'

import { initialState } from '.'
import { ServerState, ServerStateDraft, IoChannel, ConsoleServerMessage } from '../../models/State.model'
import { ServerActionType, ServerAction } from '../actions/models/server.model'

export const server = (state: ServerState = initialState.server, action: ServerAction) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
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
        const messages = action.message.split('\n')
        const chatMessages: ConsoleServerMessage[] = []
        for (const message of messages) {
          if (!message) continue
          const isWarn = action.isStdErr
          const isErr = isWarn && message.startsWith('ERROR')
          chatMessages.push({
            key: Math.random().toString(36).substr(0, 6),
            message,
            channel: isErr ? IoChannel.Err : isWarn ? IoChannel.Warn : IoChannel.Out
          })
        }
        draft.messages = [
          ...draft.messages,
          ...chatMessages
        ]
        break
    }
  })
