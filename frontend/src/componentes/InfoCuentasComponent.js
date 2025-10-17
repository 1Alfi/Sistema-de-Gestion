import React, { useEffect, useState } from 'react';
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { useNavigate } from 'react-router-dom';
import { LuPencilLine } from "react-icons/lu";
import { FaPlusCircle, FaTrashAlt, FaUndo } from 'react-icons/fa'; // Iconos para Agregar, Desactivar, Reactivar
import { getRoleFromToken } from '../utiles/authUtils';
import RefreshService from '../servicios/RefreshService';
import { MdAccountTree } from 'react-icons/md';

// --- CONSTANTES DE DISEÑO ---
const PRIMARY_COLOR = '#A8DADC';
const TEXT_COLOR = '#2C3E50';
const DANGER_COLOR = '#E74C3C';
const SUCCESS_COLOR = '#2ECC71';
const INFO_BG = '#ECF0F1'; // Fondo claro para secciones

// Recibe la prop 'id'
const InfoCuentasComponent = ({ id }) => {
    const [cuenta, setCuenta] = useState(null); // Inicializamos en null para mostrar el mensaje de "Seleccione..."
    const [saldo, setSaldo] = useState(null); // Cambiamos a null para manejar la carga
    const [saldoCargando, setSaldoCargando] = useState(false); // Nuevo estado de carga para el saldo
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [tempName, setTempName] = useState("");
    
    // --- LÓGICA DE CARGA DE DATOS ---

    useEffect(() => {
        if (id) {
            infoCuenta(id);
            saldoCuenta(id); // Llamada para obtener el saldo
        } else {
            setCuenta(null);
            setSaldo(null); // Limpiamos el saldo
        }
    }, [id]);

    const infoCuenta = (accountId) => {
        PlanDeCuentasServicio.getCuentaById(accountId).then((response) => {
            const data = response.data;
            setCuenta(data);
            setTempName(data.name);
            setError('');
        }).catch(err => {
            console.error(err);
            setError(err.response?.data?.message || 'Ocurrió un error al cargar los datos de la cuenta.');
        });
    };

    // --- CORRECCIÓN EN EL MANEJO DE LA PROMISE DEL SALDO ---
    const saldoCuenta = (accountId) => {
        setSaldoCargando(true);
        // ASUMIMOS QUE AccountService es el servicio correcto para el saldo.
        PlanDeCuentasServicio.getSaldoCuenta(accountId)
            .then(response => {
                // Asumimos que la respuesta trae el valor del saldo directamente en response.data
                setSaldo(response.data.balance); 
            })
            .catch(err => {
                console.error("Error al obtener saldo:", err);
                setSaldo(0); // Establecer el saldo en 0 si hay un error
                // NOTA: Si quieres mostrar un error específico del saldo, usa un estado adicional
            })
            .finally(() => {
                setSaldoCargando(false);
            });
    };

    // --- MANEJO DE ROLES Y NAVEGACIÓN ---

    const userRole = getRoleFromToken();
    const isAdmin = userRole === 'ADMIN';

    const handleAddCuenta = () => {
        if (cuenta) {
            // El componente debe tener la capacidad de navegar
            navigate('/add-account', { state: { idParent: cuenta.id } });
        }
    };
    
    // --- MANEJO DE EDICIÓN ---

    const handleEditClick = () => {
        if (isAdmin) {
            setIsEditing(true);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setTempName(cuenta.name);
    };

    const handleSaveEdit = () => {
        if (!tempName.trim() || tempName === cuenta.name) {
            setIsEditing(false);
            return;
        }

        PlanDeCuentasServicio.modificarCuenta(cuenta.id, { name: tempName })
            .then(() => {
                setCuenta(prev => ({ ...prev, name: tempName }));
                setIsEditing(false);
                setError('');
                RefreshService.triggerRefresh();
            })
            .catch(err => {
                setError(err.response?.data?.message || 'Error al actualizar el nombre.');
                console.error(err);
            });
    };
    
    // --- MANEJO DE BORRADO LÓGICO (Desactivación/Reactivación) ---

    const handleToggleActive = () => {
        if (!isAdmin) return;

        const newState = !cuenta.active;
        
        // 1. Determinar la función de servicio a llamar
        const actionFunction = newState 
            ? PlanDeCuentasServicio.activarCuenta
            : PlanDeCuentasServicio.desactivarCuenta;
            
        const actionName = newState ? 'activar' : 'desactivar';

        // NOTA: Reemplazar window.confirm por un modal si es posible en el futuro.
        const confirmMessage = newState 
            ? "¿Estás seguro de que quieres REACTIVAR esta cuenta?" 
            : "¿Estás seguro de que quieres DESACTIVAR esta cuenta? (Borrado lógico)";

        if (window.confirm(confirmMessage)) {
            // 2. Llamar a la función específica (activarCuenta o desactivarCuenta)
            actionFunction(cuenta.id) 
                .then(() => {
                    // Actualiza el estado local y el árbol
                    setCuenta(prev => ({ ...prev, active: newState }));
                    setError('');
                    RefreshService.triggerRefresh(); 
                })
                .catch(err => {
                    setError(err.response?.data?.message || `Error al ${actionName} la cuenta.`);
                    console.error(err);
                });
        }
    };


    // --- RENDERIZADO ---

    if (error) {
        return <div className='alert alert-danger mt-4 mx-4'>{error}</div>;
    }

    if (!cuenta) {
        return (
            <div 
                // Contenedor principal para centrar el mensaje en el área de contenido
                style={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: '30px',
                    paddingBottom: '120px'
                }}
            >
                {/* Tarjeta de información/instrucción */}
                <div 
                    style={{ 
                        padding: '40px', 
                        textAlign: 'center', 
                        borderRadius: '10px',
                        backgroundColor: '#FFFFFF', // Fondo blanco de la tarjeta
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Sombra suave
                        maxWidth: '400px',
                        borderTop: `5px solid ${PRIMARY_COLOR}` // Línea de color de acento
                    }}
                >
                    {/* Icono grande para guiar */}
                    <MdAccountTree size={50} style={{ color: PRIMARY_COLOR, marginBottom: '15px' }} />
                    
                    <h3 style={{ fontWeight: '700', color: TEXT_COLOR, marginBottom: '10px' }}>
                        ¡Bienvenido al Plan de Cuentas!
                    </h3>
                    
                    <p style={{ color: '#7F8C8D', fontSize: '1.1rem' }}>
                        Selecciona una cuenta en el menú de la izquierda para ver su detalle, saldo, subcuentas, o para modificarla o darla de baja.
                    </p>
                    
                    {/* Mensaje de alerta original (opcional, estilizado) */}
                    <div className='alert alert-info mt-3' style={{ 
                        backgroundColor: '#ECF0F1', 
                        color: TEXT_COLOR,
                        border: 'none'
                    }}>
                        Seleccione una cuenta para ver su información.
                    </div>
                </div>
            </div>
        );
    }

    const isControl = cuenta.type === 'Control';
    const hasChildren = cuenta.childAccounts && cuenta.childAccounts.length > 0;
    // Usamos el estado real del saldo
    const currentSaldo = saldo;

    return (
        <div style={{ flexGrow: 1, padding: '30px' }}>
            
            {/* 1. SECCIÓN DE TÍTULO, CÓDIGO Y ACCIONES */}
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                marginBottom: '1rem' 
            }}>
                {isEditing ? (
                    // MODO EDICIÓN: Input
                    <input
                        type="text"
                        className="form-control"
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit();
                            if (e.key === 'Escape') handleCancelEdit();
                        }}
                        style={{ fontSize: '2em', fontWeight: 'bold', flexGrow: 1, color: TEXT_COLOR }}
                    />
                ) : (
                    // MODO VISUALIZACIÓN: Nombre de la Cuenta
                    <div>
                        <h1 style={{ 
                            fontSize: '2em', 
                            fontWeight: '700', 
                            color: TEXT_COLOR, 
                            display: 'inline-block',
                            marginRight: '15px' 
                        }}>
                            {cuenta.name} 
                        </h1>
                        {/* Botón de Lápiz para Editar */}
                        {isAdmin && (
                            <span onClick={handleEditClick} style={{ cursor: 'pointer', verticalAlign: 'top' }}>
                                <LuPencilLine size={24} color={TEXT_COLOR} />
                            </span>
                        )}
                        {/* Código de la Cuenta */}
                        <p style={{ 
                            fontSize: '1rem', 
                            color: '#7F8C8D', 
                            marginTop: '5px' 
                        }}>
                            Código: <span style={{ fontWeight: '600' }}>{cuenta.code}</span>
                            {/* Mostrar estado de cuenta (Activa/Inactiva) */}
                            <span style={{ 
                                marginLeft: '15px', 
                                color: cuenta.active ? SUCCESS_COLOR : DANGER_COLOR, 
                                fontWeight: 'bold' 
                            }}>
                                ({cuenta.active ? 'Activa' : 'Inactiva'})
                            </span>
                        </p>
                    </div>
                )}

                {/* Botones de Acción Global (Guardar/Cancelar Edición o Desactivar) */}
                <div style={{ marginLeft: '10px' }}>
                    {isEditing ? (
                        <>
                            <button className="btn btn-success me-2" onClick={handleSaveEdit}>Guardar</button>
                            <button className="btn btn-danger" onClick={handleCancelEdit}>Cancelar</button>
                        </>
                    ) : (
                        isAdmin && (
                            <button
                                className='btn btn-sm'
                                onClick={handleToggleActive}
                                style={{ 
                                    backgroundColor: cuenta.active ? DANGER_COLOR : SUCCESS_COLOR, 
                                    color: 'white',
                                    fontWeight: '600'
                                }}
                            >
                                {cuenta.active ? <><FaTrashAlt className='me-2' /> Borrar/Desactivar Cuenta</> : <><FaUndo className='me-2' /> Reactivar Cuenta</>}
                            </button>
                        )
                    )}
                </div>
            </div>
            
            {/* Separador */}
            <hr style={{ borderTop: `1px solid ${INFO_BG}` }} />

            {/* 2. SECCIÓN DE SALDO */}
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: TEXT_COLOR }}>Saldo Total de la Cuenta:</h3>
                <h4 style={{ 
                    fontSize: '1.8rem', 
                    fontWeight: '700',
                    color: currentSaldo !== null && currentSaldo >= 0 ? SUCCESS_COLOR : DANGER_COLOR, // Color condicional
                    marginTop: '0.5rem'
                }}>
                    {saldoCargando ? (
                        <div className="spinner-border spinner-border-sm text-primary" role="status">
                            <span className="visually-hidden">Cargando...</span>
                        </div>
                    ) : currentSaldo !== null ? (
                        `$ ${currentSaldo.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    ) : (
                        `$ 0.00` // Muestra un valor por defecto si es null
                    )}
                </h4>
            </div>

            {/* 3. SECCIÓN DE SUBCUENTAS (Solo si es de Control) */}
            {isControl && (
                <div style={{ 
                    padding: '20px', 
                    borderRadius: '8px', 
                    backgroundColor: INFO_BG, // Fondo claro para resaltar la sección
                    border: `1px solid ${PRIMARY_COLOR}`
                }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: TEXT_COLOR, marginBottom: '1rem' }}>
                        Subcuentas ({cuenta.childAccounts.length})
                    </h3>

                    {/* Lista de Hijos */}
                    {hasChildren ? (
                        <ul style={{ listStyleType: 'none', paddingLeft: '5px' }}>
                            {
                                cuenta.childAccounts.map(child => (
                                    <li key={child.id} style={{ 
                                        marginBottom: '8px', 
                                        fontSize: '0.95rem',
                                        color: TEXT_COLOR,
                                    }}>
                                        <span style={{ fontWeight: '600', color: PRIMARY_COLOR }}>{child.code}</span> - {child.name}
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <p style={{ color: '#7F8C8D' }}>Esta cuenta de Control no tiene subcuentas directas.</p>
                    )}

                    {/* Botón para Agregar Subcuenta */}
                    {isAdmin && (
                        <button
                            className='btn mt-3'
                            onClick={handleAddCuenta}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                color: TEXT_COLOR,
                                fontWeight: '600',
                            }}
                        >
                            <FaPlusCircle className='me-2' /> Agregar Subcuenta
                        </button>
                    )}
                </div>
            )}
            
            {/* Si es Imputable, podemos dejar un espacio o mensaje */}
            {!isControl && (
                <div style={{ padding: '20px', borderLeft: `5px solid ${PRIMARY_COLOR}` }}>
                    <p style={{ color: TEXT_COLOR, fontStyle: 'italic' }}>Esta es una cuenta Imputable. No puede tener subcuentas.</p>
                </div>
            )}

        </div>
    );
};

export default InfoCuentasComponent;
