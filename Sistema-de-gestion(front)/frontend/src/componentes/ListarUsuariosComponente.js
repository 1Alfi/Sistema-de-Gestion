import React, { useEffect, useState } from 'react'
import UsuarioServicio from '../servicios/UsuarioServicio';
import { Link } from 'react-router-dom';

const ListarUsuariosComponente = () => {
  
    const [usuarios,setUsuarios] = useState([]);
    
    useEffect(() => {
        listarUsuarios();
    },[])

    const listarUsuarios = () => {
        UsuarioServicio.getAllUsuarios().then(response => {
            setUsuarios(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteUsuario = (usuarioId) => {
        UsuarioServicio.deleteUsuario(usuarioId).then((response) => {
            listarUsuarios();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Listado de Usuarios</h2>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(
                            usuario =>
                            <tr key={usuario.id}>
                                <td>{ usuario.id }</td>
                                <td>{ usuario.usuario }</td>
                                <td>{ usuario.rol }</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => deleteUsuario(usuario.id)}> Eliminar </button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className=' d-grid d-md-flex justify-content-md-end'>
                <Link to='/add-usuario' className='btn btn-primary mb-2 '>Agregar usuario</Link>
            </div>
        </div>
    )
}

export default ListarUsuariosComponente;
