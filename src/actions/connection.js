export function setConnection (connection) {
  return {
    type: 'SET_CONNECTION',
    connection
  }
}

export function disconnect () {
  return {
    type: 'DISCONNECT'
  }
}
