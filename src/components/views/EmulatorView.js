import React from 'react'
import {
  connect
} from 'react-redux'
import {
  push
} from 'react-router-redux'
import tasklist from 'tasklist'

import Emulator from '../../Emulator'
import SMMButton from '../buttons/SMMButton'
import {
  setEmulator
} from '../../actions/emulator'

class EmulatorView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      emulators: [],
      loading: false
    }
    if (!props.emulator) {
      this.state.alert = 'You must start and select an emulator'
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
    const emulators = (await tasklist()).filter(el => el.imageName.includes('Project64')).map(el => ({
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
      const emulator = new Emulator(e.pid, this.props.characterId)
      if (emulator.base !== -1) {
        this.props.dispatch(setEmulator(emulator))
        this.props.dispatch(push('/browse'))
      }
      this.setState({
        loading: false
      })
    }, 0)
  }
  renderEmulators (emulators) {
    const li = {
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
    return Array.from((function * () {
      for (const emulator of emulators) {
        yield (
          <div style={li} key={emulator.pid}>
            <div>
              {emulator.name} | pid: {emulator.pid}
            </div>
            <SMMButton text='Select' iconSrc='img/submit.png' fontSize='13px' padding='3px' noMargin onClick={onSelect.bind(null, emulator)} />
          </div>
        )
      }
    })())
  }
  render () {
    const emulators = this.state.emulators
    const loading = this.state.loading
    const alert = this.state.alert
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
        <div style={styles.warningWrapper}>
          {
            alert &&
            <div style={styles.warning}>
              <img style={styles.warningImg} src='img/warning.svg' />
              <div>{alert}</div>
            </div>
          }
        </div>
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
  characterId: state.getIn(['save', 'data', 'character'])
}))(EmulatorView)
