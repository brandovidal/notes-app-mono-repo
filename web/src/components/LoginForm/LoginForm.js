import React from 'react'
import propTypes from 'prop-types'

const NO_OP = () => {}

const LoginForm = ({ username = '', password = '', handleUsernameChange, handlePasswordChange, handleSubmit = NO_OP }) => {
  return (
    <form data-test-id='login-form' onSubmit={handleSubmit}>
      <div>
        <input type='text' value={username} name='username' onChange={handleUsernameChange} placeholder='Username' />
      </div>

      <div>
        <input type='password' value={password} name='password' onChange={handlePasswordChange} placeholder='Password' />
      </div>
      <button>Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: propTypes.string,
  password: propTypes.string,
  handleSubmit: propTypes.func
}

export default LoginForm
