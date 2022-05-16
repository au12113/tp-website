import React from 'react'

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material'

import EnhancedTableHead from './TableHead'
// import EnhancedTableToolbar from './TableToolbar'
import { stableSort, getComparator } from '../../helpers/general'

const EnhancedTable = ({ rows=[], headCells, queryOptions, updateQueryOptions, actions }) => {
  const { order, orderBy, page, rowsPerPage } = queryOptions
  const { setOrder, setOrderBy, setPage, setRowsPerPage } = updateQueryOptions

  const onRequestSort = (event, { property, order }) => {
    setOrder(order)
    setOrderBy(property)
  }

  const rowPerPageChange = (rowPerPage) => {
    setRowsPerPage(rowPerPage)
    setPage(0)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar /> */}
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={onRequestSort}
              selectOptions={null}
            />
            <TableBody>{rows.length > 0 ?
                stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {return (
                      <TableRow
                        hover
                        tabIndex={0}
                        key={row.id}
                        onClick={ 'onRowClick' in actions ? () => actions.onRowClick(row.id): undefined}
                      >
                        {headCells.map((head)=>{
                          return <TableCell key={`${row.id}_${head.id}`}>{row[head.id]}</TableCell>
                        })}
                      </TableRow>
                    )
                  })
                : null}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, page) => setPage(page)}
          onRowsPerPageChange={(e) => rowPerPageChange(e.target.value)}
        />
      </Paper>
    </Box>
  )

}

export default EnhancedTable