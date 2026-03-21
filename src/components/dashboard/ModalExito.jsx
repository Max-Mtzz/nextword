import React from 'react';
import './ModalExito.css';
import successIcon from '../../assets/SuccessCheckCircle.svg';

// Cambiamos userName por mensaje para que sea 100% reutilizable
export const ModalExito = ({ isOpen, onClose, mensaje }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-success">
        
        <div className="success-icon-wrapper">
          <img src={successIcon} alt="Éxito" style={{ width: '48px', height: '48px' }} />
        </div>

        <h3 className="success-title">¡Se concretó con éxito!</h3>
        
        {/* Aquí mostramos el mensaje dinámico que le mandemos */}
        <p className="success-subtitle">{mensaje}</p>

        <div className="success-actions">
          <button type="button" className="btn-confirm-success" onClick={onClose}>
            Confirmar
          </button>
          <button type="button" className="btn-close-success" onClick={onClose}>
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};