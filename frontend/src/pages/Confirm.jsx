import logoDog from '../assets/rex.jpg'
import { Link, useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const Confirm = () => {
    const { token } = useParams()
    const [confirmed, setConfirmed] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const response = await axios.get(`/api/confirm/${token}`)
                if (response.data?.success) {
                    setConfirmed(true)
                } else {
                    throw new Error('Token inválido o ya expirado')
                }
            } catch (err) {
                setError(err.message || 'Ocurrió un error al confirmar tu cuenta.')
            }
        }

        confirmAccount()
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img
                className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600"
                src={logoDog}
                alt="Confirmación"
            />

            <div className="flex flex-col items-center justify-center">
                {confirmed ? (
                    <>
                        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Muchas Gracias</p>
                        <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Ya puedes iniciar sesión</p>
                        <Link
                            to="/login"
                            className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
                        >
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <p className="text-2xl text-red-700 mt-12">Error de confirmación</p>
                        <p className="text-gray-600 mt-4">{error}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default Confirm