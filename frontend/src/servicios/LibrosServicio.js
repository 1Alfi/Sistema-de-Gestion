import axios from 'axios';

const LIBRO_DIARIO_BASE_REST_API_URL = "http://localhost:8080/libro";

class LibrosServicio {

    //Libro diario
    getAsientosPorPeriodo(desde, hasta) {
        return axios.get(LIBRO_DIARIO_BASE_REST_API_URL + '-diario', desde, hasta);
    }

    //Libro Mayor
    getAsientosPorCuentaYPeriodo(cuenta, desde, hasta) {
        return axios.get(LIBRO_DIARIO_BASE_REST_API_URL + '-mayor', cuenta, desde, hasta);
    }

}

export default new LibrosServicio();