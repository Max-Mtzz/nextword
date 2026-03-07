import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardAdmin.css';

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
    // Aquí después limpiarías los tokens de Supabase/SpringBoot
    setIsModalOpen(false);
    navigate('/'); // Nos regresa al Login
  };

  return (
    <div className="dashboard-container">
      
      {/* Barra Lateral */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          {/* Si tienes un icono de mundo ponlo aquí, usaré un texto como placeholder */}
          🌎 LANGUAGE PORTAL
        </div>

        <div className="sidebar-menu">
          <div className="sidebar-link active">
            <img src={homeIcon} alt="Inicio" /> Página principal
          </div>
          <div className="sidebar-link">
            <img src={bookIcon} alt="Cursos" /> Gestionar Cursos
          </div>
          <div className="sidebar-link">
            <img src={settingsIcon} alt="Usuarios" /> Gestionar Usuarios
          </div>
        </div>

        {/* Botón de cerrar sesión al fondo */}
        <div className="sidebar-link" onClick={() => setIsModalOpen(true)}>
          <img src={logoutIcon} alt="Salir" /> Cerrar sesión
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