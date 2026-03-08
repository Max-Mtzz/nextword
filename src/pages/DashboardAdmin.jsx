import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardAdmin.css';

// Importaciones
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

const cursosData = [
  
  { id: 2, nombre: 'Chino', flag: chinaIcon }
  
];

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const horasDia = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'];

export const DashboardAdmin = () => {
  const [activeView, setActiveView] = useState('main'); 
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // ESTADOS MODALES
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  
  // ESTADOS PARA ELIMINAR
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, step: 1, courseId: null });
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState(false);

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

  // FUNCIONES PARA ELIMINAR
  const openDeleteFlow = (courseId) => {
    setOpenMenuId(null);
    setDeleteModal({ isOpen: true, step: 1, courseId: courseId });
    setDeletePassword('');
    setDeleteError(false);
  };

  const handleNextDeleteStep = () => {
    setDeleteModal({ ...deleteModal, step: 2 });
  };

  const handleConfirmDelete = () => {
    if (deletePassword !== '1234') {
      setDeleteError(true);
      return;
    }
    console.log("Curso eliminado con ID:", deleteModal.courseId);
    setDeleteModal({ isOpen: false, step: 1, courseId: null });
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, step: 1, courseId: null });
  };

  const courseToDelete = cursosData.find(c => c.id === deleteModal.courseId);

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
                <button className="dropdown-item-text" onClick={(e) => { e.stopPropagation(); openDeleteFlow(curso.id); }}>Eliminar</button>
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
          <button className="btn-add" style={{marginTop: '1.5rem'}}>+ Añadir</button>
        </div>
        
        <button className="btn-back" onClick={goBackToCourses}>
          {'<'} Atrás
        </button>
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
                const isEvent = dia === 'Domingo' && hora === '8 AM';
                return (
                  <div className="cal-cell" key={`${hora}-${dia}`}>
                    {isEvent && (
                      <div 
                        className="cal-event-block" 
                        onClick={() => alert(`Próximamente abriremos el detalle de la clase de ${selectedCourse?.nombre} el ${dia} a las ${hora}.`)}
                      >
                        8 AM - 9 AM
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

      {/* === MODAL DE CERRAR SESIÓN === */}
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

      {/* === MODAL AÑADIR CURSO === */}
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
                  <img src={imagenIcon} alt="Icono imagen" style={{width: '16px'}} />
                  Subir imagen
                </button>
              </div>
              <p className="format-text">Formatos aceptados: JPG, PNG.</p>
              <label>Vista previa</label>
              <div className="preview-area">
                <div className="preview-thumbnail"></div>
                <div className="preview-actions">
                  <button className="action-btn btn-replace">
                    <img src={recargarIcon} alt="Reemplazar" style={{width: '16px'}} />
                    Reemplazar
                  </button>
                  <button className="action-btn btn-delete">
                    <img src={boteBasuraIcon} alt="Eliminar" style={{width: '16px'}} />
                    Eliminar
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

      {/* === MODAL DE ELIMINAR CURSO === */}
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
                  <strong>{courseToDelete?.nombre}</strong>
                </div>

                <div className="modal-buttons">
                  <button className="btn-cancel-delete" onClick={cancelDelete}>Cancelar</button>
                  <button className="btn-confirm-red" onClick={handleNextDeleteStep}>Eliminar</button>
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
                    onChange={(e) => {
                      setDeletePassword(e.target.value);
                      setDeleteError(false);
                    }}
                  />
                  
                  {deleteError && (
                    <div className="error-msg-box">
                      <img src={alertaIcon} alt="Error" />
                      Contraseña incorrecta. Intenta nuevamente.
                    </div>
                  )}
                </div>

                <div className="modal-buttons" style={{marginTop: '2rem'}}>
                  <button className="btn-cancel-delete" onClick={cancelDelete}>Cancelar</button>
                  <button className="btn-confirm-red" onClick={handleConfirmDelete}>Confirmar<br/>eliminación</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};