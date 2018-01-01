export function setConnection (connection) {
  return {
    type: 'SET_CONNECTION',
    connection
  }
}

export function setConnectionError (error) {
  return {
    type: 'SET_CONNECTION_ERROR',
    error
  }
}

export function disconnect () {
  return {
    type: 'DISCONNECT'
  }
}
