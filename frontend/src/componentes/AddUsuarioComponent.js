import React, { useState } from 'react'
import UsuarioServicio from '../servicios/UsuarioServicio'
import { Link, useNavigate } from 'react-router-dom'

const AddUsuarioComponent = () => {
  
  const [username, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('EMPLEADO')
  const navigate = useNavigate();

  const guardarUsuario = (e) => {
    e.preventDefault();
    const user = { username, password, role};
    UsuarioServicio.crearUsuario( user ).then((response) => {
      console.log(response.data);
      navigate('/usuarios');
    }).catch(error => {
      console.log(error);
    })
  }
  
  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='card col-md-6 offset-md-3 mt-5'>
            <h2 className='text-center mt-3'> Registro de username</h2>
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>Username</label>
                  <input 
                    type='text' 
                    placeholder='Nombre Usuario'
                    name = 'username'
                    className = 'form-control'
                    value = { username }
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
                <div className='form-group mb-2'>
                    <label className='form-label'>Rol Usuario</label>
                  <select
                    className="form-select mt-4" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  ><option value= 'ADMIN'>Administrador</option>
                    <option value= 'USER'>Usuario</option>
                  </select>
                </div>
                <div className=' d-grid d-md-flex justify-content-md-end'>
                  <button className='btn btn-secondary mt-2 me-2' onClick={ (e) => guardarUsuario(e) }>Guardar</button>
                  &nbsp;&nbsp;
                  <Link to='/usuarios' className='btn btn-danger mt-2'>Cancelar</Link>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUsuarioComponent
