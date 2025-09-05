import React from 'react'
import SidebarCuentasComponent from './SidebarCuentasComponent'
import SideBarComponent from './SideBarComponent'

const PlanDeCuentasComponent = () => {
  return (
    <div className='d-flex'>
        <SideBarComponent />
        <SidebarCuentasComponent />
        <h1>Esto es todo lo del plan de cuentas</h1>
    </div>
  )
}

export default PlanDeCuentasComponent
