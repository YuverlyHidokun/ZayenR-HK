import Exposicion from '../models/Exposicion.js';
import { uploadImageToCloudinary, uploadAudioToCloudinary, deleteFileFromCloudinary } from '../utils/cloudinary.js';

const crearExposicion = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        // Verificar campos requeridos
        if (!nombre || !descripcion) {
            return res.status(400).json({ msg: "Todos los campos son obligatorios" });
        }

        // Verificar si se cargó imagen y audio
        if (!req.files?.imagen || !req.files?.audio) {
            return res.status(400).json({ msg: "Debes subir una imagen y un audio" });
        }

        const imagenResult = await uploadImageToCloudinary(req.files.imagen.tempFilePath);
        const audioResult = await uploadAudioToCloudinary(req.files.audio.tempFilePath);

        const nuevaExposicion = new Exposicion({
            nombre,
            descripcion,
            imagen: {
                url: imagenResult.secure_url,
                public_id: imagenResult.public_id
            },
            audio: {
                url: audioResult.secure_url,
                public_id: audioResult.public_id
            }
        });

        await nuevaExposicion.save();
        res.status(201).json(nuevaExposicion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear la exposición" });
    }
};

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
        const exposicion = await Exposicion.findById(req.params.id);
        if (!exposicion) return res.status(404).json({ msg: "Exposición no encontrada" });

        const { nombre, descripcion } = req.body;
        exposicion.nombre = nombre || exposicion.nombre;
        exposicion.descripcion = descripcion || exposicion.descripcion;

        if (req.files?.imagen) {
            await deleteFileFromCloudinary(exposicion.imagen.public_id);
            const nuevaImagen = await uploadImageToCloudinary(req.files.imagen.tempFilePath);
            exposicion.imagen = {
                url: nuevaImagen.secure_url,
                public_id: nuevaImagen.public_id
            };
        }

        if (req.files?.audio) {
            await deleteFileFromCloudinary(exposicion.audio.public_id);
            const nuevoAudio = await uploadAudioToCloudinary(req.files.audio.tempFilePath);
            exposicion.audio = {
                url: nuevoAudio.secure_url,
                public_id: nuevoAudio.public_id
            };
        }

        await exposicion.save();
        res.status(200).json(exposicion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar la exposición" });
    }
};

const eliminarExposicion = async (req, res) => {
    try {
        const exposicion = await Exposicion.findById(req.params.id);
        if (!exposicion) return res.status(404).json({ msg: "Exposición no encontrada" });

        await deleteFileFromCloudinary(exposicion.imagen.public_id);
        await deleteFileFromCloudinary(exposicion.audio.public_id);
        await exposicion.deleteOne();

        res.status(200).json({ msg: "Exposición eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar la exposición" });
    }
};

export {
    crearExposicion,
    obtenerExposiciones,
    obtenerExposicion,
    actualizarExposicion,
    eliminarExposicion
};
