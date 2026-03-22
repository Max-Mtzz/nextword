import React from 'react';
import './CalendarioSemanario.css';

export const CalendarioSemanario = ({ curso, horarios = [], onBack, onAddSchedule, onEventClick }) => {
  
  return (
    <>
      {/* Barra superior del calendario */}
      <div className="calendar-top-bar">
        <div style={{ width: '100%' }}>
          <div className="breadcrumbs">
            Gestionar cursos {'>'} Idiomas {'>'} <strong>{curso?.nombre}</strong>
          </div>
          <div className="calendar-title-container" style={{ marginBottom: '2rem' }}>
            <h2>{curso?.nombre} - Horarios programados</h2>
            {curso?.flag && <img src={curso.flag} alt="Bandera" className="calendar-title-flag" />}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button className="btn-add" onClick={onAddSchedule}>+ Añadir Horario</button>
          </div>
        </div>
        <button className="btn-back" onClick={onBack} style={{ flexShrink: 0 }}>{'<'} Atrás</button>
      </div>

      {/* Contenedor principal con las nuevas tarjetas */}
      <div className="calendar-wrapper">
        <div className="calendar-scroll-wrapper">
          
          {horarios.length === 0 ? (
             <div className="empty-horarios-msg">
               <p>Aún no hay horarios registrados para este curso.</p>
             </div>
          ) : (
            <div className="horarios-grid-dinamico">
              {horarios.map((horario, index) => {
                // Lógica de colores (verde si está disponible, rojo si está lleno)
                const isDisponible = horario.estado?.toLowerCase() === 'disponible';
                
                return (
                  <div 
                    key={index} 
                    className={`horario-card ${isDisponible ? 'card-verde' : 'card-roja'}`}
                    onClick={() => onEventClick(horario)}
                  >
                    <div className="horario-card-header">
                      <span className="horario-fecha">{horario.dia}</span>
                      <span className="horario-estado">{isDisponible ? 'Disponible' : 'Ocupado'}</span>
                    </div>
                    <div className="horario-card-body">
                      <h3 className="horario-hora">{horario.hora}</h3>
                      <p className="horario-docente">{horario.profesor}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </>
  );
};