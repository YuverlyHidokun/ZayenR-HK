import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUniversity, FaPhone, FaArrowLeft } from 'react-icons/fa';

export const Register = () => {
    return (
        <div className="min-h-screen flex">
            {/* Formulario de registro */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-green-50">
                <h2 className="text-3xl font-bold text-teal-800 mb-8">Registro</h2>

                <form className="w-full max-w-md space-y-5">
                    {/* Nombre */}
                    <div>
                        <label className="block text-teal-800 font-semibold mb-1">Nombre</label>
                        <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
                            <FaUser className="text-teal-700 mr-2" />
                            <input
                                type="text"
                                placeholder="Tu nombre completo"
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Correo */}
                    <div>
                        <label className="block text-teal-800 font-semibold mb-1">Correo institucional</label>
                        <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
                            <FaEnvelope className="text-teal-700 mr-2" />
                            <input
                                type="email"
                                placeholder="ejemplo@espol.edu.ec"
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Contraseña */}
                    <div>
                        <label className="block text-teal-800 font-semibold mb-1">Contraseña</label>
                        <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
                            <FaLock className="text-teal-700 mr-2" />
                            <input
                                type="password"
                                placeholder="Crea una contraseña"
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Facultad */}
                    <div>
                        <label className="block text-teal-800 font-semibold mb-1">Facultad</label>
                        <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
                            <FaUniversity className="text-teal-700 mr-2" />
                            <input
                                type="text"
                                placeholder="Ingresa tu facultad"
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Celular */}
                    <div>
                        <label className="block text-teal-800 font-semibold mb-1">Celular</label>
                        <div className="flex items-center border border-teal-300 rounded-lg px-3 py-2">
                            <FaPhone className="text-teal-700 mr-2" />
                            <input
                                type="tel"
                                placeholder="0991234567"
                                className="w-full bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Botón de registro */}
                    <button
                        type="submit"
                        className="w-full bg-teal-800 text-white py-2 rounded-lg hover:bg-teal-700 transition"
                    >
                        Registrarse
                    </button>
                </form>

                {/* Enlace para volver */}
                <div className="mt-6">
                    <Link to="/login" className="flex items-center text-sm text-teal-800 hover:underline">
                        <FaArrowLeft className="mr-2" /> ¿Ya tienes cuenta? Inicia sesión
                    </Link>
                </div>
            </div>

            {/* Imagen al lado derecho */}
            <div className="w-1/2 hidden md:block">
                <img
                    src="src/assets/dino2.jpg"
                    alt="Registro Museo"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};
