import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../assets/img/Tangpark-logo.webp'
import Hamburger from './Hamburger'
import MobileSidebar from './MobileSidebar'

import './css/header.css'

class Header extends React.Component {
  state = { miniHeader: false, showMenu: false }

  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  onClickHamburger = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  handleScroll = (event) => {
    if (window.scrollY > (this.state.miniHeader ? 435 : 480) && !this.state.miniHeader) {
      this.setState({ miniHeader: true })
    }
    if (window.scrollY <= (this.state.miniHeader ? 435 : 480) && this.state.miniHeader) {
      this.setState({ miniHeader: false })
    }
  }

  render () {
    return (
      <nav className={`header-container d-flex sticky-top ${this.state.miniHeader ? 'mini-nav' : ''}`}>
        <NavLink to="/#">
          <div className="flex-grow-1">
            <img
              src={logo}
              className={`d-inline-block header-logo ${this.state.miniHeader ? 'mini' : ''}`}
              alt="อีซูซุตังปัก"
              loading="lazy"
            />
          </div>
        </NavLink>
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
