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


export const DashboardAdmin = () => {
  const [activeView, setActiveView] = useState('main');
  const navigate = useNavigate();

  const adminData = JSON.parse(localStorage.getItem('usuario') || '{}');
  const token = localStorage.getItem('token');

  const [alumnos, setAlumnos] = useState([]);
  const [maestros, setMaestros] = useState([]);
  const [cursos, setCursos] = useState([]); // <-- NUEVO ESTADO PARA CURSOS
  const [horariosCurso, setHorariosCurso] = useState([]);

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
      const soloAlumnos = response.data.filter(u => u.role.toLowerCase() === 'alumno');
      setAlumnos(soloAlumnos);

      const soloMaestros = response.data.filter(u => u.role.toLowerCase() === 'docente');
      setMaestros(soloMaestros);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  // NUEVA FUNCIÓN PARA OBTENER LOS CURSOS DEL BACKEND
  const fetchCursos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cursos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // El backend devuelve { id, nombre, urlImagen, fechaCreacion }
      // Vamos a mapearlo para que el Frontend lo entienda como { id, nombre, flag }
      const cursosMapeados = response.data.map(curso => ({
        id: curso.id,
        nombre: curso.nombre,
        flag: curso.urlImagen // Usamos la URL de Cloudinary como la bandera
      }));
      setCursos(cursosMapeados);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  const fetchHorariosDeCurso = async (cursoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/horarios/curso/${cursoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Mapeamos los datos para que el CalendarioSemanario los entienda fácil
      const horariosMapeados = response.data.map(h => {
        // Formatear fecha y hora para la vista
        const fechaObj = new Date(h.fechaHoraClase);
        const diaStr = fechaObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
        const horaInicioStr = fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        const horaFinStr = new Date(h.fechaHoraFin).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

        return {
          id: h.id,
          dia: diaStr,
          hora: `${horaInicioStr} - ${horaFinStr}`,
          profesor: h.docente?.fullName || h.docente?.nombre || 'Docente',
          estado: h.estado,
          datosCrudos: h // Guardamos la info original por si la ocupamos
        };
      });
      setHorariosCurso(horariosMapeados);
    } catch (error) {
      console.error("Error al cargar horarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    fetchCursos();
  }, []);

  // --- NUEVO: Detectar cuando cambias de curso para traer sus horarios ---
  useEffect(() => {
    if (selectedCourse && selectedCourse.id) {
      setHorariosCurso([]); // Limpiamos la vista para que no se vean los anteriores mientras carga
      fetchHorariosDeCurso(selectedCourse.id);
    }
  }, [selectedCourse]);

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
          <h1 className="dashboard-greeting">Hola ¡{adminData.fullName || 'Administrador'}!</h1>
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
            <div style={{ width: '100%' }}>
              <div className="breadcrumbs"><strong>Gestionar Usuarios</strong></div>
              <div className="calendar-title-container" style={{ marginBottom: '1.5rem' }}>
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
              <div className="calendar-title-container" style={{ marginBottom: '1.5rem' }}>
                <h2>Maestros - Usuarios registrados</h2>
              </div>
              <button className="btn-add" onClick={() => setUserForm({ isOpen: true, type: 'docente', mode: 'add', data: null })}>+ Añadir</button>
            </div>
            <button className="btn-back" onClick={() => setActiveView('main')} style={{ flexShrink: 0 }}>{'<'} Atrás</button>
          </div>
          <TablaUsuarios
            data={maestros}
            onEdit={(docente) => setUserForm({ isOpen: true, type: 'docente', mode: 'edit', data: docente })}
            onDelete={(docente) => setDeleteUser({ isOpen: true, step: 1, type: 'docente', data: docente })}
          />
        </>
      )}

      {activeView === 'courses' && (
        <>
          <div className="calendar-top-bar">
            <div style={{ width: '100%' }}>
              <div className="breadcrumbs">Gestionar cursos</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>Cursos registrados</h2>
                <button className="btn-add" onClick={() => setCourseForm({ isOpen: true, mode: 'add', data: null })}>+ Añadir</button>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {cursos.map((curso) => (
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
          horarios={horariosCurso}
          onBack={() => { setActiveView('courses'); setSelectedCourse(null); }}
          onAddSchedule={() => setIsAddScheduleModalOpen(true)}
          // --- CORRECCIÓN: Le inyectamos el nombre del curso al modal ---
          onEventClick={(datosHorario) => {
            setActionModal({
              isOpen: true,
              data: { ...datosHorario, curso: selectedCourse?.nombre }
            });
          }}
        />
      )}

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Confirmar cerrar sesión"
        subtitle="Esta acción cerrará la sesión actual"
        onConfirm={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
        isDestructive={true}
      />

      {/* --- CORRECCIÓN EN EL GUARDADO (ADD/EDIT) --- */}
      <ModalUsuario
        isOpen={userForm.isOpen}
        type={userForm.type}
        mode={userForm.mode}
        initialData={userForm.data}
        onClose={() => setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null })}
        onSave={async (datosRecolectados) => {
          try {
            // Transformamos los datos del front (español) a la entidad Java (inglés)
            const payload = {
              fullName: datosRecolectados.nombre,
              email: datosRecolectados.correo,
              username: datosRecolectados.correo, // Usualmente el email sirve de username
              primaryPhone: datosRecolectados.telefono,
              emergencyPhone: datosRecolectados.telefonoEmergencia,
              gender: datosRecolectados.genero,
              birthDate: datosRecolectados.fechaNac,
              role: userForm.type.toLowerCase(),
              password: datosRecolectados.password
            };

            const config = {
              headers: { Authorization: `Bearer ${token}` }
            };

            if (userForm.mode === 'add') {
              await axios.post('http://localhost:8080/api/usuarios/registro', payload, config);
            } else {
              // Obtenemos el ID desde el estado (userForm.data.id) porque datosRecolectados no lo traía
              await axios.put(`http://localhost:8080/api/usuarios/${userForm.data.id}`, payload, config);
            }

            await fetchUsuarios();

            const textoExito = userForm.mode === 'add'
              ? `Se registró correctamente el nuevo ${userForm.type}: `
              : `Se guardaron los cambios para el ${userForm.type}: `;

            setUserForm({ isOpen: false, type: 'alumno', mode: 'add', data: null });

            setShowSuccessModal({
              isOpen: true,
              mensaje: <>{textoExito} <strong style={{ color: '#4b5563' }}>{payload.fullName}</strong>.</>
            });

          } catch (error) {
            console.error("Error al guardar usuario:", error);
            alert("Hubo un error al guardar los datos en el servidor.");
          }
        }}
      />

      <ModalEliminar
        isOpen={deleteUser.isOpen}
        itemType="usuario"
        itemName={deleteUser.data?.nombre || deleteUser.data?.fullName} // Previene fallos si se llama fullName
        onClose={() => setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null })}
        onConfirm={() => {
          const usuarioAEliminar = deleteUser.data;
          setDeleteUser({ isOpen: false, step: 1, type: 'alumno', data: null });

          setPasswordPrompt({
            isOpen: true,
            type: 'usuario',
            actionToExecute: async () => {
              try {
                await axios.delete(`http://localhost:8080/api/usuarios/${usuarioAEliminar.id}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                await fetchUsuarios();
                setShowSuccessModal({
                  isOpen: true,
                  mensaje: <>El usuario se ha eliminado con <strong style={{ color: '#4b5563' }}>éxito</strong>.</>
                });
              } catch (error) {
                console.error("Error eliminando:", error);
                alert("Error al eliminar al usuario.");
              }
            }
          });
        }}
      />

      {/* --- MODAL PARA ELIMINAR CURSOS --- */}
      <ModalEliminar
        isOpen={deleteCourse.isOpen}
        itemType="curso"
        itemName={deleteCourse.data?.nombre}
        onClose={() => setDeleteCourse({ isOpen: false, data: null })}
        onConfirm={() => {
          const cursoAEliminar = deleteCourse.data;
          // 1. Cerramos el modal de advertencia rojo
          setDeleteCourse({ isOpen: false, data: null });

          // 2. Abrimos el modal para pedir la contraseña del administrador (igual que con los usuarios)
          setPasswordPrompt({
            isOpen: true,
            type: 'curso',
            actionToExecute: async () => {
              try {
                // 3. Si la contraseña es correcta, disparamos la petición DELETE al backend
                await axios.delete(`http://localhost:8080/api/cursos/${cursoAEliminar.id}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });

                // 4. Volvemos a pedir los cursos para que desaparezca de la pantalla
                await fetchCursos();

                // 5. Mostramos el mensaje de éxito
                setShowSuccessModal({
                  isOpen: true,
                  mensaje: <>El curso se ha eliminado con <strong style={{ color: '#4b5563' }}>éxito</strong>.</>
                });
              } catch (error) {
                console.error("Error eliminando el curso:", error);
                alert("Error al eliminar el curso.");
              }
            }
          });
        }}
      />

      <ModalCurso
        isOpen={courseForm.isOpen}
        mode={courseForm.mode}
        initialData={courseForm.data}
        onClose={() => setCourseForm({ isOpen: false, mode: 'add', data: null })}
        onSave={async (formDataDelHijo) => {
          // formDataDelHijo es lo que nos manda el componente ModalCurso
          // Contiene { nombre: "Inglés", imagen: ArchivoFisico }

          try {
            // Creamos un objeto FormData real para enviar archivos por Axios
            const formDataParaAxios = new FormData();
            formDataParaAxios.append('nombre', formDataDelHijo.nombre);

            // Si hay un archivo de imagen, lo adjuntamos
            if (formDataDelHijo.imagen instanceof File) {
              formDataParaAxios.append('imagen', formDataDelHijo.imagen);
            }

            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data' // <-- IMPORTANTÍSIMO PARA SUBIR ARCHIVOS
              }
            };

            if (courseForm.mode === 'add') {
              // Validamos que sí o sí haya mandado una imagen al crear
              if (!formDataDelHijo.imagen) {
                alert("Debes seleccionar una imagen para crear el curso.");
                return;
              }
              await axios.post('http://localhost:8080/api/cursos', formDataParaAxios, config);
            } else {
              // Modo edición
              await axios.put(`http://localhost:8080/api/cursos/${courseForm.data.id}`, formDataParaAxios, config);
            }

            // Recargamos los cursos y cerramos el modal
            await fetchCursos();
            setCourseForm({ isOpen: false, mode: 'add', data: null });

            setShowSuccessModal({
              isOpen: true,
              mensaje: <>El curso se ha {courseForm.mode === 'add' ? 'creado' : 'actualizado'} con <strong style={{ color: '#4b5563' }}>éxito</strong>.</>
            });

          } catch (error) {
            console.error("Error al guardar el curso:", error);
            alert("Hubo un error al guardar el curso. Revisa la consola.");
          }
        }}
      />

      {/* --- CORRECCIÓN EN LA CONTRASEÑA --- */}
      <ModalConfirmarPassword
        isOpen={passwordPrompt.isOpen}
        onClose={() => setPasswordPrompt({ isOpen: false, type: null, actionToExecute: null })}
        onConfirm={async (passwordIngresada) => {
          try {
            // Se envía como "email" que es el formato estándar de un LoginRequest en Java
            await axios.post('http://localhost:8080/api/usuarios/login', {
              email: adminData.email || adminData.correo,
              password: passwordIngresada
            });

            if (passwordPrompt.actionToExecute) {
              await passwordPrompt.actionToExecute();
            }
            setPasswordPrompt({ isOpen: false, type: null, actionToExecute: null });

          } catch (error) {
            throw new Error("Contraseña incorrecta");
          }
        }}
      />

      {/* --- MODAL PARA AÑADIR HORARIO --- */}
      <ModalAñadirHorario
        isOpen={isAddScheduleModalOpen}
        maestros={maestros} // Pasamos la lista de maestros
        onClose={() => setIsAddScheduleModalOpen(false)}
        onSave={async (datosHorarioRecopilados) => {
          // --- NUEVA VALIDACIÓN DE DUPLICADOS ---
          const yaExiste = horariosCurso.some(horario => {
            // Comparamos el ID del maestro y la fecha/hora exacta de inicio
            return horario.datosCrudos.docente.id === datosHorarioRecopilados.docente.id &&
              horario.datosCrudos.fechaHoraClase === datosHorarioRecopilados.fechaHoraClase;
          });

          if (yaExiste) {
            alert("Este maestro ya tiene una clase programada exactamente a esa misma hora para este curso.");
            return; // Detenemos la ejecución para que no se guarde
          }

          try {
            // Unimos los datos del modal con el ID del curso seleccionado
            const payload = {
              ...datosHorarioRecopilados,
              curso: { id: selectedCourse.id }
            };

            await axios.post('http://localhost:8080/api/horarios', payload, {
              headers: { Authorization: `Bearer ${token}` }
            });

            // Si salió bien: cerramos, recargamos la lista y mostramos éxito
            setIsAddScheduleModalOpen(false);
            await fetchHorariosDeCurso(selectedCourse.id);

            setShowSuccessModal({
              isOpen: true,
              mensaje: <>El horario se ha añadido con <strong style={{ color: '#4b5563' }}>éxito</strong>.</>
            });

          } catch (error) {
            console.error("Error al crear horario:", error);
            alert("Hubo un error al guardar el horario.");
          }
        }}
      />

      {/* 1. MODAL DE ACCIONES (Editar o Borrar) */}
      <ModalAccionHorario
        isOpen={actionModal.isOpen}
        datos={actionModal.data}
        onClose={() => setActionModal({ isOpen: false, data: null })}
        onEdit={() => {
          // Cerramos este y abrimos el de edición pasándole los datos
          setEditClassModal({ isOpen: true, data: actionModal.data });
          setActionModal({ isOpen: false, data: null });
        }}
        onDelete={() => {
          // Cerramos este y abrimos el de confirmación roja pasándole los datos
          setDeleteHorarioConfirmation({ isOpen: true, data: actionModal.data });
          setActionModal({ isOpen: false, data: null });
        }}
      />

      {/* 2. MODAL PARA EDITAR */}
      <ModalEditarHorario
        isOpen={editClassModal.isOpen}
        initialData={editClassModal.data}
        onClose={() => setEditClassModal({ isOpen: false, data: null })}
        onSave={async (datosModificados, idHorario) => {
          try {
            await axios.put(`http://localhost:8080/api/horarios/${idHorario}`, datosModificados, {
              headers: { Authorization: `Bearer ${token}` }
            });

            setEditClassModal({ isOpen: false, data: null });
            await fetchHorariosDeCurso(selectedCourse.id); // Recargamos la vista

            setShowSuccessModal({
              isOpen: true,
              mensaje: <>El horario se ha modificado con <strong style={{ color: '#4b5563' }}>éxito</strong>.</>
            });
          } catch (error) {
            console.error("Error al editar:", error);
            // Si el backend escupe el error de las 24 horas del Trigger
            if (error.response?.data?.includes('24 horas') || error.response?.status === 500) {
              setEditClassModal({ isOpen: false, data: null });
              setError24h({ isOpen: true, horas: 24 });
            } else {
              alert("Ocurrió un error al modificar el horario.");
            }
          }
        }}
      />

      {/* 3. MODAL PARA CONFIRMAR ELIMINACIÓN */}
      <ModalConfirmarEliminarHorario
        isOpen={deleteHorarioConfirmation.isOpen}
        datosHorario={deleteHorarioConfirmation.data}
        onClose={() => setDeleteHorarioConfirmation({ isOpen: false, data: null })}
        onConfirm={() => {
          const horarioAEliminar = deleteHorarioConfirmation.data;
          setDeleteHorarioConfirmation({ isOpen: false, data: null });

          // Pedimos contraseña antes de matar el horario
          setPasswordPrompt({
            isOpen: true,
            type: 'horario',
            actionToExecute: async () => {
              try {
                await axios.delete(`http://localhost:8080/api/horarios/${horarioAEliminar.id}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });

                await fetchHorariosDeCurso(selectedCourse.id);
                setShowSuccessModal({
                  isOpen: true,
                  mensaje: <>El horario se ha eliminado con <strong style={{ color: '#4b5563' }}>éxito</strong>.</>
                });
              } catch (error) {
                console.error("Error al eliminar:", error);
                // Si salta el Trigger de la BD por la regla de las 24hrs / 30 mins
                if (error.response?.data?.includes('24 horas') || error.response?.status === 500) {
                  setError24h({ isOpen: true, horas: 24 });
                } else {
                  alert("Error al eliminar el horario.");
                }
              }
            }
          });
        }}
      />

      <ModalErrorCancelacion isOpen={error24h.isOpen} horasRestantes={error24h.horas} onClose={() => setError24h({ isOpen: false, horas: 0 })} />
      <ModalExito isOpen={showSuccessModal.isOpen} mensaje={showSuccessModal.mensaje} onClose={() => setShowSuccessModal({ isOpen: false, mensaje: '' })} />

    </DashboardLayout>
  );
};