require('dotenv').config()
const Empresas = require('../models/Empresas')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const EmpresasController = {
  async getAll(req, res) {
    try {
      /* 
      si queremos añadir paginación:
      const { page = 1, limit = 10 } = req.query
      const empresasData = await Empresas.find().limit(limit).skip(page - 1) * limit)
      */
      const empresasData = await Empresas.find()
      res.status(200).send(empresasData)
    } catch (error) {
      console.log(error)
      res.status(500).send('error requesting data')
    }
  }
}

module.exports = EmpresasController