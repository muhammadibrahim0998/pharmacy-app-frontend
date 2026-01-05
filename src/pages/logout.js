import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { API_BASE_URL } from '../api/axois'

export default function Logout() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call logout API endpoint if available
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
        }).catch(() => {
          // Ignore errors if endpoint doesn't exist
        })
      } catch (err) {
        // Ignore errors
      } finally {
        // Clear token from localStorage
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        // Call logout from context if available
        if (logout) {
          logout()
        }
        
        // Redirect to login page
        navigate('/login')
      }
    }

    performLogout()
  }, [navigate, logout])

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <h3>Logging out...</h3>
        <p>Please wait while we log you out.</p>
      </div>
    </div>
  )
}
