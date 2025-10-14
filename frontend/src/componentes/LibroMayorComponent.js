import React, { useEffect, useState } from 'react';
import SideBarComponent from './SideBarComponent';

import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { Link } from 'react-router-dom';
import LibroMayorServicio from '../servicios/LibroMayorServicio';

const LibroMayorComponent = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [error, setError] = useState('');
    const [cuentas, setCuentas] = useState([]);
    const [selectedCuentaId, setSelectedCuentaId] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [cargando, setCargando] = useState(false);
    const [saldoInicial, setSaldoInicial] = useState(0);
    const [saldoFinal, setSaldoFinal] = useState(0);

    // Carga las cuentas al inicio
    useEffect(() => {
        PlanDeCuentasServicio.getBalanceAccounts().then((response) => {
            setCuentas(response.data);
            console.log(response.data);
        }).catch(error => {
            console.error("Error al cargar las cuentas:", error);
        });
    }, []);

    // Efecto para buscar los datos del libro mayor
    useEffect(() => {
        if (selectedCuentaId && fechaDesde && fechaHasta) {
            setCargando(true);
            LibroMayorServicio.getMovimientosPorCuentaYPeriodo(selectedCuentaId, fechaDesde, fechaHasta)
                .then((response) => {
                    const data = response.data;
                    const fetchedMovements = data.movements;
                    
                    setMovimientos(fetchedMovements);
                    setSaldoInicial(data.initialBalance);

                    //Setea el saldo final
                    if (fetchedMovements && fetchedMovements.length > 0) {
                        const ultimoMovimiento = fetchedMovements[fetchedMovements.length - 1];
                        setSaldoFinal(ultimoMovimiento.account_balance);
                    } else {
                        setSaldoFinal(data.initialBalance || 0); 
                    }
                    
                    setError('');
                })
                .catch(err => {
                    console.error("Error al obtener libro mayor:", err);
                    setMovimientos([]);
                    setSaldoInicial(0);
                    setError(err.response?.data?.message || 'Ocurrió un error al cargar el libro mayor.');
                })
                .finally(() => {
                    setCargando(false);
                });
        } else {
            setMovimientos([]);
            setSaldoInicial(0);
            setSaldoFinal(0);
        }
    }, [selectedCuentaId, fechaDesde, fechaHasta]);

    return (
        <div className='d-flex'>
            <SideBarComponent />
            <div className='container'>
                <div className='d-flex mb-4 align-items-end'>
                    {/* Control de selección de cuenta */}
                    <div className='form-group me-3'>
                        <label className='form-label'>Cuenta:</label>
                        <select
                            className="form-select"
                            name="cuenta"
                            value={selectedCuentaId}
                            onChange={(e) => setSelectedCuentaId(e.target.value)}
                        >
                            <option value="" disabled>-- Seleccione una cuenta --</option>
                            {cuentas.map(account => (
                                <option key={account.id} value={account.id}>{account.name}</option>
                            ))}
                        </select>
                    </div>
                    {/* Control de fecha "Desde" */}
                    <div className='form-group me-3'>
                        <label className='form-label'>Desde:</label>
                        <input
                            type='date'
                            className='form-control'
                            value={fechaDesde}
                            onChange={(e) => setFechaDesde(e.target.value)}
                        />
                    </div>
                    {/* Control de fecha "Hasta" */}
                    <div className='form-group me-3'>
                        <label className='form-label'>Hasta:</label>
                        <input
                            type='date'
                            className='form-control'
                            value={fechaHasta}
                            onChange={(e) => setFechaHasta(e.target.value)}
                        />
                    </div>
                    <Link to='/' className='btn btn-danger'>Cancelar</Link>
                </div>

                {error && (
                    <div className='alert alert-danger mt-3' role='alert'>
                        {error}
                    </div>
                )}

                {cargando ? (
                    <div className='d-flex justify-content-center mt-5'>
                        <div className='spinner-border text-primary' role='status'>
                            <span className='visually-hidden'>Cargando...</span>
                        </div>
                    </div>
                ) : (
                    movimientos.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th style={{ width: '15%' }}>Fecha</th>
                                        <th style={{ width: '42%'}}>Operacion</th>
                                        <th style={{ width: '12.5%', textAlign: 'left', paddingRight: '15px' }}>Debe</th>
                                        <th style={{ width: '12.5%', textAlign: 'left', paddingRight: '15px' }}>Haber</th>
                                        <th style={{ width: '15%' }}>Saldo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>Saldo Inicial</td>
                                        <td></td>
                                        <td></td>
                                        <td>{saldoInicial}</td>
                                    </tr>
                                    {movimientos.map((mov, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{mov.dateCreated}</td>
                                                <td>{mov.description}</td>
                                                <td>{mov.debit > 0 ? mov.debit : ''}</td>
                                                <td>{mov.credit > 0 ? mov.credit : ''}</td>
                                                <td>{mov.account_balance}</td>
                                            </tr>
                                        );
                                    })}
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td>Saldo Final</td>
                                        <td></td>
                                        <td></td>
                                        <td>{saldoFinal}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className='alert alert-info mt-3' role='alert'>
                            {selectedCuentaId && fechaDesde && fechaHasta ? 'No hay movimientos en el período seleccionado.' : 'Seleccione una cuenta y un período para ver el libro mayor.'}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default LibroMayorComponent;