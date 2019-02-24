import './ConnectView.scss'

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
  public componentDidMount (): void {
    this.props.dispatch(setConnectionError(''))
  }

  public render (): JSX.Element {
    const { server, connectionError } = this.props
    return (
      <div className='connect-view'>
        <h1>Direct Connect</h1>
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
