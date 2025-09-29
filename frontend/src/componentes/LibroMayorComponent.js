import React, { useEffect, useState } from 'react';
import SideBarComponent from './SideBarComponent';
import LibrosServicio from '../servicios/LibrosServicio';
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { Link } from 'react-router-dom';

const LibroMayorComponent = () => {
    const [movimientos, setMovimientos] = useState([]);
    const [error, setError] = useState('');
    const [cuentas, setCuentas] = useState([]);
    const [selectedCuentaId, setSelectedCuentaId] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [cargando, setCargando] = useState(false);
    const [saldoInicial, setSaldoInicial] = useState(0);

    // Carga las cuentas al inicio
    useEffect(() => {
        PlanDeCuentasServicio.listarCuentas().then((response) => {
            setCuentas(response.data);
        }).catch(error => {
            console.error("Error al cargar las cuentas:", error);
        });
    }, []);

    // Efecto para buscar los datos del libro mayor
    useEffect(() => {
        if (selectedCuentaId && fechaDesde && fechaHasta) {
            setCargando(true);
            LibrosServicio.getLibroMayor(selectedCuentaId, fechaDesde, fechaHasta)
                .then((response) => {
                    const data = response.data;
                    setSaldoInicial(data.saldoInicial);
                    setMovimientos(data.movimientosPeriodo);
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
        }
    }, [selectedCuentaId, fechaDesde, fechaHasta]);

    // Cálculo del saldo final en el frontend (es opcional, el backend podría enviarlo)
    const saldoFinal = movimientos.reduce((total, movimiento) => {
        // En el backend se debería enviar el tipo de cuenta para un cálculo correcto
        return total + parseFloat(movimiento.debe || 0) - parseFloat(movimiento.haber || 0);
    }, saldoInicial);


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
                                <option key={account.id} value={account.id}>{account.nombre}</option>
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
                                        <th>Fecha</th>
                                        <th>Operación</th>
                                        <th>Debe</th>
                                        <th>Haber</th>
                                        <th>Saldo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>Saldo Inicial</td>
                                        <td></td>
                                        <td></td>
                                        <td>{saldoInicial.toFixed(2)}</td>
                                    </tr>
                                    {movimientos.map((mov, index) => {
                                        const saldoParcial = movimientos.slice(0, index + 1).reduce((total, current) =>
                                            total + parseFloat(current.debe || 0) - parseFloat(current.haber || 0), saldoInicial);
                                        
                                        return (
                                            <tr key={index}>
                                                <td>{mov.fechaAsiento}</td>
                                                <td>{mov.operacion}</td>
                                                <td>{mov.debe > 0 ? mov.debe.toFixed(2) : ''}</td>
                                                <td>{mov.haber > 0 ? mov.haber.toFixed(2) : ''}</td>
                                                <td>{saldoParcial.toFixed(2)}</td>
                                            </tr>
                                        );
                                    })}
                                    <tr className="fw-bold">
                                        <td></td>
                                        <td>Saldo Final</td>
                                        <td></td>
                                        <td></td>
                                        <td>{saldoFinal.toFixed(2)}</td>
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