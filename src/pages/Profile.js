// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom' // 👉 for login link

// export default function Profile() {
//   const [user, setUser] = useState({})
//   const [image, setImage] = useState(null)
//   const [preview, setPreview] = useState(null)
//   const token = localStorage.getItem('token')

//   useEffect(() => {
//     const u = JSON.parse(localStorage.getItem('user'))
//     if (u) {
//       setUser(u)
//       if (u.profileImage) {
//         setPreview(`http://localhost:5000/uploads/${u.profileImage}`)
//       }
//     }
//   }, [])

//   const handleImage = (e) => {
//     const file = e.target.files[0]
//     setImage(file)
//     setPreview(URL.createObjectURL(file))
//   }

//   const handleUpdate = async (e) => {
//     e.preventDefault()
//     const form = new FormData()
//     form.append('name', user.name)
//     form.append('email', user.email)
//     if (image) form.append('profileImage', image)

//     const res = await axios.put(`http://localhost:5000/api/auth/profile/${user._id}`, form, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data',
//       },
//     })

//     localStorage.setItem('user', JSON.stringify(res.data.user))
//     alert('✔️ Updated')
//     window.location.reload()
//   }

//   return (
//     <div className="container mt-5" style={{ maxWidth: '500px' }}>
//       <div className="card shadow p-4">
//         <h3 className="text-center mb-4">👤 Profile</h3>

//         <div className="text-center mb-3">
//           <img
//             src={preview || 'https://via.placeholder.com/120'}
//             alt=""
//             width="120"
//             height="120"
//             className="rounded-circle border mb-3"
//             style={{ objectFit: 'cover' }}
//           />
//           <div className="mb-2">
//             <input type="file" className="form-control" onChange={handleImage} />
//           </div>
//         </div>

//         <form onSubmit={handleUpdate}>
//           <label className="form-label fw-bold">Name</label>
//           <input
//             type="text"
//             className="form-control mb-3"
//             value={user.name}
//             onChange={(e) => setUser({ ...user, name: e.target.value })}
//           />

//           <label className="form-label fw-bold">Email</label>
//           <input
//             type="email"
//             className="form-control mb-3"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//           />

//           <button className="btn btn-primary w-100">💾 Update</button>
//         </form>

//         {/* 👉 Login Button Under Profile */}
//         <div className="text-center mt-3">
//           <Link to="/login" className="btn btn-outline-secondary w-100">
//             🔑 Go to Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState({})
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user'))
    if (u) {
      setUser(u)
      if (u.profileImage) {
        setPreview(`http://localhost:5000/uploads/${u.profileImage}`)
      }
    }
  }, [])

  const handleImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const form = new FormData()
    form.append('name', user.name)
    form.append('email', user.email)
    if (image) form.append('profileImage', image)

    const res = await axios.put(`http://localhost:5000/api/auth/profile/${user.id}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    localStorage.setItem('user', JSON.stringify(res.data.user))
    alert('✔️ Profile Updated Successfully!')
    window.location.reload()
  }

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">👤 Profile</h3>

        <div className="text-center mb-3">
          <img
            src={preview || 'https://via.placeholder.com/120'}
            width="120"
            height="120"
            className="rounded-circle border mb-3"
            style={{ objectFit: 'cover' }}
          />
          <input type="file" className="form-control" onChange={handleImage} />
        </div>

        <form onSubmit={handleUpdate}>
          <input
            className="form-control mb-3"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            className="form-control mb-3"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <button className="btn btn-primary w-100">💾 Update</button>
        </form>

        <Link to="/login" className="btn btn-outline-secondary w-100 mt-3">
          🔑 Go To Login
        </Link>
      </div>
    </div>
  )
}
