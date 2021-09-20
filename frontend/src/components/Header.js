import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../img/Tangpark-logo.png'
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
            <nav className={`navbar bg-dark sticky-top ${this.state.miniHeader ? 'mini-nav' : ''}`}>
                <NavLink className="navbar-brand" to="/#">
                    <div className="d-flex flex-grow-1">
                        <img
                            src={logo}
                            className={`d-inline-block align-top header-logo ${this.state.miniHeader ? 'mini' : ''}`}
                            style={{ margin: 'auto' }}
                            alt=""
                            loading="lazy" />
                        <h4 className="text-light d-none d-lg-block">อีซูซุตังปักอุบลกรุ๊ป</h4>
                    </div>
                </NavLink>
                <div className="bd-highlight d-none d-lg-block">
                    <ul className="navbar-nav mr-auto" style={{ flexDirection: 'row' }}>
                        <li className="nav-item">
                            <NavLink className="nav-NavLink" activeClassName="active" to="/">
                                <h5 className="text-light">หน้าแรก</h5>
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <NavLink className="nav-NavLink" to="/products">
                                <h5 className="text-light">รุ่นรถ</h5>
                            </NavLink>
                        </li> */}
                        {/* <li className="nav-item">
                            <NavLink className="nav-NavLink" to="/blog">
                                <h5 className="text-light">บทความ</h5>
                            </NavLink>
                        </li> */}
                        <li className="nav-item">
                            <NavLink className="nav-NavLink" to="/contact">
                                <h5 className="text-light">ติดต่อ</h5>
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
