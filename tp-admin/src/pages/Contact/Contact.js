import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { Box } from '@mui/material'

import tpBackend from '../../apis/tpBackend'
import EnhancedTable from '../../components/EnhancedTable'
import { useNavigate } from 'react-router-dom'

const headCells = [{
  id: 'id',
  disablePadding: false,
  type: 'text',
  label: 'รหัสสาขา',
},
{
  id: 'name',
  disablePadding: false,
  type: 'text',
  label: 'ชื่อสาขา',
},
{
  id: 'province',
  disablePadding: false,
  type: 'text',
  label: 'จังหวัด',
},
{
  id: 'tel',
  disablePadding: false,
  type: 'text',
  label: 'เบอร์ฝ่ายขาย',
},
{
  id: 'service_tel',
  disablePadding: false,
  type: 'text',
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