const mongoose = require('mongoose')
const { app } = require('./app')

const { HOST, PORT, DB_URL, URL } = process.env

module.exports.start = function () {
  return mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }).then(() => {
    console.log('mongoose.connected')
    app.listen(PORT, HOST, function () {
      console.log('app.started', `${URL}`)
    }).on('error', function (e) {
      console.log('app.error', e.message)
    })
  }).catch((e) => {
    console.log('mongoose.error', e.message)
  })
}
