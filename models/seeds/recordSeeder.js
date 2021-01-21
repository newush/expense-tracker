const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../Record')
const Category = require('../Category')
const User = require('../User')
const db = require('../../config/mongoose')
const SEED_USER =
{
  name: 'user1',
  email: 'user1@example.com',
  password: '123'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      Category.find()
        .lean()
        .then((categories) => {
          Record.create(
            {
              name: '紅茶拿鐵',
              category: categories[0]._id,
              date: new Date('2020-12-31'),
              merchant: '五十嵐',
              amount: 300,
              userId
            },
            {
              name: '動物森友會遊戲片',
              category: categories[1]._id,
              date: new Date('2020-12-31'),
              merchant: 'Nintendo',
              amount: 600,
              userId
            },
            {
              name: '英國機票',
              category: categories[2]._id,
              date: new Date('2020-12-31'),
              merchant: 'Friend',
              amount: 60000,
              userId
            },
            {
              name: '鬼滅之刃漫畫',
              category: categories[3]._id,
              date: new Date('2020-12-31'),
              merchant: '捷比',
              amount: 900,
              userId
            },
            {
              name: '鋼筆',
              category: categories[4]._id,
              date: new Date('2020-12-31'),
              merchant: '誠品',
              amount: 3000,
              userId
            }
          ).then(() => {
            console.log('records done')
            process.exit()
          })
        })
    })
})
