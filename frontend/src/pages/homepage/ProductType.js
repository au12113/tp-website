import React from 'react'

import tpBackend from '../../apis/tpBackend'
import { getAllFileName } from '../../helpers/getFilesNameInDir'
import { isDesktop } from '../../helpers/detectDevice'
import { DownloadBrochure, GetChat } from '../../assets/button'
import './product-type.css'

class ProductType extends React.Component {
  state = { selectedModel: 0, selectedProductType: 0, productTypes: null, imgList: {} }

  async componentDidMount () {
    const res = await tpBackend.get('/productType')
    const list = await getAllFileName('highlight', 'all')
    this.setState({ productTypes: res.data, imgList: list })
  }

  nextPage = () => {
    const modelList = this.state.productTypes[this.state.selectedProductType].modelList
    this.setState({ selectedModel: (this.state.selectedModel + 1) % modelList.length })
  }

  prevPage = () => {
    const modelList = this.state.productTypes[this.state.selectedProductType].modelList
    this.setState({
      selectedModel: this.state.selectedModel - 1 < 0
        ? modelList.length + this.state.selectedModel - 1
        : this.state.selectedModel - 1
    })
  }

  _onTouchStart = (e) => {
    const touch = e.touches[0]
    this._swipe = { x: touch.clientX }
  }

  _onTouchEnd = (e) => {
    const touch = e.changedTouches[0]
    const changed = touch.clientX - this._swipe.x
    const absX = Math.abs(changed)
    if (absX > this.minTouchDistance) {
      if (changed > 0) {
        this.prevPage()
      } else {
        this.nextPage()
      }
    }
  }

  _onDragStart = (e) => {
    this._swipe.x = e.clientX
  }

  _onDragEnd = (e) => {
    const changed = e.clientX - this._swipe.x
    const absX = Math.abs(changed)
    if (absX > this.minDragDistance) {
      if (changed > 0) {
        this.prevPage()
      } else {
        this.nextPage()
      }
    }
  }

  renderProductType = (productType, index) => {
    return (
      <button
        className={`product-type-button d-flex justify-content-center align-items-center ${this.state.selectedProductType === index ? 'active' : ''}`}
        onClick={() => { this.setState({ selectedProductType: index, selectedModel: 0 }) }}
        key={productType.id}
      >
        <img className="product-type-icon" src={require(`../../assets/button/${productType.id.toLowerCase()}.svg`).default} />
        <div className='product-type-text'>
          <span>{productType.text}</span>
        </div>
      </button>
    )
  }

  needScrollbar = (listLen) => {
    const containerWidth = window.innerWidth * 0.85
    const contentsWidth = listLen * 270
    return contentsWidth > containerWidth
  }

  renderProductSlider = (modelList) => {
    const model = modelList[this.state.selectedModel]
    if (model !== undefined && model.webCategory !== undefined) {
      return (
        <div
          className='model-carousel carousel d-flex flex-column align-items-center aligns-self-center'
          onDragStart={this._onDragStart}
          onDragEnd={this._onDragEnd}
          onTouchStart={this._onTouchStart}
          onTouchEnd={this._onTouchEnd}
        >
          <ol className="carousel-indicators">
            {this.sliderIndexRender(modelList)}
          </ol>
          <img
            className='model-cover'
            src={this.state.imgList[model.webCategory].cover}
          />
          <div className='d-flex justify-content-center'>{model.webCategory}</div>
          <div
            className={`carousel-control-prev ${modelList.length > 1 ? '' : 'd-none'}`}
            onClick={this.prevPage} role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </div>
          <div className={`carousel-control-next ${modelList.length > 1 ? '' : 'd-none'}`}
            onClick={this.nextPage} role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </div>
        </div>
      )
    } else {
      return ''
    }
  }

  renderProductCarousel = (modelList) => {
    return (
      <div className={`${modelList.length > 0 ? 'model-carousel' : ''} d-flex flex-row ${this.needScrollbar(modelList.length) && isDesktop() ? 'scrollbar' : ''}`}>
        {modelList.map((x, index) => {
          const isActive = this.state.selectedModel === index ? 'active' : ''
          return (
            <div
              className={`model-container ${isActive}`}
              onClick={() => { this.setState({ selectedModel: index }) }}
              key={x.webCategory}
            >
              <img
                className={`model-cover ${isActive}`}
                src={this.state.imgList[x.webCategory].cover}
                alt={x.webCategory}
              />
              <div className='d-flex justify-content-center'>{x.webCategory}</div>
            </div>
          )
        })}
      </div>
    )
  }

  sliderIndexRender = (modelList) => {
    return modelList.map((item, index) => {
      return (
        <li
          key={index}
          data-slide-to={index}
          className={`${this.state.selectedModel === parseInt(index) ? 'active' : ''}`}
          onClick={() => { this.setState({ selectedModel: index }) }}
        ></li>
      )
    })
  }

  renderProductBanner = () => {
    const selectModel = this.state.productTypes[this.state.selectedProductType].modelList.length > 0
      ? this.state.productTypes[this.state.selectedProductType].modelList[this.state.selectedModel]
      : null
    if (selectModel !== null && 'banner' in this.state.imgList[selectModel.webCategory] && this.state.imgList[selectModel.webCategory].banner !== undefined) {
      return (
        <div id='wrapped-product-banner' className='overlap-container'>
          <img
            className='product-banner'
            src={this.state.imgList[selectModel.webCategory].banner}
          />
          <div id='wrapped-triangle' className='overlap'>
            <div id='triangle-down-shadow' className='overlap'></div>
            <div id='triangle-down' className='overlap'></div>
          </div>
          <div className='wrapped-product-button second-row d-flex d-lg-none flex-row-reverse overlap'>
            <div
              className='product-button-container'
              onClick={() => { window.open('https://www.facebook.com/isuzutp', '_blank') }}
            >
              <img
                className='product-button'
                src={GetChat}
              />
            </div>
          </div>
          <div className='wrapped-product-button d-flex flex-row-reverse overlap'>
            {/* <div
              className='product-button-container'
              onClick={() => { window.open(process.env.PUBLIC_URL + '/pdf/' + selectModel.brochureUrl, '_blank') }}
            >
              <img
                className='product-button'
                src={ProductDetail}
              />
            </div> */}
            <div
              className='product-button-container'
              onClick={() => { window.open(process.env.PUBLIC_URL + '/pdf/' + selectModel.brochureUrl, '_blank') }}
            >
              <img
                className='brochure-button'
                src={DownloadBrochure}
              />
            </div>
            <div
              className='product-button-container d-none d-lg-block'
              onClick={() => { window.open('https://www.facebook.com/isuzutp', '_blank') }}
            >
              <img
                className='product-button'
                src={GetChat}
              />
            </div>
          </div>
        </div>
      )
    } else {
      return ''
    }
  }

  render () {
    return (
      <div className='product-type-container'>
        <div className='section-header d-flex flex-row justify-content-center align-items-center'>
          <div className='section-header-line' />
          <span className='section-header-label'>เลือกรถอีซูซู...ที่คุณชอบ</span>
          <div className='section-header-line' />
        </div>
        <div className='d-flex flex-row justify-content-center'>
          {this.state.productTypes !== null ? this.state.productTypes.map((x, index) => this.renderProductType(x, index)) : ''}
        </div>
        {this.state.productTypes !== null
          ? (isDesktop() ? this.renderProductCarousel(this.state.productTypes[this.state.selectedProductType].modelList) : this.renderProductSlider(this.state.productTypes[this.state.selectedProductType].modelList))
          : ''}
        {this.state.productTypes !== null ? this.renderProductBanner() : ''}
      </div>
    )
  }
}

export default ProductType
