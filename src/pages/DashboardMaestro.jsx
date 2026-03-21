import React, { useState } from 'react';
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
import { useNavigate } from 'react-router-dom';


// Assets
import relojRellenoIcon from '../assets/reloj_relleno.svg';
import bookIcon2 from '../assets/book_icon_2.svg';
// FALTABAN ESTOS IMPORT PARA LAS BANDERAS
import chinaIcon from '../assets/china_icon.svg'; 
import usaIcon from '../assets/china_icon.svg'; // Cambia esto si tienes un usa_icon.svg real
import './DashboardMaestro.css';

// Datos simulados (Luego vendrán de un useEffect fetch() al Spring Boot)
const assignedCoursesData = [
  { id: 1, curso: 'Ingles básico', descripcion: 'Nivel Introductorio', modalidad: 'Presencial', fecha: '2026/02/20', hora: '13:00' },
  { id: 2, curso: 'Grammar', descripcion: 'Refuerzo', modalidad: 'Virtual', fecha: '2026/02/12', hora: '11:00' }
];

// FALTABA ESTA BASE DE DATOS FALSA DE LAS BANDERAS
const misCursosData = [
  { id: 1, nombre: 'Inglés', flag: usaIcon },
  { id: 2, nombre: 'Chino', flag: chinaIcon },
];

export const DashboardMaestro = () => {
  const [activeView, setActiveView] = useState('main'); 
  const [selectedCourse, setSelectedCourse] = useState(null); 
  
  // Estados de los Modales extraídos
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [editClassModal, setEditClassModal] = useState({ isOpen: false, data: null });
  const [showSuccessModal, setShowSuccessModal] = useState({ isOpen: false, mensaje: '' });
  const [deleteHorarioConfirmation, setDeleteHorarioConfirmation] = useState({ isOpen: false, data: null });
  const [actionModal, setActionModal] = useState({ isOpen: false, data: null });
  const [passwordPrompt, setPasswordPrompt] = useState({ isOpen: false, actionToExecute: null });

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogoutModalOpen(false); // 1. Cierra el modal
    navigate('/');               // 2. Te manda a la pantalla de Login
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
            // Cuando hacen clic en el calendario, se abre el modal "Seleccionar Acción"
            setActionModal({ isOpen: true, data: datosHorario }); 
          }}
        />
      )}

      {/* VISTA D: TABLA DE HORARIOS (Esto es lo que se te había roto) */}
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
              
              // Redirigimos al modal de horario (el amarillo) y adaptamos los nombres
              setDeleteHorarioConfirmation({ 
                isOpen: true, 
                data: {
                  profesor: 'Diego Salazar', // Nombre del maestro
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
      {/* INVOCACIÓN DE LOS COMPONENTES MODAL  */}
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
          console.log("Guardando horario nuevo del maestro...", datosHorario); 
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
          // Cerramos este recuadro y abrimos la alerta especial de eliminar horario
          setActionModal({ isOpen: false, data: null });
          setDeleteHorarioConfirmation({ isOpen: true, data: actionModal.data });
        }}
      />

      <ModalEditarHorario 
        isOpen={editClassModal.isOpen}
        initialData={editClassModal.data}
        onClose={() => setEditClassModal({ isOpen: false, data: null })}
        onSave={(nuevosDatos) => {
          console.log("Guardando cambios en el horario...", nuevosDatos);
          setEditClassModal({ isOpen: false, data: null });
          setShowSuccessModal({ 
            isOpen: true, 
            mensaje: <>El horario se ha modificado con <strong style={{color: '#4b5563'}}>éxito</strong>.</>
          });
        }}
      />

      <ModalConfirmarEliminarHorario 
        isOpen={deleteHorarioConfirmation.isOpen}
        datosHorario={deleteHorarioConfirmation.data}
        onClose={() => setDeleteHorarioConfirmation({ isOpen: false, data: null })}
        onConfirm={() => {
          // 1. Cerramos la alerta amarilla
          setDeleteHorarioConfirmation({ isOpen: false, data: null });

          // 2. Abrimos la contraseña y "guardamos" la acción de borrar
          setPasswordPrompt({
            isOpen: true,
            actionToExecute: () => {
              console.log("Eliminando horario en Oracle...", deleteHorarioConfirmation.data);
              // 3. Al final mostramos el éxito
              setShowSuccessModal({ 
                isOpen: true, 
                mensaje: <>El horario se ha eliminado con <strong style={{color: '#4b5563'}}>éxito</strong>.</>
              });
            }
          });
        }}
      />

      <ModalConfirmarPassword
        isOpen={passwordPrompt.isOpen}
        onClose={() => setPasswordPrompt({ isOpen: false, actionToExecute: null })}
        onConfirm={() => {
          if (passwordPrompt.actionToExecute) {
            passwordPrompt.actionToExecute(); // Ejecuta el borrado real
          }
          setPasswordPrompt({ isOpen: false, actionToExecute: null });
        }}
      />

      <ModalExito 
        isOpen={showSuccessModal.isOpen}
        mensaje={showSuccessModal.mensaje}
        onClose={() => setShowSuccessModal({ isOpen: false, mensaje: '' })}
      />
    </DashboardLayout>
  );
};