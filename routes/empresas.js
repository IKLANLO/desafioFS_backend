const express = require('express')
const router = express.Router()
const EmpresasController = require('../controllers/EmpresasController')

router.get('/', EmpresasController.getAll)
router.post('/create', EmpresasController.create)
router.get('/getAllBySector/:sector', EmpresasController.getAllBySector)
router.get('/getByName/:nombre', EmpresasController.getByName);

//SEARCH
router.get('/search/:nombre', EmpresasController.searchByName);


//
module.exports = router