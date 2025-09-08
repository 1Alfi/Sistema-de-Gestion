import React from 'react'
import SidebarCuentasComponent from './SidebarCuentasComponent'
import SideBarComponent from './SideBarComponent'
import InfoCuentasComponent from './InfoCuentasComponent'

const PlanDeCuentasComponent = () => {
  return (
    <div className='d-flex'>
        <SideBarComponent />
        <SidebarCuentasComponent />
        <InfoCuentasComponent />
    </div>
  )
}

export default PlanDeCuentasComponent
