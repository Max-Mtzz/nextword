import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { FloatingBubbles } from '../components/ui/FloatingBubbles';
import { InputField } from '../components/ui/InputField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import './RecuperarPassword.css';

export const RecuperarPassword = () => {
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Se enviará la recuperación a:", correo);
    navigate('/restablecer');
  };

  return (
    <AuthLayout>
      <FloatingBubbles />

      <div className="recuperar-container">
        <h2 className="recuperar-title">Recuperar<br/>contraseña</h2>
        
        <div className="recuperar-card">
          <form onSubmit={handleSubmit} className="recuperar-form">
            <InputField 
              label="Correo electrónico"
              type="email"
              name="correo"
              value={correo}
              placeholder="Ingresa tu correo"
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <p className="instrucciones-texto">
              El sistema validara tus credenciales para<br/>reestablecer su contraseña.
            </p>

            <PrimaryButton type="submit" className="btn-recuperar">
              Recuperar
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