import './HostArea.scss'

import * as React from 'react'
import { Dispatch, connect } from 'react-redux'
import { spawn, ChildProcess } from 'child_process'

import { request } from '../../Request'
import { ProgressSpinner } from '../helpers/ProgressSpinner'
import { State } from '../../../models/State.model'
import { setConnectionError } from '../../actions/connection'
import { getCurrentServerVersion, saveAndExtractServer } from '../../utils/helper.util'
import { NewVersionDialog } from '../dialogs/NewVersionDialog'
import { HostForm } from '../forms/HostForm'
import { HostHeader } from '../headers/HostHeader'
import { ServerHostArea } from './ServerHostArea'
import { setServerProcess } from '../../actions/server'

interface HostAreaProps {
  dispatch: Dispatch<State>
  serverProcess: ChildProcess | null
  exitCode: number | null
}

interface HostAreaState {
  loading: boolean
  serverExecutable?: string
  version?: string
  newVersionUrl?: string
  patchNotes?: string
}

class Area extends React.PureComponent<HostAreaProps, HostAreaState> {
  constructor (props: HostAreaProps) {
    super(props)
    this.state = {
      loading: true,
      version: getCurrentServerVersion()
    }
    this.serverUpdateCheck = this.serverUpdateCheck.bind(this)
    this.serverUpdateFinish = this.serverUpdateFinish.bind(this)
    this.onStartServer = this.onStartServer.bind(this)
  }

  public async componentDidMount (): Promise<void> {
    await this.serverUpdateCheck()
    this.setState({
      loading: false
    })
  }

  private async serverUpdateCheck () {
    try {
      const { foundUpdate, newVersionUrl, patchNotes, version } = await request.serverUpdateCheck()
      if (!foundUpdate) {
        if (!this.state.version) throw new Error('HostArea: version must be defined')
        const serverExecutable = await saveAndExtractServer(this.state.version)
        this.setState({
          serverExecutable
        })
        return
      }
      this.setState({
        newVersionUrl,
        patchNotes,
        version
      })
    } catch (err) {
      console.error(err)
      setTimeout(this.serverUpdateCheck, 15000)
    }
  }

  private async serverUpdateFinish (buffer: ArrayBuffer): Promise<void> {
    const { version } = this.state
    if (!version) throw new Error('HostArea: version must be defined')
    const serverExecutable = await saveAndExtractServer(version, buffer)
    this.setState({
      serverExecutable,
      newVersionUrl: undefined,
      patchNotes: undefined
    })
  }

  private onStartServer (): void {
    const { serverExecutable } = this.state
    if (!serverExecutable) {
      throw new Error('HostArea: server executable not found.')
    }
    this.props.dispatch(setConnectionError(''))
    const serverProcess = spawn(serverExecutable)
    this.props.dispatch(setServerProcess(serverProcess))
  }

  public render (): JSX.Element {
    const { loading, version, newVersionUrl, patchNotes } = this.state
    const { serverProcess, exitCode } = this.props
    return (
      <div className='host-area'>
        {
          loading &&
          <ProgressSpinner />
        }
        {
          version &&
          <HostHeader
            version={version}
          />
        }
        {
          serverProcess || exitCode != null
          ? <ServerHostArea
            exitCode={exitCode}
            onRestart={this.onStartServer}
          />
          : <HostForm
            onSubmit={this.onStartServer}
          />
        }
        {
          newVersionUrl && patchNotes &&
          <NewVersionDialog
            versionUrl={newVersionUrl}
            patchNotes={patchNotes}
            autoUpdate={true}
            onFinish={this.serverUpdateFinish}
          />
        }
      </div>
    )
  }
}
export const HostArea = connect((state: State) => ({
  serverProcess: state.server.process,
  exitCode: state.server.exitCode
}))(Area)
