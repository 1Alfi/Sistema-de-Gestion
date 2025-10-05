import React, { useState } from 'react';
import SidebarCuentasComponent from './SidebarCuentasComponent';
import SideBarComponent from './SideBarComponent';
import InfoCuentasComponent from './InfoCuentasComponent';

const PlanDeCuentasComponent = () => {
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  return (
    <div className='d-flex'>
        <SideBarComponent />
        <SidebarCuentasComponent onSelectAccount={setSelectedAccountId} />
        <InfoCuentasComponent id={selectedAccountId} />
    </div>
  );
};

export default PlanDeCuentasComponent;