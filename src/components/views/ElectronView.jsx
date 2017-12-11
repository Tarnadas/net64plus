import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { push } from 'react-router-redux'

import MainView from './MainView'
import SettingsView from './SettingsView'
import EmulatorView from './EmulatorView'
import BrowseView from './BrowseView'
import ConnectView from './ConnectView'
import TopBarArea from '../areas/TopBarArea'

class ElectronView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.forcePath = this.forcePath.bind(this)
  }
  componentWillMount () {
    this.props.dispatch(push('/browse'))
    this.forcePath(this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.forcePath(nextProps)
    }
  }
  forcePath (props) {
    if (props.location.pathname !== '/') {
      if (!props.username) {
        props.dispatch(push('/settings'))
      } else if (!props.emulator && props.location.pathname !== '/settings') {
        props.dispatch(push('/emulator'))
      }
    }
  }
  render () {
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
        flexShrink: '0'
      },
      disclaimer: {
        flex: '1 0 0%'
      }
    }
    return (
      <div style={styles.global}>
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
        <div style={styles.footer}>
          <div style={styles.disclaimer}>
            Net64+ and SMMDB are not affiliated or associated with any other company.<br />
            All logos, trademarks, and trade names used herein are the property of their respective owners.
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
