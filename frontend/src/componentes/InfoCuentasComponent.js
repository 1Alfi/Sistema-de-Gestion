import React, { useEffect, useState } from 'react';
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { useNavigate } from 'react-router-dom';

// Recibe la prop 'id'
const InfoCuentasComponent = ({ id }) => { 
    const [cuenta, setCuenta] = useState({
        code: "",
        name: "",
        childAccounts : []
    });
    // const [saldo, setSaldoCuenta] = useState(0);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    useEffect(() => {
        // La llamada a los servicios se ejecuta solo si hay un id válido
        if (id) {
            infoCuenta(id);
            // saldoCuenta(id);
        } else {
            // Si no hay id, limpia el estado para no mostrar info de una cuenta anterior
            setCuenta(null);
            // setSaldoCuenta(0);
        }
    }, [id]); // 2. Ahora, la dependencia es el 'id'

    // Pasa el id como parámetro a las funciones de servicio
    const infoCuenta = (accountId) => {
        PlanDeCuentasServicio.getCuentaById(accountId).then((response) => {
            setCuenta(response.data);
            setError('');
        }).catch(err => {
            console.error(err);
            setError(err.response?.data?.message || 'Ocurrió un error al cargar los datos de la cuenta.');
        });
    };
    
    // const saldoCuenta = (accountId) => {
    //     PlanDeCuentasServicio.getSaldoCuenta(accountId).then((response) => {
    //         setSaldoCuenta(response.data);
    //     }).catch(err => {
    //         console.error(err);
    //     });
    // };

    const handleAddCuenta = () => {
        if (cuenta) {
            navigate('/add-cuenta', { state: { idParent: cuenta.id } });
        }
    };

    if (cuenta) {
    const hasChildren = cuenta.childAccounts && cuenta.childAccounts.length > 0;
    
        return (
            <div>
                <h1>Cuenta {cuenta.name}</h1>
                <h4>Código cuenta {cuenta.code}</h4>
                <br />
                
                {hasChildren ? (
                    <div>
                        <h3>Subcuentas {/*({cuenta.childAccounts.length})*/}</h3>
                        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                            {
                                cuenta.childAccounts.map(child => (
                                    <li key={child.id} style={{ marginBottom: '5px' }}>
                                        {/* Muestra el código y el nombre del hijo */}
                                        <span style={{ fontWeight: 'bold' }}>{child.code}</span> - {child.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ) : (
                    // B. Renderizar Saldo si es Cuenta Hoja (no tiene hijos)
                    <div>
                        <h3>Saldo de la cuenta:</h3>
                        {/* <h4 style={{ color: saldo >= 0 ? 'green' : 'red' }}>$ {saldo.toFixed(2)}</h4> */}
                    </div>
                )}
                
                <br />
                {/* El botón de agregar cuenta es para crear una subcuenta. 
                    Debe aparecer solo si es una Cuenta Contenedora, pero si 
                    quieres permitir agregar una subcuenta debajo de una hoja,
                    puedes dejar el botón aquí sin condición. 
                    Si solo quieres agregar hijos a cuentas contenedoras: {hasChildren && ( ... )}
                */}
                <button
                    className='btn btn-success mt-2 me-2'
                    onClick={handleAddCuenta}
                >
                    Agregar subcuenta
                </button>
            </div>
        );
    }
    
    return (
        <div>
            {/* Mensaje si no hay cuenta seleccionada o si hay un error */}
            {error && <div className='alert alert-danger mt-4 ms-5'>{error}</div>}
            {!error && !cuenta && <div className='alert alert-info mt-4 ms-5'>Seleccione una cuenta para ver su información.</div>}
        </div>
    );
};

export default InfoCuentasComponent;