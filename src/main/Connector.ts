import { BrowserWindow, ipcMain } from 'electron'

import { emulator, createEmulator, deleteEmulator, connection, createConnection, deleteConnection } from '.'
import { Emulator } from './Emulator'
import { MainMessage, RendererMessage } from '../models/Message.model'
import { IPlayerUpdate, IPlayer } from '../../proto/ServerClientMessage'
import { Server } from '../models/Server.model';

export class Connector {
  constructor (private window: Electron.BrowserWindow) {
    ipcMain.on(RendererMessage.CREATE_CONNECTION, this.onCreateConnection)
    ipcMain.on(RendererMessage.DISCONNECT, this.onDisconnect)
    ipcMain.on(RendererMessage.CREATE_EMULATOR_CONNECTION, this.onCreateEmulatorConnection)
    ipcMain.on(RendererMessage.DISCONNECT_EMULATOR, this.onDisconnectEmulator)
    ipcMain.on(RendererMessage.CHANGE_CHARACTER, this.onChangeCharacter)
    ipcMain.on(RendererMessage.CHAT_MESSAGE, this.onSendChatMessage)
  }

  private onCreateConnection = (
    event: Electron.Event,
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

  private onCreateEmulatorConnection = (
    event: Electron.Event,
    { processId, characterId, inGameChatEnabled }:
    { processId: number, characterId: number, inGameChatEnabled: boolean }
  ) => {
    createEmulator({ processId, characterId, inGameChatEnabled })
  }

  private onDisconnectEmulator = () => {
    deleteEmulator()
  }

  private onChangeCharacter = (event: Electron.Event, characterId: number) => {
    if (!emulator) return
    emulator.changeCharacter(characterId)
  }

  private onSendChatMessage = (event: Electron.Event, message: string) => {
    if (!connection) return
    connection.sendChatMessage(message)
  }

  public closeWebSocket (code: number, hasError: boolean): void {
    this.window.webContents.send(MainMessage.WEBSOCKET_CLOSE, { code, hasError })
  }

  public disconnectEmulator (): void {
    this.window.webContents.send(MainMessage.EMULATOR_DISCONNECT)
    deleteEmulator()
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

  public serverFull (): void {
    this.window.webContents.send(MainMessage.SERVER_FULL)
  }

  public wrongVersion (majorVersion: number, minorVersion: number): void {
    this.window.webContents.send(MainMessage.WRONG_VERSION, { majorVersion, minorVersion })
  }

  public chatMessage (message: string, senderId: number): void {
    this.window.webContents.send(MainMessage.CHAT_MESSAGE, { message, senderId })
  }

  public setConnectionError (message: string): void {
    this.window.webContents.send(MainMessage.SET_CONNECTION_ERROR, message)
  }

  public consoleInfo (...messages: string[]): void {
    this.window.webContents.send(MainMessage.CONSOLE_INFO, messages)
  }
}
