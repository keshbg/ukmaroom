import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../helpers/api'
import { setToken, setUserId } from '../helpers/auth'
import FormInput from '../components/FormInput'

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [errorInfo, setErrorInfo] = useState({})
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    login(data).then(handleSuccessfulLogin).catch(handleError)
  }
  const handleSuccessfulLogin = ({ token, userId }) => {
    setToken(token)
    setUserId(userId)
    setIsLoggedIn(true)
    setIsError(false)
    navigate('/home')
  }
  const handleError = (error) => {
    if (error.response) {
      setErrorInfo(error.response.data)
      setIsError(true)
    }
  }
  const handleFormChange = (event) => {
    const { name, value } = event.target
    setData({
      ...data,
      [name]: value,
    })
  }
  console.log(errorInfo)

  const formInputProps = { data, errorInfo, handleFormChange }

  return (
    <section className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign In</h1>
        <FormInput
          placeholder="email"
          type="email"
          name="email"
          {...formInputProps}
        />
        <FormInput
          placeholder="password"
          type="password"
          name="password"
          {...formInputProps}
        />
        <div className="submit-section">
          <input type="submit" value="Login" />
        </div>
        {isError ? (
          <div className="error">
            <p>The login credintials do not match. Please try again !!!</p>
          </div>
        ) : (
          <></>
        )}
      </form>
      <div className="signup">
        <p>
          {' '}
          Not a Member? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </section>
  )
}
export default Login
