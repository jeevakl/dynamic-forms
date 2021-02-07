const passport = require('passport')
const GoogleStratergy = require('passport-google-oauth').OAuth2Strategy
const { url } = require('..//helpers/common.helper')
const { UserModel } = require('..//models/user.model')

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

module.exports.init = () => {
  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })

  passport.use(
    new GoogleStratergy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: url('googleRedirect')
      },
      function (accessToken, refreshToken, profile, done) {
        UserModel.findOne({ googleId: profile.id })
          .then(user => {
            if (!user) {
              UserModel.create(
                {
                  name: profile.displayName,
                  accessToken,
                  refreshToken,
                  googleId: profile.id
                }
              ).then(user => {
                return done(null, user)
              })
            } else {
              return done(null, user)
            }
          })
      }
    )
  )
}
