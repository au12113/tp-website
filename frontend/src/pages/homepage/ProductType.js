import React from 'react'

import tpBackend from '../../apis/tpBackend'
import { getAllFileName } from '../../helpers/getFilesNameInDir'
import './product-type.css'

class ProductType extends React.Component {
  state = { selectedModel: 0, selectedProductType: 0, productTypes: null, imgList: {} }

  async componentDidMount () {
    const res = await tpBackend.get('/productType')
    const list = getAllFileName('highlight', 'all')
    this.setState({ productTypes: res.data, imgList: list })
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

  isDesktop = () => {
    const screenWidth = window.innerWidth
    return screenWidth > 991
  }

  needScrollbar = (listLen) => {
    const containerWidth = window.innerWidth * 0.85
    const contentsWidth = listLen * 270
    return contentsWidth > containerWidth
  }

  renderProductSlider = (modelList) => {
    const model = modelList[this.state.selectedModel]
    return (
      <div
        className='model-carousel d-flex flex-column align-items-center aligns-self-center'
        onDragStart={this._onDragStart}
        onDragEnd={this._onDragEnd}
        onTouchStart={this._onTouchStart}
        onTouchEnd={this._onTouchEnd}
      >
        <img
          className='model-cover'
          src={this.state.imgList[model.webCategory].cover}
        />
        <div className='d-flex justify-content-center'>{model.webCategory}</div>
        <div className='model-price d-flex justify-content-center'>เริ่มต้น {model.start}</div>
        <ol className="carousel-indicators">
          {this.sliderIndexRender(modelList)}
        </ol>
        <div className="carousel-control-prev" onClick={this.prevCarouselPage} role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </div>
        <div className="carousel-control-next" onClick={this.nextCarouselPage} role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </div>
      </div>
    )
  }

  renderProductCarousel = (modelList) => {
    return (
      <div className={`${modelList.length > 0 ? 'model-carousel' : ''} d-flex flex-row ${this.needScrollbar(modelList.length) && this.isDesktop() ? 'scrollbar' : ''}`}>
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
              {/* <div className='model-price d-none d-lg-flex justify-content-center'>เริ่มต้น {x.start}</div> */}
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
      ? this.state.productTypes[this.state.selectedProductType].modelList[this.state.selectedModel].webCategory
      : null
    if (selectModel !== null && 'banner' in this.state.imgList[selectModel] && this.state.imgList[selectModel].banner !== undefined) {
      return (
        <div id='wrapped-product-banner' className='overlap-container'>
          <img
            className='product-banner'
            src={this.state.imgList[selectModel].banner}
          />
          <div id='wrapped-triangle' className='overlap'>
            <div id='triangle-down-shadow' className='overlap'></div>
            <div id='triangle-down' className='overlap'></div>
          </div>
          <div id='wrapped-product-button' className='d-flex flex-row-reverse overlap'>
            <button className='btn product-button'>รายละเอียดรถ</button>
            <button className='btn product-button'>ดาวน์โหลดโบรชัวร์</button>
            <button className='btn product-button'>สนใจรถ</button>
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
          ? (this.isDesktop() ? this.renderProductCarousel(this.state.productTypes[this.state.selectedProductType].modelList) : this.renderProductSlider(this.state.productTypes[this.state.selectedProductType].modelList))
          : ''}
        {this.state.productTypes !== null ? this.renderProductBanner() : ''}
      </div>
    )
  }
}

export default ProductType
