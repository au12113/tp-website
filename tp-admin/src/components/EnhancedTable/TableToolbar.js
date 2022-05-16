import React from 'react'
import PropTypes from 'prop-types'

import { Toolbar, Tooltip, Typography, IconButton } from '@mui/material'
import { DeleteIcon, FilterListIcon } from '@mui/icons-material'

const EnhancedTableToolbar = ({ numSelected }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1},
        ...(numSelected > 0 && {
          bgcolor: '#f0f0f0'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%'}}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : ''}

      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number
}

export default EnhancedTableToolbar