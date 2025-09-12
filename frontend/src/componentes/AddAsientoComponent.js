import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AsientoServicio from '../servicios/AsientoServicio';
import SideBarComponent from './SideBarComponent';

const AddAsientoComponent = () => {
  const [description, setDescription] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [movements, setMovements] = useState([{ accountId: '', debit: 0, credit: 0 }]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    AsientoServicio.getCuentasAsiento().then((response) => {
      setAccounts(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const handleAddMovement = () => {
    setMovements([...movements, { accountId: '', debit: 0, credit: 0 }]);
  };

  const handleRemoveMovement = (index) => {
    const list = [...movements];
    list.splice(index, 1);
    setMovements(list);
  };

  const handleMovementChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...movements];

    // Nueva validación para valores negativos
    if ((name === 'debit' || name === 'credit') && parseFloat(value) < 0) {
      list[index][name] = 0;
    } else {
      if (name === 'debit') {
        list[index]['credit'] = 0;
      } else if (name === 'credit') {
        list[index]['debit'] = 0;
      }
      list[index][name] = value;
    }

    setMovements(list);
  };

  const guardarAsiento = (e) => {
    e.preventDefault();
    setError('');

    const totaldebit = movements.reduce((sum, movement) => sum + parseFloat(movement.debit || 0), 0);
    const totalcredit = movements.reduce((sum, movement) => sum + parseFloat(movement.credit || 0), 0);

    if (movements.length < 2) {
      setError('Error: Un asiento contable debit tener al menos dos movimientos.');
      return;
    }

    if (totaldebit !== totalcredit) {
      setError('Error: Los saldos del debit y el credit no coinciden.');
      return;
    }

    const hasUnselectedAccount = movements.some(movement => movement.accountId === '');
    if (hasUnselectedAccount) {
      setError('Error: Todos los movimientos debitn tener una cuenta seleccionada.');
      return;
    }

    const asiento = { description, movements };
    AsientoServicio.crearAsiento(asiento).then(() => {
      navigate('/asientos');
    }).catch(error => {
      console.log(error);
      setError('Ocurrió un error al guardar el asiento.');
    });
  };

  return (
    <div className='d-flex'>
      <SideBarComponent />
      <div className='container'>
        <div className='row'>
          <div className='card col-md-fill offset-md-0 mt-4'>
            <h2 className='text-center mt-3'>Registro de asientos</h2>
            <div className='card-body'>
              <form onSubmit={guardarAsiento}>
                <div className='form-group mb-2'>
                  <label className='form-label'>Operación</label>
                  <input
                    type='text'
                    placeholder='operación...'
                    name='description'
                    className='form-control'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <h2 className='text mt-3'>Movimientos</h2>

                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {movements.map((movement, index) => (
                    <div key={index} className='row mb-3'>
                      <div className='col-5'>
                        <label className='form-label'>Cuenta</label>
                        <select
                          className="form-select"
                          name="accountId"
                          value={movement.accountId}
                          onChange={(e) => handleMovementChange(index, e)}
                        >
                          <option value="" disabled>-- Seleccione una cuenta --</option>
                          {accounts.map(cuenta => (
                            <option key={cuenta.id} value={cuenta.id}>{cuenta.nombre}</option>
                          ))}
                        </select>
                      </div>
                      <div className='col-3'>
                        <label className='form-label'>Debe</label>
                        <input
                          type='number'
                          placeholder='debit...'
                          name='debit'
                          className='form-control'
                          value={movement.debit}
                          onChange={(e) => handleMovementChange(index, e)}
                          step="0.01"
                        />
                      </div>
                      <div className='col-3'>
                        <label className='form-label'>Haber</label>
                        <input
                          type='number'
                          placeholder='credit...'
                          name='credit'
                          className='form-control'
                          value={movement.credit}
                          onChange={(e) => handleMovementChange(index, e)}
                          step="0.01"
                        />
                      </div>
                      {movements.length > 1 && (
                        <div className='col-1 d-flex align-items-end'>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleRemoveMovement(index)}
                          >
                            X
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className='btn btn-secondary mt-2 mb-3'
                  onClick={handleAddMovement}
                >
                  Agregar movimiento
                </button>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className='d-grid d-md-flex justify-content-md-end'>
                  <button type="submit" className='btn btn-success mt-2 me-2'>Guardar Asiento</button>
                  <Link to='/inicio' className='btn btn-danger mt-2'>Cancelar</Link>
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