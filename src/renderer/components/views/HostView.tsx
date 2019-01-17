import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { ConnectionArea } from '../areas/ConnectionArea'
import { State } from '../../../models/State.model'
import { Server } from '../../../models/Server.model'
import { HostArea } from './HostArea'

interface ConnectViewProps {
  dispatch: Dispatch<State>
  server: Server
  connectionError: string
}

class View extends React.PureComponent<ConnectViewProps> {
  public render (): JSX.Element {
    const server = this.props.server
    return (
      <div className='host-view'>
        {
          server
            ? <ConnectionArea server={server} />
            : <HostArea />
        }
      </div>
    )
  }
}
export const HostView = connect((state: State) => ({
  server: state.connection.server
}))(View)
