import express from 'express'
import {
  registro,
  confirmarMail,
  recuperarPassword,
  comprobarTokenPassword,
  crearNuevoPassword
} from '../controllers/pasanteController.js'

const router = express.Router()

// Registro de pasante
router.post('/registro', registro)

// Confirmar email
router.get('/confirmar/:token', confirmarMail)

// Recuperar contraseña
router.post('/recuperar-password', recuperarPassword)

// Comprobar token para crear nueva contraseña
router.get('/recuperar-password/:token', comprobarTokenPassword)

// Crear nueva contraseña
router.post('/recuperar-password/:token', crearNuevoPassword)

export default router
