import React from 'react';
import lapizIcon from '../../assets/lapiz.svg';
import boteBasuraIcon from '../../assets/bote_basura.svg';

export const TablaUsuarios = ({ data, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Fecha de nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.fechaNac}</td>
              <td>
                <div className="table-actions">
                  <button className="action-icon-btn" onClick={() => onEdit(usuario)}>
                    <img src={lapizIcon} alt="Editar" />
                  </button>
                  <button className="action-icon-btn" onClick={() => onDelete(usuario)}>
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