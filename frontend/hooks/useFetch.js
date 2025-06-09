import axios from 'axios'

function useFetch() {
    const fetchDataBackend = async (url, form = null, method = 'POST') => {
        try {
            let respuesta

            if (method === 'POST') {
                respuesta = await axios.post(url, form)
            } else if (method === 'GET') {
                respuesta = await axios.get(url)
            }

            return {
                success: true,
                data: respuesta?.data,
                msg: respuesta?.data?.msg || 'Operación exitosa',
            }

        } catch (error) {
            const msg = error.response?.data?.msg || 'Error desconocido'
            return {
                success: false,
                error: msg,
            }
        }
    }

    return { fetchDataBackend }
}

export default useFetch
