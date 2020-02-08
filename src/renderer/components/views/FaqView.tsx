import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'

import { SMMButton } from '../buttons/SMMButton'
import { setVersion } from '../../actions/save'
import { State } from '../../../models/State.model'
import { ExternalLink } from '../helpers/ExternalLink'

interface FaqViewProps {
  dispatch: Dispatch<State>
}

class View extends React.PureComponent<FaqViewProps> {
  public componentDidMount (): void {
    this.props.dispatch(setVersion(process.env.VERSION || ''))
  }

  public render (): JSX.Element {
    const styles: Record<string, React.CSSProperties> = {
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
        <h1>FAQ</h1>
        <SMMButton
          iconSrc='img/net64.svg'
          text='Got it!'
          link='/'
        />
        <div style={{marginTop: '40px'}}></div>
        <div style={styles.text}>
          You must use the emulator which comes bundled with Net64+!
        </div>
        <h2>Emulator settings</h2>
        <div style={styles.text}>
          Make sure your emulator settings match the green circles
        </div>
        <div style={styles.imgWrapper}>
          <img style={styles.img} src='img/pj64_help1.png' />
        </div>
        <div style={styles.text}>
          After setting your memory to 16MB, you will have to restart Project64
        </div>
        <div style={styles.imgWrapper}>
          <img style={styles.img} src='img/pj64_help2.png' />
        </div>
        <h2>Server Hosting</h2>
        <div>
          You can host your own server by visiting the <Link to='/host'>hosting page</Link>.<br />
          Joining via LAN can be done by using the LAN IP address which looks like 192.X.X.X.<br />
          Joining via internet is only possible, if you correctly port forwarded. Port forwarding must be done at your router&#39;s web interface.<br />
        </div>
        <h3>Here is a short summary:</h3>
        <ul>
          <li>open a terminal (Win + &#34;cmd&#34; + enter)</li>
          <li>type &#34;ipconfig&#34;</li>
          <li>find the entry from your Ethernet or Wifi adapter showing your default gateway, which should look like 192.X.X.1/0</li>
          <li>open a browser and type in this address</li>
          <li>this is your router&#39;s web interface. You will have to log in with your credentials</li>
          <li>the next steps heavily depend on the router you are using. You will have to find an entry about port forwarding and set it up for the respective port that you want to use</li>
        </ul>
        <div>
          If you want your server to be publicly visibile, you will have to get an API key from <ExternalLink href='https://smmdb.net/profile'>SMMDB profile page</ExternalLink>.
          Never share your API key with anyone!
        </div>
      </div>
    )
  }
}
export const FaqView = connect()(View)
