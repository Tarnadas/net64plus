import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as parse from 'csv-parse'

import { spawn } from 'child_process'

import { connector } from '../..'
import { SMMButton } from '../buttons/SMMButton'
import { WarningPanel } from '../panels/WarningPanel'
import { ProgressSpinner } from '../helpers/ProgressSpinner'
import { isConnectedToEmulator, setEmulatorError } from '../../actions/emulator'
import { State } from '../../../models/State.model'

const TIMEOUT = 1000

interface EmulatorViewProps {
  dispatch: Dispatch<State>
  characterId: number
  emuChat: boolean
  error: string
}

interface FilteredEmulator {
  name: string
  pid: number
  windowName: string
}

interface EmulatorViewState {
  emulators: FilteredEmulator[]
  loading: boolean
  warning: string
}

class View extends React.PureComponent<EmulatorViewProps, EmulatorViewState> {
  private mounted: boolean = false

  private timer: NodeJS.Timer | null = null

  constructor (public props: EmulatorViewProps) {
    super(props)
    this.state = {
      emulators: [],
      loading: false,
      warning: props.error || 'You must start and select an emulator'
    }
    this.scan = this.scan.bind(this)
    this.onSelectEmulator = this.onSelectEmulator.bind(this)
    this.renderEmulators = this.renderEmulators.bind(this)
    this.mounted = true
  }

  public componentDidMount (): void {
    this.scan()
    this.timer = setInterval(this.scan, 10000)
  }

  public componentWillUnmount (): void {
    if (!this.timer) return
    clearInterval(this.timer)
    this.mounted = false
  }

  private async scan (): Promise<void> {
    if (!this.mounted) return

    try {
      const emulators: FilteredEmulator[] = (await Promise.all((await new Promise<string[][]>((resolve, reject) => {
        const tasklist = spawn('tasklist', ['/FO', 'CSV', '/NH'])
        let stdout = ''
        tasklist.stdout.on('data', data => {
          stdout += data.toString()
        })
        tasklist.stderr.on('data', data => {
          console.error(`tasklist stderr: ${data}`)
        })
        tasklist.on('close', code => {
          if (code !== 0) {
            console.warn(`tasklist process exited with code ${code}`)
          }
          parse(stdout, {}, (err: Error, data: string[][]) => {
            if (err) reject(err)
            resolve(data)
          })
        })
      }))
        .filter((process: string[]) => process[0].match(/project64/i))
        .map(process =>
          new Promise<string[]>((resolve, reject) => {
            const tasklist = spawn('tasklist', ['/FI', `PID eq ${process[1]}`, '/FO', 'CSV', '/NH', '/V'])
            let stdout = ''
            tasklist.stdout.on('data', data => {
              stdout += data.toString()
            })
            tasklist.stderr.on('data', data => {
              console.error(`tasklist stderr: ${data}`)
            })
            tasklist.on('close', code => {
              if (code !== 0) {
                console.warn(`tasklist process exited with code ${code}`)
              }
              parse(stdout, {}, (err: Error, data: string[][]) => {
                if (err) reject(err)
                if (data.length === 0) reject(new Error(`tasklist couldn't find process with PID ${process[1]}`))
                resolve(data[0])
              })
            })
          })
        )))
        .map((process: string[]) => ({
          name: process[0],
          pid: parseInt(process[1]),
          windowName: process[8]
        }))
      if (!this.mounted) return
      if (process.env.NODE_ENV === 'development') {
        emulators.push({
          name: 'Fake Emulator',
          pid: 0,
          windowName: 'Fake Super Mario - Project64'
        })
      }
      this.setState({
        emulators
      })
    } catch (err) {
      this.setState({
        warning: `Scanning for emulator failed:\n\n${err}`
      })
    }
  }

  private async onSelectEmulator (emulator: FilteredEmulator): Promise<void> {
    this.setState({
      loading: true
    })
    setTimeout(() => {
      connector.createEmulatorConnection({
        processId: emulator.pid,
        characterId: this.props.characterId,
        inGameChatEnabled: false
      })
      this.props.dispatch(isConnectedToEmulator(true))
      this.props.dispatch(setEmulatorError())
      this.props.dispatch(push('/browse'))
    }, 50)
    setTimeout(() => {
      if (!this.mounted) return
      this.setState({
        loading: false,
        warning: 'Could not inject emulator.\nDid you start Super Mario 64 (USA)?\nYou might have to start Net64+ as administrator.'
      })
    }, TIMEOUT)
  }

  private renderEmulators (emulators: FilteredEmulator[]): JSX.Element[] {
    const li: React.CSSProperties = {
      margin: '10px 0',
      lineHeight: '40px',
      width: '80%',
      padding: '8px',
      boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)',
      borderRadius: '6px',
      backgroundColor: 'rgb(212, 221, 165)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
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
              iconSrcHover='dark'
              styles={{
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

  public render (): JSX.Element {
    const { emulators, loading, warning } = this.state
    const styles: React.CSSProperties = {
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
      }
    }
    return (
      <div style={styles.main} className='scroll'>
        {
          warning &&
          <WarningPanel warning={warning} />
        }
        {
          !emulators || emulators.length === 0
            ? <div>Scanning for running emulators...</div>
            : <div style={styles.ul}>
              { this.renderEmulators(emulators) }
              {
                loading &&
                <ProgressSpinner />
              }
            </div>
        }
      </div>
    )
  }
}
export const EmulatorView = connect((state: State) => ({
  characterId: state.save.appSaveData.character,
  emuChat: state.save.appSaveData.emuChat,
  error: state.emulator.error
}))(View)
