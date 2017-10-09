import {
  LOCATION_CHANGE
} from 'react-router-redux'

export default (state, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set('location', action.payload)
  }
  return state
}
