import React from 'react'
import axios from 'axios'

const PLAN_DE_CUENTAS_BASE_REST_API_URL = "http://localhost:8080/plan-de-cuenta";

class PlanDeCuentasServicio {

    listaCuentas() {
        return axios.get(PLAN_DE_CUENTAS_BASE_REST_API_URL)
    }

    getCuentaById(cuentaId) {
        return axios.get(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/' + cuentaId)
    }
    
    //Retorna el saldo de la funcion calcular saldo de cada cuenta
    getSaldoCuenta(cuentaId) {
        return axios.get(PLAN_DE_CUENTAS_BASE_REST_API_URL + cuentaId  + '/get-saldo/');
    }

}

export default new PlanDeCuentasServicio();
