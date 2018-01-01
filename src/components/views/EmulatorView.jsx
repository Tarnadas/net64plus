import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import tasklist from 'tasklist'

import Emulator from '../../Emulator'
import SMMButton from '../buttons/SMMButton'
import WarningPanel from '../panels/WarningPanel'
import { setEmulator } from '../../actions/emulator'

const TIMEOUT = 2000

class EmulatorView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      emulators: [],
      loading: false
    }
    if (!props.emulator) {
      this.state.warning = 'You must start and select an emulator'
    }
    this.scan = this.scan.bind(this)
    this.onSelectEmulator = this.onSelectEmulator.bind(this)
    this.renderEmulators = this.renderEmulators.bind(this)
    this.mounted = true
  }
  componentDidMount () {
    this.scan()
    this.timer = setInterval(this.scan, 10000)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
    this.mounted = false
  }
  async scan () {
    if (!this.mounted) return
    const emulators = (await tasklist())
      .filter(el => el.imageName.includes('Project64') || el.imageName.includes('Mupen64') || el.imageName.includes('Nemu64'))
      .map(el => ({
        name: el.imageName,
        pid: el.pid
      }))
    if (this.mounted) {
      this.setState({
        emulators
      })
    }
  }
  async onSelectEmulator (e) {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      const emulator = new Emulator(e.pid, this.props.characterId, this.props.emuchat)
      if (emulator.base !== -1) {
        this.props.dispatch(setEmulator(emulator))
        this.props.dispatch(push('/browse'))
      }
    }, 10)
    setTimeout(() => {
      if (!this.mounted) return
      this.setState({
        loading: false,
        warning: 'Could not inject emulator.\nDid you start Super Mario 64 (USA)?\nYou might have to start Net64+ as administrator.'
      })
    }, TIMEOUT)
  }
  renderEmulators (emulators) {
    const li = {
      margin: '10px 0',
      lineHeight: '40px',
      width: '80%',
      padding: '8px',
      boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)',
      borderRadius: '6px',
      backgroundColor: 'rgb(212, 221, 165)',
      display: 'flex',
      justifyContent: 'space-between'
    }
    const onSelect = this.onSelectEmulator
    return emulators.map(
      emulator =>
        <div style={li} key={emulator.pid}>
          <div>
            {emulator.name} | pid: {emulator.pid}
          </div>
          <SMMButton
            text='Select'
            iconSrc='img/submit.png'
            style={{
              button: {
                margin: '0'
              },
              icon: {
                padding: '3px'
              }
            }}
            onClick={onSelect.bind(null, emulator)}
          />
        </div>
    )
  }
  render () {
    const emulators = this.state.emulators
    const loading = this.state.loading
    const warning = this.state.warning
    const styles = {
      main: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: '#24997e',
        flex: '1 1 auto',
        color: '#000',
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontSize: '18px',
        overflow: 'auto',
        padding: '40px 20px'
      },
      ul: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      },
      loading: {
        display: 'flex',
        position: 'fixed',
        zIndex: '100',
        backgroundColor: 'rgba(0,0,0,0.6)',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }
    return (
      <div style={styles.main} id='scroll'>
        {
          warning &&
          <WarningPanel warning={warning} />
        }
        {
          !emulators || emulators.length === 0 ? (
            <div>Scanning for emulators...</div>
          ) : (
            <div style={styles.ul}>
              { this.renderEmulators(emulators) }
              {
                loading &&
                <div style={styles.loading}>
                  <img src='img/load.gif' />
                </div>
              }
            </div>
          )
        }
      </div>
    )
  }
}
export default connect(state => ({
  emulator: state.get('emulator'),
  characterId: state.getIn(['save', 'data', 'character']),
  emuchat: state.getIn(['save', 'data', 'emuchat'])
}))(EmulatorView)
