import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CHeader,
  CContainer,
  CHeaderToggler,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownItem,
  CAvatar,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

export default function AppHeader() {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  const avatar = user?.profileImage
    ? `http://localhost:5000/uploads/${user.profileImage}`
    : 'https://via.placeholder.com/120'

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <CHeader position="sticky" className="bg-white shadow-sm py-2">
      <CContainer fluid className="d-flex justify-content-between align-items-center">
        <CHeaderToggler onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CDropdown>
          <CDropdownToggle color="light" className="d-flex align-items-center">
            <CAvatar src={avatar} size="md" className="me-2" />
            {user?.name || 'Guest'}
          </CDropdownToggle>

          <CDropdownMenu>
            {user && <CDropdownItem disabled>{user.email}</CDropdownItem>}

            {token && (
              <CDropdownItem onClick={() => navigate('/profile')}>Update Profile</CDropdownItem>
            )}

            {!token && <CDropdownItem onClick={() => navigate('/login')}>Login</CDropdownItem>}

            {token && <CDropdownItem onClick={handleLogout}>Logout</CDropdownItem>}
          </CDropdownMenu>
        </CDropdown>
      </CContainer>
    </CHeader>
  )
}
