import './BrowseView.scss'

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { ConnectionArea } from '../areas/ConnectionArea'
import { ServerArea } from '../areas/ServerArea'
import { setConnectionError } from '../../actions/connection'
import { State } from '../../../models/State.model'
import { Server } from '../../../models/Server.model'

interface BrowseViewProps {
  dispatch: Dispatch<State>
  server: Server
  connectionError: string
}

class View extends React.PureComponent<BrowseViewProps> {
  componentWillMount () {
    this.props.dispatch(setConnectionError(''))
  }
  render () {
    const server = this.props.server
    const connectionError = this.props.connectionError
    return (
      <div className='browse-view scroll'>
        {
          server && !connectionError
            ? <ConnectionArea server={server} />
            : <ServerArea connectionError={connectionError} />
        }
      </div>
    )
  }
}
export const BrowseView = connect((state: State) => ({
  server: state.connection.server,
  connectionError: state.connection.error
}))(View)
