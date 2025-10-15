import React, { useEffect, useState } from 'react'
import SideBarComponent from './SideBarComponent';
import { Link } from 'react-router-dom';
import LibroDiarioServicio from '../servicios/LibroDiarioServicio';
import { FaCalendarAlt, FaPlusSquare, FaTimesCircle, FaChartLine } from 'react-icons/fa';
import { LuBookOpenCheck } from 'react-icons/lu';

// --- CONSTANTES DE ESTILO ---
const PRIMARY_COLOR = '#A8DADC';  
const TEXT_COLOR = '#2C3E50';     
const BACKGROUND_COLOR = '#F8F9FA'; 
const CARD_COLOR = '#FFFFFF';

// Función para formatear la fecha a DD-MM-AAAA
const formatLatinDate = (dateString) => {
    if (!dateString) return '';
    try {
        // La fecha viene como "YYYY-MM-DD HH:MM:SS..."
        const datePart = dateString.split(' ')[0]; // Obtenemos solo "YYYY-MM-DD"
        const [year, month, day] = datePart.split('-');
        return `${day}-${month}-${year}`;
    } catch (e) {
        console.error("Error al formatear fecha:", dateString, e);
        return dateString; // Devuelve la cadena original si falla
    }
};


const LibroDiarioComponent = () => {

    const [asientos, setAsientos] = useState([]);
    const [error, setError] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [cargando, setCargando] = useState(false);

    // 1. Hook para cargar datos iniciales o por período
    useEffect(() => {
        // Función auxiliar para manejar la carga de datos
        const cargarAsientos = async (fetchFunction, isFiltered) => {
            setCargando(true);
            const minDelay = new Promise((resolve) => setTimeout(resolve, 500)); // Delay mínimo de 0.5s para UX

            try {
                const response = await fetchFunction();
                setAsientos(response.data || []);
                setError('');
            } catch (err) {
                console.error(err);
                setAsientos([]); 
                setError(err.response?.data?.message || 'Ocurrió un error al cargar los datos.');
            } finally {
                await minDelay;
                setCargando(false);
            }
        };

        if (fechaDesde && fechaHasta) {
            // Carga por período
            cargarAsientos(() => LibroDiarioServicio.getAsientosPorPeriodo(fechaDesde, fechaHasta), true);
        } else {
            // Carga inicial (últimos asientos)
            cargarAsientos(LibroDiarioServicio.getLastAsientos, false);
        }
    }, [fechaDesde, fechaHasta]); // Se ejecuta al cambiar las fechas

    // 2. Renderizado del componente
    return (
        // Estructura principal sin vh-100 para permitir el scroll
        <div className='d-flex' style={{ backgroundColor: BACKGROUND_COLOR, minHeight: '100vh' }}>
            <SideBarComponent />
            
            <div className='flex-grow-1 p-0 p-md-5'>
                <div className='col-lg-12'>
                    {/* Tarjeta principal del Libro Diario */}
                    <div className='card shadow-lg' style={{ borderRadius: '15px', backgroundColor: CARD_COLOR }}>
                        
                        {/* Encabezado */}
                        <div className='card-header d-flex flex-column flex-md-row align-items-center justify-content-between' style={{ 
                            backgroundColor: PRIMARY_COLOR, 
                            color: TEXT_COLOR,
                            borderTopLeftRadius: '15px',
                            borderTopRightRadius: '15px',
                            padding: '1.5rem'
                        }}>
                            <h2 className='d-flex align-items-center m-0 mb-3 mb-md-0' style={{ fontWeight: '700' }}>
                                <LuBookOpenCheck size={28} className='me-3' />
                                Libro Diario
                            </h2>
                            {/* Botones de acción */}
                            <div className='d-flex gap-3'>
                                <Link to='/asientos' className='btn btn-success d-flex align-items-center' style={{ fontWeight: '600' }}>
                                    <FaPlusSquare className='me-2' /> Nuevo Asiento
                                </Link>
                                <Link to='/libro-mayor' className='btn btn-info d-flex align-items-center' style={{ fontWeight: '600' }}>
                                    <FaChartLine className='me-2' /> Ver Mayor
                                </Link>
                            </div>
                        </div>

                        {/* Cuerpo del Card */}
                        <div className='card-body p-4 p-md-5'>
                            {/* Selector de Fechas y Filtro */}
                            <div className='d-flex flex-wrap align-items-end mb-4 p-3 border rounded' style={{ backgroundColor: '#F0F0F0' }}>
                                <div className='form-group me-4 mb-2'>
                                    <label className='form-label' style={{ fontWeight: '600' }}>Desde:</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        value={fechaDesde}
                                        onChange={(e) => setFechaDesde(e.target.value)}
                                        style={{ borderColor: PRIMARY_COLOR }}
                                    />
                                </div>
                                <div className='form-group me-4 mb-2'>
                                    <label className='form-label' style={{ fontWeight: '600' }}>Hasta:</label>
                                    <input
                                        type='date'
                                        className='form-control'
                                        value={fechaHasta}
                                        onChange={(e) => setFechaHasta(e.target.value)}
                                        style={{ borderColor: PRIMARY_COLOR }}
                                    />
                                </div>
                                <Link to='/inicio' className='btn btn-secondary d-flex align-items-center mb-2'>
                                    <FaTimesCircle className='me-2' /> Cancelar Filtro
                                </Link>
                            </div>

                            {/* Mensaje de Error */}
                            {error && (
                                <div className='alert alert-danger mb-4' role='alert'>
                                    {error}
                                </div>
                            )}

                            {/* Contenido principal (Cargando, Tabla o Info) */}
                            {cargando ? (
                                <div className='d-flex justify-content-center my-5'>
                                    <div className='spinner-border text-primary' role='status' style={{ width: '3rem', height: '3rem' }}>
                                        <span className='visually-hidden'>Cargando...</span>
                                    </div>
                                    <p className='ms-3 pt-1' style={{ color: TEXT_COLOR }}>Cargando asientos...</p>
                                </div>
                            ) : asientos && asientos.length > 0 ? (
                                <div className="table-responsive">
                                    <table className='table table-bordered table-striped' style={{ fontSize: '0.9rem' }}>
                                        <thead style={{ backgroundColor: PRIMARY_COLOR, color: TEXT_COLOR }}>
                                            <tr>
                                                <th style={{ width: '10%' }}>Fecha</th>
                                                <th style={{ width: '30%'}}>Operación</th>
                                                <th style={{ width: '40%' }}>Cuentas</th>
                                                <th style={{ width: '10%', textAlign: 'right' }}>Debe</th>
                                                <th style={{ width: '10%', textAlign: 'right' }}>Haber</th>
                                            </tr>
                                        </thead>
                                        {asientos.map(asiento => (
                                            <tbody key={asiento.id} style={{ borderBottom: '3px solid #E0E0E0' }}>
                                                {asiento.movementDTOS.map((movimiento, index) => (
                                                    <tr key={`${asiento.id}-${movimiento.id}`}>
                                                        {/* Columna Fecha */}
                                                        {index === 0 ? (
                                                            <td rowSpan={asiento.movementDTOS.length} className='align-middle text-center' style={{ fontWeight: 'bold' }}>
                                                                {/* Aplicación del formato DD-MM-AAAA */}
                                                                {formatLatinDate(asiento.date)}
                                                            </td>
                                                        ) : null}
                                                        {/* Columna Operación */}
                                                        {index === 0 ? (
                                                            <td rowSpan={asiento.movementDTOS.length} className='align-middle' style={{ fontStyle: 'italic', backgroundColor: '#F9F9F9' }}>
                                                                {asiento.description}
                                                            </td>
                                                        ) : null}
                                                        
                                                        {/* Columna Cuentas */}
                                                        <td className={movimiento.credit > 0 ? 'ps-5' : ''} style={{ fontWeight: movimiento.credit > 0 ? 'normal' : '500' }}>
                                                            {movimiento.credit > 0 ? `A ${movimiento.account}` : movimiento.account}
                                                        </td>

                                                        {/* Columna Debe */}
                                                        <td className='text-end'>
                                                            {movimiento.debit > 0 ? `$ ${movimiento.debit.toFixed(2)}` : ''}
                                                        </td>
                                                        
                                                        {/* Columna Haber */}
                                                        <td className='text-end'>
                                                            {movimiento.credit > 0 ? `$ ${movimiento.credit.toFixed(2)}` : ''}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            ) : (
                                <div className='alert alert-info mt-3' role='alert'>
                                    <FaCalendarAlt className='me-2' />
                                    {fechaDesde && fechaHasta 
                                        ? 'No hay asientos registrados en el período seleccionado.' 
                                        : 'Aún no hay asientos para mostrar. Puede registrar uno o seleccionar un período.'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LibroDiarioComponent
