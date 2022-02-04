import axios from 'axios'

export default axios.create({
  headers: {
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
  baseURL: process.env.REACT_APP_BACKEND_API
})
