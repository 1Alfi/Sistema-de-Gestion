import axios from 'axios';

const ASIENTO_BASE_REST_API_URL = "http://localhost:8080/asientos";

class AsientoServicio {

    //Me envia las cuentas que son hojas, es decir las cuentas que tienen saldo propio
    getCuentasAsiento() {
        return axios.get(ASIENTO_BASE_REST_API_URL)
    }

    crearAsiento(descripcion, movimientos) {
        return axios.post(ASIENTO_BASE_REST_API_URL, descripcion, movimientos)
    }

}

export default new AsientoServicio();