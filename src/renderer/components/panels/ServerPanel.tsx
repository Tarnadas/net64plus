import './ServerPanel.scss'

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { shell } from 'electron'
import * as marked from 'marked'
import { emojify } from 'node-emoji'

import { connector } from '../..'
import { SMMButton } from '../buttons/SMMButton'
import { WarningPanel } from './WarningPanel'
import { RadarPanel } from './RadarPanel'
import { disconnect, setConnectionError } from '../../actions/connection'
import { State } from '../../../models/State.model'
import { Server, Course } from '../../../models/Server.model'
import { Position, Player, CHARACTER_IMAGES } from '../../../models/Emulator.model'
import { GameModeType } from '../../../../proto/ServerClientMessage'

const { sanitize } = require('dompurify').default

interface ServerPanelProps {
  dispatch: Dispatch<State>
  server: Server
  username: string
  characterId: number
  selfPos: Position
  connectionError: string
  onConnect?: () => void
  isConnected?: boolean
}

interface ServerPanelState {
  display: boolean
  displayDescription: boolean
  warning: string
}

class Panel extends React.PureComponent<ServerPanelProps, ServerPanelState> {
  constructor (public props: ServerPanelProps) {
    super(props)
    this.state = {
      display: !!props.isConnected,
      displayDescription: true,
      warning: ''
    }
    this.onToggle = this.onToggle.bind(this)
    this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this)
    this.onConnect = this.onConnect.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
    this.renderPlayers = this.renderPlayers.bind(this)
  }

  private getDescription = (): string => {
    if (!this.props.server.description) return ''
    let description = emojify(marked(this.props.server.description))
    const document: Document = new DOMParser().parseFromString(description, 'text/html')
    const links: NodeListOf<HTMLElement> = document.querySelectorAll('.markdown a')
    for (let i = 0; i < links.length; i++) {
      const href = links[i].getAttribute('href')
      links[i].removeAttribute('href')
      links[i].onclick = () => {
        if (!href) return
        shell.openExternal(href)
      }
    }
    description = sanitize(document.body.outerHTML)
    return description
  }

  private onToggle (): void {
    if (this.props.isConnected) return
    this.setState(prevState => ({
      display: !prevState.display
    }))
  }

  private handleDescriptionToggle (): void {
    this.setState(prevState => ({
      displayDescription: !prevState.displayDescription
    }))
  }

  private onConnect (): void {
    if (this.props.onConnect) this.props.onConnect()
    const server = this.props.server
    this.props.dispatch(setConnectionError(''))
    connector.createConnection({
      domain: server.domain,
      ip: server.ip,
      port: server.port,
      username: this.props.username,
      characterId: this.props.characterId
    })
  }

  private onDisconnect (): void {
    this.props.dispatch(disconnect())
    connector.disconnect()
  }

  private getGameMode (server: Server): string {
    switch (server.gameMode) {
      case GameModeType.DEFAULT:
        return 'Regular'
      case GameModeType.INTERACTIONLESS:
        return 'Interactionless'
      case GameModeType.THIRD_PERSON_SHOOTER:
        return '3rd Person Shooter'
      case GameModeType.PROP_HUNT:
        return 'Prop Hunt'
      case GameModeType.TAG:
        return 'Tag'
      case GameModeType.BOSS_RUSH:
        return 'Boss Rush'
      case GameModeType.WARIO_WARE:
        return 'Wario Ware'
    }
    return ''
  }

  private getGameModeImgSrc (server: Server): string | undefined {
    switch (server.gameMode) {
      case GameModeType.DEFAULT:
        return 'img/regular.svg'
      case GameModeType.INTERACTIONLESS:
        return 'img/interactionless.svg'
      case GameModeType.THIRD_PERSON_SHOOTER:
        return 'img/shooter.svg'
      case GameModeType.PROP_HUNT:
        return 'img/prop_hunt.svg'
      case GameModeType.TAG:
        return 'img/tag.svg'
      case GameModeType.BOSS_RUSH:
        return 'img/boss_rush.png'
      case GameModeType.WARIO_WARE:
        return 'img/wario_ware.png'
    }
  }

  private getPlayerCourse (position?: Position): Course {
    if (!position) {
      return {
        short: '???',
        long: 'Unknown',
        icon: 'img.help.png'
      }
    }
    switch (position.course) {
      case 4:
        return {
          short: 'BBH',
          long: 'Boo\'s Big Haunt',
          icon: 'img/courses/05-bbh.png'
        }
      case 5:
        return {
          short: 'CCM',
          long: 'Cool, Cool Mountain',
          icon: 'img/courses/04-ccm.png'
        }
      case 6:
        return {
          short: 'CASTL',
          long: 'Castle Lobby',
          icon: 'img/courses/00-castle.png'
        }
      case 7:
        return {
          short: 'HMC',
          long: 'Hazy Maze Cave',
          icon: 'img/courses/06-hmc.png'
        }
      case 8:
        return {
          short: 'SSL',
          long: 'Shifting Sand Land',
          icon: 'img/courses/08-ssl.png'
        }
      case 9:
        return {
          short: 'BOB',
          long: 'Bob-omb\'s Battlefield',
          icon: 'img/courses/01-bob.png'
        }
      case 10:
        return {
          short: 'SL',
          long: 'Snowman\'s Land',
          icon: 'img/courses/10-sl.png'
        }
      case 11:
        return {
          short: 'WDW',
          long: 'Wet-Dry World',
          icon: 'img/courses/11-wdw.png'
        }
      case 12:
        return {
          short: 'JRB',
          long: 'Jolly Roger Bay',
          icon: 'img/courses/03-jrb.png'
        }
      case 13:
        return {
          short: 'THI',
          long: 'Tiny-Huge Island',
          icon: 'img/courses/13-thi.png'
        }
      case 14:
        return {
          short: 'TTC',
          long: 'Tick Tock Clock',
          icon: 'img/courses/14-ttc.png'
        }
      case 15:
        return {
          short: 'RR',
          long: 'Rainbow Ride',
          icon: 'img/courses/15-rr.png'
        }
      case 16:
        return {
          short: 'START',
          long: 'Outside Castle',
          icon: 'img/courses/00-castle.png'
        }
      case 17:
        return {
          short: 'BITDW',
          long: 'Bowser in the Dark World',
          icon: 'img/courses/16-bitdw.png'
        }
      case 18:
        return {
          short: 'VC',
          long: 'Vanish Cap Under the Moat',
          icon: 'img/courses/22-vanish.png'
        }
      case 19: 
        return {
          short: 'BITFS',
          long: 'Bowser in the Fire Sea',
          icon: 'img/courses/17-bitfs.png'
        }
      case 20:
        return {
          short: 'AQUA',
          long: 'Secret Aquarium',
          icon: 'img/courses/24-aqua.png'
        }
      case 21:
        return {
          short: 'BITS',
          long: 'Bowser in the Sky',
          icon: 'img/courses/18-bits.png'
        }
      case 22:
        return {
          short: 'LLL',
          long: 'Lethal Lava Land',
          icon: 'img/courses/07-lll.png'
        }
      case 23:
        return {
          short: 'DDD',
          long: 'Dire, Dire Docks',
          icon: 'img/courses/09-ddd.png'
        }
      case 24:
        return {
          short: 'WF',
          long: 'Whomp\'s Fortress',
          icon: 'img/courses/02-wf.png'
        }
      case 26:
        return {
          short: 'COURT',
          long: 'Courtyard',
          icon: 'img/courses/00-castle.png'
        }
      case 27:
        return {
          short: 'PSS',
          long: 'Peach\'s Secret Slide',
          icon: 'img/courses/19-pss.png'
        }
      case 28:
        return {
          short: 'MC',
          long: 'Cavern of the Metal Cap',
          icon: 'img/courses/20-metal.png'
        }
      case 29:
        return {
          short: 'WC',
          long: 'Tower of the Wing Cap',
          icon: 'img/courses/21-wing.png'
        }
      case 30:
        return {
          short: 'BITDW',
          long: 'Bowser in the Dark World',
          icon: 'img/courses/16-bitdw.png'
        }
      case 31:
        return {
          short: 'SKY',
          long: 'Wing Mario Over the Rainbow',
          icon: 'img/courses/23-sky.png'
        }
      case 33:
        return {
          short: 'BITFS',
          long: 'Bowser in the Fire Sea',
          icon: 'img/courses/17-bitfs.png'
        }
      case 34:
        return {
          short: 'BITS',
          long: 'Bowser in the Sky',
          icon: 'img/courses/18-bits.png'
        }
      case 36:
        return {
          short: 'TTM',
          long: 'Tall, Tall Mountain',
          icon: 'img/courses/12-ttm.png'
        }
    }
    return {
      short: '???',
      long: 'Unknown',
      icon: 'img.help.png'
    }
  }

  private renderPlayers (players: (Player | null)[]): JSX.Element[] {
    return players
      .filter(player => !!player)
      .map(
        (player, index) =>
          <div
            key={index}
            className='server-panel-player'
          >
            <div className='server=panel-player-course'>
              { this.getPlayerCourse(player!.position) }
            </div>
            <div className='server-panel-player-img'>
              <img src={`img/${CHARACTER_IMAGES[player!.characterId || 0]}`} />
            </div>
            <div className='server-panel-player-name'>
              { player!.username }
            </div>
          </div>
      )
  }

  public render (): JSX.Element {
    const { selfPos, server, username, characterId, isConnected } = this.props
    const { display, displayDescription, warning } = this.state
    const players = server.players || []
    const gameMode: string | undefined = this.getGameModeImgSrc(server)
    const styles: Record<string, React.CSSProperties> = {
      name: {
        flex: '1 1 auto',
        wordWrap: 'break-word',
        maxWidth: 'calc(100% - 110px)'
      },
      players: {
        whiteSpace: 'nowrap',
        flex: '0 0 70px',
        textAlign: 'right'
      },
      left: {
        display: 'flex',
        wordWrap: 'break-word',
        maxWidth: '100%',
        flex: displayDescription ? '1 1 250px' : undefined
      },
      el: {
        margin: '6px'
      }
    }
    return (
      <div className='server-panel'>
        <div
          className='server-panel-header'
          onClick={this.onToggle}
        >
          <div className='server-panel-header-img'>
            <img src={`${
              server.isDedicated
                ? 'img/server.svg'
                : 'img/pc.svg'
            }`} />
          </div>
          <div style={{ flex: '0 0 40px' }}>
            { server.countryCode || '' }
          </div>
          {
            gameMode &&
            <div className='server-panel-header-img'>
              <img src={gameMode} />
            </div>
          }
          <div style={styles.name}>
            { server.name || `${server.ip}:${server.port}` }
          </div>
          <div style={styles.players}>
            { players.filter(player => player).length } / 24
          </div>
        </div>
        <div className={`server-panel-details-wrapper${!display ? ' global-hidden' : ''}`}>
          <div className='server-panel-details'>
            {
              warning &&
              <WarningPanel warning={warning} />
            }
            <div style={styles.left}>
              <div
                className={`server-panel-description-toggle${!displayDescription ? ' server-panel-description-toggle-inactive' : ''}`}
                onClick={this.handleDescriptionToggle}
              >
                <img src='img/arrow.svg' style={{ width: '100%' }} />
              </div>
              <div
                className={`server-panel-description${!displayDescription ? ' server-panel-description-inactive' : ''}`}
              >
                <div style={styles.el}>
                  { server.domain || server.ip }:{ server.port }
                </div>
                {
                  gameMode &&
                  <div
                    className='server-panel-gamemode'
                    style={styles.el}
                  >
                    Game Mode: { this.getGameMode(server) }
                  </div>
                }
                <div
                  className='markdown'
                  style={styles.el}
                  dangerouslySetInnerHTML={{ __html: this.getDescription() }}
                />
              </div>
            </div>
            {
              isConnected &&
              <div className='server-panel-details-radar'>
                <RadarPanel
                  self={{
                    username,
                    characterId,
                    position: selfPos
                  }}
                  players={server.players || []}
                />
              </div>
            }
            <div className='server-panel-details-playerlist'>
              {
                this.renderPlayers(players)
              }
            </div>
          </div>
          <div style={{width: '100%'}}>
            {
              isConnected
                ? <SMMButton
                  text='Disconnect'
                  iconSrc='img/disconnect.svg'
                  onClick={this.onDisconnect}
                />
                : <SMMButton
                  text='Connect'
                  iconSrc='img/net64.svg'
                  onClick={this.onConnect}
                />
            }
          </div>
        </div>
      </div>
    )
  }
}
export const ServerPanel = connect((state: State) => ({
  username: state.save.appSaveData.username,
  characterId: state.save.appSaveData.character,
  selfPos: state.connection.selfPos,
  connectionError: state.connection.error
}))(Panel)
