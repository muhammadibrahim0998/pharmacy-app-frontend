import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../src/context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form)
      localStorage.setItem('token', res.data.token)
      login(res.data.user)
      alert('✅ Login successful')
      navigate('/')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || '❌ Login failed')
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow p-4">
          <h3 className="text-center mb-3">Login</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="form-control mb-2"
              onChange={handleChange}
              required
            />
            <button className="btn btn-primary w-100">Login</button>
          </form>

          <div className="text-center mt-3">
            <button
              onClick={() => navigate('/register')}
              className="btn btn-outline-secondary w-100 mt-3"
            >
              Go To Register 🔑
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
