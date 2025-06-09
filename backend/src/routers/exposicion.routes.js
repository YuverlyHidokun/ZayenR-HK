import express from 'express'
import upload from '../middleware/upload.js'

import {
  crearExposicion,
  obtenerExposiciones,
  obtenerExposicion,
  actualizarExposicion,
  eliminarExposicion
} from '../controllers/exposicion_controller.js'

const router = express.Router()

// Crear exposición con imagen y audio
router.post(
  '/',
  upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]),
  crearExposicion
)

// Obtener todas
router.get('/', obtenerExposiciones)

// Obtener una por ID
router.get('/:id', obtenerExposicion)

// Actualizar (puede traer nuevos archivos)
router.put(
  '/:id',
  upload.fields([
    { name: 'imagen', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
  ]),
  actualizarExposicion
)

// Eliminar
router.delete('/:id', eliminarExposicion)

export default router
