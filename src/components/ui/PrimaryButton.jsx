import React from 'react';
import './PrimaryButton.css'; // Mueve aquí el CSS de .login-button

export const PrimaryButton = ({ children, type = 'button', onClick, className = '' }) => {
  return (
    <button type={type} onClick={onClick} className={`primary-button ${className}`}>
      {children}
    </button>
  );
};