import logo from './logo.svg';
import './App.css';
import HeaderComponente from './componentes/HeaderComponente';
import FooterComponente from './componentes/FooterComponente';

import ListarUsuariosComponente from './componentes/ListarUsuariosComponente';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddUsuarioComponent from './componentes/AddUsuarioComponent';
import LoginFormComponent from './componentes/LoginFormComponent';
import InicioComponent from './componentes/InicioComponent';
import PrivateRoute from './componentes/PrivateRouteInicio';
import PlanDeCuentasComponent from './componentes/PlanDeCuentasComponent';


function App() {
  return (
    <div>
      <BrowserRouter>
      
        <HeaderComponente />
        <Routes>
          <Route exact path='/' element={<LoginFormComponent />}></Route>
          <Route path='/login' element={<LoginFormComponent />}></Route>
          <Route path='/plan-de-cuentas' element={<PlanDeCuentasComponent />}></Route>
            {/*<Route path='/inicio' element={<InicioComponent />}></Route>*/}
          {/* <Route path='/usuarios' element={<ListarUsuariosComponente />}></Route> */}
          {/* <Route path='/add-username' element={<AddUsuarioComponent />}></Route> */}
          <Route
            path="/inicio"
            element={<PrivateRoute requiredRole="USER"><InicioComponent /></PrivateRoute>}
          />
          <Route
            path="/usuarios"
            element={<PrivateRoute requiredRole="ADMIN"><ListarUsuariosComponente /></PrivateRoute>}
          />
          <Route
            path="/add-username"
            element={<PrivateRoute requiredRole="ADMIN"><AddUsuarioComponent /></PrivateRoute>}
          />
        </Routes>
      </BrowserRouter>
      <FooterComponente />
    </div>
  );
}

export default App;
