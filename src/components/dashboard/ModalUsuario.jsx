import React, { useState, useEffect } from 'react';
import './ModalUsuario.css';

export const ModalUsuario = ({ isOpen, onClose, onSave, type = 'alumno', mode = 'add', initialData = null }) => {
  const [formData, setFormData] = useState({});
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    if (initialData && mode === 'edit') {
      // Mapeo exhaustivo para asegurar que todos los campos se carguen
      setFormData({
        nombre: initialData.fullName || '',
        correo: initialData.email || '',
        telefono: initialData.primaryPhone || '',
        telefonoEmergencia: initialData.emergencyPhone || '', // Carga desde el backend
        genero: initialData.gender || '',
        password: '' // Siempre vacío en edición
      });

      if (initialData.birthDate) {
        const parts = initialData.birthDate.split('-');
        setYear(parts[0]);
        setMonth(parts[1]);
        setDay(parts[2]);
      }
    } else {
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
        telefonoEmergencia: '',
        genero: '',
        password: ''
      });
      setDay(''); setMonth(''); setYear('');
    }
  }, [initialData, mode, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de contraseña solo al añadir
    if (mode === 'add' && (!formData.password || formData.password.length < 8)) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    const fechaISO = day && month && year ? `${year}-${month}-${day}` : '';
    onSave({ ...formData, fechaNac: fechaISO });
  };

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="modal-overlay">
      <div className="modal-content-large" style={{ width: '600px' }}>
        <div className="modal-header">
          <h3>{mode === 'add' ? 'Añadir' : 'Editar'} {type}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Nombre Completo*</label>
              <input type="text" name="nombre" className="form-control" onChange={handleChange} value={formData.nombre} placeholder="Nombre Completo" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Correo*</label>
              <input type="email" name="correo" className="form-control" onChange={handleChange} value={formData.correo} placeholder="Correo Electrónico" required />
            </div>
            <div className="form-group">
              <label>Teléfono principal*</label>
              <input type="text" name="telefono" className="form-control" onChange={handleChange} value={formData.telefono} placeholder="10 dígitos" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Teléfono de emergencia*</label>
              <input
                type="text"
                name="telefonoEmergencia"
                className="form-control"
                onChange={handleChange}
                value={formData.telefonoEmergencia}
                placeholder="10 dígitos"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Fecha de nacimiento*</label>
            <div className="date-select-container" style={{ display: 'flex', gap: '10px' }}>
              <select className="form-select" value={day} onChange={(e) => setDay(e.target.value)} required>
                <option value="">Día</option>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select className="form-select" value={month} onChange={(e) => setMonth(e.target.value)} required>
                <option value="">Mes</option>
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)} required>
                <option value="">Año</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Género*</label>
              <select name="genero" className="form-select" onChange={handleChange} value={formData.genero} required>
                <option value="">Selecciona una opción</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            
            {/* Solo se muestra la contraseña al añadir */}
            {mode === 'add' && (
              <div className="form-group">
                <label>Contraseña*</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  minLength="8"
                  required
                />
              </div>
            )}
          </div>

          <div className="modal-footer" style={{ marginTop: '2rem' }}>
            <span className="required-text">Los campos marcados con (*) son obligatorios</span>
            <div className="footer-buttons" style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
              <button type="button" className="btn-cancel" onClick={onClose} style={{ flex: 1 }}>Cancelar</button>
              <button type="submit" className="btn-confirm-blue" style={{ flex: 1 }}>Confirmar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};