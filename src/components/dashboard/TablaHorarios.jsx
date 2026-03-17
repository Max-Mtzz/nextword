import React from 'react';
import lapizIcon from '../../assets/lapiz.svg';
import boteBasuraIcon from '../../assets/bote_basura.svg';

export const TablaHorarios = ({ data, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Curso</th>
            <th>Descripción</th>
            <th>Modalidad</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.curso}</td>
              <td>{item.descripcion}</td>
              <td>{item.modalidad}</td>
              <td>{item.fecha}</td>
              <td>{item.hora}</td>
              <td>
                <div className="table-actions">
                  <button className="action-icon-btn" onClick={() => onEdit(item)}>
                    <img src={lapizIcon} alt="Editar" />
                  </button>
                  <button className="action-icon-btn" onClick={() => onDelete(item)}>
                    <img src={boteBasuraIcon} alt="Eliminar" />
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