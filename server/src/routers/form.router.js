const express = require('express')
const { list, create, details, update, delete: formDelete, download } = require('../controllers/form.controller')
const { name, _id } = require('../validations/form.validation')
const { validate } = require('../middlewares/validate.middleware')
const { auth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.use('/form', auth)
router.get('/form', validate, list)
router.post('/form', [name], validate, create)
router.get('/form/:_id', [_id], validate, details)
router.put('/form/:_id', [_id, name], validate, update)
router.delete('/form/:_id', [_id], validate, formDelete)
router.post('/form/:_id/fill', [_id], validate, download)

module.exports.formRouter = router
