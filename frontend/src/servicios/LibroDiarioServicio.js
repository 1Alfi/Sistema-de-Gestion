import axios from 'axios';

const LIBRO_DIARIO_BASE_REST_API_URL = "http://localhost:8080/libro-diario";

class LibroDiarioServicio {

    getAsientosPorPeriodo(desde, hasta) {
        return axios.get(LIBRO_DIARIO_BASE_REST_API_URL, desde, hasta);
    }

}

export default new LibroDiarioServicio();