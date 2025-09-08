import React, { useEffect, useState } from 'react';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';
import PlanDeCuentasServicio from '../servicios/PlanDeCuentasServicio';
import { IoMdAddCircle } from "react-icons/io";

// const initialData = [
//     {
//         name: 'Activo',
//         children: [
//             {
//                 name: 'Caja y Banco',
//                 children: [
//                     { name: 'Caja' },
//                     {
//                         name: 'Banco',
//                         children: [
//                             { name: 'Banco c/c' },
//                             { name: 'Banco p. fijo' }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 name: 'Creditos',
//                 children: [
//                     { name: 'Deudores por venta' },
//                     { name: 'Documentos por cobrar' },
//                     { name: 'Valores a depositar' }
//                 ]
//             },
//             {
//                 name: 'Bienes de cambio',
//                 children: [
//                     { name: 'Mercaderias' }
//                 ]
//             },
//             {
//                 name: 'Bienes de uso',
//                 children: [
//                     { name: 'Inmuebles' },
//                     { name: 'Rodados' },
//                     { name: 'Instalaciones' }
//                 ]
//             },
//         ]
//     },
//     { 
//         name: 'Pasivo',
//         children: [
//             { 
//                 name: 'Deudas comerciales',
//                 children: [
//                     { name: 'Proveedores'},
//                     { name: 'Sueldos a pagar' }
//                 ]
//             },
//             {
//                 name: 'Deudas fiscales',
//                 children: [
//                     { name: 'Impuestos a pagar'},
//                     { name: 'Moratorias' }
//                 ]
//             },
//             { name: 'Prestamos bancarios'}
//         ] 
//     },
//     { 
//         name: 'Patrimonio',
//         children: [
//             { name: 'Capital' },
//             { name: 'Resultados' }
//         ]  
//     },
//     { 
//         name: 'Ingresos' ,
//         children: [
//             { 
//                 name: 'Ventas',
//                 children: [
//                     { name: 'Ventas'},
//                 ]
//             },
//             { name: 'Otros ingresos' },
//             { name: 'Intereses ganados' }
//         ] 
//     },
//     { 
//         name: 'Egresos' ,
//         children: [
//             { name: 'Costo de mercaderias vendidas' },
//             { name: 'Impuestos' },
//             { name: 'Sueldos' },
//             { name: 'Intereses' },
//             { name: 'Alquileres' }
//         ] 
//     }
// ];

// const renderTree = (data) => {
//     return data.map((node, i) => {
//         const isFolder = node.children && node.children.length > 0;

//         // If the node has children, render it as a collapsible TreeView
//         if (isFolder) {
//             return (
//                 <TreeView
//                     key={i}
//                     nodeLabel={<span style={{ cursor: 'pointer' }}>{node.name}</span>}
//                     defaultCollapsed={false} // You can change this to `true` to have them initially collapsed
//                 >
//                     {renderTree(node.children)}
//                 </TreeView>
//             );
//         }

//         // If the node has no children, render it as a simple list item
//         return (
//             <div key={i}>
//                 <span style={{ marginLeft: '20px' }}>{node.name}</span>
//             </div>
//         );
//     });
// };

const buildTree = (accounts) => {
    const tree = [];
    const map = new Map();

    // El orden es crucial para esta lógica
    accounts.sort((a, b) => a.numeroCuenta.localeCompare(b.numeroCuenta));

    // Primera pasada: crear un mapa de nodos para un acceso rápido
    accounts.forEach(account => {
        const node = {
            name: account.nombre,
            id: account.numeroCuenta,
            children: []
        };
        map.set(account.numeroCuenta, node);
    });

    // Segunda pasada: construir la jerarquía usando la lógica de prefijos
    accounts.forEach(account => {
        const numero = account.numeroCuenta;
        let parentNode = null;

        // Encuentra el padre más cercano por prefijo
        for (let i = numero.length - 1; i > 0; i--) {
            //Recorre de atras para adelante
            if (numero[i] !== '0') {
                //Si el numero en esa posición es != de 0 entonces, armo el numero de cuenta del padre, 
                // para lo que agarro el numero hasta esa posición  y le agrego ceros al final por la cantidad de digitos de la 
                // cadena menos la posicion en la que se encontro al digito != 0
                const parentNumero = numero.substring(0, i) + '0'.repeat(numero.length - i);
                if (map.has(parentNumero)) {
                    parentNode = map.get(parentNumero); // Setea como nodo padre al numero obtenido y almacenado en parentNumero
                    break;
                }
            }
        }

        if (parentNode) {
            parentNode.children.push(map.get(account.numeroCuenta));
        } else {
            // Si no se encuentra un padre, es un nodo raíz
            tree.push(map.get(account.numeroCuenta));
        }
    });

    return tree;
};

const renderTree = (data) => {
    return data.map((node) => {
        const isFolder = node.children && node.children.length > 0;
        
        if (isFolder) {
            return (
                <div>
                    <TreeView
                        key={node.id}
                        nodeLabel={<span style={{ cursor: 'pointer' }}>{node.name}</span>}
                        defaultCollapsed={false}
                    >
                        {renderTree(node.children)}
                    </TreeView>
                    <button className='btn'><IoMdAddCircle size={18} color='00FF0F'/>Agregar</button>
                </div>
            );
        }

        return (
            <div key={node.id}>
                <span style={{ marginLeft: '20px' }}>{node.name}</span>
            </div>
        );
    });
};

const SidebarCuentasComponent = () => {

    // const [cuentas, setCuentas] = useState([]);

    // useEffect(() => {
    //     PlanDeCuentasServicio.listaCuentas().then((response) => {
    //         setCuentas(response.data);
    //         console.log(response.data);
    //     }).catch(error => {
    //         console.log(error);
    //     })
    // }, [])

    // return (
    //     <div className='rounded shadow p-3 bg-light' style={{ padding: '20px', height: '100vh' }}>
    //         <h2>Plan de Cuentas</h2>
    //         {renderTree(initialData)}
    //     </div>
    // );

    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                // Hace el get con toda la lista de cuentas tanto padre como hijas
                const response = await PlanDeCuentasServicio.listaCuentas();
                
                const accounts = response.data;
                
                // Arma el arbol con la función buildTree y se cargue en el treeData
                const transformedData = buildTree(accounts);
                setTreeData(transformedData);

            } catch (err) {
                console.error("Error al obtener las cuentas: ", err);
                if (err.response && err.response.data && err.response.data.message) {
                    // Si el error viene del back
                    setError(err.response.data.message);
                } else {
                    // Si es un error genérico
                    setError(<>Ocurrió un error al cargar el plan de cuentas.<br /> Por favor, recargue la pagina.</>);
                }
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
                
                {renderTree(treeData)}
                {error && <div className='alert alert-danger'>{error}</div>}
            </div>
        );

};

export default SidebarCuentasComponent;