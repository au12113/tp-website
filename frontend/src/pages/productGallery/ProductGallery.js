import React from 'react'
import { ProductList } from '../../components'
import TPBackend from '../../apis/tpBackend'

class ProductGallery extends React.Component {
  state = { products: [] }
  componentDidMount () {
    this.getProducts()
  }

  getProducts = async () => {
    const response = await TPBackend.get('/products')
    this.setState({ products: response.data })
  }

  render () {
    if (this.state.products.length > 0) {
      return (<div className="container">
        <div className="col-12">
          <img src={`${process.env.PUBLIC_URL}/img/header.png`} className="product" alt="" height="80rex" />
        </div>
        <ProductList listName="pickup-list" products={this.state.products[0]} />
        <ProductList listName="suv-list" products={this.state.products[1]} />
      </div>
      )
    } else {
      return (
        <div className="container">
          <div className="col-12">
            <img src={`${process.env.PUBLIC_URL}/img/header.png`} className="product" alt="" height="80rex" />
          </div>
          Loading
        </div>
      )
    }
  }
}

export default ProductGallery
