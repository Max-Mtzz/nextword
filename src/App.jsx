import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { RecuperarPassword } from './pages/RecuperarPassword';
import { RestablecerPassword } from './pages/RestablecerPassword';
import { DashboardAdmin } from './pages/DashboardAdmin'; // ¡Aquí importamos la nueva pantalla!
import { DashboardMaestro } from './pages/DashboardMaestro';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />
        <Route path="/restablecer" element={<RestablecerPassword />} />
        
        {/* ¡Aquí le decimos a React que renderice el Dashboard en esta ruta! */}
        <Route path="/dashboard" element={<DashboardAdmin />} /> 
        <Route path="/dashboard-maestro" element={<DashboardMaestro />} />
      </Routes>
  );
}

export default App;