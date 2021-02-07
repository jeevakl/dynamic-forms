const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const passport = require('passport')
const authLib = require('./libraries/auth.library')

const { apiResponse } = require('./middlewares/apiResponse.middleware')
const { formRouter } = require('./routers/form.router')
const { authRouter } = require('./routers/auth.router')

const { WHITELIST } = process.env

const app = express()

app.use(cors({
  origin: WHITELIST ? WHITELIST.split(',') : '*'
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))

app.use(passport.initialize())
app.use(passport.session())
authLib.init()

app.use(apiResponse)

const router = express.Router()
router.use('/api', authRouter, formRouter)
app.use(router)

app.use(express.static(path.resolve(__dirname, '../../client/dist/')))
app.use('/', function (req, res) {
  const file = path.resolve(__dirname, '../../client/dist/index.html')

  res.sendFile(file)
})

module.exports.app = app
