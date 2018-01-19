import * as React from 'react'
import { connect } from 'react-redux'

import { ConnectionArea } from '../areas/ConnectionArea'
import { ConnectArea } from '../areas/ConnectArea'
import { Connection } from '../../Connection'
import { State } from '../../models/State.model'

interface ConnectViewProps {
  connection: Connection
  connectionError: string
}

class View extends React.PureComponent<ConnectViewProps> {
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
