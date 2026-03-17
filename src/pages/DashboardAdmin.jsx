import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ActionCard } from '../components/dashboard/ActionCard';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { TablaUsuarios } from '../components/dashboard/TablaUsuarios'; // <-- IMPORTAMOS LA NUEVA TABLA
import { ModalUsuario } from '../components/dashboard/ModalUsuario';
import { ModalEliminar } from '../components/dashboard/ModalEliminar';
import { CursoCard } from '../components/dashboard/CursoCard';
import { ModalCurso } from '../components/dashboard/ModalCurso';
import './DashboardAdmin.css';

// Iconos
import hatIcon from '../assets/hat_icon.svg';
import pencilIcon from '../assets/pencil_icon.svg'; 
import bookIcon2 from '../assets/book_icon_2.svg';

// (MANTÉN TUS DATOS SIMULADOS AQUÍ: alumnosData, maestrosData, cursosData...)

export const DashboardAdmin = () => {
  const [activeView, setActiveView] = useState('main');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  // Estados que manejaremos después con los modales
  const [userForm, setUserForm] = useState({ isOpen: false, type: 'alumno', mode: 'add', data: null });
  const [deleteUser, setDeleteUser] = useState({ isOpen: false, step: 1, type: 'alumno', data: null });

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    navigate('/');
  };

  return (
    <DashboardLayout 
      role="admin" 
      activeView={activeView} 
      setActiveView={setActiveView}
      onLogoutClick={() => setIsLogoutModalOpen(true)}
    >
      {/* VISTA: MAIN */}
      {activeView === 'main' && (
        <>
          <h1 className="dashboard-greeting">Hola ¡Diego!</h1>
          <h2 className="section-title">Acciones Rápidas</h2>
          <div className="quick-actions">
            <ActionCard title="Alumnos" icon={hatIcon} onClick={() => setActiveView('students_list')} />
            <ActionCard title="Maestros" icon={pencilIcon} onClick={() => setActiveView('teachers_list')} />
            <ActionCard title="Cursos" icon={bookIcon2} onClick={() => setActiveView('courses')} />
          </div>
        </>
      )}

      {/* VISTA: LISTA DE ALUMNOS */}
      {activeView === 'students_list' && (
        <>
          <div className="calendar-top-bar">
            <div style={{width: '100%'}}>
              <div className="breadcrumbs">Gestionar usuarios {'>'} <strong>Alumnos</strong></div>
              <div className="calendar-title-container" style={{marginBottom: '1.5rem'}}>
                <h2>Alumnos - Usuarios registrados</h2>
              </div>
              <button className="btn-add" onClick={() => setUserForm({ isOpen: true, type: 'alumno', mode: 'add', data: null })}>+ Añadir</button>
            </div>
            <button className="btn-back" onClick={() => setActiveView('main')} style={{flexShrink: 0}}>{'<'} Atrás</button>
          </div>

          {/* AQUÍ USAMOS LA TABLA REUTILIZABLE PARA ALUMNOS */}
          <TablaUsuarios 
            data={alumnosData}
            onEdit={(alumno) => setUserForm({ isOpen: true, type: 'alumno', mode: 'edit', data: alumno })}
            onDelete={(alumno) => setDeleteUser({ isOpen: true, step: 1, type: 'alumno', data: alumno })}
          />
        </>
      )}

      {/* VISTA: LISTA DE MAESTROS */}
      {activeView === 'teachers_list' && (
        <>
          <div className="calendar-top-bar">
            <div style={{width: '100%'}}>
              <div className="breadcrumbs">Gestionar usuarios {'>'} <strong>Maestros</strong></div>
              <div className="calendar-title-container" style={{marginBottom: '1.5rem'}}>
                <h2>Maestros - Usuarios registrados</h2>
              </div>
              <button className="btn-add" onClick={() => setUserForm({ isOpen: true, type: 'maestro', mode: 'add', data: null })}>+ Añadir</button>
            </div>
            <button className="btn-back" onClick={() => setActiveView('main')} style={{flexShrink: 0}}>{'<'} Atrás</button>
          </div>

          {activeView === 'courses' && (
        <>
          <div className="calendar-top-bar">
             <div style={{width: '100%'}}>
               <div className="breadcrumbs">Gestionar cursos</div>
               <div className="courses-header">
                 <h2>Cursos registrados</h2>
                 <button className="btn-add" onClick={() => setCourseForm({ isOpen: true, mode: 'add', data: null })}>
                   + Añadir
                 </button>
               </div>
             </div>
          </div>

          <div className="courses-grid">
            {cursosData.map((curso) => (
              <CursoCard 
                key={curso.id} 
                curso={curso} 
                onClick={(c) => { setSelectedCourse(c); setActiveView('calendar'); }}
                onEdit={(c) => setCourseForm({ isOpen: true, mode: 'edit', data: c })}
                onDelete={(c) => setDeleteCourse({ isOpen: true, data: c })}
              />
            ))}
          </div>
        </>
      )}

          {/* AQUÍ RECICLAMOS LA MISMA TABLA PARA MAESTROS */}
          <TablaUsuarios 
            data={maestrosData}
            onEdit={(maestro) => setUserForm({ isOpen: true, type: 'maestro', mode: 'edit', data: maestro })}
            onDelete={(maestro) => setDeleteUser({ isOpen: true, step: 1, type: 'maestro', data: maestro })}
          />
        </>
      )}

      {/* VISTA: CURSOS Y CALENDARIO (Aún pendientes de extraer a componentes) */}
      {/* ... */}

      {/* MODAL GLOBAL */}
      <ConfirmModal 
        isOpen={isLogoutModalOpen}
        title="Confirmar cerrar sesión"
        subtitle="Esta acción cerrará la sesión actual"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
      />

      <ModalUsuario 
        isOpen={userForm.isOpen}
        type={userForm.type}
        mode={userForm.mode}
        initialData={userForm.data}
        onClose={() => setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null })}
        onSave={(datosRecolectados) => {
          console.log("Datos listos para enviar a Spring Boot:", datosRecolectados);
          // Aquí harás el POST/PUT
          setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null });
        }}
      />

      <ModalEliminar 
        isOpen={deleteUser.isOpen}
        itemName={deleteUser.data?.nombre}
        onClose={() => setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null })}
        onConfirm={() => {
          console.log(`Eliminando ${deleteUser.type} en la Base de Datos...`, deleteUser.data?.id);
          // Aquí harás el DELETE a Spring Boot
        }}
      />
      
      <ModalCurso 
        isOpen={courseForm.isOpen}
        mode={courseForm.mode}
        initialData={courseForm.data}
        onClose={() => setCourseForm({ isOpen: false, mode: 'add', data: null })}
        onSave={(datosCurso) => {
          console.log("Guardando curso en Oracle:", datosCurso);
          setCourseForm({ isOpen: false, mode: 'add', data: null });
        }}
      />

      <ModalEliminar 
        isOpen={deleteCourse.isOpen}
        itemName={deleteCourse.data?.nombre}
        onClose={() => setDeleteCourse({ isOpen: false, data: null })}
        onConfirm={() => {
          console.log("Eliminando curso...", deleteCourse.data?.id);
        }}
      />

      
    </DashboardLayout>
  );
};