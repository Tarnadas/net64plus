import { MiddlewareAPI, Action } from 'redux'
import { Dispatch } from 'react-redux'

import { ChildProcess } from 'child_process'

import { State } from '../../models/State.model'
import { ServerActionType, SetServerProcessAction } from '../actions/models/server.model'
import { addServerMessage, exitServerProcess } from '../actions/server'

const decoder = new TextDecoder('utf8')

export const serverMiddleware: any = ({ dispatch }: MiddlewareAPI<State>) => (next: Dispatch<State>) => (action: Action) => {
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

function listenToProcessOutput (process: ChildProcess, dispatch: Dispatch<State>): void {
  process.on('exit', (code: number) => {
    if (code != null) dispatch(exitServerProcess(code))
  })
  process.on('error', (err: Error) => {
    console.error(err)
  })
  process.stdout.on('data', (chunk: Buffer) => {
    dispatch(addServerMessage(decoder.decode(chunk)))
  })
  process.stderr.on('data', (chunk: Buffer) => {
    dispatch(addServerMessage(decoder.decode(chunk), true))
  })
}
