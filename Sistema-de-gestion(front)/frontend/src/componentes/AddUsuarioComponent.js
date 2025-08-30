import React, { useState } from 'react'
import UsuarioServicio from '../servicios/UsuarioServicio'
import { Link, useNavigate } from 'react-router-dom'

const AddUsuarioComponent = () => {
  
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [rol, setRol] = useState('EMPLEADO')
  const navigate = useNavigate();

  const guardarUsuario = (e) => {
    e.preventDefault();
    const user = { rol, usuario, password };
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
            <h2 className='text-center mt-3'> Registro de usuario</h2>
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
                <div className='form-group mb-2'>
                  <select 
                    className="form-select mt-4" 
                    value={rol} 
                    onChange={(e) => setRol(e.target.value)}
                  >
                    <option value= 'ADMINISTRADOR'>Administrador</option>
                    <option value= 'EMPLEADO'>Empleado</option>
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
