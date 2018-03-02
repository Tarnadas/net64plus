import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { SMMButton, ICON_STYLE } from '../buttons/SMMButton'
import { WarningPanel } from '../panels/WarningPanel'
import { setUsername, setCharacter, setEmuChat } from '../../actions/save'
import { Emulator } from '../../Emulator'
import { Connection } from '../../Connection'
import { State, ElectronSaveData } from '../../models/State.model'

interface SettingsViewProps {
  dispatch: Dispatch<State>
  saveData: ElectronSaveData
  emulator: Emulator
  connection: Connection
  connectionError: string
}

interface SettingsViewState {
  username: string
  characterId: number
  emuChat: boolean
  warning: string
}

const MIN_LENGTH_USERNAME = 3
const MAX_LENGTH_USERNAME = 24

class View extends React.PureComponent<SettingsViewProps, SettingsViewState> {
  constructor (public props: SettingsViewProps) {
    super(props)
    this.state = {
      username: props.saveData.username,
      characterId: props.saveData.character,
      emuChat: props.saveData.emuChat,
      warning: props.saveData.username ? '' : 'You must set a username'
    }
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onCharacterChange = this.onCharacterChange.bind(this)
    this.onEmuChatChange = this.onEmuChatChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  onUsernameChange (e: React.ChangeEvent<any>) {
    let value = e.target.value.replace(/\W/g, '')
    if (value.length > MAX_LENGTH_USERNAME) {
      value = value.substr(0, MAX_LENGTH_USERNAME)
    }
    this.setState({
      username: value
    })
  }
  onCharacterChange (e: React.ChangeEvent<any>) {
    const characterId = parseInt(e.target.value)
    this.setState({
      characterId
    })
  }
  onEmuChatChange (e: React.ChangeEvent<any>) {
    const emuChat = e.target.checked
    this.setState({
      emuChat
    })
  }
  onSave () {
    const username = this.state.username.replace(/\W/g, '')
    if (username.length < MIN_LENGTH_USERNAME) {
      this.setState({
        warning: 'Your username is too short'
      })
    } else {
      if (this.props.emulator) {
        this.props.emulator.changeCharacter(this.state.characterId)
      }
      this.props.dispatch(setUsername(username))
      this.props.dispatch(setCharacter(this.state.characterId, this.props.connection))
      this.props.dispatch(setEmuChat(this.state.emuChat))
      this.props.dispatch(push('/browse'))
    }
  }
  render () {
    const warning = this.state.warning
    const connectionError = this.props.connectionError
    const styles: React.CSSProperties = {
      view: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: '1 1 auto',
        padding: '40px',
        backgroundColor: '#24997e',
        fontSize: '18px',
        color: '#000'
      },
      setting: {
        width: '100%',
        display: 'flex'
      },
      label: {
        width: '30%'
      },
      input: {
        flex: '1 0 auto',
        fontSize: '16px',
        width: '0'
      },
      checkBox: {
        alignSelf: 'center',
        margin: '0 auto',
        width: '20px',
        height: '20px'
      }
    }
    return (
      <div style={styles.view}>
        {
          warning &&
          <WarningPanel warning={warning} />
        }
        {
          connectionError &&
          <WarningPanel warning={connectionError} />
        }
        <div style={styles.setting}>
          <div style={styles.label}>Username:</div>
          <input style={styles.input} value={this.state.username} onChange={this.onUsernameChange} />
        </div>
        <div style={styles.setting}>
          <div style={styles.label}>Character:</div>
          <select style={styles.input} value={this.state.characterId} onChange={this.onCharacterChange}>
            <option value='0'>Mario</option>
            <option value='1'>Luigi</option>
            <option value='2'>Yoshi</option>
            <option value='3'>Wario</option>
            <option value='4'>Peach</option>
            <option value='5'>Toad</option>
            <option value='6'>Waluigi</option>
            <option value='7'>Rosalina</option>
            <option value='8'>9</option>
            <option value='9'>10</option>
            <option value='10'>11</option>
            <option value='11'>12</option>
            <option value='12'>13</option>
          </select>
        </div>
        <div style={styles.setting}>
          <div style={styles.label}>In-Game Chat View:</div>
          <input
            style={styles.checkBox}
            type='checkbox'
            checked={this.state.emuChat}
            onChange={this.onEmuChatChange}
          />
        </div>
        <SMMButton
          text='Save'
          iconSrc='img/submit.png'
          iconStyle='dark'
          onClick={this.onSave}
          styles={{
            button: {
              margin: '0px',
              alignSelf: 'flex-start',
              justifySelf: 'flex-end'
            },
            icon: {
              padding: '3px'
            }
          }}
        />
      </div>
    )
  }
}
export const SettingsView = connect((state: State) => ({
  saveData: state.save.appSaveData,
  emulator: state.emulator.instance,
  connection: state.connection.connection,
  connectionError: state.connection.error
}))(View)
