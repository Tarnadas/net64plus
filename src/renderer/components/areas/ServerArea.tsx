import './ServerArea.scss'

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ChildProcess } from 'child_process'

import { connector } from '../..'
import { SMMButton } from '../buttons/SMMButton'
import { ServerPanel } from '../panels/ServerPanel'
import { WarningPanel } from '../panels/WarningPanel'
import { ProgressSpinner } from '../helpers/ProgressSpinner'
import { setConnectionError } from '../../actions/connection'
import { request } from '../../Request'
import { Server } from '../../../models/Server.model'
import { State } from '../../../models/State.model'

interface ServerAreaProps {
  dispatch: Dispatch<State>
  connectionError: string
  serverProcess: ChildProcess | null
  exitCode: number | null
  port: number
  username: string
  characterId: number
}

interface ServerAreaState {
  servers: Server[]
  warning: string
  loading: boolean
}

class Area extends React.PureComponent<ServerAreaProps, ServerAreaState> {
  private mounted = false

  constructor (props: ServerAreaProps) {
    super(props)
    this.state = {
      servers: [],
      warning: '',
      loading: false
    }
    this.onConnect = this.onConnect.bind(this)
    this.onConnectLocally = this.onConnectLocally.bind(this)
    this.updateServers = this.updateServers.bind(this)
    this.renderServers = this.renderServers.bind(this)
  }

  public componentDidMount (): void {
    this.mounted = true
    this.updateServers()
  }

  public componentWillUnmount (): void {
    this.mounted = false
  }

  // eslint-disable-next-line
  public componentWillReceiveProps (nextProps: ServerAreaProps): void {
    if (!nextProps.connectionError || nextProps.connectionError === this.props.connectionError) return
    this.setState({
      warning: String(nextProps.connectionError),
      loading: false
    })
  }

  private onConnect (): void {
    this.setState({
      loading: true
    })
  }

  private onConnectLocally (): void {
    const { port, username, characterId } = this.props
    this.props.dispatch(setConnectionError(''))
    connector.createConnection({
      ip: '127.0.0.1',
      port,
      username,
      characterId
    })
  }

  private async updateServers (): Promise<void> {
    if (!this.mounted) return
    try {
      const servers = await request.getNet64Servers()
      if (!this.mounted) return
      if (!servers) {
        this.setState({
          // eslint-disable-next-line max-len
          warning: 'Could not fetch server list. You or the website might be offline. This doesn\'t mean, that Nintendo sent us a DMCA. You can still search for servers on our Discord server and direct connect to them.'
        })
        return
      }
      this.setState({
        servers
      })
    } catch (err) {
    } finally {
      if (this.mounted) {
        setTimeout(this.updateServers, 10000)
        this.setState({
          loading: false
        })
      }
    }
  }

  private renderServers (servers: Server[]): JSX.Element[] {
    return servers
      .filter(this.filterIncompatibleServers)
      .map(
        server => <ServerPanel key={server.id} server={server} onConnect={this.onConnect} />
      )
  }

  private filterIncompatibleServers (server: Server): boolean {
    if (!server.version) return false
    const [major, minor] = server.version.split('.')
    return Number(major) >= Number(process.env.COMPAT_MIN_MAJOR) &&
      Number(minor) >= Number(process.env.COMPAT_MIN_MINOR)
  }

  public render (): JSX.Element {
    const { serverProcess, exitCode } = this.props
    const { servers, loading, warning } = this.state
    const initialLoading = servers.length === 0 && !warning
    return (
      <div className='server-area'>
        {
          loading &&
          <ProgressSpinner />
        }
        {
          initialLoading &&
          <div className='server-area-fetch'>
            <div>Fetching server list...</div>
            <ProgressSpinner inline />
          </div>
        }
        {
          warning &&
          <WarningPanel warning={warning} />
        }
        {
          !initialLoading && serverProcess && exitCode == null &&
          <SMMButton
            text='Connect to local server'
            iconSrc='img/net64.svg'
            onClick={this.onConnectLocally}
            styles={{
              button: {
                alignSelf: 'center'
              }
            }}
          />
        }
        {
          this.renderServers(servers)
        }
      </div>
    )
  }
}
export const ServerArea = connect((state: State) => ({
  serverProcess: state.server.process,
  exitCode: state.server.exitCode,
  port: state.save.appSaveData.serverOptions.port,
  username: state.save.appSaveData.username,
  characterId: state.save.appSaveData.character
}))(Area)
