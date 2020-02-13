import './RadarPanel.scss'

import * as React from 'react'

import { Position, Player, CHARACTER_IMAGES } from '../../../models/Emulator.model'
import { connect } from 'react-redux'
import { State } from '../../../models/State.model'

interface RadarPanelProps {
  playerId: number | null
  self: Player
  players: (Player | null)[]
}

interface RadarPanelState {
  viewDistance: number
}

const RADIUS = 90
const DEFAULT_VIEW_DISTANCE = 0x200
const MIN_VIEW_DISTANCE = 0x80
const MAX_VIEW_DISTANCE = 0x400
const VIEW_DISTANCE_STEP = 0x20
const STROKE_WIDTH = 2
const FILL = '#eee'
const STROKE = 'rgba(0, 0, 0, 0.3)'
const ICON_SIZE = 18

class Panel extends React.PureComponent<RadarPanelProps, RadarPanelState> {
  constructor (props: RadarPanelProps) {
    super(props)
    this.state = {
      viewDistance: DEFAULT_VIEW_DISTANCE
    }
    this.handleSetViewDistance = this.handleSetViewDistance.bind(this)
    this.renderPlayers = this.renderPlayers.bind(this)
  }

  private handleSetViewDistance (event: React.ChangeEvent<HTMLInputElement>): void {
    let value = Number(event.target.value)
    if (value > MAX_VIEW_DISTANCE) {
      value = MAX_VIEW_DISTANCE
    } else if (value < MIN_VIEW_DISTANCE) {
      value = MIN_VIEW_DISTANCE
    }
    this.setState({
      viewDistance: value
    })
  }

  private renderPlayers (
    playerId: number | null,
    selfPos: Position,
    viewDistance: number,
    players: (Player | null)[]
  ): JSX.Element {
    const rotation = selfPos.rotation * 2 * Math.PI / 0xFFFF
    const rotSin = Math.sin(rotation)
    const rotCos = Math.cos(rotation)
    return <>
      {
        players
          .filter((_, index) => index !== playerId)
          .filter(player => !!player)
          .filter(player => !!player!.position)
          .map((player, index) => {
            const x = this.normalize(rotCos * player!.position!.x - rotSin * player!.position!.y, viewDistance)
            const y = this.normalize(rotSin * player!.position!.x + rotCos * player!.position!.y, viewDistance)
            return <div
              key={player!.username || index}
              className='radar-panel-icon-wrapper'
              style={{
                top: RADIUS - y - ICON_SIZE / 2,
                left: RADIUS - x - ICON_SIZE / 2,
                width: ICON_SIZE,
                height: ICON_SIZE
              }}
            >
              <img
                className='radar-panel-icon'
                src={`img/${CHARACTER_IMAGES[player!.characterId || 0]}`}
              />
              <span className='radar-panel-label'>{ player!.username }</span>
            </div>
          })

      }
    </>
  }

  private normalize (val: number, viewDistance: number): number {
    return val * RADIUS / viewDistance
  }

  public render (): JSX.Element {
    const { playerId, self, players } = this.props
    const { viewDistance } = this.state
    let playersMock: (Player | null)[]
    if (process.env.NODE_ENV === 'development') {
      playersMock = [ ...players ]
      playersMock[2] = {
        characterId: 2,
        username: 'Player 2',
        position: {
          x: 0x100,
          y: 0x100,
          rotation: 0
        }
      }
      playersMock[4] = {
        characterId: 4,
        username: 'Player 4',
        position: {
          x: -0x80,
          y: 0x1d0,
          rotation: 0
        }
      }
      playersMock[7] = {
        characterId: 7,
        username: 'Player 7',
        position: {
          x: 0x50,
          y: -0xf0,
          rotation: 0
        }
      }
    }
    return (
      <div className='radar-panel'>
        <svg width={RADIUS * 2} height={RADIUS * 2}>
          <g>
            <circle cx={RADIUS} cy={RADIUS} fill={FILL} r={RADIUS} stroke={STROKE} strokeWidth={STROKE_WIDTH} />
            <circle cx={RADIUS} cy={RADIUS} fill={FILL} r={RADIUS * 2 / 3} stroke={STROKE} strokeWidth={STROKE_WIDTH} />
            <circle cx={RADIUS} cy={RADIUS} fill={FILL} r={RADIUS / 3} stroke={STROKE} strokeWidth={STROKE_WIDTH} />
            <line stroke={STROKE} strokeWidth={STROKE_WIDTH} x1="0" x2={RADIUS * 2} y1={RADIUS} y2={RADIUS} />
            <line stroke={STROKE} strokeWidth={STROKE_WIDTH} x1={RADIUS} x2={RADIUS} y1="0" y2={RADIUS * 2} />
          </g>
        </svg>
        { self.position && this.renderPlayers(playerId, self.position, viewDistance, process.env.NODE_ENV === 'development' ? playersMock! : players) }
        <input
          className='radar-panel-range'
          type='range'
          min={MIN_VIEW_DISTANCE}
          max={MAX_VIEW_DISTANCE}
          value={viewDistance}
          step={VIEW_DISTANCE_STEP}
          onChange={this.handleSetViewDistance}
        ></input>
      </div>
    )
  }
}
export const RadarPanel = connect((state: State) => ({
  playerId: state.connection.playerId
}))(Panel)
