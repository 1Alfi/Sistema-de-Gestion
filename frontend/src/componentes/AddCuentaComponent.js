import React, { useState } from 'react';
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SideBarComponent from './SideBarComponent';

const AddCuentaComponent = () => {

    const location = useLocation();
    const idParent = location.state?.idParent || null;

    const [name, setName] = useState('');
    const [controlCheck, setControlCheck] = useState(false);
    const [error, setError] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const saveAccount = async (e) => {
        e.preventDefault();
        setError('');

        if (!controlCheck && controlCheck !== true && !name) {
             setError("Por favor, ingrese un nombre para la cuenta.");
             return;
        }

        const account = { name }; 
        let serviceCall;
        
        // 1. INICIAMOS EL ESTADO DE GUARDADO
        setIsSaving(true); 

        try {
            if (!controlCheck) {
                // Cuenta contenedora
                if (idParent) {
                    serviceCall = PlanDeCuentasServicio.crearCuentaControlId(account, idParent);
                } else {
                    serviceCall = PlanDeCuentasServicio.crearCuentaControl(account);
                }
            } else {
                // Cuenta hoja
                if (!idParent) {
                     setError("Una cuenta de que no es contenedora siempre debe tener padre.");
                     return;
                }
                serviceCall = PlanDeCuentasServicio.crearCuentaBalance(account, idParent);
            }
            
            await serviceCall; 
            
            await new Promise(resolve => setTimeout(resolve, 800));

            navigate('/plan-de-cuentas'); 

        } catch (err) {
            console.error("Error al guardar la cuenta:", err);
            setError(err.response?.data?.message || 'Ocurrió un error al guardar la cuenta.');
        } finally {
            // 4. Detenemos el spinner/estado de guardado al final
            setIsSaving(false);
        }
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
                                        disabled={isSaving} // Deshabilitar mientras guarda
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <input
                                        type='checkbox'
                                        name='controlCheck'
                                        className='form-check-input me-2'
                                        checked={controlCheck}
                                        onChange={(e) => setControlCheck(e.target.checked)}
                                        disabled={isSaving} // Deshabilitar mientras guarda
                                    />
                                    <label className='form-check-label'>Recibe saldo</label>
                                </div>
                                <div className=' d-grid d-md-flex justify-content-md-end'>
                                    <button 
                                        className='btn btn-secondary mt-2 me-2' 
                                        onClick={saveAccount}
                                        disabled={isSaving} // <--- Deshabilitar mientras guarda
                                    >
                                        {isSaving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Guardando...
                                            </>
                                        ) : (
                                            "Guardar"
                                        )}
                                    </button>
                                    &nbsp;&nbsp;
                                    <Link 
                                        to='/plan-de-cuentas' 
                                        className='btn btn-danger mt-2'
                                        tabIndex={isSaving ? -1 : 0} // <--- Deshabilitar enlace
                                        style={isSaving ? { pointerEvents: 'none', opacity: 0.6 } : {}}
                                    >
                                        Cancelar
                                    </Link>
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