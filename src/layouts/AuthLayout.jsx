import React from 'react';
import './AuthLayout.css';

export const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      {/* Tu SVG de olas irá como fondo de este contenedor en el CSS */}
      <div className="auth-content">
        {children}
      </div>
    </div>
  );
};