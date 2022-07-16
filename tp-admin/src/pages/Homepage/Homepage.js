import React, { useEffect } from 'react'
import { Box, Typography } from '@mui/material'

const Homepage = ({ account }) => {
  useEffect(()=>{
    console.log(account)
  }, [account])

  return (
    <Box sx={{ width: '100%' }}>
      <Typography
        variant='h4'
        noWrap
        component='div'
        sx={{ marginLeft: '8px' }}
      >
        {account.username}
      </Typography>
    </Box>
  )
}

export default Homepage