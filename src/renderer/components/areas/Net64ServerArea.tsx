import * as React from 'react'

import { resolve } from 'url'

import { Net64ServerPanel } from '../panels/Net64ServerPanel'
import { WarningPanel } from '../panels/WarningPanel'
import { request } from '../../Request'
import { Server } from '../../../models/Server.model'

interface Net64ServerAreaProps {
  connectionError: string
}

interface Net64ServerAreaState {
  servers: Server[]
  warning: string
  loading: boolean
}

export class Net64ServerArea extends React.PureComponent<Net64ServerAreaProps, Net64ServerAreaState> {
  private mounted: boolean = false

  constructor (props: Net64ServerAreaProps) {
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
  componentWillReceiveProps (nextProps: Net64ServerAreaProps) {
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
      if (!servers || !this.mounted) return
      if (this.mounted) {
        this.setState({
          servers
        })
      }
    } catch (err) {}
    setTimeout(this.updateServers, 10000)
  }
  renderServers (servers: Server[]) {
    return servers.map(
      server => <Net64ServerPanel key={server.id} server={server} onConnect={this.onConnect} />
    )
  }
  render () {
    const servers = this.state.servers
    const loading = this.state.loading
    const warning = this.state.warning
    const styles: React.CSSProperties = {
      list: {
        overflowY: 'auto',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      },
      loading: {
        display: 'flex',
        position: 'fixed',
        zIndex: '100',
        backgroundColor: 'rgba(0,0,0,0.6)',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
    return (
      <div className='scroll' style={styles.list}>
        {
          loading &&
          <div style={styles.loading}>
            <img src='img/load.gif' />
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
