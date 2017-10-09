import React from 'react'
import {
  Link
} from 'react-router-dom'

export default class NavigationButton extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      hover: false
    }
    this.onClick = this.onClick.bind(this)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
  }
  onClick () {
    try {
      if (this.props.link && this.props.link.charAt(0) === '/') {
        ga('send', 'pageview', {
          page: this.props.link
        })
      }
    } catch (err) {}
    this.props.onClick()
  }
  onMouseEnter () {
    this.setState({
      hover: true
    })
  }
  onMouseLeave () {
    this.setState({
      hover: false
    })
  }
  render () {
    const hover = this.state.hover
    const styles = {
      button: {
        width: 'auto',
        height: '40px',
        minHeight: '40px',
        lineHeight: '40px',
        backgroundColor: hover ? '#d19b05' : 'rgba(255,229,0,0.7)',
        boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
        cursor: 'pointer',
        overflow: 'hidden'
      },
      icon: {
        margin: '4px',
        width: '32px',
        height: '32px',
        float: 'left',
        padding: '4px'
      },
      img: {
        width: '100%',
        height: '100%'
      },
      text: {
        color: '#323245',
        float: 'left',
        width: 'auto',
        paddingRight: '5px'
      }
    }
    const content = (
      <div style={{ width: '100%' }}>
        <div style={styles.icon}>
          <img style={styles.img} src={this.props.iconSrc} />
        </div>
        <div style={styles.text}>
          { this.props.text }
        </div>
      </div>
    )
    return (
      <div style={styles.button} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.onClick}>
        {
          this.props.blank ? (
            <a href={this.props.link} target='_blank'>
              { content }
            </a>
          ) : (
            <Link to={this.props.link}>
              { content }
            </Link>
          )
        }
      </div>
    )
  }
}
