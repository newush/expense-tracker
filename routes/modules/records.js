const express = require('express')
const router = express.Router()
const Category = require('../../models/Category')
const Record = require('../../models/Record')

router.get('/:id', (req, res) => {
  const id = req.params.id
  Category.find()
    .lean()
    .then(categories => {
      return Record.findById(id)
        .lean()
        .then((record) => res.render('edit', { record, categories }))
        .catch(error => console.error(error))
    })
})
module.exports = router
