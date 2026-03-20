import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ActionCard } from '../components/dashboard/ActionCard';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { TablaHorarios } from '../components/dashboard/TablaHorarios';
import { ModalAñadirHorario } from '../components/dashboard/ModalAñadirHorario';
import { ModalEliminar } from '../components/dashboard/ModalEliminar';
import { ModalEditarHorario } from '../components/dashboard/ModalEditarHorario';
import { CalendarioMaestro } from '../components/dashboard/CalendarioMaestro';
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
  // FALTABA ESTE ESTADO
  const [selectedCourse, setSelectedCourse] = useState(null); 
  
  // Estados de los Modales extraídos
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({ isOpen: false, item: null });
  const [editClassModal, setEditClassModal] = useState({ isOpen: false, data: null });

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
            setEditClassModal({ isOpen: true, data: datosHorario }); 
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
            onDelete={(item) => setDeleteData({ isOpen: true, item })} 
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
        onSave={() => { console.log("Guardando..."); setIsAddScheduleModalOpen(false); }}
      />

      <ModalEliminar 
        isOpen={deleteData.isOpen}
        itemName={deleteData.item?.curso}
        onClose={() => setDeleteData({ isOpen: false, item: null })}
        onConfirm={() => {
          console.log("Eliminando desde Spring Boot...", deleteData.item.id);
          setDeleteData({ isOpen: false, item: null });
        }}
      />

      <ModalEditarHorario 
        isOpen={editClassModal.isOpen}
        initialData={editClassModal.data}
        onClose={() => setEditClassModal({ isOpen: false, data: null })}
        onSave={(nuevosDatos) => {
          console.log("Guardando cambios en el horario...", nuevosDatos);
          setEditClassModal({ isOpen: false, data: null });
        }}
      />
    </DashboardLayout>
  );
};