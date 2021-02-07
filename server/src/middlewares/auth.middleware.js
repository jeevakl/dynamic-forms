module.exports.auth = function (req, res, next) {
  if (!req.user) {
    return res.api(
      401,
      'unauthorized'
    )
  }
  next()
}
