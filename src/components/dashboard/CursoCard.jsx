import React, { useState } from 'react';
import menuIcon from '../../assets/menu_icon.svg';

export const CursoCard = ({ curso, onClick, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Evita que el clic abra el calendario
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="course-card-simple" onClick={() => onClick(curso)}>
      
      {/* Botón de los tres puntos: SOLO SE MUESTRA SI RECIBE LA PROPIEDAD onEdit */}
      {onEdit && (
        <button className="dots-btn-simple" onClick={toggleMenu}>
          <img src={menuIcon} alt="Opciones" />
        </button>
      )}

      {/* Menú Desplegable: SOLO SE MUESTRA SI HAY onEdit Y ESTÁ ABIERTO */}
      {onEdit && isMenuOpen && (
        <div className="dropdown-simple" onMouseLeave={() => setIsMenuOpen(false)}>
          <button 
            className="dropdown-item-text" 
            onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); onEdit(curso); }}
          >
            Editar
          </button>
          {onDelete && (
            <button 
              className="dropdown-item-text" 
              onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); onDelete(curso); }}
            >
              Eliminar
            </button>
          )}
        </div>
      )}

      {/* Bandera y Nombre */}
      {curso.flag ? (
        <img src={curso.flag} alt={`Bandera ${curso.nombre}`} className="course-flag" />
      ) : (
        <div className="course-flag" style={{ background: '#cbd5e1' }}></div>
      )}
      
      <span className="course-name">{curso.nombre}</span>
    </div>
  );
};