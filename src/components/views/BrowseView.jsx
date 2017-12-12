import React from 'react'
import { connect } from 'react-redux'

import ConnectionArea from '../areas/ConnectionArea'
import Net64ServerArea from '../areas/Net64ServerArea'

class BrowseView extends React.PureComponent {
  render () {
    const connection = this.props.connection
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
            : <Net64ServerArea />
        }
      </div>
    )
  }
}
export default connect(state => ({
  connection: state.get('connection')
}))(BrowseView)
