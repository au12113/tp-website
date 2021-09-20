import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import './font.css'

import { Header, Footer } from './components/'
import Homepage from './pages/homepage/Homepage'
import ProductGallery from './pages/productGallery/ProductGallery'
import BrieflyProductDetail from './pages/brieflyProductDetail/BrieflyProductDetail'
import ContactUs from './pages/contactUs/ContactUs'

class App extends React.Component {
  componentDidMount () {
    window.addEventListener('resize', this.getWindowWidth)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.getWindowWidth)
  }

  render () {
    return (
            <div id="wrap" className="disable-dbl-tap-zoom">
                <Header />
                <div id="context">
                    <Switch>
                        <Route path="/products">
                            <ProductGallery />
                        </Route>
                        <Route path="/product/:productId">
                            <BrieflyProductDetail />
                        </Route>
                        <Route path="/blog">
                            Blog
                        </Route>
                        <Route path="/contact">
                            <ContactUs />
                        </Route>
                        <Route path="/">
                            <Homepage />
                        </Route>
                    </Switch>
                </div>
                <Footer />
            </div>
    )
  }
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.querySelector('#root')
)
