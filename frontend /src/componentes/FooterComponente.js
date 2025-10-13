import React from 'react';

const FooterComponente = () => {
    return (
        <footer style={{
            position: 'fixed',
            bottom: 0,
            width: '100%',
            backgroundColor: '#000000ff', // Un color de fondo para que sea visible
            padding: '10px 0',
            textAlign: 'center',
            boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)' // Una sombra para un mejor efecto visual
        }}>
            <div className="container">
                <span className="text-muted">© 2025 Desarrollado por Nicolás Alfaro y Mirko Sandrk.</span>
            </div>
        </footer>
    );
}

export default FooterComponente;