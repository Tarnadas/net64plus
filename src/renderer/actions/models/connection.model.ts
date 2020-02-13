import { Action } from 'redux'

import { Server } from '../../../models/Server.model'
import { IPlayer, IPlayerUpdate } from '../../../../proto/ServerClientMessage'
import { Position } from '../../../models/Emulator.model'

export interface SetServerAction extends Action {
  server: Server
}

export interface SetConnectionErrorAction extends Action {
  error: string
}

export interface SetPlayersAction extends Action {
  players: IPlayerUpdate[]
}

export interface SetPlayerAction extends Action {
  playerId: number
  player: IPlayer
}

export interface UpdatePlayerPositionAction extends Action {
  self: Position
  positions: (Position | null)[]
}

export interface SetGameModeAction extends Action {
  gameMode: number
}

export type AuthenticationRequired = Action

export type AuthenticationAccepted = Action

export interface AuthenticationDenied extends Action {
  throttle: number
}

export type DisconnectAction = Action

export type ConnectionAction =
  SetServerAction
  & SetConnectionErrorAction
  & SetPlayersAction
  & SetPlayerAction
  & UpdatePlayerPositionAction
  & SetGameModeAction
  & AuthenticationRequired
  & AuthenticationAccepted
  & AuthenticationDenied
  & DisconnectAction

export enum ConnectionActionType {
  SET_SERVER = 'SET_SERVER',
  SET_CONNECTION_ERROR = 'SET_CONNECTION_ERROR',
  SET_PLAYERS = 'SET_PLAYERS',
  SET_PLAYER = 'SET_PLAYER',
  UPDATE_PLAYER_POSITIONS = 'UPDATE_PLAYER_POSITIONS',
  GAME_MODE = 'GAME_MODE',
  AUTHENTICATION_REQUIRED = 'AUTHENTICATION_REQUIRED',
  AUTHENTICATION_ACCEPTED = 'AUTHENTICATION_ACCEPTED',
  AUTHENTICATION_DENIED = 'AUTHENTICATION_DENIED',
  DISCONNECT = 'DISCONNECT'
}
