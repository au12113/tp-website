import React from 'react'

import TPBackend from '../../apis/tpBackend'
import './homepage-carousel.css'
import '../../components/css/animation.css'

class HomepageCarousel extends React.Component {
  state = { carouselPage: 0, contents: [] }
  _swipe = { x: null }

  minTouchDistance = 50
  minDragDistance = 60

  componentDidMount () {
    this.getBannerList()
  }

  getBannerList = async () => {
    const response = await TPBackend.get('/banner')
    this.setState({ contents: response.data })
  }

  nextCarouselPage = () => { this.setState({ carouselPage: (this.state.carouselPage + 1) % this.state.contents.length }) }
  prevCarouselPage = () => {
    this.setState({
      carouselPage: this.state.carouselPage - 1 < 0
        ? this.state.contents.length + this.state.carouselPage - 1
        : this.state.carouselPage - 1
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
        this.prevCarouselPage()
      } else {
        this.nextCarouselPage()
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
        this.prevCarouselPage()
      } else {
        this.nextCarouselPage()
      }
    }
  }

  carouselIndexRender = () => {
    return this.state.contents.map((item, index) => {
      return (
        <li data-target="#carouselExampleIndicators"
          key={index}
          data-slide-to={index}
          className={`${this.state.carouselPage === parseInt(index) ? 'active' : ''}`}
          onClick={() => { this.setState({ carouselPage: index }) }}
        ></li>
      )
    })
  }

  carouselContentRender = () => {
    return this.state.contents.map((item, index) => {
      return (
        <div key={index} className={'d-flex justify-content-center carousel-item '}>
          <div className={`w-100 ${this.state.carouselPage === parseInt(index) ? 'd-block' : 'd-none'}`}>
            <picture>
              <source media="(max-width: 991px)" srcSet={`${process.env.PUBLIC_URL}/img/banner/${item.fileNameMobile}`} />
              <source media="(min-width: 992px)" srcSet={`${process.env.PUBLIC_URL}/img/banner/${item.fileName}`} />
              <img src={`${process.env.PUBLIC_URL}/img/banner/${item.fileName}`} className="d-block product" style={{ width: '100%', objectFit: 'fill' }} alt={item.fileName} />
            </picture>
          </div>
        </div>
      )
    })
  }

  render () {
    if (this.state.contents.length > 0) {
      return (
        <div
          id="myCarousel"
          className="carousel slide"
          onDragStart={this._onDragStart}
          onDragEnd={this._onDragEnd}
          onTouchStart={this._onTouchStart}
          onTouchEnd={this._onTouchEnd}
          data-ride="carousel"
          style={{ height: 'auto' }}
        >
          <ol className="carousel-indicators">
            {this.carouselIndexRender()}
          </ol>
          <div className="carousel-inner">
            {this.carouselContentRender()}
          </div>
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
    } else {
      return (
        <h1>
          Loading...
        </h1>
      )
    }
  }
}

export default HomepageCarousel
