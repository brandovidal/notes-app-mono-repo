import { useParams } from 'react-router'

const NoteDetail = ({ notes }) => {
  const { noteId } = useParams()
  const note = notes.find((note) => note.id === noteId)
  console.log({ note })

  if (!note) return null

  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note?.user?.name}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  )
}

export default NoteDetail
