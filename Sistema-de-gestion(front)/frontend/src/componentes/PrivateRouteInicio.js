import React from 'react';
import { Navigate } from 'react-router-dom';

//Recibe un componente como parámetro
const PrivateRoute = ({ children }) => {
  // Verificar si el token existe en el almacenamiento local
  const token = localStorage.getItem('token');

  // Si no hay token, redirigir al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/login" />; 
  }
  // Si el token existe, renderizar la ruta hija
  return children;
};

export default PrivateRoute;