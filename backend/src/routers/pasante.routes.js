import express from 'express'
import {
  registro,
  login,
  confirmarMail,
  recuperarPassword,
  comprobarTokenPassword,
  crearNuevoPassword
} from '../controllers/pasante_controller.js'

const router = express.Router()

//Login del pasante
router.post('/login', login)

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
