import React from 'react'
import propTypes from 'prop-types'

const NO_OP = () => {}

const LoginForm = ({ handleSubmit = NO_OP, ...props }) => {
  return (
    <form data-test-id='login-form' onSubmit={handleSubmit}>
      <div>
        <input type='text' value={props.username} name='Username' placeholder='Username' onChange={props.handleUsernameChange} />
      </div>

      <div>
        <input type='password' value={props.password} name='Password' placeholder='Password' onChange={props.handlePasswordChange} />
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
