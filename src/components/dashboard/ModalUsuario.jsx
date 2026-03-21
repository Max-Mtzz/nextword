import React, { useState, useEffect } from 'react';
import './ModalUsuario.css'; // Crearemos este archivo en el siguiente paso

// Icono de error en línea (para no tener que importarlo de muchos lados)
const ExclamationIconSmall = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ModalUsuario = ({ isOpen, onClose, onSave, type = 'alumno', mode = 'add', initialData = null }) => {
  // Estado local para guardar lo que se escribe en el formulario
  const [formData, setFormData] = useState({});

  // Si estamos en modo "editar", llenamos el formulario con los datos iniciales
  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData(initialData);
    } else {
      setFormData({}); // Limpiamos si es "añadir"
    }
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Mandamos los datos listos al Dashboard
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-large" style={{ width: type === 'maestro' ? '700px' : '600px' }}>
        <div className="modal-header">
          <h3>{mode === 'add' ? 'Añadir' : 'Editar'} {type}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Fila 1: Nombre y Apellidos (Común para ambos) */}
          <div className="form-row">
            <div className="form-group">
              <label>Nombre*</label>
              <input type="text" name="nombre" className="form-control" defaultValue={initialData?.nombre?.split(' ')[0] || ''} placeholder={type === 'maestro' ? "María" : "Carlos"} required />
            </div>
            <div className="form-group">
              <label>Apellidos*</label>
              <input type="text" name="apellidos" className="form-control" defaultValue={initialData?.nombre?.split(' ').slice(1).join(' ') || ''} placeholder={type === 'maestro' ? "Magdalena Ortiz" : "Ingresa apellidos"} required />
            </div>
          </div>

          {/* Fila 2: Dinámica según el tipo de usuario */}
          {type === 'maestro' ? (
            <div className="form-row">
              <div className="form-group">
                <label>Correo*</label>
                <input type="email" name="correo" className="form-control" defaultValue={initialData?.correo || ''} placeholder="maria.ortiz@idiomas.com" required />
              </div>
              <div className="form-group">
                <label>Teléfono*</label>
                <input type="text" name="telefono" className="form-control" placeholder="+52 55 1234 5678" required />
              </div>
              <div className="form-group">
                <label>Contraseña*</label>
                <input type="password" name="password" className="form-control" placeholder="Ingrese contraseña" />
              </div>
            </div>
          ) : (
            <div className="form-row">
              <div className="form-group">
                <label>Correo*</label>
                <input type="email" name="correo" className="form-control" defaultValue={initialData?.correo || ''} placeholder="carlos.maximiliano@email.com" required />
              </div>
              <div className="form-group">
                <label>Teléfono principal*</label>
                <input type="text" name="telefono" className="form-control" placeholder="+52 55 1234 5678" required />
              </div>
            </div>
          )}

          {/* Fila 3: Solo Alumnos */}
          {type === 'alumno' && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Teléfono de emergencia*</label>
                  <input type="text" name="telefonoEmergencia" className="form-control" placeholder="+52 55 1234 5678" required />
                </div>
                <div className="form-group">
                  <label>Fecha de nacimiento</label>
                  <input type="text" name="fechaNac" className="form-control" defaultValue={initialData?.fechaNac || ''} placeholder="DD/MM/AAAA" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Género*</label>
                  <select name="genero" className="form-select">
                    <option value="">Selecciona una opción</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Femenino">Femenino</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Contraseña*</label>
                  <input type="password" name="password" className="form-control" placeholder="Ingresa contraseña" />
                </div>
              </div>
            </>
          )}

          {/* Fila 3: Solo Maestros */}
          {type === 'maestro' && (
            <div className="form-group">
              <label>Curso que imparte*</label>
              <select name="curso" className="form-select" required>
                <option value="">Selecciona una opción</option>
                <option value="Inglés">Inglés</option>
                <option value="Chino">Chino</option>
              </select>
            </div>
          )}

          <div className="modal-footer" style={{ marginTop: '2rem', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span className="required-text" style={{ marginBottom: '1rem' }}>Los campos marcados con (*) son obligatorios</span>
            <div className="footer-buttons" style={{ width: '100%', display: 'flex', gap: '10px' }}>
              <button type="button" className="btn-cancel" style={{ flex: 1 }} onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn-confirm-blue" style={{ flex: 1 }}>Confirmar</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};