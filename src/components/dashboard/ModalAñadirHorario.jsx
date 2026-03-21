import React, { useState } from 'react';

export const ModalAñadirHorario = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;


  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dias = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ];

  // Suponiendo que la escuela abre de 7 AM a 8 PM
  const horas = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

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

        {/* CAMPO: MES (Llenado con .map) */}
        <div className="form-group" style={{ marginBottom: '1.2rem' }}>
          <label>Mes*</label>
          <select className="form-select">
            <option value="">Selecciona un mes</option>
            {meses.map((mes, index) => (
              <option key={index} value={mes}>{mes}</option>
            ))}
          </select>
        </div>

        {/* CAMPO: DÍA (Llenado con .map) */}
        <div className="form-group" style={{ marginBottom: '1.2rem' }}>
          <label>Día*</label>
          <select className="form-select">
            <option value="">Selecciona un día</option>
            {dias.map((dia, index) => (
              <option key={index} value={dia}>{dia}</option>
            ))}
          </select>
        </div>

        {/* CAMPOS: HORA INICIO Y FIN (Llenados con .map y puestos lado a lado) */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Hora de inicio*</label>
            <select className="form-select">
              <option value="">Inicio</option>
              {horas.map((hora, index) => (
                <option key={index} value={hora}>{hora}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Hora de fin*</label>
            <select className="form-select">
              <option value="">Fin</option>
              {horas.map((hora, index) => (
                <option key={index} value={hora}>{hora}</option>
              ))}
            </select>
          </div>
        </div>

        {/* CAMPO: ESTADO */}
        <div className="form-group" style={{ marginBottom: '1.2rem' }}>
          <label>Estado*</label>
          <select className="form-select">
            <option>Disponible</option>
            <option>Lleno</option>
          </select>
        </div>

        {/* BOTONES */}
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