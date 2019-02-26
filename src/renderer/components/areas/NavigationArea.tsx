import './NavigationArea.scss'

import * as React from 'react'
import { connect } from 'react-redux'
import { RouterState } from 'react-router-redux'
import produce from 'immer'

import { NavigationButton } from '../buttons/NavigationButton'
import { State } from '../../../models/State.model'

interface AppLocation {
  link: string
  text: string
  iconSrc: string
  isActive: boolean
  isEnabled: boolean
  enabledCondition: (props: NavigationAreaProps) => boolean
}

interface NavigationAreaProps {
  username: string
  route: Readonly<RouterState>
  isConnectedToEmulator: boolean
}

interface NavigationAreaState {
  locations: AppLocation[]
}

class Area extends React.PureComponent<NavigationAreaProps, NavigationAreaState> {
  constructor (props: NavigationAreaProps) {
    super(props)
    this.state = {
      locations: [
        {
          link: '/faq',
          text: 'FAQ',
          iconSrc: 'img/help.png',
          isActive: false,
          isEnabled: false,
          enabledCondition: () => true
        },
        {
          link: '/',
          text: 'Home',
          iconSrc: 'img/home.svg',
          isActive: false,
          isEnabled: false,
          enabledCondition: () => true
        },
        {
          link: '/emulator',
          text: 'Change Emulator',
          iconSrc: 'img/n64.svg',
          isActive: false,
          isEnabled: false,
          enabledCondition: (props) => !!props.username
        },
        {
          link: '/browse',
          text: 'Browse Servers',
          iconSrc: 'img/browse.svg',
          isActive: false,
          isEnabled: false,
          enabledCondition: (props) => props.isConnectedToEmulator
        },
        {
          link: '/connect',
          text: 'Direct Connect',
          iconSrc: 'img/connect.svg',
          isActive: false,
          isEnabled: false,
          enabledCondition: (props) => props.isConnectedToEmulator
        }
      ]
    }
    this.updateLocations = this.updateLocations.bind(this)
    this.renderNavigationButtons = this.renderNavigationButtons.bind(this)
  }

  public componentDidMount () {
    this.updateLocations()
  }

  public componentDidUpdate (prevProps: NavigationAreaProps) {
    if (
      prevProps.username === this.props.username &&
      prevProps.route.location === this.props.route.location &&
      prevProps.isConnectedToEmulator === this.props.isConnectedToEmulator
    ) return
    this.updateLocations()
  }

  private updateLocations () {
    const locations = produce(this.state.locations, (draftLocations) => {
      const { route } = this.props
      draftLocations.forEach((location) => {
        location.isActive = route.location ? location.link === route.location.pathname : false
        location.isEnabled = location.enabledCondition(this.props)
      })
    })
    this.setState({
      locations
    })
  }

  private renderNavigationButtons (): JSX.Element[] {
    return this.state.locations.map((location) => {
      const { link, text, iconSrc, isActive, isEnabled } = location
      return <NavigationButton
        key={link}
        link={link}
        text={text}
        iconSrc={iconSrc}
        isActive={isActive}
        isEnabled={isEnabled}
      />
    })
  }

  public render (): JSX.Element {
    return (
      <div
        className='navigation-area'
      >
        { this.renderNavigationButtons() }
      </div>
    )
  }
}

export const NavigationArea = connect((state: State) => ({
  username: state.save.appSaveData.username,
  route: state.router,
  isConnectedToEmulator: state.emulator.isConnectedToEmulator
}))(Area)
