import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { ConnectionArea } from '../areas/ConnectionArea'
import { ConnectArea } from '../areas/ConnectArea'
import { setConnectionError } from '../../actions/connection'
import { State } from '../../../models/State.model'
import { Server } from '../../../models/Server.model'

interface ConnectViewProps {
  dispatch: Dispatch<State>
  server: Server
  connectionError: string
}

class View extends React.PureComponent<ConnectViewProps> {
  componentWillMount () {
    this.props.dispatch(setConnectionError(''))
  }
  render () {
    const server = this.props.server
    const connectionError = this.props.connectionError
    const styles: React.CSSProperties = {
      main: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#24997e',
        flex: '1 1 auto'
      }
    }
    return (
      <div style={styles.main}>
        {
          server
            ? <ConnectionArea server={server} />
            : <ConnectArea connectionError={connectionError} />
        }
      </div>
    )
  }
}
export const ConnectView = connect((state: State) => ({
  server: state.connection.server,
  connectionError: state.connection.error
}))(View)
