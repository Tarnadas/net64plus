import * as WS from 'ws'
import * as protobuf from 'protobufjs'

import { Emulator } from './Emulator'
import { Packet, PACKET_TYPE } from './Packet'
import { addGlobalMessage, clearGlobalMessages } from './Chat'
import { store } from './renderer'
import { disconnect, setConnectionError, setPlayer, setPlayers } from './actions/connection'
import { Server, Player } from './models/Server.model'
import { ClientServerMessage } from '../proto/ClientServerMessage.js'
import { ServerClient, ServerClientMessage } from '../proto/ServerClientMessage.js'

const UPDATE_INTERVAL = 32
const DECODER = new TextDecoder('utf-8')
const ENCODER = new TextEncoder('utf-8')

const playerUpdate = protobuf.loadSync('../proto/PlayerUpdate.proto').lookupType('PlayerUpdate')
const playerListUpdate = protobuf.loadSync('../proto/PlayerListUpdate.proto').lookupType('PlayerListUpdate')

export interface ConnectionConstructorParameters {
  /** Server to connect to */
  server: Server

  /** Currently selected emulator */
  emulator: Emulator

  /** Username from settings */
  username: string

  /** Character ID from settings */
  characterId: number

  /** Connection callback function */
  onConnect: () => void

  /** Error callback function */
  onError: (err: Error) => void
}

/**
 * A Connection object represents the connection to an actual
 * Net64+ server.
 */
export class Connection {
  public server: Server

  private ws: WS

  private emulator: Emulator

  private playerId?: number

  private loop: number | null = null

  private hasError: boolean = false

  /**
   * Connection constructor.
   *
   * @param {Object} args - Method arguments
   */
  constructor ({
    server, emulator, username, characterId, onConnect, onError
  }: ConnectionConstructorParameters) {
    this.disconnect = this.disconnect.bind(this)
    this.ws = new WS(`ws://${server.domain ? server.domain : server.ip}:${server.port}`)
    this.ws.on('open', this.onOpen.bind(this, characterId, username, onConnect))
    this.ws.on('error', this.onError.bind(this, onError))
    this.ws.on('close', this.onClose.bind(this))
    this.ws.on('message', this.onMessage.bind(this))
    this.server = Object.assign(server, { ip: '127.0.0.1' })
    this.server.players = []
    this.emulator = emulator
  }

  /**
   * Actively disconnect WebSocket connection.
   */
  public disconnect (): void {
    this.ws.close()
  }

  /**
   * Websocket connected.
   *
   * @param {number} characterId - Character ID from settings
   * @param {string} username - Username from settings
   * @param {() => void} onConnect - Connection callback function
   */
  private onOpen (characterId: number, username: string, onConnect: () => void): void {
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
   * @param {(err: Error) => void} onError - Error callback function
   * @param {Error} err - Error object
   */
  private onError (onError: (err: Error) => void, err: Error): void {
    onError(err)
    this.hasError = true
  }

  /**
   * WebSocket disconnected.
   *
   * @param {number} code - Exit code
   */
  private onClose (code: number): void {
    if (this.loop) {
      clearInterval(this.loop)
      this.loop = null
    }
    store.dispatch(disconnect())
    if (code === 1006 && !this.hasError) {
      store.dispatch(setConnectionError('Lost connection to server'))
    }
    clearGlobalMessages()
  }

  /**
   * Schedule received message from server.
   *
   * @param {Buffer} data - Received data
   */
  private onMessage (data: Buffer): void {
    const message = ServerClientMessage.decode(data)
    if (message.compression === ServerClientMessage.Compression.ZSTD) {
      // TODO compression
      return
    }
    if (!message.data) return
    switch (message.data.messageType) {
      case ServerClient.MessageType.HANDSHAKE:
        const handshake = message.data.handshake
        if (!handshake || !handshake.playerId) return
        this.playerId = handshake.playerId
        if (handshake.playerList) {
          store.dispatch(setPlayers(handshake.playerList.players as Player[]))
        }
        this.emulator.setPlayerId(this.playerId)
        addGlobalMessage(`Your player ID is ${this.playerId}`, '[SERVER]')
        this.loop = setInterval(this.sendAll.bind(this), UPDATE_INTERVAL)
        break
    }

    const type = data[0]
    let payload = data.slice(1)
    switch (type) {
      case PACKET_TYPE.PING:
        // TODO
        break
      case PACKET_TYPE.WRONG_VERSION:
        const major = payload[0]
        const minor = payload[1]
        store.dispatch(setConnectionError('Client and server version are incompatible'))
        this.ws.close()
        // TODO
        break
      case PACKET_TYPE.SERVER_FULL:
        store.dispatch(setConnectionError('Server is full'))
        this.ws.close()
        break
      case PACKET_TYPE.PLAYER_LIST_UPDATE:
        const players: Player[] = playerListUpdate.toObject(playerListUpdate.decode(payload)) as Player[]
        store.dispatch(setPlayers(players))
        break
      case PACKET_TYPE.PLAYER_UPDATE:
        const player: Player = playerUpdate.toObject(playerUpdate.decode(payload)) as Player
        store.dispatch(setPlayer(0, player))
        break
      case PACKET_TYPE.PLAYER_DATA:
        for (let i = 0, j = 0; i < payload.length; i += 0x18, j++) {
          // ignore own player data
          if (this.playerId === payload[i + 3]) continue
          this.emulator.writeMemory(0xFF7800 + 0x100 * j, payload.slice(i, i + 0x1C))
        }
        break
      case PACKET_TYPE.META_DATA:
        for (let offset = 0; offset < payload.length;) {
          const length = payload.readUInt32BE(offset)
          const writeTo = payload.readUInt32BE(offset + 4)
          const data = payload.slice(offset + 8, offset + 8 + length)
          this.emulator.writeMemory(writeTo, data)
          offset += length + 8
        }
        break
      case PACKET_TYPE.GAME_MODE:
        this.emulator.writeMemory(0xFF5FF7, payload)
        break
      case PACKET_TYPE.CHAT_MESSAGE:
        const msgLength = payload[0]
        const userId = payload[1]
        const message = DECODER.decode(payload.slice(2, msgLength + 2))
        // const username = DECODER.decode(payload.slice(msgLength + 2, msgLength + 2 + payload[msgLength + 1]))
        if (store.getState().save.appSaveData.emuChat) {
          this.emulator.displayChatMessage(message, msgLength)
        }
        if (!this.server.players) throw new Error('this.server.players not defined')
        const username = this.server.players[userId].username
        addGlobalMessage(message, username)
        break
    }
  }

  /**
   * Send all packets to connected server.
   */
  private sendAll (): void {
    this.sendPlayerData()
    this.sendMetaData()
  }

  /**
   * Send player data to connected server.
   */
  private sendPlayerData (): void {
    const playerData = this.emulator.readMemory(0xFF7700, 0x1C)
    if (playerData[0xF] !== 0) {
      try {
        this.ws.send(new Packet(PACKET_TYPE.PLAYER_DATA, playerData))
      } catch (err) {}
    }
  }

  /**
   * Send all meta data to connected server.
   */
  private sendMetaData (): void {
    const self = this
    const metaData = Buffer.concat(
      Array.from((function * () {
        for (let baseAdr = 0xFF7400, offset = 0; offset < 0x240; offset += 12) {
          const readFrom = self.emulator.readMemory(baseAdr + offset, 4).readInt32BE(0)
          // TODO @Kaze: this should be handled in assembly
          // we don't want to send player data as meta data
          if (readFrom >= 0xFF7700 && readFrom < 0xFF9100) {
            continue
          }
          const length = self.emulator.readMemory(baseAdr + offset + 4, 4).readInt32BE(0)
          const packetLength = Buffer.allocUnsafe(4)
          packetLength.writeInt32BE(length, 0)
          yield Buffer.concat([
            packetLength,
            self.emulator.readMemory(baseAdr + offset + 8, 4),
            self.emulator.readMemory(readFrom, length)
          ])
        }
      })())
    )
    try {
      this.ws.send(new Packet(PACKET_TYPE.META_DATA, metaData))
    } catch (err) {}
  }

  /**
   * Send chat message to server.
   *
   * @param {string} message - The message to send
   */
  public sendChatMessage (message: string): void {
    const messageBinary = ENCODER.encode(message)
    const chatMessage = new Uint8Array(message.length + 1)
    chatMessage.set(new Uint8Array([message.length]))
    chatMessage.set(messageBinary, 1)
    this.ws.send(new Packet(PACKET_TYPE.CHAT_MESSAGE, chatMessage))
  }

  /**
   * Send player update message to server.
   *
   * @param {username: string, characterId: number} args - Arguments
   * @param {string} args.username - Username to change to
   * @param {number} args.characterId - Character ID to change to
   */
  public sendPlayerUpdate ({username, characterId}: {username: string, characterId: number}): void {
    const packet = playerUpdate.encode(playerUpdate.create({username, characterId})).finish()
    this.ws.send(new Packet(PACKET_TYPE.PLAYER_UPDATE, packet))
  }
}
