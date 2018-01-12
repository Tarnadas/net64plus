import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import parse from 'csv-parse'

import { spawn } from 'child_process'

import Emulator from '../../Emulator'
import SMMButton from '../buttons/SMMButton'
import WarningPanel from '../panels/WarningPanel'
import { setEmulator } from '../../actions/emulator'

const TIMEOUT = 500
const ERROR_TIMEOUT = 5000

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
    this.timer = setInterval(this.scan, TIMEOUT)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
    this.mounted = false
  }
  async scan (useAbsolutePathFallback = false) {
    if (!this.mounted) return

    try {
      const systemRoot = process.env.SystemRoot
      const emulators = (await Promise.all((await new Promise((resolve, reject) => {
        try {
          const tasklist = spawn(
            useAbsolutePathFallback ? `${systemRoot}\\System32\\tasklist.exe` : 'tasklist', ['/FO', 'CSV', '/NH']
          )
          tasklist.on('error', err => {
            if (String(err).includes('ENOENT')) {
              reject(new Error('Couldn\'t find "tasklist" in your system\'s PATH variable. Wtf did you do?'))
            } else {
              reject(err)
            }
          })
          let stdout = ''
          let stderr = ''
          tasklist.stdout.on('data', data => {
            stdout += data.toString()
          })
          tasklist.stderr.on('data', data => {
            stderr += data.toString()
          })
          tasklist.on('close', code => {
            if (code !== 0) {
              reject(stderr)
            }
            parse(stdout, (err, data) => {
              if (err) reject(err)
              resolve(data)
            })
          })
        } catch (err) {
          reject(err)
        }
      }))
        .filter(process => process[0].match(/project64/i))
        .map(process =>
          new Promise((resolve, reject) => {
            try {
              const tasklist = spawn(
                useAbsolutePathFallback
                  ? `${systemRoot}\\System32\\tasklist.exe`
                  : 'tasklist',
                ['/FI', `PID eq ${process[1]}`, '/FO', 'CSV', '/NH', '/V']
              )
              tasklist.on('error', err => {
                if (String(err).includes('ENOENT')) {
                  reject(new Error('Couldn\'t find "tasklist" in your system\'s PATH variable. Wtf did you do?'))
                } else {
                  reject(err)
                }
              })
              let stdout = ''
              let stderr = ''
              tasklist.stdout.on('data', data => {
                stdout += data.toString()
              })
              tasklist.stderr.on('data', data => {
                stderr += data.toString()
              })
              tasklist.on('close', code => {
                if (code !== 0) {
                  reject(stderr)
                }
                parse(stdout, (err, data) => {
                  if (err) reject(err)
                  if (data.length === 0) reject(new Error(`tasklist couldn't find process with PID ${process[1]}`))
                  resolve(data[0])
                })
              })
            } catch (err) {
              reject(err)
            }
          })
        )))
        .map(process => ({
          name: process[0],
          pid: process[1],
          windowName: process[8]
        }))
      if (!this.mounted) return
      this.setState({
        emulators
      })
    } catch (err) {
      if (useAbsolutePathFallback) {
        this.setState({
          warning: `Scanning for emulator failed:\n\n${err}`
        })
      } else {
        return this.scan(true)
      }
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
        emulator.displayChatMessage('- Net64 connected -', 19)
      }
    }, 10)
    setTimeout(() => {
      if (!this.mounted) return
      this.setState({
        loading: false,
        warning: 'Could not inject emulator.\nDid you start Super Mario 64 (USA)?\nYou might have to start Net64+ as administrator.'
      })
    }, ERROR_TIMEOUT)
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
      emulator => {
        let romName
        try {
          const windowName = emulator.windowName
          romName = windowName.includes(' - ')
            ? emulator.windowName.split(' - Project64')[0]
            : null
        } catch (err) {}
        return (
          <div style={li} key={emulator.pid}>
            <div>
              { emulator.name } | pid: { emulator.pid } | { romName || 'Game is not running' }
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
              enabled={romName != null}
              onClick={onSelect.bind(null, emulator)}
            />
          </div>
        )
      }
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
            <div>Scanning for running emulators...</div>
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
