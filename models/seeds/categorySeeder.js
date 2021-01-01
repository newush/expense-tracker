const Category = require('../Category')
const db = require('../../config/mongoose')
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
