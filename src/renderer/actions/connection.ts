import {
  SetServerAction,
  SetConnectionErrorAction,
  SetPlayersAction,
  SetPlayerAction,
  SetPlayerIdAction,
  SetGameModeAction,
  AuthenticationRequired,
  AuthenticationAccepted,
  AuthenticationDenied,
  DisconnectAction,
  ConnectionActionType,
  UpdatePlayerPositionAction
} from './models/connection.model'
import { Server } from '../../models/Server.model'
import { IPlayer, IPlayerUpdate } from '../../../proto/ServerClientMessage'
import { Position } from '../../models/Emulator.model'

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

export function setPlayerId (playerId: number): SetPlayerIdAction {
  return {
    type: ConnectionActionType.SET_PLAYER_ID,
    playerId
  }
}

export function updatePlayerPositions ({self, cameraAngle, positions}: {self: Position, cameraAngle: number, positions: (Position | null)[]}): UpdatePlayerPositionAction {
  return {
    type: ConnectionActionType.UPDATE_PLAYER_POSITIONS,
    self,
    cameraAngle,
    positions
  }
}

export function setGameMode (gameMode: number): SetGameModeAction {
  return {
    type: ConnectionActionType.GAME_MODE,
    gameMode
  }
}

export function authenticationRequired (): AuthenticationRequired {
  return {
    type: ConnectionActionType.AUTHENTICATION_REQUIRED
  }
}

export function authenticationAccepted (): AuthenticationAccepted {
  return {
    type: ConnectionActionType.AUTHENTICATION_ACCEPTED
  }
}

export function authenticationDenied (throttle: number): AuthenticationDenied {
  return {
    type: ConnectionActionType.AUTHENTICATION_DENIED,
    throttle
  }
}

export function disconnect (): DisconnectAction {
  return {
    type: ConnectionActionType.DISCONNECT
  }
}
