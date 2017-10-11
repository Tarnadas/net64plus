export default function chat (state, action) {
  if (!action) return state
  switch (action.type) {
    case 'SET_CHAT_MESSAGES':
      state = state.set('global', action.chatMessages)
      return state
  }
  return state
}
