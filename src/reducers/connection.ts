import produce from 'immer'

import { initialState } from '.'
import { ConnectionAction } from '../actions/models/connection.model'
import { ConnectionState, ConnectionStateDraft } from '../models/State.model'

export const connection = (state: ConnectionState = initialState.connection, action: ConnectionAction) =>
  produce<ConnectionState>(state, (draft: ConnectionStateDraft) => {
    switch (action.type) {
      case 'SET_CONNECTION':
        draft.connection = action.connection
        draft.error = ''
        break
      case 'SET_CONNECTION_ERROR':
        draft.error = action.error
        break
      case 'DISCONNECT':
        draft.connection = null
        break
      case 'SET_PLAYERS':
        if (!draft.connection) return
        draft.connection.server.players = action.players
        break
      case 'SET_PLAYER':
        if (!draft.connection) return
        // TODO
        // draft.connection.server.players = action.players
    }
  })
