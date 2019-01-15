import * as React from 'react'

export class AboutView extends React.PureComponent {
  render () {
    const styles: React.CSSProperties = {
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
      <div style={styles.view} className='scroll'>
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

Copyright (c) 2017-2019 Mario Reder<br/><br/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:<br/><br/>

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.<br/><br/>

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
        </code>
      </div>
    )
  }
}
