import React from 'react'

import { resolve } from 'url'

import Net64ServerPanel from '../panels/Net64ServerPanel'
import WarningPanel from '../panels/WarningPanel'
import { request } from '../../Request'

export default class Net64ServerArea extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      servers: [],
      warning: ''
    }
    this.updateServers = this.updateServers.bind(this)
    this.renderServers = this.renderServers.bind(this)
  }
  componentWillMount () {
    this.mounted = true
    if (!this.props.isServer) this.updateServers()
  }
  componentWillUnmount () {
    this.mounted = false
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.connectionError || nextProps.connectionError === this.props.connectionError) return
    this.setState({
      warning: String(nextProps.connectionError),
      loading: false
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
  renderServers (servers) {
    return servers.map(
      server => <Net64ServerPanel key={server.id} server={server} />
    )
  }
  render () {
    const servers = this.state.servers
    const warning = this.state.warning
    const styles = {
      list: {
        overflowY: 'auto',
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }
    }
    return (
      <div id='scroll' style={styles.list}>
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
