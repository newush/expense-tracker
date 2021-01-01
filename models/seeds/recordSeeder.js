const mongoose = require('mongoose')
const Record = require('../Record')
const Category = require('../Category')
mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Category.find()
    .lean()
    .then((categories) => {
      Record.create(
        {
          name: '紅茶拿鐵',
          category: categories[0]._id,
          date: '2020-12-31',
          amount: 300
        },
        {
          name: '動物森友會遊戲片',
          category: categories[1]._id,
          date: '2020-12-31',
          amount: 600
        },
        {
          name: '英國機票',
          category: categories[2]._id,
          date: '2020-12-31',
          amount: 60000
        },
        {
          name: '鬼滅之刃漫畫',
          category: categories[3]._id,
          date: '2020-12-30',
          amount: 900
        },
        {
          name: '鋼筆',
          category: categories[4]._id,
          date: '2020-12-30',
          amount: 3000
        }
      ).then(() => {
        console.log('done')
        db.close()
      })
    })
})
