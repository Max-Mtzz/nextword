import React, { useState, useEffect } from 'react';
import nubeIcon from '../../assets/nube.svg';
import imagenIcon from '../../assets/imagen.svg';

export const ModalCurso = ({ isOpen, onClose, onSave, mode = 'add', initialData = null }) => {
  const [formData, setFormData] = useState({ nombre: '', imagen: null });

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData(initialData);
    } else {
      setFormData({ nombre: '', imagen: null });
    }
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-large">
        
        <div className="modal-header">
          <h3>{mode === 'add' ? 'Añadir Curso' : 'Editar Curso'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del curso*</label>
            <input 
              type="text" 
              className="form-control" 
              value={formData.nombre || ''}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              placeholder="Ej. Inglés Intermedio B1" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Imagen representativa del curso*</label>
            <div className="upload-area">
              <img src={nubeIcon} alt="Subir" className="nube-icon" />
              <p>Arrastra y suelta tu imagen aquí<br/>o haz clic para seleccionar</p>
              <button type="button" className="upload-btn">
                <img src={imagenIcon} alt="Icono imagen" style={{width: '16px'}} /> Subir imagen
              </button>
            </div>
            <p className="format-text">Formatos aceptados: JPG, PNG.</p>
            
            {/* Aquí después puedes programar que si formData.imagen existe, se muestre el .preview-area que diseñaste */}
          </div>

          <div className="modal-footer">
            <span className="required-text">Los campos marcados con (*) son obligatorios</span>
            <div className="footer-buttons">
              <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn-confirm-blue">Confirmar</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};