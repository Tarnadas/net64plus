export default function connection (state, action) {
  if (!action) return state
  switch (action.type) {
    case 'SET_CONNECTION':
      state = state.set('connection', action.connection)
      state = state.delete('error')
      break
    case 'SET_CONNECTION_ERROR':
      state = state.set('error', action.error)
      break
    case 'DISCONNECT':
      state = state.delete('connection')
      break
  }
  return state
}
