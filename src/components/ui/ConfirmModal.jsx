import React from 'react';

export const ConfirmModal = ({ isOpen, title, subtitle, confirmText = "Confirmar", onConfirm, onCancel, isDestructive = false }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
        
        <div className="modal-buttons">
          <button className="btn-cancel" onClick={onCancel}>Cancelar</button>
          <button 
            className={isDestructive ? "btn-confirm-red" : "btn-confirm"} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};