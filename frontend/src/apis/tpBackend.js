import axios from 'axios'

export default axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  baseURL: process.env.REACT_APP_BACKEND_API
})
