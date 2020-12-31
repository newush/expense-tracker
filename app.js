const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send(`This is my first Express Web App`)
})
app.get('/edit/:id', (req, res) => {
  res.send(`This is edit page`)
})
app.get('/new', (req, res) => {
  res.send(`This is new page`)
})
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})