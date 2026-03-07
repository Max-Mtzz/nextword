import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import '../components/FloatingBubbles.css'; 
import './RecuperarPassword.css'; // ¡Reutilizamos el CSS porque el diseño es igual!

export const RestablecerPassword = () => {
  const [passwords, setPasswords] = useState({ nueva: '', confirmar: '' });
  const navigate = useNavigate(); // Hook para navegar después de confirmar

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevas contraseñas:", passwords);
    // Cuando le dé a confirmar, lo regresamos al Login
    navigate('/');
  };

  return (
    <AuthLayout>
      {/* Burbujas flotantes */}
      <div className="floating-bubble bubble-1">Hi</div>
      <div className="floating-bubble bubble-2">Olá</div>
      <div className="floating-bubble bubble-3">안녕하세요</div>
      <div className="floating-bubble bubble-4">你好</div>
      <div className="floating-bubble bubble-5">Hola</div>
      <div className="floating-bubble bubble-6">こんにちは</div>

      <div className="recuperar-container">
        <h2 className="recuperar-title">Recuperar<br/>contraseña</h2>
        
        <div className="recuperar-card">
          <form onSubmit={handleSubmit} className="recuperar-form">
            
            <div className="input-group">
              <label>Ingresa tu nueva contraseña</label>
              <input 
                type="password" 
                placeholder="Ingresa tu nueva contraseña" 
                onChange={(e) => setPasswords({...passwords, nueva: e.target.value})}
                required
              />
            </div>

            <div className="input-group">
              <label>Confirma tu contraseña</label>
              <input 
                type="password" 
                placeholder="Confirma tu contraseña" 
                onChange={(e) => setPasswords({...passwords, confirmar: e.target.value})}
                required
              />
            </div>

            <button type="submit" className="recuperar-button" style={{ marginTop: '1rem' }}>
              Confirmar
            </button>

            <Link to="/" className="volver-link">
              Volver al inicio de sesión
            </Link>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};