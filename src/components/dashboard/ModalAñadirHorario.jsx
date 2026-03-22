import React, { useState, useEffect } from 'react';

export const ModalAñadirHorario = ({ isOpen, onClose, onSave, maestros = [] }) => {
  const [docenteId, setDocenteId] = useState('');
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [año, setAño] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [estado, setEstado] = useState('Disponible'); 

  // NUEVO: Auto-seleccionar si solo hay un maestro (Caso: Dashboard Docente)
  useEffect(() => {
    if (maestros.length === 1) {
      setDocenteId(maestros[0].id);
    }
  }, [maestros]);

  if (!isOpen) return null;

  const diasNumeros = Array.from({ length: 31 }, (_, i) => i + 1);
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const años = [2026, 2027, 2028, 2029, 2030];
  const horas = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];

  const formatearFechaHora = (d, m, a, h) => {
    const mesIndex = meses.indexOf(m) + 1;
    const mesFormateado = mesIndex < 10 ? `0${mesIndex}` : mesIndex;
    const diaFormateado = d < 10 ? `0${d}` : d;

    const [time, modifier] = h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
    const horaFormateada = hours.toString().padStart(2, '0');

    return `${a}-${mesFormateado}-${diaFormateado}T${horaFormateada}:${minutes}:00`;
  };

  const handleSubmit = () => {
    if (!docenteId || !dia || !mes || !año || !horaInicio || !horaFin) {
      alert("Por favor completa todos los campos obligatorios (*)");
      return;
    }

    const fechaHoraClaseStr = formatearFechaHora(dia, mes, año, horaInicio);
    const fechaHoraFinStr = formatearFechaHora(dia, mes, año, horaFin);

    onSave({
      docente: { id: parseInt(docenteId) },
      fechaHoraClase: fechaHoraClaseStr,
      fechaHoraFin: fechaHoraFinStr,
      estado: estado.toLowerCase()
    });

    // Limpiamos, pero respetamos si es un solo maestro
    if (maestros.length !== 1) setDocenteId(''); 
    setDia(''); setMes(''); setAño(''); setHoraInicio(''); setHoraFin(''); setEstado('Disponible');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-large" style={{ width: '550px', padding: '2rem' }}>
        
        <div className="modal-header" style={{ marginBottom: '1.5rem' }}>
          <h3>Añadir horario</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Profesor*</label>
          
          {/* NUEVO: Condicional para mostrar input bloqueado o select normal */}
          {maestros.length === 1 ? (
            <input 
              type="text" 
              className="form-control" 
              // BUSCAMOS EL NOMBRE POR TODAS LAS VÍAS POSIBLES
              value={maestros[0]?.fullName || maestros[0]?.nombre || maestros[0]?.email || 'Mi Usuario'} 
              disabled 
              style={{ backgroundColor: '#f3f4f6', color: '#4b5563', borderColor: '#e5e7eb', width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #e5e7eb' }} 
            />
          ) : (
            <select className="form-select" value={docenteId} onChange={(e) => setDocenteId(e.target.value)} style={{width: '100%'}}>
              <option value="">Selecciona un maestro...</option>
              {maestros.map(maestro => (
                <option key={maestro.id} value={maestro.id}>{maestro.fullName || maestro.nombre}</option>
              ))}
            </select>
          )}
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Fecha*</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <select className="form-select" style={{ flex: 1 }} value={dia} onChange={(e) => setDia(e.target.value)}>
              <option value="">Día</option>
              {diasNumeros.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className="form-select" style={{ flex: 2 }} value={mes} onChange={(e) => setMes(e.target.value)}>
              <option value="">Mes</option>
              {meses.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select className="form-select" style={{ flex: 1.5 }} value={año} onChange={(e) => setAño(e.target.value)}>
              <option value="">Año</option>
              {años.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Hora de inicio*</label>
            <select className="form-select" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)}>
              <option value="">Inicio</option>
              {horas.map((h, i) => <option key={i} value={h}>{h}</option>)}
            </select>
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Hora de fin*</label>
            <select className="form-select" value={horaFin} onChange={(e) => setHoraFin(e.target.value)}>
              <option value="">Fin</option>
              {horas.map((h, i) => <option key={i} value={h}>{h}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'block' }}>Estado</label>
          <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)} style={{width: '100%'}}>
            <option value="Disponible">Disponible</option>
            <option value="Ocupado">Ocupado</option>
          </select>
        </div>

        <div className="modal-footer" style={{ marginTop: '1rem', paddingTop: '0', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#94a3b8' }}>Los campos marcados con (*) son obligatorios</p>
          <div className="footer-buttons" style={{ width: '100%', display: 'flex', gap: '1rem' }}>
            <button type="button" className="btn-cancel" style={{ flex: 1, padding: '0.8rem' }} onClick={onClose}>Cancelar</button>
            <button type="button" className="btn-confirm-blue" style={{ flex: 1, padding: '0.8rem', backgroundColor: '#0082a9' }} onClick={handleSubmit}>Añadir horario</button>
          </div>
        </div>

      </div>
    </div>
  );
};