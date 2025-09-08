import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginServicio from "../servicios/LoginServicio";

const LoginFormComponent = () => {
  
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handlLogin = (e) => {
        e.preventDefault();
        const user = { username, password}
        LoginServicio.authUsuario(user).then((response) => {
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem('token', token)

            navigate('/inicio');
        }).catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                // Si el error viene del back
                setError(err.response.data.message);
            } else {
                // Si es un error genérico
                setError('Ocurrió un error al intentar iniciar sesión. Por favor, intenta de nuevo.');
            }
            // Limpia el campo contraseña
            setPassword('');
        })
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
                  <label className='form-label'>Usuario</label>
                  <input 
                    type='text' 
                    placeholder='Nombre Usuario'
                    name = 'username'
                    className = 'form-control'
                    value = { username }
                    onChange = { (e) => setUsername(e.target.value) }
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