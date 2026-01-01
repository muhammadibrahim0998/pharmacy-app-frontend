import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton } from '@coreui/react'

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // که backend logout API لري، دلته یې call کولی شې
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
      })

      // ✅ Token پاکول
      localStorage.removeItem('token')

      // ✅ Login page ته redirect
      navigate('/login')
    } catch (err) {
      console.error('Logout error', err)
    }
  }

  return (
    <CButton color="danger" onClick={handleLogout}>
      Logout
    </CButton>
  )
}

export default LogoutButton
