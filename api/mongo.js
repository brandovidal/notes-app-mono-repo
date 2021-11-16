const mongoose = require('mongoose')

const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGO_DB_URI_TEST : MONGO_DB_URI

if (!connectionString) {
  console.error('Ingresa tu variable MONGO_DB_URI para la conexion a tu BD de Mongo')
}

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Database connected')
  })
  .catch((err) => console.error(err))

process.on('uncaughtException', (err) => {
  console.error(err)
  mongoose.disconnect()
})
