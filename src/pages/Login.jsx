import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { FloatingBubbles } from '../components/ui/FloatingBubbles';
import { InputField } from '../components/ui/InputField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import './Login.css'; // Aquí ya solo dejas el CSS de .login-card y .login-title

export const Login = () => {
  const [formData, setFormData] = useState({ usuario: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos a enviar a Spring Boot:", formData);
    
    // Aquí irá tu lógica de conexión al backend en el futuro. Ejemplo:
    // try {
    //   const response = await loginService(formData);
    //   navigate('/dashboard-maestro');
    // } catch (error) { ... }
    
    navigate('/dashboard-maestro'); 
  };

  return (
    <AuthLayout>
      <FloatingBubbles />

      <div className="login-card">
        <h2 className="login-title">INICIA SESIÓN</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <InputField 
            label="Usuario"
            name="usuario"
            value={formData.usuario}
            placeholder="Ingresa tu usuario"
            onChange={handleInputChange}
          />
          
          <InputField 
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            placeholder="Ingresa tu contraseña"
            onChange={handleInputChange}
          />

          <Link to="/recuperar" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>

          <PrimaryButton type="submit">
            INICIAR SESIÓN
          </PrimaryButton>
        </form>
      </div>
    </AuthLayout>
  );
};