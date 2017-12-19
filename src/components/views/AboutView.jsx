import React from 'react'

export default class AboutView extends React.PureComponent {
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
      }
    }
    return (
      <div style={styles.view}>
        <h2>Credits</h2>
        <div>
          <h3>Net64 Online Team</h3>
          <div style={styles.text}>
            Kaze Emanuar<br/>
            MelonSpeedruns<br/>
            Guad<br/>
            merlish
          </div>
          <h3>Net64+</h3>
          <div style={styles.text}>
            Tarnadas and all contributors
          </div>
          <h3>Luigi 3D Model</h3>
          <div style={styles.text}>
            Cjes<br/>
            GeoshiTheRed
          </div>
          <h3>Toad, Rosalina and Peach 3D Models</h3>
          <div style={styles.text}>
            AnkleD
          </div>
          <h3>New Character 3D Models</h3>
          <div style={styles.text}>
            Marshivolt
          </div>
          <h3>Character Head Icons</h3>
          <div style={styles.text}>
            Quasmok
          </div>
        </div>
        <h2 style={{marginTop: '20px'}}>Monetization</h2>
        <div style={styles.text}>
          Net64+ uses JSECoin for monetization. It is a cryptocurrency which is mined while the program is running.
          At first this might sound like a bad deal for the users, but the idea of JSECoin is to only use resources of the CPU, that would otherwise be wasted.<br/>
          Please also compare it to how you feel about ads as monetization.<br/><br/>
          You also have the option to opt-out of mining by clicking <a href='https://server.jsecoin.com/optout/' target='_blank'>here</a> and restarting Net64+.
          If you want to opt-in please click <a href href='https://server.jsecoin.com/optin/' target='_blank'>here</a>.
        </div>
      </div>
    )
  }
}