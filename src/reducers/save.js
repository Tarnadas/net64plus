import fs from 'fs'
import path from 'path'

export default function save (state, action) {
  if (!action) return state
  switch (action.type) {
    case 'ADD_API_KEY':
      state = state.setIn(['data', 'apiKey'], action.apiKey)
      saveState(state)
      return state
    case 'DELETE_API_KEY':
      state = state.deleteIn(['data', 'apiKey'])
      return state
  }
  return state
}

function saveState (state) {
  fs.writeFileSync(path.join(state.get('path'), 'save.json'), JSON.stringify(state.get('data'), null, 2))
}
