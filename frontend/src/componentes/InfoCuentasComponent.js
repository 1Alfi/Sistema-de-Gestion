import React, { useEffect, useState } from 'react';
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { useNavigate } from 'react-router-dom';

// Recibe la prop 'id'
const InfoCuentasComponent = ({ id }) => { 
    const [cuenta, setCuenta] = useState(null);
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
        return (
            <div>
                <h1>Cuenta {cuenta.nombre}</h1>
                <h4>número cuenta {cuenta.numero}</h4>
                <br />
                <h3>Tipo {cuenta.tipo}</h3>
                <br />
                {/* <h3>$ {saldo}</h3> */}
                <button
                    className='btn btn-success mt-2 me-2'
                    onClick={handleAddCuenta}
                >
                    Agregar cuenta...
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