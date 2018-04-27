import * as WS from 'ws'

import * as zlib from 'zlib'

import { connector, emulator, deleteConnection } from '.'
import { Emulator } from './Emulator'
import { Server } from '../models/Server.model'
import { buf2hex } from '../utils/Buffer.util'
import {
  Compression,
  ClientServerMessage,
  IClientServerMessage,
  ClientServer,
  Chat,
  ClientHandshake
} from '../../proto/ClientServerMessage'
import {
  ServerClientMessage,
  ServerClient,
  ServerMessage,
  ConnectionDenied,
  GameMode,
  IServerClient,
  IServerMessage,
  IConnectionDenied,
  ServerToken
} from '../../proto/ServerClientMessage'

const UPDATE_INTERVAL = 32

/**
 * A Connection object represents the connection to an actual
 * Net64+ server.
 */
export class Connection {
  // public server: Server

  private ws: WS

  private playerId?: number

  private loop: NodeJS.Timer | null = null

  private hasError: boolean = false

  private timer = Date.now()

  /**
   * Connection constructor.
   *
   * @param {Object} args - Method arguments
   * @param {string} [args.domain] - Server domain
   * @param {string} [args.ip='127.0.0.1'] - Server IP address
   * @param {number} [args.port=3678] - Server port
   * @param {string} args.username - Username from settings
   * @param {number} args.characterId - Character ID from settings
   */
  constructor ({
    domain, ip = '127.0.0.1', port = 3678, username, characterId
  }: {
    domain: string | undefined, ip: string | undefined, port: number | undefined, username: string, characterId: number
  }) {
    this.disconnect = this.disconnect.bind(this)
    this.sendAll = this.sendAll.bind(this)
    this.ws = new WS(`ws://${domain || ip || '127.0.0.1'}:${port || 3678}`)
    this.ws.on('open', this.onOpen.bind(this, characterId, username))
    this.ws.on('error', this.onError.bind(this))
    this.ws.on('close', this.onClose.bind(this))
    this.ws.on('message', this.onMessage.bind(this))
  }

  /**
   * Actively disconnect WebSocket connection.
   */
  public disconnect (): void {
    this.onClose(0)
    this.ws.close()
    emulator!.setConnectionFlag(0)
    emulator!.setGameMode(1)
  }

  /**
   * Websocket connected.
   *
   * @param {number} characterId - Character ID from settings
   * @param {string} username - Username from settings
   */
  private onOpen (characterId: number, username: string): void {
    if (!emulator) {
      this.disconnect()
      return
    }
    emulator.displayChatMessage('- connected to server -')
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
   * @param {Error} err - Error object
   */
  private onError (err: Error): void {
    let warning: string = String(err)
    if (warning.includes('getaddrinfo')) {
      warning = 'Could not resolve host name.\nDNS lookup failed'
    } else if (warning.includes('DTIMEDOUT')) {
      warning = 'Server timed out.\nIt might be offline or you inserted a wrong IP address'
    } else if (warning.includes('ECONNREFUSED')) {
      warning = 'Server refused connection.\nThe server might not have set up proper port forwarding or you inserted a wrong port'
    }
    connector.setConnectionError(warning)
    // TODO set connection error
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
    connector.closeWebSocket(code, this.hasError)
  }

  /**
   * Handle received message from server.
   *
   * @param {Buffer} data - Received data
   */
  private async onMessage (data: Buffer): Promise<void> {
    if (!emulator) {
      this.disconnect()
      return
    }
    const message = ServerClientMessage.decode(data)
    let messageData: typeof message.data
    switch (message.compression) {
      case Compression.ZSTD:
        throw new Error('ZSTD decompression not yet implemented!')
      case Compression.GZIP:
        if (!message.compressedData) return
        messageData = await this.decompressGzipMessage(message.compressedData)
        break
      default:
        messageData = message.data
    }
    if (!messageData) return
    try {
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
    } catch (err) {
      this.catchError()
    }
  }

  private async decompressGzipMessage (dataBuffer: Uint8Array): Promise<IServerClient> {
     const decompressedData = await new Promise<Buffer>((resolve, reject) => {
      zlib.gunzip(dataBuffer as Buffer, (err, decompressedBuffer) => {
        if (err) reject(err)
        resolve(decompressedBuffer)
      })
    })
    return ServerClient.decode(decompressedData)
  }

  /**
   * Handle handshake message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onHandshake (messageData: IServerClient): void {
    const handshake = messageData.handshake
    if (
      !handshake ||
      handshake.playerId == null ||
      handshake.ip == null ||
      handshake.port == null ||
      handshake.domain == null ||
      handshake.name == null ||
      handshake.description == null ||
      handshake.countryCode == null ||
      handshake.gameMode == null
    ) return
    this.playerId = handshake.playerId
    if (handshake.playerList) {
      const playerUpdates = handshake.playerList.playerUpdates
      if (!playerUpdates) return
      const players = new Array(25).fill(null)
      for (const player of playerUpdates) {
        if (!player.player || player.playerId == null) continue
        players[player.playerId] = player.player
      }
      connector.setServer({
        ip: handshake.ip,
        port: handshake.port,
        domain: handshake.domain,
        name: handshake.name,
        description: handshake.description,
        countryCode: handshake.countryCode,
        gameMode: handshake.gameMode,
        players
      })
    }
    emulator!.setPlayerId(this.playerId)
    emulator!.setConnectionFlag(2)
    emulator!.setGameMode(handshake.gameMode)
    connector.setPlayerId(this.playerId)
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
    connector.serverFull()
  }

  /**
   * Handle wrong version message.
   *
   * @param {IConnectionDenied} connectionDenied - The decoded message
   */
  private onWrongVersion (connectionDenied: IConnectionDenied): void {
    const wrongVersion = connectionDenied.wrongVersion
    if (!wrongVersion || wrongVersion.majorVersion == null || wrongVersion.minorVersion == null) return
    connector.wrongVersion(wrongVersion.majorVersion, wrongVersion.minorVersion)
  }

  /**
   * Handle game mode message.
   *
   * @param {IServerMessage} serverMessage - The decoded message
   */
  private onGameMode (serverMessage: IServerMessage): void {
    const gameMode = serverMessage.gameMode
    if (!gameMode || !gameMode.gameMode) return
    emulator!.setGameMode(gameMode.gameMode)
    connector.setGameMode(gameMode.gameMode)
    connector.commandMessage(`Gamemode changed to ${gameMode.gameMode}`)
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
    if (process.env.NODE_ENV === 'development') {
      connector.consoleInfo(`${tokenType ? 'Granted' : 'Lost'} server token`)
    }
    emulator!.setConnectionFlag(1)
  }

  /**
   * Handle player list update message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onPlayerListUpdate (messageData: IServerClient): void {
    if (!messageData.playerListUpdate) return
    const players = messageData.playerListUpdate.playerUpdates
    if (!players) return
    connector.setPlayers(players)
  }

  /**
   * Handle player update message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onPlayerUpdate (messageData: IServerClient): void {
    const playerUpdate = messageData.playerUpdate
    if (!playerUpdate || !playerUpdate.playerId || !playerUpdate.player) return
    const player = playerUpdate.player
    if (player.username == null || player.characterId == null) return
    connector.setPlayer(playerUpdate.playerId, player)
  }

  /**
   * Handle player data message.
   *
   * @param {IServerClient} messageData - The decoded message
   */
  private onPlayerData (messageData: IServerClient): void {
    const playerData = messageData.playerData
    if (!playerData || !playerData.dataLength || !playerData.playerBytes) return
    const playerBytes = playerData.playerBytes
    const dataLength = playerData.dataLength
    for (const player of playerBytes) {
      const playerId = player.playerId
      const playerData = player.playerData
      if (playerId == null || !playerData) continue
      emulator!.writeMemory(0xFF7700 + 0x100 * playerId, playerData as Buffer)
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
      emulator!.writeMemory(address, data as Buffer)
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
        if (emulator!.inGameChatEnabled) {
          emulator!.displayChatMessage(message)
        }
        connector.globalChatMessage(message, senderId)
        break
      case Chat.ChatType.PRIVATE:
        // TODO
        break
      case Chat.ChatType.COMMAND:
        connector.commandMessage(message)
    }
  }

  /**
   * Send all packets to connected server.
   */
  private sendAll (): void {
    if (!emulator) {
      this.disconnect()
      return
    }
    try {
      this.sendPlayerData()
      this.sendMetaData()
      if (process.env.NODE_ENV === 'development') {
        this.printPlayerData()
      }
    } catch (err) {
      this.catchError()
    }
  }

  private catchError (): void {
    // Emulator might have been closed
    this.disconnect()
    connector.disconnectEmulator()
  }

  private printPlayerData (): void {
    if (Date.now() - this.timer < 10000) return
    const buffers = []
    for (let i = 0; i < 24; i++) {
      buffers.push(buf2hex(emulator!.readMemory(0xFF7700 + i * 0x100, 0x1C)))
    }
    connector.consoleInfo('Player Buffers:', buffers.reduce((prev, current) => prev + '\n' + current, ''))
    connector.consoleInfo('0xFF5FF0: ', buf2hex(emulator!.readMemory(0xFF5FF0, 0x10)))
    this.timer = Date.now()
  }

  /**
   * Send player data to connected server.
   */
  private sendPlayerData (): void {
    const playerDataBuffer = emulator!.readMemory(0xFF7700, 0x1C)
    if (playerDataBuffer[0xF] !== 0) {
      try {
        const playerData: IClientServerMessage = {
          compression: Compression.NONE,
          data: {
            messageType: ClientServer.MessageType.PLAYER_DATA,
            playerData: {
              dataLength: 0x1C,
              playerBytes: [{
                playerData: playerDataBuffer
              }]
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
    const metaDataArray = []
    for (let baseAdr = 0xFF7400, offset = 0; offset < 0x240; offset += 12) {
      const readFrom = emulator!.readMemory(baseAdr + offset, 4).readUInt32LE(0) - 0x80000000
      if (readFrom === -0x80000000) break
      // TODO @Kaze: this should be handled in assembly
      // we don't want to send player data as meta data
      if (readFrom >= 0xFF7700 && readFrom < 0xFF9100) {
        continue
      }
      const length = emulator!.readMemory(baseAdr + offset + 4, 4).readUInt32LE(0)
      const writeTo = emulator!.readMemory(baseAdr + offset, 8).readUInt32LE(0) - 0x80000000
        metaDataArray.push({
        length,
        address: writeTo,
        data: emulator!.readMemory(readFrom, length)
      })
    }
    try {
      const metaData: IClientServerMessage = {
        compression: Compression.NONE,
        data: {
          messageType: ClientServer.MessageType.META_DATA,
          metaData: {
            metaData: metaDataArray
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
   * Send global chat message to server.
   *
   * @param {string} message - The message to send
   */
  public sendGlobalChatMessage (message: string): void {
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
   * Send command to server.
   *
   * @param {string} message - The message to send
   * @param {string[]} args - The command's arguments
   */
  public sendCommandMessage (message: string, args: string[]): void {
    const chat: IClientServerMessage = {
      compression: Compression.NONE,
      data: {
        messageType: ClientServer.MessageType.CHAT,
        chat: {
          chatType: Chat.ChatType.COMMAND,
          message,
          command: {
            arguments: args
          }
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
