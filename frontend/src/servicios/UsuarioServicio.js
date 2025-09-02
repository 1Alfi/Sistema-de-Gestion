import axios from 'axios';

const USUARIO_BASE_REST_API_URL = "http://localhost:8080/user";

const config = {
    headers: {
        'Authorization': `${localStorage.getItem('token')}`
    }
};


class UsuarioServicio {

    getAllUsuarios() {
        return axios.get(USUARIO_BASE_REST_API_URL + '/usuarios');
    }

    getUsuarioById(usuarioId) {
        return axios.get(USUARIO_BASE_REST_API_URL + '/' + usuarioId);
    }

    crearUsuario(usuario) {
        console.log(config);
        return axios.post(USUARIO_BASE_REST_API_URL+'/create',usuario, config);
    }

    deleteUsuario(usuarioId) {
        return axios.delete(USUARIO_BASE_REST_API_URL + '/usuarios/' + usuarioId);
    }

}

export default new UsuarioServicio();