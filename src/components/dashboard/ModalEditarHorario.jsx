import React, { useState, useEffect } from 'react';
import './ModalEditarHorario.css';

export const ModalEditarHorario = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-large edit-modal-specific">
        
        <div className="modal-header">
          <h3>Editar horario</h3>
          <button className="close-btn" type="button" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* Campo: Profesor (Deshabilitado) */}
          <div className="form-group">
            <label>Profesor</label>
            <input 
              type="text" 
              className="form-control input-readonly" 
              value="Diego Salazar" 
              readOnly 
            />
          </div>

          {/* Campo: Fecha (3 columnas) */}
          <div className="form-group">
            <label>Fecha*</label>
            <div className="select-row-3">
              <select className="form-select" defaultValue="Día">
                <option value="Día" disabled>Día</option>
                <option value="20">20</option>
                <option value="21">21</option>
              </select>
              <select className="form-select" defaultValue="Mes">
                <option value="Mes" disabled>Mes</option>
                <option value="02">02</option>
                <option value="03">03</option>
              </select>
              <select className="form-select" defaultValue="Año">
                <option value="Año" disabled>Año</option>
                <option value="2026">2026</option>
              </select>
            </div>
          </div>

          {/* Campo: Horas (2 columnas con sus propios labels) */}
          <div className="select-row-2">
            <div className="form-group-inline">
              <label>Hora de inicio*</label>
              <select className="form-select" defaultValue="8 AM">
                <option value="8 AM">8 AM</option>
                <option value="9 AM">9 AM</option>
              </select>
            </div>
            <div className="form-group-inline">
              <label>Hora de fin*</label>
              <select className="form-select" defaultValue="9 AM">
                <option value="9 AM">9 AM</option>
                <option value="10 AM">10 AM</option>
              </select>
            </div>
          </div>

          {/* Campo: Estado */}
          <div className="form-group">
            <label>Estado</label>
            <select className="form-select" defaultValue="Disponible">
              <option value="Disponible">Disponible</option>
              <option value="Lleno">Lleno</option>
            </select>
          </div>

          {/* Pie de formulario */}
          <div className="modal-footer-edit">
            <span className="required-text">Los campos marcados con (*) son obligatorios</span>
            <div className="footer-buttons">
              <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn-confirm-blue">Guardar cambios</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};