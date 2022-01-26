import React from 'react'

import PromotionBanner from '../../components/PromotionBanner'

// import { isDesktop } from '../../helpers/detectDevice'
import TPBackend from '../../apis/tpBackend'
import { salesBannerTitle } from '../../assets/img'
import { detailsButtonDim } from '../../assets/button'
import { isDesktop } from '../../helpers/detectDevice'
import './sub-banner.css'

class SalesBanner extends React.Component {
  state = { bannerList: [] }

  componentDidMount () {
    this.getBannerList()
  }

  getBannerList = async () => {
    const bannerList = await TPBackend.get('/banner/sales')
    this.setState({ bannerList: bannerList.data })
  }

  render () {
    if (this.state.bannerList.length > 0) {
      return (
        <div className='sub-banner-container'>
          <div className='d-flex'>
            <img
              className='sub-banner-title'
              src={salesBannerTitle}
            />
            <img
              className='d-none see-all-button'
              src={detailsButtonDim}
            />
          </div>
          <PromotionBanner isDesktop={isDesktop()} bannerList={this.state.bannerList} />
        </div>
      )
    } else {
      return ''
    }
  }
}

export default SalesBanner
