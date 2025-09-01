import React from 'react';
import SideBarComponent from './SideBarComponent';

const InicioComponent = () => {
  return (
    <div className='d-flex'>
      <SideBarComponent />
      {/* Aquí iría el resto del contenido de tu página */}
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Contenido Principal</h1>
        <p>Este es el contenido de la página, que se mostrará al lado de la barra lateral.</p>
      </div>
    </div>
  );
};

export default InicioComponent;