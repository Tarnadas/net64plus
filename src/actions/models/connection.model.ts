import { Action } from 'redux'

import { Connection } from '../../Connection'

export interface SetConnectionAction extends Action {
  connection: Connection
}

export interface SetConnectionErrorAction extends Action {
  error: string
}

export type DisconnectAction = Action

export type ConnectionAction =
  SetConnectionAction
  & SetConnectionErrorAction
  & DisconnectAction
