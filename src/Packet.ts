export enum PACKET_TYPE {
  HANDSHAKE = 0,
  PING = 1,
  WRONG_VERSION = 2,
  SERVER_FULL = 3,
  PLAYER_LIST_UPDATE = 4,
  PLAYER_UPDATE = 5,
  PLAYER_DATA = 128,
  META_DATA = 129,
  GAME_MODE = 130,
  CHAT_MESSAGE = 131,
  SET_SERVER_FLAG = 132
}

export class Packet {
  constructor (type: PACKET_TYPE, payload = new Uint8Array(0)) {
    const t = new Uint8Array([type])
    const res = new Uint8Array(payload.length + 1)
    res.set(t)
    res.set(payload, 1)
    return res
  }
}
