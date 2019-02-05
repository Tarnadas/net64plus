import { Action } from 'redux'

import { ChildProcess } from 'child_process'

export interface SetServerProcessAction extends Action {
  process: ChildProcess
}

export type RemoveServerProcessAction = Action

export interface ExitServerProcessAction extends Action {
  code: number
}

export interface AddServerMessageAction extends Action {
  message: string
  isStdErr: boolean
}

export type ServerAction =
  SetServerProcessAction
  & RemoveServerProcessAction
  & ExitServerProcessAction
  & AddServerMessageAction

export enum ServerActionType {
  SET_SERVER_PROCESS = 'SET_SERVER_PROCESS',
  REMOVE_SERVER_PROCESS = 'REMOVE_SERVER_PROCESS',
  EXIT_SERVER_PROCESS = 'EXIT_SERVER_PROCESS',
  ADD_SERVER_MESSAGE = 'ADD_SERVER_MESSAGE'
}
