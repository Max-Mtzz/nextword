import React from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import nextWordLogo from '../assets/nextword.png';
import './DashboardLayout.css';

export const DashboardLayout = ({ children, role, activeView, setActiveView, onLogoutClick }) => {
  return (
    <div className="dashboard-container">
      <Sidebar 
        role={role} 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onLogoutClick={onLogoutClick} 
      />

      <main className="dashboard-content">
        <img src={nextWordLogo} alt="NextWord Logo" className="dashboard-content-logo" />
        
        {/* Aquí se inyectará el contenido de la vista actual (main, courses, users, etc.) */}
        {children}
      </main>
    </div>
  );
};