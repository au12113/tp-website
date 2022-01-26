import React from 'react'

import HomepageCarousel from './HomepageCarousel'
import ProductType from './ProductType'
import SalesBanner from './SalesBanner'
import ServiceBanner from './ServiceBanner'
import ExpSharing from './ExpSharing'

import TPBackend from '../../apis/tpBackend'

class Homepage extends React.Component {
  state = { products: [] }

  componentDidMount () {
    this.getProducts()
  }

  getProducts = async () => {
    const response = await TPBackend.get('/products')
    this.setState({ products: response.data })
  }

  render () {
    return (
      <div>
        <HomepageCarousel />
        <ProductType />
        <SalesBanner />
        <ServiceBanner />
        <ExpSharing />
      </div>
    )
  }
}

export default Homepage
