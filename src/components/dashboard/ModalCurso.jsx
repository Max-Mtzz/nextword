import React, { useState, useEffect, useRef } from 'react';
import './ModalCurso.css';
import nubeIcon from '../../assets/nube.svg';
import imagenIcon from '../../assets/imagen.svg';
import basuraIcon from '../../assets/bote_basura.svg';

export const ModalCurso = ({ isOpen, onClose, onSave, mode = 'add', initialData = null }) => {
  const [formData, setFormData] = useState({ nombre: '', imagen: null });
  const [previewImage, setPreviewImage] = useState(null);
  
  // Referencia para el input de archivo oculto
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (initialData && mode === 'edit') {
      // initialData trae { nombre: "Inglés", flag: "url_de_cloudinary" }
      setFormData({ nombre: initialData.nombre, imagen: null });
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

  // Cuando el usuario hace clic en "Subir imagen", simulamos un clic en el input de archivo oculto
  const handleBotonSubirClick = () => {
    fileInputRef.current.click();
  };

  // Cuando el usuario selecciona un archivo
  const handleArchivoSeleccionado = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 1. Guardamos el archivo físico para enviarlo al backend
      setFormData({ ...formData, imagen: file });
      
      // 2. Creamos una URL temporal para mostrar la vista previa
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
    }
  };

  const handleEliminarImagen = () => {
    setPreviewImage(null);
    setFormData({ ...formData, imagen: null });
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Limpiamos el input
    }
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
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              placeholder="Ej. Inglés Intermedio B1" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Imagen representativa del curso*</label>
            
            {/* Input oculto para subir archivos */}
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleArchivoSeleccionado}
            />

            {!previewImage && (
              <>
                <div className="upload-area">
                  <img src={nubeIcon} alt="Subir" className="nube-icon" />
                  <p>Haz clic para seleccionar tu imagen</p>
                  <button type="button" className="upload-btn" onClick={handleBotonSubirClick}>
                    <img src={imagenIcon} alt="Icono imagen" style={{width: '16px', filter: 'brightness(0) invert(1)'}} /> Subir imagen
                  </button>
                </div>
                <p className="format-text">Formatos aceptados: JPG, PNG.</p>
              </>
            )}

            {previewImage && (
              <div className="preview-container">
                <span className="preview-label">Vista previa</span>
                <div className="preview-box">
                  <img src={previewImage} alt="Vista previa" className="preview-image-actual" />
                  
                  <div className="preview-actions">
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