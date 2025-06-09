import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'

export const Forgot = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [mensaje, setMensaje] = useState('')
    const [error, setError] = useState('')

    const sendMail = async (data) => {
        setMensaje('')
        setError('')

        if (!data.email) {
            setError('El correo electrónico es obligatorio.')
            return
        }

        try {
            const res = await axios.post('/api/forgot-password', { email: data.email })

            if (res.data?.success) {
                setMensaje('Correo enviado correctamente. Revisa tu bandeja de entrada.')
            } else {
                setError('No se pudo enviar el correo. Verifica que el correo esté registrado.')
            }
        } catch (err) {
            setError('Ocurrió un error al enviar el correo.')
        }
    }

    return (
        <div className="flex flex-col sm:flex-row h-screen">
            <div className="w-full sm:w-1/2 h-screen bg-white flex justify-center items-center">
                <div className="md:w-4/5 sm:w-full">
                    <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">
                        ¡Olvidaste tu contraseña!
                    </h1>
                    <small className="text-gray-400 block my-4 text-sm">No te preocupes</small>

                    <form onSubmit={handleSubmit(sendMail)}>
                        <div className="mb-1">
                            <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                            <input
                                type="email"
                                placeholder="Ingresa un correo electrónico válido"
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                                {...register("email", { required: "El correo electrónico es requerido" })}
                            />
                            {errors.email && <p className='text-red-800'>{errors.email.message}</p>}
                        </div>

                        <div className="mb-3">
                            <button
                                type="submit"
                                className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white"
                            >
                                Enviar correo
                            </button>
                        </div>
                    </form>

                    {mensaje && <p className="text-green-600 text-sm mt-2">{mensaje}</p>}
                    {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

                    <div className="mt-5 text-xs border-b-2 py-4 "></div>

                    <div className="mt-3 text-sm flex justify-between items-center">
                        <p>¿Ya posees una cuenta?</p>
                        <Link
                            to="/login"
                            className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white"
                        >
                            Iniciar sesión
                        </Link>
                    </div>
                </div>
            </div>

            <div
                className="w-full sm:w-1/2 h-1/3 sm:h-screen bg-[url('src/assets/dino2.jpg')] 
                bg-no-repeat bg-cover bg-center sm:block hidden"
            ></div>
        </div>
    )
}

export default Forgot
