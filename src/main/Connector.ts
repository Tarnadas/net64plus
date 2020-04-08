import { ipcMain } from 'electron'

import { emulator, createEmulator, deleteEmulator, connection, createConnection, deleteConnection } from '.'
import { Emulator } from './Emulator'
import { HotkeyManager, HotkeyShortcut } from './HotkeyManager'
import { FilteredEmulator, Position } from '../models/Emulator.model'
import { MainMessage, RendererMessage } from '../models/Message.model'
import { Server } from '../models/Server.model'
import { IPlayerUpdate, IPlayer } from '../../proto/ServerClientMessage'
import { ButtonState } from '../renderer/GamepadManager'

export class Connector {
  constructor (private readonly window: Electron.BrowserWindow) {
    ipcMain.on(RendererMessage.CREATE_CONNECTION, this.onCreateConnection)
    ipcMain.on(RendererMessage.DISCONNECT, this.onDisconnect)
    ipcMain.on(RendererMessage.UPDATE_EMULATORS, this.onUpdateEmulators)
    ipcMain.on(RendererMessage.CREATE_EMULATOR_CONNECTION, this.onCreateEmulatorConnection)
    ipcMain.on(RendererMessage.DISCONNECT_EMULATOR, this.onDisconnectEmulator)
    ipcMain.on(RendererMessage.PLAYER_UPDATE, this.onPlayerUpdate)
    ipcMain.on(RendererMessage.PASSWORD, this.onSendPassword)
    ipcMain.on(RendererMessage.CHAT_GLOBAL, this.onSendGlobalChatMessage)
    ipcMain.on(RendererMessage.CHAT_COMMAND, this.onSendCommandMessage)
    ipcMain.on(RendererMessage.EMU_CHAT, this.onEmuChatChanged)
    ipcMain.on(RendererMessage.HOTKEYS_CHANGED, this.onHotkeysChanged)
    ipcMain.on(RendererMessage.CHARACTER_CYCLING_ORDER_CHANGED, this.onCharacterCyclingOrderChanged)
    ipcMain.on(RendererMessage.GAMEPAD_BUTTON_STATE_CHANGED, this.onGamepadButtonStateChanged)
  }

  public inGameChatEnabled = false

  private hotkeyManager = new HotkeyManager()

  private readonly onCreateConnection = (
    _: Electron.Event,
    { domain, ip, port, username, characterId }:
    {
      domain?: string, ip?: string, port?: number, username: string, characterId: number,
    }
  ) => {
    createConnection({ domain, ip, port, username, characterId })
  }

  private readonly onDisconnect = () => {
    deleteConnection()
  }

  private readonly onUpdateEmulators = () => {
    Emulator.updateEmulators().catch((error) => {
      console.error(error)
      throw error
    })
  }

  private readonly onCreateEmulatorConnection = (
    _: Electron.Event,
    { processId, characterId }:
    { processId: number, characterId: number }
  ) => {
    createEmulator({ processId, characterId })
  }

  private readonly onDisconnectEmulator = () => {
    deleteEmulator()
  }

  private readonly onPlayerUpdate = (
    _: Electron.Event,
    { username, characterId }:
    { username: string, characterId: number }
  ) => {
    this.hotkeyManager.username = username
    if (!emulator) return
    emulator.changeCharacter(characterId)
    if (!connection) return
    connection.sendPlayerUpdate({ username, characterId })
  }

  public sendPlayerUpdate (
    { username, characterId }:
    { username: string, characterId: number }
  ) {
    // This relies on a mock unconsumed event to pass through the same workflow so we cast as any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.onPlayerUpdate({} as any, { username, characterId })
  }

  private readonly onEmuChatChanged = (
    _: Electron.Event,
    { emuChat }: { emuChat: boolean}) => {
    this.inGameChatEnabled = emuChat
  }

  private readonly onHotkeysChanged = (
    _: Electron.Event,
    { hotkeyBindings, globalHotkeysEnabled, username }:
    { hotkeyBindings: { [shortcut in HotkeyShortcut]: string[] }, globalHotkeysEnabled: boolean, username: string }
  ) => {
    if (username) { this.hotkeyManager.username = username }
    this.hotkeyManager.setHotkeys(hotkeyBindings, globalHotkeysEnabled, this, this.window)
  }

  public onCharacterCyclingOrderChanged = (
    _: Electron.Event,
    { characterCyclingOrder }:
    { characterCyclingOrder: Array<{characterId: number, on: boolean}> }
  ) => {
    this.hotkeyManager.setCharacterCyclingOrder(characterCyclingOrder)
  }

  public onGamepadButtonStateChanged = (
    _: Electron.Event,
    { buttonState }:
    { buttonState: ButtonState }
  ) => {
    this.hotkeyManager.onGamepadButtonStateChanged(buttonState, this)
  }

  private readonly onSendPassword = (_: Electron.Event, password: string) => {
    if (!connection) return
    connection.sendPassword(password)
  }

  private readonly onSendGlobalChatMessage = (_: Electron.Event, message: string) => {
    if (!connection) return
    connection.sendGlobalChatMessage(message)
  }

  private readonly onSendCommandMessage = (
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

  public updatePlayerPositions (
    positions: {self: Position, cameraAngle: number, positions: Array<Position | null>}
  ): void {
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

  public setCharacter (characterId: number): void {
    this.window.webContents.send(MainMessage.SET_CHARACTER, characterId)
  }
}
