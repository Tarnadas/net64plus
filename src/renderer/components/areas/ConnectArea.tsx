import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { connector } from '../..'
import { SMMButton } from '../buttons/SMMButton'
import { WarningPanel } from '../panels/WarningPanel'
import { State } from '../../../models/State.model'

interface ConnectAreaProps {
  dispatch: Dispatch<State>
  username: string
  characterId: number
  connectionError: string
}

interface ConnectAreaState {
  ip: string
  port: number | undefined
  warning: string
  loading: boolean
}

class Area extends React.PureComponent<ConnectAreaProps, ConnectAreaState> {
  constructor (public props: ConnectAreaProps) {
    super(props)
    this.state = {
      ip: '',
      port: undefined,
      warning: '',
      loading: false
    }
    this.onIPChange = this.onIPChange.bind(this)
    this.onPortChange = this.onPortChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onConnect = this.onConnect.bind(this)
  }
  componentWillMount () {
    if (!this.props.connectionError) return
    this.setState({
      warning: String(this.props.connectionError)
    })
  }
  componentWillReceiveProps (nextProps: ConnectAreaProps) {
    if (!nextProps.connectionError || nextProps.connectionError === this.props.connectionError) return
    this.setState({
      warning: String(nextProps.connectionError),
      loading: false
    })
  }
  onIPChange (e: React.ChangeEvent<any>) {
    this.setState({
      ip: e.target.value.replace(/[^0-9a-z|^.]/g, '')
    })
  }
  onPortChange (e: React.ChangeEvent<any>) {
    try {
      this.setState({
        port: parseInt(e.target.value.replace(/[^0-9]/g, ''))
      })
    } catch (err) {}
  }
  onKeyPress (e: React.KeyboardEvent<any>) {
    if (e.key === 'Enter') {
      this.onConnect()
    }
  }
  onConnect () {
    this.setState({
      loading: true
    })
    connector.createConnection({
      ip: this.state.ip,
      port: this.state.port,
      username: this.props.username,
      characterId: this.props.characterId
    })
  }
  render () {
    const warning = this.state.warning
    const loading = this.state.loading
    const styles: React.CSSProperties = {
      area: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flex: '1 1 auto',
        padding: '40px',
        backgroundColor: '#24997e',
        fontSize: '18px',
        alignItems: 'center',
        color: '#000'
      },
      label: {
        width: '40%'
      },
      input: {
        width: '60%',
        fontSize: '16px'
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
      <div style={styles.area}>
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
        <div style={styles.label}>IP address:</div>
        <input style={styles.input} value={this.state.ip} onChange={this.onIPChange} onKeyPress={this.onKeyPress} />
        <div style={styles.label}>Port:</div>
        <input style={styles.input} value={this.state.port} onChange={this.onPortChange} onKeyPress={this.onKeyPress} />
        <SMMButton text='Connect' iconSrc='img/net64.svg' onClick={this.onConnect} />
      </div>
    )
  }
}
export const ConnectArea = connect((state: State) => ({
  username: state.save.appSaveData.username,
  characterId: state.save.appSaveData.character
}))(Area)
