const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()


require('./config/mongoose')

const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const hbsHelpers = require('./helpers/hbs')
const methodOverride = require('method-override')
const routes = require('./routes')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: hbsHelpers }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
  secret: 'process.env.SESSION_SECRET',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
})
app.use(routes)
app.use((req, res) => {
  res.render('error')
})
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
