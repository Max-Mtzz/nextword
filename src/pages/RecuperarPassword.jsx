import React, { useState } from 'react';
import { AuthLayout } from '../layouts/AuthLayout';
import '../components/FloatingBubbles.css'; 
import './RecuperarPassword.css';
import { Link } from 'react-router-dom';

export const RecuperarPassword = () => {
  const [correo, setCorreo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Se enviará la recuperación a:", correo);
  };

  return (
    <AuthLayout>
      {/* Las mismas burbujas flotantes de tu diseño */}
      <div className="floating-bubble bubble-1">Hi</div>
      <div className="floating-bubble bubble-2">Olá</div>
      <div className="floating-bubble bubble-3">안녕하세요</div>
      <div className="floating-bubble bubble-4">你好</div>
      <div className="floating-bubble bubble-5">Hola</div>
      <div className="floating-bubble bubble-6">こんにちは</div>

      {/* Contenedor que agrupa el título y la tarjeta para mantener todo centrado */}
      <div className="recuperar-container">
        
        <h2 className="recuperar-title">Recuperar<br/>contraseña</h2>
        
        <div className="recuperar-card">
          <form onSubmit={handleSubmit} className="recuperar-form">
            <div className="input-group">
              <label>Correo electrónico</label>
              <input 
                type="email" 
                placeholder="Ingresa tu correo" 
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <p className="instrucciones-texto">
              El sistema validara tus credenciales para<br/>reestablecer su contraseña.
            </p>

            <button type="submit" className="recuperar-button">
              Recuperar
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