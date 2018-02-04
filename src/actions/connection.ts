import { Connection } from '../Connection'
import {
  SetConnectionAction,
  SetConnectionErrorAction,
  DisconnectAction,
  SetPlayersAction,
  SetPlayerAction
} from './models/connection.model'
import { Player } from '../models/Server.model'

export function setConnection (connection: Connection): SetConnectionAction {
  return {
    type: 'SET_CONNECTION',
    connection
  }
}

export function setConnectionError (error: string): SetConnectionErrorAction {
  return {
    type: 'SET_CONNECTION_ERROR',
    error
  }
}

export function disconnect (): DisconnectAction {
  return {
    type: 'DISCONNECT'
  }
}

export function setPlayers (players: Player[]): SetPlayersAction {
  return {
    type: 'SET_PLAYERS',
    players
  }
}

export function setPlayer (playerId: number, player: Player): SetPlayerAction {
  return {
    type: 'SET_PLAYER',
    playerId,
    player
  }
}
