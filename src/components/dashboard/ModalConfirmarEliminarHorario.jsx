import React from 'react';
import './ModalConfirmarEliminarHorario.css';

export const ModalConfirmarEliminarHorario = ({ isOpen, datosHorario, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-delete-schedule">
        
        {/* Icono de Alerta Superior */}
        <div className="alert-icon-wrapper">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>

        <h3 className="delete-schedule-title">¿Estás seguro de que deseas eliminar este horario?</h3>
        <p className="delete-schedule-subtitle">Esta acción no se puede deshacer.</p>

        {/* Cajita gris de detalles */}
        <div className="delete-schedule-details">
          <div className="detail-row">
            <span>Profesor:</span> 
            <strong>{datosHorario?.profesor || 'Diego Salazar'}</strong>
          </div>
          <div className="detail-row">
            <span>Fecha:</span> 
            <strong>{datosHorario?.dia || '2026/02/21'}</strong>
          </div>
          <div className="detail-row">
            <span>Hora:</span> 
            <strong>{datosHorario?.hora || '09:00 - 10:30'}</strong>
          </div>
          <div className="detail-row">
            <span>Cursos:</span> 
            <strong>{datosHorario?.curso || 'Inglés, Chino'}</strong>
          </div>
        </div>

        {/* Cajita amarilla de advertencia */}
        <div className="delete-warning-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13" stroke="white"></line>
            <line x1="12" y1="17" x2="12.01" y2="17" stroke="white"></line>
          </svg>
          <p>Las cancelaciones o modificaciones de cursos deben realizarse con al menos 24 horas de anticipación al horario de la clase.</p>
        </div>

        {/* Botones lado a lado */}
        <div className="delete-schedule-actions">
          <button type="button" className="btn-cancel-schedule" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn-confirm-schedule" onClick={onConfirm}>
            Eliminar
          </button>
        </div>

      </div>
    </div>
  );
};