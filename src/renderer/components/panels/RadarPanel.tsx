import './RadarPanel.scss'

import * as React from 'react'

import { Position, Player } from '../../../models/Emulator.model'

interface RadarPanelProps {
  self: Player
  players: (Player | null)[]
}

const RADIUS = 90
const STROKE_WIDTH = 2
const FILL = '#eee'

export class RadarPanel extends React.PureComponent<RadarPanelProps> {
  public render (): JSX.Element {
    const { self, players } = this.props
    return (
      <div className='radar-panel'>
        <svg width={RADIUS * 2} height={RADIUS * 2}>
          <g>
            <circle cx={RADIUS} cy={RADIUS} fill={FILL} r={RADIUS} stroke="#000" strokeWidth={STROKE_WIDTH} />
            <circle cx={RADIUS} cy={RADIUS} fill={FILL} r={RADIUS * 2 / 3} stroke="#000" strokeWidth={STROKE_WIDTH} />
            <circle cx={RADIUS} cy={RADIUS} fill={FILL} r={RADIUS / 3} stroke="#000" strokeWidth={STROKE_WIDTH} />
            <line stroke="#000" strokeWidth={STROKE_WIDTH} x1="0" x2={RADIUS * 2} y1={RADIUS} y2={RADIUS} />
            <line stroke="#000" strokeWidth={STROKE_WIDTH} x1={RADIUS} x2={RADIUS} y1="0" y2={RADIUS * 2} />
          </g>
        </svg>
      </div>
    )
  }
}
