require('dotenv').config()
const express = require('express')
const path = require('path')

const AuthRouter = require('./auth/auth_router')
const ImagesRouter = require('./images/images_router')

const app = express()
const port = 3000

// frontend app and static files
const staticPath = path.join(__dirname, '../dist')
app.use(express.static(staticPath))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Api routes
app.use('/api/v1', AuthRouter)
app.use('/api/v1/images', ImagesRouter)

app.use('/*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
