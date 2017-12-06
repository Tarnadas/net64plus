import React from 'react'
import { connect } from 'react-redux'
import { shell } from 'electron'
import marked from 'marked'
import { emojify } from 'node-emoji'

import SMMButton from '../buttons/SMMButton'
import Connection from '../../Connection'
import { disconnect, setConnection } from '../../actions/connection'

const CHARACTER_IMAGES = [
  'mario.png', 'luigi.png', 'yoshi.png', 'wario.png', 'peach.png', 'toad.png', 'waluigi.png', 'rosalina.png'
]

class Net64ServerPanel extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      display: !!props.isConnected,
      loading: false,
      alert: ''
    }
    this.onToggle = this.onToggle.bind(this)
    this.onConnect = this.onConnect.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
    this.renderPlayers = this.renderPlayers.bind(this)
  }
  componentDidMount () {
    if (this.props.server.description) {
      this.description.innerHTML = emojify(marked(this.props.server.description))
      this.description.querySelectorAll('.markdown a').forEach(a => {
        const href = a.getAttribute('href')
        a.removeAttribute('href')
        a.onclick = () => {
          shell.openExternal(href)
        }
      })
    }
  }
  componentWillUpdate (nextProps) {
    if (nextProps.server.description !== this.props.server.description) {
      this.description.innerHTML = emojify(marked(nextProps.server.description))
    }
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
      const connection = new Connection(this.props.server, this.props.emulator, this.props.username, this.props.characterId, this.props.emuchat, () => {
        this.props.dispatch(setConnection(connection))
      }, err => {
        err = String(err)
        if (err.includes('getaddrinfo')) {
          err = 'Could not resolve host name.\nDNS lookup failed'
        } else if (err.includes('DTIMEDOUT')) {
          err = 'Server timed out.\nIt might be offline or you inserted a wrong IP address'
        } else if (err.includes('ECONNREFUSED')) {
          err = 'Server refused connection.\nThe server might not have set up proper port forwarding or you inserted a wrong port'
        }
        this.setState({
          alert: String(err),
          loading: false
        })
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
    this.props.onDisconnect()
    this.props.dispatch(disconnect())
  }
  renderPlayers (players) {
    const style = {
      borderBottom: '1px solid black',
      borderTop: '1px solid black',
      display: 'flex'
    }
    return Array.from((function * () {
      for (let i in players) {
        if (!players.hasOwnProperty(i)) continue
        const player = players[i]
        yield (
          <div style={style} key={i}>
            <img src={`img/${CHARACTER_IMAGES[player.characterId]}`} />
            <div>
              { player.username }
            </div>
          </div>
        )
      }
    })())
  }
  render () {
    const server = this.props.server
    const isConnected = this.props.isConnected
    const loading = this.state.loading
    const alert = this.state.alert
    const styles = {
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
        display: 'flex'
      },
      name: {
        margin: '0 30px',
        flex: '1 1 auto'
      },
      players: {
        whiteSpace: 'nowrap'
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
      warningWrapper: {
        width: '100%'
      },
      warning: {
        color: '#a00003',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      warningImg: {
        height: '30px',
        marginRight: '20px'
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
              <div>
                { server.countryCode }
              </div>
              <div style={styles.name}>
                { server.name }
              </div>
              <div style={styles.players}>
                { server.players.length } / 24
              </div>
            </div>
          )
        }
        {
          server.isDirect ? (
            <div style={styles.details}>
              <SMMButton text='Disconnect' iconSrc='img/net64.svg' fontSize='13px' onClick={this.onDisconnect} />
            </div>
          ) : (
            <div style={styles.details}>
              <div style={styles.warningWrapper}>
                {
                  alert &&
                  <div style={styles.warning}>
                    <img style={styles.warningImg} src='img/warning.svg' />
                    <div>{alert}</div>
                  </div>
                }
              </div>
              <div style={styles.left}>
                <div style={styles.el}>
                  { server.domain || server.ip }:{ server.port }
                </div>
                <div className='markdown' style={styles.el} ref={x => { this.description = x }} />
              </div>
              <div style={styles.right}>
                {
                  this.renderPlayers(server.players)
                }
              </div>
              <div style={{width: '100%'}}>
                {
                  isConnected ? (
                    <SMMButton text='Disconnect' iconSrc='img/net64.svg' fontSize='13px' onClick={this.onDisconnect} />
                  ) : (
                    <SMMButton text='Connect' iconSrc='img/net64.svg' fontSize='13px' onClick={this.onConnect} />
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
export default connect(state => ({
  emulator: state.get('emulator'),
  username: state.getIn(['save', 'data', 'username']),
  characterId: state.getIn(['save', 'data', 'character']),
  emuchat: state.getIn(['save', 'data', 'emuchat'])
}))(Net64ServerPanel)
