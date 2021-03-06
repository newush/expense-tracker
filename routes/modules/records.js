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
    .catch(error => {
      res.render('error')
      console.error(error)
    })
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Category.find()
    .lean()
    .then(categories => {
      return Record.findOne({ _id, userId })
        .lean()
        .then((record) => (
          res.render('edit', { record, categories })
        ))
        .catch(error => {
          res.render('error')
          console.error(error)
        })
    })
})

router.put('/:id/edit', (req, res) => {
  const _id = req.params.id
  const name = req.body.name
  const category = req.body.category
  const date = req.body.date
  const merchant = req.body.merchant
  const amount = req.body.amount
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => {
      record.name = name
      record.category = category
      record.date = date
      record.merchant = merchant
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
  const merchant = req.body.merchant
  const amount = req.body.amount
  const userId = req.user._id
  return Record.create({ name, category, date, merchant, amount, userId })
    .then(() => res.redirect('/'))
    .catch(error => {
      res.render('error')
      console.error(error)
    })
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      res.render('error')
      console.error(error)
    })
})
module.exports = router
