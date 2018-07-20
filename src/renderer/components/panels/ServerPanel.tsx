import './ServerPanel.scss'

import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { shell } from 'electron'
import * as marked from 'marked'
import { emojify } from 'node-emoji'

import { connector } from '../..'
import { SMMButton } from '../buttons/SMMButton'
import { WarningPanel } from '../panels/WarningPanel'
import { disconnect, setConnectionError } from '../../actions/connection'
import { State } from '../../../models/State.model'
import { Server } from '../../../models/Server.model'
import { IPlayer, GameModeType } from '../../../../proto/ServerClientMessage'

const { sanitize } = require('dompurify').default

interface ServerPanelProps {
  dispatch: Dispatch<State>
  server: Server
  username: string
  characterId: number
  connectionError: string
  onConnect?: () => void
  isConnected?: boolean
}

interface ServerPanelState {
  display: boolean
  displayDescription: boolean
  warning: string
}

const CHARACTER_IMAGES = [
  'mario.png', 'luigi.png', 'yoshi.png', 'wario.png', 'peach.png', 'toad.png', 'waluigi.png', 'rosalina.png', 'sonic.png', 'knuckles.png', 'goomba.png', 'kirby.png'
]

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

  private renderPlayers (players: IPlayer[]): JSX.Element[] {
    return players
      .filter(player => player)
      .map(
        (player, index) =>
          <div
            key={index}
            className='server-panel-player'
          >
            <div className='server-panel-player-img'>
              <img src={`img/${CHARACTER_IMAGES[player.characterId || 0]}`} />
            </div>
            <div className='server-panel-player-name'>
              { player.username }
            </div>
          </div>
      )
  }

  public render (): JSX.Element {
    const { server, isConnected } = this.props
    const { display, displayDescription, warning } = this.state
    const players = server.players || []
    const gameMode: string | undefined = this.getGameModeImgSrc(server)
    const styles: React.CSSProperties = {
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
        flex: displayDescription ? '1 1 0' : undefined
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
          <div style={{ flex: '0 0 40px' }}>
            { server.countryCode || '' }
          </div>
          {
            gameMode &&
            <div className='server-panel-header-gamemode'>
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
  connectionError: state.connection.error
}))(Panel)
