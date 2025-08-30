import React from 'react'

import { FaRegAddressBook } from 'react-icons/fa';
import { LuBookOpenCheck, LuNotebookTabs } from 'react-icons/lu';
import { MdAccountTree } from "react-icons/md";
import { TbMapDollar } from 'react-icons/tb';
import { getRoleFromToken } from '../utiles/authUtils';

const SideBarComponent = () => {

    const userRole = getRoleFromTokenleFromToken();

    return (
        <div className="d-flex flex-column flex-shrink-0 bg-dark vh-100" style={{width: '4.5rem'}}>
            <a href="/" className="d-block p-3 link-dark text-decoration-none" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
            </a>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li className="nav-item">
                    <a href="#" className="nav-link active py-3 border-bottom rounded-0" >
                        <MdAccountTree />   {/*Esto lleva el plan de cuentas*/}
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="asientos" data-bs-original-title="asientos">
                        <LuBookOpenCheck />
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="libro-diario" data-bs-original-title="libro-diario">
                        <LuNotebookTabs />  {/*Esto lleva el libro diario*/}
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="libro-mayor" data-bs-original-title="libro-mayor">
                        <TbMapDollar />  {/*Esto lleva el libro mayor*/}
                    </a>
                </li>
                {/* 
                <li>
                    <a href="#" className="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="listado-de-usuarios" data-bs-original-title="listado-de-usuarios">
                        <FaRegAddressBook />
                    </a>
                </li> 
                */}
                {userRole === 'ADMIN' && (
                    <li>
                        <a href="#" className="nav-link py-3 border-bottom rounded-0" data-bs-toggle="tooltip" data-bs-placement="right" aria-label="listado-de-usuarios" data-bs-original-title="listado-de-usuarios">
                            <FaRegAddressBook />    {/* Esto tiene el acceso al listado de usuarios */}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SideBarComponent
