import { Schema, model } from 'mongoose'

const exposicionSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  },
  imagenUrl: {
    type: String,
    required: true
  },
  imagenId: {
    type: String, // public_id de Cloudinary para borrar si se necesita
    required: true
  },
  audioUrl: {
    type: String,
    required: true
  },
  audioId: {
    type: String,
    required: true
  },
  creadoPor: {
    type: Schema.Types.ObjectId,
    ref: 'Pasante',
    required: true
  }
}, {
  timestamps: true
})

export default model('Exposicion', exposicionSchema)
