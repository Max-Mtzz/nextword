import React from 'react';
import homeIcon from '../../assets/home_icon.svg';
import bookIcon from '../../assets/book_icon.svg';
import settingsIcon from '../../assets/settings_icon.svg';
import logoutIcon from '../../assets/logout_icon.svg';
import relojIcon from '../../assets/reloj.svg';
import './Sidebar.css';

export const Sidebar = ({ role, activeView, setActiveView, onLogoutClick }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-menu">
        <div className={`sidebar-link ${activeView === 'main' ? 'active' : ''}`} onClick={() => setActiveView('main')}>
          <img src={homeIcon} alt="Inicio" /> <span>Página principal</span>
        </div>

        {/* Menú exclusivo del Administrador */}
        {role === 'admin' && (
          <>
            <div className={`sidebar-link ${(activeView === 'courses' || activeView === 'calendar') ? 'active' : ''}`} onClick={() => setActiveView('courses')}>
              <img src={bookIcon} alt="Cursos" /> <span>Gestionar Cursos</span>
            </div>
            <div className={`sidebar-link ${(activeView === 'users' || activeView === 'students_list' || activeView === 'teachers_list') ? 'active' : ''}`} onClick={() => setActiveView('users')}>
              <img src={settingsIcon} alt="Usuarios" /> <span>Gestionar Usuarios</span>
            </div>
          </>
        )}

        {/* Menú exclusivo del Maestro */}
        {role === 'maestro' && (
          <>
            <div className={`sidebar-link ${(activeView === 'courses' || activeView === 'calendar') ? 'active' : ''}`} onClick={() => setActiveView('courses')}>
              <img src={bookIcon} alt="Cursos" /> <span>Mis Cursos</span>
            </div>
            <div className={`sidebar-link ${activeView === 'assigned_courses' ? 'active' : ''}`} onClick={() => setActiveView('assigned_courses')}>
              <img src={relojIcon} alt="Mis horarios" style={{ width: '22px' }} /> 
              <span>Mis horarios</span>
            </div>
          </>
        )}
      </div>

      <div className="sidebar-link" onClick={onLogoutClick}>
        <img src={logoutIcon} alt="Salir" /> <span>Cerrar sesión</span>
      </div>
    </aside>
  );
};