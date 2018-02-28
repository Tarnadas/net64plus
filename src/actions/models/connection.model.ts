import { Action } from 'redux'

import { Connection } from '../../Connection'
import { Player } from '../../models/Server.model'

export interface SetConnectionAction extends Action {
  connection: Connection
}

export interface SetConnectionErrorAction extends Action {
  error: string
}

export interface SetPlayersAction extends Action {
  players: Player[]
}

export interface SetPlayerAction extends Action {
  playerId: number
  player: Player
}

export interface HasTokenAction extends Action {
  hasToken: boolean
}

export type DisconnectAction = Action

export type ConnectionAction =
  SetConnectionAction
  & SetConnectionErrorAction
  & SetPlayersAction
  & SetPlayerAction
  & HasTokenAction
  & DisconnectAction
