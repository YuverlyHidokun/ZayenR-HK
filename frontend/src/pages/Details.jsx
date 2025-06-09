/* eslint-disable no-unused-vars */
import { useState } from "react";
import TableTreatments from "../components/treatments/Table";
import ModalTreatments from "../components/treatments/Modal";

const Details = () => {
    const [treatments, setTreatments] = useState(["demo"]);

    return (
    <div className="p-6">
        <header>
        <h1 className="font-black text-4xl text-gray-700">Visualización de Registros</h1>
        <hr className="my-4 border-t-2 border-gray-300" />
        <p className="mb-6 text-gray-600">Consulta los datos registrados de pasantes y visitantes del museo.</p>
        </header>

        <section className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-2/3">
            <article className="mb-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Pasante</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li><strong>Nombre:</strong> </li>
                <li><strong>Correo institucional:</strong> </li>
                <li><strong>Facultad:</strong> </li>
                <li><strong>Celular:</strong> </li>
            </ul>
            </article>

            <article>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Visitante</h2>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li><strong>Nombre:</strong> </li>
                <li><strong>Institución:</strong> </li>
                <li><strong>Edad:</strong> </li>
            </ul>
            </article>
        </div>

        <div className="w-full md:w-1/3 flex justify-center">
            <img
            src="https://cdn-icons-png.flaticon.com/512/2138/2138440.png"
            alt="visitante"
            className="h-64 w-64 object-contain"
            />
        </div>
        </section>

        <hr className="my-6 border-t-2 border-gray-300" />

        <section className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-gray-600">Aquí puedes gestionar los tratamientos registrados.</p>
        <button className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700 transition duration-300">
            Registrar
        </button>
        {/* Modal (mostrar cuando sea necesario) */}
        {/* <ModalTreatments /> */}
        </section>

        <section>
        {treatments.length === 0 ? (
            <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
            >
            <span className="font-medium">No existen registros.</span>
            </div>
        ) : (
            <TableTreatments treatments={treatments} />
        )}
        </section>
    </div>
    );
};

export default Details;
