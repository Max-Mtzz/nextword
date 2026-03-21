import React from 'react';

export const ModalAñadirHorario = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;


  const diasNumeros = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const años = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

  const horas = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content-large" style={{ width: '550px', padding: '2rem' }}>
        
        <div className="modal-header" style={{ marginBottom: '1.5rem' }}>
          <h3>Añadir horario</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* CAMPO: PROFESOR (Igual al de Editar) */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Profesor</label>
          <input 
            type="text" 
            className="form-control" 
            value="Diego Salazar" 
            disabled 
            style={{ backgroundColor: '#ffffff', color: '#4b5563', textAlign: 'right', borderColor: '#e5e7eb' }} 
          />
        </div>

        {/* CAMPO: FECHA (Día, Mes, Año en una sola fila) */}
        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Fecha*</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select className="form-select" style={{ flex: 1 }}>
              <option value="">Día</option>
              {diasNumeros.map(dia => (
                <option key={dia} value={dia}>{dia}</option>
              ))}
            </select>
            
            <select className="form-select" style={{ flex: 2 }}>
              <option value="">Mes</option>
              {meses.map(mes => (
                <option key={mes} value={mes}>{mes}</option>
              ))}
            </select>

            <select className="form-select" style={{ flex: 1.5 }}>
              <option value="">Año</option>
              {años.map(año => (
                <option key={año} value={año}>{año}</option>
              ))}
            </select>
          </div>
        </div>

        {/* CAMPOS: HORAS (Lado a lado) */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Hora de inicio*</label>
            <select className="form-select">
              <option value="">Inicio</option>
              {horas.map((hora, index) => (
                <option key={index} value={hora}>{hora}</option>
              ))}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Hora de fin*</label>
            <select className="form-select">
              <option value="">Fin</option>
              {horas.map((hora, index) => (
                <option key={index} value={hora}>{hora}</option>
              ))}
            </select>
          </div>
        </div>

        {/* CAMPO: ESTADO */}
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Estado</label>
          <select className="form-select">
            <option>Disponible</option>
            <option>Lleno</option>
          </select>
        </div>

        {/* FOOTER */}
        <div className="modal-footer" style={{ marginTop: '1rem', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Los campos marcados con (*) son obligatorios</p>
          <div className="footer-buttons" style={{ width: '100%', display: 'flex', gap: '1rem' }}>
            <button type="button" className="btn-cancel" style={{ flex: 1, padding: '0.8rem' }} onClick={onClose}>Cancelar</button>
            <button type="button" className="btn-confirm-blue" style={{ flex: 1, padding: '0.8rem', backgroundColor: '#0082a9' }} onClick={onSave}>Añadir horario</button>
          </div>
        </div>

      </div>
    </div>
  );
};