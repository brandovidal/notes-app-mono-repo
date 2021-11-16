import React, { useRef, useState } from 'react'
import Toggable from './Toggable'

export default function NoteForm ({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('')
  const toggableRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: false
    }

    addNote(noteObject)
    setNewNote('')
    toggableRef.current.toggleVisibility()
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <Toggable ref={toggableRef} buttonLabel='Show create note'>
      <h3>Create a new note</h3>
      <form onSubmit={handleSubmit}>
        <input placeholder='Write your note' value={newNote} onChange={handleChange} />
        <button type='submit'>save</button>
      </form>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Toggable>
  )
}
