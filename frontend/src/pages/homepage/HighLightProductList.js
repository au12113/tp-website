import React from 'react'

import HighlightProduct from '../../components/HighlightProduct'

import { getAllFileName } from '../../helpers/getFilesNameInDir'

class HighlightProductList extends React.Component {
  state = { list: [], imageList: [] }

  componentDidMount () {
    this.setState({ list: this.props.list, imageList: getAllFileName('products') })
  }

  filterForEachProduct = (path) => {
    if (this.state.imageList.length > 0) {
      this.state.imageList.filter(filename => {
        return filename.includes(path)
      })
    }
  }

  render () {
    return (
      <div>
        {this.state.list.map((item, index) => {
          return (
            <div key={item.web_category}>
              <HighlightProduct data={item} index={index} imageList={this.filterForEachProduct(item.web_category)} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default HighlightProductList
