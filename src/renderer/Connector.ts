import { ipcRenderer } from 'electron'
import { push } from 'react-router-redux'

import { store } from '.'
import { addGlobalMessage, clearGlobalMessages } from './utils/chat.util'
import {
  authenticationAccepted,
  authenticationDenied,
  authenticationRequired,
  disconnect,
  setConnectionError,
  setGameMode,
  setPlayer,
  setPlayers,
  setServer,
  updatePlayerPositions,
  setPlayerId
} from './actions/connection'
import { isConnectedToEmulator, setEmulatorError, updateEmulators } from './actions/emulator'
import { MainMessage, RendererMessage } from '../models/Message.model'
import { Server } from '../models/Server.model'
import { IPlayer, IPlayerUpdate } from '../../proto/ServerClientMessage'
import { FilteredEmulator, Position } from '../models/Emulator.model'
import { setCharacter } from './actions/save'
import { ButtonState } from './GamepadManager'
import { testEmulator } from '../models/Emulator.mock'
import { HotkeyShortcut } from '../main/HotkeyManager'

export class Connector {
  constructor () {
    ipcRenderer.on(MainMessage.WEBSOCKET_CLOSE, this.onWebSocketClose)
    ipcRenderer.on(MainMessage.EMULATOR_DISCONNECT, this.onEmulatorDisconnect)
    ipcRenderer.on(MainMessage.EMULATOR_CONNECTED, this.onEmulatorConnected)
    ipcRenderer.on(MainMessage.UPDATE_EMULATORS, this.onUpdateEmulators)
    ipcRenderer.on(MainMessage.SET_SERVER, this.onSetServer)
    ipcRenderer.on(MainMessage.SET_PLAYERS, this.onSetPlayers)
    ipcRenderer.on(MainMessage.SET_PLAYER, this.onSetPlayer)
    ipcRenderer.on(MainMessage.SET_PLAYER_ID, this.onSetPlayerId)
    ipcRenderer.on(MainMessage.UPDATE_PLAYER_POSITIONS, this.onUpdatePlayerPositions)
    ipcRenderer.on(MainMessage.GAME_MODE, this.onSetGameMode)
    ipcRenderer.on(MainMessage.SERVER_FULL, this.onServerFull)
    ipcRenderer.on(MainMessage.WRONG_VERSION, this.onWrongVersion)
    ipcRenderer.on(MainMessage.AUTHENTICATION_ACCEPTED, this.onAuthenticationAccepted)
    ipcRenderer.on(MainMessage.AUTHENTICATION_DENIED, this.onAuthenticationDenied)
    ipcRenderer.on(MainMessage.CHAT_GLOBAL, this.onGlobalChatMessage)
    ipcRenderer.on(MainMessage.CHAT_COMMAND, this.onCommandMessage)
    ipcRenderer.on(MainMessage.SET_CONNECTION_ERROR, this.onConnectionError)
    ipcRenderer.on(MainMessage.SET_EMULATOR_ERROR, this.onEmulatorError)
    ipcRenderer.on(MainMessage.CONSOLE_INFO, this.onConsoleInfo)
    ipcRenderer.on(MainMessage.SET_CHARACTER, this.onSetCharacter)
  }

  private readonly onWebSocketClose = (
    _: Electron.Event,
    { code, hasError }:
    { code: number, hasError: boolean }
  ) => {
    store.dispatch(disconnect())
    if (code === 1006 && !hasError) {
      store.dispatch(setConnectionError('Lost connection to server'))
    }
    clearGlobalMessages()
  }

  private readonly onEmulatorDisconnect = () => {
    store.dispatch(isConnectedToEmulator(false))
    store.dispatch(setEmulatorError('Emulator disconnected or closed'))
    store.dispatch(push('/emulator'))
  }

  private readonly onEmulatorConnected = () => {
    store.dispatch(isConnectedToEmulator(true))
    store.dispatch(setEmulatorError())
    store.dispatch(push('/browse'))
  }

  private readonly onUpdateEmulators = (_: Electron.Event, emulators: FilteredEmulator[]) => {
    if (process.env.NODE_ENV === 'development') {
      emulators.push(testEmulator)
    }
    store.dispatch(updateEmulators(emulators))
  }

  private readonly onUpdatePlayerPositions = (
    _: Electron.Event,
    positions: {self: Position, cameraAngle: number, positions: Array<Position | null>}
  ) => {
    store.dispatch(updatePlayerPositions(positions))
  }

  private readonly onSetServer = (_: Electron.Event, server: Server) => {
    if (process.env.NODE_ENV === 'development') {
      console.info('CONNECTED TO SERVER', server)
    }
    store.dispatch(setServer(server))
    if (server.passwordRequired) {
      store.dispatch(authenticationRequired())
    }
  }

  private readonly onSetPlayers = (_: Electron.Event, players: IPlayerUpdate[]) => {
    store.dispatch(setPlayers(players))
  }

  private readonly onSetPlayer = (_: Electron.Event, { playerId, player }: { playerId: number, player: IPlayer }) => {
    store.dispatch(setPlayer(playerId, player))
  }

  private readonly onSetPlayerId = (_: Electron.Event, playerId: number) => {
    addGlobalMessage('Connected', '[SERVER]', true)
    store.dispatch(setPlayerId(playerId))
  }

  private readonly onSetGameMode = (_: Electron.Event, gameMode: number) => {
    store.dispatch(setGameMode(gameMode))
  }

  private readonly onServerFull = () => {
    store.dispatch(setConnectionError('Server is full'))
  }

  private readonly onWrongVersion = (
    _: Electron.Event,
    { majorVersion, minorVersion }:
    { majorVersion: number, minorVersion: number}
  ) => {
    const error = `\
The server's network API version (${majorVersion}.${minorVersion}) \
is incompatible with your client API version (${process.env.MAJOR}.${process.env.MINOR})`
    store.dispatch(setConnectionError(error))
    // TODO add server version -> client version mapping
  }

  private readonly onAuthenticationAccepted = () => {
    store.dispatch(authenticationAccepted())
  }

  private readonly onAuthenticationDenied = (_: Electron.Event, throttle: number) => {
    store.dispatch(authenticationDenied(throttle))
  }

  private readonly onGlobalChatMessage = (
    _: Electron.Event,
    { message, senderId }:
    { message: string, senderId: number }
  ) => {
    const server = store.getState().connection.server
    if (!server || !server.players || !server.players[senderId]) return
    const username = server.players[senderId] && server.players[senderId]!.username
    addGlobalMessage(message, username ?? '?', false)
  }

  private readonly onCommandMessage = (_: Electron.Event, { message }: { message: string }) => {
    addGlobalMessage(message, '[SERVER]', true)
  }

  private readonly onConnectionError = (_: Electron.Event, message: string) => {
    store.dispatch(setConnectionError(message))
  }

  private readonly onEmulatorError = (_: Electron.Event, message: string) => {
    store.dispatch(setEmulatorError(message))
    if (message) {
      store.dispatch(push('/emulator'))
    }
  }

  private readonly onConsoleInfo = (_: Electron.Event, messages: string[]) => {
    console.info(...messages)
  }

  private readonly onSetCharacter = (_: Electron.Event, characterId: number) => {
    store.dispatch(setCharacter(characterId))
  }

  public createConnection (
    { domain, ip, port, username, characterId }:
    {
      domain?: string,
      ip?: string,
      port?: number,
      username: string,
      characterId: number,
    }
  ): void {
    ipcRenderer.send(
      RendererMessage.CREATE_CONNECTION,
      { domain, ip, port, username, characterId }
    )
  }

  public disconnect (): void {
    ipcRenderer.send(RendererMessage.DISCONNECT)
  }

  public updateEmulators (): void {
    ipcRenderer.send(RendererMessage.UPDATE_EMULATORS)
  }

  public createEmulatorConnection (
    { processId, characterId }:
    { processId: number, characterId: number }
  ): void {
    ipcRenderer.send(RendererMessage.CREATE_EMULATOR_CONNECTION, { processId, characterId })
  }

  public disconnectEmulator (): void {
    ipcRenderer.send(RendererMessage.DISCONNECT_EMULATOR)
  }

  public playerUpdate (update: { username: string, characterId: number }): void {
    ipcRenderer.send(RendererMessage.PLAYER_UPDATE, update)
  }

  public sendPassword (password: string): void {
    ipcRenderer.send(RendererMessage.PASSWORD, password)
  }

  public sendGlobalChatMessage (message: string): void {
    ipcRenderer.send(RendererMessage.CHAT_GLOBAL, message)
  }

  public sendCommandMessage (message: string, args: string[]): void {
    ipcRenderer.send(RendererMessage.CHAT_COMMAND, { message, args })
  }

  public changeEmuChat (emuChat: boolean): void {
    ipcRenderer.send(RendererMessage.EMU_CHAT, { emuChat })
  }

  public changeHotkeyBindings (
    { hotkeyBindings, globalHotkeysEnabled, username }:
    { hotkeyBindings: { [shortcut in HotkeyShortcut]: string[] }, globalHotkeysEnabled: boolean, username?: string }
  ) {
    ipcRenderer.send(RendererMessage.HOTKEYS_CHANGED, { hotkeyBindings, globalHotkeysEnabled, username })
  }

  public changeCharacterCyclingOrder (
    { characterCyclingOrder }:
    { characterCyclingOrder: Array<{characterId: number, on: boolean}> }
  ) {
    ipcRenderer.send(RendererMessage.CHARACTER_CYCLING_ORDER_CHANGED, { characterCyclingOrder })
  }

  public emitButtonState (
    { buttonState }:
    { buttonState: ButtonState }
  ): void {
    ipcRenderer.send(RendererMessage.GAMEPAD_BUTTON_STATE_CHANGED, { buttonState })
  }
}
