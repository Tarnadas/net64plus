/* import { Action, AnyAction } from 'redux'
import produce from 'immer'

import { State } from '../models/State.model'

type AccountState = string

interface AccountActions extends Action {
  accountData: string
}

export function account (state: AccountState, action: AccountActions) {
  if (!action) return state
  switch (action.type) {
    case 'SET_ACCOUNT_DATA':
      state = action.accountData
      break
  }
  return state
}
*/
