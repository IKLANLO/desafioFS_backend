require('dotenv').config()
const Empresas = require('../models/Empresas')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function checkData(req, res) {
  // comprueba si existe el dato que traemos por parámetro
  // debe pasarse un objeto tipo { nombre_campo: req.body.nombre_campo }
  try {
    const check = await Empresas.findOne(req)
    return check
  } catch (error) {
    console.log(error)
  }
}

const EmpresasController = {
  async create(req, res) {
    try {
      // validamos que estén todos los campos requeridos
      const data = req.body
      if (!data.Nombre || !data.Sector || !data.Dirección || !data.Tamaño
        || !data.Email || !data.Password) {
          return res.status(401).send({ message: 'faltan datos' })
        }
      // validamos que el email no esté ya utilizado
      await checkData({Email: req.body.Email})
      // encriptamos el password
      const password = bcrypt.hashSync(req.body.Password, 10)
      const empresa = await Empresas.create({...req.body, Password: password})
      res.status(201).send({ message: 'empresa creada correctamente', empresa})
    } catch (error) {
      console.log(error)
      if (error?.code === 11000) return res.status(401)
        .send({ message: 'el email ya existe, elige otro'})

      if (error?.errors?.Email?.kind === 'regexp') return res.status(401)
      .send({ message: 'formato de email erróneo'})

      res.status(500).send({ message: 'error en la creación de la empresa'})
    }
  },

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
      res.status(500).send({ message: 'error en la petición de datos' })
    }
  },
  
  async getAllBySector(req, res) {
    const sector = req.params.sector;
    try {
      const empresaSector = await Empresas.find({ Sector : sector })
      res.status(200).send(empresaSector)
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: 'error en la petición de datos' })
    }
  },

  async getByName(req, res){
    const nombre = req.params.nombre;
    try {
      const empresa = await Empresas.findOne({
        nombre: nombre
      })
      if(empresa){
        res.status(200).send(empresa)
      }else{
        res.status(404).send({ message: 'Empresa no encontrada' });
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: 'error en la petición de datos' })
    }
  },


  //FALTA DEPURAR ESTO (NO TIRA)
async searchByName(req, res) {
  const nombre = req.params.nombre; 
  try{
    const empresas = await Empresas.find({ nombre: new RegExp(nombre, 'i') });
    if (empresas.length > 0) {
      res.status(200).send(empresas);
    } else {
      res.status(404).send({ message: 'Empresas no encontradas' });
    }
  }catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error en la petición de datos' });
  }
},
}

module.exports = EmpresasController