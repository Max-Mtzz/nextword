import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ActionCard } from '../components/dashboard/ActionCard';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { TablaHorarios } from '../components/dashboard/TablaHorarios';
import { ModalAñadirHorario } from '../components/dashboard/ModalAñadirHorario';
import { ModalEditarHorario } from '../components/dashboard/ModalEditarHorario';
import { CalendarioMaestro } from '../components/dashboard/CalendarioMaestro';
import { ModalExito } from '../components/dashboard/ModalExito';
import { ModalConfirmarEliminarHorario } from '../components/dashboard/ModalConfirmarEliminarHorario';
import { ModalAccionHorario } from '../components/dashboard/ModalAccionHorario';
import { ModalConfirmarPassword } from '../components/dashboard/ModalConfirmarPassword';
import { ModalErrorCancelacion } from '../components/dashboard/ModalErrorCancelacion';
import './DashboardMaestro.css';

// Assets
import relojRellenoIcon from '../assets/reloj_relleno.svg';
import bookIcon2 from '../assets/book_icon_2.svg';
import chinaIcon from '../assets/china_icon.svg'; 
import usaIcon from '../assets/china_icon.svg'; 

const assignedCoursesData = [
  { id: 1, curso: 'Ingles básico', modalidad: 'Presencial', fecha: '2026/02/20', hora: '13:00' },
  { id: 2, curso: 'Grammar', modalidad: 'Virtual', fecha: '2026/02/12', hora: '11:00' }
];

const misCursosData = [
  { id: 1, nombre: 'Inglés', flag: usaIcon },
  { id: 2, nombre: 'Chino', flag: chinaIcon },
];

export const DashboardMaestro = () => {
  const [activeView, setActiveView] = useState('main'); 
  const [selectedCourse, setSelectedCourse] = useState(null); 
  
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [editClassModal, setEditClassModal] = useState({ isOpen: false, data: null });
  const [deleteHorarioConfirmation, setDeleteHorarioConfirmation] = useState({ isOpen: false, data: null });
  const [actionModal, setActionModal] = useState({ isOpen: false, data: null });
  
  const [showSuccessModal, setShowSuccessModal] = useState({ isOpen: false, mensaje: '' });
  const [error24h, setError24h] = useState({ isOpen: false, horas: 0 });
  const [passwordPrompt, setPasswordPrompt] = useState({ 
    isOpen: false, 
    type: null, 
    actionToExecute: null 
  });

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/');
  };

  return (
    <DashboardLayout 
      role="maestro" 
      activeView={activeView} 
      setActiveView={setActiveView}
      onLogoutClick={() => setIsLogoutModalOpen(true)}
    >
      {/* VISTA A: INICIO */}
      {activeView === 'main' && (
        <>
          <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
          <h2 className="section-title">Acciones Rápidas</h2>
          <div className="quick-actions">
            <ActionCard title="Horarios" icon={relojRellenoIcon} onClick={() => setActiveView('assigned_courses')} />
            <ActionCard title="Cursos" icon={bookIcon2} onClick={() => setActiveView('courses')} />
          </div>
        </>
      )}

      {/* VISTA B: BANDERAS */}
      {activeView === 'courses' && (
        <>
          <h1 className="dashboard-greeting" style={{marginBottom: '1.5rem'}}>Hola ¡Diego!</h1>
          <div className="courses-subtitle" style={{marginBottom: '1rem', color: '#4b5563'}}>Cursos:</div>
          
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {misCursosData.map((curso) => (
              <div 
                key={curso.id} 
                onClick={() => { setSelectedCourse(curso); setActiveView('calendar'); }}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e5e7eb',
                  borderRadius: '16px',
                  width: '130px',
                  height: '110px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                }}
              >
                <img src={curso.flag} alt={curso.nombre} style={{ width: '55px', borderRadius: '4px', marginBottom: '8px' }} />
                <span style={{ color: '#0082a9', fontWeight: 'bold' }}>{curso.nombre}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* VISTA C: CALENDARIO */}
      {activeView === 'calendar' && (
        <CalendarioMaestro 
          curso={selectedCourse}
          onBack={() => { setActiveView('courses'); setSelectedCourse(null); }}
          onAddSchedule={() => setIsAddScheduleModalOpen(true)}
          onEventClick={(datosHorario) => {
            setActionModal({ isOpen: true, data: datosHorario }); 
          }}
        />
      )}

      {/* VISTA D: TABLA DE HORARIOS */}
      {activeView === 'assigned_courses' && (
        <>
          <div className="calendar-top-bar">
            <div style={{width: '100%'}}>
              <div className="breadcrumbs">Mis clases {'>'} <strong>Cursos asignados</strong></div>
              <div className="calendar-title-container" style={{marginBottom: '1.5rem'}}>
                <h2>Próximos cursos</h2>
              </div>
            </div>
            <button className="btn-back" onClick={() => setActiveView('main')} style={{flexShrink: 0}}>{'<'} Atrás</button>
          </div>

          <TablaHorarios 
            data={assignedCoursesData} 
            onEdit={(item) => setEditClassModal({ isOpen: true, data: item })} 
            onDelete={(item) => {
              setDeleteHorarioConfirmation({ 
                isOpen: true, 
                data: {
                  profesor: 'Diego Salazar', 
                  dia: item.fecha,
                  hora: item.hora,
                  curso: item.curso
                }
              });
            }} 
          />
        </>
      )}

      {/* ==================================== */}
      {/* MODALES */}
      {/* ==================================== */}

      <ConfirmModal 
        isOpen={isLogoutModalOpen}
        title="Confirmar cerrar sesión"
        subtitle="Esta acción cerrara la sesión actual"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
        isDestructive={true}
      />

      <ModalAñadirHorario 
        isOpen={isAddScheduleModalOpen}
        onClose={() => setIsAddScheduleModalOpen(false)}
        onSave={(datosHorario) => { 
          setIsAddScheduleModalOpen(false); 
          setShowSuccessModal({ 
            isOpen: true, 
            mensaje: <>El nuevo horario se ha registrado con <strong style={{color: '#4b5563'}}>éxito</strong>.</>
          });
        }}
      />

      <ModalAccionHorario 
        isOpen={actionModal.isOpen}
        datos={actionModal.data}
        onClose={() => setActionModal({ isOpen: false, data: null })}
        onEdit={() => {
          setActionModal({ isOpen: false, data: null });
          setEditClassModal({ isOpen: true, data: actionModal.data });
        }}
        onDelete={() => {
          setActionModal({ isOpen: false, data: null });
          setDeleteHorarioConfirmation({ isOpen: true, data: actionModal.data });
        }}
      />

      <ModalEditarHorario 
        isOpen={editClassModal.isOpen}
        initialData={editClassModal.data}
        onClose={() => setEditClassModal({ isOpen: false, data: null })}
        onSave={(nuevosDatos) => {
          setEditClassModal({ isOpen: false, data: null });
          setShowSuccessModal({ 
            isOpen: true, 
            mensaje: <>El horario se ha modificado con <strong style={{color: '#4b5563'}}>éxito</strong>.</>
          });
        }}
      />

      {/* PASO 1: Confirmación inicial del horario (Alerta Amarilla) */}
      <ModalConfirmarEliminarHorario 
        isOpen={deleteHorarioConfirmation.isOpen}
        datosHorario={deleteHorarioConfirmation.data}
        onClose={() => setDeleteHorarioConfirmation({ isOpen: false, data: null })}
        onConfirm={() => {
          setDeleteHorarioConfirmation({ isOpen: false, data: null });
          setPasswordPrompt({
            isOpen: true,
            type: 'horario', // 👈 ESTO DISPARA LA REGLA DE 24H EN EL SIGUIENTE PASO
            actionToExecute: () => {
              console.log("Eliminando horario en Oracle...");
              setShowSuccessModal({ 
                isOpen: true, 
                mensaje: <>El horario se ha eliminado con <strong style={{color: '#4b5563'}}>éxito</strong>.</>
              });
            }
          });
        }}
      />

      {/* PASO 2: Contraseña y Validación de 24 horas */}
      <ModalConfirmarPassword
        isOpen={passwordPrompt.isOpen}
        onClose={() => setPasswordPrompt({ isOpen: false, type: null, actionToExecute: null })}
        onConfirm={() => {
          // Si estamos borrando un horario, validamos el tiempo
          if (passwordPrompt.type === 'horario') {
            const horasFaltantes = 8; // Simulación: luego vendrá del cálculo de fechas

            if (horasFaltantes < 24) {
              setPasswordPrompt({ isOpen: false, type: null, actionToExecute: null });
              setError24h({ isOpen: true, horas: horasFaltantes });
              return; 
            }
          }

          if (passwordPrompt.actionToExecute) {
            passwordPrompt.actionToExecute();
          }
          setPasswordPrompt({ isOpen: false, type: null, actionToExecute: null });
        }}
      />

      {/* PASO 3 (Si falla): Modal de Candado (24h) */}
      <ModalErrorCancelacion 
        isOpen={error24h.isOpen}
        horasRestantes={error24h.horas}
        onClose={() => setError24h({ isOpen: false, horas: 0 })}
      />

      {/* PASO 3 (Si tiene éxito): Modal de Éxito */}
      <ModalExito 
        isOpen={showSuccessModal.isOpen}
        mensaje={showSuccessModal.mensaje}
        onClose={() => setShowSuccessModal({ isOpen: false, mensaje: '' })}
      />
    </DashboardLayout>
  );
};