import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'

import { Grid, Stack } from '@mui/material'

import tpBackend from '../../apis/tpBackend'
import EnhancedTable from '../../components/EnhancedTable'
import { useNavigate } from 'react-router-dom'

const headCells = [{
  id: 'category',
  numeric: false,
  disablePadding: true,
  label: 'ประเภท',
},
{
  id: 'fileName',
  numeric: false,
  disablePadding: false,
  label: 'ชื่อไฟล์',
},
// {
//   id: 'fileNameMobile',
//   numeric: false,
//   disablePadding: false,
//   label: 'ชื่อไฟล์สำหรับมือถือ',
// },
{
  id: 'url',
  numeric: false,
  disablePadding: false,
  label: 'Url',
},
{
  id: 'expiredDate',
  numeric: true,
  disablePadding: true,
  label: 'แสดงถึงวัน',
}]


const Banner = () => {
  const params = useParams()

  const [ banner, setBanner ] = useState([])

  const [ order, setOrder ] = useState('asc')
  const [ orderBy, setOrderBy ] = useState('')
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)

  const navigate = useNavigate()

  const category = 'category' in params ? 
  ['category'] : null

  useEffect(()=>{
    async function fetchData () {
      const response = await tpBackend.get('/admin/banners', {
        params: category !== null ? { category } : undefined,
        withCredentials: true,
        headers: { authorization: Cookies.get('authorization') }
      })
      setBanner(response.data)
    }
    fetchData()
  }, [])

  const onRowClick = (id) => {
    navigate(`/contact/edit/${id}`)
  }
  
  return (
    <Stack
      direction='row'
      justifyContent='flex-start'
      alignItems='flex-start'
      spaceing={1}
    >
      <Grid container>
        {/* {JSON.stringify(banner, null, 2)} */}
        <EnhancedTable
          rows={banner}
          headCells={headCells}
          queryOptions={{ order, orderBy, page, rowsPerPage }}
          updateQueryOptions={{ setOrder, setOrderBy, setPage, setRowsPerPage }}
          actions={{ onRowClick }}
        />
      </Grid>
    </Stack>
  )
}

export default Banner