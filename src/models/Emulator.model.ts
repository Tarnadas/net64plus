import { IPlayer } from "../../proto/ServerClientMessage";

export interface FilteredEmulator {
  name: string
  pid: number
  windowName?: string
}

export interface Position {
  x: number
  y: number
  rotation: number
}

export interface Player extends IPlayer {
  position?: Position
}
