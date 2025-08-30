import logo from './logo.svg';
import './App.css';
import HeaderComponente from './componentes/HeaderComponente';
import FooterComponente from './componentes/FooterComponente';

import ListarUsuariosComponente from './componentes/ListarUsuariosComponente';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import AddUsuarioComponent from './componentes/AddUsuarioComponent';
import LoginFormComponent from './componentes/LoginFormComponent';
import InicioComponent from './componentes/InicioComponent';
import PrivateRoute from './componentes/PrivateRouteInicio';


function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponente />
        <Routes>
          <Route exact path='/' element={<LoginFormComponent />}></Route>
          <Route path='/login' element={<LoginFormComponent />}></Route>
          {/* <Route path='/inicio' element={<InicioComponent />}></Route> */}
          {/* <Route path='/usuarios' element={<ListarUsuariosComponente />}></Route> */}
          {/* <Route path='/add-usuario' element={<AddUsuarioComponent />}></Route> */}
          <Route
            path="/inicio"
            element={<PrivateRoute requiredRole="EMPLEADO"><InicioComponent /></PrivateRoute>}
          />
          <Route
            path="/usuarios"
            element={<PrivateRoute requiredRole="ADMINISTRADOR"><ListarUsuariosComponente /></PrivateRoute>}
          />
          <Route
            path="/add-usuario"
            element={<PrivateRoute requiredRole="ADMINISTRADOR"><AddUsuarioComponent /></PrivateRoute>}
          />
        </Routes>
      </BrowserRouter>
      <FooterComponente />
    </div>
  );
}

export default App;
