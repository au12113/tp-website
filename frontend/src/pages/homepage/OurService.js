import React from 'react'
import '../../components/css/animation.css'

import './ourService.css'

class OurService extends React.Component {
  render () {
    return (
      <div id="service-container" className="container-fluid">
        <div className="row m-0">
          <div className="col-12 col-lg-6 d-flex justify-content-center my-2 my-lg-0">
            <button
              type="button"
              className="btn btn-tangpark btn-lg btn-block"
              onClick={() => window.open('https://www.facebook.com/isuzutp', '_blank')}
            ><i className="bi bi-chat-right-text-fill mr-2" style={{ fontSize: '1.6rem' }} />สอบถามข้อมูล
            </button>
          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-center my-2 my-lg-0">
            <button
              type="button"
              className="btn btn-tangpark btn-lg btn-block"
              onClick={() => window.open('https://lin.ee/4Zd0dcL', '_blank')}
            ><i className="bi bi-tools mr-2" style={{ fontSize: '1.5rem' }} />นัดรับบริการ
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default OurService
