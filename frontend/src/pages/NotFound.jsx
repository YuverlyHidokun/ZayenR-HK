import { Link } from "react-router-dom"; // Asegúrate de usar react-router-dom v6+
import dinoRepair from '../assets/dino-repair.png'; // Usa una imagen temática (reemplaza con tu imagen real)

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
            <img
                className="object-contain h-64 w-64 md:h-80 md:w-80 mb-6"
                src={dinoRepair}
                alt="Dinosaurio reparando"
            />

            <div className="text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">¡Ups! Página no encontrada</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Parece que un dinosaurio del museo está trabajando para reparar este error.
                </p>
                <p className="text-sm text-gray-500 mt-1">Estamos restaurando la exhibición digital...</p>

                <Link
                    to="/"
                    className="inline-block mt-6 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition transform hover:scale-105"
                >
                    Regresar al inicio
                </Link>
            </div>
        </div>
    );
};
