export default function account (state, action) {
  if (!action) return state
  switch (action.type) {
    case 'SET_ACCOUNT_DATA':
      state = action.accountData
      break
  }
  return state
}
