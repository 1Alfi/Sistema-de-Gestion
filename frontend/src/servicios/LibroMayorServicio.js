import axios from 'axios';

const LIBRO_DIARIO_BASE_REST_API_URL = `${process.env.REACT_APP_BACK_URL}/ledger`;

class LibroMayorServicio {

    getAuthHeaders() {
        const token = localStorage.getItem('token');
        if (token) {
            return {
                headers: {
                    'Authorization': token
                }
            };
        }
        return {}; // Devuelve un objeto vacío si no hay token
    }

    //Libro Mayor
    getMovimientosPorCuentaYPeriodo(cuentaId, desde, hasta) {
        return axios.get(LIBRO_DIARIO_BASE_REST_API_URL, this.getAuthHeaders());
    }

}

export default new LibroMayorServicio();