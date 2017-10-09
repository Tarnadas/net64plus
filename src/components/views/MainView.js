import React from 'react'
import winProcess from 'winprocess'
import tasklist from 'tasklist'

import fs from 'fs'
import path from 'path'

import SMMButton from '../buttons/SMMButton'

export default class MainView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      emulators: []
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
    this.setState({
      emulators
    })
  }
  async onSelectEmulator (e) {
    const process = new winProcess.Process(e.pid)
    console.log(process)
    process.open()
    let base = -1
    for (let i = 0x00000000; i <= 0x72D00000; i += 0x1000) {
      const buf1 = process.readMemory(i, 4)
      if (typeof buf1 !== 'object') continue
      const val1 = buf1.readUInt32LE(0)
      if (val1 !== 0x3C1A8032) continue
      const buf2 = process.readMemory(i + 4, 4)
      if (typeof buf2 !== 'object') continue
      const val2 = buf2.readUInt32LE(0)
      if (val2 !== 0x275A7650) continue
      base = i
    }
    const emulator = {
      process,
      base
    }
    const basePath = './patches'
    const patches = fs.readdirSync(basePath)
    for (const patch of patches) {
      process.writeMemory(base + parseInt(patch, 16), fs.readFileSync(path.join(basePath, patch)))
    }
    const b = Buffer.allocUnsafe(1)
    b.writeUInt8(1, 0)
    process.writeMemory(base + 0x365FF3, b) // character ID
    process.writeMemory(base + 0x365FFC, b) // isServer flag
    process.writeMemory(base + 0x367703, b) // player ID
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
    const styles = {
      main: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#24997e',
        flex: '1 1 auto',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        overflow: 'auto'
      }
    }
    return !emulators || emulators.length === 0 ? (
      <div style={styles.main}>
        Scanning for emulators...
      </div>
    ) : (
      <div style={styles.main} id='scroll'>
        { this.renderEmulators(emulators) }
      </div>
    )
  }
}
