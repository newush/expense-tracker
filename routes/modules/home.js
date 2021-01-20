const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  const userId = req.user._id
  let totalAmount = 0
  const category = req.query.category
  Category.find()
    .lean()
    .then(categories => {
      let records = null
      if (category === undefined || category === 'all') {
        records = Record.find({ userId })
          .lean()
          .populate('category')
      } else {
        records = Record.find({
          userId,
          category: req.query.category
        })
          .lean()
          .populate('category')
      }
      records.then(records => {
        records.forEach(record => { totalAmount += record.amount })
        res.render('index', { records, categories, totalAmount, category })
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
