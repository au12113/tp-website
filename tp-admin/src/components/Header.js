import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Grid, Button, Box, Toolbar, Typography } from '@mui/material'

import './common-style.css'

const Header = ({ account, logout }) => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(()=>{
    if(account !== null) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [account])

  return (
    <Grid item xs={12}>
      <AppBar>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'block' } }}
          >
            ISUZU Tangpark Admin
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {isLogin ?
              <Button
                component={Link} to='/' activeclassname='selected'
                size='large' color='inherit'
                onClick={logout}
              >LOGOUT</Button>
              : ''}
          </Box>
        </Toolbar>
      </AppBar>
    </Grid>
  )
}

export default Header