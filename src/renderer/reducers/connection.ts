import produce from 'immer'

import { initialState } from '.'
import { ConnectionAction, ConnectionActionType } from '../actions/models/connection.model'
import { ConnectionState, ConnectionStateDraft } from '../../models/State.model'
import { IPlayer } from '../../../proto/ServerClientMessage'
import { Player } from '../../models/Emulator.model'

export const connection = (state: ConnectionState = initialState.connection, action: ConnectionAction) =>
  produce<ConnectionState>(state, (draft: ConnectionStateDraft) => {
    switch (action.type) {
      case ConnectionActionType.SET_SERVER:
        draft.server = action.server
        draft.error = ''
        draft.authenticated = true
        break
      case ConnectionActionType.SET_CONNECTION_ERROR:
        draft.error = action.error
        break
      case ConnectionActionType.SET_PLAYERS:
        if (!draft.server) return
        const players: (Player | null)[] = new Array(25).fill(null)
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
      case ConnectionActionType.UPDATE_PLAYER_POSITIONS:
        draft.selfPos = action.self
        for (let i = 0; i < action.positions.length; i++) {
          const position = action.positions[i]
          if (!position) continue
          if (!draft.server) return
          if (!draft.server.players) return
          if (!draft.server.players[i]) return
          draft.server.players[i]!.position = position
        }
        break
      case ConnectionActionType.GAME_MODE:
        if (!draft.server) return
        draft.server.gameMode = action.gameMode
        break
      case ConnectionActionType.AUTHENTICATION_REQUIRED:
        draft.authenticated = false
        break
      case ConnectionActionType.AUTHENTICATION_ACCEPTED:
        draft.authenticated = true
        break
      case ConnectionActionType.AUTHENTICATION_DENIED:
        draft.authenticationThrottle = Date.now() + action.throttle * 1000
        break
      case ConnectionActionType.DISCONNECT:
        draft.server = null
        break
    }
  })
