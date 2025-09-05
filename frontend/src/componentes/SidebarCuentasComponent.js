import React from 'react';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';

const initialData = [
    {
        name: 'Activo',
        children: [
            {
                name: 'Caja y Banco',
                children: [
                    { name: 'Caja' },
                    {
                        name: 'Banco',
                        children: [
                            { name: 'Banco c/c' },
                            { name: 'Banco p. fijo' }
                        ]
                    }
                ]
            },
            {
                name: 'Creditos',
                children: [
                    { name: 'Deudores por venta' },
                    { name: 'Documentos por cobrar' },
                    { name: 'Valores a depositar' }
                ]
            },
            {
                name: 'Bienes de cambio',
                children: [
                    { name: 'Mercaderias' }
                ]
            },
            {
                name: 'Bienes de uso',
                children: [
                    { name: 'Inmuebles' },
                    { name: 'Rodados' },
                    { name: 'Instalaciones' }
                ]
            },
        ]
    },
    { 
        name: 'Pasivo',
        children: [
            { 
                name: 'Deudas comerciales',
                children: [
                    { name: 'Proveedores'},
                    { name: 'Sueldos a pagar' }
                ]
            },
            {
                name: 'Deudas fiscales',
                children: [
                    { name: 'Impuestos a pagar'},
                    { name: 'Moratorias' }
                ]
            },
            { name: 'Prestamos bancarios'}
        ] 
    },
    { 
        name: 'Patrimonio',
        children: [
            { name: 'Capital' },
            { name: 'Resultados' }
        ]  
    },
    { 
        name: 'Ingresos' ,
        children: [
            { 
                name: 'Ventas',
                children: [
                    { name: 'Ventas'},
                ]
            },
            { name: 'Otros ingresos' },
            { name: 'Intereses ganados' }
        ] 
    },
    { 
        name: 'Egresos' ,
        children: [
            { name: 'Costo de mercaderias vendidas' },
            { name: 'Impuestos' },
            { name: 'Sueldos' },
            { name: 'Intereses' },
            { name: 'Alquileres' }
        ] 
    }
];

const renderTree = (data) => {
    return data.map((node, i) => {
        const isFolder = node.children && node.children.length > 0;

        // If the node has children, render it as a collapsible TreeView
        if (isFolder) {
            return (
                <TreeView
                    key={i}
                    nodeLabel={<span style={{ cursor: 'pointer' }}>{node.name}</span>}
                    defaultCollapsed={false} // You can change this to `true` to have them initially collapsed
                >
                    {renderTree(node.children)}
                </TreeView>
            );
        }

        // If the node has no children, render it as a simple list item
        return (
            <div key={i}>
                <span style={{ marginLeft: '20px' }}>{node.name}</span>
            </div>
        );
    });
};

const SidebarCuentasComponent = () => {
    return (
        <div className='rounded shadow p-3 bg-light' style={{ padding: '20px', height: '100vh' }}>
            <h2>Plan de Cuentas</h2>
            {renderTree(initialData)}
        </div>
    );
};

export default SidebarCuentasComponent;