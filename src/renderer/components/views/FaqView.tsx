import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { SMMButton } from '../buttons/SMMButton'
import { setVersion } from '../../actions/save'
import { State } from '../../../models/State.model'

interface FaqViewProps {
  dispatch: Dispatch<State>
}

class View extends React.PureComponent<FaqViewProps> {
  constructor (public props: FaqViewProps) {
    super(props)
    this.onDone = this.onDone.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(setVersion(process.env.VERSION || ''))
  }
  onDone () {
    this.props.dispatch(push('/'))
  }
  render () {
    const styles: React.CSSProperties = {
      view: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#24997e',
        flex: '1 1 auto',
        color: '#000',
        alignItems: 'center',
        fontSize: '18px',
        overflow: 'auto',
        padding: '20px 40px'
      },
      text: {
        paddingLeft: '14px'
      },
      imgWrapper: {
        margin: '10px 16px'
      },
      img: {
        width: '100%'
      }
    }
    return (
      <div style={styles.view}>
        <h1>FAQ</h1>
        <SMMButton
          iconSrc='img/net64.svg'
          text='Got it!'
          onClick={this.onDone}
        />
        <h2 style={{marginTop: '40px'}}>Emulator settings</h2>
        <div style={styles.text}>
          Make sure your emulator settings match the green circles
        </div>
        <h3>Project64 1.6</h3>
        <div style={styles.imgWrapper}>
          <img style={styles.img} src='img/pj1.6_help1.png' />
        </div>
        <div style={styles.imgWrapper}>
          <img style={styles.img} src='img/pj1.6_help2.png' />
        </div>
        <h3>Project64 2.3</h3>
        <div style={styles.imgWrapper}>
          <img style={styles.img} src='img/pj2.3_help1.png' />
        </div>
        <div style={styles.imgWrapper}>
          <img style={styles.img} src='img/pj2.3_help2.png' />
        </div>
      </div>
    )
  }
}
export const FaqView = connect()(View)
