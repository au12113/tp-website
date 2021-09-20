import React from 'react'
import './css/animation.css'

class Carousel extends React.Component {
    state = { carouselPage: 0 }

    contents = [
      { index: 0, content: 'Page1', img: '/img/banner/V-Cross banner', link: process.env.PUBLIC_URL },
      { index: 1, content: 'Page2', img: '/img/banner/Spark Banner', link: process.env.PUBLIC_URL },
      { index: 2, content: 'Page3', img: '/img/banner/truck banner', link: process.env.PUBLIC_URL }
    ]

    nextCarouselPage = () => { this.setState({ carouselPage: (this.state.carouselPage + 1) % this.contents.length }) }
    prevCarouselPage = () => {
      this.setState({
        carouselPage: this.state.carouselPage - 1 < 0
          ? this.contents.length + this.state.carouselPage - 1
          : this.state.carouselPage - 1
      })
    }

    carouselIndexRender = () => {
      return this.contents.map((item) => {
        return (
                <li data-target="#carouselExampleIndicators"
                    key={item.index}
                    data-slide-to={item.index}
                    className={`${this.state.carouselPage === parseInt(item.index) ? 'active' : ''}`}
                    onClick={() => { this.setState({ carouselPage: item.index }) }}
                ></li>
        )
      })
    }

    carouselContentRender = () => {
      return this.contents.map(item => {
        return (
                <div key={item.index} className={'d-flex justify-content-center carousel-item '}>
                    <div className={`${this.state.carouselPage === parseInt(item.index) ? 'd-block' : 'd-none'}`}>
                        <img src={`${item.img}.png`} className="d-none d-lg-block" style={{ width: '100%', height: 'auto' }} alt="" />
                        <img src={`${item.img}-Mobile.png`} className="d-lg-none" style={{ width: '100%', height: 'auto' }} alt="" />
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
