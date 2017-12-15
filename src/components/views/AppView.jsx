import React from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import got from 'got'

import MainView from './MainView'
import SettingsView from './SettingsView'
import EmulatorView from './EmulatorView'
import BrowseView from './BrowseView'
import ConnectView from './ConnectView'
import AboutView from './AboutView'
import TopBarArea from '../areas/TopBarArea'
import NewVersionArea from '../areas/NewVersionArea'

class ElectronView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      newVersionUrl: null,
      patchNotes: ''
    }
    this.updateCheck = this.updateCheck.bind(this)
    this.forcePath = this.forcePath.bind(this)
    this.onClosePatchNotes = this.onClosePatchNotes.bind(this)
  }
  componentWillMount () {
    this.updateCheck()
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.forcePath(nextProps)
    }
  }
  async updateCheck () {
    try {
      const releases = (await got('https://api.github.com/repos/tarnadas/net64plus/releases', {
        json: true,
        useElectronNet: false
      })).body
      const mapVersionToNumber = versionNumber => versionNumber != null ? parseInt(versionNumber) : 0
      let [currentMajor, currentMinor, currentPatch] = process.env.VERSION.split('.')
        .map(mapVersionToNumber)
      if (currentPatch == null) currentPatch = 0
      for (const release of releases) {
        if (release.draft == null || release.draft) continue
        if (release.prerelease == null || release.prerelease) continue
        if (release.assets == null || release.assets.length === 0) continue
        if (!release.tag_name) continue
        let [major, minor, patch] = release.tag_name.split('.')
          .map(mapVersionToNumber)
        if (patch == null) patch = 0
        if (major < currentMajor) continue
        if (minor < currentMinor) continue
        if (patch < currentPatch) continue
        if (major === currentMajor && minor === currentMinor && patch === currentPatch) continue
        let foundUpdate = false
        for (const asset of release.assets) {
          if (asset.name == null || !asset.name.includes('win32-x64')) continue
          const newVersionUrl = asset.browser_download_url
          if (!newVersionUrl) continue
          this.setState({
            newVersionUrl,
            patchNotes: release.body
          })
          foundUpdate = true
          break
        }
        if (foundUpdate) break
      }
    } catch (err) {
      setTimeout(this.updateCheck, 15000)
    }
  }
  forcePath (props) {
    const pathName = props.location.pathname
    if (pathName !== '/' && pathName !== '/about') {
      if (!props.username) {
        props.dispatch(push('/settings'))
      } else if (!props.emulator && pathName !== '/settings') {
        props.dispatch(push('/emulator'))
      }
    }
  }
  onClosePatchNotes () {
    this.setState({
      newVersionUrl: ''
    })
  }
  render () {
    const newVersionUrl = this.state.newVersionUrl
    const patchNotes = this.state.patchNotes
    const styles = {
      global: {
        width: '100%',
        maxWidth: '100%',
        height: '100%',
        maxHeight: '100%',
        overflowY: 'visible',
        display: 'flex',
        flexDirection: 'column'
      },
      logo: {
        fontSize: '44px',
        textAlign: 'center',
        boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.3)',
        zIndex: '1',
        flex: '0 0',
        margin: '5px 0'
      },
      logoFont: {
        display: 'inline-block',
        color: '#000',
        whiteSpace: 'nowrap'
      },
      footer: {
        fontSize: '11px',
        textAlign: 'center',
        background: 'rgba(44, 44, 44, 0.3)',
        fontFamily: 'Consolas, "courier new", serif',
        fontWeight: 'bold',
        color: '#000',
        height: '39px',
        display: 'flex',
        alignItems: 'center',
        flex: '0 0 auto',
        overflow: 'hidden'
      },
      disclaimer: {
        flex: '1 0 0%'
      },
      footerLinks: {
        padding: '0 20px'
      },
      footerLink: {
        padding: '0 6px',
        borderRight: '1px solid black',
        borderLeft: '1px solid black',
        color: '#1d31ff'
      }
    }
    return (
      <div style={styles.global}>
        {
          newVersionUrl &&
          <NewVersionArea versionUrl={newVersionUrl} patchNotes={patchNotes} onClose={this.onClosePatchNotes} />
        }
        <TopBarArea />
        <div style={styles.logo}>
          <div style={styles.logoFont}>
            Net64+ { process.env.VERSION }
          </div>
        </div>
        <Route exact path='/' component={MainView} />
        <Route path='/settings' component={SettingsView} />
        <Route path='/emulator' component={EmulatorView} />
        <Route path='/browse' component={BrowseView} />
        <Route path='/connect' component={ConnectView} />
        <Route path='/about' component={AboutView} />
        <div style={styles.footer}>
          <div style={styles.disclaimer}>
            Net64+ and SMMDB are not affiliated or associated with any other company.<br />
            All logos, trademarks, and trade names used herein are the property of their respective owners.
          </div>
          <div style={styles.footerLinks}>
            <Link to='/about' style={styles.footerLink}>About</Link>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  username: state.getIn(['save', 'data', 'username']),
  emulator: state.get('emulator'),
  route: state.get('router')
}))(ElectronView)
