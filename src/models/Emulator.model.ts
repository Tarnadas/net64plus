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
  course: number
}

export interface Player extends IPlayer {
  position?: Position
}

export const CHARACTER_IMAGES = [
  'mario.png', 'luigi.png', 'yoshi.png', 'wario.png', 'peach.png', 'toad.png', 'waluigi.png', 'rosalina.png', 'sonic.png', 'knuckles.png', 'goomba.png', 'kirby.png'
]
