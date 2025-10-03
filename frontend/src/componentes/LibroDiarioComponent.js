import React, { useEffect, useState } from 'react'
import SideBarComponent from './SideBarComponent';
import { Link } from 'react-router-dom';
import LibroDiarioServicio from '../servicios/LibroDiarioServicio';



const LibroDiarioComponent = () => {

    const [asientos, setAsientos] = useState([]);
    const [error, setError] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [cargando, setCargando] = useState(false);
    
    useEffect(() => {
        // Solo hace la llamada si las fechas están seleccionadas
        if (fechaDesde && fechaHasta) {
            setCargando(true);
            LibroDiarioServicio.getAsientosPorPeriodo(fechaDesde, fechaHasta)
                .then((response) => {
                    setAsientos(response.data);
                    setError('');
                    console.log(response.data);
                })
                .catch(err => {
                    console.error(err);
                    setAsientos([]); // Vacía los asientos en caso de error
                    if (err.response && err.response.data && err.response.data.message) {
                        setError(err.response.data.message);
                    } else {
                        setError('Ocurrió un error al cargar los datos.');
                    }
                })
                .finally(() => {
                    setCargando(false);
                });
        } else {
            setCargando(true);
            LibroDiarioServicio.getLastAsientos()
                .then((response) => {
                    setAsientos(response.data);
                    setError('');
                    if(response.data === null){
                        console.error("No hay asientos");
                    }
                    console.log(response.data);
                })
                .catch(err => {
                    console.error(err);
                    setAsientos([]); // Vacía los asientos en caso de error
                    if (err.response && err.response.data && err.response.data.message) {
                        setError(err.response.data.message);
                    } else {
                        setError('Ocurrió un error al cargar los datos.');
                    }
                })
                .finally(() => {
                    setCargando(false);
                });
        }
    }, [fechaDesde, fechaHasta]); //Hace que se ejecute, siempre que alguna de las dos fechas cambie su valor

    return (
        <div className='d-flex'>
            <SideBarComponent />
            <div className='container'>
                <div className='d-flex  mb-4'>
                    <div className='form-group me-3'>
                        <label className='form-label'>Desde:</label>
                        <input
                            type='date'
                            className='form-control'
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        />
                    </div>
                    <div className='form-group me-3'>
                        <label className='form-label'>Hasta:</label>
                        <input
                            type='date'
                            className='form-control'
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        />
                    </div>
                    <Link to='/' className='btn btn-danger mt-4 mb-1'>Cancelar</Link>
                </div>

                {error && (
                    <div className='alert alert-danger' role='alert'>
                        {error}
                    </div>
                )}

                {cargando ? (
                    <div className='d-flex justify-content-center mt-5'>
                        <div className='spinner-border text-primary' role='status'>
                            <span className='visually-hidden'>Cargando...</span>
                        </div>
                    </div>
                ) : asientos.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Operacion</th>
                                <th>Cuentas</th>
                                <th>Debe</th>
                                <th>Haber</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                asientos.map(asiento => (
                                    asiento.movimientos.map((movimiento, index) => (
                                        <tr key={`${asiento.id}-${movimiento.id}`}>
                                            {index === 0 ? (
                                                <>
                                                    <td rowSpan={asiento.movimientos.length}>{asiento.fecha}</td>
                                                    <td rowSpan={asiento.movimientos.length}>{asiento.operacion}</td>
                                                </>
                                            ) : null}
                                            <td className={movimiento.haber > 0 ? 'indentado' : ''}>
                                                {movimiento.cuenta.nombre}
                                            </td>
                                            <td>{movimiento.debe > 0 ? movimiento.debe : ''}</td>
                                            <td>{movimiento.haber > 0 ? movimiento.haber : ''}</td>
                                        </tr>
                                    ))
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <div className='alert alert-info mt-3' role='alert'>
                        {fechaDesde && fechaHasta ? 'No hay asientos en el período seleccionado.' : 'Seleccione un período para ver el libro diario.'}
                    </div>
                )}
            </div>
        </div>
    );
    
}

export default LibroDiarioComponent
