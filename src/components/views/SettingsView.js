import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import SMMButton from '../buttons/SMMButton'
import { setUsername, setCharacter } from '../../actions/save'

const MIN_LENGTH_USERNAME = 3
const MAX_LENGTH_USERNAME = 24

class SettingsView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      username: props.saveData.get('username'),
      characterId: props.saveData.get('character')
    }
    if (!this.state.username) {
      this.state.alert = 'You must set a username'
    }
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onCharacterChange = this.onCharacterChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  onUsernameChange (e) {
    let value = e.target.value.replace(/\W/g, '')
    if (value.length > MAX_LENGTH_USERNAME) {
      value = value.substr(0, MAX_LENGTH_USERNAME)
    }
    this.setState({
      username: value
    })
  }
  onCharacterChange (e) {
    this.setState({
      characterId: parseInt(e.target.value)
    })
  }
  onSave () {
    const username = this.state.username.replace(/\W/g, '')
    if (username.length < MIN_LENGTH_USERNAME) {
      this.setState({
        alert: 'Your username is too short'
      })
    } else {
      if (this.props.emulator) {
        this.props.emulator.changeCharacter(this.state.characterId)
      }
      this.props.dispatch(setUsername(username))
      this.props.dispatch(setCharacter(this.state.characterId))
      this.props.dispatch(push('/browse'))
    }
  }
  render () {
    const alert = this.state.alert
    const styles = {
      view: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        flex: '1 1 auto',
        padding: '40px',
        backgroundColor: '#24997e',
        fontSize: '18px',
        alignItems: 'flex-start',
        color: '#000'
      },
      warningWrapper: {
        width: '100%'
      },
      warning: {
        color: '#a00003',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      warningImg: {
        height: '30px',
        marginRight: '20px'
      },
      label: {
        width: '40%'
      },
      input: {
        width: '40%',
        fontSize: '16px'
      }
    }
    return (
      <div style={styles.view}>
        <div style={styles.warningWrapper}>
          {
            alert &&
            <div style={styles.warning}>
              <img style={styles.warningImg} src='img/warning.svg' />
              <div>{alert}</div>
            </div>
          }
        </div>
        <div style={styles.label}>Username:</div>
        <input style={styles.input} value={this.state.username} onChange={this.onUsernameChange} />
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
        </select>
        <SMMButton text='Save' iconSrc='img/submit.png' fontSize='13px' padding='3px' noMargin onClick={this.onSave} />
      </div>
    )
  }
}
export default connect(state => ({
  saveData: state.getIn(['save', 'data']),
  emulator: state.get('emulator')
}))(SettingsView)
