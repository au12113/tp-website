import React from 'react'
import PropTypes from 'prop-types'

import { Box, Checkbox, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

/* EnhancedTable used for sortable data. So required variables for checkbox things will nested in 'selectOptions */
const EnhancedTableHead = ({ headCells, order, orderBy, onRequestSort, selectOptions }) => {
  const createSortHandler = (property) => (event) => {
    if(order === 'asc') {
      onRequestSort(event, { property, order: 'desc' })
    } else {
      onRequestSort(event, { property, order: 'asc' })
    }
  }

  return (
    <TableHead>
      <TableRow>
        {selectOptions !== null
          ? (<TableCell padding='checkbox'>
            <Checkbox
              color='primary'
              indeterminate={selectOptions.numSelected > 0 && selectOptions.numSelected < selectOptions.rowCount}
              checked={selectOptions.rowCount > 0 && selectOptions.numSelected === selectOptions.rowCount}
              onChange={selectOptions.onSelectAllClick}
            />
          </TableCell>)
          : null}
        {headCells.map((headCell) => (
            <TableCell key={headCell.id}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>)
                  : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  numSelected: PropTypes.number,
  onSelectAllClick: PropTypes.func,
  rowCount: PropTypes.number
}

export default EnhancedTableHead