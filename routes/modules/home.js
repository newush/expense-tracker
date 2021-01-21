const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const category = req.query.category || 'all'
  const month = req.query.month || 'all'
  Category.find()
    .lean()
    .then(categories => {
      let records = null
      if (category === 'all') {
        records = Record.find({ userId })
          .lean()
          .populate('category')
      } else {
        records = Record.find({
          userId,
          category
        })
          .lean()
          .populate('category')
      }
      records.then(records => {
        if (month !== 'all') {
          records = records.filter((record) => record.date.getMonth() === month - 1)
        }
        records.forEach(record => { totalAmount += record.amount })
        res.render('index', { records, categories, totalAmount, category, month })
      })
        .catch(error => {
          res.render('error')
          console.error(error)
        })
    })
    .catch(error => {
      res.render('error')
      console.error(error)
    })
})
module.exports = router
