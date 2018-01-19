import * as React from 'react'
import { connect } from 'react-redux'

import { SMMButton } from '../buttons/SMMButton'
import { NavigationArea } from './NavigationArea'
// import ApiKeyArea from '../areas/ApiKeyArea'
import { State } from '../../models/State.model'

interface TopBarAreaProps {
  apiKey: string
}

interface TopBarAreaState {
  buttonHover: boolean
  navHover: boolean
  // showApiKey: boolean
  // [x: string]: boolean
}

class Area extends React.PureComponent<TopBarAreaProps, TopBarAreaState> {
  private onMouseEnterButton: () => void

  private onMouseLeaveButton: () => void

  private onMouseEnterNav: () => void

  private onMouseLeaveNav: () => void

  constructor (public props: TopBarAreaProps) {
    super(props)
    this.state = {
      buttonHover: false,
      navHover: false
      // showApiKey: false
    }
    this.onClick = this.onClick.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseEnterButton = this.onMouseEnter.bind(this, 'buttonHover')
    this.onMouseLeaveButton = this.onMouseLeave.bind(this, 'buttonHover')
    this.onMouseEnterNav = this.onMouseEnter.bind(this, 'navHover')
    this.onMouseLeaveNav = this.onMouseLeave.bind(this, 'navHover')
    // this.showApiKey = this.showApiKey.bind(this)
    // this.hideApiKey = this.hideApiKey.bind(this)
  }
  onClick () {
    this.setState(prevState => ({
      buttonHover: !prevState.buttonHover
    }))
  }
  onMouseEnter (type: 'buttonHover' | 'navHover') {
    switch (type) {
      case 'buttonHover':
        this.setState({
          [type]: true
        })
        break
      case 'navHover':
        this.setState({
          [type]: true
        })
        break
    }
  }
  onMouseLeave (type?: 'buttonHover' | 'navHover') {
    if (typeof type === 'string') {
      switch (type) {
        case 'buttonHover':
          this.setState({
            [type]: false
          })
          break
        case 'navHover':
          this.setState({
            [type]: false
          })
          break
      }
    } else {
      this.setState({
        buttonHover: false,
        navHover: false
      })
    }
  }
  /*
  showApiKey () {
    this.setState({
      showApiKey: true
    })
  }
  hideApiKey () {
    this.setState({
      showApiKey: false
    })
  }
  */
  render () {
    const apiKey = this.props.apiKey
    const hover = this.state.buttonHover || this.state.navHover
    const styles: React.CSSProperties = {
      topbar: {
        width: '100%',
        height: '0',
        flex: '0 0 auto',
        zIndex: '100',
        position: 'absolute'
      },
      padding: {
        display: 'flex',
        padding: '8px 20px'
      },
      bar: {
        flex: '1 0 0%'
      },
      button: {
        width: 'auto',
        height: 'auto',
        flexShrink: '0'
      },
      icon: {
        position: 'fixed',
        width: '40px',
        height: '40px',
        padding: '4px',
        top: '8px',
        left: '0',
        cursor: 'pointer',
        backgroundColor: '#ffcf00',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
        borderRadius: '0 4px 4px 0',
        transform: hover ? 'translateX(+240px)' : 'none',
        transition: 'transform 0.5s linear',
        willChange: 'transform'
      },
      img: {
        width: '100%',
        height: '100%'
      }
    }
    return (
      <div style={styles.topbar}>
        <div style={styles.padding}>
          <div style={styles.bar}>
            <SMMButton
              text='Navigation'
              iconSrc='img/menu.svg'
              iconSrcHover='img/menu_yellow.svg'
              onMouseEnter={this.onMouseEnterButton}
              onMouseLeave={this.onMouseLeaveButton}
              styles={{
                icon: {
                  padding: '4px'
                }
              }}
            />
            <NavigationArea
              display={hover}
              onMouseEnter={this.onMouseEnterNav}
              onMouseLeave={this.onMouseLeaveNav}
              onClick={this.onMouseLeave}
            />
          </div>
          <div style={styles.button}>
            {
              /* false &&
              <SMMButton
                text={`${apiKey ? 'Change' : 'Add'} API Key`}
                iconSrc='img/api.png'
                fontSize='13px'
                padding='3px'
                onClick={this.showApiKey}
              /> */
            }
          </div>
        </div>
        {
          // this.state.showApiKey &&
          // <ApiKeyArea apiKey={apiKey} onClose={this.hideApiKey} />
        }
      </div>
    )
  }
}
export const TopBarArea = connect((state: State) => ({
  apiKey: state.save.appSaveData.apiKey
}))(Area)
