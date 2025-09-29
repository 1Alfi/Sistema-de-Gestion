import React from 'react'
import axios from 'axios'

const PLAN_DE_CUENTAS_BASE_REST_API_URL = "http://localhost:8080/accounts";

class PlanDeCuentasServicio {

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

    listarCuentas() {
        return axios.get(PLAN_DE_CUENTAS_BASE_REST_API_URL, this.getAuthHeaders());
    }

    getCuentaById(cuentaId) {
        return axios.get(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/' + cuentaId, this.getAuthHeaders());
    }
    
    //Retorna el saldo de la funcion calcular saldo de cada cuenta
    getSaldoCuenta(cuentaId) {
        return axios.get(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/' + cuentaId  + '/get-saldo');
    }

    crearCuentaControl(account) {
        return axios.post(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/control', account, this.getAuthHeaders());
    }
    crearCuentaControlId(account, id) {
        return axios.post(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/control', this.getAuthHeaders(), account, {
            params: {
                id: id
            }
        });
    }
    crearCuentaBalance(account, id) {
        return axios.post(PLAN_DE_CUENTAS_BASE_REST_API_URL + '/balance', this.getAuthHeaders(), account, {
            params: {
                id: id
            }
        });
    }

}

export default new PlanDeCuentasServicio();
