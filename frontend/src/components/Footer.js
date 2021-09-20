import React from 'react'

import logo from '../img/Tangpark-logo.png'
import lineLogo from '../img/line-logo.png'
import fbLogo from '../img/fb-logo.png'
import './css/footer.css'

const Footer = () => {
  return (
        <div id="footer" className="container-fluid bg-dark">
            <div className="row d-flex">
                <div className="col-12 col-lg-9">
                    <div className="row mt-3 px-3 mr-0 align-items-center">
                        <img
                            src={logo}
                            className="img-fluid"
                            alt=""
                            loading="lazy" />
                        <div className="ml-2 ml-lg-4 footer-address">
                            <span>กลุ่มอีซูซุตังปักอุบล</span><br />
                            <span>466 ถ.ชยางกูร ต.ในเมือง </span><br />
                            <span>อ.เมือง จ.อุบลราชธานี 34000</span>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-3 ml-lg-0 mb-2 justify-content-lg-end">
                    <div className="row pl-3 mt-2 mr-0">
                        <a href="https://www.facebook.com/isuzutp" target="_blank" rel="noopener noreferrer"><img src={fbLogo} alt="" height="40px" width="40px" /></a>
                        <span className="d-flex pl-2 align-items-center white-link"><a href="https://www.facebook.com/isuzutp" target="_blank" rel="noopener noreferrer">กลุ่มอีซูซุตังปักอุบล</a></span>
                    </div>
                    <div className="row pl-3 mt-2 mr-0">
                            <a href="https://www.facebook.com/IsuzuTPTruck" target="_blank" rel="noopener noreferrer"><img src={fbLogo} alt="" height="40px" width="40px" /></a>
                            <span className="d-flex pl-2 align-items-center white-link">
                                <a href="https://www.facebook.com/IsuzuTPTruck" target="_blank" rel="noopener noreferrer">รถบรรทุกกลุ่มอีซูซุตังปักอุบล</a>
                            </span>
                    </div>
                    <div className="row pl-3 mt-2 mr-0">
                        <a href="https://lin.ee/4Zd0dcL" target="_blank" rel="noopener noreferrer">
                            <img src={lineLogo} alt="" height="40px" width="40px" /></a>
                        <span className="d-flex pl-2 align-items-center white-link">
                            <a href="https://lin.ee/4Zd0dcL" target="_blank" rel="noopener noreferrer">กลุ่มอีซูซุตังปักอุบล</a></span>
                    </div>
                </div>
            </div>

        </div>
  )
}

export default Footer
