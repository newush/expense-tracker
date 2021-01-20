const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const app = express()
const port = process.env.PORT || 3000

require('./config/mongoose')

const exphbs = require('express-handlebars')

const bodyParser = require('body-parser')
const hbsHelpers = require('./helpers/hbs')
const methodOverride = require('method-override')
const routes = require('./routes')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: hbsHelpers }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)
//設定本地變數 res.locals
//在 usePassport(app) 之後、app.use(routes) 之前，加入一組 middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)
app.use((req, res) => {
  res.render('error')
})
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
