import React from 'react'

import { logo, facebook, line, youtube, backToTop } from '../assets/img'
import './css/footer.css'

const Footer = () => {
  const scrollFn = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    <div id="footer" className="container-fluid">
      <div className='footer-content row d-flex'>
        <div className="col-12 col-lg-8 px-0">
          <div className="row px-0 mx-0 align-items-center">
            <img
              src={logo}
              className="footer-logo"
              alt="อีซูซุตังปัก"
              loading="lazy" />
            <div className="ml-2 ml-lg-3 footer-address">
              <span>466 ถ.ชยางกูร ต.ในเมือง อ.เมือง จ.อุบลราชธานี 34000</span><br />
              <span>466 CHAYANGKUL ROAD, MUANG DISTRICT, UBONRATCHATHANI 34000</span><br />
              <span>โทร. 063-525-0789  แฟกซ์ 045-313370</span><br />
              <span>E-mail: isuzutpubon@gmail.com</span><br />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4 social-link-container justify-self-end mx-0">
          <a className='d-flex flex-row mx-0 my-2' href="https://www.facebook.com/isuzutp" target="_blank" rel="noopener noreferrer">
            <img className="social-media-logo" src={facebook} />
            <span className="pl-4 my-auto white-link">กลุ่มอีซูซุตังปักอุบล</span>
          </a>
          <a className='d-flex flex-row mx-0 my-2' href="https://www.facebook.com/IsuzuTPTruck" target="_blank" rel="noopener noreferrer">
            <img className="social-media-logo" src={facebook} />
            <span className="pl-4 my-auto white-link">รถบรรทุกกลุ่มอีซูซุตังปักอุบล</span>
          </a>
          <a className='d-flex flex-row mx-0 my-2' href="https://lin.ee/4Zd0dcL" target="_blank" rel="noopener noreferrer">
            <img className="social-media-logo" src={line} />
            <span className="pl-4 my-auto white-link">กลุ่มอีซูซุตังปักอุบล</span>
          </a>
          <a className='d-flex flex-row mx-0 my-2' href="https://www.youtube.com/channel/UCQbg7lO-vS9ZZadTuIr5K7g" target="_blank" rel="noopener noreferrer">
            <img className="social-media-logo" src={youtube} />
            <span className="pl-4 my-auto white-link">กลุ่มอีซูซุตังปักอุบล</span>
          </a>
        </div>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center footer-copyright'>
        <span>สงวนลิขสิทธิ์ © 2022 กลุ่มอีซูซุตังปักอุบล</span>
      </div>
      <div className='d-flex flex-column justify-content-center align-items-center back-to-top'>
        <span onClick={scrollFn}>กลับไปด้านบน</span>
        <img className='back-to-top-icon' src={backToTop} onClick={scrollFn} />
      </div>
    </div>
  )
}

export default Footer
