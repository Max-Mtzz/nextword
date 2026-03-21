import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 1. Importamos axios
import { AuthLayout } from '../layouts/AuthLayout';
import { FloatingBubbles } from '../components/ui/FloatingBubbles';
import { InputField } from '../components/ui/InputField';
import { PrimaryButton } from '../components/ui/PrimaryButton';
import './RecuperarPassword.css';

export const RecuperarPassword = () => {
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState(''); // 2. Estado para manejar errores (ej. correo no existe)
  const navigate = useNavigate();

  const handleSubmit = async (e) => { // 3. Volvemos la función asíncrona
    e.preventDefault();
    setError(''); // Limpiamos errores al intentar de nuevo

    try {
      // 4. Preguntamos al backend si el correo es válido y es de un docente
      await axios.post('http://localhost:8080/api/usuarios/validar-recuperacion', { correo });
      
      // 5. Si el backend responde OK, avanzamos a la siguiente pantalla
      // ¡OJO AQUÍ! Pasamos el correo en el 'state' para que la otra pantalla lo reciba
      navigate('/restablecer', { state: { correoValidado: correo } });
      
    } catch (err) {
      // 6. Si el backend rechaza la petición, capturamos el error que mandaste desde Spring Boot
      setError(err.response?.data?.error || 'Error al validar el correo');
    }
  };

  return (
    <AuthLayout>
      <FloatingBubbles />

      <div className="recuperar-container">
        <h2 className="recuperar-title">Recuperar<br/>contraseña</h2>
        
        <div className="recuperar-card">
          <form onSubmit={handleSubmit} className="recuperar-form">
            
            {/* 7. Mostramos el error en rojo si existe */}
            {error && <p style={{ color: '#ff4d4f', textAlign: 'center', marginBottom: '10px', fontSize: '0.9rem' }}>{error}</p>}

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
              El sistema validará tus credenciales para<br/>reestablecer su contraseña.
            </p>

            <PrimaryButton type="submit" className="btn-recuperar">
              Verificar
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