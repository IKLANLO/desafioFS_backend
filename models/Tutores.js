const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const TutoresSchema = new mongoose.Schema({
  Nombre: {
    type: String,
    required: true
  },
  Telefono: {
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
  ProfilePicture: {
    type: String,
    default: 'default-profile.jpg'
  },
  IdAlumnos: [{ type: ObjectId, ref: 'Alumnos' }],
  IdProyectos: [{ type: ObjectId, ref: 'Proyectos' }],
  Token: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true })

const Tutores = mongoose.model('Tutores', TutoresSchema)

module.exports = Tutores;