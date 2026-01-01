// import { useEffect, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../../src/context/AuthContext'

// export default function Logout() {
//   const navigate = useNavigate()
//   const { logout } = useContext(AuthContext)

//   useEffect(() => {
//     logout()
//     navigate('/login')
//   }, [])
//   return null
// }

import { createContext, useState } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [token, setToken] = useState(localStorage.getItem('token'))

  const login = async (email, password, navigate) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      })

      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('token', res.data.token)

      setUser(res.data.user)
      setToken(res.data.token)

      navigate('/') // login وروسته home ته
    } catch (err) {
      alert('❌ Login Failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
  )
}
export default logout
