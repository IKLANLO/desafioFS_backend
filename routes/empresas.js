const express = require('express')
const router = express.Router()
const EmpresasController = require('../controllers/EmpresasController')

router.get('/', EmpresasController.getAll)
router.post('/create', EmpresasController.create)
router.get('/getAllBySector/:Sector', EmpresasController.getAllBySector)
router.get('/getByName/:Nombre', EmpresasController.getByName);
router.get('/getBySize/:Tamano', EmpresasController.getBySize);
//SEARCH
router.get('/search/:Nombre', EmpresasController.searchByName);


//
module.exports = router