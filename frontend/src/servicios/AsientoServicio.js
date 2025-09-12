import axios from 'axios';

const ASIENTO_BASE_REST_API_URL = "http://localhost:8080/entry";

const config = {
    headers: {
        'Authorization': `${localStorage.getItem('token')}`
    }
};

class AsientoServicio {

    //Me envia las cuentas que son hojas, es decir las cuentas que tienen saldo propio
    getCuentasAsiento() {
        return axios.get(ASIENTO_BASE_REST_API_URL);
    }

    crearAsiento(entry) {
        return axios.post(ASIENTO_BASE_REST_API_URL + '/create', entry, config);
    }

}

export default new AsientoServicio();