import * as React from 'react'

import { SendPasswordArea } from './SendPasswordArea'
import { ServerPanel } from '../panels/ServerPanel'
import { ChatArea } from '../areas/ChatArea'
import { Server } from '../../../models/Server.model'

interface ConnectionAreaProps {
  server: Server
}

interface ConnectionAreaState {
  passwordAccepted: boolean
}

export class ConnectionArea extends React.PureComponent<ConnectionAreaProps, ConnectionAreaState> {
  constructor (props: ConnectionAreaProps) {
    super(props)
    this.state = {
      passwordAccepted: !props.server.passwordRequired
    }
  }

  public render (): JSX.Element {
    const { server } = this.props
    const { passwordAccepted } = this.state
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
        {
          !passwordAccepted &&
          <SendPasswordArea />
        }
      </div>
    )
  }
}
