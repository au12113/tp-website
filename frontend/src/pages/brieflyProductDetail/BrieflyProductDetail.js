import React from 'react'
import TPBackend from '../../apis/tpBackend'

import { getAllFileName } from '../../helpers/getFilesNameInDir'

const HeaderMapping = [
  { id: 'code', TH: 'รหัส', EN: 'Code' },
  { id: 'description', TH: 'รุ่น', EN: 'Model' },
  { id: 'price', TH: 'ราคา', EN: 'Price' }
]

class BrieflyProductDetail extends React.Component {
  webCategory = window.location.pathname.split('/').pop()
  imageList = getAllFileName('products', this.series)
  state = { product: null }

  componentDidMount = () => {
    const nameList = getAllFileName('products')
    console.log(nameList)
    this.getProducDetail()
  }

  getProducDetail = async () => {
    const response = await TPBackend.get(`/product/${this.webCategory}`)
    this.setState({ product: response.data })
  }

  mapHeaderName = (oid) => {
    const obj = HeaderMapping.find(({ id }) => id === oid)
    return obj.TH
  }

  renderTable = (list) => {
    return (
      <table id="table-wrapper" className="col-10 col-lg-9 table ">
        <thead className="thead-dark">
          <tr>
            {
              Object.keys(list[0]).map(key => {
                return (
                  <th scope="col" key={key}>{this.mapHeaderName(key)}</th>
                )
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            list.map((submodel) => {
              return (<tr key={submodel.description}>
                {
                  Object.keys(submodel).map(key => {
                    if (key === 'price') {
                      return (<td key={submodel.description + '-' + key}>{submodel[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.-</td>)
                    } else {
                      return (<td key={submodel.description + '-' + key}>{submodel[key]}</td>)
                    }
                  })
                }
              </tr>)
            })
          }
        </tbody>
      </table>
    )
  }

  render () {
    if (this.state.product != null) {
      const { id, brochureUrl, priceList } = this.state.product
      return (
        <div className="row d-flex mx-0 justify-content-center">
          <div className="row col-10 col-lg-8 d-flex justify-content-center">
            <div className="row col-8 col-lg-6">
              <img
                alt={this.state.product.id}
                className="col-12"
                src={`${process.env.PUBLIC_URL}/img/products/${id}/cover.png`}
              />
            </div>
            <div className="col-12">
              <button
                type="button"
                className="btn btn-tangpark btn-lg btn-block"
                onClick={() => window.open(process.env.PUBLIC_URL + '/pdf/' + brochureUrl, '_blank')}
              >
                <i className="bi bi-file-earmark-pdf-fill" style={{ fontSize: '1.5rem', marginRight: '1rem' }} />ดาวน์โหลดโบรชัวร์
              </button>
            </div>
          </div>
          <div className="row col-10 mt-3 d-flex justify-content-center">
            {this.renderTable(priceList)}
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

export default BrieflyProductDetail
