import React from 'react'
import { NavLink } from 'react-router-dom'

import './css/mobile-sidebar.css'

class MobileSidebar extends React.Component {
  onClickNav = () => {
    this.props.onClick()
  }

  render () {
    return (
      <div id='mobile-sidebar' className="d-lg-none">
        <div className='d-flex flex-column'>
          <NavLink to="/#" onClick={this.onClickNav}>หน้าแรก</NavLink>
          {/* <NavLink to="/products" onClick={this.onClickNav}>รุ่นรถ</NavLink>
          <NavLink to="/blog" onClick={this.onClickNav}>บทความ</NavLink> */}
          <NavLink to="/contact" onClick={this.onClickNav}>ติดต่อ</NavLink>
        </div>
      </div>
    )
  }
}

export default MobileSidebar
