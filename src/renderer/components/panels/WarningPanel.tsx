import * as React from 'react'

interface WarningPanelProps {
  warning: string
}

export class WarningPanel extends React.PureComponent<WarningPanelProps> {
  render () {
    const warning = this.props.warning
    const styles: React.CSSProperties = {
      warningWrapper: {
        width: '100%'
      },
      warning: {
        color: '#a00003',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      warningImg: {
        height: '30px',
        marginRight: '20px'
      }
    }
    return (
      <div style={styles.warningWrapper}>
        {
          warning &&
          <div style={styles.warning}>
            <img style={styles.warningImg} src='img/warning.svg' />
            <div>{warning}</div>
          </div>
        }
      </div>
    )
  }
}
