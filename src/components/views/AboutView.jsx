import React from 'react'
import { connect } from 'react-redux'

import { minerEnabled } from '../../actions/save'
import { workers } from '../../renderer'

class AboutView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onOptOut = this.onOptOut.bind(this)
    this.onOptIn = this.onOptIn.bind(this)
  }
  onOptOut () {
    if (!this.props.minerEnabled) return
    workers.disable()
    this.props.dispatch(minerEnabled(false))
  }
  onOptIn () {
    if (this.props.minerEnabled) return
    workers.enable()
    this.props.dispatch(minerEnabled(true))
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
      link: {
        cursor: 'pointer',
        color: '#227'
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
        <h2 style={{marginTop: '20px'}}>License</h2>
        <code style={styles.text}>
MIT License<br/><br/>

Copyright (c) 2017 Mario Reder<br/><br/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:<br/><br/>

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.<br/><br/>

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
        </code>
        <h2 style={{marginTop: '20px'}}>Monetization</h2>
        <div style={styles.text}>
          Net64+ uses JSECoin for monetization. It is a cryptocurrency which is mined while the program is running.
          At first this might sound like a bad deal for the users, but the idea of JSECoin is to only use resources of the CPU, that would otherwise be wasted.<br/>
          Please also compare it to how you feel about ads as monetization.<br/><br/>
          You also have the option to opt-out of mining by clicking <div style={styles.link} onClick={this.onOptOut}>here</div>.
          If you want to opt-in please click <div style={styles.link} onClick={this.onOptIn}>here</div>.
        </div>
      </div>
    )
  }
}
export default connect(state => ({
  minerEnabled: state.getIn(['save', 'data', 'minerEnabled'])
}))(AboutView)
