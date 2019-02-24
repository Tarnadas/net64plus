import './SendPasswordArea.scss'

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { connector } from '../..'
import { SMMButton } from '../buttons/SMMButton'
import { disconnect } from '../../actions/connection'
import { State } from '../../../models/State.model'

export const MIN_LENGTH_PASSWORD = 4
export const MAX_LENGTH_PASSWORD = 30

interface SendPasswordProps {
  dispatch: Dispatch<State>
  throttle: number
}

interface SendPasswordAreaState {
  password: string
  timeout: string
}

class Area extends React.PureComponent<SendPasswordProps, SendPasswordAreaState> {
  private throttleUpdateInterval?: NodeJS.Timer

  constructor (props: SendPasswordProps) {
    super(props)
    this.state = {
      password: '',
      timeout: ''
    }
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDisconnect = this.onDisconnect.bind(this)
  }

  public componentDidMount (): void {
    if (!this.props.throttle || this.throttleUpdateInterval) return
    this.startThrottleUpdate()
  }

  // eslint-disable-next-line
  public componentWillReceiveProps (nextProps: SendPasswordProps): void {
    if (nextProps.throttle == null || this.throttleUpdateInterval) return
    this.startThrottleUpdate()
  }

  private startThrottleUpdate (): void {
    this.throttleUpdateInterval = setInterval(() => {
      const { throttle } = this.props
      const remainingThrottleTime = (throttle - Date.now()) / 1000
      if (remainingThrottleTime <= 0) {
        this.setState({
          timeout: ''
        })
        return
      }
      const timeout = String(Math.trunc(Math.ceil(remainingThrottleTime)))
      this.setState({
        timeout
      })
    }, 100)
  }

  public componentWillUnmount (): void {
    if (!this.throttleUpdateInterval) return
    clearInterval(this.throttleUpdateInterval)
    delete this.throttleUpdateInterval
  }

  private onPasswordChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
    let value = target.value
    if (value.length > MAX_LENGTH_PASSWORD) {
      value = value.substr(0, MAX_LENGTH_PASSWORD)
    }
    this.setState({
      password: value
    })
  }

  private onKeyPress ({ key }: React.KeyboardEvent<any>): void {
    if (key === 'Enter') {
      this.onSubmit()
    }
  }

  private onSubmit (): void {
    const { password } = this.state
    connector.sendPassword(password)
  }

  private onDisconnect (): void {
    this.props.dispatch(disconnect())
    connector.disconnect()
  }

  public render (): JSX.Element {
    const { password, timeout } = this.state
    return (
      <div className='send-password-area-wrapper'>
        <div className='send-password-area'>
          <div className='send-password-area-header'>
            This server is password protected
          </div>
          <div className='send-password-area-input'>
            <label>Please enter server password:</label>
            <input
              type='password'
              value={password}
              onChange={this.onPasswordChange}
              onKeyPress={this.onKeyPress}
            />
            {
              timeout &&
              <label>You can try again in {timeout} seconds</label>
            }
          </div>
          <SMMButton
            text='Submit'
            iconSrc='img/net64.svg'
            onClick={this.onSubmit}
            disabled={!!timeout}
          />
          <SMMButton
            onClick={this.onDisconnect}
            text='Disconnect'
            iconSrc='img/disconnect.svg'
            styles={{
              icon: {
                padding: '4px'
              }
            }}
          />
        </div>
      </div>
    )
  }
}
export const SendPasswordArea = connect()(Area)
