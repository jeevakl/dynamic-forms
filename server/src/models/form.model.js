const { Schema, model } = require('mongoose')

const formSchema = new Schema({
  userId: Schema.Types.ObjectId,
  name: String,
  fields: [
    {
      type: {
        type: String,
        enum: ['textbox', 'dropdown'],
        default: 'textbox'
      },
      options: {
        type: String
      },
      label: {
        type: String
      }
    }
  ]
}, {
  timestamps: true
})

module.exports.FormModel = model('forms', formSchema)
