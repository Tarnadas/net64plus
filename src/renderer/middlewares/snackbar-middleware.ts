import { MiddlewareAPI, Action, Dispatch } from 'redux'

import { State } from '../../models/State.model'
import { SnackbarActionType } from '../actions/models/snackbar.model'
import { hideSnackbar } from '../actions/snackbar'

let timer: NodeJS.Timer | undefined

export const snackbarMiddleware: any = ({ dispatch }: MiddlewareAPI<State>) => (next: Dispatch<State>) => (action: Action) => {
  const nextAction = next(action)
  if (!nextAction) return nextAction
  switch (nextAction.type) {
    case SnackbarActionType.SHOW_SNACKBAR:
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        dispatch(hideSnackbar())
        timer = undefined
      }, 4000)
      break
  }
  return nextAction
}
