import {
  IsConnectedToEmulatorAction,
  SetServerAction,
  SetConnectionErrorAction,
  SetPlayersAction,
  SetPlayerAction,
  DisconnectAction,
  ConnectionActionType
} from './models/connection.model'
import { Server } from '../../models/Server.model'
import { IPlayer, IPlayerUpdate } from '../../../proto/ServerClientMessage'

export function isConnectedToEmulator (isConnectedToEmulator: boolean): IsConnectedToEmulatorAction {
  return {
    type: ConnectionActionType.IS_CONNECTED_TO_EMULATOR,
    isConnectedToEmulator
  }
}

export function setServer (server: Server): SetServerAction {
  return {
    type: ConnectionActionType.SET_SERVER,
    server
  }
}

export function setConnectionError (error: string): SetConnectionErrorAction {
  return {
    type: ConnectionActionType.SET_CONNECTION_ERROR,
    error
  }
}

export function setPlayers (players: IPlayerUpdate[]): SetPlayersAction {
  return {
    type: ConnectionActionType.SET_PLAYERS,
    players
  }
}

export function setPlayer (playerId: number, player: IPlayer): SetPlayerAction {
  return {
    type: ConnectionActionType.SET_PLAYER,
    playerId,
    player
  }
}

export function disconnect (): DisconnectAction {
  return {
    type: ConnectionActionType.DISCONNECT
  }
}
