import React from 'react'
import got from 'got'

import { resolve } from 'url'

import Net64ServerPanel from '../panels/Net64ServerPanel'
import ChatArea from '../areas/ChatArea'
import { domain } from '../../variables'

export default class ConnectionArea extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      server: props.connection.server
    }
    this.updateServers = this.updateServers.bind(this)
  }
  componentWillMount () {
    this.mounted = true
    if (!this.props.isServer) this.updateServers()
  }
  componentWillUnmount () {
    this.mounted = false
  }
  async updateServers () {
    if (!this.mounted) return
    try {
      const server = (await got(resolve(domain, `api/getnet64servers?id=${this.state.server.id}`), {
        json: true,
        useElectronNet: false
      })).body[0]
      if (this.mounted) {
        this.setState({
          server
        })
      }
    } catch (err) {}
    setTimeout(this.updateServers, 10000)
  }
  render () {
    const disconnect = this.props.connection.disconnect
    const server = this.state.server
    const styles = {
      area: {
        overflowY: 'auto',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        flex: '1 1 auto'
      }
    }
    return (
      <div id='scroll' style={styles.area}>
        <Net64ServerPanel server={server} isConnected onDisconnect={disconnect} />
        <ChatArea />
      </div>
    )
  }
}
