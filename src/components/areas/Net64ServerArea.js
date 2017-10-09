import React from 'react'
import got from 'got'

import { resolve } from 'url'

import Net64ServerPanel from '../panels/Net64ServerPanel'
import {
  domain
} from '../../variables'

export default class Net64ServerArea extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      servers: []
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
  async updateServers () {
    if (!this.mounted) return
    try {
      const servers = (await got(resolve(domain, `api/getnet64servers`), {
        json: true,
        useElectronNet: false
      })).body
      if (this.mounted) {
        this.setState({
          servers
        })
      }
    } catch (err) {}
    setTimeout(this.updateServers, 10000)
  }
  renderServers (servers) {
    return Array.from((function * () {
      for (const server of servers) {
        yield (
          <Net64ServerPanel key={server.id} server={server} />
        )
      }
    })())
  }
  render () {
    const servers = this.state.servers
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
          this.renderServers(servers)
        }
      </div>
    )
  }
}
