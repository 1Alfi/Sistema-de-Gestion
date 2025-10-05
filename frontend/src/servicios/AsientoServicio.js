import axios from 'axios';

const ASIENTO_BASE_REST_API_URL = `${process.env.REACT_APP_BACK_URL}/entry`;

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

    //Recibo las BalanceAccounts
    getCuentasAsiento() {
        return axios.get(ASIENTO_BASE_REST_API_URL + '/accounts');
    }

    crearAsiento(entry) {
        return axios.post(ASIENTO_BASE_REST_API_URL + '/create', this.getAuthHeaders(), entry);
    }

}

export default new AsientoServicio();