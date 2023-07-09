const express = require('express')
const { Sequelize } = require('sequelize')

const AuthRouter = require('./auth/router')

const app = express()
const port = 3000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sequelize = new Sequelize('image_uploader_database_development', null, null, {
  dialect: 'sqlite',
  storage: './db/image_uploader_database_development.sqlite'
})

sequelize
  .sync({ force: true })
  .then(() => {
    console.log('database sync succesffully')
  })
  .catch((error) => {
    console.log(error)
  })

// Api routes
app.use('/api', AuthRouter)

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
