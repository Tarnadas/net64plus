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
  static create (type, payload = Buffer.alloc(0)) {
    const typeBuffer = Buffer.allocUnsafe(1)
    typeBuffer.writeUInt8(type, 0)
    return Buffer.concat([typeBuffer, payload])
  }
}
