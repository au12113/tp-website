import React from 'react'
import TPBackend from '../apis/tpBackend'
import './css/animation.css'

class Carousel extends React.Component {
  state = { carouselPage: 0, contents: [] }
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
        ? this.contents.length + this.state.carouselPage - 1
        : this.state.carouselPage - 1
    })
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
          <div className={`${this.state.carouselPage === parseInt(index) ? 'd-block' : 'd-none'}`}>
            <img src={`${process.env.PUBLIC_URL}/img/banner/${item.fileName}.png`} className="d-none d-lg-block" style={{ width: '100%', height: 'auto' }} alt="" />
            <img src={`${process.env.PUBLIC_URL}/img/banner/${item.fileName}-Mobile.png`} className="d-lg-none" style={{ width: '100%', height: 'auto' }} alt="" />
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div id="myCarousel" className="carousel slide" data-ride="carousel" style={{ height: 'auto', backgroundColor: 'rgb(52, 58, 64)' }}>
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
  }
}

export default Carousel
