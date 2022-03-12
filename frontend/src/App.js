import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import './font.css'

import { Header, Footer } from './components/'
import Homepage from './pages/homepage/Homepage'
import BrieflyProductDetail from './pages/brieflyProductDetail/BrieflyProductDetail'
import ContactUs from './pages/contactUs/ContactUs'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Helmet>
          <title>กลุ่มอีซูซุตังปักอุบล | ISUZU Tangpark Ubon Group</title>
          <meta itemProp="name" content="กลุ่มอีซูซุตังปักอุบล | ISUZU Tangpark Ubon Group" />
          <meta itemProp="description" content="ตัวแทนจำหน่ายรถกระบะรถบรรทุกอีซูซุและศูนย์บริการมาตรฐานอีซูซุ ในเขตจังหวัดอุบลราชธานี ยโสธร อำนาจเจริญ มุกดาหาร" />
          <meta itemProp="image" content="https://www.isuzu-tpubon.com/favicon-192.png" />
        </Helmet>
        <div id="wrap" className="disable-dbl-tap-zoom">
          <Header />
          <div id="context">
            <Switch>
              <Route path="/product/:productId">
                <BrieflyProductDetail />
              </Route>
              <Route path="/blog">
                Blog
              </Route>
              <Route path="/contact">
                <ContactUs />
              </Route>
              <Route exact path='/'>
                <Homepage />
              </Route>
            </Switch>
          </div>
          <Footer refProps={this.headerRef} />
        </div>
      </Router>
    )
  }
}

export default App
