import WS from 'ws'

import { gunzipSync } from 'zlib'

import Packet, { PACKET_TYPE } from './Packet'
import Chat from './Chat'
import { store } from './renderer'
import { disconnect, setConnectionError } from './actions/connection'

const UPDATE_INTERVAL = 24
const DECODER = new TextDecoder('utf-8')
const ENCODER = new TextEncoder('utf-8')

/**
 * A Connection object represents the connection to an actual
 * Net64+ server.
 */
export default class Connection {
  /**
   * Connection constructor.
   *
   * @param {Object} args - Method arguments
   * @param {Object} args.server - Server to connect to
   * @param {Emulator} args.emulator - Currently selected emulator
   * @param {string} args.username - Username from  settings
   * @param {number} args.characterId - Character ID from settings
   * @param {() => void} args.onConnect - Connection callback function
   * @param {(err: string) => void} args.onError - Error callback function
   */
  constructor ({ server, emulator, username, characterId, onConnect, onError }) {
    this.disconnect = this.disconnect.bind(this)
    this.ws = new WS(`ws://${server.domain ? server.domain : server.ip}:${server.port}`)
    this.ws.on('open', this.onOpen.bind(this, characterId, username, onConnect))
    this.ws.on('error', this.onError.bind(this, onError))
    this.ws.on('close', this.onClose.bind(this))
    this.ws.on('message', this.onMessage.bind(this))
    this.username = username // TODO there is no reason to send current username. This will break backwards compatibility
    this.server = Object.assign(server, { ip: '127.0.0.1' })

    /**
     * @type {module:Emulator}
     */
    this.emulator = emulator
    this.chat = new Chat()
    this.hasError = false
  }

  /**
   * Actively disconnect WebSocket connection.
   */
  disconnect () {
    this.ws.close()
  }

  /**
   * Websocket connected.
   *
   * @param {number} characterId - Character ID from settings
   * @param {string} username - Username from settings
   * @param {() => void} onConnect - Connection callback function
   */
  onOpen (characterId, username, onConnect) {
    onConnect()
    const handshake = new Uint8Array(29)
    handshake[0] = PACKET_TYPE.HANDSHAKE
    handshake[1] = 0
    handshake[2] = 4
    handshake[3] = characterId
    handshake[4] = username.length
    handshake.set(ENCODER.encode(username), 5)
    this.ws.send(handshake)
  }

  /**
   * WebSocket error.
   *
   * @param {(err: string) => void} onError - Error callback function
   * @param {Error} err - Error object
   */
  onError (onError, err) {
    onError(err)
    this.hasError = true
  }

  /**
   * WebSocket disconnected.
   *
   * @param {number} code - Exit code
   */
  onClose (code) {
    if (this.loop) {
      clearInterval(this.loop)
      this.loop = null
    }
    store.dispatch(disconnect())
    if (code === 1006 && !this.hasError) {
      store.dispatch(setConnectionError('Lost connection to server'))
    }
    this.chat.clear()
  }

  /**
   * Schedule received message from server.
   *
   * @param {Buffer} data - Received data
   */
  onMessage (data) {
    const type = data[0]
    let payload = data.slice(1)
    switch (type) {
      case PACKET_TYPE.HANDSHAKE:
        this.playerId = payload[0]
        this.emulator.setPlayerId(payload[0])
        this.chat.addMessage(`Your player ID is ${this.playerId}`, '[SERVER]')
        this.loop = setInterval(this.sendPlayerData.bind(this), UPDATE_INTERVAL)
        break
      case PACKET_TYPE.MEMORY_DATA:
        payload = gunzipSync(payload)
        for (let offset = 0; offset < payload.length;) {
          const length = payload.readUInt32BE(offset)
          const writeTo = payload.readUInt32BE(offset + 4)
          const data = payload.readUInt32BE(offset + 8, length)
          this.emulator.writeMemory(writeTo, data)
          offset += length + 8
        }
        break
      case PACKET_TYPE.GAME_MODE:
        this.emulator.writeMemory(0xFF5FF7, payload)
        break
      case PACKET_TYPE.CHAT_MESSAGE:
        const msgLength = payload[0]
        const message = DECODER.decode(payload.slice(1, msgLength + 1))
        const username = DECODER.decode(payload.slice(msgLength + 2, msgLength + 2 + payload[msgLength + 1]))
        if (store.getState().getIn(['save', 'data', 'emuChat'])) {
          this.emulator.displayChatMessage(message, msgLength)
        }
        this.chat.addMessage(message, username)
        break
      case PACKET_TYPE.PING:
        // TODO
        break
      case PACKET_TYPE.WRONG_VERSION:
        // const major = payload[0]
        // const minor = payload[1]
        this.ws.close()
        // TODO
        break
      case PACKET_TYPE.SERVER_FULL:
        store.dispatch(setConnectionError('Server is full'))
        this.ws.close()
        break
    }
  }

  /**
   * Send all memory data to connected server.
   */
  sendMemoryData () {
    const memoryData = Buffer.concat(
      Array.from((function * () {
        for (let baseAdr = 0xFF7400, offset = 0; offset < 0x240; offset += 12) {
          const readFrom = this.emulator.readMemory(baseAdr + offset).readInt32BE(0)
          const length = this.emulator.readMemory(baseAdr + offset + 4, 4).readInt32BE(0)
          const packetLength = Buffer.allocUnsafe(4)
          packetLength.writeInt32BE(length, 0)
          yield Buffer.concat([
            packetLength,
            this.emulator.readMemory(baseAdr + offset + 8, 4),
            this.emulator.readMemory(readFrom, length)
          ])
        }
      })())
    )
    try {
      this.ws.send(Packet.create(PACKET_TYPE.MEMORY_DATA, memoryData))
    } catch (err) {
      // console.error(err)
      // store.dispatch(setConnectionError(err))
    }
  }

  /**
   * Send chat message to server.
   *
   * @param {string} message - The message to send
   */
  sendChatMessage (message) {
    message = ENCODER.encode(message)
    const username = ENCODER.encode(this.username)
    const chatMessage = new Uint8Array(message.length + username.length + 2)
    chatMessage.set(new Uint8Array([message.length]))
    chatMessage.set(message, 1)
    chatMessage.set(new Uint8Array([username.length]), message.length + 1)
    chatMessage.set(username, message.length + 2)
    this.ws.send(Packet.create(PACKET_TYPE.CHAT_MESSAGE, chatMessage))
  }

  /**
   * Send character change message to server.
   *
   * @param {number} characterId - Character ID to change to
   */
  sendCharacterChange (characterId) {
    const packet = new Uint8Array(1)
    packet[0] = characterId
    this.ws.send(Packet.create(PACKET_TYPE.CHARACTER_SWITCH, packet))
  }
}
