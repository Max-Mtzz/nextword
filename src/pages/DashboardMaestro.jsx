import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ActionCard } from '../components/dashboard/ActionCard';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { TablaHorarios } from '../components/dashboard/TablaHorarios';
import { ModalAñadirHorario } from '../components/dashboard/ModalAñadirHorario';
import { ModalEliminar } from '../components/dashboard/ModalEliminar';

// Assets
import relojRellenoIcon from '../assets/reloj_relleno.svg';
import bookIcon2 from '../assets/book_icon_2.svg';
import './DashboardMaestro.css';

// Datos simulados (Luego vendrán de un useEffect fetch() al Spring Boot)
const assignedCoursesData = [
  { id: 1, curso: 'Ingles básico', descripcion: 'Nivel Introductorio', modalidad: 'Presencial', fecha: '2026/02/20', hora: '13:00' },
  { id: 2, curso: 'Grammar', descripcion: 'Refuerzo', modalidad: 'Virtual', fecha: '2026/02/12', hora: '11:00' }
];

export const DashboardMaestro = () => {
  const [activeView, setActiveView] = useState('main'); 
  
  // Estados de los Modales extraídos
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({ isOpen: false, item: null });

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

      {/* VISTA B: TABLA DE HORARIOS (Refactorizada) */}
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
            onEdit={(item) => console.log("Editar:", item)} // Aquí conectarás el Modal de Editar después
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
        onConfirm={() => console.log("Cerrando sesión...")}
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
    </DashboardLayout>
  );
};