import React from 'react'

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material'

import EnhancedTableHead from './TableHead'
// import EnhancedTableToolbar from './TableToolbar'
import { stableSort, getComparator } from '../../helpers/general'

import './enhanced-table.css'

const EnhancedTable = ({ rows = [], headCells, queryOptions, updateQueryOptions, actions }) => {
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

  const renderPreviewButton = (row) => {
    if ('fileName' in row) {
      return (<Button
        variant='outlined'
        onClick={'onRowClick' in actions ? () => actions.onRowClick(row.id) : undefined}
      >
        Preview
      </Button>)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar /> */}
        <TableContainer sx={{ maxHeight: 'calc(85vh - 64px)' }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby='tableTitle'
            size='medium'
            stickyHeader
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
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={0}
                      key={row.id}
                    >
                      {headCells.map((head, index) => {
                        switch (head.type) {
                          case 'url':
                            return (<TableCell key={`${row.id}_${head.id}`}>
                              {row[head.id] ? <a href={row[head.id]}><span className='url-label'>{row[head.id]}</span></a> : '-'}
                            </TableCell>)
                          case 'date':
                            const date = row[head.id] ? new Date(row[head.id]) : undefined
                            return <TableCell key={`${row.id}_${head.id}`}><span className='date-label'>{date ? date.toDateString() : '-'}</span></TableCell>
                          case 'text':
                            return <TableCell key={`${row.id}_${head.id}`}>{row[head.id]}</TableCell>
                          case 'img':
                            return (<TableCell key={`${row.id}_${head.id}`}>
                              <a href={`${process.env.PUBLIC_URL}`}><span className='file-label'>{row[head.id]}</span></a>
                            </TableCell>)
                          case 'array':
                            return <TableCell key={`${row.id}_${head.id}`}>{row[head.id] ? row[head.id].split(',').join(", ") : '-'}</TableCell>
                          default:
                            return <TableCell key={`${row.id}_${head.id}`}>*-{row[head.id]}-*</TableCell>
                        }
                      })}
                      <TableCell key={`${row.id}_edit`}>
                        <div className='actions-container'>
                          {renderPreviewButton(row)}
                          <Button
                            variant='outlined'
                            onClick={'onRowClick' in actions ? () => actions.onRowClick(row.id) : undefined}
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
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