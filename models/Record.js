const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})
module.exports = mongoose.model('Record', recordSchema)
