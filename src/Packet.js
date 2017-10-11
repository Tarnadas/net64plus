export const PACKET_TYPE = {
  HANDSHAKE: 0,
  PLAYER_DATA: 1,
  GAME_MODE: 2,
  CHAT_MESSAGE: 3,
  CHARACTER_SWITCH: 4,
  PING: 5,
  WRONG_VERSION: 6,
  CLIENT_KICKED: 7,
  CLIENT_BANNED: 8
}

export default class Packet {
  static create (type, payload = new Uint8Array(0)) {
    const t = new Uint8Array([type])
    const res = new Uint8Array(payload.length + 1)
    res.set(t)
    res.set(payload, 1)
    return res
  }
}
