import * as React from 'react'

import { resolve } from 'url'

import { Connector } from '../../Connector'
import { request } from '../../Request'
import { ServerPanel } from '../panels/ServerPanel'
import { ChatArea } from '../areas/ChatArea'
import { Server } from '../../../models/Server.model'

interface ConnectionAreaProps {
  server: Server
}

export class ConnectionArea extends React.PureComponent<ConnectionAreaProps, {}> {
  render () {
    const server = this.props.server
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
        <ServerPanel server={server} isConnected />
        <ChatArea />
      </div>
    )
  }
}
