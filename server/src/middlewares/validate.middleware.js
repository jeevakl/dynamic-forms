const { validationResult } = require('express-validator')

module.exports.validate = function (req, res, next) {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  errors.array().map(error => {
    delete error.value
  })
  console.log(errors)
  return res.api(
    422,
    'validation.errors',
    {
      errors: errors.array()
    }
  )
}
