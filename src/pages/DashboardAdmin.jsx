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

// === NUEVOS ÍCONOS PARA EL MODAL ===
import nubeIcon from '../assets/nube.svg';
import imagenIcon from '../assets/imagen.svg';
import boteBasuraIcon from '../assets/bote_basura.svg';
import recargarIcon from '../assets/recargar.svg';

const cursosData = [
  
  { id: 2, nombre: 'Chino', flag: chinaIcon }
  
];

export const DashboardAdmin = () => {
  const [activeView, setActiveView] = useState('main'); 
  const [openMenuId, setOpenMenuId] = useState(null);
  
  // ESTADOS PARA LOS MODALES
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal de cerrar sesión
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // NUEVO: Modal de añadir curso

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

  // VISTA A: Página Principal
  const renderMainContent = () => (
    <>
      <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
      <h2 className="section-title">Acciones Rápidas</h2>
      <div className="quick-actions">
        <div className="action-card">
          <img src={hatIcon} alt="Alumnos" />
          <span>Alumnos</span>
        </div>
        <div className="action-card">
          <img src={pencilIcon} alt="Maestros" />
          <span>Maestros</span>
        </div>
        <div className="action-card" onClick={() => setActiveView('courses')}>
          <img src={bookIcon2} alt="Cursos" />
          <span>Cursos</span>
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
        {/* Agregamos el onClick para abrir el nuevo modal */}
        <button className="btn-add" onClick={() => setIsAddModalOpen(true)}>+ Añadir</button>
      </div>

      <div className="courses-grid">
        {cursosData.map((curso) => (
          <div className="course-card-simple" key={curso.id}>
            <button className="dots-btn-simple" onClick={(e) => toggleMenu(e, curso.id)}>
              <img src={menuIcon} alt="Opciones" />
            </button>
            {openMenuId === curso.id && (
              <div className="dropdown-simple">
                <button className="dropdown-item-text">Editar</button>
                <button className="dropdown-item-text">Eliminar</button>
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

  return (
    <div className="dashboard-container" onClick={closeDropdown}>
      <aside className="sidebar">
        <div className="sidebar-menu">
          <div className={`sidebar-link ${activeView === 'main' ? 'active' : ''}`} onClick={() => setActiveView('main')}>
            <img src={homeIcon} alt="Inicio" /> <span>Página principal</span>
          </div>
          <div className={`sidebar-link ${activeView === 'courses' ? 'active' : ''}`} onClick={() => setActiveView('courses')}>
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
        {activeView === 'main' ? renderMainContent() : renderCoursesContent()}
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

      {/* === NUEVO MODAL: AÑADIR CURSO === */}
      {isAddModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content-large">
            
            <div className="modal-header">
              <h3>Añadir Curso</h3>
              <button className="close-btn" onClick={() => setIsAddModalOpen(false)}>×</button>
            </div>

            <div className="form-group">
              <label>Nombre del curso*</label>
              <input type="text" className="form-control" placeholder="Nombre del curso" />
            </div>

            <div className="form-group">
              <label>Imagen representativa del curso*</label>
              
              {/* Caja de subida */}
              <div className="upload-area">
                <img src={nubeIcon} alt="Subir" className="nube-icon" />
                <p>Arrastra y suelta tu imagen aquí<br/>o haz clic para seleccionar</p>
                <button className="upload-btn">
                  <img src={imagenIcon} alt="Icono imagen" style={{width: '16px'}} />
                  Subir imagen
                </button>
              </div>
              <p className="format-text">Formatos aceptados: JPG, PNG.</p>

              {/* Caja de vista previa (tal como en tu diseño) */}
              <label>Vista previa</label>
              <div className="preview-area">
                {/* Cuadro gris simulando la imagen subida */}
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

    </div>
  );
};