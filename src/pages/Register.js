import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      Object.entries(form).forEach(([key, value]) => data.append(key, value))
      if (image) data.append('profileImage', image)

      const res = await axios.post('http://localhost:5000/api/auth/register', data)

      alert('🎉 Register Successful! Please Login.')
      navigate('/login') // ✔️ Register وروسته Login ته
    } catch (err) {
      alert(err.response?.data?.message || '❌ Register Failed')
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form onSubmit={handleSubmit} className="card p-4 shadow" style={{ width: 350 }}>
        <h3 className="mb-3 text-center">Register</h3>

        <div className="text-center mb-3">
          <div
            className="rounded-circle border mb-2"
            style={{
              width: 120,
              height: 120,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url(${preview || 'https://via.placeholder.com/120'})`,
            }}
          />
          <input type="file" onChange={handleImage} />
        </div>

        <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <select className="form-select mb-3" name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  )
}
