import * as React from 'react'
import { connect } from 'react-redux'

import { ConnectionArea } from '../areas/ConnectionArea'
import { Net64ServerArea } from '../areas/Net64ServerArea'
import { State } from '../../models/State.model'
import { Connection } from '../../Connection'

interface BrowseViewProps {
  connection: Connection
  connectionError: string
}

class View extends React.PureComponent<BrowseViewProps> {
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
          connection && !connectionError
            ? <ConnectionArea connection={connection} />
            : <Net64ServerArea connectionError={connectionError} />
        }
      </div>
    )
  }
}
export const BrowseView = connect((state: State) => ({
  connection: state.connection.connection,
  connectionError: state.connection.error
}))(View)
