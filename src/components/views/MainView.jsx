import React from 'react'
import { connect } from 'react-redux'

import SMMButton from '../buttons/SMMButton'
import ExternalLink from '../helpers/ExternalLink'

class MainView extends React.PureComponent {
  render () {
    const styles = {
      main: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#24997e',
        flex: '1 1 auto',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        overflow: 'auto',
        padding: '40px'
      }
    }
    return (
      <div style={styles.main}>
        <h2>Thank you for downloading Net64+</h2>
        <div>Net64+ is a modified version of Net64, aka SM64O.
          It uses a different and more performant networking technique.
          Right now both programs are not compatible with each other, but the client devs are working it.
          Net64+ also has a dedicated server software, which makes it extremely easy to host or find servers.
          There is a server list integrated inside the client, so you will always immediately find servers to play on.
          If you only want to play with friends, the original client might be a better choice.
        </div>
        <h3>This is a client only program</h3>
        <div>
          You won&#39;t be able to create a server.<br />
          If you want to create a server, please visit <ExternalLink href='https://github.com/tarnadas/net64plus-ded'>the GitHub repository of the server software</ExternalLink>
        </div>
        <h3>Join our community</h3>
        <div>
          <SMMButton
            link='https://discord.gg/k9QMFaB' blank
            text='Net64 Discord'
            iconSrc='img/discord.svg'
          />
          <SMMButton
            link='https://discord.gg/SPZsgSe' blank
            text='SMMDB Discord'
            iconSrc='img/discord.svg'
          />
          <SMMButton
            link='https://sm64o.com/' blank
            text='Forum'
            iconSrc='img/sm64o.png'
            noText
          />
        </div>
      </div>
    )
  }
}
export default connect()(MainView)
