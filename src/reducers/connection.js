export default function connection (state, action) {
  if (!action) return state
  switch (action.type) {
    case 'SET_CONNECTION':
      state = action.connection
      break
    case 'DISCONNECT':
      state = null
      break
  }
  return state
}
