import { useEffect, useState } from 'react'

import noteService from '../services/notes'
import loginService from '../services/login'

export const useUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const login = async ({ username, password }) => {
    const user =
      (await loginService.login({ username, password }).catch((e) => {
        console.log('error', e)
      })) || null

    if (user) {
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    }
    return user
  }

  const logout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    noteService.setToken(null)
    setUser(null)
  }

  return { user, logout, login }
}
