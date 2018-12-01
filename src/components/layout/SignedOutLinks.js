import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <div>
      <ul className="right navbar">
        <li className="navbar"><NavLink to='/signup'>Signup</NavLink></li>
        <li className="navbar"><NavLink to='/signin'>Login</NavLink></li>
      </ul>
    </div>
  )
}

export default SignedOutLinks