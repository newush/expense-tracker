const Record = require('../Record')
const Category = require('../Category')
const db = require('../../config/mongoose')
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
          merchant: '五十嵐',
          amount: 300
        },
        {
          name: '動物森友會遊戲片',
          category: categories[1]._id,
          date: '2020-12-31',
          merchant: 'Nintendo',
          amount: 600
        },
        {
          name: '英國機票',
          category: categories[2]._id,
          date: '2020-12-31',
          merchant: 'Friend',
          amount: 60000
        },
        {
          name: '鬼滅之刃漫畫',
          category: categories[3]._id,
          date: '2020-12-30',
          merchant: '捷比',
          amount: 900
        },
        {
          name: '鋼筆',
          category: categories[4]._id,
          date: '2020-12-30',
          merchant: '誠品',
          amount: 3000
        }
      ).then(() => {
        console.log('done')
        db.close()
      })
    })
})
