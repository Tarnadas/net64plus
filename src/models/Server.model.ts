export interface Player {
  username: string
  characterId: number
}

export interface Server {
  id?: string
  ip: string
  domain?: string
  port: number
  name?: string
  description?: string
  players?: Player[]
  countryCode?: string
  isDirect?: boolean
}
