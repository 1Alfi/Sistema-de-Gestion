import axios from 'axios';

const USUARIO_BASE_REST_API_URL = "http://localhost:8080/api/v1/usuarios";

class UsuarioServicio {
    
    getAllUsuarios() {
        return axios.get(USUARIO_BASE_REST_API_URL);
    }

    getUsuarioById() {
        return axios.get(USUARIO_BASE_REST_API_URL + '/' + usuarioId);
    }

    crearUsuario(usuario) {
        return axios.post(USUARIO_BASE_REST_API_URL, usuario);
    }

    deleteUsuario(usuarioId) {
        return axios.delete(USUARIO_BASE_REST_API_URL + '/' + usuarioId);
    }

}

export default new UsuarioServicio();