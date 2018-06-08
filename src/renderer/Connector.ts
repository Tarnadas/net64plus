import { ipcRenderer } from 'electron'

import { store } from '.'
import { addGlobalMessage, clearGlobalMessages } from './utils/chat.util'
import { isConnectedToEmulator, disconnect, setConnectionError, setPlayer, setPlayers, setServer, setGameMode } from './actions/connection'
import { MainMessage, RendererMessage } from '../models/Message.model'
import { Server } from '../models/Server.model'
import { IPlayer, IPlayerUpdate } from '../../proto/ServerClientMessage'

export class Connector {
  constructor () {
    ipcRenderer.on(MainMessage.WEBSOCKET_CLOSE, this.onWebSocketClose)
    ipcRenderer.on(MainMessage.EMULATOR_DISCONNECT, this.onEmulatorDisconnect)
    ipcRenderer.on(MainMessage.SET_SERVER, this.onSetServer)
    ipcRenderer.on(MainMessage.SET_PLAYERS, this.onSetPlayers)
    ipcRenderer.on(MainMessage.SET_PLAYER, this.onSetPlayer)
    ipcRenderer.on(MainMessage.SET_PLAYER_ID, this.onSetPlayerId)
    ipcRenderer.on(MainMessage.GAME_MODE, this.onSetGameMode)
    ipcRenderer.on(MainMessage.SERVER_FULL, this.onServerFull)
    ipcRenderer.on(MainMessage.WRONG_VERSION, this.onWrongVersion)
    ipcRenderer.on(MainMessage.CHAT_GLOBAL, this.onGlobalChatMessage)
    ipcRenderer.on(MainMessage.CHAT_COMMAND, this.onCommandMessage)
    ipcRenderer.on(MainMessage.SET_CONNECTION_ERROR, this.onConnectionError)
    ipcRenderer.on(MainMessage.CONSOLE_INFO, this.onConsoleInfo)
  }

  private onWebSocketClose = (event: Electron.Event, { code, hasError }: { code: number, hasError: boolean }) => {
    store.dispatch(disconnect())
    if (code === 1006 && !hasError) {
      store.dispatch(setConnectionError('Lost connection to server'))
    }
    clearGlobalMessages()
  }

  private onEmulatorDisconnect = () => {
    store.dispatch(isConnectedToEmulator(false))
    store.dispatch(setConnectionError('Emulator disconnected or closed'))
  }

  private onSetServer = (event: Electron.Event, server: Server) => {
    if (process.env.NODE_ENV === 'development') {
      console.info('CONNECTED TO SERVER', server)
    }
    store.dispatch(setServer(server))
  }

  private onSetPlayers = (event: Electron.Event, players: IPlayerUpdate[]) => {
    store.dispatch(setPlayers(players))
  }

  private onSetPlayer = (event: Electron.Event, { playerId, player }: { playerId: number, player: IPlayer }) => {
    store.dispatch(setPlayer(playerId, player))
  }

  private onSetPlayerId = (event: Electron.Event, playerId: number) => {
    addGlobalMessage('Connected', '[SERVER]', true)
  }

  private onSetGameMode = (event: Electron.Event, gameMode: number) => {
    store.dispatch(setGameMode(gameMode))
  }

  private onServerFull = () => {
    store.dispatch(setConnectionError(`Server is full`))
  }

  private onWrongVersion = (
    event: Electron.Event,
    { majorVersion, minorVersion }: { majorVersion: number, minorVersion: number}
  ) => {
    store.dispatch(setConnectionError(`The server's network API version (${majorVersion}.${minorVersion}) is incompatible with your client API version (${process.env.MAJOR}.${process.env.MINOR})`))
    // TODO add server version -> client version mapping
  }

  private onGlobalChatMessage = (event: Electron.Event, { message, senderId }: { message: string, senderId: number }) => {
    const server = store.getState().connection.server
    if (!server || !server.players) return
    const username = server.players[senderId] && server.players[senderId].username
    addGlobalMessage(message, username || '?', false)
  }

  private onCommandMessage = (event: Electron.Event, { message }: { message: string }) => {
    addGlobalMessage(message, '[SERVER]', true)
  }

  private onConnectionError = (event: Electron.Event, message: string) => {
    store.dispatch(setConnectionError(message))
  }

  private onConsoleInfo = (event: Electron.Event, messages: string[]) => {
    console.info(...messages)
  }

  public createConnection (
    { domain, ip, port, username, characterId }:
    {
      domain?: string, ip?: string, port?: number, username: string, characterId: number
    }
  ): void {
    ipcRenderer.send(RendererMessage.CREATE_CONNECTION, { domain, ip, port, username, characterId })
  }

  public disconnect (): void {
    ipcRenderer.send(RendererMessage.DISCONNECT)
  }

  public createEmulatorConnection (
    { processId, characterId, inGameChatEnabled }:
    { processId: number, characterId: number, inGameChatEnabled: boolean }
  ): void {
    ipcRenderer.send(RendererMessage.CREATE_EMULATOR_CONNECTION, { processId, characterId, inGameChatEnabled })
  }

  public disconnectEmulator (): void {
    ipcRenderer.send(RendererMessage.DISCONNECT_EMULATOR)
  }

  public playerUpdate (update: { username: string, characterId: number }): void {
    ipcRenderer.send(RendererMessage.PLAYER_UPDATE, update)
  }

  public sendGlobalChatMessage (message: string): void {
    ipcRenderer.send(RendererMessage.CHAT_GLOBAL, message)
  }

  public sendCommandMessage (message: string, args: string[]): void {
    ipcRenderer.send(RendererMessage.CHAT_COMMAND, { message, args })
  }
}
