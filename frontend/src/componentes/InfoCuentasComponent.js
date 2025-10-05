import React, { useEffect, useState } from 'react';
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { useNavigate } from 'react-router-dom';
import { LuPencilLine } from "react-icons/lu";
import { getRoleFromToken } from '../utiles/authUtils';

// Recibe la prop 'id'
const InfoCuentasComponent = ({ id }) => {
    const [cuenta, setCuenta] = useState({
        code: "",
        name: "",
        childAccounts: []
    });
    
    // const [saldo, setSaldo] = useState(0);

    const navigate = useNavigate();
    const [error, setError] = useState('');

    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState("");


    useEffect(() => {
        // La llamada a los servicios se ejecuta solo si hay un id válido
        if (id) {
            infoCuenta(id);
        } else {
            // Si no hay id, limpia el estado para no mostrar info de una cuenta anterior
            setCuenta(null);
        }
    }, [id]);

    // Pasa el id como parámetro a las funciones de servicio
    const infoCuenta = (accountId) => {
        PlanDeCuentasServicio.getCuentaById(accountId).then((response) => {
            setCuenta(response.data);
            setTempName(response.data.name);
            setError('');
        }).catch(err => {
            console.error(err);
            setError(err.response?.data?.message || 'Ocurrió un error al cargar los datos de la cuenta.');
        });
    };

    const userRole = getRoleFromToken();
    const isAdmin = userRole === 'ADMIN';

    // const saldoCuenta = (accountId) => {
    //     PlanDeCuentasServicio.getSaldo(accountId).then((response) => {
    //         setSaldoCuenta(response.data);
    //     }).catch(err => {
    //         console.error(err);
    //     });
    // };

    const handleAddCuenta = () => {
        if (cuenta) {
            navigate('/add-account', { state: { idParent: cuenta.id } });
        }
    };

    const handleEditClick = () => {
        // Solo permite la edición si el usuario es Admin
        if (isAdmin) {
            setIsEditing(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Revertir el nombre temporal al nombre original de la cuenta
        setTempName(cuenta.name); 
    };

    const handleSaveEdit = () => {
        if (!tempName.trim() || tempName === cuenta.name) {
            setIsEditing(false);
            return;
        }

        PlanDeCuentasServicio.modificarCuenta(cuenta.id, tempName)
            .then(() => {
                // Actualizar el estado de la cuenta y sale del modo edición
                setCuenta(prev => ({ ...prev, name: tempName }));
                setIsEditing(false);
                setError('');
            })
            .catch(err => {
                setError(err.response?.data?.message || 'Error al actualizar el nombre.');
                console.error(err);
            });
    };

    if (cuenta) {
        const hasChildren = cuenta.childAccounts && cuenta.childAccounts.length > 0;

        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {isEditing ? (
                        // MODO EDICIÓN
                        <input
                            type="text"
                            className="form-control"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onKeyDown={(e) => { 
                                if (e.key === 'Enter') handleSaveEdit(); // Guardar al presionar Enter
                                if (e.key === 'Escape') handleCancelEdit(); // Cancelar al presionar Esc
                            }}
                            style={{ fontSize: '2em', fontWeight: 'bold', flexGrow: 1 }}
                        />
                    ) : (
                        // MODO VISUALIZACIÓN
                        <h1>Cuenta {cuenta.name}</h1>
                    )}

                    <div style={{ marginLeft: '10px' }}>
                        {isEditing ? (
                            // MODO EDICIÓN: Botones de Guardar y de Cancelar
                            <>
                                <button className="btn btn-success me-2" onClick={handleSaveEdit}>Guardar</button>
                                <button className="btn btn-danger" onClick={handleCancelEdit}>Cancelar</button>
                            </>
                        ) : (
                            // MODO VISUALIZACIÓN: Botón para Modificar (Lápiz)
                            isAdmin && (
                                <span onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                                    <LuPencilLine size={24} />
                                </span>
                            )
                        )}
                    </div>
                </div>

                {hasChildren ? (
                    <div>
                        <h3>Subcuentas {/*({cuenta.childAccounts.length})*/}</h3>
                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                            {
                                cuenta.childAccounts.map(child => (
                                    <li key={child.id} style={{ marginBottom: '5px' }}>
                                        <span style={{ fontWeight: 'bold' }}>{child.code}</span> - {child.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ) : (
                    // Renderizar Saldo si no tiene hijos
                    <div>
                        <h3>Saldo de la cuenta:</h3>
                        {/* <h4 style={{ color: saldo >= 0 ? 'green' : 'red' }}>$ {saldo.toFixed(2)}</h4> */}
                    </div>
                )}
                <br />
                {isAdmin && (
                    <button
                        className='btn btn-success mt-2 me-2'
                        onClick={handleAddCuenta}
                    >
                        Agregar cuenta
                    </button>
                )}
            </div>
        );
    }

    return (
        <div>
            {error && <div className='alert alert-danger mt-4 ms-5'>{error}</div>}
            {!error && !cuenta && <div className='alert alert-info mt-4 ms-5'>Seleccione una cuenta para ver su información.</div>}
        </div>
    );
};

export default InfoCuentasComponent;