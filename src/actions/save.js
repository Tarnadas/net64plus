export function setUsername (username) {
  return {
    type: 'SET_USERNAME',
    username
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
