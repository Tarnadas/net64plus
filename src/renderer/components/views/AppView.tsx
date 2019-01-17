import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { push, RouterState } from 'react-router-redux'

import { MainView } from './MainView'
import { SettingsView } from './SettingsView'
import { EmulatorView } from './EmulatorView'
import { BrowseView } from './BrowseView'
import { ConnectView } from './ConnectView'
import { HostView } from './HostView'
import { AboutView } from './AboutView'
import { FaqView } from './FaqView'
import { TopBarArea } from '../areas/TopBarArea'
import { NewVersionArea } from '../areas/NewVersionArea'
import { request } from '../../Request'
import { State } from '../../../models/State.model'

interface AppViewProps {
  dispatch: Dispatch<State>
  version: string
  location: Location
  username: string
  route: Readonly<RouterState>
  isConnectedToEmulator: boolean
}

interface AppViewState {
  requestedPath: string
  newVersionUrl?: string
  patchNotes?: string
}

class View extends React.PureComponent<AppViewProps, AppViewState> {
  constructor (public props: AppViewProps) {
    super(props)
    this.state = {
      requestedPath: ''
    }
    this.updateCheck = this.updateCheck.bind(this)
    this.forcePath = this.forcePath.bind(this)
    this.onClosePatchNotes = this.onClosePatchNotes.bind(this)
  }

  public componentWillMount () {
    this.updateCheck()
    if (this.props.version !== process.env.VERSION) {
      this.props.dispatch(push('/faq'))
    }
  }

  public componentWillReceiveProps (nextProps: AppViewProps) {
    if (nextProps.location.pathname === this.props.location.pathname && nextProps.isConnectedToEmulator === this.props.isConnectedToEmulator) return
    this.forcePath(nextProps)
  }

  private async updateCheck () {
    try {
      const { foundUpdate, newVersionUrl, patchNotes } = await request.updateCheck()
      if (!foundUpdate) return
      this.setState({
        newVersionUrl,
        patchNotes
      })
    } catch (err) {
      console.error(err)
      setTimeout(this.updateCheck, 15000)
    }
  }

  private forcePath (props: AppViewProps) {
    const pathName = props.location.pathname
    if (pathName !== '/' && pathName !== '/about' && pathName !== '/faq') {
      if (!props.username) {
        props.dispatch(push('/settings'))
      } else if (!props.isConnectedToEmulator && pathName !== '/settings') {
        props.dispatch(push('/emulator'))
      }
    }
  }

  private onClosePatchNotes () {
    this.setState({
      newVersionUrl: ''
    })
  }

  public render (): JSX.Element {
    const newVersionUrl = this.state.newVersionUrl
    const patchNotes = this.state.patchNotes
    const styles: React.CSSProperties = {
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
          newVersionUrl && patchNotes &&
          <NewVersionArea
            versionUrl={newVersionUrl}
            patchNotes={patchNotes}
            onClose={this.onClosePatchNotes}
          />
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
        <Route path='/host' component={HostView} />
        <Route path='/about' component={AboutView} />
        <Route path='/faq' component={FaqView} />
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
export const AppView = connect((state: State) => ({
  username: state.save.appSaveData.username,
  version: state.save.appSaveData.version,
  route: state.router,
  isConnectedToEmulator: state.emulator.isConnectedToEmulator
}))(View)
