import produce from 'immer'

import { initialState } from '.'
import { ConnectionAction, ConnectionActionType } from '../actions/models/connection.model'
import { ConnectionState, ConnectionStateDraft } from '../../models/State.model'
import { IPlayer } from '../../../proto/ServerClientMessage'

export const connection = (state: ConnectionState = initialState.connection, action: ConnectionAction) =>
  produce<ConnectionState>(state, (draft: ConnectionStateDraft) => {
    switch (action.type) {
      case ConnectionActionType.SET_SERVER:
        draft.server = action.server
        draft.error = ''
        break
      case ConnectionActionType.SET_CONNECTION_ERROR:
        draft.error = action.error
        break
      case ConnectionActionType.SET_PLAYERS:
        if (!draft.server) return
        const players: IPlayer[] = new Array(25).fill(null)
        for (const player of action.players) {
          if (!player.player || player.playerId == null) continue
          players[player.playerId] = player.player
        }
        draft.server.players = players
        break
      case ConnectionActionType.SET_PLAYER:
        if (!draft.server) return
        if (!draft.server.players) draft.server.players = []
        draft.server.players[action.playerId] = action.player
        break
      case ConnectionActionType.GAME_MODE:
        if (!draft.server) return
        draft.server.gameMode = action.gameMode
        break
      case ConnectionActionType.DISCONNECT:
        draft.server = null
        break
    }
  })
