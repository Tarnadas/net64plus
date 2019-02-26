import produce from 'immer'

import { initialState } from '.'
import { SnackbarStateDraft, SnackbarState } from '../../models/State.model'
import { SnackbarActionType, SnackbarAction } from '../actions/models/snackbar.model'

export const snackbar = (state: SnackbarState = initialState.snackbar, action: SnackbarAction) =>
  produce<SnackbarState>(state, (draft: SnackbarStateDraft) => {
    switch (action.type) {
      case SnackbarActionType.SHOW_SNACKBAR:
        draft.message = action.message
        break
      case SnackbarActionType.HIDE_SNACKBAR:
        draft.message = null
        break
    }
  })
