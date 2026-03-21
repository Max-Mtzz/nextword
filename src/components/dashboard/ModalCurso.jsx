import React, { useState, useEffect } from 'react';
import './ModalCurso.css';
import nubeIcon from '../../assets/nube.svg';
import imagenIcon from '../../assets/imagen.svg';
// Importa los iconos para los botones de la vista previa
import recargarIcon from '../../assets/recargar.svg';
import basuraIcon from '../../assets/bote_basura.svg';

export const ModalCurso = ({ isOpen, onClose, onSave, mode = 'add', initialData = null }) => {
  const [formData, setFormData] = useState({ nombre: '', imagen: null });
  // Estado para controlar si mostramos la vista previa
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData(initialData);
      // Si estamos editando y ya tiene imagen (ej. la bandera), la mostramos en la vista previa
      setPreviewImage(initialData.flag || null);
    } else {
      setFormData({ nombre: '', imagen: null });
      setPreviewImage(null);
    }
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Función para simular que subimos una imagen
  const handleSimularSubida = () => {
    // Aquí, cuando conectemos, leeremos el archivo real. Por ahora, ponemos una imagen de prueba.
    setPreviewImage('https://flagcdn.com/gb.svg'); // Una bandera de prueba
    setFormData({ ...formData, imagen: 'archivo_simulado.jpg' });
  };

  const handleEliminarImagen = () => {
    setPreviewImage(null);
    setFormData({ ...formData, imagen: null });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-large modal-curso-especifico">
        
        <div className="modal-header">
          <h3>{mode === 'add' ? 'Añadir Curso' : 'Modificar Curso'}</h3>
          <button type="button" className="close-btn" onClick={onClose}>×</button>
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
            
            {/* Si NO hay imagen, mostramos la zona de subida (La caja punteada) */}
            {!previewImage && (
              <>
                <div className="upload-area">
                  <img src={nubeIcon} alt="Subir" className="nube-icon" />
                  <p>Arrastra y suelta tu imagen aquí<br/>o haz clic para seleccionar</p>
                  <button type="button" className="upload-btn" onClick={handleSimularSubida}>
                    <img src={imagenIcon} alt="Icono imagen" style={{width: '16px', filter: 'brightness(0) invert(1)'}} /> Subir imagen
                  </button>
                </div>
                <p className="format-text">Formatos aceptados: JPG, PNG.</p>
              </>
            )}

            {/* Si SÍ hay imagen, mostramos la VISTA PREVIA */}
            {previewImage && (
              <div className="preview-container">
                <span className="preview-label">Vista previa</span>
                <div className="preview-box">
                  <img src={previewImage} alt="Vista previa" className="preview-image-actual" />
                  
                  <div className="preview-actions">
                    <button type="button" className="btn-reemplazar" onClick={handleSimularSubida}>
                      <img src={recargarIcon} alt="Reemplazar" style={{width: '14px'}} />
                      Reemplazar
                    </button>
                    <button type="button" className="btn-eliminar-preview" onClick={handleEliminarImagen}>
                      <img src={basuraIcon} alt="Eliminar" style={{width: '14px'}} />
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            )}
            
          </div>

          <div className="modal-footer-curso">
            <span className="required-text">Los campos marcados con (*) son obligatorios</span>
            <div className="footer-buttons-curso">
              <button type="button" className="btn-cancel" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn-confirm-blue">Confirmar</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};