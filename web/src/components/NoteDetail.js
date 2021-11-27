import { useParams } from 'react-router'

function NoteDetail ({ notes }) {
  const { noteId } = useParams()
  const note = notes.find((note) => note.id === noteId)
  console.log({ note })

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note?.user?.username}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  )
}

export default NoteDetail
