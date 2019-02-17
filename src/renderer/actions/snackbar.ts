import { ShowSnackbarAction, SnackbarActionType, HideSnackbarAction } from './models/snackbar.model'

export function showSnackbar (message: string): ShowSnackbarAction {
  return {
    type: SnackbarActionType.SHOW_SNACKBAR,
    message
  }
}

export function hideSnackbar (): HideSnackbarAction {
  return {
    type: SnackbarActionType.HIDE_SNACKBAR
  }
}
