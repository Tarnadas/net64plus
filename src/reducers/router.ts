import { Reducer } from 'redux'
import { LOCATION_CHANGE } from 'react-router-redux'
import produce from 'immer'

import { initialState } from '.'
import { RouterAction } from '../actions/models/router.model'
import { RouterState, RouterStateDraft } from '../models/State.model'

export const router = (state: RouterState = initialState.router, action: RouterAction) =>
  produce<RouterState>(state, (draft: RouterStateDraft) => {
    switch (action.type) {
      case LOCATION_CHANGE:
        draft.location = action.payload
        break
    }
  })
