import React from 'react'

import { HomepageCarousel } from '../../components'
import OurService from './OurService'
import HighlightProductList from './HighLightProductList'
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

  renderProductList () {
    if (this.state.products.length > 0) {
      return (
        <HighlightProductList
          list={this.state.products}
        />
      )
    } else {
      return (
        'Loading'
      )
    }
  }

  render () {
    return (
      <div>
        <HomepageCarousel />
        <OurService />
        {this.renderProductList()}
      </div>
    )
  }
}

export default Homepage
