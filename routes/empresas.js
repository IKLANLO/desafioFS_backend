const express = require('express')
const router = express.Router()
const EmpresasController = require('../controllers/EmpresasController')

router.get('/', EmpresasController.getAll)

module.exports = router