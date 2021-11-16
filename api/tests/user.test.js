const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const User = require('../models/User')

const { api, getUsers } = require('./helpers')
const { server } = require('../index')

beforeEach(async () => {
  await User.deleteMany()

  const passwordHash = await bcrypt.hash('psswd', 10)
  const user = new User({ username: 'miduroot', name: 'Miguel', passwordHash })

  await user.save()
})

describe('GET /api/users', () => {
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('POST /api/users', () => {
  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'midudev',
      name: 'Miguel',
      password: 'tw1tch'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username is already token', async () => {
    const usersAtStart = await getUsers()

    const newUser = { username: 'miduroot', name: 'Miguel', password: 'midutest' }

    const result = await api.post('/api/users').send(newUser).expect(400)

    expect(result.body.errors.username.message).toContain('`username` to be unique')

    const usersAtEnd = await getUsers()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
  server.close()
})
