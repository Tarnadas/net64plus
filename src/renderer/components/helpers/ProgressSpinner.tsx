import './ProgressSpinner.scss'

import * as React from 'react'

interface ProgressSpinnerProps {
  inline?: boolean
}

export class ProgressSpinner extends React.PureComponent<ProgressSpinnerProps> {
  public render (): JSX.Element {
    const { inline } = this.props
    return (
      <div className={`progress-spinner-wrapper${inline ? ' progress-spinner-wrapper-inline' : ''}`}>
        <div className='progress-spinner' />
      </div>
    )
  }
}
