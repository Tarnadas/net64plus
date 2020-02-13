import { Player } from './Emulator.model'

export interface Server {
  id?: string
  domain?: string
  ip: string
  port: number
  name?: string
  description?: string
  players?: (Player | null)[]
  countryCode?: string
  gameMode?: number
  version?: string
  passwordRequired?: boolean | null
  isDedicated?: boolean
}
