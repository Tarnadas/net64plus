import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SMMButton from '../buttons/SMMButton'
import { setVersion } from '../../actions/save'

class FaqView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onDone = this.onDone.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(setVersion(process.env.VERSION))
  }
  onDone () {
    this.props.dispatch(push('/'))
  }
  render () {
    const styles = {
      view: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#24997e',
        flex: '1 1 auto',
        color: '#000',
        alignItems: 'center',
        fontSize: '18px',
        overflow: 'auto',
        padding: '20px 40px'
      },
      text: {
        paddingLeft: '14px'
      },
      imgWrapper: {
        margin: '10px 16px'
      },
      img: {
        width: '100%'
      }
    }
    return (
      <div style={styles.view}>
        <h2>FAQ</h2>
        <SMMButton
          iconSrc='img/net64.svg'
          text='Got it!'
          onClick={this.onDone}
        />
        <h3>Monetization</h3>
        <div style={styles.text}>
          Net64+ uses JSECoin for monetization. It is a cryptocurrency which is mined while the program is running.
          At first this might sound like a bad deal for the users, but the idea of JSECoin is to only use resources of the CPU (~1-3%, that would otherwise be wasted.
          It will also automatically scale with your hardware strength, so weak computers will have the same CPU usage as strong hardware.
          Please open task manager and check for yourself.<br/><br/>
          Please also compare it to how you feel about ads as monetization.<br/><br/>
          This monetization helps us to pay for servers and domains and keeps the project alive.
          It is the least annoying method for users and please don&#39;t freak up when you read cryptocurrency.
          Mining cryptopcurrencies in browsers has bad reputation, because of a mining service that was used by companies like TBP.
          The mining service they were using was mining another cryptocurrency called Monero. To effectively earn money with Monero it must use a lot of computation power.
          JSECoin is different, because it gets its full potential with only very few resources and the rewards you get is basically limited by their servers, since there is only one mining pool.<br/><br/>
          We will never abuse your hardware!<br/><br/>
          If you still want to opt-out of mining, you can do so by clicking <a href='https://server.jsecoin.com/optout/' target='_blank'>here</a> and restarting Net64+.
          If you want to opt-in please click <a href='https://server.jsecoin.com/optin/' target='_blank'>here</a>.
        </div>
        <div style={styles.text}>
          Make sure your emulator settings match the green circles
        </div>
        <h3>Project64 1.6</h3>
        <div style={styles.imgWrapper}>
          <img style={styles.img} src='img/pj1.6_help1.png' />
        </div>
        <div style={styles.imgWrapper}>
          <img style={styles.img} src='img/pj1.6_help2.png' />
        </div>
        <h3>Project64 2.3</h3>
        <div style={styles.imgWrapper}>
          <img style={styles.img} src='img/pj2.3_help1.png' />
        </div>
        <div style={styles.imgWrapper}>
          <img style={styles.img} src='img/pj2.3_help2.png' />
        </div>
      </div>
    )
  }
}
export default connect()(FaqView)
