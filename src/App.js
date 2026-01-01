import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AuthProvider } from './context/AuthContext'

const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
const Logout = React.lazy(() => import('./pages/Logout'))
const Profile = React.lazy(() => import('./pages/Profile'))
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'))

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
//added logout
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }
    if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, [])

  return (
    <AuthProvider>
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <DefaultLayout />
                </ProtectedRoute>
              }
            />{' '}
          </Routes>
        </Suspense>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
