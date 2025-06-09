import Exposicion from '../models/Exposicion.js';
import { deleteFileFromCloudinary } from '../utils/cloudinary.js';

const crearExposicion = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body

        // Validación de campos obligatorios
        if (!nombre || !descripcion) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" })
        }

        // Verificar que se subieron los archivos
        if (!req.files?.imagen || !req.files?.audio) {
            return res.status(400).json({ msg: "Debes subir una imagen y un audio" })
        }

        // Acceder a los archivos subidos por multer con Cloudinary
        const imagen = req.files.imagen[0]
        const audio = req.files.audio[0]

        const nuevaExposicion = new Exposicion({
            nombre,
            descripcion,
            imagen: {
                url: imagen.path,
                public_id: imagen.filename
            },
            audio: {
                url: audio.path,
                public_id: audio.filename
            }
        })

        await nuevaExposicion.save()
        res.status(201).json(nuevaExposicion)

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al crear la exposición" })
    }
}

const obtenerExposiciones = async (req, res) => {
    try {
        const exposiciones = await Exposicion.find();
        res.status(200).json(exposiciones);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener las exposiciones" });
    }
};

const obtenerExposicion = async (req, res) => {
    try {
        const exposicion = await Exposicion.findById(req.params.id);
        if (!exposicion) return res.status(404).json({ msg: "Exposición no encontrada" });

        res.status(200).json(exposicion);
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener la exposición" });
    }
};

const actualizarExposicion = async (req, res) => {
    try {
        const exposicion = await Exposicion.findById(req.params.id)
        if (!exposicion) return res.status(404).json({ msg: "Exposición no encontrada" })

        const { nombre, descripcion } = req.body
        exposicion.nombre = nombre || exposicion.nombre
        exposicion.descripcion = descripcion || exposicion.descripcion

        // Actualizar imagen si se envía
        if (req.files?.imagen) {
            // Eliminar imagen anterior de Cloudinary
            await deleteFileFromCloudinary(exposicion.imagen.public_id)

            const nuevaImagen = req.files.imagen[0]
            exposicion.imagen = {
                url: nuevaImagen.path,
                public_id: nuevaImagen.filename
            }
        }

        // Actualizar audio si se envía
        if (req.files?.audio) {
            await deleteFileFromCloudinary(exposicion.audio.public_id)

            const nuevoAudio = req.files.audio[0]
            exposicion.audio = {
                url: nuevoAudio.path,
                public_id: nuevoAudio.filename
            }
        }

        await exposicion.save()
        res.status(200).json(exposicion)

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al actualizar la exposición" })
    }
}

const eliminarExposicion = async (req, res) => {
    try {
        const exposicion = await Exposicion.findById(req.params.id)
        if (!exposicion) return res.status(404).json({ msg: "Exposición no encontrada" })

        // Eliminar archivos de Cloudinary
        if (exposicion.imagen?.public_id) {
            await deleteFileFromCloudinary(exposicion.imagen.public_id)
        }

        if (exposicion.audio?.public_id) {
            await deleteFileFromCloudinary(exposicion.audio.public_id)
        }

        await exposicion.deleteOne()
        res.status(200).json({ msg: "Exposición eliminada correctamente" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error al eliminar la exposición" })
    }
}

export {
    crearExposicion,
    obtenerExposiciones,
    obtenerExposicion,
    actualizarExposicion,
    eliminarExposicion
};
