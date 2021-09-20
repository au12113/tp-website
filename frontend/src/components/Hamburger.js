import React from 'react'

import './css/hamburger.css'

class Hamburger extends React.Component {
    state = { open: false }

    componentDidUpdate (prevProps, prevState) {
      if (prevProps.open !== this.props.open) {
        this.setState({ open: this.props.open })
      }
    }

    onClick = () => {
      this.props.onClick()
      this.setState({ open: !this.state.open })
    }

    render () {
      return (
            <div className="hamburger d-lg-none" onClick={this.onClick}>
                <div className={`line line-top ${this.state.open ? 'open' : ''}`}></div>
                <div className={`line line-middle ${this.state.open ? 'open' : ''}`}></div>
                <div className={`line line-bottom ${this.state.open ? 'open' : ''}`}></div>
            </div>
      )
    }
}

export default Hamburger
