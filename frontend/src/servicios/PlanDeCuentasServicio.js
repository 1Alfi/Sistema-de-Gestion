import React from 'react'
import axios from 'axios'

const PLAN_DE_CUENTAS_BASE_REST_API_URL = "http://localhost:8080/accounts";

class PlanDeCuentasServicio {

    listaCuentas() {
        return axios.get(PLAN_DE_CUENTAS_BASE_REST_API_URL);
    }

    getCuentaById(cuentaId) {
        return axios.get(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/' + cuentaId);
    }
    
    //Retorna el saldo de la funcion calcular saldo de cada cuenta
    getSaldoCuenta(cuentaId) {
        return axios.get(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/' + cuentaId  + '/get-saldo');
    }

    crearCuentaControl(account) {
        return axios.post(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/control', account);
    }
    crearCuentaControl(account, id) {
        return axios.post(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/control/', account, {
            params: {
                id: id
            }
        });
    }
    crearCuentaBalance(account, id) {
        return axios.post(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/balance/', account, {
            params: {
                id: id
            }
        });
    }

}

export default new PlanDeCuentasServicio();
