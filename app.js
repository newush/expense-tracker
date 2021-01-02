const express = require('express')
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
app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${port}`)
})
