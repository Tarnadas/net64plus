import { Action } from 'redux'

export interface ShowSnackbarAction extends Action {
  message: string
}

export type HideSnackbarAction = Action

export type SnackbarAction =
  ShowSnackbarAction
  & HideSnackbarAction

export enum SnackbarActionType {
  SHOW_SNACKBAR = 'SHOW_SNACKBAR',
  HIDE_SNACKBAR = 'HIDE_SNACKBAR'
}
