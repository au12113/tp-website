import React from 'react'
import { ProductCard, HighlightProduct } from './index'
import { AnimateOnChange } from 'react-animation'
import { Link } from 'react-router-dom'

class ProductList extends React.Component {
    state = { showCollapse: false, products: [], highligth: null }

    componentDidMount () {
      this.setState({ products: this.props.products.list, highligth: this.props.products.highlight[0] })
    }

    renderCollapseList () {
      if (this.props.homepage) {
        return (
                <div className="d-flex align-items-center">
                    <div className="col-12 d-flex justify-content-end px-5 mb-2">
                        <Link to="/products">
                            <button type="button" className="btn btn-outline-primary"
                            >ดูรุ่นอื่นเพิ่มเติม</button>
                        </Link>
                    </div>
                </div>
        )
      } else if (this.state.products.length > 5) {
        return (
                <div className="row d-flex align-items-center">
                    <AnimateOnChange animationIn="popIn" animationOut="popOut" durationOut={500}>
                        <div id={this.props.listName} className={`row col-12 pt-0 collapse ${this.state.showCollapse ? 'show' : ''}`}>
                            {this.state.products.slice(5).map(product => {
                              return (
                                    <ProductCard data={product} key={product.serie} />
                              )
                            })}
                        </div>
                    </AnimateOnChange>
                    <div className="col-12 d-flex justify-content-end px-5 mb-2">
                        <button type="button" className="btn btn-outline-primary"
                            data-toggle="collapse" data-target={`#${this.props.listName}`}
                            aria-expanded="false" aria-controls={this.props.listName}
                            onClick={() => this.setState({ showCollapse: !this.state.showCollapse })}
                        >{`${this.state.showCollapse ? 'ซ่อน' : 'ดูรุ่นอื่นเพิ่มเติม'}`}</button>
                    </div>
                </div>
        )
      }
    }

    render () {
      if (this.state.products.length > 0 || this.state.highligth != null) {
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="col-12">
                                <HighlightProduct data={this.state.highligth} />
                            </div>
                            <div className="row col-12 pt-3" >
                                {this.state.products.slice(1, 5).map(product => {
                                  return (
                                        <ProductCard data={product} key={product.serie} />
                                  )
                                })}
                            </div>
                            {this.renderCollapseList()}
                        </div>
                    </div>
                </div>)
      } else {
        return (
                <div>
                    Loading
                </div>
        )
      }
    }
}

export default ProductList
