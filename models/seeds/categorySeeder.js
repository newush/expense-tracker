const mongoose = require('mongoose')
const Category = require('../Category')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {

  Category.create(
    { name: '餐飲食品' },
    { name: '休閒娛樂' },
    { name: '交通出行' },
    { name: '家居物業' },
    { name: '其他' }
  ).then(() => {
    db.close()
    console.log('category done')
  })
})