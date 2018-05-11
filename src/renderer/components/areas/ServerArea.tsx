import './ServerArea.scss'

import * as React from 'react'

import { resolve } from 'url'

import { ServerPanel } from '../panels/ServerPanel'
import { WarningPanel } from '../panels/WarningPanel'
import { ProgressSpinner } from '../helpers/ProgressSpinner'
import { request } from '../../Request'
import { Server } from '../../../models/Server.model'

interface ServerAreaProps {
  connectionError: string
}

interface ServerAreaState {
  servers: Server[]
  warning: string
  loading: boolean
}

export class ServerArea extends React.PureComponent<ServerAreaProps, ServerAreaState> {
  private mounted: boolean = false

  constructor (props: ServerAreaProps) {
    super(props)
    this.state = {
      servers: [],
      warning: '',
      loading: false
    }
    this.onConnect = this.onConnect.bind(this)
    this.updateServers = this.updateServers.bind(this)
    this.renderServers = this.renderServers.bind(this)
  }
  componentWillMount () {
    this.mounted = true
    this.updateServers()
  }
  componentWillUnmount () {
    this.mounted = false
  }
  componentWillReceiveProps (nextProps: ServerAreaProps) {
    if (!nextProps.connectionError || nextProps.connectionError === this.props.connectionError) return
    this.setState({
      warning: String(nextProps.connectionError),
      loading: false
    })
  }
  onConnect () {
    this.setState({
      loading: true
    })
  }
  async updateServers () {
    if (!this.mounted) return
    try {
      const servers = await request.getNet64Servers()
      if (!this.mounted) return
      if (!servers) {
        this.setState({
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
  renderServers (servers: Server[]) {
    return servers
      .filter(
        server => {
          if (!server.version) return false
          const [ major, minor ] = server.version.split('.')
          return major === process.env.PACKAGE_MAJOR && minor === process.env.PACKAGE_MINOR
        }
      )
      .map(
        server => <ServerPanel key={server.id} server={server} onConnect={this.onConnect} />
      )
  }
  render () {
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
          this.renderServers(servers)
        }
      </div>
    )
  }
}
