import './ProgressSpinner.scss'

import * as React from 'react'

export class ProgressSpinner extends React.PureComponent {
  public render (): JSX.Element {
    return (
      <div className='progress-spinner-wrapper'>
        <div className='progress-spinner' />
      </div>
    )
  }
}
