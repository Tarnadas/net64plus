import produce from 'immer'

import { initialState } from '.'
import { EmulatorAction } from '../actions/models/emulator.model'
import { EmulatorState, EmulatorStateDraft } from '../models/State.model'

export const emulator = (state: EmulatorState = initialState.emulator, action: EmulatorAction) =>
  produce<EmulatorState>(state, (draft: EmulatorStateDraft) => {
    switch (action.type) {
      case 'SET_EMULATOR':
        draft.instance = action.emulator
        break
    }
  })
