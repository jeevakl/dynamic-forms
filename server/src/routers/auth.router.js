const express = require('express')
const passport = require('passport')
const { auth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }))
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    return res.redirect('/')
  }
)

router.get('/auth/me', auth, (req, res) => {
  res.api(
    200,
    'auth.me',
    {
      user: req.user
    }
  )
})

router.get('/auth/logout', auth, (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.exports.authRouter = router
