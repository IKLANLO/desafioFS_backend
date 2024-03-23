const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const EmpresasSchema = new mongoose.Schema({
  Nombre: {
    type: String,
    required: true
  },
  Sector: {
    type: String,
    required: true
  },
  Dirección: {
    type: String,
    required: true
  },
  Tamaño: {
    type: Number,
    required: true
  },
  Email: {
    type: String,
    required: true,
    match: [/.+\@.+\..+/],
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  IdProyecto: [{ type: ObjectId, ref: 'Proyectos' }]
}, { timestamps: true })

const Empresas = mongoose.model('Empresas', EmpresasSchema)

module.exports = Empresas;