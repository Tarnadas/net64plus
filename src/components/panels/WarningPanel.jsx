import React from 'react'

export default class WarningPanel extends React.PureComponent {
  render () {
    const warning = this.props.warning
    const styles = {
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
