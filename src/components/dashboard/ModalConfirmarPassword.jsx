import React, { useState, useEffect } from 'react';
import './ModalConfirmarPassword.css';

export const ModalConfirmarPassword = ({ isOpen, onClose, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // Limpiamos los campos cada vez que se abre/cierra el modal
  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Le pasamos la contraseña al Dashboard y esperamos...
      await onConfirm(password);
      // Si pasa a la siguiente línea, es que la contraseña fue correcta.
      setPassword(''); 
      setError(false);
    } catch (err) {
      // Si el Dashboard tira un error (contraseña incorrecta), encendemos el mensaje rojo
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