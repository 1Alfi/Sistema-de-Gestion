import React from 'react'

import { FaRegAddressBook } from 'react-icons/fa';
import { LuBookOpenCheck, LuNotebookTabs } from 'react-icons/lu';
import { MdAccountTree } from "react-icons/md";
import { TbMapDollar } from 'react-icons/tb';
import { getRoleFromToken } from '../utiles/authUtils';
import {useNavigate} from "react-router-dom";

const SideBarComponent = () => {

    const userRole = getRoleFromToken();

    return (
        <div className="d-flex flex-column flex-shrink-0 bg-secondary vh-100" style={{width: '4.5rem'}}>
            <a href="/" className="d-block p-3 link-dark text-decoration-none">
            </a>
            <ul className="nav nav-pills nav-flush flex-column mb-auto text-center">
                <li className="nav-item">
                    <a href="/plan-de-cuentas" className="nav-link link-light active py-3 border-bottom rounded-0" >
                        <MdAccountTree size={25}/>   
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-light py-3 border-bottom rounded-0" >
                        <LuBookOpenCheck size={25}/>
                    </a>
                </li>
                <li>
                    <a href="/libro-diario" className="nav-link link-light py-3 border-bottom rounded-0">
                        <LuNotebookTabs size={25}/>  {/*Esto lleva el libro diario*/}
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-light py-3 border-bottom rounded-0">
                        <TbMapDollar size={25}/>  {/*Esto lleva el libro mayor*/}
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
                        <a href="/usuarios" className="nav-link link-light py-3 border-bottom rounded-0" >
                            <FaRegAddressBook size={25} />{/* Esto tiene el acceso al listado de usuarios */}
                        </a>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default SideBarComponent
