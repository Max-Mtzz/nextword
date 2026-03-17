import React, { useState } from 'react';

export const ModalAñadirHorario = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  // Aquí prepararemos el estado para Spring Boot más adelante
  // const [formData, setFormData] = useState({ dia: 'Lunes', hora: '', estado: 'Disponible' });

  return (
    <div className="modal-overlay">
      <div className="modal-content-large" style={{ width: '450px' }}>
        <div className="modal-header">
          <h3>Añadir horario</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="form-group" style={{ marginBottom: '1.2rem' }}>
          <label>Profesor*</label>
          <select className="form-select" disabled style={{ backgroundColor: '#f8fafc', color: '#6b7280' }}>
            <option>Diego Salazar</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: '1.2rem' }}>
          <label>Día*</label>
          <select className="form-select">
            <option>Lunes</option>
            <option>Martes</option>
            <option>Miércoles</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: '1.2rem' }}>
          <label>Hora*</label>
          <input type="text" className="form-control" placeholder="09:00 - 10:30" />
        </div>

        <div className="form-group" style={{ marginBottom: '1.2rem' }}>
          <label>Estado*</label>
          <select className="form-select">
            <option>Disponible</option>
            <option>Lleno</option>
          </select>
        </div>

        <div className="modal-footer" style={{ marginTop: '2rem', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div className="footer-buttons" style={{ width: '100%', display: 'flex', gap: '10px' }}>
            <button className="btn-cancel" style={{ flex: 1 }} onClick={onClose}>Cancelar</button>
            <button className="btn-confirm-blue" style={{ flex: 1 }} onClick={onSave}>Añadir horario</button>
          </div>
        </div>
      </div>
    </div>
  );
};