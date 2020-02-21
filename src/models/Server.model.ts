import { Player } from './Emulator.model'
import { GameModeType } from '../../proto/ServerClientMessage'

export interface Server {
  id?: string
  domain?: string
  ip: string
  port: number
  name?: string
  description?: string
  players?: Array<Player | null>
  countryCode?: string
  gameMode?: GameModeType
  version?: string
  passwordRequired?: boolean | null
  isDedicated?: boolean
}

export interface Course {
  short: string
  long: string
  icon: string
}
