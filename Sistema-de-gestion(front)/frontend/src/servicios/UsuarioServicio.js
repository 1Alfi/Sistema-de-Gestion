import axios from 'axios';

const USUARIO_BASE_REST_API_URL = "http://localhost:8080/api/v1/usuarios";

class UsuarioServicio {
    getAllUsuarios() {
        return axios.get(USUARIO_BASE_REST_API_URL);
    }
}

export default new UsuarioServicio();