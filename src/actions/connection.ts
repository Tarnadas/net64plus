import { Connection } from '../Connection'
import { SetConnectionAction, SetConnectionErrorAction, DisconnectAction } from './models/connection.model'

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
