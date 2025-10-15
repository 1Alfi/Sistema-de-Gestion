import React from 'react';
import SideBarComponent from './SideBarComponent';
import { FaFileInvoiceDollar, FaChartLine, FaDollarSign, FaBolt, FaPlusCircle, FaListAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const InicioComponent = () => {
    
    // --- ESTILOS BASADOS EN LA LANDING PAGE ---
    const styles = {
        // Estilo para el fondo del panel de bienvenida (similar al Hero Section)
        welcomePanel: {
            background: 'linear-gradient(135deg, #F5E6E8 0%, #E8F4F8 100%)',
            borderRadius: '20px',
            padding: '40px',
            marginBottom: '30px',
            color: '#2C3E50',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        },
        kpiCard: {
            background: '#FFFFFF',
            borderRadius: '15px',
            padding: '25px',
            height: '100%',
            border: '1px solid #F0F0F0',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'pointer'
        },
        iconWrapper: {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            // Usamos colores de acento sutiles
            background: '#E8F4F8', 
        },
        primaryColor: '#A8DADC', // Tu color de acento
        secondaryText: '#5A6C7D', // Tu color de texto secundario
        buttonPrimary: {
            background: '#A8DADC',
            color: '#2C3E50',
            borderRadius: '15px', 
            padding: '12px 20px',
            fontWeight: '600',
            border: 'none',
        }
    };
    
    // --- Simulación de datos (Reemplazar con lógica de fetch real) ---
    const kpis = [
        { title: "Activos Totales", value: "350.500,00", icon: FaChartLine, color: '#A8DADC' },
        { title: "Pasivos Totales", value: "120.000,00", icon: FaFileInvoiceDollar, color: '#FF9999' },
        { title: "Resultado del Mes", value: "5.200,00", icon: FaDollarSign, color: '#28a745' },
        { title: "Alertas Activas", value: "3", icon: FaBolt, color: '#ffc107' },
    ];


    return (
        <div className='d-flex'>
            <SideBarComponent />
            
            {/* Contenido Principal con el padding inferior para el footer fijo */}
            <div style={{ flexGrow: 1, padding: '30px', paddingBottom: '80px' }}> 
                
                {/* 1. Panel de Bienvenida */}
                <div style={styles.welcomePanel}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                        ¡Bienvenido a ContaConmigo!
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: styles.secondaryText, maxWidth: '800px' }}>
                        Tu solución integral para una contabilidad simple y precisa. Revisa los indicadores clave y accede rápidamente a tus tareas pendientes.
                    </p>
                    <div className="mt-3">
                         <span className="badge bg-info text-dark" style={{background: styles.primaryColor}}>Novedad: Nuevo sistema de exportación de reportes disponible.</span>
                    </div>
                </div>

                {/* 2. Indicadores Clave (KPIs) */}
                <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#2C3E50', marginBottom: '1.5rem' }}>
                    Resumen del Período
                </h2>
                
                <div className="row g-4 mb-5">
                    {kpis.map((kpi, index) => (
                        <div className="col-lg-3 col-md-6" key={index}>
                            <div 
                                style={styles.kpiCard}
                                className="shadow-sm" // Sombra sutil de Bootstrap
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 3px 10px rgba(0,0,0,0.05)'}
                            >
                                <div style={{ ...styles.iconWrapper, background: kpi.color + '20' }}>
                                    <kpi.icon size={24} style={{ color: kpi.color }} />
                                </div>
                                <h4 style={{ color: styles.secondaryText, fontSize: '1rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                                    {kpi.title}
                                </h4>
                                <p style={{ fontSize: '1.8rem', fontWeight: '700', color: '#2C3E50', margin: 0 }}>
                                    $ {kpi.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* 3. Accesos Rápidos */}
                <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#2C3E50', marginBottom: '1.5rem' }}>
                    Acciones Rápidas
                </h2>
                
                <div className="d-flex flex-wrap gap-3">
                    <Link to="/asientos" style={{ textDecoration: 'none' }}>
                         <button style={styles.buttonPrimary} className='btn btn-lg'>
                            <FaPlusCircle className="me-2" /> Registrar Nuevo Asiento
                        </button>
                    </Link>
                    
                    <Link to="/plan-de-cuentas" style={{ textDecoration: 'none' }}>
                         <button style={{...styles.buttonPrimary, background: '#F0F0F0', color: '#2C3E50'}} className='btn btn-lg'>
                            <FaListAlt className="me-2" /> Ver Plan de Cuentas
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default InicioComponent;