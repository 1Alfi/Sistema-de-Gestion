import logo from './logo.svg';
import './App.css';
import HeaderComponente from './componentes/HeaderComponente';
import FooterComponente from './componentes/FooterComponente';

import ListarUsuariosComponente from './componentes/ListarUsuariosComponente';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponente />
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<ListarUsuariosComponente />}></Route>
            <Route path='/usuarios' element={<ListarUsuariosComponente />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <FooterComponente />
    </div>
  );
}

export default App;
