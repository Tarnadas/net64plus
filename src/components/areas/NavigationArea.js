import React from 'react'

import NavigationButton from '../buttons/NavigationButton'

export default class NavigationArea extends React.PureComponent {
  render () {
    const display = this.props.display
    const styles = {
      navigation: {
        display: 'flex',
        width: '240px',
        maxHeight: display ? '500px' : '0',
        position: 'absolute',
        top: '40px',
        left: '10px',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'max-height 1s linear',
        willChange: 'max-height'
      }
    }
    return (
      <div style={styles.navigation} id='scroll'
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <NavigationButton onClick={this.props.onClick} link='/' text='Change Emulator' iconSrc='img/n64.svg' iconColor='dark' />
        <NavigationButton onClick={this.props.onClick} link='/browse' text='Browse Servers' iconSrc='img/browse.svg' iconColor='dark' />
        <div style={{height: '20px', minHeight: '20px'}} />
        <div style={{height: '70px', minHeight: '70px'}} />
      </div>
    )
  }
}
