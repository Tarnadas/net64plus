import React from 'react'

import { resolve } from 'url'

import Net64ServerPanel from '../panels/Net64ServerPanel'
import ChatArea from '../areas/ChatArea'
import { request } from '../../Request'

export default class ConnectionArea extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      server: props.connection.server
    }
    this.updateServer = this.updateServer.bind(this)
  }
  componentWillMount () {
    this.mounted = true
    if (!this.state.server.isDirect) this.updateServer()
  }
  componentWillUnmount () {
    this.mounted = false
  }
  async updateServer () {
    if (!this.mounted) return
    try {
      const server = await request.updateNet64Server(this.state.server.id)
      if (!server || !this.mounted) return
      this.setState({
        server
      })
    } catch (err) {}
    setTimeout(this.updateServer, 10000)
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
        {
          server &&
          <Net64ServerPanel server={server} isConnected onDisconnect={disconnect} />
        }
        <ChatArea />
      </div>
    )
  }
}
