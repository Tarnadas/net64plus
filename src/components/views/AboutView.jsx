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
            Kaze Emanuar
            MelonSpeedruns
            Guad
            merlish
          </div>
          <h3>Net64+</h3>
          <div style={styles.text}>
            Tarnadas and all contributors
          </div>
          <h3>Luigi 3D Model</h3>
          <div style={styles.text}>
            Cjes
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
        <h2>JSECoin</h2>
        <div style={styles.text}>
          Bla bla bla
        </div>
      </div>
    )
  }
}