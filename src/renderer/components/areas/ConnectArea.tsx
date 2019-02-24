import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { ChildProcess } from 'child_process'

import { connector } from '../..'
import { SMMButton } from '../buttons/SMMButton'
import { WarningPanel } from '../panels/WarningPanel'
import { ProgressSpinner } from '../helpers/ProgressSpinner'
import { State } from '../../../models/State.model'
import { setConnectionError } from '../../actions/connection'

interface ConnectAreaProps {
  dispatch: Dispatch<State>
  username: string
  characterId: number
  serverProcess: ChildProcess | null
  exitCode: number | null
  localPort: number
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
    this.onConnectLocally = this.onConnectLocally.bind(this)
  }

  // eslint-disable-next-line
  public componentWillReceiveProps (nextProps: ConnectAreaProps): void {
    if (
      !nextProps.connectionError ||
      nextProps.connectionError === this.props.connectionError ||
      this.state.warning === nextProps.connectionError
    ) return
    this.setState({
      warning: String(nextProps.connectionError),
      loading: false
    })
  }

  private onIPChange ({ target }: React.ChangeEvent<any>): void {
    this.setState({
      ip: target.value.replace(/[^0-9a-z|^.]/g, '')
    })
  }

  private onPortChange ({ target }: React.ChangeEvent<any>): void {
    try {
      this.setState({
        port: parseInt(String(target.value).replace(/[^0-9]/g, '')) || undefined
      })
    } catch (err) {}
  }

  private onKeyPress ({ key }: React.KeyboardEvent<any>): void {
    if (key === 'Enter') {
      this.onConnect()
    }
  }

  private onConnect (): void {
    this.setState({
      warning: '',
      loading: true
    })
    this.props.dispatch(setConnectionError(''))
    connector.createConnection({
      ip: this.state.ip,
      port: this.state.port,
      username: this.props.username,
      characterId: this.props.characterId
    })
  }

  private onConnectLocally (): void {
    const { localPort, username, characterId } = this.props
    this.props.dispatch(setConnectionError(''))
    connector.createConnection({
      ip: '127.0.0.1',
      port: localPort,
      username,
      characterId
    })
  }

  public render (): JSX.Element {
    const { serverProcess, exitCode } = this.props
    const { warning, loading, ip, port } = this.state
    const styles: Record<string, React.CSSProperties> = {
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
      }
    }
    return (
      <div style={styles.area}>
        {
          loading &&
          <ProgressSpinner />
        }
        {
          warning &&
          <WarningPanel warning={warning} />
        }
        {
          serverProcess && exitCode == null &&
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SMMButton
              text='Connect to local server'
              iconSrc='img/net64.svg'
              onClick={this.onConnectLocally}
              styles={{
                button: {
                  margin: '0 auto'
                }
              }}
            />
            <h3><b>OR</b></h3>
          </div>
        }
        <div style={styles.label}>IP address:</div>
        <input style={styles.input} value={ip} onChange={this.onIPChange} onKeyPress={this.onKeyPress} />
        <div style={styles.label}>Port:</div>
        <input
          style={styles.input}
          value={port}
          onChange={this.onPortChange}
          onKeyPress={this.onKeyPress}
        />
        <SMMButton text='Connect' iconSrc='img/net64.svg' onClick={this.onConnect} />
      </div>
    )
  }
}
export const ConnectArea = connect((state: State) => ({
  username: state.save.appSaveData.username,
  characterId: state.save.appSaveData.character,
  serverProcess: state.server.process,
  exitCode: state.server.exitCode,
  localPort: state.save.appSaveData.serverOptions.port
}))(Area)
