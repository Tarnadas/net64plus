import './HotkeyButton.scss'

import * as React from 'react'

interface HotkeyButtonProps {
  onClick?: (target: HotkeyButton) => void
}

interface HotkeyButtonState {

}

export class HotkeyButton extends React.PureComponent<HotkeyButtonProps, HotkeyButtonState> {
  constructor (props: HotkeyButtonProps) {
    super(props)

  }
}