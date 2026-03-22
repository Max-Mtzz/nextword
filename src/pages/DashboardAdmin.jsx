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

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/usuarios', {
        headers: { Authorization: `Bearer ${token}` }
      });
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
            <div style={{ width: '100%' }}>
              <div className="breadcrumbs">Gestionar usuarios {'>'} <strong>Alumnos</strong></div>
              <div className="calendar-title-container" style={{ marginBottom: '1.5rem' }}>
                <h2>Alumnos - Usuarios registrados</h2>
              </div>
              <button className="btn-add" onClick={() => setUserForm({ isOpen: true, type: 'alumno', mode: 'add', data: null })}>+ Añadir</button>
            </div>
            <button className="btn-back" onClick={() => setActiveView('main')} style={{ flexShrink: 0 }}>{'<'} Atrás</button>
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
            <div style={{ width: '100%' }}>
              <div className="breadcrumbs">Gestionar usuarios {'>'} <strong>Maestros</strong></div>
              <h2>Maestros - Usuarios registrados</h2>
              <button className="btn-add" onClick={() => setUserForm({ isOpen: true, type: 'maestro', mode: 'add', data: null })}>+ Añadir</button>
            </div>
            <button className="btn-back" onClick={() => setActiveView('main')}>{'<'} Atrás</button>
          </div>
          <TablaUsuarios data={maestrosData} onEdit={() => { }} onDelete={() => { }} />
        </>
      )}

      <ModalUsuario
        isOpen={userForm.isOpen}
        type={userForm.type}
        mode={userForm.mode}
        initialData={userForm.data}
        onClose={() => setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null })}
        onSave={async (datosDelModal) => {
          try {
            const body = {
              fullName: datosDelModal.nombre,
              email: datosDelModal.correo,
              password: datosDelModal.password,
              role: userForm.type.toLowerCase(),
              birthDate: datosDelModal.fechaNac, // Recibido como YYYY-MM-DD
              primaryPhone: datosDelModal.telefono,
              emergencyPhone: datosDelModal.telefonoEmergencia,
              gender: datosDelModal.genero, // Ya corregido a minúsculas en el Modal
              username: datosDelModal.correo
            };

            await axios.post('http://localhost:8080/api/usuarios/registro', body);

            await fetchUsuarios();
            setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null });
            setShowSuccessModal({
              isOpen: true,
              mensaje: <>El {userForm.type} <strong style={{ color: '#4b5563' }}>{body.fullName}</strong> se registró con éxito.</>
            });

          } catch (error) {
            console.error("Error detallado:", error.response?.data);
            const errorMsg = error.response?.data?.message || "";

            if (errorMsg.includes("CHK_PERFILES_GENERO")) {
              alert("Error de validación: El género debe ser 'masculino', 'femenino' u 'otro'.");
            } else if (errorMsg.includes("CHK_PERFILES_PASS_LEN")) {
              alert("Error: La contraseña debe tener al menos 8 caracteres.");
            } else {
              alert("Error al procesar la solicitud. Verifique que el correo no esté duplicado.");
            }
          }
        }}
      />

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
                  mensaje: <>El usuario se ha eliminado con <strong style={{ color: '#4b5563' }}>éxito</strong>.</>
                });
              } catch (error) {
                alert("Error al eliminar al usuario.");
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
            // 1. Extraemos el correo del administrador logueado
            // IMPORTANTE: Verifica si en localStorage se guardó como 'email' o 'correo'
            const adminEmail = adminData.email || adminData.correo || adminData.nombreUsuario;

            // 2. Enviamos la petición de login para validar la identidad
            await axios.post('http://localhost:8080/api/usuarios/login', {
              email: adminEmail,    // <--- CAMBIADO de 'correo' a 'email'
              password: passwordIngresada
            });

            // 3. Si el login es exitoso, ejecutamos la eliminación
            if (passwordPrompt.actionToExecute) {
              await passwordPrompt.actionToExecute();
            }

            setPasswordPrompt({ isOpen: false, type: null, actionToExecute: null });
          } catch (error) {
            console.error("Error de validación:", error.response?.data);
            // Este throw hace que el modal muestre el mensaje de error en rojo
            throw new Error("Contraseña incorrecta");
          }
        }}
      />

      <ConfirmModal isOpen={isLogoutModalOpen} title="Cerrar sesión" subtitle="¿Deseas salir?" onConfirm={handleLogout} onCancel={() => setIsLogoutModalOpen(false)} isDestructive={true} />
      <ModalExito isOpen={showSuccessModal.isOpen} mensaje={showSuccessModal.mensaje} onClose={() => setShowSuccessModal({ isOpen: false, mensaje: '' })} />
      <ModalErrorCancelacion isOpen={error24h.isOpen} horasRestantes={error24h.horas} onClose={() => setError24h({ isOpen: false, horas: 0 })} />
    </DashboardLayout>
  );
};