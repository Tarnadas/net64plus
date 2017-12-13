export function setUsername (username) {
  return {
    type: 'SET_USERNAME',
    username
  }
}

export function setCharacter (character) {
  return {
    type: 'SET_CHARACTER',
    character
  }
}
export function setEmuChat (emuChat) {
  return {
    type: 'SET_EMU_CHAT',
    emuChat
  }
}

export function addApiKey (apiKey) {
  return {
    type: 'ADD_API_KEY',
    apiKey
  }
}

export function deleteApiKey () {
  return {
    type: 'DELETE_API_KEY'
  }
}
