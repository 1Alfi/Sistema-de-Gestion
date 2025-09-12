import React, { useState } from 'react'
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SideBarComponent from './SideBarComponent';

const AddCuentaComponent = () => {

    const location = useLocation();
    const idParent = location.state?.idParent || null;

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [controlCheck, setControlCheck] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const saveAccount = (e) => {
        e.preventDefault();
        const account = { code, name }; 
        let serviceCall;

        if (controlCheck) {
            //Cuenta contenedora
            if (idParent) {
                //Contenedora con padre
                serviceCall = PlanDeCuentasServicio.crearCuentaControlId(account, idParent);
            } else {
                //Contenedora sin padre
                serviceCall = PlanDeCuentasServicio.crearCuentaControl(account);
            }
        } else {
            //Cuenta hoja
            if (!idParent) {
                //No puede crearse sin id de padre
                 console.error("Una cuenta de balance debe tener un padre.");
                 setError("Una cuenta de que no es contenedora siempre debe tener padre");
                 return;
            }
            //Cuenta Hoja con padre
            serviceCall = PlanDeCuentasServicio.crearCuentaBalance(account, idParent);
        }
        navigate('/plan-de-cuentas')
    }

    return (
        <div className='d-flex'>
            <SideBarComponent />
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-10 offset-md-1 mt-5'>
                        <h2 className='text-center mt-3'> Registro de cuentas</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Cuenta:</label>
                                    <input
                                        type='text'
                                        placeholder='Nombre cuenta...'
                                        name='account'
                                        className='form-control'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Codigo:</label>
                                    <input
                                        type='text'
                                        placeholder='Codigo cuenta...'
                                        name='code'
                                        className='form-control'
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <input
                                        type='checkbox'
                                        name='controlCheck'
                                        className='form-check-input me-2'
                                        checked={controlCheck}
                                        onChange={(e) => setControlCheck(e.target.checked)}
                                    />
                                    <label className='form-check-label'>Contenedor</label>
                                </div>
                                <div className=' d-grid d-md-flex justify-content-md-end'>
                                    <button className='btn btn-secondary mt-2 me-2' onClick={(e) => saveAccount(e)}>Guardar</button>
                                    &nbsp;&nbsp;
                                    <Link to='/plan-de-cuentas' className='btn btn-danger mt-2'>Cancelar</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>
    )
}

export default AddCuentaComponent
