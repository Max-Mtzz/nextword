import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { RecuperarPassword } from './pages/RecuperarPassword';
import { RestablecerPassword } from './pages/RestablecerPassword'; // Aquí importamos la nueva

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />
        <Route path="/restablecer" element={<RestablecerPassword />} /> {/* Aquí registramos la ruta */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;