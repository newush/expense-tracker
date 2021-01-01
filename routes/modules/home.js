const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')

router.get('/', (req, res) => {
  let totalAmount = 0
  const category = req.query.category
  Category.find()
    .lean()
    .then(categories => {
      let records = null
      if (category === undefined || category === 'all') {
        records = Record.find()
          .lean()
          .populate('category')
      } else {
        records = Record.find({
          category: req.query.category
        })
          .lean()
          .populate('category')
      }
      records.then(records => {
        records.forEach(record => { totalAmount += record.amount })
        res.render('index', { records, categories, totalAmount, category })
      })
        .catch(error => console.error(error))
    })
})
module.exports = router
