const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/User')
router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exists.')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => {
          res.render('error')
          console.log(err)
        })
    }
  })
})
module.exports = router