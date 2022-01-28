import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from './hooks/useUser'

import LoginForm from './components/LoginForm'

const Login = () => {
  const navigate = useNavigate()

  const { user, login } = useUser()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      login({ username, password })
      setUsername('')
      setPassword('')

      navigate('/notes')
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (errorMessage) {
    return <p>{errorMessage} </p>
  }

  if (user) {
    return <p>User is logged</p>
  }

  return (
    <>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </>
  )
}

export default Login
