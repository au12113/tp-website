import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { Box } from '@mui/material'

import tpBackend from '../../apis/tpBackend'
import EnhancedTable from '../../components/EnhancedTable'
import { useNavigate } from 'react-router-dom'

const headCells = [{
  id: 'id',
  numeric: false,
  disablePadding: false,
  label: 'รหัสสาขา',
},
{
  id: 'name',
  numeric: false,
  disablePadding: false,
  label: 'ชื่อสาขา',
},
{
  id: 'province',
  numeric: false,
  disablePadding: false,
  label: 'จังหวัด',
},
{
  id: 'tel',
  numeric: false,
  disablePadding: false,
  label: 'เบอร์ฝ่ายขาย',
},
{
  id: 'service_tel',
  numeric: false,
  disablePadding: false,
  label: 'เบอร์ศูนย์บริการ',
}]

const ContactManagement = () => {
  const [ branchList, setBranchList ] = useState([])
  const [ order, setOrder ] = useState('asc')
  const [ orderBy, setOrderBy ] = useState('')
  const [ page, setPage ] = useState(0)
  const [ rowsPerPage, setRowsPerPage ] = useState(10)

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData () {
      const response = await tpBackend.get('/admin/contactus', {
        withCredentials: true,
        headers: { authorization: Cookies.get('authorization') }
      })
      setBranchList(response.data)
    }
    fetchData()
  }, [])

  const onRowClick = (id) => {
    navigate(`/contact/edit/${id}`)
  }

  return(
    <Box sx={{ width: '100%' }}>
      <EnhancedTable
        rows={branchList}
        headCells={headCells}
        queryOptions={{ order, orderBy, page, rowsPerPage }}
        updateQueryOptions={{ setOrder, setOrderBy, setPage, setRowsPerPage }}
        actions={{ onRowClick }}
      />
    </Box>
  )
}

export default ContactManagement