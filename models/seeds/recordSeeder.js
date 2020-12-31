const mongoose = require('mongoose')
const Record = require('../Record')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  const records = [
    {
      name: '紅茶拿鐵',
      category: '餐飲食品',
      date: '12/31/2020',
      amount: 300
    },
    {
      name: '動物森友會遊戲片',
      category: '休閒娛樂',
      date: '12/31/2020',
      amount: 600
    },
    {
      name: '英國機票',
      category: '交通出行',
      date: '12/31/2020',
      amount: 60000
    },
    {
      name: '鬼滅之刃漫畫',
      category: '家居物業',
      date: '12/31/2020',
      amount: 900
    },
    {
      name: '鋼筆',
      category: '其他',
      date: '12/31/2020',
      amount: 3000
    },
  ]
  records.forEach((data) => {
    Record.create(data)
  })
  console.log('done')
})