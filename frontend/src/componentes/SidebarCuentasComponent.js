import React, { useEffect, useState } from 'react';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { useNavigate } from 'react-router-dom';

const buildTree = (accounts) => {
    const tree = [];
    const map = new Map();

    accounts.sort((a, b) => a.code.localeCompare(b.code));

    accounts.forEach(account => {
        const node = {
            id: account.id,
            code: account.code,
            name: account.name,
            children: []
        };
        map.set(account.code, node);
    });

    accounts.forEach(account => {
        const numero = account.code;
        let parentNode = null;

        for (let i = numero.length - 1; i > 0; i--) {
            if (numero[i] !== '0') {
                const parentNumero = numero.substring(0, i) + '0'.repeat(numero.length - i);
                if (map.has(parentNumero)) {
                    parentNode = map.get(parentNumero);
                    break;
                }
            }
        }

        if (parentNode) {
            parentNode.children.push(map.get(account.code));
        } else {
            tree.push(map.get(account.code));
        }
    });

    return tree;
};

const renderTree = (data, onSelectAccount) => {
    return data.map((node) => {
        const isFolder = node.children && node.children.length > 0;
        
        const labelAndButton = (
            <span onClick={() => onSelectAccount(node.id)} style={{ cursor: 'pointer' }}>
                {node.name}
            </span>
        );
        
        if (isFolder) {
            return (
                <TreeView
                    key={node.id}
                    nodeLabel={labelAndButton}
                    defaultCollapsed={false}
                >
                    {renderTree(node.children, onSelectAccount)}
                </TreeView>
            );
        }

        return (
            <div key={node.id} style={{ marginLeft: '20px' }}>
                <span onClick={() => onSelectAccount(node.id)} style={{ cursor: 'pointer' }}>
                    {node.name}
                </span>
            </div>
        );
    });
};

const SidebarCuentasComponent = ({ onSelectAccount }) => {

    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate('');

    const handleAddCuenta = () => {
        navigate('/add-account');
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await PlanDeCuentasServicio.listarCuentas();
                const accounts = response.data;
                console.log(accounts);
                
                // Verifica si la respuesta es un array válido antes de procesar
                if (Array.isArray(accounts)) {
                    const transformedData = buildTree(accounts);
                    setTreeData(transformedData);
                    setError(''); // Borra cualquier error anterior
                } else {
                    // Maneja el caso en que la respuesta no es un array
                    setError('La respuesta del servidor no es un array de cuentas válido.');
                    setTreeData([]); // Establece el estado a un array vacío
                }

            } catch (err) {
                console.error("Error al obtener las cuentas: ", err);
                setError(err.response?.data?.message || 'Ocurrió un error al cargar el plan de cuentas. Por favor, recargue la página.');
            } finally {
                setLoading(false);
            }
        };
        fetchAccounts();
    }, []);
    
    if (loading) {
        return (
            <div className='rounded shadow p-3 bg-light d-flex justify-content-center align-items-center' style={{ padding: '20px', height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className='rounded shadow p-3 bg-light' style={{ padding: '20px', height: '100vh' }}>
            <h2>Plan de Cuentas</h2>
            
            {/* Pasa la prop onSelectAccount a la función renderTree */}
            {renderTree(treeData, onSelectAccount)}
            {error && <div className='alert alert-danger'>{error}</div>}
            <button
                className='btn btn-success mt-2 me-2'
                onClick={handleAddCuenta}
            >
                Agregar cuenta...
            </button>
        </div>
    );
};

export default SidebarCuentasComponent;