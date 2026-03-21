import React from 'react';
import './CalendarioSemanario.css';

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];


const horasDia = [
  '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', 
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', 
  '6 PM', '7 PM', '8 PM'
];

export const CalendarioSemanario = ({ curso, onBack, onAddSchedule, onEventClick }) => {
  
  return (
    <>
      {/* Barra superior del calendario */}
      <div className="calendar-top-bar">
        <div style={{ width: '100%' }}>
          <div className="breadcrumbs">
            Gestionar cursos {'>'} Idiomas {'>'} <strong>{curso?.nombre}</strong>
          </div>
          <div className="calendar-title-container" style={{ marginBottom: '2rem' }}>
            <h2>{curso?.nombre} - Horarios disponibles</h2>
            {curso?.flag && <img src={curso.flag} alt="Bandera" className="calendar-title-flag" />}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button className="btn-add" onClick={onAddSchedule}>+ Añadir</button>
          </div>
        </div>
        <button className="btn-back" onClick={onBack} style={{ flexShrink: 0 }}>{'<'} Atrás</button>
      </div>

      {/* Contenedor principal */}
      <div className="calendar-wrapper">
        
        {/* 👇 NUEVO CONTENEDOR CON SCROLL 👇 */}
        <div className="calendar-scroll-wrapper">
          <div className="calendar-grid">
            
            {/* Esquina superior izquierda vacía */}
            <div className="cal-header-cell" style={{ background: 'white', borderBottom: 'none', zIndex: 3 }}></div>
            
            {/* Cabeceras de los días */}
            {diasSemana.map((dia) => (
              <div className="cal-header-cell" key={dia}>{dia}</div>
            ))}
            
            {/* Filas de horas y celdas */}
            {horasDia.map((hora) => (
              <React.Fragment key={hora}>
                <div className="cal-time-cell">{hora}</div>
                
                {diasSemana.map((dia) => {
                  // SIMULACIÓN
                  const isEvent = dia === 'Domingo' && hora === '8 AM';
                  const horaFin = hora === '8 AM' ? '9 AM' : '10 AM'; 

                  return (
                    <div className="cal-cell" key={`${hora}-${dia}`}>
                      {isEvent && (
                        <div 
                          className="cal-event-block" 
                          onClick={() => onEventClick({ 
                            curso: curso?.nombre, 
                            profesor: 'Diego Salazar', // Simulado
                            dia: dia, 
                            hora: `${hora} - ${horaFin}` 
                          })}
                        >
                          {hora} - {horaFin}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};