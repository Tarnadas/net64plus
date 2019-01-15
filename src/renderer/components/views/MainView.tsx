import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { SMMButton } from '../buttons/SMMButton'
import { ExternalLink } from '../helpers/ExternalLink'
import { State } from '../../../models/State.model'

interface MainViewProps {
  dispatch: Dispatch<State>
}

class View extends React.PureComponent<MainViewProps> {
  constructor (public props: MainViewProps) {
    super(props)
    this.onStartClick = this.onStartClick.bind(this)
  }
  onStartClick () {
    this.props.dispatch(push('/browse'))
  }
  render () {
    const styles: React.CSSProperties = {
      main: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#24997e',
        flex: '1 1 auto',
        color: '#000',
        alignItems: 'center',
        fontSize: '18px',
        overflow: 'auto',
        padding: '20px 40px'
      }
    }
    return (
      <div style={styles.main}>
        <SMMButton
          link='https://discord.gg/k9QMFaB'
          text='Start'
          styles={{
            button: {
              fontSize: '22px'
            }
          }}
          iconSrc='img/net64.svg'
          onClick={this.onStartClick}
        />
        <h2>Thank you for downloading Net64+</h2>
        <div>
          Net64 aka SM64O allows playing Super Mario 64 in an online multiplayer mode.
          Net64+ is the official continuation of the program and features an integrated server list.
          You can also play with your friends by hosting your own server with the server software provided.
        </div>
        <h3>Want to host your own server?</h3>
        <div>
          If you want your server to be listed, please visit <ExternalLink href='https://github.com/tarnadas/net64plus-server'>the GitHub repository of the server software</ExternalLink> and follow its instructions.
        </div>
        <h3>Join our community</h3>
        <div>
          <SMMButton
            link='https://discord.gg/net64' external
            text='Net64 Discord'
            iconSrc='img/discord.svg'
          />
          <SMMButton
            link='https://smmdb.ddns.net/' external
            text='Net64 Website'
            iconSrc='img/net64.svg'
          />
          <SMMButton
            link='https://reddit.com/r/Net64' external
            text='Net64 SubReddit'
            iconSrc='img/reddit.svg'
          />
        </div>
      </div>
    )
  }
}
export const MainView = connect()(View)
