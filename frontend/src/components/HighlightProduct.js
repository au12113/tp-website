import React from 'react'
import { Link } from 'react-router-dom'

import './css/highlight-products.css'

class HighlightProduct extends React.Component {
    getLogoSrc = (series, special = null) => {
      return process.env.PUBLIC_URL + '/img/products/' + series + (special !== null ? `/${special}` : '') + '/logo.svg'
    }

    getCoverSrc = (series, special = null) => {
      return process.env.PUBLIC_URL + '/img/products/' + series + (special !== null ? `/${special}` : '') + '/cover.png'
    }

    isTooLong = (x) => {
      if (x.length > 10) {
        return true
      } else {
        return false
      }
    }

    render () {
      const { webCategory, min } = this.props.data
      return (
            <div className="col-12">
                <div className={`row d-flex ${this.props.index % 2 === 0 ? 'flex-row' : 'flex-row-reverse reverse'} background-container py-4`}>
                    <div className="col-12 col-lg-6 highlight-wrapper">
                        <img src={this.getCoverSrc(webCategory)} alt={webCategory} className="zoom" style={{ height: '18em', width: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className="col-12 col-lg-6 d-flex h-100 justify-content-center my-auto">
                        <div className="align-middle">
                            <div className="row d-flex justify-content-center align-middle px-3 px-lg-2" >
                                <Link
                                    className={`d-flex flex-column ${this.isTooLong(webCategory) ? '' : 'flex-xl-row'} justify-content-center align-items-baseline`}
                                    to={`${process.env.PUBLIC_URL + '/product/' + webCategory}`}
                                >
                                    <img src={this.getLogoSrc(webCategory)} alt="series" className="series-name" />
                                    <span className="logo-name mx-auto mx-xl-2">{webCategory.toUpperCase()}</span>
                                </Link>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-12 col-lg-12 px-3 py-3 my-auto price-card">
                                    <p className="mb-0 mb-lg-1 d-flex justify-content-center align-items-baseline" style={{ fontSize: 'inherit' }}>
                                        <span style={{ fontSize: 'inherit' }}>เริ่มต้นที่</span>
                                        <span className="product-price mx-2">
                                            {min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.-
                                        </span>
                                    </p>
                                    <div className="d-flex mt-2 justify-content-center">
                                        <Link to={`${process.env.PUBLIC_URL + '/product/' + webCategory}`}>
                                            <button type="button" className="btn btn-dark">รายละเอียด</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      )
    }
}

export default HighlightProduct
