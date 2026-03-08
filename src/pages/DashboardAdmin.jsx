import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardAdmin.css';

// Importaciones base
import nextWordLogo from '../assets/nextword.png'; 
import homeIcon from '../assets/home_icon.svg';
import bookIcon from '../assets/book_icon.svg';
import settingsIcon from '../assets/settings_icon.svg';
import logoutIcon from '../assets/logout_icon.svg';
import hatIcon from '../assets/hat_icon.svg';
import pencilIcon from '../assets/pencil_icon.svg'; 
import bookIcon2 from '../assets/book_icon_2.svg';
import menuIcon from '../assets/menu_icon.svg'; 
import chinaIcon from '../assets/china_icon.svg'; 
import nubeIcon from '../assets/nube.svg';
import imagenIcon from '../assets/imagen.svg';
import boteBasuraIcon from '../assets/bote_basura.svg';
import recargarIcon from '../assets/recargar.svg';
import alertaIcon from '../assets/alerta.svg';

// SVGs en línea para los botones de acción para controlar el color exacto
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

const cursosData = [
  { id: 1, nombre: 'Inglés', flag: null },
  { id: 2, nombre: 'Chino', flag: chinaIcon },
  { id: 3, nombre: 'Portugués', flag: null },
  { id: 4, nombre: 'Alemán', flag: null },
  { id: 5, nombre: 'Japonés', flag: null },
  { id: 6, nombre: 'Coreano', flag: null },
];

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const horasDia = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'];

export const DashboardAdmin = () => {
  const [activeView, setActiveView] = useState('main'); 
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // ESTADOS MODALES GLOBALES
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, step: 1, courseId: null });
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState(false);

  // NUEVOS ESTADOS: MODALES DE CALENDARIO
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState({ isOpen: false, data: null });

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  const closeDropdown = () => {
    if (openMenuId !== null) setOpenMenuId(null);
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const openCalendarView = (curso) => {
    setSelectedCourse(curso);
    setActiveView('calendar');
  };

  const goBackToCourses = () => {
    setActiveView('courses');
    setSelectedCourse(null);
  };

  // VISTA A: Página Principal
  const renderMainContent = () => (
    <>
      <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
      <h2 className="section-title">Acciones Rápidas</h2>
      <div className="quick-actions">
        <div className="action-card">
          <img src={hatIcon} alt="Alumnos" /><span>Alumnos</span>
        </div>
        <div className="action-card">
          <img src={pencilIcon} alt="Maestros" /><span>Maestros</span>
        </div>
        <div className="action-card" onClick={() => setActiveView('courses')}>
          <img src={bookIcon2} alt="Cursos" /><span>Cursos</span>
        </div>
      </div>
    </>
  );

  // VISTA B: Gestión de Cursos
  const renderCoursesContent = () => (
    <>
      <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
      <div className="courses-header">
        <span className="courses-subtitle">Cursos:</span>
        <button className="btn-add" onClick={() => setIsAddModalOpen(true)}>+ Añadir</button>
      </div>

      <div className="courses-grid">
        {cursosData.map((curso) => (
          <div className="course-card-simple" key={curso.id} onClick={() => openCalendarView(curso)}>
            <button className="dots-btn-simple" onClick={(e) => toggleMenu(e, curso.id)}>
              <img src={menuIcon} alt="Opciones" />
            </button>
            {openMenuId === curso.id && (
              <div className="dropdown-simple">
                <button className="dropdown-item-text" onClick={(e) => e.stopPropagation()}>Editar</button>
                <button className="dropdown-item-text" onClick={(e) => { 
                  e.stopPropagation(); 
                  setOpenMenuId(null);
                  setDeleteModal({ isOpen: true, step: 1, courseId: curso.id });
                }}>Eliminar</button>
              </div>
            )}
            {curso.flag ? (
              <img src={curso.flag} alt={`Bandera ${curso.nombre}`} className="course-flag" />
            ) : (
              <div className="course-flag" style={{ background: '#cbd5e1' }}></div> 
            )}
            <span className="course-name">{curso.nombre}</span>
          </div>
        ))}
      </div>
    </>
  );

  // VISTA C: CALENDARIO
  const renderCalendarContent = () => (
    <>
      <div className="calendar-top-bar">
        <div>
          <div className="breadcrumbs">
            Gestionar cursos {'>'} Idiomas {'>'} <strong>{selectedCourse?.nombre}</strong>
          </div>
          <div className="calendar-title-container">
            <h2>{selectedCourse?.nombre} - Horarios disponibles</h2>
            {selectedCourse?.flag && <img src={selectedCourse.flag} alt="Bandera" className="calendar-title-flag" />}
          </div>
          {/* BOTÓN +AÑADIR DEL CALENDARIO */}
          <button className="btn-add" style={{marginTop: '1.5rem'}} onClick={() => setIsAddScheduleModalOpen(true)}>
            + Añadir
          </button>
        </div>
        <button className="btn-back" onClick={goBackToCourses}>{'<'} Atrás</button>
      </div>

      <div className="calendar-wrapper">
        <div className="calendar-grid">
          <div className="cal-header-cell" style={{background: 'white', borderBottom: 'none'}}></div>
          {diasSemana.map((dia) => (
            <div className="cal-header-cell" key={dia}>{dia}</div>
          ))}

          {horasDia.map((hora) => (
            <React.Fragment key={hora}>
              <div className="cal-time-cell">{hora}</div>
              {diasSemana.map((dia) => {
                // Simulación de un evento los Domingos a las 8 AM
                const isEvent = dia === 'Domingo' && hora === '8 AM';
                
                // Función auxiliar para calcular "8 AM - 9 AM" dinámicamente
                const horaFin = hora === '8 AM' ? '9 AM' : '10 AM'; 

                return (
                  <div className="cal-cell" key={`${hora}-${dia}`}>
                    {isEvent && (
                      <div 
                        className="cal-event-block" 
                        onClick={() => setActionModal({ 
                          isOpen: true, 
                          data: { curso: selectedCourse?.nombre, profesor: 'Diego Salazar', dia: dia, hora: `${hora} - ${horaFin}` } 
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

  return (
    <div className="dashboard-container" onClick={closeDropdown}>
      <aside className="sidebar">
        <div className="sidebar-menu">
          <div className={`sidebar-link ${activeView === 'main' ? 'active' : ''}`} onClick={() => setActiveView('main')}>
            <img src={homeIcon} alt="Inicio" /> <span>Página principal</span>
          </div>
          <div className={`sidebar-link ${(activeView === 'courses' || activeView === 'calendar') ? 'active' : ''}`} onClick={goBackToCourses}>
            <img src={bookIcon} alt="Cursos" /> <span>Gestionar Cursos</span>
          </div>
          <div className="sidebar-link">
            <img src={settingsIcon} alt="Usuarios" /> <span>Gestionar Usuarios</span>
          </div>
        </div>
        <div className="sidebar-link" onClick={() => setIsModalOpen(true)}>
          <img src={logoutIcon} alt="Salir" /> <span>Cerrar sesión</span>
        </div>
      </aside>

      <main className="dashboard-content">
        <img src={nextWordLogo} alt="NextWord Logo" className="dashboard-content-logo" />
        
        {activeView === 'main' && renderMainContent()}
        {activeView === 'courses' && renderCoursesContent()}
        {activeView === 'calendar' && renderCalendarContent()}
      </main>

      {/* ========================================================= */}
      {/* === ZONA DE MODALES GLOBALES (CERRAR SESIÓN, AÑADIR, ELIMINAR CURSO) === */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar cerrar sesión</h3>
            <p>Esta acción cerrara la sesión actual</p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className="btn-confirm" onClick={handleLogout}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-large">
            <div className="modal-header">
              <h3>Añadir Curso</h3>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>
            <div className="form-group">
              <label>Nombre del curso*</label>
              <input type="text" className="form-control" placeholder="Inglés Intermedio B1" />
            </div>
            <div className="form-group">
              <label>Imagen representativa del curso*</label>
              <div className="upload-area">
                <img src={nubeIcon} alt="Subir" className="nube-icon" />
                <p>Arrastra y suelta tu imagen aquí<br/>o haz clic para seleccionar</p>
                <button className="upload-btn">
                  <img src={imagenIcon} alt="Icono imagen" style={{width: '16px'}} /> Subir imagen
                </button>
              </div>
              <p className="format-text">Formatos aceptados: JPG, PNG.</p>
              <label>Vista previa</label>
              <div className="preview-area">
                <div className="preview-thumbnail"></div>
                <div className="preview-actions">
                  <button className="action-btn btn-replace">
                    <img src={recargarIcon} alt="Reemplazar" style={{width: '16px'}} /> Reemplazar
                  </button>
                  <button className="action-btn btn-delete">
                    <img src={boteBasuraIcon} alt="Eliminar" style={{width: '16px'}} /> Eliminar
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <span className="required-text">Los campos marcados con (*) son obligatorios</span>
              <div className="footer-buttons">
                <button className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>Cancelar</button>
                <button className="btn-confirm-blue" onClick={() => setIsAddModalOpen(false)}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-delete-content">
            {deleteModal.step === 1 && (
              <>
                <img src={alertaIcon} alt="Alerta" className="alert-icon" />
                <h3 className="delete-title">¿Estás seguro de que deseas eliminar este curso?</h3>
                <p className="delete-subtitle">Esta acción no se puede deshacer.</p>
                <div className="course-to-delete">
                  <span>Curso:</span>
                  <strong>{cursosData.find(c => c.id === deleteModal.courseId)?.nombre}</strong>
                </div>
                <div className="modal-buttons">
                  <button className="btn-cancel-delete" onClick={() => setDeleteModal({ isOpen: false, step: 1, courseId: null })}>Cancelar</button>
                  <button className="btn-confirm-red" onClick={() => setDeleteModal({ ...deleteModal, step: 2 })}>Eliminar</button>
                </div>
              </>
            )}
            {deleteModal.step === 2 && (
              <>
                <h3 className="delete-title">Confirmar eliminación</h3>
                <p className="delete-subtitle">Por favor, ingresa tu contraseña para confirmar esta acción.</p>
                <div className="password-group">
                  <label>Contraseña*</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="........"
                    value={deletePassword}
                    onChange={(e) => { setDeletePassword(e.target.value); setDeleteError(false); }}
                  />
                  {deleteError && (
                    <div className="error-msg-box">
                      <img src={alertaIcon} alt="Error" /> Contraseña incorrecta. Intenta nuevamente.
                    </div>
                  )}
                </div>
                <div className="modal-buttons" style={{marginTop: '2rem'}}>
                  <button className="btn-cancel-delete" onClick={() => setDeleteModal({ isOpen: false, step: 1, courseId: null })}>Cancelar</button>
                  <button className="btn-confirm-red" onClick={() => {
                    if (deletePassword !== '1234') { setDeleteError(true); return; }
                    setDeleteModal({ isOpen: false, step: 1, courseId: null });
                  }}>Confirmar<br/>eliminación</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* === NUEVOS MODALES: HORARIOS Y CALENDARIO === */}
      {/* ========================================================= */}
      
      {/* 1. Modal: Añadir Horario */}
      {isAddScheduleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-large" style={{width: '450px'}}>
            <div className="modal-header">
              <h3>Añadir horario</h3>
              <button className="close-btn" onClick={() => setIsAddScheduleModalOpen(false)}>×</button>
            </div>
            
            <div className="form-group">
              <label>Profesor*</label>
              <select className="form-select">
                <option>Diego Salazar</option>
                <option>Guillermo Corro</option>
              </select>
            </div>

            <div className="form-group">
              <label>Día*</label>
              <select className="form-select">
                <option>Lunes</option>
                <option>Martes</option>
                <option>Miércoles</option>
              </select>
            </div>

            <div className="form-group">
              <label>Hora*</label>
              <input type="text" className="form-control" placeholder="09:00 - 10:30" />
            </div>

            <div className="form-group">
              <label>Estado*</label>
              <select className="form-select">
                <option>Disponible</option>
                <option>Lleno</option>
              </select>
            </div>

            <div className="modal-footer" style={{marginTop: '2rem', paddingTop: '0'}}>
              <div className="footer-buttons" style={{width: '100%'}}>
                <button className="btn-cancel" style={{width: '50%'}} onClick={() => setIsAddScheduleModalOpen(false)}>Cancelar</button>
                <button className="btn-confirm-blue" style={{width: '50%'}} onClick={() => setIsAddScheduleModalOpen(false)}>Añadir horario</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal: Seleccionar Acción (Al darle clic al cuadro rojo) */}
      {actionModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-action-content">
            <div className="modal-header">
              <h3>Seleccionar acción</h3>
              <button className="close-btn" onClick={() => setActionModal({ isOpen: false, data: null })}>×</button>
            </div>
            
            <p className="action-subtitle">¿Qué deseas hacer con este horario?</p>
            
            <div className="schedule-info-box">
              <div className="info-header">
                <CalendarIcon /> Datos del horario
              </div>
              
              <div className="info-row">
                <span>Curso:</span>
                <strong>{actionModal.data?.curso}</strong>
              </div>
              <div className="info-row">
                <span>Profesor:</span>
                <strong>{actionModal.data?.profesor}</strong>
              </div>
              <div className="info-row">
                <span>Día:</span>
                <strong>{actionModal.data?.dia}</strong>
              </div>
              <div className="info-row">
                <span>Hora:</span>
                <strong>{actionModal.data?.hora}</strong>
              </div>
            </div>

            <button className="btn-action-blue" onClick={() => setActionModal({ isOpen: false, data: null })}>
              <EditIconWhite /> Modificar horario
            </button>
            <button className="btn-action-red" onClick={() => setActionModal({ isOpen: false, data: null })}>
              <TrashIconRed /> Eliminar horario
            </button>
          </div>
        </div>
      )}

    </div>
  );
};