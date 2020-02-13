import { ipcMain } from 'electron'

import { emulator, createEmulator, deleteEmulator, connection, createConnection, deleteConnection } from '.'
import { Emulator } from './Emulator'
import { FilteredEmulator, Position } from '../models/Emulator.model'
import { MainMessage, RendererMessage } from '../models/Message.model'
import { Server } from '../models/Server.model'
import { IPlayerUpdate, IPlayer } from '../../proto/ServerClientMessage'

export class Connector {
  constructor (private window: Electron.BrowserWindow) {
    ipcMain.on(RendererMessage.CREATE_CONNECTION, this.onCreateConnection)
    ipcMain.on(RendererMessage.DISCONNECT, this.onDisconnect)
    ipcMain.on(RendererMessage.UPDATE_EMULATORS, this.onUpdateEmulators)
    ipcMain.on(RendererMessage.CREATE_EMULATOR_CONNECTION, this.onCreateEmulatorConnection)
    ipcMain.on(RendererMessage.DISCONNECT_EMULATOR, this.onDisconnectEmulator)
    ipcMain.on(RendererMessage.PLAYER_UPDATE, this.onPlayerUpdate)
    ipcMain.on(RendererMessage.PASSWORD, this.onSendPassword)
    ipcMain.on(RendererMessage.CHAT_GLOBAL, this.onSendGlobalChatMessage)
    ipcMain.on(RendererMessage.CHAT_COMMAND, this.onSendCommandMessage)
  }

  private onCreateConnection = (
    _: Electron.Event,
    { domain, ip, port, username, characterId }:
    {
      domain?: string, ip?: string, port?: number, username: string, characterId: number
    }
  ) => {
    createConnection({ domain, ip, port, username, characterId })
  }

  private onDisconnect = () => {
    deleteConnection()
  }

  private onUpdateEmulators = () => {
    Emulator.updateEmulators()
  }

  private onCreateEmulatorConnection = (
    _: Electron.Event,
    { processId, characterId, inGameChatEnabled }:
    { processId: number, characterId: number, inGameChatEnabled: boolean }
  ) => {
    createEmulator({ processId, characterId, inGameChatEnabled })
  }

  private onDisconnectEmulator = () => {
    deleteEmulator()
  }

  private onPlayerUpdate = (
    _: Electron.Event,
    { username, characterId }:
    { username: string, characterId: number }
  ) => {
    if (!emulator) return
    emulator.changeCharacter(characterId)
    if (!connection) return
    connection.sendPlayerUpdate({ username, characterId })
  }

  private onSendPassword = (_: Electron.Event, password: string) => {
    if (!connection) return
    connection.sendPassword(password)
  }

  private onSendGlobalChatMessage = (_: Electron.Event, message: string) => {
    if (!connection) return
    connection.sendGlobalChatMessage(message)
  }

  private onSendCommandMessage = (
    _: Electron.Event,
    { message, args }:
    { message: string, args: string[] }
  ) => {
    if (!connection) return
    connection.sendCommandMessage(message, args)
  }

  public closeWebSocket (code: number, hasError: boolean): void {
    this.window.webContents.send(MainMessage.WEBSOCKET_CLOSE, { code, hasError })
  }

  public disconnectEmulator (): void {
    this.window.webContents.send(MainMessage.EMULATOR_DISCONNECT)
    deleteEmulator()
  }

  public connectEmulator (): void {
    this.window.webContents.send(MainMessage.EMULATOR_CONNECTED)
  }

  public updateEmulators (emulators: FilteredEmulator[]): void {
    this.window.webContents.send(MainMessage.UPDATE_EMULATORS, emulators)
  }

  public setServer (server: Server): void {
    this.window.webContents.send(MainMessage.SET_SERVER, server)
  }

  public setPlayers (players: IPlayerUpdate[]): void {
    this.window.webContents.send(MainMessage.SET_PLAYERS, players)
  }

  public setPlayer (playerId: number, player: IPlayer): void {
    this.window.webContents.send(MainMessage.SET_PLAYER, { playerId, player })
  }

  public setPlayerId (playerId: number): void {
    this.window.webContents.send(MainMessage.SET_PLAYER_ID, playerId)
  }

  public updatePlayerPositions (positions: {self: Position, positions: (Position | null)[]}): void {
    this.window.webContents.send(MainMessage.UPDATE_PLAYER_POSITIONS, positions)
  }

  public setGameMode (gameMode: number): void {
    this.window.webContents.send(MainMessage.GAME_MODE, gameMode)
  }

  public serverFull (): void {
    this.window.webContents.send(MainMessage.SERVER_FULL)
  }

  public wrongVersion (majorVersion: number, minorVersion: number): void {
    this.window.webContents.send(MainMessage.WRONG_VERSION, { majorVersion, minorVersion })
  }

  public acceptAuthentication (): void {
    this.window.webContents.send(MainMessage.AUTHENTICATION_ACCEPTED)
  }

  public denyAuthentication (throttle: number): void {
    this.window.webContents.send(MainMessage.AUTHENTICATION_DENIED, throttle)
  }

  public globalChatMessage (message: string, senderId: number): void {
    this.window.webContents.send(MainMessage.CHAT_GLOBAL, { message, senderId })
  }

  public commandMessage (message: string): void {
    this.window.webContents.send(MainMessage.CHAT_COMMAND, { message })
  }

  public setConnectionError (message: string): void {
    this.window.webContents.send(MainMessage.SET_CONNECTION_ERROR, message)
  }

  public setEmulatorError (message: string): void {
    this.window.webContents.send(MainMessage.SET_EMULATOR_ERROR, message)
  }

  public consoleInfo (...messages: string[]): void {
    this.window.webContents.send(MainMessage.CONSOLE_INFO, messages)
  }
}
