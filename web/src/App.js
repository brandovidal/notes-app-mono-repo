import React from 'react'
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom'

import { useUser } from './hooks/useUser'
import { useNotes } from './hooks/useNotes'

import Notes from './Notes'
import Login from './Login'

import NoteDetail from './components/NoteDetail'

const Home = () => <h1>Home</h1>

const Users = () => <h1>Users</h1>

const inlineStyles = {
  padding: 5
}

const RequireAuth = ({ children, user }) => {
  if (user !== null) {
    return <Navigate replace to='/' />
  }
  return children
}

const App = () => {
  const { user } = useUser()
  const { notes } = useNotes()

  return (
    <BrowserRouter>
      <header>
        <Link to='/' style={inlineStyles}>
          Home
        </Link>
        <Link to='/notes' style={inlineStyles}>
          Notes
        </Link>
        <Link to='/users' style={inlineStyles}>
          Users
        </Link>
        {user
          ? (
            <em>Logged as {user.name}</em>
            )
          : (
            <Link to='/login' style={inlineStyles}>
              Login
            </Link>
            )}
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/notes' element={<Notes />} />
        <Route path='/notes/:noteId' element={<NoteDetail notes={notes} />} />
        <Route path='/users' element={<Users />} />
        <Route
          path='/login'
          element={
            <RequireAuth user={user}>
              <Login />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
