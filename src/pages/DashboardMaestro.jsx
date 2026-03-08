import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardMaestro.css';

// Importaciones de assets
import nextWordLogo from '../assets/nextword.png'; 
import homeIcon from '../assets/home_icon.svg';
import bookIcon from '../assets/book_icon.svg';
import logoutIcon from '../assets/logout_icon.svg';
import bookIcon2 from '../assets/book_icon_2.svg';
import chinaIcon from '../assets/china_icon.svg'; 
import usaIcon from '../assets/china_icon.svg'; // Usa tu icono de inglés cuando lo tengas
import relojIcon from '../assets/reloj.svg';
import relojRellenoIcon from '../assets/reloj_relleno.svg';
import lapizIcon from '../assets/lapiz.svg';
import boteBasuraIcon from '../assets/bote_basura.svg';
import alertaIcon from '../assets/alerta.svg';

// Icono de Exclamación para los errores
const ExclamationIconSmall = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Bases de datos simuladas
const misCursosData = [
  { id: 1, nombre: 'Inglés', flag: usaIcon },
  { id: 2, nombre: 'Chino', flag: chinaIcon },
];

const assignedCoursesData = [
  { id: 1, curso: 'Ingles básico', descripcion: 'Nivel Introductorio', modalidad: 'Presencial', fecha: '2026/02/20', hora: '13:00' },
  { id: 2, curso: 'Grammar', descripcion: 'Refuerzo', modalidad: 'Virtual', fecha: '2026/02/12', hora: '11:00' }
];

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const horasDia = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'];

export const DashboardMaestro = () => {
  const [activeView, setActiveView] = useState('main'); 
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Modales Globales
  const [isModalOpen, setIsModalOpen] = useState(false); // Cerrar sesión
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false); // Añadir horario (Calendario)
  
  // Modales de la Tabla "Próximos cursos"
  const [editClassModal, setEditClassModal] = useState({ isOpen: false, data: null });
  const [deleteClassModal, setDeleteClassModal] = useState({ isOpen: false, step: 1, data: null });
  
  // Estado para la contraseña de confirmación al eliminar
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  // FLUJOS DE NAVEGACIÓN
  const openClassesView = (curso) => {
    setSelectedCourse(curso);
    setActiveView('assigned_courses'); // Ahora va a la tabla en lugar del calendario
  };

  const goBackToCourses = () => {
    setActiveView('courses');
    setSelectedCourse(null);
  };

  // VISTA A: Página Principal (Maestro)
  const renderMainContent = () => (
    <>
      <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
      <h2 className="section-title">Acciones Rápidas</h2>
      <div className="quick-actions">
        {/* El botón Horarios ahora lleva al Calendario global */}
        <div className="action-card" onClick={() => setActiveView('calendar')}>
          <img src={relojRellenoIcon} alt="Horarios" style={{ width: '45px', height: '45px', marginBottom: '8px' }} />
          <span>Horarios</span>
        </div>
        {/* El botón Cursos lleva a las banderas */}
        <div className="action-card" onClick={() => setActiveView('courses')}>
          <img src={bookIcon2} alt="Cursos" />
          <span>Cursos</span>
        </div>
      </div>
    </>
  );

  // VISTA B: Mis Cursos (Banderas)
  const renderCoursesContent = () => (
    <>
      <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
      <div className="courses-header">
        <span className="courses-subtitle">Cursos:</span>
      </div>

      <div className="courses-grid">
        {misCursosData.map((curso) => (
          <div className="course-card-simple" key={curso.id} onClick={() => openClassesView(curso)}>
            {curso.flag ? <img src={curso.flag} alt={`Bandera ${curso.nombre}`} className="course-flag" /> : <div className="course-flag" style={{ background: '#cbd5e1' }}></div>}
            <span className="course-name">{curso.nombre}</span>
          </div>
        ))}
      </div>
    </>
  );

  // VISTA C: NUEVA TABLA "PRÓXIMOS CURSOS" (Asignados)
  const renderAssignedCoursesContent = () => (
    <>
      <div className="calendar-top-bar">
        <div style={{width: '100%'}}>
          <div className="breadcrumbs">Mis clases {'>'} <strong>Cursos asignados</strong></div>
          <div className="calendar-title-container" style={{marginBottom: '1.5rem'}}>
            <h2>Próximos cursos</h2>
          </div>
        </div>
        <button className="btn-back" onClick={goBackToCourses} style={{flexShrink: 0}}>{'<'} Atrás</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Curso</th>
              <th>Descripción</th>
              <th>Modalidad</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {assignedCoursesData.map(item => (
              <tr key={item.id}>
                <td>{item.curso}</td>
                <td>{item.descripcion}</td>
                <td>{item.modalidad}</td>
                <td>{item.fecha}</td>
                <td>{item.hora}</td>
                <td>
                  <div className="table-actions">
                    <button className="action-icon-btn" onClick={() => setEditClassModal({ isOpen: true, data: item })}>
                      <img src={lapizIcon} alt="Editar" />
                    </button>
                    <button className="action-icon-btn" onClick={() => { 
                      setDeletePassword(''); 
                      setDeleteError(false); 
                      setDeleteClassModal({ isOpen: true, step: 1, data: item }); 
                    }}>
                      <img src={boteBasuraIcon} alt="Eliminar" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );

  // VISTA D: Calendario del Maestro (Horarios Generales)
  const renderCalendarContent = () => (
    <>
      <div className="calendar-top-bar">
        <div style={{width: '100%'}}>
          <div className="breadcrumbs">Mis horarios {'>'} <strong>Horarios registrados</strong></div>
          <div className="calendar-title-container" style={{marginBottom: '2rem'}}>
            <h2>Horarios registrados</h2>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button className="btn-add" onClick={() => setIsAddScheduleModalOpen(true)}>+ Añadir</button>
            <div className="month-selector">
              <strong>Abril - 2026</strong> 
              <div className="month-arrows"><span>{'<'}</span> <span>{'>'}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="calendar-wrapper" style={{padding: 0, border: 'none', boxShadow: 'none'}}>
        <div className="calendar-grid-maestro">
          <div className="cal-header-cell-m" style={{borderBottom: 'none'}}></div>
          {diasSemana.map((dia) => (<div className="cal-header-cell-m" key={dia}>{dia}</div>))}
          {horasDia.map((hora) => (
            <React.Fragment key={hora}>
              <div className="cal-time-cell-m">{hora}</div>
              {diasSemana.map((dia) => {
                // Simulación para ver el cuadro en el calendario
                const isEvent = dia === 'Domingo' && hora === '8 AM';
                const horaFin = hora === '8 AM' ? '9 AM' : '10 AM'; 
                return (
                  <div className="cal-cell-m" key={`${hora}-${dia}`}>
                    {isEvent && (
                      <div className="cal-event-block-m">
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

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-menu">
          <div className={`sidebar-link ${activeView === 'main' ? 'active' : ''}`} onClick={() => setActiveView('main')}>
            <img src={homeIcon} alt="Inicio" /> <span>Página principal</span>
          </div>
          <div className={`sidebar-link ${(activeView === 'courses' || activeView === 'assigned_courses') ? 'active' : ''}`} onClick={() => setActiveView('courses')}>
            <img src={bookIcon} alt="Cursos" /> <span>Mis Cursos</span>
          </div>
          <div className={`sidebar-link ${activeView === 'calendar' ? 'active' : ''}`} onClick={() => setActiveView('calendar')}>
            <img src={relojIcon} alt="Mis horarios" style={{ width: '22px' }} /> 
            <span>Mis horarios</span>
          </div>
        </div>
        <div className="sidebar-link" onClick={() => setIsModalOpen(true)}>
          <img src={logoutIcon} alt="Salir" /> <span>Cerrar sesión</span>
        </div>
      </aside>

      <main className="dashboard-content">
        <img src={nextWordLogo} alt="NextWord Logo" className="dashboard-content-logo" />
        
        {/* RENDERIZADO CONDICIONAL */}
        {activeView === 'main' && renderMainContent()}
        {activeView === 'courses' && renderCoursesContent()}
        {activeView === 'assigned_courses' && renderAssignedCoursesContent()}
        {activeView === 'calendar' && renderCalendarContent()}
      </main>

      {/* ================= MODALES ================= */}

      {/* Modal: Cerrar Sesión */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar cerrar sesión</h3><p>Esta acción cerrara la sesión actual</p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className="btn-confirm" onClick={handleLogout}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Añadir Horario en Calendario */}
      {isAddScheduleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-large" style={{width: '400px'}}>
            <div className="modal-header">
              <h3>Añadir horario</h3>
              <button className="close-btn" onClick={() => setIsAddScheduleModalOpen(false)}>×</button>
            </div>
            <div className="form-group" style={{marginBottom: '1.5rem'}}>
              <label>Profesor*</label>
              <input type="text" className="form-control" defaultValue="Diego Salazar" readOnly style={{backgroundColor: '#f8fafc', color: '#6b7280'}} />
            </div>
            <div className="form-group" style={{marginBottom: '1.5rem'}}>
              <label>Fecha</label>
              <input type="text" className="form-control" placeholder="AAAA/MM/DD" />
            </div>
            <div className="form-group" style={{marginBottom: '2rem'}}>
              <label>Hora*</label>
              <input type="text" className="form-control" placeholder="09:00 - 10:30" />
            </div>
            <div className="modal-footer" style={{marginTop: '1rem', paddingTop: '0', borderTop: 'none'}}>
              <div className="footer-buttons" style={{width: '100%', display: 'flex', gap: '10px'}}>
                <button className="btn-cancel" style={{flex: 1}} onClick={() => setIsAddScheduleModalOpen(false)}>Cancelar</button>
                <button className="btn-confirm-blue" style={{flex: 1}} onClick={() => setIsAddScheduleModalOpen(false)}>Añadir</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Editar Horario (Desde la tabla Próximos Cursos) */}
      {editClassModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content-large" style={{width: '450px'}}>
            <div className="modal-header">
              <h3>Editar horario</h3>
              <button className="close-btn" onClick={() => setEditClassModal({ isOpen: false, data: null })}>×</button>
            </div>
            
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Profesor*</label>
              <select className="form-select" defaultValue="Diego Salazar">
                <option value="Diego Salazar">Diego Salazar</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Día*</label>
              <select className="form-select" defaultValue="Lunes">
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
              </select>
            </div>
            
            {/* Input de Hora con el estado de Error */}
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Hora*</label>
              <input type="text" className="form-control input-error" defaultValue="09:00 - 10:30" />
              <span className="error-text-small"><ExclamationIconSmall /> Este horario ya está ocupado para el profesor seleccionado</span>
            </div>

            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Estado*</label>
              <select className="form-select" defaultValue="Disponible">
                <option value="Disponible">Disponible</option>
                <option value="Lleno">Lleno</option>
              </select>
            </div>
            
            <div className="modal-footer" style={{marginTop: '1.5rem', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <div className="footer-buttons" style={{width: '100%', display: 'flex', gap: '10px'}}>
                <button className="btn-cancel" style={{flex: 1}} onClick={() => setEditClassModal({ isOpen: false, data: null })}>Cancelar</button>
                <button className="btn-confirm-blue" style={{flex: 1}} onClick={() => setEditClassModal({ isOpen: false, data: null })}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Eliminar Curso Asignado */}
      {deleteClassModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-delete-content">
            {deleteClassModal.step === 1 && (
              <>
                <img src={alertaIcon} alt="Alerta" className="alert-icon" />
                <h3 className="delete-title">Eliminar horario</h3>
                <p className="delete-subtitle">¿Estás seguro de que deseas eliminar este horario?<br/>Esta acción no se puede deshacer.</p>
                <div className="delete-user-details" style={{padding: '1rem'}}>
                  <div className="info-row"><span>Curso:</span><strong>{deleteClassModal.data?.curso}</strong></div>
                  <div className="info-row"><span>Fecha:</span><strong>{deleteClassModal.data?.fecha}</strong></div>
                  <div className="info-row"><span>Hora:</span><strong>{deleteClassModal.data?.hora}</strong></div>
                </div>
                <div className="modal-buttons">
                  <button className="btn-cancel-delete" onClick={() => setDeleteClassModal({ isOpen: false, step: 1, data: null })}>Cancelar</button>
                  <button className="btn-confirm-red" onClick={() => setDeleteClassModal({ ...deleteClassModal, step: 2 })}>Eliminar</button>
                </div>
              </>
            )}
            {deleteClassModal.step === 2 && (
              <>
                <h3 className="delete-title">Confirmar eliminación</h3>
                <p className="delete-subtitle">Por favor, ingresa tu contraseña para confirmar esta acción.</p>
                <div className="password-group">
                  <label>Contraseña*</label>
                  <input type="password" className="form-control" placeholder="........" value={deletePassword} onChange={(e) => { setDeletePassword(e.target.value); setDeleteError(false); }} />
                  {deleteError && (<div className="error-msg-box"><img src={alertaIcon} alt="Error" /> Contraseña incorrecta. Intenta nuevamente.</div>)}
                </div>
                <div className="modal-buttons" style={{marginTop: '2rem'}}>
                  <button className="btn-cancel-delete" onClick={() => setDeleteClassModal({ isOpen: false, step: 1, data: null })}>Cancelar</button>
                  <button className="btn-confirm-red" onClick={() => {
                    if (deletePassword !== '1234') { setDeleteError(true); return; }
                    console.log(`Clase eliminada: ${deleteClassModal.data?.curso}`);
                    setDeleteClassModal({ isOpen: false, step: 1, data: null });
                  }}>Confirmar<br/>eliminación</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};