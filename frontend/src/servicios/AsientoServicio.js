import axios from 'axios';

const ASIENTO_BASE_REST_API_URL = "http://localhost:8080/entry";

class AsientoServicio {

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

    crearAsiento(entry) {
        return axios.post(ASIENTO_BASE_REST_API_URL + '/create', this.getAuthHeaders(), entry);
    }

}

export default new AsientoServicio();