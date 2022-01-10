import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../assets/img/Tangpark-logo.webp'
import Hamburger from './Hamburger'
import MobileSidebar from './MobileSidebar'

import './css/header.css'

class Header extends React.Component {
  state = { showMenu: false }

  onClickHamburger = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render () {
    return (
      <nav className='header-container sticky-top overflow-hidden d-flex flex-row'>
        <div className="header-logo-container d-flex align-items-center">
          <NavLink to="/#">
            <img
              src={logo}
              className='d-inline-block header-logo'
              alt="อีซูซุตังปัก"
              loading="lazy"
            />
          </NavLink>
        </div>
        <div className="d-none d-lg-flex flex-grow-1 justify-content-lg-end">
          <ul className="navbar-nav flex-row">
            <li className="nav-item">
              <NavLink className="nav-NavLink" activeClassName="active" to="/home">
                <div className="navLink-container d-flex justify-content-lg-center align-items-lg-center">
                  <h5 className="menu-text">หน้าแรก</h5>
                </div>
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-NavLink" to="/products">
                <h5 className="menu-text">รุ่นรถ</h5>
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-NavLink" to="/blog">
                <h5 className="menu-text">บทความ</h5>
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-NavLink" activeClassName="active" to="/contact">
                <div className="navLink-container navLink-container d-flex justify-content-lg-center align-items-lg-center">
                  <h5 className="menu-text">ติดต่อ</h5>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
        <Hamburger onClick={this.onClickHamburger} open={this.state.showMenu} />
        {this.state.showMenu ? <MobileSidebar onClick={this.onClickHamburger} /> : ''}
      </nav>
    )
  }
}

export default Header
