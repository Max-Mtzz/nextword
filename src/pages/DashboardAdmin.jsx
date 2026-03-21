import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ActionCard } from '../components/dashboard/ActionCard';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { TablaUsuarios } from '../components/dashboard/TablaUsuarios'; 
import { ModalUsuario } from '../components/dashboard/ModalUsuario';
import { ModalEliminar } from '../components/dashboard/ModalEliminar';
import { CursoCard } from '../components/dashboard/CursoCard';
import { ModalCurso } from '../components/dashboard/ModalCurso';
import { CalendarioSemanario } from '../components/dashboard/CalendarioSemanario';
import { ModalAñadirHorario } from '../components/dashboard/ModalAñadirHorario';
import { ModalAccionHorario } from '../components/dashboard/ModalAccionHorario'; 
import { ModalEditarHorario } from '../components/dashboard/ModalEditarHorario';
import { ModalConfirmarEliminarHorario } from '../components/dashboard/ModalConfirmarEliminarHorario';
import { ModalExito } from '../components/dashboard/ModalExito';
import './DashboardAdmin.css';


import hatIcon from '../assets/hat_icon.svg';
import pencilIcon from '../assets/pencil_icon.svg'; 
import bookIcon2 from '../assets/book_icon_2.svg';
import chinaIcon from '../assets/china_icon.svg'; 
import usaIcon from '../assets/china_icon.svg'; // Cambia esto si tienes usa_icon real


const alumnosData = [
  { id: 1, nombre: 'Carlos Maximiliano', correo: 'carlos.max@email.com', rol: 'Alumno', fechaNac: '15/05/2005', telefono: '5512345678' },
  { id: 2, nombre: 'Ana Sofia', correo: 'ana.sofia@email.com', rol: 'Alumno', fechaNac: '10/10/2006', telefono: '5598765432' },
];

const maestrosData = [
  { id: 1, nombre: 'María Magdalena Ortiz', correo: 'maria.ortiz@idiomas.com', rol: 'Maestro', curso: 'Chino', telefono: '5587654321' },
  { id: 2, nombre: 'Diego Salazar', correo: 'diego.s@idiomas.com', rol: 'Maestro', curso: 'Inglés', telefono: '5511223344' },
];

const cursosData = [
  { id: 1, nombre: 'Inglés', flag: usaIcon }, 
  { id: 2, nombre: 'Chino', flag: chinaIcon },
];
// ==========================================

export const DashboardAdmin = () => {
  const [activeView, setActiveView] = useState('main');
  const navigate = useNavigate();

  // Estados Generales
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Estados para Usuarios
  const [userForm, setUserForm] = useState({ isOpen: false, type: 'alumno', mode: 'add', data: null });
  const [deleteUser, setDeleteUser] = useState({ isOpen: false, step: 1, type: 'alumno', data: null });

  // Estados para Cursos y Calendario
  const [courseForm, setCourseForm] = useState({ isOpen: false, mode: 'add', data: null });
  const [deleteCourse, setDeleteCourse] = useState({ isOpen: false, data: null });
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState({ isOpen: false, data: null }); // Para cuando das clic al calendario
  const [editClassModal, setEditClassModal] = useState({ isOpen: false, data: null });
  const [deleteHorarioConfirmation, setDeleteHorarioConfirmation] = useState({ isOpen: false, data: null });
  const [showSuccessModal, setShowSuccessModal] = useState({ isOpen: false, mensaje: '' });

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
      {/* ---------------------------------------------------------------- */}
      {/* VISTA: MAIN */}
      {/* ---------------------------------------------------------------- */}
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

      {activeView === 'users' && (
        <>
          <div className="calendar-top-bar">
            <div style={{width: '100%'}}>
              <div className="breadcrumbs"><strong>Gestionar Usuarios</strong></div>
              <div className="calendar-title-container" style={{marginBottom: '1.5rem'}}>
                <h2>¿Qué lista deseas ver?</h2>
              </div>
            </div>
          </div>
          
          <div className="quick-actions">
            <ActionCard title="Alumnos" icon={hatIcon} onClick={() => setActiveView('students_list')} />
            <ActionCard title="Maestros" icon={pencilIcon} onClick={() => setActiveView('teachers_list')} />
          </div>
        </>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* VISTA: LISTA DE ALUMNOS */}
      {/* ---------------------------------------------------------------- */}
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

          <TablaUsuarios 
            data={alumnosData}
            onEdit={(alumno) => setUserForm({ isOpen: true, type: 'alumno', mode: 'edit', data: alumno })}
            onDelete={(alumno) => setDeleteUser({ isOpen: true, step: 1, type: 'alumno', data: alumno })}
          />
        </>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* VISTA: LISTA DE MAESTROS */}
      {/* ---------------------------------------------------------------- */}
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

          <TablaUsuarios 
            data={maestrosData}
            onEdit={(maestro) => setUserForm({ isOpen: true, type: 'maestro', mode: 'edit', data: maestro })}
            onDelete={(maestro) => setDeleteUser({ isOpen: true, step: 1, type: 'maestro', data: maestro })}
          />
        </>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* VISTA: CURSOS (Banderas) */}
      {/* ---------------------------------------------------------------- */}
      {activeView === 'courses' && (
        <>
          <div className="calendar-top-bar">
             <div style={{width: '100%'}}>
               <div className="breadcrumbs">Gestionar cursos</div>
               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <h2 style={{margin: 0}}>Cursos registrados</h2>
                 <button className="btn-add" onClick={() => setCourseForm({ isOpen: true, mode: 'add', data: null })}>
                   + Añadir
                 </button>
               </div>
             </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
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

      {/* ---------------------------------------------------------------- */}
      {/* VISTA: CALENDARIO SEMANARIO DEL ADMIN */}
      {/* ---------------------------------------------------------------- */}
      {activeView === 'calendar' && (
        <CalendarioSemanario 
          curso={selectedCourse}
          onBack={() => { setActiveView('courses'); setSelectedCourse(null); }}
          onAddSchedule={() => setIsAddScheduleModalOpen(true)}
          onEventClick={(datosHorario) => {
            setActionModal({ isOpen: true, data: datosHorario });
          }}
        />
      )}


      {/* ========================================================= */}
      {/* TODOS LOS MODALES INVISIBLES DEL ADMIN (FLOTAN POR ENCIMA) */}
      {/* ========================================================= */}

      <ConfirmModal 
        isOpen={isLogoutModalOpen}
        title="Confirmar cerrar sesión"
        subtitle="Esta acción cerrará la sesión actual"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
        isDestructive={true}
      />

      {/* Modal para añadir/editar Usuario */}
      <ModalUsuario 
        isOpen={userForm.isOpen}
        type={userForm.type}
        mode={userForm.mode}
        initialData={userForm.data}
        onClose={() => setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null })}
        onSave={(datosRecolectados) => {
          // 1. Decidimos qué frase poner dependiendo de si estamos agregando o editando
          const textoExito = userForm.mode === 'add' 
            ? `Se registró correctamente el nuevo ${userForm.type}: ` 
            : `Se guardaron los cambios para el ${userForm.type}: `;

          // 2. Cerramos el formulario
          setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null });
          
          // 3. Abrimos el modal de éxito con la frase completa + el nombre en negritas
          setShowSuccessModal({ 
            isOpen: true, 
            mensaje: <>{textoExito} <strong style={{color: '#4b5563'}}>{datosRecolectados.nombre}</strong>.</>
          });
        }}
      />

      {/* MODAL DE ÉXITO REUTILIZABLE */}
      <ModalExito 
        isOpen={showSuccessModal.isOpen}
        mensaje={showSuccessModal.mensaje}
        onClose={() => setShowSuccessModal({ isOpen: false, mensaje: '' })}
      />

      <ModalEliminar 
        isOpen={deleteUser.isOpen}
        // Pasamos el tipo dinámico (ej: Usuario para alumnos/maestros, o Curso)
        dynamicType={deleteUser.data?.rol ? 'Usuario' : 'Curso'} 
        // Pasamos el nombre dinámico (ej: carlos maximiliano)
        dynamicName={deleteUser.data?.nombre}
        onClose={() => setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null })}
        onConfirm={() => {
          console.log(`Eliminando ${deleteUser.type} en Oracle...`, deleteUser.data?.id);
          // Aquí harás el DELETE real a Spring Boot
          setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null });
        }}
      />
      
      {/* Modal para añadir/editar Curso */}
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
        isOpen={deleteUser.isOpen}
        itemType="usuario"
        itemName={deleteUser.data?.nombre}
        onClose={() => setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null })}
        onConfirm={() => {
          console.log(`Eliminando usuario...`, deleteUser.data?.id);
          setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null });
        }}
      />

      {/* Modal para eliminar Curso */}
      <ModalEliminar 
        isOpen={deleteCourse.isOpen}
        itemType="curso"
        itemName={deleteCourse.data?.nombre}
        onClose={() => setDeleteCourse({ isOpen: false, data: null })}
        onConfirm={() => {
          console.log("Eliminando curso...", deleteCourse.data?.id);
          setDeleteCourse({ isOpen: false, data: null });
        }}
      />

      <ModalAñadirHorario 
        isOpen={isAddScheduleModalOpen}
        onClose={() => setIsAddScheduleModalOpen(false)}
        onSave={(datosHorario) => { 
          console.log("Guardando horario nuevo...", datosHorario); 
          // 1. Cerramos el modal
          setIsAddScheduleModalOpen(false); 
          // 2. Mostramos el éxito
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
          // 1. Cerramos el modal de "Seleccionar acción"
          setActionModal({ isOpen: false, data: null });
          
          // 2.  Abrimos la nueva confirmación de horario idéntica al Figma 
          setDeleteHorarioConfirmation({ isOpen: true, data: actionModal.data });
        }}
      />

            <ModalConfirmarEliminarHorario 
        isOpen={deleteHorarioConfirmation.isOpen}
        datosHorario={deleteHorarioConfirmation.data}
        onClose={() => setDeleteHorarioConfirmation({ isOpen: false, data: null })}
        onConfirm={() => {
          console.log("Eliminando horario en Oracle...", deleteHorarioConfirmation.data);
          // Aquí harás el DELETE real a Spring Boot
          setDeleteHorarioConfirmation({ isOpen: false, data: null });
        }}
      />

    
      <ModalEditarHorario 
        isOpen={editClassModal.isOpen}
        initialData={editClassModal.data}
        onClose={() => setEditClassModal({ isOpen: false, data: null })}
        onSave={(nuevosDatos) => {
          console.log("Guardando cambios en el horario...", nuevosDatos);
          // 1. Cerramos el modal de edición
          setEditClassModal({ isOpen: false, data: null });
          // 2. Mostramos el éxito
          setShowSuccessModal({ 
            isOpen: true, 
            mensaje: <>El horario se ha modificado con <strong style={{color: '#4b5563'}}>éxito</strong>.</>
          });
        }}
      />


    </DashboardLayout>
  );
};