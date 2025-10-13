import axios from 'axios';

const USUARIO_BASE_REST_API_URL = `${process.env.REACT_APP_BACK_URL}/login`;

class LoginServicio {

    authUsuario(usuario) {
        return axios.post(USUARIO_BASE_REST_API_URL, usuario);
    }

}

export default new LoginServicio();