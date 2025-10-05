import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { FaRegAddressBook } from 'react-icons/fa';
import { LuBookOpenCheck, LuNotebookTabs } from 'react-icons/lu';
import { MdAccountTree } from "react-icons/md";
import { TbMapDollar } from 'react-icons/tb';
import { getRoleFromToken } from '../utiles/authUtils';

const SideBarComponent = () => {

    const userRole = getRoleFromToken();
    const location = useLocation(); // Obtiene la ubicación actual

    return (
        <div className="d-flex flex-column flex-shrink-0 bg-secondary vh-100" style={{ width: '4.5rem' }}>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li className="nav-item">
                    <Link 
                        to="/inicio"
                        className={`nav-link link-light py-3 border-bottom rounded-0 ${location.pathname === '/inicio' ? 'active' : ''}`}
                    >
                        <IoHomeOutline size={25} color='white'/>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        to="/plan-de-cuentas"
                        className={`nav-link link-light py-3 border-bottom rounded-0 ${location.pathname === '/plan-de-cuentas' ? 'active' : ''}`}
                    >
                        <MdAccountTree size={25} />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/asientos"
                        className={`nav-link link-light py-3 border-bottom rounded-0 ${location.pathname === '/asientos' ? 'active' : ''}`}
                    >
                        <LuBookOpenCheck size={25} />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/libro-diario"
                        className={`nav-link link-light py-3 border-bottom rounded-0 ${location.pathname === '/libro-diario' ? 'active' : ''}`}
                    >
                        <LuNotebookTabs size={25} />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/libro-mayor" // Cambié 'href="#"' por 'to="/libro-mayor"'
                        className={`nav-link link-light py-3 border-bottom rounded-0 ${location.pathname === '/libro-mayor' ? 'active' : ''}`}
                    >
                        <TbMapDollar size={25} />
                    </Link>
                </li>
                {userRole === 'ADMIN' && (
                    <li>
                        <Link
                            to="/usuarios"
                            className={`nav-link link-light py-3 border-bottom rounded-0 ${location.pathname === '/usuarios' ? 'active' : ''}`}
                        >
                            <FaRegAddressBook size={25} />
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default SideBarComponent;