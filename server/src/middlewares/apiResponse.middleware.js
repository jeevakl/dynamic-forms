module.exports.apiResponse = function (req, res, next) {
  res.api = (status, message, data) => {
    return res.status(200)
      .json({
        status,
        message,
        data
      })
  }

  next()
}
