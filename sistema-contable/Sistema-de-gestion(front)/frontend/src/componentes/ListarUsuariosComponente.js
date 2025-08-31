import React, { useEffect, useState } from 'react'
import UsuarioServicio from '../servicios/UsuarioServicio';

const ListarUsuariosComponente = () => {
  
    const [usuarios,setUsuarios] = useState([]);
    
    useEffect(() => {
        UsuarioServicio.getAllUsuarios().then(response => {
            setUsuarios(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    },[])

    return (
        <div className='container'>
            <h2 className='text-center'>Listado de Usuarios</h2>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Rol</th>
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
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListarUsuariosComponente;
