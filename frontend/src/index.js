import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import './font.css'

import { Header, Footer } from './components/'
import CacheBuster from './helpers/cacheBuster'
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
      <CacheBuster>
        {({ loading, isLatestVersion, refreshCacheAndReload }) => {
          if (loading) return null
          if (!loading && !isLatestVersion) {
            refreshCacheAndReload()
          }

          return (
            <Router>
              <div id="wrap" className="disable-dbl-tap-zoom">
                <Header />
                <div id="context">
                  <Switch>
                    <Route path="/products">
                      <ProductGallery />
                    </Route>
                    <Route path="/product/:productId">
                      <Helmet>
                        <title>Nested Title</title>
                        <meta name="description" content="Nested component" />
                      </Helmet>
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
            </Router>
          )
        }}
      </CacheBuster>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)
