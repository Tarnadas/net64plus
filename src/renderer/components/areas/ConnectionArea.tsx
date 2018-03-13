import * as React from 'react'

import { resolve } from 'url'

import { Connector } from '../../Connector'
import { request } from '../../Request'
import { Net64ServerPanel } from '../panels/Net64ServerPanel'
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
        <Net64ServerPanel server={server} isConnected />
        <ChatArea />
      </div>
    )
  }
}
