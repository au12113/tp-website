import axios from 'axios'
axios.defaults.withCredentials = true

export default axios.create({
  headers: {
    'Access-Control-Allow-Headers': 'X-Requested-With',
    'Access-Control-Allow-Origin': 'http://localhost:4000',
    'Content-Type': 'application/json'
  },
  baseURL: process.env.REACT_APP_BACKEND_API
})
