const express = require('express')
const app = express()
const port = 3000

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