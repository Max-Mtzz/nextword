import React from 'react';
import './ModalAccionHorario.css';

// Importamos tus propios iconos desde la carpeta assets
import relojIcon from '../../assets/reloj.svg';
import lapizIcon from '../../assets/lapiz.svg'; // O usa pencil_icon.svg si te gusta más
import basuraIcon from '../../assets/bote_basura.svg';

export const ModalAccionHorario = ({ isOpen, datos, onClose, onEdit, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-accion">
        
        <div className="modal-header-accion">
          <h3>Seleccionar acción</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <p className="accion-subtitle">¿Qué deseas hacer con este horario?</p>

        <div className="accion-info-box">
          <div className="accion-info-title">
            <img src={relojIcon} alt="Horario" style={{ width: '18px', height: '18px' }} />
            <strong>Datos del horario</strong>
          </div>
          
          <div className="accion-info-row">
            <span>Curso:</span> 
            <strong>{datos?.curso || 'No definido'}</strong>
          </div>
          <div className="accion-info-row">
            <span>Profesor:</span> 
            <strong>{datos?.profesor || 'No definido'}</strong>
          </div>
          <div className="accion-info-row">
            <span>Día:</span> 
            <strong>{datos?.dia || 'No definido'}</strong>
          </div>
          <div className="accion-info-row">
            <span>Hora:</span> 
            <strong>{datos?.hora || 'No definido'}</strong>
          </div>
        </div>

        <div className="accion-buttons">
          <button className="btn-modificar" onClick={onEdit}>
            <img src={lapizIcon} alt="Modificar" style={{ width: '16px', height: '16px', filter: 'brightness(0) invert(1)' }} />
            Modificar horario
          </button>
          
          <button className="btn-eliminar-accion" onClick={onDelete}>
            <img src={basuraIcon} alt="Eliminar" style={{ width: '16px', height: '16px' }} />
            Eliminar horario
          </button>
        </div>

      </div>
    </div>
  );
};