import React, { useState } from 'react'

export default function Checkbox() {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div style={{ padding: '20px' }}>
      <label style={{ cursor: 'pointer', fontSize: '18px' }}>
        <input
          type="checkbox"
          checked={isOpen}
          onChange={handleChange}
          style={{ marginRight: '8px' }}
        />
        Show Details
      </label>

      {isOpen && (
        <div
          style={{
            marginTop: '15px',
            padding: '15px',
            border: '2px solid #008cff',
            borderRadius: '8px',
          }}
        >
          <h4>📌 Details Box Open شو</h4>
          <p>په دې ځای کې خپل content، form، list، table هر څه اېښودلی شې.</p>
        </div>
      )}
    </div>
  )
}
