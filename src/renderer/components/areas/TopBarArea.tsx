import './TopBarArea.scss'

import * as React from 'react'

import { SMMButton } from '../buttons/SMMButton'
import { NavigationArea } from './NavigationArea'

export const TopBarArea: React.StatelessComponent = () => {
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
      />
      <NavigationArea />
    </div>
  )
}
