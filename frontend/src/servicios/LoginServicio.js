import axios from 'axios';

const USUARIO_BASE_REST_API_URL = "http://localhost:8080/login";

class LoginServicio {

    authUsuario(usuario) {
        return axios.post(USUARIO_BASE_REST_API_URL, usuario);
    }

}

export default new LoginServicio();