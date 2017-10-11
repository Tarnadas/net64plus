import WS from 'ws'

import {
  gunzipSync
} from 'zlib'

import Packet, { PACKET_TYPE } from './Packet'

const UPDATE_INTERVAL = 24
const EMPTY = new Uint8Array(0x18)

export default class Connection {
  constructor (server, emulator, username, characterId) {
    console.log(server)
    try {
      this.ws = new WS(`ws://${server.domain ? server.domain : server.ip}:${server.port}`)
      this.ws.on('open', this.onOpen.bind(this, characterId, username))
      this.ws.on('error', this.onError.bind(this))
      this.ws.on('close', this.onClose.bind(this))
      this.ws.on('message', this.onMessage.bind(this))
      this.server = server
      this.emulator = emulator
    } catch (err) {
      console.error(err)
    }
  }
  onOpen (characterId, username) {
    const handshake = new Uint8Array(29)
    handshake[0] = PACKET_TYPE.HANDSHAKE
    handshake[1] = 0
    handshake[2] = 4
    handshake[3] = characterId
    handshake[4] = username.length
    handshake.set((new TextEncoder('utf-8')).encode(username), 5)
    this.ws.send(handshake)
  }
  onError (err) {
    console.error(err)
  }
  onClose () {
    const b = Buffer.allocUnsafe(1)
    b.writeUInt8(1, 0)
    this.emulator.writeMemory(0x365FFC, b)
  }
  onMessage (data) {
    const type = data[0]
    let payload = data.slice(1)
    switch (type) {
      case PACKET_TYPE.HANDSHAKE:
        this.playerId = payload[0]
        this.loop = setInterval(this.sendPlayerData.bind(this), UPDATE_INTERVAL)
        break
      case PACKET_TYPE.PLAYER_DATA:
        payload = gunzipSync(payload)
        let j = 2
        for (let i = 0; i < payload.length; i += 0x18) {
          if (this.playerId === payload[i + 3]) continue
          this.emulator.writeMemory(0x367700 + 0x100 * j, payload.slice(i, i + 0x18))
          j++
        }
        for (; j < 24; j++) {
          this.emulator.writeMemory(0x367700 + 0x100 * j, EMPTY)
        }
        break
      case PACKET_TYPE.GAME_MODE:
        this.emulator.writeMemory(0x365FF7, payload)
        break
      case PACKET_TYPE.CHAT_MESSAGE:
        // TODO
        break
      case PACKET_TYPE.PING:
        // TODO
        break
      case PACKET_TYPE.WRONG_VERSION:
        const major = payload[0]
        const minor = payload[1]
        this.ws.close()
        // TODO
        break
    }
  }
  sendPlayerData () {
    const playerData = this.emulator.readMemory(0x367700, 0x18)
    if (playerData[0xF] !== 0) {
      this.ws.send(Packet.create(PACKET_TYPE.PLAYER_DATA, playerData))
      this.emulator.writeMemory(0x367800, playerData)
    }
  }
}
