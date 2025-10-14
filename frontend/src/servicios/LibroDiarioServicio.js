import axios from 'axios';

const LIBRO_DIARIO_BASE_REST_API_URL = "http://localhost:8080/journal";

class LibroDiarioServicio {

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

    //Libro diario
    getLastAsientos() {
        return axios.get(LIBRO_DIARIO_BASE_REST_API_URL, this.getAuthHeaders());
    }

    getAsientosPorPeriodo(desde, hasta) {
        return axios.get(LIBRO_DIARIO_BASE_REST_API_URL + "?before=" + desde + "&after=" + hasta);
    }

    //Libro Mayor
    // getMovimientosPorCuentaYPeriodo(cuenta, desde, hasta) {
    //     return axios.get(LIBRO_DIARIO_BASE_REST_API_URL + '-mayor', cuenta, desde, hasta);
    // }

}

export default new LibroDiarioServicio();