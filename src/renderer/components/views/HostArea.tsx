import './HostView.scss'

import * as React from 'react'
import { Dispatch, connect } from 'react-redux'

import { connector } from '../..'
import { request } from '../../Request'
import { ProgressSpinner } from '../helpers/ProgressSpinner'
import { State } from '../../../models/State.model'
import { setConnectionError } from '../../actions/connection'
import { getCurrentServerVersion } from '../../utils/helper.util'
import { NewVersionArea } from '../areas/NewVersionArea'
import { ServerForm } from '../forms/ServerForm'

interface HostAreaProps {
  dispatch: Dispatch<State>
}

interface HostAreaState {
  loading: boolean
  version?: string
  newVersionUrl?: string
  patchNotes?: string
  progress?: number
}

class Area extends React.PureComponent<HostAreaProps, HostAreaState> {
  constructor (props: HostAreaProps) {
    super(props)
    this.state = {
      loading: true,
      version: getCurrentServerVersion()
    }
    this.serverUpdateCheck = this.serverUpdateCheck.bind(this)
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
    this.setState({
      loading: true
    })
    this.props.dispatch(setConnectionError(''))
    // TODO create server here
  }

  public render (): JSX.Element {
    const { loading, version, newVersionUrl, patchNotes, progress } = this.state
    return (
      <div className='host-area'>
        {
          loading &&
          <ProgressSpinner />
        }
        {
          version &&
          <ServerForm
            onSubmit={this.onStartServer}
          />
        }
        {
          newVersionUrl && patchNotes &&
          <NewVersionArea
            versionUrl={newVersionUrl}
            patchNotes={patchNotes}
            canClose={false}
            progress={progress}
          />
        }
      </div>
    )
  }
}
export const HostArea = connect()(Area)
