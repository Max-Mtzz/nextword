import React from 'react';
import './ModalErrorCancelacion.css';
// Importamos tu icono de los assets
import warningLockIcon from '../../assets/WarningLockCircle.svg';

export const ModalErrorCancelacion = ({ isOpen, onClose, horasRestantes }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-error-24h">
        
        {/* Usamos el icono importado en lugar del SVG manual */}
        <div className="lock-icon-wrapper">
          <img 
            src={warningLockIcon} 
            alt="Candado de advertencia" 
            className="warning-lock-icon"
          />
        </div>

        <h3 className="error-24h-title">No es posible cancelar</h3>
        <p className="error-24h-subtitle">
          Las cancelaciones o modificaciones deben realizarse con al menos 24 horas de anticipación antes del inicio de la clase.
        </p>

        {/* Cajita amarilla informativa */}
        <div className="time-alert-box">
          {/* Este icono de reloj lo mantengo como SVG para que no tengas que crear otro asset, 
              pero si tienes uno en assets puedes cambiarlo igual */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span>Faltan {horasRestantes} horas para la clase</span>
        </div>

        <button className="btn-understood" onClick={onClose}>
          Entendido
        </button>
      </div>
    </div>
  );
};