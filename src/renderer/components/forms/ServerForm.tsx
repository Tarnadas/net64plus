import './ServerForm.scss'

import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import { SMMButton } from '../buttons/SMMButton'
import { State } from '../../../models/State.model'

interface ServerFormProps {
  dispatch: Dispatch<State>
  onSubmit: () => void
}

interface ServerFormState {
  name: string
  description: string
  gamemode: number
  enableGamemodeVote: boolean
  passwordRequired: boolean
  password?: string
  port: number
  enableWebHook: boolean
}

class Form extends React.PureComponent<ServerFormProps, ServerFormState> {
  constructor (props: ServerFormProps) {
    super(props)
    this.state = {
      name: '',
      description: '',
      gamemode: 1,
      enableGamemodeVote: true,
      passwordRequired: false,
      port: 3678,
      enableWebHook: false
    }
    this.onNameChange = this.onNameChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onPortChange = this.onPortChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  private onKeyPress ({ key }: React.KeyboardEvent<any>): void {
    if (key === 'Enter') {
      this.props.onSubmit()
    }
  }

  private onNameChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
    try {
      this.setState({
        name: target.value
      })
    } catch (err) {}
  }

  private onDescriptionChange ({ target }: React.ChangeEvent<HTMLInputElement>): void {
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

  public render (): JSX.Element {
    const { onSubmit } = this.props
    const {
      name,
      description,
      gamemode,
      enableGamemodeVote,
      passwordRequired,
      password,
      port,
      enableWebHook
    } = this.state
    return (

      <div className='server-form'>
        <div>
          <div>Name:</div>
          <input
            value={name}
            onChange={this.onNameChange}
            onKeyPress={this.onKeyPress}
          />
        </div>
        <div>
          <div>Description:</div>
          <input
            value={description}
            onChange={this.onDescriptionChange}
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
        <SMMButton
          text='Create Server'
          iconSrc='img/net64.svg'
          onClick={onSubmit}
        />
      </div>
    )
  }
}
export const ServerForm = connect()(Form)
