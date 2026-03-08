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
import lapizIcon from '../assets/lapiz.svg';
import ojoIcon from '../assets/ojo.svg';

// SVGs en línea
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

// Bases de datos simuladas
const cursosData = [
  { id: 1, nombre: 'Inglés', flag: null }, { id: 2, nombre: 'Chino', flag: chinaIcon },
  { id: 3, nombre: 'Portugués', flag: null }, { id: 4, nombre: 'Alemán', flag: null },
  { id: 5, nombre: 'Japonés', flag: null }, { id: 6, nombre: 'Coreano', flag: null },
];

const alumnosData = [
  { id: 1, nombre: 'Jorge Noé Morales Cárdenas', correo: 'jorgenoe@example.com', fechaNac: '12/06/2000', cursos: 'Inglés, Chino' },
  { id: 2, nombre: 'Samuel Rivera Robles', correo: 'samrobles@example.com', fechaNac: '12/06/2002', cursos: 'Alemán' }
];

const maestrosData = [
  { id: 1, nombre: 'Diego Salazar', correo: 'diego.salazar@idiomas.com', fechaNac: '15/03/1985', cursos: 'Inglés, Chino' },
  { id: 2, nombre: 'María Magdalena Ortiz', correo: 'maria.ortiz@idiomas.com', fechaNac: '22/08/1990', cursos: 'Portugués' }
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

  // ESTADOS MODALES DE CALENDARIO
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState({ isOpen: false, data: null });
  const [editScheduleModal, setEditScheduleModal] = useState({ isOpen: false, data: null });
  const [deleteScheduleModal, setDeleteScheduleModal] = useState({ isOpen: false, step: 1, data: null });

  // ESTADOS MODALES DE USUARIOS
  const [userForm, setUserForm] = useState({ isOpen: false, type: 'alumno', mode: 'add', data: null });
  const [deleteUser, setDeleteUser] = useState({ isOpen: false, step: 1, type: 'alumno', data: null });

  const navigate = useNavigate();

  const handleLogout = () => { setIsModalOpen(false); navigate('/'); };
  const closeDropdown = () => { if (openMenuId !== null) setOpenMenuId(null); };
  const toggleMenu = (e, id) => { e.stopPropagation(); setOpenMenuId(openMenuId === id ? null : id); };
  const openCalendarView = (curso) => { setSelectedCourse(curso); setActiveView('calendar'); };
  const goBackToCourses = () => { setActiveView('courses'); setSelectedCourse(null); };

  // VISTA A: Página Principal
  const renderMainContent = () => (
    <>
      <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
      <h2 className="section-title">Acciones Rápidas</h2>
      <div className="quick-actions">
        <div className="action-card" onClick={() => setActiveView('students_list')}>
          <img src={hatIcon} alt="Alumnos" /><span>Alumnos</span>
        </div>
        <div className="action-card" onClick={() => setActiveView('teachers_list')}>
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
                  e.stopPropagation(); setOpenMenuId(null); setDeletePassword(''); setDeleteError(false); setDeleteModal({ isOpen: true, step: 1, courseId: curso.id });
                }}>Eliminar</button>
              </div>
            )}
            {curso.flag ? <img src={curso.flag} alt={`Bandera ${curso.nombre}`} className="course-flag" /> : <div className="course-flag" style={{ background: '#cbd5e1' }}></div>}
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
          <div className="breadcrumbs">Gestionar cursos {'>'} Idiomas {'>'} <strong>{selectedCourse?.nombre}</strong></div>
          <div className="calendar-title-container">
            <h2>{selectedCourse?.nombre} - Horarios disponibles</h2>
            {selectedCourse?.flag && <img src={selectedCourse.flag} alt="Bandera" className="calendar-title-flag" />}
          </div>
          <button className="btn-add" style={{marginTop: '1.5rem'}} onClick={() => setIsAddScheduleModalOpen(true)}>+ Añadir</button>
        </div>
        <button className="btn-back" onClick={goBackToCourses}>{'<'} Atrás</button>
      </div>

      <div className="calendar-wrapper">
        <div className="calendar-grid">
          <div className="cal-header-cell" style={{background: 'white', borderBottom: 'none'}}></div>
          {diasSemana.map((dia) => (<div className="cal-header-cell" key={dia}>{dia}</div>))}
          {horasDia.map((hora) => (
            <React.Fragment key={hora}>
              <div className="cal-time-cell">{hora}</div>
              {diasSemana.map((dia) => {
                const isEvent = dia === 'Domingo' && hora === '8 AM';
                const horaFin = hora === '8 AM' ? '9 AM' : '10 AM'; 
                return (
                  <div className="cal-cell" key={`${hora}-${dia}`}>
                    {isEvent && (
                      <div className="cal-event-block" onClick={() => setActionModal({ isOpen: true, data: { curso: selectedCourse?.nombre, profesor: 'Diego Salazar', dia: dia, hora: `${hora} - ${horaFin}` } })}>
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

  // VISTA D: GESTIÓN DE USUARIOS
  const renderUsersContent = () => (
    <>
      <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
      <span className="courses-subtitle" style={{display: 'block', marginBottom: '1.5rem', fontWeight: 'bold'}}>Usuarios:</span>
      <div className="quick-actions">
        <div className="action-card" onClick={() => setActiveView('teachers_list')}>
          <img src={pencilIcon} alt="Maestros" /><span>Maestros</span>
        </div>
        <div className="action-card" onClick={() => setActiveView('students_list')}>
          <img src={hatIcon} alt="Alumnos" /><span>Alumnos</span>
        </div>
      </div>
    </>
  );

  // VISTA E: LISTA DE ALUMNOS
  const renderStudentsListContent = () => (
    <>
      <div className="calendar-top-bar">
        <div style={{width: '100%'}}>
          <div className="breadcrumbs">Gestionar usuarios {'>'} <strong>Alumnos</strong></div>
          <div className="calendar-title-container" style={{marginBottom: '1.5rem'}}>
            <h2>Alumnos - Usuarios registrados</h2>
          </div>
          <div className="users-filter-bar">
            <div className="filter-group"><label>Alumno:</label><select><option>Todos</option></select></div>
            <div className="filter-group"><label>Edad:</label><select><option></option></select></div>
            <div className="filter-group"><label>Estado:</label><select><option>Todos</option></select></div>
            <button className="btn-filter">Filtrar</button>
          </div>
          <button className="btn-add" onClick={() => setUserForm({ isOpen: true, type: 'alumno', mode: 'add', data: null })}>+ Añadir</button>
        </div>
        <button className="btn-back" onClick={() => setActiveView('users')} style={{flexShrink: 0}}>{'<'} Atrás</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Nombre</th><th>Correo</th><th>Fecha de nacimiento</th><th>Acciones</th></tr></thead>
          <tbody>
            {alumnosData.map(alumno => (
              <tr key={alumno.id}>
                <td>{alumno.nombre}</td><td>{alumno.correo}</td><td>{alumno.fechaNac}</td>
                <td>
                  <div className="table-actions">
                    <button className="action-icon-btn" onClick={() => setUserForm({ isOpen: true, type: 'alumno', mode: 'edit', data: alumno })}>
                      <img src={lapizIcon} alt="Editar" />
                    </button>
                    <button className="action-icon-btn"><img src={ojoIcon} alt="Ver" /></button>
                    <button className="action-icon-btn" onClick={() => { setDeletePassword(''); setDeleteError(false); setDeleteUser({ isOpen: true, step: 1, type: 'alumno', data: alumno }); }}>
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

  // VISTA F: LISTA DE MAESTROS
  const renderTeachersListContent = () => (
    <>
      <div className="calendar-top-bar">
        <div style={{width: '100%'}}>
          <div className="breadcrumbs">Gestionar usuarios {'>'} <strong>Maestros</strong></div>
          <div className="calendar-title-container" style={{marginBottom: '1.5rem'}}>
            <h2>Maestros - Usuarios registrados</h2>
          </div>
          <div className="users-filter-bar">
            <div className="filter-group"><label>Maestro:</label><select><option>Todos</option></select></div>
            <div className="filter-group"><label>Estado:</label><select><option>Todos</option></select></div>
            <button className="btn-filter">Filtrar</button>
          </div>
          <button className="btn-add" onClick={() => setUserForm({ isOpen: true, type: 'maestro', mode: 'add', data: null })}>+ Añadir</button>
        </div>
        <button className="btn-back" onClick={() => setActiveView('users')} style={{flexShrink: 0}}>{'<'} Atrás</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead><tr><th>Nombre</th><th>Correo</th><th>Fecha de nacimiento</th><th>Acciones</th></tr></thead>
          <tbody>
            {maestrosData.map(maestro => (
              <tr key={maestro.id}>
                <td>{maestro.nombre}</td><td>{maestro.correo}</td><td>{maestro.fechaNac}</td>
                <td>
                  <div className="table-actions">
                    <button className="action-icon-btn" onClick={() => setUserForm({ isOpen: true, type: 'maestro', mode: 'edit', data: maestro })}>
                      <img src={lapizIcon} alt="Editar" />
                    </button>
                    <button className="action-icon-btn"><img src={ojoIcon} alt="Ver" /></button>
                    <button className="action-icon-btn" onClick={() => { setDeletePassword(''); setDeleteError(false); setDeleteUser({ isOpen: true, step: 1, type: 'maestro', data: maestro }); }}>
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
    <div className="dashboard-container" onClick={closeDropdown}>
      <aside className="sidebar">
        <div className="sidebar-menu">
          <div className={`sidebar-link ${activeView === 'main' ? 'active' : ''}`} onClick={() => setActiveView('main')}>
            <img src={homeIcon} alt="Inicio" /> <span>Página principal</span>
          </div>
          <div className={`sidebar-link ${(activeView === 'courses' || activeView === 'calendar') ? 'active' : ''}`} onClick={() => { setActiveView('courses'); setSelectedCourse(null); }}>
            <img src={bookIcon} alt="Cursos" /> <span>Gestionar Cursos</span>
          </div>
          <div className={`sidebar-link ${(activeView === 'users' || activeView === 'students_list' || activeView === 'teachers_list') ? 'active' : ''}`} onClick={() => setActiveView('users')}>
            <img src={settingsIcon} alt="Usuarios" /> <span>Gestionar Usuarios</span>
          </div>
        </div>
        <div className="sidebar-link" onClick={() => setIsModalOpen(true)}>
          <img src={logoutIcon} alt="Salir" /> <span>Cerrar sesión</span>
        </div>
      </aside>

      <main className="dashboard-content">
        <img src={nextWordLogo} alt="NextWord Logo" className="dashboard-content-logo" />
        
        {/* RENDERIZADO DINÁMICO DE VISTAS */}
        {activeView === 'main' && renderMainContent()}
        {activeView === 'courses' && renderCoursesContent()}
        {activeView === 'calendar' && renderCalendarContent()}
        {activeView === 'users' && renderUsersContent()}
        {activeView === 'students_list' && renderStudentsListContent()}
        {activeView === 'teachers_list' && renderTeachersListContent()}
      </main>

      {/* ========================================================= */}
      {/* MODALES ANTIGUOS (CERRAR SESIÓN, CURSOS Y HORARIOS) */}
      {/* ========================================================= */}
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

      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-large">
            <div className="modal-header"><h3>Añadir Curso</h3><button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button></div>
            <div className="form-group"><label>Nombre del curso*</label><input type="text" className="form-control" placeholder="Inglés Intermedio B1" /></div>
            <div className="form-group">
              <label>Imagen representativa del curso*</label>
              <div className="upload-area">
                <img src={nubeIcon} alt="Subir" className="nube-icon" /><p>Arrastra y suelta tu imagen aquí<br/>o haz clic para seleccionar</p>
                <button className="upload-btn"><img src={imagenIcon} alt="Icono imagen" style={{width: '16px'}} /> Subir imagen</button>
              </div>
              <p className="format-text">Formatos aceptados: JPG, PNG.</p>
              <label>Vista previa</label>
              <div className="preview-area">
                <div className="preview-thumbnail"></div>
                <div className="preview-actions">
                  <button className="action-btn btn-replace"><img src={recargarIcon} alt="Reemplazar" style={{width: '16px'}} /> Reemplazar</button>
                  <button className="action-btn btn-delete"><img src={boteBasuraIcon} alt="Eliminar" style={{width: '16px'}} /> Eliminar</button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <span className="required-text">Los campos marcados con (*) son obligatorios</span>
              <div className="footer-buttons"><button className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>Cancelar</button><button className="btn-confirm-blue" onClick={() => setIsAddModalOpen(false)}>Confirmar</button></div>
            </div>
          </div>
        </div>
      )}

      {deleteModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-delete-content">
            {deleteModal.step === 1 && (
              <>
                <img src={alertaIcon} alt="Alerta" className="alert-icon" /><h3 className="delete-title">¿Estás seguro de que deseas eliminar este curso?</h3><p className="delete-subtitle">Esta acción no se puede deshacer.</p>
                <div className="course-to-delete"><span>Curso:</span><strong>{cursosData.find(c => c.id === deleteModal.courseId)?.nombre}</strong></div>
                <div className="modal-buttons"><button className="btn-cancel-delete" onClick={() => setDeleteModal({ isOpen: false, step: 1, courseId: null })}>Cancelar</button><button className="btn-confirm-red" onClick={() => setDeleteModal({ ...deleteModal, step: 2 })}>Eliminar</button></div>
              </>
            )}
            {deleteModal.step === 2 && (
              <>
                <h3 className="delete-title">Confirmar eliminación</h3><p className="delete-subtitle">Por favor, ingresa tu contraseña para confirmar esta acción.</p>
                <div className="password-group">
                  <label>Contraseña*</label><input type="password" className="form-control" placeholder="........" value={deletePassword} onChange={(e) => { setDeletePassword(e.target.value); setDeleteError(false); }} />
                  {deleteError && (<div className="error-msg-box"><img src={alertaIcon} alt="Error" /> Contraseña incorrecta. Intenta nuevamente.</div>)}
                </div>
                <div className="modal-buttons" style={{marginTop: '2rem'}}>
                  <button className="btn-cancel-delete" onClick={() => setDeleteModal({ isOpen: false, step: 1, courseId: null })}>Cancelar</button>
                  <button className="btn-confirm-red" onClick={() => { if (deletePassword !== '1234') { setDeleteError(true); return; } setDeleteModal({ isOpen: false, step: 1, courseId: null }); }}>Confirmar<br/>eliminación</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isAddScheduleModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-large" style={{width: '450px'}}>
            <div className="modal-header"><h3>Añadir horario</h3><button className="close-btn" onClick={() => setIsAddScheduleModalOpen(false)}>×</button></div>
            <div className="form-group"><label>Profesor*</label><select className="form-select"><option>Diego Salazar</option><option>Guillermo Corro</option></select></div>
            <div className="form-group"><label>Día*</label><select className="form-select"><option>Lunes</option><option>Martes</option><option>Miércoles</option></select></div>
            <div className="form-group"><label>Hora*</label><input type="text" className="form-control" placeholder="09:00 - 10:30" /></div>
            <div className="form-group"><label>Estado*</label><select className="form-select"><option>Disponible</option><option>Lleno</option></select></div>
            <div className="modal-footer" style={{marginTop: '2rem', paddingTop: '0'}}>
              <span className="required-text" style={{display: 'block', marginBottom: '1rem'}}>Los campos marcados con (*) son obligatorios</span>
              <div className="footer-buttons" style={{width: '100%'}}><button className="btn-cancel" style={{width: '50%'}} onClick={() => setIsAddScheduleModalOpen(false)}>Cancelar</button><button className="btn-confirm-blue" style={{width: '50%'}} onClick={() => setIsAddScheduleModalOpen(false)}>Añadir horario</button></div>
            </div>
          </div>
        </div>
      )}

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

      {editScheduleModal.isOpen && (
        <div className="modal-overlay">
          <div className="modal-content-large" style={{width: '450px'}}>
            <div className="modal-header"><h3>Editar horario</h3><button className="close-btn" onClick={() => setEditScheduleModal({ isOpen: false, data: null })}>×</button></div>
            <div className="form-group"><label>Profesor*</label><select className="form-select" defaultValue={editScheduleModal.data?.profesor}><option value="Diego Salazar">Diego Salazar</option><option value="Guillermo Corro">Guillermo Corro</option></select></div>
            <div className="form-group"><label>Día*</label><select className="form-select" defaultValue={editScheduleModal.data?.dia}><option value="Domingo">Domingo</option><option value="Lunes">Lunes</option></select></div>
            <div className="form-group"><label>Hora*</label><input type="text" className="form-control" defaultValue={editScheduleModal.data?.hora} /></div>
            <div className="form-group"><label>Estado*</label><select className="form-select" defaultValue="Disponible"><option value="Disponible">Disponible</option><option value="Lleno">Lleno</option></select></div>
            <div className="modal-footer" style={{marginTop: '2rem', paddingTop: '0'}}>
              <span className="required-text" style={{display: 'block', marginBottom: '1rem', textAlign: 'left', width: '100%'}}>Los campos marcados con (*) son obligatorios</span>
              <div className="footer-buttons" style={{width: '100%'}}><button className="btn-cancel" style={{width: '50%'}} onClick={() => setEditScheduleModal({ isOpen: false, data: null })}>Cancelar</button><button className="btn-confirm-blue" style={{width: '50%'}} onClick={() => setEditScheduleModal({ isOpen: false, data: null })}>Guardar cambios</button></div>
            </div>
          </div>
        </div>
      )}

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

      {/* ========================================================= */}
      {/* === NUEVOS MODALES: GESTIÓN DE USUARIOS ACTUALIZADOS === */}
      {/* ========================================================= */}
      
      {userForm.isOpen && (
        <div className="modal-overlay">
          {/* Si es maestro lo hacemos un poco más ancho (700px) para que quepan las 3 columnas cómodamente */}
          <div className="modal-content-large" style={{width: userForm.type === 'maestro' ? '700px' : '600px'}}>
            <div className="modal-header">
              <h3>{userForm.mode === 'add' ? 'Añadir' : 'Editar'} {userForm.type}</h3>
              <button className="close-btn" onClick={() => setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null })}>×</button>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Nombre*</label>
                <input type="text" className="form-control" defaultValue={userForm.data?.nombre?.split(' ')[0] || ''} placeholder={userForm.type === 'maestro' ? "María" : "Carlos"} />
              </div>
              <div className="form-group">
                <label>Apellidos*</label>
                <input type="text" className="form-control" defaultValue={userForm.data?.nombre?.split(' ').slice(1).join(' ') || ''} placeholder={userForm.type === 'maestro' ? "Magdalena Ortiz" : "Ingresa apellidos"} />
              </div>
            </div>

            {/* Renderizado condicional de la fila del medio */}
            {userForm.type === 'maestro' ? (
              <div className="form-row">
                <div className="form-group">
                  <label>Correo*</label>
                  <input type="email" className="form-control input-success" defaultValue={userForm.data?.correo || ''} placeholder="maria.ortiz@idiomas.com" />
                </div>
                <div className="form-group">
                  <label>Teléfono*</label>
                  <input type="text" className="form-control input-error" defaultValue="+52 55 1234" />
                  <span className="error-text-small"><ExclamationIconSmall /> Formato inválido. Debe contener 10 dígitos</span>
                </div>
                {/* Nuevo campo de Contraseña para Maestro en la misma fila */}
                <div className="form-group">
                  <label>Contraseña*</label>
                  <input type="password" className="form-control" placeholder="Ingrese una contraseña" />
                </div>
              </div>
            ) : (
              <div className="form-row">
                <div className="form-group">
                  <label>Correo*</label>
                  <input type="email" className="form-control input-success" defaultValue={userForm.data?.correo || ''} placeholder="carlos.maximiliano@email.com" />
                </div>
                <div className="form-group">
                  <label>Teléfono principal*</label>
                  <input type="text" className="form-control input-error" defaultValue="+52 55 1234" />
                  <span className="error-text-small"><ExclamationIconSmall /> Formato inválido. Debe contener 10 dígitos</span>
                </div>
              </div>
            )}

            {/* Campos exclusivos para ALUMNOS */}
            {userForm.type === 'alumno' && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Teléfono de emergencia*</label>
                    <input type="text" className="form-control" placeholder="+52 55 1234 5678" />
                  </div>
                  <div className="form-group">
                    <label>Fecha de nacimiento</label>
                    <input type="text" className="form-control" defaultValue={userForm.data?.fechaNac || ''} placeholder="DD/MM/AAAA" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Género</label>
                    <select className="form-select">
                      <option>Selecciona una opción</option>
                    </select>
                  </div>
                  {/* Nuevo campo de Contraseña para Alumno al lado del Género */}
                  <div className="form-group">
                    <label>Contraseña*</label>
                    <input type="password" className="form-control" placeholder="Ingresa una contraseña" />
                  </div>
                </div>
              </>
            )}

            {/* Campos exclusivos para MAESTROS */}
            {userForm.type === 'maestro' && (
              <div className="form-group">
                <label>Curso que imparte*</label>
                <select className="form-select">
                  <option>Selecciona una opción</option>
                  <option>Inglés</option>
                </select>
              </div>
            )}

            <div className="modal-footer" style={{marginTop: '2rem', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
              <span className="required-text" style={{marginBottom: '1rem'}}>Los campos marcados con (*) son obligatorios</span>
              <div className="footer-buttons" style={{width: '100%', display: 'flex', gap: '10px'}}>
                <button className="btn-cancel" style={{flex: 1}} onClick={() => setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null })}>Cancelar</button>
                <button className="btn-confirm-blue" style={{flex: 1}} onClick={() => setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null })}>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Eliminar Usuario (Alumno/Maestro) */}
      {deleteUser.isOpen && (
        <div className="modal-overlay">
          <div className="modal-delete-content">
            {deleteUser.step === 1 && (
              <>
                <img src={alertaIcon} alt="Alerta" className="alert-icon" />
                <h3 className="delete-title">¿Estás seguro de que deseas eliminar este usuario?</h3>
                <p className="delete-subtitle">Esta acción no se puede deshacer.</p>
                <div className="delete-user-details">
                  <div className="info-row"><span>Nombre:</span><strong>{deleteUser.data?.nombre}</strong></div>
                  <div className="info-row"><span>Rol:</span><strong>{deleteUser.type === 'alumno' ? 'Alumno' : 'Maestro'}</strong></div>
                  <div className="info-row"><span>Cursos:</span><strong>{deleteUser.data?.cursos}</strong></div>
                </div>
                <div className="modal-buttons">
                  <button className="btn-cancel-delete" onClick={() => setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null })}>Cancelar</button>
                  <button className="btn-confirm-red" onClick={() => setDeleteUser({ ...deleteUser, step: 2 })}>Eliminar</button>
                </div>
              </>
            )}
            {deleteUser.step === 2 && (
              <>
                <h3 className="delete-title">Confirmar eliminación</h3>
                <p className="delete-subtitle">Por favor, ingresa tu contraseña para confirmar esta acción.</p>
                <div className="password-group">
                  <label>Contraseña*</label>
                  <input type="password" className="form-control" placeholder="........" value={deletePassword} onChange={(e) => { setDeletePassword(e.target.value); setDeleteError(false); }} />
                  {deleteError && (<div className="error-msg-box"><img src={alertaIcon} alt="Error" /> Contraseña incorrecta. Intenta nuevamente.</div>)}
                </div>
                <div className="modal-buttons" style={{marginTop: '2rem'}}>
                  <button className="btn-cancel-delete" onClick={() => setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null })}>Cancelar</button>
                  <button className="btn-confirm-red" onClick={() => {
                    if (deletePassword !== '1234') { setDeleteError(true); return; }
                    console.log(`Usuario eliminado: ${deleteUser.data?.nombre}`);
                    setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null });
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