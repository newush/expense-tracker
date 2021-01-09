const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')

router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      return res.render('new', { categories })
    })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Category.find()
    .lean()
    .then(categories => {
      return Record.findById(id)
        .lean()
        .then((record) => res.render('edit', { record, categories }))
        .catch(error => {
          res.render('error')
          console.error(error)
        })
    })
})

router.put('/:id/edit', (req, res) => {
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
    .catch(error => {
      res.render('error')
      console.error(error)
    })
})

router.post('/', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const date = req.body.date
  const amount = req.body.amount
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => {
      res.render('error')
      console.error(error)
    })
})

router.delete('/:id/delete', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      res.render('error')
      console.error(error)
    })
})
module.exports = router
