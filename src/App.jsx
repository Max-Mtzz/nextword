import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { RecuperarPassword } from './pages/RecuperarPassword';
import { RestablecerPassword } from './pages/RestablecerPassword';
import { DashboardAdmin } from './pages/DashboardAdmin'; // ¡Aquí importamos la nueva pantalla!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />
        <Route path="/restablecer" element={<RestablecerPassword />} />
        
        {/* ¡Aquí le decimos a React que renderice el Dashboard en esta ruta! */}
        <Route path="/dashboard" element={<DashboardAdmin />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;