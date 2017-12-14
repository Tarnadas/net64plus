import React from 'react'
import { shell } from 'electron'
import marked from 'marked'

import SMMButton from '../buttons/SMMButton'

export default class NewVersionArea extends React.PureComponent {
  constructor (props) {
    super(props)
    this.onClose = this.onClose.bind(this)
  }
  onClose () {
    this.props.onClose()
  }
  componentDidMount () {
    if (this.props.patchNotes) {
      this.patchNotesRenderer.innerHTML = marked(this.props.patchNotes)
      this.patchNotesRenderer.querySelectorAll('.markdown a').forEach(a => {
        const href = a.getAttribute('href')
        a.removeAttribute('href')
        a.onclick = () => {
          shell.openExternal(href)
        }
      })
    }
  }
  render () {
    const versionUrl = this.props.versionUrl
    const styles = {
      area: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: '101'
      },
      popup: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '80%',
        backgroundColor: '#24997e',
        borderRadius: '8px',
        border: '5px solid black',
        padding: '16px'
      }
    }
    return (
      <div style={styles.area}>
        <div style={styles.popup}>
          <div style={{marginBottom: '12px'}}>
            <h2>A new version is available</h2>
            <div
              className='markdown'
              style={{
                width: '100%',
                flex: '1 0 auto'
              }}
              ref={ x => { this.patchNotesRenderer = x } }
            />
          </div>
          <SMMButton
            link={versionUrl} external
            text='Download'
            iconSrc='img/net64.svg'
          />
          <SMMButton
            onClick={this.onClose}
            text='Ignore'
            iconSrc='img/cancel.svg'
            padding='4px'
          />
        </div>
      </div>
    )
  }
}
