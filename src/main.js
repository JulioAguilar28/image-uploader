require('dotenv').config()
const express = require('express')

const AuthRouter = require('./auth/auth_router')
const ImagesRouter = require('./images/images_router')

const app = express()
const port = 3000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Api routes
app.use('/api/v1', AuthRouter)
app.use('/api/v1/images', ImagesRouter)

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
