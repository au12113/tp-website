import React from 'react'
import TPBackend from '../../apis/tpBackend'

import { Helmet } from 'react-helmet'
import { getAllFileName } from '../../helpers/getFilesNameInDir'
import { ProductSlider } from '../../components'
import './brieflyProductDetail.css'

const HeaderMapping = [
  { id: 'code', TH: 'รหัส', EN: 'Code' },
  { id: 'description', TH: 'รุ่น', EN: 'Model' },
  { id: 'price', TH: 'ราคา', EN: 'Price' }
]

class BrieflyProductDetail extends React.Component {
  state = { product: null, imgList: [], logo: null, cover: null }

  webCategory = window.location.pathname.split('/').pop()

  componentDidMount = () => {
    this.getProductDetail()
  }

  getPathName = (filename) => {
    return `${process.env.PUBLIC_URL}/img/products/${this.webCategory}/${filename}`
  }

  getProductDetail = async () => {
    const response = await TPBackend.get(`/product/${this.webCategory}`)
    const { list, logo, cover } = getAllFileName('products', this.webCategory)
    const prodImgs = list.map(filtered => { return { image: this.getPathName(filtered), caption: `${this.webCategory}_${filtered.split('.')[0]}` } })
    console.log(prodImgs)
    this.setState({ product: response.data, imgList: prodImgs, logo: this.getPathName(logo), cover: this.getPathName(cover) })
  }

  mapHeaderName = (oid) => {
    const obj = HeaderMapping.find(({ id }) => id === oid)
    return obj.TH
  }

  renderTable = (list) => {
    return (
      <table id="table-wrapper" className="col-12 col-lg-10 table ">
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
    if (this.state.product !== null) {
      return (
        <>
          <Helmet>
            <title>{`Isuzu ${this.webCategory} | ISUZU Tangpark Ubon Group`}</title>
          </Helmet>
          <div className="mt-3 d-flex justify-content-center">
            {/* <h1>{`Isuzu ${this.webCategory}`}</h1> */}
            <img src={this.state.logo} className="product-header" />
          </div>
          <div className="row d-flex mx-0 justify-content-center">
            <div className="row col-12 col-lg-6 d-flex justify-content-center">
              <div className="row col-12 p-0">
                <ProductSlider slides={this.state.imgList} />
              </div>
              <div className="button-container mt-2 mt-lg-0 col-10 col-lg-8">
                <button
                  type="button"
                  className="btn btn-tangpark btn-lg btn-block download-brochure"
                  onClick={() => window.open(process.env.PUBLIC_URL + '/pdf/' + this.state.product.brochureUrl, '_blank')}
                >
                  <i className="bi bi-file-earmark-pdf-fill" />ดาวน์โหลดโบรชัวร์
                </button>
              </div>
            </div>
            <div className="row col-12 col-lg-6 mt-3 d-flex justify-content-center">
              {this.renderTable(this.state.product.priceList)}
            </div>
          </div>
        </>
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }
  }
}

export default BrieflyProductDetail
