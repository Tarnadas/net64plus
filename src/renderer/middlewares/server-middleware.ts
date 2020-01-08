import { MiddlewareAPI, Action, Dispatch } from 'redux'

import { ChildProcess } from 'child_process'

import { ServerActionType, SetServerProcessAction } from '../actions/models/server.model'
import { addServerMessage, exitServerProcess } from '../actions/server'

const decoder = new TextDecoder('utf8')

export const serverMiddleware = ({ dispatch }: MiddlewareAPI<any>) => (next: Dispatch<any>) => (action: Action) => {
  const nextAction = next(action)
  if (!nextAction) return nextAction
  switch (nextAction.type) {
    case ServerActionType.SET_SERVER_PROCESS:
      const setServerProcessAction = nextAction as SetServerProcessAction
      listenToProcessOutput(setServerProcessAction.process, dispatch)
      break
  }
  return nextAction
}

function listenToProcessOutput (process: ChildProcess, dispatch: Dispatch<any>): void {
  process.on('exit', (code: number) => {
    if (code != null) dispatch(exitServerProcess(code))
  })
  process.on('error', (err: Error) => {
    console.error(err)
  })
  process.stdout!.on('data', (chunk: Buffer) => {
    dispatch(addServerMessage(decoder.decode(chunk)))
  })
  process.stderr!.on('data', (chunk: Buffer) => {
    dispatch(addServerMessage(decoder.decode(chunk), true))
  })
}
