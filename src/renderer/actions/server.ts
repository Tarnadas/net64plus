import { ChildProcess } from 'child_process'

import {
  SetServerProcessAction,
  ServerActionType,
  RemoveServerProcessAction,
  AddServerMessageAction,
  ExitServerProcessAction
} from './models/server.model'

export function setServerProcess (process: ChildProcess): SetServerProcessAction {
  return {
    type: ServerActionType.SET_SERVER_PROCESS,
    process
  }
}

export function removeServerProcess (): RemoveServerProcessAction {
  return {
    type: ServerActionType.REMOVE_SERVER_PROCESS
  }
}

export function exitServerProcess (code: number): ExitServerProcessAction {
  return {
    type: ServerActionType.EXIT_SERVER_PROCESS,
    code
  }
}

export function addServerMessage (message: string, isStdErr = false): AddServerMessageAction {
  return {
    type: ServerActionType.ADD_SERVER_MESSAGE,
    message,
    isStdErr
  }
}
