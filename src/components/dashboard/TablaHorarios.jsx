import React from 'react';
import './TablaHorarios.css';
// Importamos los iconos de tus assets
import lapizIcon from '../../assets/lapiz.svg';

export const TablaHorarios = ({ data, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            <th>Curso</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th style={{ textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="course-name-cell">{item.curso}</td>
              <td>{item.fecha}</td>
              <td>{item.hora}</td>
              <td>
                <div className="actions-cell">
                  <button className="btn-table-edit" onClick={() => onEdit(item)}>
                    <img src={lapizIcon} alt="Editar" />
                  </button>
                  <button className="btn-table-delete" onClick={() => onDelete(item)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};