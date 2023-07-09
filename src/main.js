const express = require('express')

const AuthRouter = require('./auth/router')

const app = express()
const port = 3000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Api routes
app.use('/api', AuthRouter)

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
