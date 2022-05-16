import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl,
  FormLabel, Grid, IconButton, Typography, TextField, OutlinedInput } from '@mui/material'
import { Clear, Save, Add, Remove } from '@mui/icons-material'
import tpBackend from '../../apis/tpBackend'

const EditContact = ({ account }) => {
  const { branchId } = useParams()
  const navigate = useNavigate()
  const inputRef = useRef()

  let initForms = {
    id: '',
    name: '',
    address: '',
    subdistrict: '',
    district: '',
    province: '',
    postcode: '',
    tel: [],
    service_tel: [],
    url: '',
    embed: ''
  }
  
  const [ forms, setForms ] = useState(initForms)
  const [ openModal, setOpenModal ] = useState(false)
  const [ modalDetail, setModalDetail ] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await tpBackend.get(`/admin/contactus/${branchId}`, { 
        withCredentials: true,
        headers: { authorization: Cookies.get('authorization') }
      })
      setForms({ ...response.data[0], 
        tel: response.data[0].tel ? response.data[0].tel.split(',').map(x=>x.trim()) : [],
        service_tel: response.data[0].service_tel ? response.data[0].service_tel.split(',').map(x=>x.trim()) : []
      })
    }
    fetchData()
  }, [branchId])

  const handleChange = (field, index=null) => async (event) => {
    const {target: { name, value }} = event
    let updated = { ...forms }
    if (index !== null) {
      updated[field][index] = value
      setForms(updated)
    } else {
      updated[name] = value
      setForms(updated)
    }
  }

  const appendArray = (field) => {
    let updated = { ...forms }
    updated[field].push('')
    setForms(updated)
  }

  const popArray = (field, index) => {
    let updated = { ...forms }
    updated[field].splice(index, 1)
    setForms(updated)
  }

  const keyPress = (event) => {
    if(event.keyCode === 13) {
      inputRef.current.focus()
    }
  }

  const submitForm = async () => {
    const response = await tpBackend.post(`/admin/contactus/${branchId}`, forms, { 
      withCredentials: true,
      headers: { authorization: Cookies.get('authorization') }
    })
    console.log(response)
    setModalDetail({ msg: response.status })
    setOpenModal(true)
  }

  const renderArray = (field) => {
    return forms[field].map((el, index) => {
      return (
        <FormControl sx={{ m: 1 }} variant='outlined' key={`fc-${field}-${index}`}>
          <OutlinedInput
            id={`outlined-adorment-${field}-${index}`}
            type='text'
            value={el}
            onChange={handleChange(field, index)}
            endAdornment={
              <IconButton
                aria-label={`remove ${field}-${index}`}
                onClick={() => popArray(field, index)}
                edge='end'
              >
                <Remove />
              </IconButton>
            }
          />
        </FormControl>
      )
    })
  }

  const renderModal = () => {
    return (
      <Dialog open={openModal}>
        <DialogTitle>Test</DialogTitle>
        <DialogContent sx={{ minWidth: '300px', minHeight: '60px'}}>
          <DialogContentText>
            {modalDetail ? modalDetail['msg'] : ''}
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>navigate('/contact')}>ตกลง</Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <Grid container justify='space-around'>
      <Grid item xs={4} container>
        <Typography
          variant='h3'
          component='div'
          gutterBottom
        >
          {branchId}
        </Typography>
      </Grid>
      <Grid item xs={12} container component={FormControl}>
        <Grid container>
          <TextField
            autoFocus
            label='ชื่อสาขา'
            inputRef={inputRef}
            name='name'
            id='outlined-name'
            value={forms.name ?? ''}
            sx={{ m: 1, width: '50ch' }}
            onChange={handleChange('name')}
            onKeyDown={keyPress('name')}
          />
        </Grid>
        <Grid container>
          <TextField
            label='ที่อยู่'
            inputRef={inputRef}
            name='address'
            id='outlined-address'
            value={forms.address ?? ''}
            sx={{ m: 1, width: '50ch' }}
            onChange={handleChange('address')}
            onKeyDown={keyPress('address')}
          />
        </Grid>
        <Grid container>
          <TextField
            label='ตำบล'
            inputRef={inputRef}
            name='subdistrict'
            id='outlined-subdistrict'
            value={forms.subdistrict ?? ''}
            sx={{ m: 1, width: '28ch' }}
            onChange={handleChange('subdistrict')}
            onKeyDown={keyPress}
          />
          <TextField
            label='อำเภอ'
            inputRef={inputRef}
            name='district'
            id='outlined-district'
            value={forms.district ?? ''}
            sx={{ m: 1, width: '28ch' }}
            onChange={handleChange('district')}
            onKeyDown={keyPress}
          />
          <TextField
            label='จังหวัด'
            inputRef={inputRef}
            name='province'
            id='outlined-province'
            value={forms.province ?? ''}
            sx={{ m: 1, width: '28ch' }}
            onChange={handleChange('province')}
            onKeyDown={keyPress}
          />
          <TextField
            label='รหัสไปรษณีย์'
            inputRef={inputRef}
            name='postcode'
            id='outlined-postcode'
            value={forms.postcode ?? ''}
            sx={{ m: 1, width: '10ch' }}
            onChange={handleChange('postcode')}
            onKeyDown={keyPress}
          />
        </Grid>
        <Grid container>
          <TextField
            label='ลิงค์หมุด Google Map'
            inputRef={inputRef}
            name='url'
            id='outlined-url'
            value={forms.url ?? ''}
            sx={{ m: 1, width: { xs: '100%', md: '50%' } }}
            onChange={handleChange('url')}
            onKeyDown={keyPress}
          />
        </Grid>
        <Grid container>
          <TextField
            label='ลิงค์แสดงผล Google Map ในหน้าเว็บ'
            inputRef={inputRef}
            name='embed'
            id='outlined-embed'
            value={forms.embed ?? ''}
            sx={{ m: 1, width: { xs: '100%', md: '50%' } }}
            onChange={handleChange('embed')}
            onKeyDown={keyPress}
          />
        </Grid>
        <Grid container component={FormControl}>
          <FormLabel sx={{ m: 1 }}>
            เบอร์โทรฝ่ายขาย
          </FormLabel>
          <IconButton
            aria-label='add'
            onClick={() => appendArray('tel')}
          >
            <Add />
          </IconButton>
          <Grid item xs={12} container>
            {forms['tel'].length > 0 ? renderArray('tel') : ''}
          </Grid>
        </Grid>
        <Grid container component={FormControl}>
          <FormLabel sx={{ m: 1 }}>
            เบอร์โทรศูนย์บริการ
          </FormLabel>
          <IconButton
            aria-label='add'
            onClick={() => appendArray('service_tel')}
          >
            <Add />
          </IconButton>
          <Grid item xs={12} container>
            {forms['service_tel'].length > 0 ? renderArray('service_tel') : ''}
          </Grid>
        </Grid>
        <Grid container justifyContent='center'>
          <Button
            variant='contained' size='large' startIcon={<Save />}
            sx={{ m: 2 }}
            onClick={() => submitForm()}
          >บันทึกข้อมูล</Button>
          <Button
            variant='contained' size='large' startIcon={<Clear />}
            sx={{ m: 2 }}
            onClick={() => navigate(`/contact`)}
          >ยกเลิก</Button>
        </Grid>
      </Grid>
      {renderModal()}
    </Grid>
  )
}

export default EditContact