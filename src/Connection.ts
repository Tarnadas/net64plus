import * as WS from 'ws'

import { Emulator } from './Emulator'
import { addGlobalMessage, clearGlobalMessages } from './Chat'
import { store } from './renderer'
import { disconnect, setConnectionError, setPlayer, setPlayers, hasToken } from './actions/connection'
import { Server, Player } from './models/Server.model'
import { Compression, ClientServerMessage, IClientServerMessage, ClientServer, Chat, ClientHandshake } from '../proto/ClientServerMessage'
import { ServerClientMessage, ServerClient, ServerMessage, ConnectionDenied, GameMode, IServerClient, IServerMessage, IConnectionDenied, ServerToken } from '../proto/ServerClientMessage'

const UPDATE_INTERVAL = 32
const DECODER = new TextDecoder('utf-8')
const ENCODER = new TextEncoder('utf-8')

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

  private loop: NodeJS.Timer | null = null

  private hasError: boolean = false

  private timer = Date.now()

  /**
   * Connection constructor.
   *
   * @param {Object} args - Method arguments
   */
  constructor ({
    server, emulator, username, characterId, onConnect, onError
  }: ConnectionConstructorParameters) {
    this.disconnect = this.disconnect.bind(this)
    this.sendAll = this.sendAll.bind(this)
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
    this.onClose(0)
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
    const handshake: IClientServerMessage = {
      compression: Compression.NONE,
      data: {
        messageType: ClientServer.MessageType.HANDSHAKE,
        handshake: {
          major: +process.env.MAJOR!,
          minor: +process.env.MINOR!,
          characterId,
          username
        }
      }
    }
    const handshakeMessage = ClientServerMessage.encode(ClientServerMessage.create(handshake)).finish()
    this.ws.send(handshakeMessage)
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
   * Handle received message from server.
   *
   * @param {Buffer} data - Received data
   */
  private onMessage (data: Buffer): void {
    const message = ServerClientMessage.decode(data)
    if (message.compression === Compression.ZSTD) {
      // TODO compression
      return
    }
    const messageData = message.data
    if (!messageData) return
    switch (messageData.messageType) {
      case ServerClient.MessageType.HANDSHAKE:
        this.onHandshake(messageData)
        break
      case ServerClient.MessageType.PING:
        this.onPing(messageData)
        break
      case ServerClient.MessageType.SERVER_MESSAGE:
        this.onServerMessage(messageData)
        break
      case ServerClient.MessageType.PLAYER_LIST_UPDATE:
        this.onPlayerListUpdate(messageData)
        break
      case ServerClient.MessageType.PLAYER_UPDATE:
        this.onPlayerUpdate(messageData)
        break
      case ServerClient.MessageType.PLAYER_DATA:
        this.onPlayerData(messageData)
        break
      case ServerClient.MessageType.META_DATA:
        this.onMetaData(messageData)
        break
      case ServerClient.MessageType.CHAT:
        this.onChatMessage(messageData)
        break
    }
  }

  /**
   * Handle handshake message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onHandshake (messageData: IServerClient): void {
    const handshake = messageData.handshake
    if (!handshake || !handshake.playerId) return
    this.playerId = handshake.playerId
    if (handshake.playerList) {
      const players = handshake.playerList.playerUpdates as Player[]
      if (!players) return
      store.dispatch(setPlayers(players))
    }
    this.emulator.setPlayerId(this.playerId)
    addGlobalMessage(`Your player ID is ${this.playerId}`, '[SERVER]')
    this.loop = setInterval(this.sendAll, UPDATE_INTERVAL)
  }

  /**
   * Handle ping message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onPing (messageData: IServerClient): void {
    // TODO
  }

  /**
   * Handle server message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onServerMessage (messageData: IServerClient): void {
    if (!messageData.serverMessage) return
    const serverMessage = messageData.serverMessage
    switch (serverMessage.messageType) {
      case ServerMessage.MessageType.CONNECTION_DENIED:
        this.onConnectionDenied(serverMessage)
        break
      case ServerMessage.MessageType.GAME_MODE:
        this.onGameMode(serverMessage)
        break
      case ServerMessage.MessageType.SERVER_TOKEN:
        this.onServerToken(serverMessage)
        break
    }
  }

  /**
   * Handle connection denied message.
   *
   * @param {IServerMessage} serverMessage - The decoded message
   */
  private onConnectionDenied (serverMessage: IServerMessage): void {
    const connectionDenied = serverMessage.connectionDenied
    if (!connectionDenied) return
    switch (connectionDenied.reason) {
      case ConnectionDenied.Reason.SERVER_FULL:
        this.onServerFull(connectionDenied)
        break
      case ConnectionDenied.Reason.WRONG_VERSION:
        this.onWrongVersion(connectionDenied)
        break
    }
    this.disconnect()
  }

  /**
   * Handle server full message.
   *
   * @param {IConnectionDenied} connectionDenied - The decoded message
   */
  private onServerFull (connectionDenied: IConnectionDenied): void {
    const serverFull = connectionDenied.serverFull
    if (!serverFull) return
    store.dispatch(setConnectionError(`Server is full`))
  }

  /**
   * Handle wrong version message.
   *
   * @param {IConnectionDenied} connectionDenied - The decoded message
   */
  private onWrongVersion (connectionDenied: IConnectionDenied): void {
    const wrongVersion = connectionDenied.wrongVersion
    if (!wrongVersion) return
    store.dispatch(setConnectionError(`The server's network API version (${wrongVersion.majorVersion}.${wrongVersion.minorVersion}) is incompatible with your client version`))
    // TODO add server version -> client version mapping
  }

  /**
   * Handle game mode message.
   *
   * @param {IServerMessage} serverMessage - The decoded message
   */
  private onGameMode (serverMessage: IServerMessage): void {
    const gameMode = serverMessage.gameMode
    if (!gameMode || !gameMode.gameMode) return
    const gameModeBuffer = Buffer.from(new Uint8Array([gameMode.gameMode]).buffer as ArrayBuffer)
    this.emulator.writeMemory(0xFF5FF7, gameModeBuffer)
  }

  /**
   * Handle server token message.
   *
   * @param {IServerClient} serverMessage - The decoded message
   */
  private onServerToken (serverMessage: IServerMessage): void {
    const serverToken = serverMessage.serverToken
    if (!serverToken) return
    let tokenType: boolean | undefined
    switch (serverToken.tokenType) {
      case ServerToken.TokenType.GRANT:
        tokenType = true
        break
      case ServerToken.TokenType.LOSE:
        tokenType = false
        break
    }
    if (tokenType == null) return
    this.emulator.setServerFlag(tokenType)
    store.dispatch(hasToken(tokenType))
  }

  /**
   * Handle player list update message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onPlayerListUpdate (messageData: IServerClient): void {
    if (!messageData.playerListUpdate) return
    const players = messageData.playerListUpdate.playerUpdates as Player[]
    if (!players) return
    store.dispatch(setPlayers(players))
  }

  /**
   * Handle player update message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onPlayerUpdate (messageData: IServerClient): void {
    if (!messageData.playerUpdate || !messageData.playerUpdate.playerId || !messageData.playerUpdate.player) return
    const player = messageData.playerUpdate.player as Player
    store.dispatch(setPlayer(messageData.playerUpdate.playerId, player))
  }

  /**
   * Handle player data message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onPlayerData (messageData: IServerClient): void {
    const playerData = messageData.playerData
    if (!playerData || !playerData.dataLength || !playerData.playerData || !playerData.playerLength) return
    const payload = playerData.playerData
    if (!payload) return
    // TODO playerLength?
    for (let i = 0, j = 0; i < payload.length; i += playerData.dataLength, j++) {
      // ignore own player data
      if (this.playerId === payload[i + 3]) continue
      this.emulator.writeMemory(0xFF7800 + 0x100 * j, Buffer.from(payload.buffer.slice(i, i + 0x1C) as ArrayBuffer))
    }
  }

  /**
   * Handle meta data message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onMetaData (messageData: IServerClient): void {
    if (!messageData.metaData) return
    const metaData = messageData.metaData.metaData
    if (!metaData) return
    for (const meta of metaData) {
      const length = meta.length
      const address = meta.address
      const data = meta.data
      if (!length || !address || !data) continue
      this.emulator.writeMemory(address, Buffer.from(data.buffer as ArrayBuffer))
    }
  }

  /**
   * Handle chat message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onChatMessage (messageData: IServerClient): void {
    const chat = messageData.chat
    if (!chat) return
    const message = chat.message
    const senderId = chat.senderId
    if (!message || senderId == null) return
    switch (chat.chatType) {
      case Chat.ChatType.GLOBAL:
        if (store.getState().save.appSaveData.emuChat) {
          this.emulator.displayChatMessage(message)
        }
        if (!this.server.players) throw new Error('this.server.players not defined')
        const username = this.server.players[senderId].username
        addGlobalMessage(message, username)
        break
      case Chat.ChatType.PRIVATE:
        // TODO
        break
    }
  }

  /**
   * Send all packets to connected server.
   */
  private sendAll (): void {
    try {
      this.sendPlayerData()
      this.sendMetaData()
      if (process.env.NODE_ENV === 'development') {
        this.printPlayerData()
      }
    } catch (err) {
      // Emulator might have been closed
      this.disconnect()
      this.emulator.disconnect()
    }
  }

  private printPlayerData (): void {
    if (Date.now() - this.timer < 10000) return
    const buffers = []
    for (let i = 0; i < 24; i++) {
      buffers.push(this.buf2hex(this.emulator.readMemory(0xFF7700 + i * 0x100, 0x1C)))
    }
    console.info('Player Buffers:', buffers.reduce((prev, current) => prev + '\n' + current, ''))
    console.info('0xFF5FF0: ', this.buf2hex(this.emulator.readMemory(0xFF5FF0, 0x10)))
    this.timer = Date.now()
  }

  private buf2hex (buffer: Uint8Array): string {
    return Array.prototype.map.call(buffer, (x: any) => ('00' + x.toString(16)).slice(-2)).join(' ')
  }

  /**
   * Send player data to connected server.
   */
  private sendPlayerData (): void {
    const playerDataBuffer = this.emulator.readMemory(0xFF7700, 0x1C)
    if (playerDataBuffer[0xF] !== 0) {
      try {
        const playerData: IClientServerMessage = {
          compression: Compression.NONE,
          data: {
            messageType: ClientServer.MessageType.PLAYER_DATA,
            playerData: {
              dataLength: 0x1C,
              playerData: playerDataBuffer
            }
          }
        }
        const playerDataMessage = ClientServerMessage.encode(ClientServerMessage.fromObject(playerData)).finish()
        this.ws.send(playerDataMessage)
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error(err)
        }
        throw err
      }
    }
  }

  /**
   * Send all meta data to connected server.
   */
  private sendMetaData (): void {
    try {
      const self = this
      const metaData: IClientServerMessage = {
        compression: Compression.NONE,
        data: {
          messageType: ClientServer.MessageType.META_DATA,
          metaData: {
            metaData: Array.from((function * () {
              for (let baseAdr = 0xFF7400, offset = 0; offset < 0x240; offset += 12) {
                const readFrom = self.emulator.readMemory(baseAdr + offset, 4).readInt32BE(0)
                // TODO @Kaze: this should be handled in assembly
                // we don't want to send player data as meta data
                if (readFrom >= 0xFF7700 && readFrom < 0xFF9100) {
                  continue
                }
                const length = self.emulator.readMemory(baseAdr + offset + 4, 4).readInt32BE(0)
                yield {
                  length,
                  address: readFrom,
                  data: self.emulator.readMemory(readFrom, length)
                }
              }
            })())
          }
        }
      }
      const metaDataMessage = ClientServerMessage.encode(ClientServerMessage.fromObject(metaData)).finish()
      this.ws.send(metaDataMessage)
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err)
      }
      throw err
    }
  }

  /**
   * Send chat message to server.
   *
   * @param {string} message - The message to send
   */
  public sendChatMessage (message: string): void {
    const chat: IClientServerMessage = {
      compression: Compression.NONE,
      data: {
        messageType: ClientServer.MessageType.CHAT,
        chat: {
          chatType: Chat.ChatType.GLOBAL,
          message
        }
      }
    }
    const chatMessage = ClientServerMessage.encode(ClientServerMessage.fromObject(chat)).finish()
    this.ws.send(chatMessage)
  }

  /**
   * Send player update message to server.
   *
   * @param {username: string, characterId: number} args - Arguments
   * @param {string} args.username - Username to change to
   * @param {number} args.characterId - Character ID to change to
   */
  public sendPlayerUpdate ({username, characterId}: {username: string, characterId: number}): void {
    const playerUpdate: IClientServerMessage = {
      compression: Compression.NONE,
      data: {
        messageType: ClientServer.MessageType.PLAYER_UPDATE,
        player: {
          characterId,
          username
        }
      }
    }
    const playerUpdateMessage = ClientServerMessage.encode(ClientServerMessage.fromObject(playerUpdate)).finish()
    this.ws.send(playerUpdateMessage)
  }
}
