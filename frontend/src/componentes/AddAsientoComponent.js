import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AsientoServicio from '../servicios/AsientoServicio';
import SideBarComponent from './SideBarComponent';
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { FaSave, FaTimesCircle, FaPlus, FaCalculator, FaTrash } from 'react-icons/fa';
import { LuBookOpenCheck } from 'react-icons/lu';

// --- CONSTANTES DE ESTILO ---
const PRIMARY_COLOR = '#A8DADC';  
const TEXT_COLOR = '#2C3E50';     
const BACKGROUND_COLOR = '#F8F9FA'; 
const CARD_COLOR = '#FFFFFF';

const AddAsientoComponent = () => {
  const [description, setDescription] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [movements, setMovements] = useState([{ accountId: '', debit: '', credit: '' }]); // Usar accountId para el backend
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [hasCredit, setHasCredit] = useState(false);
  const [checkDouble, setCheckDouble] = useState(false);

  const navigate = useNavigate();

  // Calcula totales en tiempo real
  const totalDebit = movements.reduce((sum, movement) => sum + (parseFloat(movement.debit) || 0), 0);
  const totalCredit = movements.reduce((sum, movement) => sum + (parseFloat(movement.credit) || 0), 0);
  const isBalanced = totalDebit === totalCredit && totalDebit > 0;
  
  // 1. Cargar Cuentas Imputables al montar
  useEffect(() => {
    // Usamos getBalanceAccounts porque solo las cuentas de balance (imputables) pueden tener movimientos
    PlanDeCuentasServicio.getBalanceAccounts().then((response) => {
      setAccounts(response.data);
    }).catch(error => {
      console.error("Error al cargar cuentas:", error);
      setError('No se pudieron cargar las cuentas imputables.');
    });
  }, []);

  // 2. Manejadores de Movimientos
  const handleAddMovement = () => {
    setMovements([...movements, { accountId: '', debit: '', credit: '' }]);
  };

  const handleRemoveMovement = (index) => {
    const list = [...movements];
    list.splice(index, 1);
    setMovements(list);

    // Recalcula el estado hasCredit al eliminar
    const updatedHasCredit = list.some(m => parseFloat(m.credit || 0) > 0);
    setHasCredit(updatedHasCredit);
  };

  const handleMovementChange = (index, event) => {
    const { name, value } = event.target;
    let list = [...movements];
    
    // Si es una cuenta, guardamos el ID
    if (name === 'accountId') {
        list[index][name] = value;
        setMovements(list);
        return;
    }

    // Manejo de valores numéricos para Debe/Haber
    const numericValue = value === '' ? '' : parseFloat(value.replace(',', '.')) || 0;

    // Asegurar que el valor sea positivo
    if (numericValue < 0) {
      list[index][name] = ''; // Limpiamos si es negativo
      setMovements(list);
      setError('Error: Los valores de Debe/Haber deben ser positivos.');
      return; 
    }

    // Lógica para que solo un campo tenga valor (Debe o Haber)
    if (name === 'debit') {
      list[index]['credit'] = '';
    } else if (name === 'credit') {
      list[index]['debit'] = '';
    }

    // Lógica para no agregar debe si ya hay un haber y no es asiento doble
    if (name === 'debit' && numericValue > 0 && hasCredit && !checkDouble) {
      list[index][name] = '';
      setError('Error: Para registrar movimientos de Debe después de haber registrado un Haber, debe marcar la casilla "Asiento doble".');
    } else {
      list[index][name] = value; // Guardar el string original (para el input type="number")
      setError('');
    }

    // Recalcular hasCredit basado en el nuevo estado
    const updatedHasCredit = list.some(m => parseFloat(m.credit || 0) > 0);
    setHasCredit(updatedHasCredit);

    setMovements(list);
  };

  // 3. Guardar Asiento
  const guardarAsiento = async (e) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) {
        setError('Error: La operación no puede estar vacía.');
        return;
    }

    if (movements.length < 2) {
      setError('Error: Un asiento contable debe tener al menos dos movimientos.');
      return;
    }

    if (!isBalanced) {
      setError(`Error: El asiento no balancea. Debe: ${totalDebit.toFixed(2)} vs. Haber: ${totalCredit.toFixed(2)}.`);
      return;
    }

    const hasUnselectedAccount = movements.some(movement => !movement.accountId);
    if (hasUnselectedAccount) {
      setError('Error: Todos los movimientos deben tener una cuenta seleccionada.');
      return;
    }
    
    // Asegurarse de que los valores numéricos se envíen como números (parseFloat)
    const finalMovements = movements.map(m => ({
        accountId: m.accountId,
        debit: parseFloat(m.debit) || 0,
        credit: parseFloat(m.credit) || 0,
    }));

    const asiento = { description, movements: finalMovements };
    setIsSaving(true);

    try {
        await AsientoServicio.crearAsiento(asiento);
        navigate('/libro-diario');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Ocurrió un error al guardar el asiento.');
    } finally {
        setIsSaving(false);
    }
  };

  // 4. Componente de Totales y Balance
  const TotalsDisplay = () => (
    <div className='row mt-4 p-3 border-top' style={{ backgroundColor: isBalanced ? '#E6F4EA' : '#FCEAE7', borderRadius: '0 0 10px 10px' }}>
      <div className='col-4 d-flex align-items-center' style={{ color: TEXT_COLOR, fontWeight: '600' }}>
        <FaCalculator className='me-2' />
        Estado: 
        <span className={`ms-2 p-1 rounded ${isBalanced ? 'text-success' : 'text-danger'}`} style={{ backgroundColor: isBalanced ? '#C6E9D1' : '#F7C4C0'}}>
            {isBalanced ? 'BALANCEADO' : 'PENDIENTE'}
        </span>
      </div>
      <div className='col-4 text-end' style={{ fontWeight: '700', color: TEXT_COLOR }}>
        Total Debe: <span className='text-success'>${totalDebit.toFixed(2)}</span>
      </div>
      <div className='col-4 text-end' style={{ fontWeight: '700', color: TEXT_COLOR }}>
        Total Haber: <span className='text-danger'>${totalCredit.toFixed(2)}</span>
      </div>
    </div>
  );

  return (
    // CAMBIO 1: Se elimina 'vh-100' para permitir que el contenedor principal crezca con el contenido y el background se extienda.
    <div className='d-flex' style={{ backgroundColor: BACKGROUND_COLOR, minHeight: '100vh' }}>
      <SideBarComponent />
      
      {/* El padding horizontal 'p-md-5' se mantiene para estética, pero se asegura que no haya padding superior ('p-0') */}
      <div className='flex-grow-1 p-0 p-md-3'>
        {/* CAMBIO 2: Se elimina 'mt-3' de la columna para que la tarjeta se pegue completamente al borde superior del contenedor. */}
        <div className='col-lg-10 offset-lg-1'>
          {/* Tarjeta de Formulario Estilizada */}
          <div className='card shadow-lg' style={{ borderRadius: '15px', backgroundColor: CARD_COLOR }}>
            
            {/* Encabezado */}
            <div className='card-header text-center d-flex align-items-center justify-content-center' style={{ 
                backgroundColor: PRIMARY_COLOR, 
                color: TEXT_COLOR,
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                padding: '1.5rem 0'
            }}>
                <LuBookOpenCheck size={28} className='me-3' />
                <h2 className='d-inline-block m-0' style={{ fontWeight: '700' }}>
                    Registro de Asiento Contable
                </h2>
            </div>
            
            <div className='card-body p-4 p-md-5'>
              <form onSubmit={guardarAsiento}>
                
                {/* 1. Descripción de la Operación */}
                <h4 className='mb-3' style={{ color: TEXT_COLOR }}>Detalle del Asiento</h4>
                <div className='form-group mb-5'>
                  <label className='form-label' style={{ fontWeight: '600', color: TEXT_COLOR }}>Descripción de la Operación:</label>
                  <input
                    type='text'
                    placeholder='Ej: Venta de mercaderías según factura A-001...'
                    name='description'
                    className='form-control form-control-lg'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSaving}
                    required
                    style={{ borderColor: PRIMARY_COLOR }}
                  />
                </div>
                
                {/* 2. Movimientos Contables (Tabla estilizada) */}
                <h4 className='mb-4' style={{ color: TEXT_COLOR }}>Movimientos</h4>

                <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #E0E0E0', borderRadius: '8px' }}>
                    <table className="table table-hover mb-0">
                        <thead style={{ position: 'sticky', top: 0, backgroundColor: '#F0F0F0', zIndex: 5 }}>
                            <tr>
                                <th style={{ width: '50%', color: TEXT_COLOR }}>Cuenta Imputable</th>
                                <th style={{ width: '20%', color: TEXT_COLOR }} className='text-center'>Debe ($)</th>
                                <th style={{ width: '20%', color: TEXT_COLOR }} className='text-center'>Haber ($)</th>
                                <th style={{ width: '10%' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {movements.map((movement, index) => (
                                <tr key={index}>
                                    {/* Columna Cuenta */}
                                    <td>
                                        <select
                                            className="form-select"
                                            name="accountId"
                                            value={movement.accountId}
                                            onChange={(e) => handleMovementChange(index, e)}
                                            disabled={isSaving}
                                            required
                                            style={{ borderColor: PRIMARY_COLOR, minWidth: '150px' }}
                                        >
                                            <option value="" disabled>-- Seleccione una cuenta --</option>
                                            {accounts.map(cuenta => (
                                                <option key={cuenta.id} value={cuenta.id}>{cuenta.code} - {cuenta.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    
                                    {/* Columna Debe */}
                                    <td>
                                        <input
                                            type='number'
                                            placeholder='0.00'
                                            name='debit'
                                            className='form-control text-end'
                                            value={movement.debit}
                                            onChange={(e) => handleMovementChange(index, e)}
                                            step="0.01"
                                            disabled={isSaving}
                                            style={{ minWidth: '100px' }}
                                        />
                                    </td>
                                    
                                    {/* Columna Haber */}
                                    <td>
                                        <input
                                            type='number'
                                            placeholder='0.00'
                                            name='credit'
                                            className='form-control text-end'
                                            value={movement.credit}
                                            onChange={(e) => handleMovementChange(index, e)}
                                            step="0.01"
                                            disabled={isSaving}
                                            style={{ minWidth: '100px' }}
                                        />
                                    </td>

                                    {/* Columna Eliminar */}
                                    <td className='text-center'>
                                        {movements.length > 1 && (
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleRemoveMovement(index)}
                                                disabled={isSaving}
                                                title="Eliminar movimiento"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 3. Opciones y Botones de Movimiento */}
                <div className='d-flex justify-content-between align-items-center mt-3 mb-4'>
                    <button
                        type="button"
                        className='btn btn-outline-secondary'
                        onClick={handleAddMovement}
                        disabled={isSaving}
                    >
                        <FaPlus className="me-2" /> Agregar Movimiento
                    </button>

                    <div className='form-check'>
                        <input
                            type='checkbox'
                            name='checkDouble'
                            id='checkDouble'
                            className='form-check-input'
                            checked={checkDouble}
                            onChange={(e) => setCheckDouble(e.target.checked)}
                            disabled={isSaving}
                        />
                        <label className='form-check-label' htmlFor='checkDouble' style={{ fontWeight: '600' }}>
                            Permitir Asiento Doble (Debe seguido de Haber)
                        </label>
                    </div>
                </div>

                {/* Totales y Estado de Balance */}
                <TotalsDisplay />

                {/* Mensaje de Error */}
                {error && <div className="alert alert-danger mt-4">{error}</div>}

                {/* Botones de Acción Final */}
                <div className='d-grid gap-2 d-md-flex justify-content-md-end mt-4 pt-3 border-top'>
                    <button 
                        className='btn btn-lg me-md-2' 
                        type="submit"
                        disabled={isSaving || !isBalanced} // Deshabilitar si no balancea
                        style={{
                            backgroundColor: isBalanced ? PRIMARY_COLOR : '#E0E0E0', 
                            color: isBalanced ? TEXT_COLOR : '#7F8C8D', 
                            fontWeight: '600'
                        }}
                    >
                        {isSaving ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Guardando...
                            </>
                        ) : (
                            <><FaSave className="me-2" /> Guardar Asiento</>
                        )}
                    </button>
                    
                    <Link 
                        to='/inicio' 
                        className='btn btn-secondary btn-lg'
                        tabIndex={isSaving ? -1 : 0} 
                        style={isSaving ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                    >
                        <FaTimesCircle className="me-2" /> Cancelar
                    </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAsientoComponent;
