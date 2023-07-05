import express, { Express } from 'express'

const app: Express = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
