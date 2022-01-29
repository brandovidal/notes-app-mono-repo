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
      console.log({ username, password })
      const isLogin = await login({ username, password })

      if (!isLogin) {
        setErrorMessage('Wrong credentials')
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      } else {
        setUsername('')
        setPassword('')
        navigate('/notes')
      }
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
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
