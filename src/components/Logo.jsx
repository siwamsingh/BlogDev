import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div  className=''>
      <svg width="50" height="50" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

        <rect x="50" y="20" width="100" height="160" rx="15" ry="15" fill="none" stroke="#4A90E2" strokeWidth="8" />
        <circle cx="100" cy="170" r="5" fill="#4A90E2" />

        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          fontFamily="Arial, sans-serif" fontSize="72" fill="#4A90E2">
          B
        </text>
      </svg>

    </div>
  )
}

export default Logo