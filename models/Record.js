const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  date: {
    amount: String,
    required: true
  },
  amount: {
    type: Number,
    requried: true
  }
})
module.exports = mongoose.model('Record', recordSchema)
