const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    select: false
  },
  accessToken: String,
  refreshToken: String
}, {
  timestamps: true
})

module.exports.UserModel = model('users', userSchema)
