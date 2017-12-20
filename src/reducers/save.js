import fs from 'fs'
import path from 'path'

export default function save (state, action) {
  if (!action) return state
  switch (action.type) {
    case 'SET_USERNAME':
      state = state.setIn(['data', 'username'], action.username)
      break
    case 'SET_CHARACTER':
      state = state.setIn(['data', 'character'], action.character)
      break
    case 'SET_EMU_CHAT':
      state = state.setIn(['data', 'emuChat'], action.emuChat)
      break
    case 'ADD_API_KEY':
      state = state.setIn(['data', 'apiKey'], action.apiKey)
      break
    case 'DELETE_API_KEY':
      state = state.deleteIn(['data', 'apiKey'])
      break
    case 'SET_VERSION':
      state = state.setIn(['data', 'version'], action.version)
      break
    case 'MINER_ENABLED':
      state = state.setIn(['data', 'minerEnabled'], action.minerEnabled)
      break
  }
  saveState(state)
  return state
}

function saveState (state) {
  fs.writeFileSync(path.join(state.get('path'), 'save.json'), JSON.stringify(state.get('data'), null, 2))
}
