import React from 'react'
import {
  connect
} from 'react-redux'

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
        <div>This is Net64+ Client, a modified client for Net64 aka Sm64O, that uses the WebSocket protocol.</div>
        <h2>Why?</h2>
        <div>Because the official client uses the Hazel protocol and I want to make a dedicated server with Node.js. The Hazel protocol is only implemented in C# and honestly, noone uses it (sorry).<br /><br />
          With this client you won't be able to connect to any official server. You can only connect to servers, that use my dedicated server software. You also won't be able to create a server with this client.<br /><br />
          If you only want to play with friends, the official client is a better choice.</div>
      </div>
    )
  }
}
export default connect()(MainView)
