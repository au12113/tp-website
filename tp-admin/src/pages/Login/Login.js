import React, { useState, useRef } from 'react'
import { Box, TextField, Typography } from '@mui/material';

import TPBackend from '../../apis/tpBackend'

const Login = ({ setAccount }) => {
  const inputRef = useRef()

  const [forms, setForms] = useState({
    email: '',
    password: ''
  })

  const login = async () => {
    const response = await TPBackend.post('/login', { email: forms.email, password: forms.password }, { withCredentials: true })
    const { token, user } = response.data
    return { username: user.id, token }
  }

  const handleChange = (event) => {
    const { target: { name, value }} = event
    let updated = { ...forms}
    updated[name] = value
    setForms(updated)
  }

  const keyPress = (field) => async (event) => {
    if(event.keyCode === 13) {
      if(field === 'password') {
        const accountObj = await login()
        setAccount(accountObj)
      } else if (field === 'email') {
        inputRef.current.focus()
      }
    }
  }

  return (
    <Box sx={{ padding: '20px 20px' }}>
      <Typography
        variant='h4'
        noWrap
        component='div'
        sx={{ marginLeft: '8px' }}
      >
        Login
      </Typography>
      <form>
        <TextField
          autoFocus
          label='Email'
          inputRef={inputRef}
          name='email'
          id='outlined-email'
          sx={{ m: 1, width: '28ch' }}
          onChange={handleChange}
          onKeyDown={keyPress('email')}
        />
        <TextField
          label='Password'
          name='password'
          inputRef={inputRef}
          type='password'
          id='outlined-password'
          sx={{ m: 1, width: '28ch' }}
          onChange={handleChange}
          onKeyDown={keyPress('password')}
        />
      </form>
    </Box>
  )
}

export default Login