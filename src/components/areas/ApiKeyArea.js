import React from 'react'

import SMMButton from '../buttons/SMMButton'
import {
  initAccount
} from '../../Account'

const LENGTH_API_KEY = 30

export default class ApiKeyArea extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      apiKey: props.apiKey
    }
    this.addApiKey = this.addApiKey.bind(this)
    this.deleteApiKey = this.deleteApiKey.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.apiKey) {
      this.setState({
        apiKey: nextProps.apiKey
      })
    }
  }
  async addApiKey () {
    if (this.state.apiKey.length !== LENGTH_API_KEY) return
    const account = await initAccount(this.state.apiKey)
    if (!account) return
    this.props.onAddApiKey(account, this.state.apiKey)
  }
  deleteApiKey () {
    this.props.onDeleteApiKey()
  }
  handleChange (e) {
    let value = e.target.value
    if (value.length > 30) {
      value = value.substr(0, 30)
    }
    this.setState({
      apiKey: value
    })
  }
  render () {
    const apiKey = this.props.apiKey
    const styles = {
      apiKey: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
        textAlign: 'center',
        zIndex: '100',
        width: '500px',
        backgroundColor: '#0d633d',
        border: '12px solid #42c074'
      },
      apiKeyExplanation: {
        width: '400px',
        lineHeight: '20px',
        display: 'inline-block',
        color: '#fff',
        margin: '10px auto',
        padding: '0 10px'
      },
      apiKeyExplanationSmall: {
        width: '400px',
        lineHeight: '11px',
        fontSize: '11px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        display: 'inline-block',
        color: '#fff',
        margin: '10px auto',
        padding: '0 10px'
      },
      apiKeyInput: {
        width: '400px',
        height: '30px',
        lineHeight: '30px',
        display: 'inline-block',
        margin: '10px auto',
        padding: '0 10px',
        color: '#323245'
      },
      cancel: {
        float: 'right',
        margin: '4px',
        width: '32px',
        height: '32px',
        boxSizing: 'border-box',
        borderRadius: '3px',
        backgroundColor: '#45b46a',
        cursor: 'pointer'
      },
      cancelImg: {
        width: '24px',
        height: '24px',
        margin: '4px'
      }
    }
    return (
      <div style={styles.apiKey}>
        <div style={styles.cancel} onClick={this.props.onClose}>
          <img style={styles.cancelImg} src='img/cancel.svg' />
        </div>
        <div style={styles.apiKeyExplanation}>
          Go to <a href='http://smmdb.ddns.net' target='_blank'>SMMDB</a> > Login > Profile > Show API Key
        </div>
        <div style={styles.apiKeyExplanationSmall}>
          (With an API Key, you will be able to join verified servers with a moderation system, resulting in less cheaters)
        </div>
        <input style={styles.apiKeyInput} type='text' value={!this.state.apiKey ? '' : this.state.apiKey} onChange={this.handleChange} />
        {
          apiKey &&
          <SMMButton text='Unlink account' iconSrc='/img/delete.png' fontSize='13px' padding='3px' onClick={this.deleteApiKey} />
        }
        <SMMButton text='Add API Key' iconSrc='/img/api.png' fontSize='13px' padding='3px' onClick={this.addApiKey} />
      </div>
    )
  }
}
