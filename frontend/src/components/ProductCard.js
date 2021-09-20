import React from 'react'
import { Link } from 'react-router-dom'

class ProductCard extends React.Component {
  render () {
    return (
            <div className="col-6 col-lg-3">
                <div>
                    <div className="col-12 d-flex justify-content-center">
                        <img alt={this.props.data.serie} className="img-fluid" src={process.env.PUBLIC_URL + '/' + this.props.data.img} />
                    </div>
                    <div className="col-12 align-middle mx-auto">
                        <Link to={`/product${this.props.data.link}`}>
                            <h3 className="bold">{this.props.data.serie.toUpperCase()}</h3>
                        </Link>
                        <p>เริ่มต้นที่ {this.props.data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} บาท</p>
                    </div>
                </div>
            </div>
    )
  }
}

export default ProductCard
