import React, { useState } from 'react';
import './ModalConfirmarPassword.css';

export const ModalConfirmarPassword = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // SIMULACIÓN: Aquí luego harás la petición a Spring Boot para validar
    // Por ahora, si la contraseña es "1234" pasa, si no, tira el error rojo.
    if (password === '1234') {
      setError(false);
      setPassword(''); // Limpiamos para la próxima
      onConfirm();     // Ejecutamos la eliminación real
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setError(false);
    setPassword('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-password">
        
        <h3 className="password-modal-title">Confirmar eliminación</h3>
        <p className="password-modal-subtitle">Por favor, ingresa tu contraseña para confirmar esta acción.</p>

        <form onSubmit={handleSubmit}>
          <div className="password-input-group">
            <label>Contraseña*</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false); // Quita el error al empezar a escribir de nuevo
              }}
              placeholder="••••••••"
              required
            />
          </div>

          {/* MENSAJE DE ERROR DINÁMICO */}
          {error && (
            <div className="password-error-message">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>Contraseña incorrecta. Intenta nuevamente.</span>
            </div>
          )}

          <div className="password-modal-actions">
            <button type="button" className="btn-cancel-password" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-confirm-password">
              Confirmar<br/>eliminación
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};