import React, { useEffect, useState } from 'react'
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';

const InfoCuentasComponent = (cuentaId) => {
    const [cuenta, setCuenta] = useState({
        id: 0,
        numero: '',
        nombre: '',
        tipo: ''
    });
    const [saldo, setSaldoCuenta] = useState(0);
    const [error, setError] = useState('')

    useEffect(() => {
            infoCuenta();
            saldoCuenta();
        }, [])
    
    // Obtiene mediante el servicio el objeto cuenta con los siguientes datos {nombre, }
    const infoCuenta = () => {
        PlanDeCuentasServicio.getCuentaById(cuentaId).then((response) => {
            setCuenta(response.data);
            console.log(response.data);
        }).catch(err => {
            console.error(error);
            if (err.response && err.response.data && err.response.data.message) {
                // Si el error viene del back
                setError(err.response.data.message);
            } else {
                // Si es un error genérico
                setError('Ocurrió un error al cargar los datos de la cuenta. Por favor, recargue la pagina.');
            }
        })
    }
    const saldoCuenta = () => {
        PlanDeCuentasServicio.getSaldoCuenta(cuentaId).then((response) => {
            setSaldoCuenta(response.data);
            console.log(response.data);
        }).catch(err => {
            console.error(err);
            
        })
    }
    if(!(cuenta.numero === '')){
        return (
            <div>
            <h1>Cuenta {cuenta.nombre}</h1>
            <h4>numero cuenta {cuenta.numero}</h4>
            <br />
            <h3>Tipo {cuenta.tipo}</h3>
            <br />
            <h3>$ {saldo}</h3>
            </div>
        )
    }
    return(
        <div>
            {error && <div className='alert alert-danger mt-4 ms-5'>{error}</div>}
        </div>
    )
    
}

export default InfoCuentasComponent
