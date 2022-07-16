import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children, currentUser }) => {
  return currentUser === null ? <Navigate to='/login' replace /> : children
}

export { RequireAuth }