import React, { useState } from 'react'

import { useNotes } from './hooks/useNotes'
import { useUser } from './hooks/useUser'

import NoteForm from './components/NoteForm'
import Note from './components/Note'
import Notification from './components/Notification'

const NoteApp = () => {
  const { notes, addNote, toggleImportanceOf } = useNotes()
  const { user, logout } = useUser()

  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogout = () => {
    logout()
  }

  const toggleImportanceOfNote = (id) => {
    toggleImportanceOf(id).catch(() => {
      setErrorMessage('Note was already removed from server')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user ? <NoteForm addNote={addNote} handleLogout={handleLogout} /> : ''}

      <div>
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'important' : 'all'}</button>
      </div>
      <ul>
        {notesToShow.map((note, i) => (
          <Note key={i} note={note} toggleImportance={() => toggleImportanceOfNote(note.id)} />
        ))}
      </ul>
    </div>
  )
}

export default NoteApp
