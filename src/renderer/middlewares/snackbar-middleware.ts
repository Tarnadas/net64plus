import { MiddlewareAPI, AnyAction, Dispatch } from 'redux'

import { SnackbarActionType } from '../actions/models/snackbar.model'
import { hideSnackbar } from '../actions/snackbar'

let timer: NodeJS.Timer | undefined

export const snackbarMiddleware = ({ dispatch }: MiddlewareAPI<any>) => (next: Dispatch<any>) => (action: AnyAction) => {
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
