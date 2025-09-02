import React from 'react'
import { GiExitDoor } from "react-icons/gi";
import { useLocation } from 'react-router-dom';

const HeaderComponente = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
          <div className='d-flex justify-content-between w-100'>
            <a href='/inicio' className='navbar-brand'>ContaConmigo</a>
            {/* Conditional Rendering: Only show the logout icon if it's not the login page */}
            {!isLoginPage && (
              <a 
                href='/login' 
                className='nav-link link-light me-4' 
                onClick={() => localStorage.removeItem('token')}
              >
                <GiExitDoor size={30} />
              </a>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponente;