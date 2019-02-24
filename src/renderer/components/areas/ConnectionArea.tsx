import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { SendPasswordArea } from './SendPasswordArea'
import { ServerPanel } from '../panels/ServerPanel'
import { ChatArea } from '../areas/ChatArea'
import { State } from '../../../models/State.model'
import { Server } from '../../../models/Server.model'

interface ConnectionAreaProps {
  dispatch: Dispatch<State>
  server: Server
  authenticated: boolean
  authenticationThrottle: number
}

class Area extends React.PureComponent<ConnectionAreaProps, {}> {
  public render (): JSX.Element {
    const { server, authenticated, authenticationThrottle } = this.props
    const styles: Record<string, React.CSSProperties> = {
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
      <div style={styles.area}>
        <ServerPanel server={server} isConnected />
        <ChatArea />
        {
          !authenticated &&
          <SendPasswordArea
            throttle={authenticationThrottle}
          />
        }
      </div>
    )
  }
}
export const ConnectionArea = connect((state: State) => ({
  authenticated: state.connection.authenticated,
  authenticationThrottle: state.connection.authenticationThrottle
}))(Area)
