import React, { useEffect, useState } from 'react'
import UsuarioServicio from '../servicios/UsuarioServicio';
import { Link } from 'react-router-dom';
import SideBarComponent from './SideBarComponent';
import { FaUsers, FaUserPlus, FaTrashAlt, FaSpinner } from 'react-icons/fa';

// --- CONSTANTES DE ESTILO ---
const PRIMARY_COLOR = '#A8DADC';  
const TEXT_COLOR = '#2C3E50';     
const BACKGROUND_COLOR = '#F8F9FA'; 
const CARD_COLOR = '#FFFFFF';

const ListarUsuariosComponente = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        listarUsuarios();
    }, [])

    const listarUsuarios = () => {
        setCargando(true);
        setError('');
        UsuarioServicio.getAllUsuarios().then((response) => {
            setUsuarios(response.data);
            console.log(response.data);
            setCargando(false);
        }).catch(error => {
            console.error(error);
            setUsuarios([]);
            setError('Error al cargar la lista de usuarios. Asegúrate de tener permisos.');
            setCargando(false);
        })
    }

    const deleteUsuario = (usuarioId) => {
        // En una aplicación real, se usaría un modal de confirmación aquí
        if (window.confirm(`¿Estás seguro que deseas eliminar al usuario con ID ${usuarioId}?`)) {
             UsuarioServicio.deleteUsuario(usuarioId).then((response) => {
                listarUsuarios();
                // Opcional: Mostrar un mensaje de éxito
            }).catch(error => {
                console.error("Error al eliminar el usuario:", error);
                setError('No se pudo eliminar el usuario. Verifica los permisos.');
            })
        }
    }

    // Función auxiliar para renderizar el rol de forma amigable
    const formatRole = (role) => {
        if (!role) return 'N/A';
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase().replace(/_/g, ' ');
    }

    return (
        <div className='d-flex' style={{ backgroundColor: BACKGROUND_COLOR, minHeight: '100vh' }}>
            <SideBarComponent />
            
            <div className='flex-grow-1 p-0 p-md-5'>
                <div className='col-lg-12'>
                    {/* Tarjeta principal del Listado de Usuarios */}
                    <div className='card shadow-lg' style={{ borderRadius: '15px', backgroundColor: CARD_COLOR }}>
                        
                        {/* Encabezado */}
                        <div className='card-header d-flex flex-column flex-md-row align-items-center justify-content-between' style={{ 
                            backgroundColor: PRIMARY_COLOR, 
                            color: TEXT_COLOR,
                            borderTopLeftRadius: '15px',
                            borderTopRightRadius: '15px',
                            padding: '1.5rem'
                        }}>
                            <h2 className='d-flex align-items-center m-0' style={{ fontWeight: '700' }}>
                                <FaUsers size={28} className='me-3' />
                                Listado de Usuarios
                            </h2>
                            {/* Botón de Agregar Usuario */}
                            <Link 
                                to='/add-username' 
                                className='btn btn-success d-flex align-items-center mt-3 mt-md-0' 
                                style={{ fontWeight: '600' }}
                            >
                                <FaUserPlus className='me-2' /> Agregar Usuario
                            </Link>
                        </div>

                        {/* Cuerpo del Card */}
                        <div className='card-body p-4 p-md-5'>

                            {/* Mensaje de Error */}
                            {error && (
                                <div className='alert alert-danger mb-4' role='alert'>
                                    {error}
                                </div>
                            )}

                            {/* Contenido principal (Cargando o Tabla) */}
                            {cargando ? (
                                <div className='d-flex justify-content-center my-5'>
                                    <FaSpinner size={32} className='text-primary fa-spin me-3' />
                                    <p className='ms-3 pt-1' style={{ color: TEXT_COLOR }}>Cargando usuarios...</p>
                                </div>
                            ) : usuarios.length > 0 ? (
                                <div className="table-responsive">
                                    <table className='table table-bordered table-striped table-hover' style={{ fontSize: '0.95rem' }}>
                                        <thead style={{ backgroundColor: PRIMARY_COLOR, color: TEXT_COLOR }}>
                                            <tr>
                                                <th style={{ width: '10%' }}>ID</th>
                                                <th style={{ width: '40%' }}>Nombre de Usuario</th>
                                                <th style={{ width: '20%' }}>Rol</th>
                                                <th style={{ width: '30%', textAlign: 'center' }}>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                usuarios.map(
                                                    user =>
                                                        <tr key={user.id}>
                                                            <td>{user.id}</td>
                                                            <td>{user.username}</td>
                                                            <td>{formatRole(user.role)}</td>
                                                            <td className='text-center'>
                                                                <button 
                                                                    className='btn btn-sm btn-danger d-flex align-items-center justify-content-center mx-auto' 
                                                                    onClick={() => deleteUsuario(user.id)}
                                                                > 
                                                                    <FaTrashAlt className='me-1' /> Eliminar 
                                                                </button>
                                                            </td>
                                                        </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className='alert alert-info mt-3' role='alert'>
                                    <FaUserPlus className='me-2' />
                                    No hay usuarios registrados en el sistema. ¡Agrega el primero!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListarUsuariosComponente;
