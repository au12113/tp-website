import React from 'react'
import TPBackend from '../../apis/tpBackend'
import { CollapseTable } from '../../components'

import './productDetail.css'

class ProductDetail extends React.Component {
  state = { product: null }
  componentDidMount = () => {
    this.getProducDetail()
  }

  getProducDetail = async () => {
    const response = await TPBackend.get(`/product/${window.location.pathname.split('/').pop()}`)
    this.setState({ product: response.data })
  }

  renderSpecTable = () => {
    if (this.state.product !== null) {
      const specTable = this.state.product.subModels
      return specTable.map((spec) => {
        if (!['name', 'สี'].includes(spec.header)) {
          return (<CollapseTable data={spec} key={spec.header} />)
        } else {
          return ''
        }
      })
    } else {
      return 'Loading'
    }
  }

  render () {
    if (this.state.product) {
      return (
        <div className="container-fluid p-4 row justify-content-md-center">
          <div className="row w-75 mx-auto">
            <div className="col-12 col-lg-5">
              <img className="img-fluid" src={process.env.PUBLIC_URL + '/' + this.state.product.img} />
            </div>
            <div className="col-12 col-lg-7" >
              <h2>{this.state.product.serie}</h2>
            </div>
          </div>
          <div id="table-wrapper" className="col-12 col-lg-9 mx-0">
            <div id="table-scroll" className="mt-0">
              <table className="table mb-0 sticky-top">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col"></th>
                    {this.state.product.subModels[0].details.map((value) => {
                      return (<th className="text-center" key={value} scope="col">{value}</th>)
                    })}
                  </tr>

                </thead>
              </table>
              <table className="table mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-4" scope="row">สี</th>
                    {this.state.product.subModels[1].details.map((colorArray, index) => {
                      return (<th className="text-center" key={'color' + index} scope="col">
                        <div className="d-flex justify-content-center">
                          {colorArray.map((value) => {
                            return (<div className="color-tag" key={'color' + index + value.id}
                              data-toggle="tooltip" data-placement="top" title={value.id}
                              alt={value.id} style={{ backgroundImage: value.linear_gradient }}></div>
                            )
                          })}</div></th>)
                    })}
                  </tr>
                </thead>
              </table>
              {this.renderSpecTable()}
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          Loading
        </div>
      )
    }
  }
}

export default ProductDetail
