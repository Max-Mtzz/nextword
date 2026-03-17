import React from 'react';
import './InputField.css'; // Mueve aquí el CSS de .input-group que tenías en Login.css

export const InputField = ({ label, type = 'text', name, value, onChange, placeholder, required = true }) => {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder} 
        required={required}
      />
    </div>
  );
};