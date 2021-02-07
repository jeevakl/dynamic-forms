const { body, param } = require('express-validator')
const { Types } = require('mongoose')
const { FormModel } = require('../models/form.model')

module.exports._id = param('_id')
  .isMongoId().withMessage('validation._id.invalid')
  .bail()
  .customSanitizer((value) => {
    return Types.ObjectId(value)
  })
  .custom((value, { req }) => {
    return FormModel.findOne({ userId: req.user._id, _id: value })
      .then(isExists => {
        if (!isExists) {
          throw new Error('validation._id.notExist')
        }
      })
  })

module.exports.name = body('name')
  .exists().withMessage('validation.name.required')
  .bail()
  .trim()
