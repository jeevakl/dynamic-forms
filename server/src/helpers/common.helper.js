const util = require('util')
const { URL } = process.env

const urls = {
  googleRedirect: '/api/auth/google/callback'
}

module.exports.url = function (name, ...params) {
  const url = URL + urls[name]
  return util.format(url, ...params)
}
