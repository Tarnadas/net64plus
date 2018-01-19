import * as React from 'react'

import { resolve } from 'url'

import { Net64ServerPanel } from '../panels/Net64ServerPanel'
import { ChatArea } from '../areas/ChatArea'
import { Connection } from '../../Connection'
import { request } from '../../Request'
import { Server } from '../../models/Server.model'

interface ConnectionAreaProps {
  connection: Connection
}

interface ConnectionAreaState {
  server: Server
}

export class ConnectionArea extends React.PureComponent<ConnectionAreaProps, ConnectionAreaState> {
  private mounted: boolean = false

  constructor (public props: ConnectionAreaProps) {
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
    if (!this.mounted || this.state.server.id == null) return
    try {
      const server = await request.updateNet64Server(this.state.server.id)
      if (!server || !this.mounted) return
      this.setState({
        server: server as Server
      })
    } catch (err) {}
    setTimeout(this.updateServer, 10000)
  }
  render () {
    const disconnect = this.props.connection.disconnect
    const server = this.state.server
    const styles: React.CSSProperties = {
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
      <div className='scroll' style={styles.area}>
        {
          server &&
          <Net64ServerPanel server={server} isConnected onDisconnect={disconnect} />
        }
        <ChatArea />
      </div>
    )
  }
}
