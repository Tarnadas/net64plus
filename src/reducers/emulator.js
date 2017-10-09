export default function emulator (state, action) {
  if (!action) return state
  switch (action.type) {
    case 'SET_EMULATOR':
      state = action.emulator
      break
  }
  return state
}
