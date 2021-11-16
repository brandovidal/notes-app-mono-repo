const express = require('express')
const cors = require('cors')

require('dotenv').config()
require('./mongo')

const Sentry = require('@sentry/node')
const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')

// Router
const noteRouter = require('./controllers/note')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

const app = express()

// support body request
app.use(cors())
app.use(express.json())

// Web Compiled
app.use(express.static('../web/build'))

// Sentry by errors
Sentry.init({
  dsn: 'https://fcc85251da3f43c3b094126e19e5dc88@o1049250.ingest.sentry.io/6030554',
  tracesSampleRate: 1.0
})

// REST
app.use('/api/notes', noteRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

// Handle errors
app.use(notFound)
app.use(Sentry.Handlers.errorHandler())
app.use(handleErrors)

// Listen server
const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
