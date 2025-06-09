import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinary.js'

// Puedes crear un storage general o por tipo (imagen, audio)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'museo_orces', // Carpeta donde se guardarán los archivos
    allowed_formats: ['jpg', 'png', 'jpeg', 'mp3', 'wav', 'webm', 'mp4']
  }
})

const upload = multer({ storage })

export default upload
