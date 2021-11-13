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
              <Helmet>
                <title>{'กลุ่มอีซูซุตังปักอุบล | ISUZU Tangpark Ubon Group'}</title>
                <meta itemProp="name" content="กลุ่มอีซูซุตังปักอุบล | ISUZU Tangpark Ubon Group" />
                <meta itemProp="description" content="ตัวแทนจำหน่ายรถยนต์อีซูซุและศูนย์บริการมาตรฐานอีซูซุ ในเขตจังหวัดอุบลราชธานี, ยโสธร, อำนาจเจริญ และมุกดาหาร " />
                <meta itemProp="image" content="https://www.isuzu-tpubon.com/favicon-192.png" />
              </Helmet>
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
