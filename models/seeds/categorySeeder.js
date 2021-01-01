const mongoose = require('mongoose')
const Category = require('../Category')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {

  Category.create(
    {
      name: '餐飲食品',
      icon: 'fa-utensils'
    },
    {
      name: '休閒娛樂',
      icon: 'fa-grin-beam'
    },
    {
      name: '交通出行',
      icon: 'fa-shuttle-van'
    },
    {
      name: '家居物業',
      icon: 'fa-home'
    },
    {
      name: '其他',
      icon: 'fa-hand-holding-usd'
    }
  ).then(() => {
    db.close()
    console.log('category done')
  })
})