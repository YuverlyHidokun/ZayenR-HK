import logoDog from '../assets/dientes.jpg'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import useFetch from '../../hooks/useFetch'

const Reset = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [tokenback, setTokenback] = useState(false)
    const { token } = useParams()
    const navigate = useNavigate()
    const { fetchDataBackend } = useFetch()

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                const data = await fetchDataBackend(`/api/reset/${token}`, null, 'GET')
                if (data?.success) {
                    setTokenback(true)
                }
            } catch (error) {
                console.error('Token inválido o expirado:', error.message)
            }
        }
        comprobarToken()
    }, [token])

    const changePassword = async (formData) => {
        const { password, confirmPassword } = formData

        if (!password || !confirmPassword) {
            return alert('Todos los campos son obligatorios')
        }

        if (password !== confirmPassword) {
            return alert('Las contraseñas no coinciden')
        }

        try {
            const data = await fetchDataBackend(`/api/reset/${token}`, { password })
            alert('Contraseña actualizada correctamente')
            navigate('/login')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-semibold mb-2 text-center text-gray-500">
                Bienvenido nuevamente
            </h1>
            <small className="text-gray-400 block my-4 text-sm">
                Por favor, ingrese los siguientes datos
            </small>
            <img
                className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600"
                src={logoDog}
                alt="Reset Password"
            />
            {tokenback && (
                <form className="w-80" onSubmit={handleSubmit(changePassword)}>
                    <div className="mb-1">
                        <label className="mb-2 block text-sm font-semibold">
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Ingresa tu nueva contraseña"
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            {...register("password", { required: "La contraseña es obligatoria" })}
                        />
                        {errors.password && <p className="text-red-800">{errors.password.message}</p>}

                        <label className="mb-2 block text-sm font-semibold mt-3">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Repite tu contraseña"
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            {...register("confirmPassword", { required: "La confirmación es obligatoria" })}
                        />
                        {errors.confirmPassword && <p className="text-red-800">{errors.confirmPassword.message}</p>}
                    </div>
                    <div className="mb-3">
                        <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
                            Enviar
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Reset