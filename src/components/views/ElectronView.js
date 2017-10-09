import React from 'react'
import {
  connect
} from 'react-redux'
import {
  Route
} from 'react-router-dom'

import MainView from './MainView'
import BrowseView from './BrowseView'
import TopBarArea from '../areas/TopBarArea'

class ElectronView extends React.PureComponent {
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
            Net64+ 1.0
          </div>
        </div>
        <Route exact path='/' component={MainView} />
        <Route path='/browse' component={BrowseView} />
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
export default connect()(ElectronView)
