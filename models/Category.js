const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    requried: true
  },
  records: [
    { type: Schema.Types.ObjectId, ref: 'Record' }
  ]
})
module.exports = mongoose.model('Category', categorySchema)
