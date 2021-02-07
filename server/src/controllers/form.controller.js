const { FormModel } = require('../models/form.model')
const ejs = require('ejs')
const pdf = require('html-pdf')
const path = require('path')

module.exports.list = function (req, res) {
  const query = {
    userId: req.user._id
  }

  return FormModel.find(query).then(forms => {
    return res.api(
      200,
      'forms.listed',
      {
        forms
      }
    )
  })
}

module.exports.create = function (req, res) {
  const { name, fields } = req.body

  return FormModel.create(
    {
      userId: req.user._id,
      name,
      fields
    }
  )
    .then(form => {
      return res.api(
        200,
        'form.created',
        {
          form
        }
      )
    })
}

module.exports.details = function (req, res) {
  const { _id } = req.params

  return FormModel.findOne({ _id })
    .then(form => {
      return res.api(
        200,
        'form.details',
        {
          form
        }
      )
    })
}

module.exports.update = function (req, res) {
  const { _id } = req.params
  const { name, fields } = req.body

  return FormModel.update(
    {
      _id
    },
    {
      name,
      fields
    }
  )
    .then(form => {
      return res.api(
        200,
        'form.updated',
        {
          form
        }
      )
    })
}

module.exports.delete = function (req, res) {
  const { _id } = req.params

  return FormModel.deleteMany({ _id })
    .then(() => {
      return res.api(
        200,
        'form.deleted'
      )
    })
}

module.exports.download = function (req, res) {
  const { _id } = req.params

  const { fields } = req.body

  return FormModel.findOne({ _id })
    .then(form => {
      form.fields.map(field => {
        const valueField = fields.find(f => f._id === field._id.toString())
        field.value = valueField && valueField.value
        return field
      })
      return ejs.renderFile(path.resolve(__dirname, '../views/form.ejs'), { form }, (err, data) => {
        if (err) {
          console.log(err)
          return res.api(
            500,
            'Internal Error'
          )
        }
        const options = {
          height: '11.25in',
          width: '8.5in',
          header: {
            height: '20mm'
          },
          footer: {
            height: '20mm'
          }
        }
        res.header('content-disposition', 'attachment;filename=file.pdf')
        const doc = pdf.create(data, options)
        doc.toStream(function (err, stream) {
          if (err) {
            console.log(err)
            return res.api(
              500,
              'Internal Error'
            )
          }
          res.type('pdf')
          return stream.pipe(res)
        })
      })
    })
}
