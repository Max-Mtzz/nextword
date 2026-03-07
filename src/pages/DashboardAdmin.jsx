import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardAdmin.css';
import nextWordLogo from '../assets/nextword.png';
// Importamos todos los íconos (asegúrate de que los nombres coincidan exactamente)
import homeIcon from '../assets/home_icon.svg';
import bookIcon from '../assets/book_icon.svg';
import settingsIcon from '../assets/settings_icon.svg';
import logoutIcon from '../assets/logout_icon.svg';
import hatIcon from '../assets/hat_icon.svg';
import pencilIcon from '../assets/pencil_icon.svg';
import bookIcon2 from '../assets/book_icon_2.svg';

export const DashboardAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(false);
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      
      {/* Barra Lateral */}
      <aside className="sidebar">
        {/* 2. REEMPLAZA EL CONTENIDO DE ESTE DIV */}
        <div className="sidebar-logo">
          {/* Ponemos la imagen y quitamos el texto antiguo */}
          <img src={nextWordLogo} alt="NextWord Logo" className="sidebar-logo-img" />
        </div>

        <div className="sidebar-menu">
          <div className="sidebar-link active">
            <img src={homeIcon} alt="Inicio" /> <span>Página principal</span>
          </div>
          <div className="sidebar-link">
            <img src={bookIcon} alt="Cursos" /> <span>Gestionar Cursos</span>
          </div>
          <div className="sidebar-link">
            <img src={settingsIcon} alt="Usuarios" /> <span>Gestionar Usuarios</span>
          </div>
        </div>

        {/* Botón de cerrar sesión al fondo */}
        <div className="sidebar-link" onClick={() => setIsModalOpen(true)}>
          <img src={logoutIcon} alt="Salir" /> <span>Cerrar sesión</span>
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="dashboard-content">
        <div className="search-container">
          <span>🔍</span>
          <input type="text" placeholder="Buscar configuración..." />
        </div>

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
          <div className="action-card">
            <img src={bookIcon2} alt="Cursos" />
            <span>Cursos</span>
          </div>
        </div>
      </main>

      {/* Modal de confirmación (solo se muestra si isModalOpen es true) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmar cerrar sesión</h3>
            <p>Esta acción cerrara la sesión actual</p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
              <button className="btn-confirm" onClick={handleLogout}>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};