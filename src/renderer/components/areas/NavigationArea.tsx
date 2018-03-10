import * as React from 'react'

import { NavigationButton } from '../buttons/NavigationButton'

interface NavigationAreaProps {
  display: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

export class NavigationArea extends React.PureComponent<NavigationAreaProps> {
  render () {
    const display = this.props.display
    const styles: React.CSSProperties = {
      navigation: {
        display: 'flex',
        width: '200px',
        maxHeight: display ? '240px' : '0',
        position: 'absolute',
        top: '40px',
        left: '10px',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'max-height 0.4s linear',
        willChange: 'max-height'
      }
    }
    return (
      <div
        style={styles.navigation}
        className='scroll'
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <NavigationButton
          onClick={this.props.onClick}
          link='/'
          text='Home'
          iconSrc='img/home.svg'
        />
        <NavigationButton
          onClick={this.props.onClick}
          link='/settings'
          text='Settings'
          iconSrc='img/settings.svg'
        />
        <NavigationButton
          onClick={this.props.onClick}
          link='/emulator'
          text='Change Emulator'
          iconSrc='img/n64.svg'
        />
        <NavigationButton
          onClick={this.props.onClick}
          link='/browse'
          text='Browse Servers'
          iconSrc='img/browse.svg'
        />
        <NavigationButton
          onClick={this.props.onClick}
          link='/connect'
          text='Direct Connect'
          iconSrc='img/connect.svg'
        />
        <NavigationButton
          onClick={this.props.onClick}
          link='/faq'
          text='FAQ'
          iconSrc='img/help.png'
        />
        <div style={{height: '20px', minHeight: '20px'}} />
        <div style={{height: '70px', minHeight: '70px'}} />
      </div>
    )
  }
}
