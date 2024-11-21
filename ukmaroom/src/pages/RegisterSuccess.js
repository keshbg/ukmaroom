import React from 'react'
import { Link } from 'react-router-dom'

const RegisterSuccess = () => {
  return (
    <div>
      <h2>
        Thank you for registering. Please <Link to="/">Login</Link> to view or
        add rooms!!!
      </h2>
    </div>
  )
}

export default RegisterSuccess
