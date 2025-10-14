import React, { useEffect, useState } from 'react';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { useNavigate } from 'react-router-dom';
import { getRoleFromToken } from '../utiles/authUtils';
import RefreshService from '../servicios/RefreshService';

const buildTree = (accounts) => {
    const tree = [];
    const map = new Map();

    accounts.sort((a, b) => a.code.localeCompare(b.code));

    //Carga todo el map con todas las cuentas que recibimos del back
    accounts.forEach(account => {
    const node = {
        id: account.id,
        code: account.code,
        name: account.name,
        type: account.type,
        children: []
    };
    map.set(account.code, node);
});

    //A cada cuenta la enlaza con su respectivo padre y la almacena dentro de sus childrens
    accounts.forEach(account => {
        const numero = account.code;
        let parentNode = null;

        const parts = numero.split('.');    //Divide en partes codigo de la cuenta separadas por donde habia un "."
        
        let levelToZero = -1;   //Inicializo en -1 para corroborar que se haya encontrado un padre o en su defecto saber que es una raiz
        
        // Encuentra el indice de la ultima parte que es != de '00' y a ese indice lo setea en levelToZero
        for (let i = parts.length - 1; i >= 0; i--) {
            if (parts[i] !== '00' && i > 0) { 
                levelToZero = i;
                break;
            }
        }
        
        // Crea el código del padre si es que no es toda una secuencia de 00.00.00 y así
        if (levelToZero !== -1) { 
            const parentParts = [...parts];     //Setea las partes del padre, con las partes que se habían obtenido previamente
            
            parentParts[levelToZero] = '00';    //Cambia por 00 la parte que esta en el indice encontrado de levelToZero
            
            const parentBaseParts = parentParts.slice(0, levelToZero + 1);  //Corta la partes del padre desde el indice encontrado
            
            let parentCode = parentBaseParts.join('.');     //Junta las partes con un "." de por medio
            
            //Si encuentra al padre lo setea en parentNode
            if (map.has(parentCode)) {
                parentNode = map.get(parentCode);
            } 
            
            //Si no encotro el padre y el codigo sigue teniendo mas de una parte, acorta aun mas las partes para ver si ahi si es el padre
            if (!parentNode && parentBaseParts.length > 1) {
                const shorterParentCode = parentBaseParts.slice(0, parentBaseParts.length - 1).join('.');
                //Si lo es lo setea en parentNode
                if (map.has(shorterParentCode)) {
                    parentNode = map.get(shorterParentCode);
                }
            }
            //Verifica que no sea una cuenta raiz
            if (levelToZero > 0) {
                const strictParentParts = [...parts]; 
                strictParentParts[levelToZero] = '00';  //Cambia la parte significativa para que sea 00
                //Cambio a 00 a todas las partes desde levelToZero en adelante por si existe alguna parte posterior y es != de 00
                for(let i = levelToZero + 1; i < strictParentParts.length; i++) {
                    strictParentParts[i] = '00';
                }
                const strictParentCode = strictParentParts.join('.');   //Y hago el join con los "." de por medio

                if (map.has(strictParentCode)) {
                    parentNode = map.get(strictParentCode);
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
        const isControlAccount = node.type === 'Control';
        
        const labelContent = (
            <span 
                onClick={() => onSelectAccount(node.id)} 
                style={{ cursor: 'pointer' }}
            >
                {node.name} {/* <--- MODIFICADO: Solo se muestra node.name */}
            </span>
        );
        
        if (!isControlAccount) {
            return (
                <div 
                    key={node.id} 
                    style={{ marginLeft: '16px' }} // Indenta manualmente (ajusta si es necesario)
                >
                    {labelContent}
                </div>
            );
        }

        const hasChildrenToRender = node.children && node.children.length > 0;
        
        return (
            <TreeView
                key={node.id}
                nodeLabel={labelContent}
                defaultCollapsed={true} 
            >
                {/* Renderiza recursivamente SOLO si es de Control Y tiene hijos */}
                {isControlAccount && hasChildrenToRender && renderTree(node.children, onSelectAccount)}
            </TreeView>
        );
    });
};

const SidebarCuentasComponent = ({ onSelectAccount }) => {

    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate('');

    const userRole = getRoleFromToken();
    const isAdmin = userRole === 'ADMIN';

    const handleAddCuenta = () => {
        navigate('/add-account');
    };

    const fetchAccounts = async () => {
        setLoading(true); // Iniciar la carga
        try {
            const response = await PlanDeCuentasServicio.listarCuentas();
            const accounts = response.data;
            
            if (Array.isArray(accounts)) {
                const transformedData = buildTree(accounts);
                setTreeData(transformedData);
                setError('');
            } else {
                setError('La respuesta del servidor no es un array de cuentas válido.');
                setTreeData([]);
            }
        } catch (err) {
            console.error("Error al obtener las cuentas: ", err);
            setError(err.response?.data?.message || 'Ocurrió un error al cargar el plan de cuentas.');
        } finally {
            setLoading(false);
        }
    };
    
    // 2. Uso de useEffect: Se ejecuta solo en el montaje
    useEffect(() => {
        fetchAccounts();

        const unsubscribe = RefreshService.subscribe(() => {
            // Cuando InfoCuentasComponent llama a triggerRefresh, esta función se ejecuta.
            console.log("Señal de refresco recibida. Recargando cuentas...");
            fetchAccounts(); 
        });

        return () => {
            unsubscribe();
        };
    }, []);

    // 3. Renderizado Condicional: Muestra el spinner si está cargando
    if (loading) {
        return (
            <div className='rounded shadow p-3 bg-light d-flex justify-content-center align-items-center' style={{ padding: '20px', height: '100vh' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }
    
    // Renderizado principal (solo si loading es false)
    return (
        <div className='rounded shadow p-3 bg-light' style={{ padding: '20px', height: '100vh' }}>
            <h2>Plan de Cuentas</h2>
            
            {/* Si no está cargando, muestra el árbol */}
            {renderTree(treeData, onSelectAccount)}
            {error && <div className='alert alert-danger'>{error}</div>}
            
            {isAdmin && (
                <button
                    className='btn btn-success mt-2 me-2'
                    onClick={handleAddCuenta}
                >
                    Agregar cuenta...
                </button>
            )}
        </div>
    );
};

export default SidebarCuentasComponent;