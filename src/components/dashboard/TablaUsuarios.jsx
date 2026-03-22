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
          {data && data.map((usuario) => (
            <tr key={usuario.id}>
              {/* Usamos || para que funcione con datos reales (fullName) o simulados (nombre) */}
              <td>{usuario.fullName || usuario.nombre}</td>
              <td>{usuario.email || usuario.correo}</td>
              <td>{usuario.birthDate || usuario.fechaNac}</td>
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