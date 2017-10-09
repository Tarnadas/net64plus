import React from 'react'
import {
  connect
} from 'react-redux'
import {
  shell
} from 'electron'

import SMMButton from '../buttons/SMMButton'
import {
  initAccount
} from '../../Account'
import {
  setAccountData
} from '../../actions/account'
import {
  addApiKey, deleteApiKey
} from '../../actions/save'

const LENGTH_API_KEY = 30

class ApiKeyArea extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      apiKey: props.apiKey
    }
    this.addApiKey = this.addApiKey.bind(this)
    this.deleteApiKey = this.deleteApiKey.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onSMMDBClick = this.onSMMDBClick.bind(this)
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
    this.props.dispatch(setAccountData(account))
    this.props.dispatch(addApiKey(this.state.apiKey))
    this.props.onClose()
  }
  deleteApiKey () {
    this.setState({
      apiKey: ''
    })
    this.props.dispatch(deleteApiKey())
  }
  handleChange (e) {
    let value = e.target.value
    if (value.length > LENGTH_API_KEY) {
      value = value.substr(0, LENGTH_API_KEY)
    }
    this.setState({
      apiKey: value
    })
  }
  onSMMDBClick () {
    shell.openExternal('https://smmdb.ddns.net/profile')
  }
  render () {
    const apiKey = this.props.apiKey
    const styles = {
      apiKey: {
        textAlign: 'center',
        width: '500px',
        backgroundColor: '#0d633d',
        border: '12px solid #42c074'
      },
      overflow: {
        position: 'fixed',
        zIndex: '100',
        backgroundColor: 'rgba(0,0,0,0.6)',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
      },
      link: {
        cursor: 'pointer',
        color: '#56d6ff'
      }
    }
    return (
      <div style={styles.overflow}>
        <div style={styles.apiKey}>
          <div style={styles.cancel} onClick={this.props.onClose}>
            <img style={styles.cancelImg} src='img/cancel.svg' />
          </div>
          <div style={styles.apiKeyExplanation}>
            Go to <span style={styles.link} onClick={this.onSMMDBClick}>SMMDB</span> > Sign In > Show API Key
          </div>
          <div style={styles.apiKeyExplanationSmall}>
            (With an API Key, you will be able to join verified servers with a moderation system, resulting in less cheaters (WIP))
          </div>
          <input style={styles.apiKeyInput} type='text' value={this.state.apiKey} onChange={this.handleChange} />
          {
            apiKey &&
            <SMMButton text='Unlink account' iconSrc='img/delete.png' fontSize='13px' padding='3px' onClick={this.deleteApiKey} />
          }
          <SMMButton text='Add API Key' iconSrc='img/api.png' fontSize='13px' padding='3px' onClick={this.addApiKey} />
        </div>
      </div>
    )
  }
}
export default connect()(ApiKeyArea)
