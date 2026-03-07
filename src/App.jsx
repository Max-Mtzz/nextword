import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { RecuperarPassword } from './pages/RecuperarPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* La ruta principal "/" mostrará el Login */}
        <Route path="/" element={<Login />} />
        
        {/* La ruta "/recuperar" mostrará tu nueva pantalla */}
        <Route path="/recuperar" element={<RecuperarPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;