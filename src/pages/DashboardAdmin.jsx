import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
import { ModalConfirmarPassword } from '../components/dashboard/ModalConfirmarPassword';
import { ModalErrorCancelacion } from '../components/dashboard/ModalErrorCancelacion'; 
import './DashboardAdmin.css';

import hatIcon from '../assets/hat_icon.svg';
import pencilIcon from '../assets/pencil_icon.svg'; 
import bookIcon2 from '../assets/book_icon_2.svg';
import chinaIcon from '../assets/china_icon.svg'; 
import usaIcon from '../assets/china_icon.svg'; 

const maestrosData = [
  { id: 1, fullName: 'María Magdalena Ortiz', email: 'maria.ortiz@idiomas.com', role: 'Maestro', curso: 'Chino', primaryPhone: '5587654321' },
  { id: 2, fullName: 'Diego Salazar', email: 'diego.s@idiomas.com', role: 'Maestro', curso: 'Inglés', primaryPhone: '5511223344' },
];

const cursosData = [
  { id: 1, nombre: 'Inglés', flag: usaIcon }, 
  { id: 2, nombre: 'Chino', flag: chinaIcon },
];

export const DashboardAdmin = () => {
  const [activeView, setActiveView] = useState('main');
  const navigate = useNavigate();

  // RECUPERAMOS LOS DATOS REALES (Asegúrate de que en Login guardes el objeto completo)
  const adminData = JSON.parse(localStorage.getItem('usuario') || '{}');
  const token = localStorage.getItem('token');

  const [alumnos, setAlumnos] = useState([]);

  // Estados Generales
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userForm, setUserForm] = useState({ isOpen: false, type: 'alumno', mode: 'add', data: null });
  const [deleteUser, setDeleteUser] = useState({ isOpen: false, step: 1, type: 'alumno', data: null });
  const [courseForm, setCourseForm] = useState({ isOpen: false, mode: 'add', data: null });
  const [deleteCourse, setDeleteCourse] = useState({ isOpen: false, data: null });
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState({ isOpen: false, data: null });
  const [editClassModal, setEditClassModal] = useState({ isOpen: false, data: null });
  const [deleteHorarioConfirmation, setDeleteHorarioConfirmation] = useState({ isOpen: false, data: null });
  const [showSuccessModal, setShowSuccessModal] = useState({ isOpen: false, mensaje: '' });
  
  const [passwordPrompt, setPasswordPrompt] = useState({ isOpen: false, type: null, actionToExecute: null });
  const [error24h, setError24h] = useState({ isOpen: false, horas: 0 });

  // FUNCIÓN PARA OBTENER ALUMNOS REALES DESDE EL BACKEND
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/usuarios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Filtramos por el campo 'role' de tu entidad
      const soloAlumnos = response.data.filter(u => u.role?.toLowerCase() === 'alumno');
      setAlumnos(soloAlumnos);
    } catch (error) {
      console.error("Error al cargar alumnos:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <DashboardLayout 
      role="admin" 
      activeView={activeView} 
      setActiveView={setActiveView}
      onLogoutClick={() => setIsLogoutModalOpen(true)}
    >
      {activeView === 'main' && (
        <>
          <h1 className="dashboard-greeting">Hola ¡{adminData.fullName || 'Admin'}!</h1>
          <h2 className="section-title">Acciones Rápidas</h2>
          <div className="quick-actions">
            <ActionCard title="Alumnos" icon={hatIcon} onClick={() => setActiveView('students_list')} />
            <ActionCard title="Maestros" icon={pencilIcon} onClick={() => setActiveView('teachers_list')} />
            <ActionCard title="Cursos" icon={bookIcon2} onClick={() => setActiveView('courses')} />
          </div>
        </>
      )}

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
            data={alumnos}
            onEdit={(alumno) => setUserForm({ isOpen: true, type: 'alumno', mode: 'edit', data: alumno })}
            onDelete={(alumno) => setDeleteUser({ isOpen: true, step: 1, type: 'alumno', data: alumno })}
          />
        </>
      )}

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

      {activeView === 'courses' && (
        <>
          <div className="calendar-top-bar">
             <div style={{width: '100%'}}>
               <div className="breadcrumbs">Gestionar cursos</div>
               <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                 <h2 style={{margin: 0}}>Cursos registrados</h2>
                 <button className="btn-add" onClick={() => setCourseForm({ isOpen: true, mode: 'add', data: null })}>+ Añadir</button>
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

      {activeView === 'calendar' && (
        <CalendarioSemanario 
          curso={selectedCourse}
          onBack={() => { setActiveView('courses'); setSelectedCourse(null); }}
          onAddSchedule={() => setIsAddScheduleModalOpen(true)}
          onEventClick={(datosHorario) => { setActionModal({ isOpen: true, data: datosHorario }); }}
        />
      )}

      {/* MODAL PARA AÑADIR/REGISTRAR ALUMNO */}
      <ModalUsuario 
        isOpen={userForm.isOpen}
        type={userForm.type}
        mode={userForm.mode}
        initialData={userForm.data}
        onClose={() => setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null })}
        onSave={async (datosRecolectados) => {
          try {
            // Mapeo a la entidad Usuario.java
            const body = {
              fullName: datosRecolectados.nombre,
              email: datosRecolectados.correo,
              password: datosRecolectados.password,
              role: userForm.type.toLowerCase(),
              birthDate: datosRecolectados.fechaNac,
              primaryPhone: datosRecolectados.telefono,
              gender: datosRecolectados.genero || 'No especificado',
              username: datosRecolectados.correo // Username por defecto
            };

            if (userForm.mode === 'add') {
              await axios.post('http://localhost:8080/api/usuarios/registro', body);
            } 
            // Editar se implementará después

            await fetchUsuarios();
            setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null });
            setShowSuccessModal({ 
              isOpen: true, 
              mensaje: <>El {userForm.type} <strong style={{color: '#4b5563'}}>{body.fullName}</strong> se registró con éxito.</>
            });
          } catch (error) {
            console.error("Error:", error);
            alert("Error al procesar la solicitud en el servidor.");
          }
        }}
      />

      {/* MODAL PARA ELIMINAR USUARIO (CON CONFIRMACIÓN DE PASSWORD) */}
      <ModalEliminar 
        isOpen={deleteUser.isOpen}
        itemType="usuario"
        itemName={deleteUser.data?.fullName || deleteUser.data?.nombre}
        onClose={() => setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null })}
        onConfirm={() => {
          const idAEliminar = deleteUser.data.id;
          setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null });
          
          setPasswordPrompt({
            isOpen: true,
            type: 'usuario', 
            actionToExecute: async () => {
              try {
                await axios.delete(`http://localhost:8080/api/usuarios/${idAEliminar}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                await fetchUsuarios();
                setShowSuccessModal({ 
                  isOpen: true, 
                  mensaje: <>El usuario se ha eliminado con éxito.</> 
                });
              } catch (error) {
                console.error("Error eliminando:", error);
                alert("Error al eliminar al usuario del sistema.");
              }
            }
          });
        }}
      />

      <ModalConfirmarPassword
        isOpen={passwordPrompt.isOpen}
        onClose={() => setPasswordPrompt({ isOpen: false, type: null, actionToExecute: null })}
        onConfirm={async (passwordIngresada) => {
          try {
            // Validamos contraseña re-logeando al admin
            await axios.post('http://localhost:8080/api/usuarios/login', {
              correo: adminData.email || adminData.correo, 
              password: passwordIngresada
            });

            if (passwordPrompt.actionToExecute) {
              await passwordPrompt.actionToExecute(); 
            }
            setPasswordPrompt({ isOpen: false, type: null, actionToExecute: null });
          } catch (error) {
            throw new Error("Contraseña Incorrecta"); 
          }
        }}
      />

      {/* Otros modales técnicos se mantienen igual... */}
      <ConfirmModal isOpen={isLogoutModalOpen} title="Cerrar sesión" subtitle="¿Deseas salir?" onConfirm={handleLogout} onCancel={() => setIsLogoutModalOpen(false)} isDestructive={true} />
      <ModalExito isOpen={showSuccessModal.isOpen} mensaje={showSuccessModal.mensaje} onClose={() => setShowSuccessModal({ isOpen: false, mensaje: '' })} />
      <ModalErrorCancelacion isOpen={error24h.isOpen} horasRestantes={error24h.horas} onClose={() => setError24h({ isOpen: false, horas: 0 })} />
    </DashboardLayout>
  );
};