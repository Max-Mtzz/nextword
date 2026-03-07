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
import chinaIcon from '../assets/china_icon.svg';

// IMPORTANTE: Aquí importamos tu nuevo ícono de tres puntos
import menuIcon from '../assets/menu_icon.svg'; 

// Lista de cursos para dibujar las tarjetas dinámicamente.
// NOTA: Cuando tengas los SVGs de las demás banderas (ingles_icon.svg, etc)
// impórtalos arriba y colócalos donde dice "flag: null".
const cursosData = [
  // 2. Quita las comillas y la ruta de texto, usa la variable chinaIcon
  { id: 1, nombre: 'Chino', flag: chinaIcon } 
];

export const DashboardAdmin = () => {
  const [activeView, setActiveView] = useState('main'); 
  
  // Ahora guardamos el ID del menú que está abierto (para que no se abran todos a la vez)
  const [openMenuId, setOpenMenuId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  // Cierra el menú desplegable al hacer clic en cualquier parte de la pantalla
  const closeDropdown = () => {
    if (openMenuId !== null) setOpenMenuId(null);
  };

  // Abre o cierra el menú de una tarjeta en específico
  const toggleMenu = (e, id) => {
    e.stopPropagation(); // Evita que se dispare el closeDropdown del contenedor
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // VISTA A: Página Principal (Acciones Rápidas)
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

  // VISTA B: Gestión de Cursos (Tarjetas de Banderas)
  const renderCoursesContent = () => (
    <>
      <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
      
      <div className="courses-header">
        <span className="courses-subtitle">Cursos:</span>
        <button className="btn-add">+ Añadir</button>
      </div>

      <div className="courses-grid">
        {cursosData.map((curso) => (
          <div className="course-card-simple" key={curso.id}>
            
            {/* Botón de tres puntos con tu SVG */}
            <button className="dots-btn-simple" onClick={(e) => toggleMenu(e, curso.id)}>
              <img src={menuIcon} alt="Opciones" />
            </button>

            {/* Menú Desplegable (Solo se muestra si su ID coincide con el estado) */}
            {openMenuId === curso.id && (
              <div className="dropdown-simple">
                <button className="dropdown-item-text">Editar</button>
                <button className="dropdown-item-text">Eliminar</button>
              </div>
            )}

            {/* Imagen de la Bandera */}
            {curso.flag ? (
              <img src={curso.flag} alt={`Bandera ${curso.nombre}`} className="course-flag" />
            ) : (
              // Un cuadro gris por si aún no tienes importado el SVG de la bandera
              <div className="course-flag" style={{ background: '#cbd5e1' }}></div> 
            )}

            {/* Nombre del idioma */}
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
    </div>
  );
};