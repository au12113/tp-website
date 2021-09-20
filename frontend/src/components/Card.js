import React from 'react'
import { Link } from 'react-router-dom'

import './css/card.css'

class Card extends React.Component {
  render () {
    return (
      <div
        className={ `${this.props.hilight ? 'hilight' : ''} card card-background`}
        style={{ backgroundImage: `url(${this.props.backgroundImg})` }}
      >
        <div className="card-body">
          <Link to={ this.props.link }>
            <button className="btn btn-light card-button" >
              { this.props.buttonLabel }
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Card
