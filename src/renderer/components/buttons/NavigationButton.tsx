import './NavigationButton.scss'

import * as React from 'react'
import { Link } from 'react-router-dom'

interface NavigationButtonProps {
  text: string
  iconSrc: string
  link: string
  isActive: boolean
  isEnabled: boolean
}

export const NavigationButton = (props: NavigationButtonProps) =>
  <Link
    className={`navigation-button${props.isActive ? ' navigation-button-active' : ''}${!props.isEnabled ? ' navigation-button-disabled' : ''}`}
    to={props.link}
  >
    <div className='navigation-button-icon'>
      <img src={props.iconSrc} />
    </div>
    <div className='navigation-button-label'>
      <div>{ props.text }</div>
    </div>
  </Link>
