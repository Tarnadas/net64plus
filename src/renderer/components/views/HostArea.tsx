import './HostView.scss'

import * as React from 'react'
import { Dispatch, connect } from 'react-redux'

import { connector } from '../..'
import { request } from '../../Request'
import { ProgressSpinner } from '../helpers/ProgressSpinner'
import { SMMButton } from '../buttons/SMMButton'
import { State } from '../../../models/State.model'
import { setConnectionError } from '../../actions/connection'
import { getCurrentServerVersion } from '../../utils/helper.util'
import { NewVersionArea } from '../areas/NewVersionArea'

interface HostAreaProps {
  dispatch: Dispatch<State>
}

interface HostAreaState {
  loading: boolean
  port: number
  version?: string
  newVersionUrl?: string
  patchNotes?: string
}

class Area extends React.PureComponent<HostAreaProps, HostAreaState> {
  constructor (props: HostAreaProps) {
    super(props)
    this.state = {
      loading: true,
      port: 3678,
      version: getCurrentServerVersion()
    }
    this.serverUpdateCheck = this.serverUpdateCheck.bind(this)
    this.onStartServer = this.onStartServer.bind(this)
    this.onPortChange = this.onPortChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  public async componentDidMount (): Promise<void> {
    await this.serverUpdateCheck()
    this.setState({
      loading: false
    })
  }

  private async serverUpdateCheck () {
    try {
      const { foundUpdate, newVersionUrl, patchNotes } = await request.serverUpdateCheck()
      if (!foundUpdate) return
      this.setState({
        newVersionUrl,
        patchNotes
      })
    } catch (err) {
      console.error(err)
      setTimeout(this.serverUpdateCheck, 15000)
    }
  }

  private onStartServer (): void {
    const { port } = this.state
    this.setState({
      loading: true
    })
    this.props.dispatch(setConnectionError(''))
    // TODO create server here
  }

  private onPortChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
    try {
      this.setState({
        port: parseInt(String(target.value).replace(/[^0-9]/g, ''))
      })
    } catch (err) {}
  }

  private onKeyPress ({ key }: React.KeyboardEvent<any>): void {
    if (key === 'Enter') {
      this.onStartServer()
    }
  }

  public render (): JSX.Element {
    const { loading, port, version, newVersionUrl, patchNotes } = this.state
    return (
      <div className='host-area'>
        {
          loading &&
          <ProgressSpinner />
        }
        {
          version &&
          <div className='host-area-form'>
            <div>Port:</div>
            <input
              value={port}
              onChange={this.onPortChange}
              onKeyPress={this.onKeyPress}
            />
            <SMMButton
              text='Create Server'
              iconSrc='img/net64.svg'
              onClick={this.onStartServer}
            />
          </div>
        }
        {
          newVersionUrl && patchNotes &&
          <NewVersionArea
            versionUrl={newVersionUrl}
            patchNotes={patchNotes}
            canClose={false}
            progress={0}
          />
        }
      </div>
    )
  }
}
export const HostArea = connect()(Area)
