import './TopBarArea.scss'

import * as React from 'react'
import { connect } from 'react-redux'
import { ChildProcess } from 'child_process'

import { SMMButton, ColorScheme } from '../buttons/SMMButton'
import { NavigationArea } from './NavigationArea'
import { State } from '../../../models/State.model'

interface TopBarAreaProps {
  serverProcess: ChildProcess | null
  exitCode: number | null
}

export class Area extends React.PureComponent<TopBarAreaProps> {
  public render (): JSX.Element {
    const { serverProcess, exitCode } = this.props
    let colorScheme: ColorScheme = 'yellow'
    if (serverProcess) {
      colorScheme = 'green'
    }
    if (exitCode != null) {
      colorScheme = 'red'
    }
    return (
      <div className='top-bar-area'>
        <SMMButton
          className='top-bar-area-settings'
          iconSrc='img/settings.svg'
          text=''
          link='/settings'
        />
        <SMMButton
          className='top-bar-area-host'
          iconSrc='img/host.svg'
          text=''
          link='/host'
          colorScheme={colorScheme}
        />
        <NavigationArea />
      </div>
    )
  }
}
export const TopBarArea = connect((state: State) => ({
  serverProcess: state.server.process,
  exitCode: state.server.exitCode
}))(Area)
