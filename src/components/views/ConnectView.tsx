import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { ConnectionArea } from '../areas/ConnectionArea'
import { ConnectArea } from '../areas/ConnectArea'
import { Connection } from '../../Connection'
import { setConnectionError } from '../../actions/connection'
import { State } from '../../models/State.model'

interface ConnectViewProps {
  dispatch: Dispatch<State>
  connection: Connection
  connectionError: string
}

class View extends React.PureComponent<ConnectViewProps> {
  componentWillMount () {
    this.props.dispatch(setConnectionError(''))
  }
  render () {
    const connection = this.props.connection
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
          connection
            ? <ConnectionArea connection={connection} />
            : <ConnectArea connectionError={connectionError} />
        }
      </div>
    )
  }
}
export const ConnectView = connect((state: State) => ({
  connection: state.connection.connection,
  connectionError: state.connection.error
}))(View)
