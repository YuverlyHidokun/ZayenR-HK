import express from 'express'
import fileUpload from 'express-fileupload'

import {
  crearExposicion,
  obtenerExposiciones,
  obtenerExposicion,
  actualizarExposicion,
  eliminarExposicion
} from '../controllers/exposicionController.js'

const router = express.Router()

router.use(fileUpload({ useTempFiles: true, tempFileDir: './uploads' }))

router.post('/', crearExposicion)
router.get('/', obtenerExposiciones)
router.get('/:id', obtenerExposicion)
router.put('/:id', actualizarExposicion)
router.delete('/:id', eliminarExposicion)

export default router
