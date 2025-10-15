import axios from 'axios';

const LIBRO_DIARIO_BASE_REST_API_URL = "http://localhost:8080/journal";

class LibroDiarioServicio {

    // Función de flecha para mantener el contexto 'this'
    getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        if (token) {
            return {
                headers: {
                    'Authorization': token
                }
            };
        }
        return {}; 
    }

    // Función de flecha para mantener el contexto 'this'
    getLastAsientos = () => {
        // 'this' ahora apunta correctamente a la instancia
        return axios.get(LIBRO_DIARIO_BASE_REST_API_URL, this.getAuthHeaders());
    }

    // Función de flecha para mantener el contexto 'this'
    getAsientosPorPeriodo = (desde, hasta) => {
        // 'this' ahora apunta correctamente a la instancia
        return axios.get(LIBRO_DIARIO_BASE_REST_API_URL + "?before=" + desde + "&after=" + hasta, this.getAuthHeaders());
    }

}

export default new LibroDiarioServicio();
