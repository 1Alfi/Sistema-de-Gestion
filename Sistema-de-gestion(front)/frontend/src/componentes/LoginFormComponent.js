import React, { useState } from 'react'
import UsuarioServicio from '../servicios/UsuarioServicio'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginFormComponent = () => {
  
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handlLogin = (e) => {
        e.preventDefault();
        setError('');
        
        axios.post("http://localhost:8080/api/v1/auth/login", {
                usuario,
                password
            })
            .then(response => {
                const token = response.data.token;
                
                localStorage.setItem('token', token);

                navigate('/inicio');
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                         setError("Credenciales incorrectas. Intente nuevamente.");
                    } else {
                         setError("Error en el servidor. Intente más tarde.");
                    }
                } else {
                    setError("Error de red. Verifique su conexión.");
                }
                console.error("Error detallado", err);
            });
    }

    return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 mt-5'>
            <h2 className='text-center mt-3'> Login</h2>
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>Username</label>
                  <input 
                    type='text' 
                    placeholder='Nombre Usuario'
                    name = 'usuario' 
                    className = 'form-control'
                    value = { usuario }
                    onChange = { (e) => setUsuario(e.target.value) }
                  />
                </div>
                <div className='form-group mb-2'>
                  <label className='form-label'>Contraseña</label>
                  <input 
                    type = 'password' 
                    placeholder = 'Contraseña' 
                    name = 'password' 
                    className = 'form-control'
                    value = { password }
                    onChange = { (e) => setPassword(e.target.value) }
                  />
                </div>
                {error && <div className='alert alert-danger'>{error}</div>}
                <div className=' d-grid d-md-flex justify-content-md-end'>
                  <button className='btn btn-secondary mt-2 me-2' onClick={ (e) => handlLogin(e) }>Entrar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginFormComponent