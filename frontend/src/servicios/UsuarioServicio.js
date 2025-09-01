import axios from 'axios';

const USUARIO_BASE_REST_API_URL = "http://localhost:8080/user";

class UsuarioServicio {
    
    getAllUsuarios() {
        return axios.get(USUARIO_BASE_REST_API_URL+'/usuarios');
    }

    getUsuarioById(usuarioId) {
        return axios.get(USUARIO_BASE_REST_API_URL + '/' + usuarioId);
    }

    crearUsuario(usuario) {
        console.log(usuario);
        return axios.post(USUARIO_BASE_REST_API_URL+'/create', usuario);
    }

    deleteUsuario(usuarioId) {
        return axios.delete(USUARIO_BASE_REST_API_URL + '/usuarios/' + usuarioId);
    }

}

export default new UsuarioServicio();