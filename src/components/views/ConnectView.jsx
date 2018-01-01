import React from 'react'
import { connect } from 'react-redux'

import ConnectionArea from '../areas/ConnectionArea'
import ConnectArea from '../areas/ConnectArea'

class ConnectView extends React.PureComponent {
  render () {
    const connection = this.props.connection
    const connectionError = this.props.connectionError
    const styles = {
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
export default connect(state => ({
  connection: state.getIn(['connection', 'connection']),
  connectionError: state.getIn(['connection', 'error'])
}))(ConnectView)
