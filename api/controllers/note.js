const router = require('express').Router()

const Note = require('../models/Note')
const User = require('../models/User')

const userExtractor = require('../middleware/userExtractor')

router.get('/', async (_request, response, next) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(notes)
})

router.get('/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then((note) => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).json({ error: 'route not found' })
      }
    })
    .catch((err) => next(err))
})

router.delete('/:id', userExtractor, async (request, response, next) => {
  const { id } = request.params

  try {
    await Note.findByIdAndDelete(id)
    response.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.post('/', userExtractor, async (request, response, next) => {
  const { content, important = false } = request.body

  try {
    const { userId } = request
    const user = await User.findById(userId)

    if (!content) {
      return response.status(400).json({ error: 'note.content is missing' })
    }

    const newNote = Note({
      content: content,
      date: new Date(),
      important: important || false,
      user: user._id
    })

    const saveNote = await newNote.save()
    user.notes = user.notes.concat(saveNote._id)
    await user.save()

    response.status(201).json(saveNote)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then((result) => response.status(200).json(result))
    .catch((err) => next(err))
})

module.exports = router
