import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { shell } from 'electron'
import * as marked from 'marked'
import { emojify } from 'node-emoji'

import { SMMButton } from '../buttons/SMMButton'
import { WarningPanel } from '../panels/WarningPanel'
import { disconnect, setConnection } from '../../actions/connection'
import { Connection } from '../../Connection'
import { Emulator } from '../../Emulator'
import { State } from '../../models/State.model'
import { Server, Player } from '../../models/Server.model'

interface Net64ServerPanelProps {
  dispatch: Dispatch<State>
  server: Server
  emulator: Emulator
  username: string
  characterId: number
  isConnected?: boolean
  onDisconnect?: () => void
}

interface Net64ServerPanelState {
  display: boolean
  loading: boolean
  warning: string
}

const CHARACTER_IMAGES = [
  'mario.png', 'luigi.png', 'yoshi.png', 'wario.png', 'peach.png', 'toad.png', 'waluigi.png', 'rosalina.png'
]

class Panel extends React.PureComponent<Net64ServerPanelProps, Net64ServerPanelState> {
  private description: HTMLElement | null = null

  constructor (public props: Net64ServerPanelProps) {
    super(props)
    this.state = {
      display: !!props.isConnected,
      loading: false,
      warning: ''
    }
    this.onToggle = this.onToggle.bind(this)
    this.onConnect = this.onConnect.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
    this.renderPlayers = this.renderPlayers.bind(this)
  }
  componentDidMount () {
    if (!this.props.server.description || !this.description) return
    this.description.innerHTML = emojify(marked(this.props.server.description))
    const links: NodeListOf<HTMLElement> = this.description.querySelectorAll('.markdown a')
    for (let i = 0; i < links.length; i++) {
      const href = links[i].getAttribute('href')
      links[i].removeAttribute('href')
      links[i].onclick = () => {
        if (!href) return
        shell.openExternal(href)
      }
    }
  }
  componentWillUpdate (nextProps: Net64ServerPanelProps) {
    if (!nextProps.server.description || nextProps.server.description === this.props.server.description || !this.description) return
    this.description.innerHTML = emojify(marked(nextProps.server.description))
  }
  onToggle () {
    if (this.props.isConnected) return
    this.setState(prevState => ({
      display: !prevState.display
    }))
  }
  onConnect () {
    try {
      this.setState({
        loading: true
      })
      const connection = new Connection({
        server: this.props.server,
        emulator: this.props.emulator,
        username: this.props.username,
        characterId: this.props.characterId,
        onConnect: () => {
          this.props.dispatch(setConnection(connection))
          this.props.emulator.displayChatMessage('- connected to server -')
        },
        onError: (err: Error) => {
          let warning: string = String(err)
          if (warning.includes('getaddrinfo')) {
            warning = 'Could not resolve host name.\nDNS lookup failed'
          } else if (warning.includes('DTIMEDOUT')) {
            warning = 'Server timed out.\nIt might be offline or you inserted a wrong IP address'
          } else if (warning.includes('ECONNREFUSED')) {
            warning = 'Server refused connection.\nThe server might not have set up proper port forwarding or you inserted a wrong port'
          }
          this.setState({
            warning,
            loading: false
          })
        }
      })
    } catch (err) {
      this.setState({
        loading: false
      })
      console.error(err)
    }
  }
  onDisconnect () {
    this.setState({
      loading: false
    })
    if (!this.props.onDisconnect) {
      throw new Error('Net64ServerPanel.onDisconnect was called without being declared')
    }
    this.props.onDisconnect()
    this.props.dispatch(disconnect())
  }
  renderPlayers (players: Player[]) {
    const style = {
      borderBottom: '1px solid black',
      borderTop: '1px solid black',
      display: 'flex'
    }
    return players.map(
      (player, index) =>
        player
          ? <div style={style} key={index}>
            <img src={`img/${CHARACTER_IMAGES[player.characterId]}`} />
            <div>
              { player.username }
            </div>
          </div>
          : <div key={index} />
    )
  }
  render () {
    const server = this.props.server
    const players = server.players || []
    const isConnected = this.props.isConnected
    const loading = this.state.loading
    const warning = this.state.warning
    const styles: React.CSSProperties = {
      panel: {
        fontSize: '18px',
        margin: '10px 0'
      },
      header: {
        width: '100%',
        padding: '6px 12px',
        backgroundColor: '#fff8af',
        borderRadius: '6px',
        border: '4px solid #f8ca00',
        boxShadow: '0 0 0 4px black',
        cursor: 'pointer',
        display: 'flex',
        flexWrap: 'wrap'
      },
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
      details: {
        display: this.state.display ? 'flex' : 'none',
        margin: '4px 10px 0 10px',
        width: 'calc(100% - 20px)',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: '0 0 10px 10px',
        flexWrap: 'wrap'
      },
      left: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        flex: '1 0 auto',
        minWidth: '300px',
        wordWrap: 'break-word'
      },
      right: {
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        padding: '6px',
        flex: '1 0 auto',
        minWidth: '300px',
        maxWidth: '500px'
      },
      el: {
        margin: '6px'
      },
      loading: {
        display: 'flex',
        position: 'fixed',
        zIndex: '100',
        backgroundColor: 'rgba(0,0,0,0.6)',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
    return (
      <div style={styles.panel}>
        {
          loading &&
          <div style={styles.loading}>
            <img src='img/load.gif' />
          </div>
        }
        {
          server.isDirect ? (
            <div style={styles.header} onClick={this.onToggle}>
              <div>
                { server.ip }:{ server.port }
              </div>
            </div>
          ) : (
            <div style={styles.header} onClick={this.onToggle}>
              <div style={{ flex: '0 0 40px' }}>
                { server.countryCode }
              </div>
              <div style={styles.name}>
                { server.name }
              </div>
              <div style={styles.players}>
                { players.length } / 24
              </div>
            </div>
          )
        }
        {
          server.isDirect
            ? <div style={styles.details}>
              <SMMButton
                text='Disconnect'
                iconSrc='img/net64.svg'
                onClick={this.onDisconnect}
              />
            </div>
            : <div style={styles.details}>
              {
                warning &&
                <WarningPanel warning={warning} />
              }
              <div style={styles.left}>
                <div style={styles.el}>
                  { server.domain || server.ip }:{ server.port }
                </div>
                <div className='markdown' style={styles.el} ref={x => { this.description = x }} />
              </div>
              <div style={styles.right}>
                {
                  this.renderPlayers(players)
                }
              </div>
              <div style={{width: '100%'}}>
                {
                  isConnected
                    ? <SMMButton
                      text='Disconnect'
                      iconSrc='img/net64.svg'
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
        }
      </div>
    )
  }
}
export const Net64ServerPanel = connect((state: State) => ({
  emulator: state.emulator.instance,
  username: state.save.appSaveData.username,
  characterId: state.save.appSaveData.character
}))(Panel)
