const supertest = require('supertest')
const User = require('../models/User')

const { app } = require('../index')
const api = supertest(app)

const initialNotes = [
  { content: 'Aprendiendo Javascript FullStack con midudev', important: true, date: new Date() },
  { content: 'Sigueme em https://midu.tube', important: true, date: new Date() },
  { content: 'Gracias a l chat por vuestra ayuda! :D', important: true, date: new Date() }
]

const getAllContentFromNote = async () => {
  const response = await api.get('/api/notes')
  return {
    response,
    contents: response.body.map((note) => note.content)
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map((user) => user.toJSON())
}

module.exports = { api, initialNotes, getAllContentFromNote, getUsers }
