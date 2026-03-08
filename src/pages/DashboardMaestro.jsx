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

// ================= SVGs EN CÓDIGO =================
const CalendarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#0082a9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2V6" stroke="#0082a9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2V6" stroke="#0082a9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 10H21" stroke="#0082a9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIconWhite = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TrashIconRed = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6H21" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExclamationIconSmall = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ================= DATOS SIMULADOS =================
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
  const [isModalOpen, setIsModalOpen] = useState(false); 
  
  // Modales del Calendario
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false); 
  const [actionModal, setActionModal] = useState({ isOpen: false, data: null });
  const [editScheduleModal, setEditScheduleModal] = useState({ isOpen: false, data: null });
  const [deleteScheduleModal, setDeleteScheduleModal] = useState({ isOpen: false, step: 1, data: null });

  // Modales de la Tabla (Mis Horarios / Cursos asignados)
  const [editClassModal, setEditClassModal] = useState({ isOpen: false, data: null });
  const [deleteClassModal, setDeleteClassModal] = useState({ isOpen: false, step: 1, data: null });
  
  // Estado para la contraseña de confirmación al eliminar (se comparte entre ambos flujos de eliminar)
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  // NAVEGACIÓN
  const openCalendarView = (curso) => {
    setSelectedCourse(curso);
    setActiveView('calendar'); // AHORA LAS BANDERAS VAN AL CALENDARIO
  };

  const goBackToCourses = () => {
    setActiveView('courses');
    setSelectedCourse(null);
  };

  const goBackToMain = () => {
    setActiveView('main');
  };

  // ================= VISTAS =================

  // VISTA A: Página Principal (Maestro)
  const renderMainContent = () => (
    <>
      <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
      <h2 className="section-title">Acciones Rápidas</h2>
      <div className="quick-actions">
        {/* El botón Horarios AHORA lleva a la Tabla */}
        <div className="action-card" onClick={() => setActiveView('assigned_courses')}>
          <img src={relojRellenoIcon} alt="Horarios" style={{ width: '45px', height: '45px', marginBottom: '8px' }} />
          <span>Horarios</span>
        </div>
        {/* El botón Cursos AHORA lleva a las banderas */}
        <div className="action-card" onClick={() => setActiveView('courses')}>
          <img src={bookIcon2} alt="Cursos" />
          <span>Cursos</span>
        </div>
      </div>
    </>
  );

  // VISTA B: Mis Cursos (Banderas) -> Llevan al Calendario
  const renderCoursesContent = () => (
    <>
      <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
      <div className="courses-header">
        <span className="courses-subtitle">Cursos:</span>
      </div>
      <div className="courses-grid">
        {misCursosData.map((curso) => (
          <div className="course-card-simple" key={curso.id} onClick={() => openCalendarView(curso)}>
            {curso.flag ? <img src={curso.flag} alt={`Bandera ${curso.nombre}`} className="course-flag" /> : <div className="course-flag" style={{ background: '#cbd5e1' }}></div>}
            <span className="course-name">{curso.nombre}</span>
          </div>
        ))}
      </div>
    </>
  );

  // VISTA C: CALENDARIO (Viene desde Banderas)
  const renderCalendarContent = () => (
    <>
      <div className="calendar-top-bar">
        <div style={{width: '100%'}}>
          <div className="breadcrumbs">Gestionar cursos {'>'} Idiomas {'>'} <strong>{selectedCourse?.nombre}</strong></div>
          <div className="calendar-title-container" style={{marginBottom: '2rem'}}>
            <h2>{selectedCourse?.nombre} - Horarios disponibles</h2>
            {selectedCourse?.flag && <img src={selectedCourse.flag} alt="Bandera" className="calendar-title-flag" />}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button className="btn-add" onClick={() => setIsAddScheduleModalOpen(true)}>+ Añadir</button>
            <div className="month-selector">
              <strong>Abril - 2026</strong> 
              <div className="month-arrows"><span>{'<'}</span> <span>{'>'}</span></div>
            </div>
          </div>
        </div>
        <button className="btn-back" onClick={goBackToCourses} style={{flexShrink: 0}}>{'<'} Atrás</button>
      </div>

      <div className="calendar-wrapper" style={{padding: 0, border: 'none', boxShadow: 'none'}}>
        <div className="calendar-grid-maestro">
          <div className="cal-header-cell-m" style={{borderBottom: 'none'}}></div>
          {diasSemana.map((dia) => (<div className="cal-header-cell-m" key={dia}>{dia}</div>))}
          {horasDia.map((hora) => (
            <React.Fragment key={hora}>
              <div className="cal-time-cell-m">{hora}</div>
              {diasSemana.map((dia) => {
                const isEvent = dia === 'Domingo' && hora === '8 AM';
                const horaFin = hora === '8 AM' ? '9 AM' : '10 AM'; 
                return (
                  <div className="cal-cell-m" key={`${hora}-${dia}`}>
                    {isEvent && (
                      <div className="cal-event-block-m" onClick={() => setActionModal({ isOpen: true, data: { curso: selectedCourse?.nombre, profesor: 'Diego Salazar', dia: dia, hora: `${hora} - ${horaFin}` } })}>
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

  // VISTA D: TABLA DE HORARIOS (Viene desde menú/tarjeta "Mis horarios")
  const renderAssignedCoursesContent = () => (
    <>
      <div className="calendar-top-bar">
        <div style={{width: '100%'}}>
          <div className="breadcrumbs">Mis clases {'>'} <strong>Cursos asignados</strong></div>
          <div className="calendar-title-container" style={{marginBottom: '1.5rem'}}>
            <h2>Próximos cursos</h2>
          </div>
        </div>
        <button className="btn-back" onClick={goBackToMain} style={{flexShrink: 0}}>{'<'} Atrás</button>
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

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-menu">
          <div className={`sidebar-link ${activeView === 'main' ? 'active' : ''}`} onClick={() => setActiveView('main')}>
            <img src={homeIcon} alt="Inicio" /> <span>Página principal</span>
          </div>
          {/* Cursos AHORA va a Banderas (calendar) */}
          <div className={`sidebar-link ${(activeView === 'courses' || activeView === 'calendar') ? 'active' : ''}`} onClick={() => setActiveView('courses')}>
            <img src={bookIcon} alt="Cursos" /> <span>Mis Cursos</span>
          </div>
          {/* Mis horarios AHORA va a la Tabla */}
          <div className={`sidebar-link ${activeView === 'assigned_courses' ? 'active' : ''}`} onClick={() => setActiveView('assigned_courses')}>
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
        
        {/* RENDERIZADO CONDICIONAL DE VISTAS */}
        {activeView === 'main' && renderMainContent()}
        {activeView === 'courses' && renderCoursesContent()}
        {activeView === 'calendar' && renderCalendarContent()}
        {activeView === 'assigned_courses' && renderAssignedCoursesContent()}
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

      {/* ================= MODALES DEL CALENDARIO ================= */}

      {/* Modal: Añadir Horario en Calendario (ACTUALIZADO CON ESTADO) */}
      {isAddScheduleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-large" style={{width: '450px'}}>
            <div className="modal-header">
              <h3>Añadir horario</h3>
              <button className="close-btn" onClick={() => setIsAddScheduleModalOpen(false)}>×</button>
            </div>
            
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Profesor*</label>
              <select className="form-select" disabled style={{backgroundColor: '#f8fafc', color: '#6b7280'}}>
                <option>Diego Salazar</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Día*</label>
              <select className="form-select">
                <option>Lunes</option>
                <option>Martes</option>
                <option>Miércoles</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Hora*</label>
              <input type="text" className="form-control" placeholder="09:00 - 10:30" />
            </div>
            {/* Nuevo campo de Estado */}
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Estado*</label>
              <select className="form-select">
                <option>Disponible</option>
                <option>Lleno</option>
              </select>
            </div>
            
            <div className="modal-footer" style={{marginTop: '2rem', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <div className="footer-buttons" style={{width: '100%', display: 'flex', gap: '10px'}}>
                <button className="btn-cancel" style={{flex: 1}} onClick={() => setIsAddScheduleModalOpen(false)}>Cancelar</button>
                <button className="btn-confirm-blue" style={{flex: 1}} onClick={() => setIsAddScheduleModalOpen(false)}>Añadir horario</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Seleccionar Acción (Al dar clic en bloque rojo del Calendario) */}
      {actionModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-action-content">
            <div className="modal-header"><h3>Seleccionar acción</h3><button className="close-btn" onClick={() => setActionModal({ isOpen: false, data: null })}>×</button></div>
            <p className="action-subtitle">¿Qué deseas hacer con este horario?</p>
            <div className="schedule-info-box">
              <div className="info-header"><CalendarIcon /> Datos del horario</div>
              <div className="info-row"><span>Curso:</span><strong>{actionModal.data?.curso}</strong></div>
              <div className="info-row"><span>Profesor:</span><strong>{actionModal.data?.profesor}</strong></div>
              <div className="info-row"><span>Día:</span><strong>{actionModal.data?.dia}</strong></div>
              <div className="info-row"><span>Hora:</span><strong>{actionModal.data?.hora}</strong></div>
            </div>
            <button className="btn-action-blue" onClick={() => { setEditScheduleModal({ isOpen: true, data: actionModal.data }); setActionModal({ isOpen: false, data: null }); }}><EditIconWhite /> Modificar horario</button>
            <button className="btn-action-red" onClick={() => { setDeletePassword(''); setDeleteError(false); setDeleteScheduleModal({ isOpen: true, step: 1, data: actionModal.data }); setActionModal({ isOpen: false, data: null }); }}><TrashIconRed /> Eliminar horario</button>
          </div>
        </div>
      )}

      {/* Modal: Editar Horario (Desde Calendario) */}
      {editScheduleModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content-large" style={{width: '450px'}}>
            <div className="modal-header"><h3>Editar horario</h3><button className="close-btn" onClick={() => setEditScheduleModal({ isOpen: false, data: null })}>×</button></div>
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Profesor*</label>
              <select className="form-select" disabled style={{backgroundColor: '#f8fafc', color: '#6b7280'}}><option>{editScheduleModal.data?.profesor}</option></select>
            </div>
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Día*</label>
              <select className="form-select" defaultValue={editScheduleModal.data?.dia}>
                <option value="Domingo">Domingo</option><option value="Lunes">Lunes</option>
              </select>
            </div>
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Hora*</label>
              <input type="text" className="form-control" defaultValue={editScheduleModal.data?.hora} />
            </div>
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Estado*</label>
              <select className="form-select" defaultValue="Disponible"><option value="Disponible">Disponible</option><option value="Lleno">Lleno</option></select>
            </div>
            <div className="modal-footer" style={{marginTop: '2rem', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <span className="required-text" style={{display: 'block', marginBottom: '1rem', textAlign: 'left', width: '100%'}}>Los campos marcados con (*) son obligatorios</span>
              <div className="footer-buttons" style={{width: '100%', display: 'flex', gap: '10px'}}>
                <button className="btn-cancel" style={{flex: 1}} onClick={() => setEditScheduleModal({ isOpen: false, data: null })}>Cancelar</button>
                <button className="btn-confirm-blue" style={{flex: 1}} onClick={() => setEditScheduleModal({ isOpen: false, data: null })}>Guardar cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Eliminar Horario (Desde Calendario) */}
      {deleteScheduleModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-delete-content">
            {deleteScheduleModal.step === 1 && (
              <>
                <img src={alertaIcon} alt="Alerta" className="alert-icon" /><h3 className="delete-title">Eliminar horario</h3><p className="delete-subtitle">¿Estás seguro de que deseas eliminar este horario? <br/>Esta acción no se puede deshacer.</p>
                <div className="delete-schedule-details">
                  <div className="info-row"><span>Curso:</span><strong>{deleteScheduleModal.data?.curso}</strong></div><div className="info-row"><span>Profesor:</span><strong>{deleteScheduleModal.data?.profesor}</strong></div>
                  <div className="info-row"><span>Día:</span><strong>{deleteScheduleModal.data?.dia}</strong></div><div className="info-row"><span>Hora:</span><strong>{deleteScheduleModal.data?.hora}</strong></div>
                </div>
                <div className="modal-buttons"><button className="btn-cancel-delete" onClick={() => setDeleteScheduleModal({ isOpen: false, step: 1, data: null })}>Cancelar</button><button className="btn-confirm-red" onClick={() => setDeleteScheduleModal({ ...deleteScheduleModal, step: 2 })}>Eliminar</button></div>
              </>
            )}
            {deleteScheduleModal.step === 2 && (
              <>
                <h3 className="delete-title">Confirmar eliminación</h3><p className="delete-subtitle">Por favor, ingresa tu contraseña para confirmar esta acción.</p>
                <div className="password-group">
                  <label>Contraseña*</label><input type="password" className="form-control" placeholder="........" value={deletePassword} onChange={(e) => { setDeletePassword(e.target.value); setDeleteError(false); }} />
                  {deleteError && (<div className="error-msg-box"><img src={alertaIcon} alt="Error" /> Contraseña incorrecta. Intenta nuevamente.</div>)}
                </div>
                <div className="modal-buttons" style={{marginTop: '2rem'}}>
                  <button className="btn-cancel-delete" onClick={() => setDeleteScheduleModal({ isOpen: false, step: 1, data: null })}>Cancelar</button>
                  <button className="btn-confirm-red" onClick={() => { if (deletePassword !== '1234') { setDeleteError(true); return; } setDeleteScheduleModal({ isOpen: false, step: 1, data: null }); }}>Confirmar<br/>eliminación</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ================= MODALES DE LA TABLA (Mis horarios) ================= */}

      {/* Modal: Editar Clase (Desde la Tabla) */}
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
            
            <div className="form-group" style={{marginBottom: '1.2rem'}}>
              <label>Hora*</label>
              <input type="text" className="form-control input-error" defaultValue={editClassModal.data?.hora} />
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

      {/* Modal: Eliminar Curso Asignado (Desde la Tabla) */}
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