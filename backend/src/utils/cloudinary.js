import cloudinary from '../config/cloudinary.js'

// Elimina un archivo de Cloudinary por su public_id
export const deleteFileFromCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id, { resource_type: 'auto' })
    return result
  } catch (error) {
    console.error('Error al eliminar archivo de Cloudinary:', error)
    throw error
  }
}
