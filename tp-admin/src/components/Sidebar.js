import React from 'react'

import { Link } from 'react-router-dom'
import { Grid, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { Folder, Home, StoreMallDirectory, ViewCarousel } from '@mui/icons-material'

const Sidebar = () => {
  return (
    <Grid item xs={0} md={12}>
      <Box sx={{ backgroundColor: 'primary.dark' }} className='sidebar-container'>
        <List>
          <ListItem button key='banner' component={Link} to='/'>
            <ListItemIcon>
              <Home sx={{ color:'#f0f0f0' }} fontSize='large' />
            </ListItemIcon>
            <ListItemText primary='หน้าแรก' sx={{ color:'#f0f0f0' }} />
          </ListItem>
        </List>
        <List>
          <ListItem button key='banner' component={Link} to='/banners'>
            <ListItemIcon>
              <ViewCarousel sx={{ color:'#f0f0f0' }} fontSize='large' />
            </ListItemIcon>
            <ListItemText primary='โพสต์และแบนเนอร์' sx={{ color:'#f0f0f0' }} />
          </ListItem>
        </List>
        <List>
          <ListItem button key='product-page' component={Link} to='/product'>
            <ListItemIcon>
              <Folder sx={{ color:'#f0f0f0' }} fontSize='large' />
            </ListItemIcon>
            <ListItemText primary='รายละเอียดรุ่นรถ' sx={{ color:'#f0f0f0' }} />
          </ListItem>
        </List>
        <List>
          <ListItem button key='contact-page' component={Link} to='/contact'>
            <ListItemIcon>
              <StoreMallDirectory sx={{ color:'#f0f0f0' }} fontSize='large' />
            </ListItemIcon>
            <ListItemText primary='โชว์รูมและศูนย์บริการ' sx={{ color:'#f0f0f0' }} />
          </ListItem>
        </List>
      </Box>
    </Grid>
  )
}

export default Sidebar
