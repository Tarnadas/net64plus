import './SnackbarPanel.scss'

import * as React from 'react'

interface SnackBarPanelProps {
  message: string | null
}

export class SnackbarPanel extends React.PureComponent<SnackBarPanelProps> {
  public render (): JSX.Element {
    const { message } = this.props
    return (
      <div className='snackbar-panel'>
        { message }
      </div>
    )
  }
}
