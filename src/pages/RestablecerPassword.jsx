import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { FloatingBubbles } from '../components/ui/FloatingBubbles';
import { InputField } from '../components/ui/InputField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import './RecuperarPassword.css'; // Reutilizamos el mismo CSS

export const RestablecerPassword = () => {
  const [passwords, setPasswords] = useState({ nueva: '', confirmar: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nuevas contraseñas:", passwords);
    // Cuando le dé a confirmar, lo regresamos al Login
    navigate('/');
  };

  return (
    <AuthLayout>
      <FloatingBubbles />

      <div className="recuperar-container">
        <h2 className="recuperar-title">Recuperar<br/>contraseña</h2>
        
        <div className="recuperar-card">
          <form onSubmit={handleSubmit} className="recuperar-form">
            
            <InputField 
              label="Ingresa tu nueva contraseña"
              type="password"
              name="nueva"
              value={passwords.nueva}
              placeholder="Ingresa tu nueva contraseña"
              onChange={(e) => setPasswords({...passwords, nueva: e.target.value})}
              required
            />

            <InputField 
              label="Confirma tu contraseña"
              type="password"
              name="confirmar"
              value={passwords.confirmar}
              placeholder="Confirma tu contraseña"
              onChange={(e) => setPasswords({...passwords, confirmar: e.target.value})}
              required
            />

            {/* Agregamos un poco de margen superior usando un estilo en línea rápido */}
            <PrimaryButton type="submit" className="btn-recuperar" style={{ marginTop: '1rem' }}>
              Confirmar
            </PrimaryButton>

            <Link to="/" className="volver-link">
              Volver al inicio de sesión
            </Link>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};