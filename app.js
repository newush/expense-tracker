const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
const db = mongoose.connection

const exphbs = require('express-handlebars');

const Category = require('./models/Category')
const Record = require('./models/Record')
const bodyParser = require('body-parser')
const hbsHelpers = require('./helpers/hbs')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: hbsHelpers }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
  Record.find()
    .lean()
    .populate('category')
    .then(records => {
      res.render('index', { records })
    })
    .catch(error => console.error(error))
})
app.get('/edit/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.error(error))
})
app.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      return res.render('new', { categories })
    })
})
app.post('/', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const date = req.body.date
  const amount = req.body.amount
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})
app.post('/edit/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const date = req.body.date
  const amount = req.body.amount
  return Record.findById(id)
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.amount = amount
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})