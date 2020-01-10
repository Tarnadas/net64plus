import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import { SortableContainer, SortableHandle, SortableElement } from 'react-sortable-hoc'

import { connector, gamepadManager } from '../..'
import { SMMButton } from '../buttons/SMMButton'
import { HotkeyButton } from '../buttons/HotkeyButton'
import { ToggleButton } from '../buttons/ToggleButton'
import { WarningPanel } from '../panels/WarningPanel'
import { setUsername, setCharacter, setEmuChat, setGlobalHotkeysEnabled, setHotkeyBindings, setGamepadId } from '../../actions/save'
import { State, ElectronSaveData } from '../../../models/State.model'
import { showSnackbar } from '../../actions/snackbar'

interface SettingsViewProps {
  dispatch: Dispatch<State>
  saveData: ElectronSaveData
  connectionError: string
}

interface SettingsViewState {
  username: string
  characterId: number
  emuChat: boolean
  globalHotkeysEnabled: boolean
  hotkeyBindings: { [shortcut: string]: string | undefined }
  characterCyclingOrder: Array<{characterId: number, on: boolean}>
  gamepadId: string | undefined
  warning: string
}

export const MIN_LENGTH_USERNAME = 3
export const MAX_LENGTH_USERNAME = 24

const CHARACTER_ICONS: { [characterId: number]: string } = {
  0: 'img/mario.png',
  1: 'img/luigi.png',
  2: 'img/yoshi.png',
  3: 'img/wario.png',
  4: 'img/peach.png',
  5: 'img/toad.png',
  6: 'img/waluigi.png',
  7: 'img/rosalina.png',
  8: 'img/sonic.png',
  9: 'img/knuckles.png',
  10: 'img/goomba.png',
  11: 'img/kirby.png',
}

class View extends React.PureComponent<SettingsViewProps, SettingsViewState> {

  private DragHandle = SortableHandle(() => <span>::::::&nbsp;</span>);

  private SortableItem = SortableElement(({iconSrc, on, cycleIndex}: {iconSrc: string, on: boolean, cycleIndex: number}) => {
    let styles: any = {
      icon: {
        padding: '4px',
        width: '40px',
        height: '40px',
        float: 'left',
        borderRadius: '4px',
      },
    }
    return (
      <ToggleButton
        on={on}
        onClick={(toggled) => this.onCharacterCyclingToggled({cycleIndex, toggled})}
      >
        <this.DragHandle />
        <img style={styles.icon} src={iconSrc} />
      </ToggleButton>
    )}
  );

  private SortableList = SortableContainer(({characterCyclingOrder}: {characterCyclingOrder: Array<{characterId: number, on: boolean}>}) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {characterCyclingOrder.map(({characterId, on}, index) => (
          <this.SortableItem key={index} index={index} cycleIndex={index} iconSrc={CHARACTER_ICONS[characterId]} on={on} />
        ))}
      </div>
    );
  });

  constructor (public props: SettingsViewProps) {
    super(props)
    this.state = {
      username: props.saveData.username,
      characterId: props.saveData.character,
      emuChat: props.saveData.emuChat,
      globalHotkeysEnabled: props.saveData.globalHotkeysEnabled,
      hotkeyBindings: props.saveData.hotkeyBindings,
      characterCyclingOrder: props.saveData.characterCylingOrder,
      gamepadId: props.saveData.gamepadId,
      warning: props.saveData.username ? '' : 'You must set a username'
    }
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onCharacterChange = this.onCharacterChange.bind(this)
    this.onEmuChatChange = this.onEmuChatChange.bind(this)
    this.onGlobalHotkeysChange = this.onGlobalHotkeysChange.bind(this)
    this.onHotkeyBindingChange = this.onHotkeyBindingChange.bind(this)
    this.onCharacterCyclingToggled = this.onCharacterCyclingToggled.bind(this)
    this.onCharacterCyclingOrderChange = this.onCharacterCyclingOrderChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }
  componentWillReceiveProps (nextProps: SettingsViewProps) {
    if (nextProps.saveData.character !== this.state.characterId) { // Update dropdown option menu
      this.setState({ characterId: nextProps.saveData.character })
    }
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
  onGlobalHotkeysChange (e: React.ChangeEvent<any>) {
    const globalHotkeysEnabled = e.target.checked
    this.setState({
      globalHotkeysEnabled
    })
  }
  onHotkeyBindingChange (shortcut: string, hotkey?: string) {
    const { hotkeyBindings } = this.state
    hotkeyBindings[shortcut] = hotkey
    this.setState({ hotkeyBindings })
  }
  onCharacterCyclingToggled ({cycleIndex, toggled} : {cycleIndex: number, toggled: boolean}) {
    const { characterCyclingOrder } = this.state
    characterCyclingOrder[cycleIndex].on = toggled
    this.setState({ characterCyclingOrder })
  }
  onCharacterCyclingOrderChange ({newIndex, oldIndex}: {newIndex: number, oldIndex: number}) {
    const { characterCyclingOrder } = this.state
    const oldItem = characterCyclingOrder.splice(oldIndex, 1)[0] // remove item from old index
    characterCyclingOrder.splice(newIndex, 0, oldItem) // reinsert item at new index
    this.setState({ characterCyclingOrder: characterCyclingOrder.slice() })
  }
  onSave () {
    const username = this.state.username.replace(/\W/g, '')
    const { characterCyclingOrder, hotkeyBindings, globalHotkeysEnabled, gamepadId } = this.state
    if (username.length < MIN_LENGTH_USERNAME) {
      this.setState({
        warning: 'Your username is too short'
      })
    } else {
      const { dispatch } = this.props
      connector.playerUpdate({ username, characterId: this.state.characterId })
      connector.changeHotkeyBindings({ hotkeyBindings, globalHotkeysEnabled })
      connector.changeCharacterCyclingOrder({ characterCyclingOrder })
      gamepadManager.selectedGamepad = gamepadManager.getConnectedGamepads().find((gamepad) => (!!gamepad ? gamepad.id : undefined) === gamepadId) || undefined
      dispatch(setUsername(username))
      dispatch(setCharacter(this.state.characterId))
      dispatch(setEmuChat(this.state.emuChat))
      dispatch(setGlobalHotkeysEnabled(globalHotkeysEnabled))
      dispatch(setHotkeyBindings(hotkeyBindings))
      dispatch(setGamepadId(gamepadId))
      dispatch(showSnackbar('Saved'))
    }
  }
  renderCharacterHotkeyButtons () {
    const buttons = []
    for (let i = 0; i < 12; i++) {
      buttons.push(<HotkeyButton
        key={i}
        shortcut={`${i}`}
        iconSrc={CHARACTER_ICONS[i]}
        hotkey={this.state.hotkeyBindings[`${i}`]}
        onClick={this.onHotkeyBindingChange}
        onRightClick={this.onHotkeyBindingChange}
      />)
    }
    return buttons;
  }
  render () {
    const { gamepadId, warning } = this.state
    const connectionError = this.props.connectionError
    const gamepads = gamepadManager.getConnectedGamepads()
    const styles: Record<string, React.CSSProperties> = {
      view: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: '1 0 auto',
        padding: '40px',
        backgroundColor: '#24997e',
        fontSize: '18px',
        overflow: 'auto',
        color: '#000'
      },
      setting: {
        width: '100%',
        display: 'flex'
      },
      flexCenter: {
        alignItems: 'center',
        justifyContent: 'center'
      },
      gap: {
        flex: '1 0 10px'
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

        <div style={styles.gap}></div>
        {
          warning &&
          <WarningPanel warning={warning} />
        }
        {
          connectionError &&
          <WarningPanel warning={connectionError} />
        }

        <div style={styles.gap}></div>
        <div style={styles.setting}>
          <div style={styles.label}>Username:</div>
          <input style={styles.input} value={this.state.username} onChange={this.onUsernameChange} />
        </div>

        <div style={styles.gap}></div>
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
            <option value='8'>Sonic</option>
            <option value='9'>Knuckles</option>
            <option value='10'>Goomba</option>
            <option value='11'>Kirby</option>
          </select>
        </div>

        <div style={styles.gap}></div>
        <div style={styles.setting}>
          <div style={styles.label}>Gamepad:</div>
          <select style={styles.input} value={!!gamepadId ? gamepadId : undefined} onChange={(e) => {
            this.setState({ gamepadId: e.target.value })
          }}>
            {
              gamepads && [
                <option key={-1} value={undefined}>None</option>
              ].concat(gamepads.filter((gamepad) => !!gamepad).map((gamepad, index) => (
                <option key={index} value={gamepad!.id}>{gamepad!.id}</option>
              )))
            }
          </select>
        </div>

        <div style={styles.gap}></div>
        <div style={styles.setting}>
          <div style={styles.label}>In-Game Chat View:</div>
          <input
            style={styles.checkBox}
            type='checkbox'
            checked={this.state.emuChat}
            onChange={this.onEmuChatChange}
          />
          <div style={styles.label}>Enable global character hotkeys:</div>
          <input
            style={styles.checkBox}
            type='checkbox'
            checked={this.state.globalHotkeysEnabled}
            onChange={this.onGlobalHotkeysChange}
          />
        </div>

        <div style={styles.gap}></div>
        <div>Character Hotkeys (right click to unassign):</div>

        <div style={styles.gap}></div>
        <div>
          {this.renderCharacterHotkeyButtons()}
        </div>

        <div style={styles.gap}></div>
        <div style={Object.assign({}, styles.setting, styles.flexCenter)}>
          <div style={Object.assign({}, styles.setting, styles.flexCenter, { flexDirection: 'column' })}>
            <div>Previous Character</div>
            <HotkeyButton
              shortcut={'previousCharacter'}
              hotkey={this.state.hotkeyBindings[`previousCharacter`]}
              onClick={this.onHotkeyBindingChange}
              onRightClick={this.onHotkeyBindingChange}
            />
          </div>
          <div style={Object.assign({}, styles.setting, styles.flexCenter, { flexDirection: 'column' })}>
            <div>Next Character</div>
            <HotkeyButton
              shortcut={'nextCharacter'}
              hotkey={this.state.hotkeyBindings[`nextCharacter`]}
              onClick={this.onHotkeyBindingChange}
              onRightClick={this.onHotkeyBindingChange}
            />
          </div>
        </div>

        <div style={styles.gap}></div>
        <div>Character Cycling Order (click to toggle, drag to reorder)</div>

        <div style={styles.gap}></div>
        <this.SortableList useDragHandle characterCyclingOrder={this.state.characterCyclingOrder} onSortEnd={this.onCharacterCyclingOrderChange} />

        <div style={styles.gap}></div>
        <SMMButton
          text='Unbind all'
          onClick={() => {
            this.setState({ hotkeyBindings: {} })
          }}
          styles={{
            subButton: {
              text: {
                textAlign: 'center',
                width: '100%'
              }
            }
          }}
        />

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
  connectionError: state.connection.error
}))(View)
