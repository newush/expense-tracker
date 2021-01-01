//express
//models
const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')
//新增一筆資料
router.get('/new', (req, res) => {
  Category.find()
    .lean()
    .then(categories => {
      return res.render('new', { categories })
    })
})
//瀏覽所有資料
router.get('/', (req, res) => {
  let totalAmount = 0
  const category = req.query.category
  if (category === undefined || category === 'all') {
    Category.find()
      .lean()
      .then(categories => {
        return Record.find()
          .lean()
          .populate('category')
          .then(records => {
            records.forEach(record => { totalAmount += record.amount })
            res.render('index', { records, categories, totalAmount, category })
          })
          .catch(error => console.error(error))
      })
  } else {
    Category.find()
      .lean()
      .then(categories => {
        return Record.find({
          category: req.query.category
        })
          .lean()
          .populate('category')
          .then(records => {
            records.forEach(record => { totalAmount += record.amount })
            res.render('index', { records, categories, totalAmount, category })
          })
          .catch(error => console.error(error))
      })
  }
})
//修改一筆資料後送出
router.put('/:id', (req, res) => {
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
//新增一筆資料後送出
router.post('/', (req, res) => {
  const name = req.body.name
  const category = req.body.category
  const date = req.body.date
  const amount = req.body.amount
  return Record.create({ name, category, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})
module.exports = router