import React from 'react'
import { Navigate } from 'react-router-dom'

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const role = localStorage.getItem('role') // role should be stored at login
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default RoleProtectedRoute
