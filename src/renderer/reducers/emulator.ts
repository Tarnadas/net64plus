import produce from 'immer'

import { initialState } from '.'
import { EmulatorAction, EmulatorActionType } from '../actions/models/emulator.model'
import { EmulatorState, EmulatorStateDraft } from '../../models/State.model'

export const emulator = (state: EmulatorState = initialState.emulator, action: EmulatorAction) =>
  produce<EmulatorState>(state, (draft: EmulatorStateDraft) => {
    switch (action.type) {
      case EmulatorActionType.IS_CONNECTED_TO_EMULATOR:
        draft.isConnectedToEmulator = action.isConnectedToEmulator
        break
      case EmulatorActionType.SET_ERROR:
        draft.error = action.error || ''
        break
    }
  })
