import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // 1. Importamos Axios
import { AuthLayout } from '../layouts/AuthLayout';
import { FloatingBubbles } from '../components/ui/FloatingBubbles';
import { InputField } from '../components/ui/InputField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import './RecuperarPassword.css';

export const RestablecerPassword = () => {
  const [passwords, setPasswords] = useState({ nueva: '', confirmar: '' });
  const [error, setError] = useState(''); // Estado para mostrar errores
  
  const navigate = useNavigate();
  const location = useLocation(); // 2. Usamos esto para recibir el correo de la pantalla anterior
  
  // 3. Extraemos el correo. Si alguien intenta entrar a /restablecer escribiendo la URL directo, 
  // no tendrá correo y lo regresaremos al Login por seguridad.
  const correoDocente = location.state?.correoValidado;
  
  // Pequeña validación de seguridad
  React.useEffect(() => {
    if (!correoDocente) {
      navigate('/');
    }
  }, [correoDocente, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 4. Validaciones locales
    if (passwords.nueva !== passwords.confirmar) {
      return setError('Las contraseñas no coinciden.');
    }
    if (passwords.nueva.length < 8) {
      return setError('La contraseña debe tener al menos 8 caracteres.');
    }

    try {
      // 5. Enviamos la petición PUT al Backend
      await axios.put('http://localhost:8080/api/usuarios/restablecer-password', {
        correo: correoDocente,
        nuevaPassword: passwords.nueva
      });

      // 6. Si todo sale bien, avisamos y regresamos al Login
      alert('¡Contraseña actualizada con éxito! Ahora puedes iniciar sesión.');
      navigate('/'); 
      
    } catch (err) {
      // Capturamos cualquier error del Backend
      setError(err.response?.data?.error || 'Hubo un error al actualizar la contraseña.');
    }
  };

  // Si no hay correo (está redirigiendo), no renderizamos nada para evitar parpadeos
  if (!correoDocente) return null;

  return (
    <AuthLayout>
      <FloatingBubbles />

      <div className="recuperar-container">
        <h2 className="recuperar-title">Nueva<br/>contraseña</h2>
        
        <div className="recuperar-card">
          <form onSubmit={handleSubmit} className="recuperar-form">
            
            {/* Mostramos errores si los hay */}
            {error && <p style={{ color: '#ff4d4f', textAlign: 'center', marginBottom: '10px', fontSize: '0.9rem' }}>{error}</p>}
            
            {/* Le recordamos al usuario para qué correo está cambiando la contraseña */}
            <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>
              Actualizando para: <b>{correoDocente}</b>
            </p>

            <InputField 
              label="Ingresa tu nueva contraseña"
              type="password"
              name="nueva"
              value={passwords.nueva}
              placeholder="Nueva contraseña (mínimo 8 caracteres)"
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

            <PrimaryButton type="submit" className="btn-recuperar" style={{ marginTop: '1rem' }}>
              Confirmar
            </PrimaryButton>

            <Link to="/" className="volver-link">
              Cancelar
            </Link>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};