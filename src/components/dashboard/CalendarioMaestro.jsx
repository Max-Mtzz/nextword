import React from 'react';
import './CalendarioMaestro.css';

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const horasDia = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];

export const CalendarioMaestro = ({ curso, onBack, onAddSchedule, onEventClick }) => {
  return (
    <>
      <div className="calendar-top-bar">
        <div style={{ width: '100%' }}>
          {/* Breadcrumbs exactos de tu Figma */}
          <div className="breadcrumbs">
            Mis horarios {'>'} {curso?.nombre} {'>'} <strong>Horarios registrados</strong>
          </div>
          
          <div className="calendar-title-container" style={{ marginBottom: '1.5rem' }}>
            <h2>Horarios registrados</h2>
            {curso?.flag && <img src={curso.flag} alt="Bandera" className="calendar-title-flag" />}
          </div>

          {/* Botón azul tipo Figma */}
          <button className="btn-add-blue" onClick={onAddSchedule}>+ Añadir</button>
        </div>
      </div>

      {/* 👇 AQUÍ APLICAMOS LA NUEVA CLASE PARA HACERLO GRANDE Y CON SCROLL 👇 */}
      <div className="calendar-scroll-wrapper">
        <div className="calendar-grid-maestro">
          <div className="cal-header-cell-m" style={{ borderBottom: 'none' }}></div>
          
          {diasSemana.map((dia) => (
            <div className="cal-header-cell-m" key={dia}>{dia}</div>
          ))}
          
          {horasDia.map((hora) => (
            <React.Fragment key={hora}>
              <div className="cal-time-cell-m">{hora}</div>
              
              {diasSemana.map((dia) => {
                // Simulación del bloque rojo en Domingo a las 8 AM
                const isEvent = dia === 'Domingo' && hora === '8 AM';
                const horaFin = hora === '8 AM' ? '9 AM' : '10 AM'; 

                return (
                  <div className="cal-cell-m" key={`${hora}-${dia}`}>
                    {isEvent && (
                      <div 
                        className="cal-event-block-m" 
                        onClick={() => onEventClick({ 
                          curso: curso?.nombre, 
                          profesor: 'Diego Salazar', 
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
    </>
  );
};