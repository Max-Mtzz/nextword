import React from 'react';
import './ModalEliminar.css';

export const ModalEliminar = ({ isOpen, onClose, onConfirm, itemType = 'curso', itemName }) => {
  if (!isOpen) return null;

  // Ponemos la primera letra en mayúscula (Curso, Usuario) para la cajita gris
  const displayType = itemType.charAt(0).toUpperCase() + itemType.slice(1);

  return (
    <div className="modal-overlay">
      <div className="modal-content-delete-general">

        {/* Icono de Alerta Superior (Rojo oscuro) */}
        <div className="alert-icon-wrapper-general">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>

        <h3 className="delete-general-title">¿Estás seguro de que deseas eliminar este {itemType.toLowerCase()}?</h3>
        <p className="delete-general-subtitle">Esta acción no se puede deshacer.</p>

        {/* Cajita gris de detalles */}
        <div className="delete-general-details">
          <div className="detail-row-general">
            <span>{displayType}:</span>
            <strong>{itemName || 'No definido'}</strong>
          </div>
        </div>

        {/* Botones lado a lado */}
        <div className="delete-general-actions">
          <button type="button" className="btn-cancel-general" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-confirm-general" onClick={onConfirm}>
            Eliminar
          </button>
        </div>

      </div>
    </div>
  );
};