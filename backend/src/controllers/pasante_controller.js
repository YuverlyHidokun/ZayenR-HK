import Pasante from '../models/Pasante.js'
import { sendMailToRegister, sendMailToRecoveryPassword } from "../config/nodemailer.js"
import generarJWT from '../helpers/crearJWT.js'

// Registro de pasante
const registro = async (req, res) => {
  const { email, password } = req.body
  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" })
  }

  const emailExiste = await Pasante.findOne({ email })
  if (emailExiste) {
    return res.status(400).json({ msg: "El correo ya está registrado" })
  }

  const nuevoPasante = new Pasante(req.body)
  nuevoPasante.password = await nuevoPasante.encrypPassword(password)
  const token = nuevoPasante.crearToken()
  await sendMailToRegister(email, token)
  await nuevoPasante.save()

  res.status(200).json({ msg: "Revisa tu correo electrónico para confirmar tu cuenta" })
}

const login = async (req, res) => {
  const { email, password } = req.body

  // Validar campos vacíos
  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" })
  }

  // Buscar pasante en la base de datos
  const pasante = await Pasante.findOne({ email })
  if (!pasante) {
    return res.status(404).json({ msg: "El usuario no existe" })
  }

  // Verificar que el email esté confirmado
  if (!pasante.confirmEmail) {
    return res.status(403).json({ msg: "Debes confirmar tu cuenta desde el correo" })
  }

  // Comparar contraseña
  const passwordValido = await pasante.matchPassword(password)
  if (!passwordValido) {
    return res.status(403).json({ msg: "Contraseña incorrecta" })
  }

  // Generar y devolver JWT
  const token = generarJWT(pasante._id)
  res.status(200).json({
    msg: "Login exitoso",
    token,
    pasante: {
      id: pasante._id,
      nombre: pasante.nombre,
      email: pasante.email
    }
  })
}


// Confirmar email del pasante
const confirmarMail = async (req, res) => {
  const { token } = req.params
  const pasante = await Pasante.findOne({ token })

  if (!pasante?.token) {
    return res.status(404).json({ msg: "La cuenta ya ha sido confirmada o el token es inválido" })
  }

  pasante.token = null
  pasante.confirmEmail = true
  await pasante.save()

  res.status(200).json({ msg: "Cuenta confirmada correctamente" })
}

// Recuperar password
const recuperarPassword = async (req, res) => {
  const { email } = req.body
  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" })
  }

  const pasante = await Pasante.findOne({ email })
  if (!pasante) {
    return res.status(404).json({ msg: "Usuario no encontrado" })
  }

  const token = pasante.crearToken()
  pasante.token = token
  await sendMailToRecoveryPassword(email, token)
  await pasante.save()

  res.status(200).json({ msg: "Revisa tu correo para restablecer la contraseña" })
}

// Comprobar token de password
const comprobarTokenPassword = async (req, res) => {
  const { token } = req.params
  const pasante = await Pasante.findOne({ token })
  if (!pasante) {
    return res.status(404).json({ msg: "Token inválido" })
  }
  res.status(200).json({ msg: "Token válido, puedes crear una nueva contraseña" })
}

// Crear nueva contraseña
const crearNuevoPassword = async (req, res) => {
  const { password, confirmPassword } = req.body
  const { token } = req.params

  if (Object.values(req.body).includes("")) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" })
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Las contraseñas no coinciden" })
  }

  const pasante = await Pasante.findOne({ token })
  if (!pasante) {
    return res.status(404).json({ msg: "Token inválido o cuenta no encontrada" })
  }

  pasante.token = null
  pasante.password = await pasante.encrypPassword(password)
  await pasante.save()

  res.status(200).json({ msg: "Contraseña actualizada correctamente" })
}

export {
  registro,
  login,
  confirmarMail,
  recuperarPassword,
  comprobarTokenPassword,
  crearNuevoPassword
}
