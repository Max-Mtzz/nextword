import React from 'react';
import './AuthLayout.css';
import logo from '../assets/nextword.png'; // Importamos tu nuevo logo

export const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      {/* Etiqueta de la imagen con su clase */}
      <img src={logo} alt="NextWord Logo" className="auth-logo" />
      
      <div className="auth-content">
        {children}
      </div>
    </div>
  );
};