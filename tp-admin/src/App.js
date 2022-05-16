import React, { useState } from 'react'
import { Grid } from '@mui/material'
import { Route, Routes, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

import Login from './pages/Login/Login'
import { RequireAuth } from './helpers/RequireAuth'
import Homepage from './pages/Homepage/Homepage'
import { Header, Sidebar } from './components'
import Banner from './pages/Banner/Banner'
import { Contact, EditContact } from './pages/Contact'

import './App.css';

const App = () => {
  const location = useLocation()

  const [account, setAccount] = useState(null)

  const handleAccountChange = (accountObj) => {
    if(accountObj !== null) {
      const { username, token } = accountObj
      Cookies.set('authorization', token, { sameSite: 'strict', secure: true, expires: 7 })
      location.pathname = '/'
      setAccount({ username, token })
    } else {
      location.pathname = '/login'
      setAccount(null)
    }
  }

  return (
    <Grid container>
      <Grid container>
        <Header account={account} logout={()=>handleAccountChange(null)} />
      </Grid>
      <Grid container direction='row' alignItems='strech' sx={{ marginTop: '64px' }}>
        <Grid item xs={0} md={2} sx={{ maxHeight: 'calc(100vh - 64px)' }}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10} sx={{ maxHeight: 'calc(100vh - 64px)', padding: '20px 5px', overflow: 'auto' }}>
          <Routes>
            <Route
              exact path='/'
              element={<RequireAuth currentUser={account}>
                  <Homepage account={account} />
                </RequireAuth>}
            />
            <Route
              path='/contact/edit/:branchId'
              element={<RequireAuth currentUser={account}>
                <EditContact account={account} />
              </RequireAuth>}
            />
            <Route
              exact path='/contact'
              element={<RequireAuth currentUser={account}>
                <Contact account={account} />
              </RequireAuth>}
            />
            <Route
              exact path='/banners'
              element={<RequireAuth currentUser={account}>
                <Banner account={account} />
              </RequireAuth>}
            />
            <Route
              exact path='/product'
              element={<RequireAuth currentUser={account}>
                <Contact account={account} />
              </RequireAuth>}
            />
            <Route
              path='/login'
              element={<Login setAccount={({ username, token })=>handleAccountChange({ username, token })} />}
            />
          </Routes>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
