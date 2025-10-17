import React, { useEffect, useState, useCallback } from 'react'
import SideBarComponent from './SideBarComponent';
import { Link } from 'react-router-dom';
import LibroDiarioServicio from '../servicios/LibroDiarioServicio';
import { FaCalendarAlt, FaPlusSquare, FaTimesCircle, FaChartLine, FaSearch } from 'react-icons/fa';
import { LuBookOpenCheck } from 'react-icons/lu';

// --- CONSTANTES DE ESTILO ---
const PRIMARY_COLOR = '#A8DADC';  
const TEXT_COLOR = '#2C3E50';     
const BACKGROUND_COLOR = '#F8F9FA'; 
const CARD_COLOR = '#FFFFFF';
const MAX_PERIOD_DAYS = 62; // Límite de 2 meses (62 días) para el Libro Diario

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

// Se recomienda usar esta función para el filtro 'Hasta' en el backend
const getNextDayISO = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
};


const LibroDiarioComponent = () => {

    const [asientos, setAsientos] = useState([]);
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState(''); // Nuevo estado para errores de validación
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [cargando, setCargando] = useState(false);
    const [reporteTitulo, setReporteTitulo] = useState('Últimos Asientos Registrados'); 

    // Función de validación de fechas (período máximo de 62 días)
    const validateDates = (desde, hasta) => {
        if (!desde || !hasta) {
            setValidationError(''); 
            return false; // No hay error de validación, pero faltan datos
        }

        const dateDesde = new Date(desde);
        const dateHasta = new Date(hasta);

        // 1. Validar que fechaDesde no sea posterior a fechaHasta
        if (dateDesde.getTime() > dateHasta.getTime()) {
            setValidationError('La fecha "Desde" no puede ser posterior a la fecha "Hasta".');
            return false;
        }

        // 2. Validar que el periodo no sea mayor a MAX_PERIOD_DAYS
        // Sumamos 1 a la diferencia en días porque el rango es inclusivo
        const diffTime = Math.abs(dateHasta.getTime() - dateDesde.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; 

        if (diffDays > MAX_PERIOD_DAYS) {
            setValidationError(`El período seleccionado no puede ser mayor a ${MAX_PERIOD_DAYS} días (2 meses).`);
            return false;
        }

        setValidationError(''); // Si las validaciones pasan, limpiamos el error
        return true;
    };


    // Función auxiliar para manejar la carga de datos (hecha con useCallback para estabilidad)
    const cargarAsientos = useCallback(async (fetchFunction, isFiltered) => {
        setCargando(true);
        setError('');
        const minDelay = new Promise((resolve) => setTimeout(resolve, 500)); 

        try {
            const response = await fetchFunction();
            setAsientos(response.data || []);
            console.log(asientos);
            
            // Actualiza el título si se está aplicando un filtro
            if (isFiltered) {
                setReporteTitulo(`Asientos del ${formatLatinDate(fechaDesde)} al ${formatLatinDate(fechaHasta)}`);
            } else {
                setReporteTitulo('Últimos Asientos Registrados');
            }
            
            // Limpia el error si la llamada fue exitosa (incluso si la lista está vacía)
            setError(''); 
        } catch (err) {
            console.error(err);
            setAsientos([]); 
            // Si hay un error, lo establecemos (pero el error de validación tiene prioridad en el renderizado)
            setError(err.response?.data?.message || 'No se pudo establecer conexión con el servidor o hubo un error interno.');
        } finally {
            await minDelay;
            setCargando(false);
        }
    }, [fechaDesde, fechaHasta]); // Dependencias requeridas para actualizar el título

    // 1. Hook para la carga inicial de "Últimos Asientos" (Solo se ejecuta al montar)
    useEffect(() => {
        cargarAsientos(LibroDiarioServicio.getLastAsientos, false);
    }, [cargarAsientos]); 
    
    // Función para manejar la búsqueda al hacer clic en el botón
    const handleBuscar = () => {
        // Ejecutar validación antes de proceder
        const datesValid = validateDates(fechaDesde, fechaHasta);

        if (!fechaDesde || !fechaHasta) {
            setValidationError('Por favor, ingrese ambas fechas (Desde y Hasta) para filtrar el período.');
            return;
        }

        if (!datesValid) {
            // El error de validación ya está seteado por validateDates
            return; 
        }

        // Recomendación del Libro Mayor: usamos el día siguiente para incluir el día completo
        const fechaExclusivaHasta = getNextDayISO(fechaHasta); 
        console.log(fechaDesde);
        console.log(fechaExclusivaHasta);

        // Llama a la función de carga con las fechas del período
        cargarAsientos(() => LibroDiarioServicio.getAsientosPorPeriodo(fechaDesde, fechaExclusivaHasta), true);
    };

    // Función para limpiar los filtros y recargar los últimos asientos
    const handleLimpiarFiltro = () => {
        setFechaDesde('');
        setFechaHasta('');
        setError('');
        setValidationError(''); // Limpiar también el error de validación
        // Vuelve a cargar los últimos asientos
        cargarAsientos(LibroDiarioServicio.getLastAsientos, false);
    };

    // Manejadores de cambio de fecha para la validación reactiva
    const handleFechaDesdeChange = (e) => {
        const newDesde = e.target.value;
        setFechaDesde(newDesde);
        validateDates(newDesde, fechaHasta);
        // Al cambiar una fecha, limpiamos el error de la API por si el usuario quiere corregir
        setError(''); 
    };

    const handleFechaHastaChange = (e) => {
        const newHasta = e.target.value;
        setFechaHasta(newHasta);
        validateDates(fechaDesde, newHasta);
        setError('');
    };

    // 2. Renderizado del componente
    return (
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
                            <h4 className='mb-3' style={{ color: TEXT_COLOR }}>Filtros de Período</h4>
                            <div className='d-flex flex-wrap align-items-end mb-4 p-3 border rounded' style={{ backgroundColor: '#F0F0F0' }}>
                                
                                <div className='form-group me-4 mb-2'>
                                    <label className='form-label' style={{ fontWeight: '600' }}>Desde:</label>
                                    <input
                                        type='date'
                                        className={`form-control ${validationError ? 'is-invalid' : ''}`}
                                        value={fechaDesde}
                                        onChange={handleFechaDesdeChange}
                                        style={{ borderColor: PRIMARY_COLOR }}
                                    />
                                </div>
                                
                                <div className='form-group me-4 mb-2'>
                                    <label className='form-label' style={{ fontWeight: '600' }}>Hasta:</label>
                                    <input
                                        type='date'
                                        className={`form-control ${validationError ? 'is-invalid' : ''}`}
                                        value={fechaHasta}
                                        onChange={handleFechaHastaChange}
                                        style={{ borderColor: PRIMARY_COLOR }}
                                    />
                                </div>
                                
                                <button 
                                    onClick={handleBuscar} 
                                    className='btn btn-primary d-flex align-items-center me-3 mb-2' 
                                    // Deshabilita si está cargando O si hay un error de validación
                                    disabled={cargando || !!validationError || !fechaDesde || !fechaHasta}
                                    style={{ fontWeight: '600', backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR, color: TEXT_COLOR }}
                                >
                                    <FaSearch className='me-2' /> Buscar Período
                                </button>

                                <button 
                                    onClick={handleLimpiarFiltro} 
                                    className='btn btn-secondary d-flex align-items-center mb-2'
                                >
                                    <FaTimesCircle className='me-2' /> Limpiar Filtro
                                </button>
                            </div>

                            {/* Título Dinámico del Reporte */}
                            <h5 className='mb-4 text-muted fw-bold'>{reporteTitulo}</h5>
                            
                            {/* Mensaje de Error (Muestra error de Validación o error de API) */}
                            {(validationError || error) && (
                                <div className='alert alert-danger mb-4' role='alert'>
                                    {validationError || error}
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
                                // Solo se muestra si no hay error de validación
                                !validationError && (
                                    <div className='alert alert-info mt-3' role='alert'>
                                        <FaCalendarAlt className='me-2' />
                                        No hay asientos registrados para este período.
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LibroDiarioComponent;
