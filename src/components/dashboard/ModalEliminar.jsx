import React, { useState } from 'react';
import alertaIcon from '../../assets/alerta.svg';

export const ModalEliminar = ({ isOpen, onClose, onConfirm, itemName }) => {
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Simulación: Validar contraseña. Luego será contra Spring Boot.
    if (password === '1234') {
      onConfirm();
      setStep(1); // Reiniciar estado
      setPassword('');
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    setStep(1);
    setPassword('');
    setError(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-delete-content">
        {step === 1 && (
          <>
            <img src={alertaIcon} alt="Alerta" className="alert-icon" />
            <h3 className="delete-title">Eliminar registro</h3>
            <p className="delete-subtitle">¿Estás seguro de que deseas eliminar: {itemName}?<br />Esta acción no se puede deshacer.</p>
            <div className="modal-buttons">
              <button className="btn-cancel-delete" onClick={handleClose}>Cancelar</button>
              <button className="btn-confirm-red" onClick={() => setStep(2)}>Eliminar</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="delete-title">Confirmar eliminación</h3>
            <p className="delete-subtitle">Por favor, ingresa tu contraseña para confirmar esta acción.</p>
            
            <div className="password-group">
              <label>Contraseña*</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="........" 
                value={password} 
                onChange={(e) => { setPassword(e.target.value); setError(false); }} 
              />
              {error && (
                <div className="error-msg-box">
                  <img src={alertaIcon} alt="Error" /> Contraseña incorrecta. Intenta nuevamente.
                </div>
              )}
            </div>

            <div className="modal-buttons" style={{ marginTop: '2rem' }}>
              <button className="btn-cancel-delete" onClick={handleClose}>Cancelar</button>
              <button className="btn-confirm-red" onClick={handleConfirm}>Confirmar<br/>eliminación</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};