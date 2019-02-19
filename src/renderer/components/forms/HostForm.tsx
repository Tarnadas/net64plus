import './HostForm.scss'

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { SMMButton } from '../buttons/SMMButton'
import { State } from '../../../models/State.model'
import { saveServerOptions } from '../../actions/save'

const gameModes = {
  1: 'Default',
  2: 'Third Person Shooter',
  3: 'Interactionless',
  4: 'Prop Hunt',
  5: 'Boss Rush',
  6: 'Tag',
  8: 'Wario Ware'
}

interface ServerFormProps extends ServerFormState {
  dispatch: Dispatch<State>
  onSubmit: () => void
}

interface ServerFormState {
  name: string
  description: string
  gamemode: number
  enableGamemodeVote: boolean
  passwordRequired: boolean
  password: string
  port: number
  enableWebHook: boolean
  apiKey: string
}

class Form extends React.PureComponent<ServerFormProps, ServerFormState> {
  private readonly debounceTime = 2000

  private debounceTimer?: NodeJS.Timer

  constructor (props: ServerFormProps) {
    super(props)
    this.state = {
      name: props.name,
      description: props.description,
      gamemode: props.gamemode,
      enableGamemodeVote: props.enableGamemodeVote,
      passwordRequired: props.passwordRequired,
      password: props.password,
      port: props.port,
      enableWebHook: props.enableWebHook,
      apiKey: props.apiKey
    }
    this.saveServerOptions = this.saveServerOptions.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onNameChange = this.onNameChange.bind(this)
    this.onPortChange = this.onPortChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onEnableGamemodeVoteChange = this.onEnableGamemodeVoteChange.bind(this)
    this.onGamemodeChange = this.onGamemodeChange.bind(this)
    this.onPasswordRequiredChange = this.onPasswordRequiredChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onEnableWebHookChange = this.onEnableWebHookChange.bind(this)
    this.onApiKeyChange = this.onApiKeyChange.bind(this)
  }

  public componentDidUpdate (_prevProps: ServerFormProps, prevState: ServerFormState): void {
    if (prevState === this.state) return
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
    this.debounceTimer = setTimeout(this.saveServerOptions, this.debounceTime)
  }

  public componentWillUnmount (): void {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
    this.saveServerOptions()
  }

  private saveServerOptions (): void {
    const serverOptions = Object.assign({}, this.state)
    delete (serverOptions as any).apiKey
    this.props.dispatch(saveServerOptions(serverOptions, this.state.apiKey))
  }

  private onKeyPress ({ key }: React.KeyboardEvent<any>): void {
    if (key === 'Enter') {
      this.onSubmit()
    }
  }

  private onSubmit (): void {
    this.saveServerOptions()
    setTimeout(() => this.props.onSubmit())
  }

  private onNameChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
    try {
      this.setState({
        name: target.value
      })
    } catch (err) {}
  }

  private onPortChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
    try {
      this.setState({
        port: parseInt(String(target.value).replace(/[^0-9]/g, ''))
      })
    } catch (err) {}
  }

  private onDescriptionChange ({ target }: React.ChangeEvent<HTMLTextAreaElement>): void {
    try {
      this.setState({
        description: target.value
      })
    } catch (err) {}
  }

  private onEnableGamemodeVoteChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
    try {
      this.setState({
        enableGamemodeVote: target.checked
      })
    } catch (err) {}
  }

  private onGamemodeChange ({ target }: React.ChangeEvent<HTMLSelectElement>): void {
    try {
      this.setState({
        gamemode: parseInt(target.value)
      })
    } catch (err) {}
  }

  private onPasswordRequiredChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
    try {
      this.setState({
        passwordRequired: target.checked
      })
    } catch (err) {}
  }

  private onPasswordChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
    try {
      this.setState({
        password: target.value
      })
    } catch (err) {}
  }

  private onEnableWebHookChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
    try {
      this.setState({
        enableWebHook: target.checked
      })
    } catch (err) {}
  }

  private onApiKeyChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
    try {
      this.setState({
        apiKey: target.value
      })
    } catch (err) {}
  }

  private getGamemodeOptions (): JSX.Element[] {
    return Object.entries(gameModes).map(([ key, gamemode ]) => (
      <option
        key={key}
        value={key}
      >
        { gamemode }
      </option>
    ))
  }

  public render (): JSX.Element {
    const {
      name,
      description,
      gamemode,
      enableGamemodeVote,
      passwordRequired,
      password,
      port,
      enableWebHook,
      apiKey
    } = this.state
    return (
      <div className='host-form'>
        <div className='host-form-wrapper host-form-field'>
          <div>
            <div>Name:</div>
            <input
              value={name}
              onChange={this.onNameChange}
              onKeyPress={this.onKeyPress}
            />
          </div>
          <div>
            <div>Port:</div>
            <input
              value={port}
              onChange={this.onPortChange}
              onKeyPress={this.onKeyPress}
            />
          </div>
        </div>
        <div className='host-form-description host-form-field'>
          <div>Description:</div>
          <textarea
            value={description}
            onChange={this.onDescriptionChange}
          />
        </div>
        <div className='host-form-wrapper host-form-field'>
          <div>
            <div>Gamemode Voting:</div>
            <input
              type='checkbox'
              checked={enableGamemodeVote}
              onChange={this.onEnableGamemodeVoteChange}
            />
          </div>
          <div>
            <div>Gamemode:</div>
            <select
              value={gamemode}
              onChange={this.onGamemodeChange}
            >
              {
                this.getGamemodeOptions()
              }
            </select>
          </div>
        </div>
        <div className='host-form-wrapper host-form-field'>
          <div>
            <div>Password Required:</div>
            <input
              type='checkbox'
              checked={passwordRequired}
              onChange={this.onPasswordRequiredChange}
            />
          </div>
          <div>
            <div>Password:</div>
            <input
              type='password'
              value={password}
              onChange={this.onPasswordChange}
              onKeyPress={this.onKeyPress}
            />
          </div>
        </div>
        <div className='host-form-wrapper host-form-field'>
          <div>
            <div>Public:</div>
            <input
              type='checkbox'
              checked={enableWebHook}
              onChange={this.onEnableWebHookChange}
            />
          </div>
          <div>
            <div>Api Key:</div>
            <input
              type='password'
              value={apiKey}
              onChange={this.onApiKeyChange}
              onKeyPress={this.onKeyPress}
            />
          </div>
        </div>
        <div className='host-form-button'>
          <SMMButton
            text='Create Server'
            iconSrc='img/net64.svg'
            onClick={this.onSubmit}
            styles={{
              button: {
                margin: '0px'
              }
            }}
          />
        </div>
      </div>
    )
  }
}
export const HostForm = connect((state: State) => ({
  name: state.save.appSaveData.serverOptions.name,
  description: state.save.appSaveData.serverOptions.description,
  gamemode: state.save.appSaveData.serverOptions.gamemode,
  enableGamemodeVote: state.save.appSaveData.serverOptions.enableGamemodeVote,
  passwordRequired: state.save.appSaveData.serverOptions.passwordRequired,
  password: state.save.appSaveData.serverOptions.password,
  port: state.save.appSaveData.serverOptions.port,
  enableWebHook: state.save.appSaveData.serverOptions.enableWebHook,
  apiKey: state.save.appSaveData.apiKey
}))(Form)
