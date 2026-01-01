import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../src/context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext)

  // که user login نه وي → login page ته redirect
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
