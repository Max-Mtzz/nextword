import React, { useState } from 'react';
import { AuthLayout } from '../layouts/AuthLayout';
import '../components/FloatingBubbles.css'; 
import './Login.css'; // ¡Importamos el nuevo CSS!
import { Link , useNavigate} from 'react-router-dom';

export const Login = () => {
  const [formData, setFormData] = useState({ usuario: '', password: '' });
  const navigate = useNavigate(); // Inicializamos el hook aquí

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos a enviar:", formData);
    // ¡Aquí hacemos la magia de enviarte al dashboard!
    navigate('/dashboard-maestro'); 
  };

  return (
    <AuthLayout>
      {/* Burbujas flotantes con los idiomas de tu diseño */}
      <div className="floating-bubble bubble-1">Hi</div>
      <div className="floating-bubble bubble-2">Olá</div>
      <div className="floating-bubble bubble-3">안녕하세요</div>
      <div className="floating-bubble bubble-4">你好</div>
      <div className="floating-bubble bubble-5">Hola</div>
      <div className="floating-bubble bubble-6">こんにちは</div>

      {/* Tarjeta de Login ya con sus clases correctas */}
      <div className="login-card">
        <h2 className="login-title">INICIA SESIÓN</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Usuario</label>
            <input 
              type="text" 
              name="usuario"
              placeholder="Ingresa tu usuario" 
              onChange={handleInputChange}
            />
          </div>
          
          <div className="input-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              name="password"
              placeholder="Ingresa tu contraseña" 
              onChange={handleInputChange}
            />
          </div>

          <Link to="/recuperar" className="forgot-password">
        ¿Olvidaste tu contraseña?
        </Link>

          <button type="submit" className="login-button">
            INICIAR SESIÓN
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};