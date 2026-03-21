import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Importamos axios
import { AuthLayout } from '../layouts/AuthLayout';
import { FloatingBubbles } from '../components/ui/FloatingBubbles';
import { InputField } from '../components/ui/InputField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import './Login.css';

export const Login = () => {
  // Cambiamos 'usuario' por 'email' para que coincida con el backend
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpiamos errores previos

    try {
      // 2. Hacemos la petición POST al backend
      const response = await axios.post('http://localhost:8080/api/usuarios/login', formData);
      
      // 3. Extraemos la información que nos responde Spring Boot
      const { token, rol, email, id } = response.data;

      // 4. Guardamos el token y los datos del usuario en el navegador
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify({ email, rol, id }));

      // 5. Redirección condicional basada en el ROL
      // (Convertimos a minúsculas por si desde la BD viene como 'ADMIN' o 'admin')
      if (rol.toLowerCase() === 'admin') {
        navigate('/dashboard'); // Dashboard del Administrador
      } else {
        navigate('/dashboard-maestro'); // Dashboard del Docente/Alumno
      }

    } catch (err) {
      console.error("Error en el login:", err);
      // Si el backend responde con error (ej. 400 o 403), mostramos el mensaje
      setError('Correo o contraseña incorrectos. Intenta de nuevo.');
    }
  };

  return (
    <AuthLayout>
      <FloatingBubbles />

      <div className="login-card">
        <h2 className="login-title">INICIA SESIÓN</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          {/* Mostramos el error si existe */}
          {error && <p style={{ color: '#ff4d4f', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}

          <InputField 
            label="Correo Electrónico"
            name="email" // Cambiado a email
            type="email" // Para que valide que es un formato de correo
            value={formData.email}
            placeholder="Ingresa tu correo"
            onChange={handleInputChange}
            required
          />
          
          <InputField 
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            placeholder="Ingresa tu contraseña"
            onChange={handleInputChange}
            required
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