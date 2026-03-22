import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { ActionCard } from '../components/dashboard/ActionCard';
import { ConfirmModal } from '../components/ui/ConfirmModal';
import { TablaHorarios } from '../components/dashboard/TablaHorarios';
import { CursoCard } from '../components/dashboard/CursoCard'; // REUTILIZAMOS DEL ADMIN
import { CalendarioSemanario } from '../components/dashboard/CalendarioSemanario'; // REUTILIZAMOS DEL ADMIN
import { ModalAñadirHorario } from '../components/dashboard/ModalAñadirHorario';
import { ModalEditarHorario } from '../components/dashboard/ModalEditarHorario';
import { ModalExito } from '../components/dashboard/ModalExito';
import { ModalConfirmarEliminarHorario } from '../components/dashboard/ModalConfirmarEliminarHorario';
import { ModalAccionHorario } from '../components/dashboard/ModalAccionHorario';
import { ModalConfirmarPassword } from '../components/dashboard/ModalConfirmarPassword';
import { ModalErrorCancelacion } from '../components/dashboard/ModalErrorCancelacion';
import './DashboardMaestro.css';

// Assets
import relojRellenoIcon from '../assets/reloj_relleno.svg';
import bookIcon2 from '../assets/book_icon_2.svg';

export const DashboardMaestro = () => {
  const [activeView, setActiveView] = useState('main'); 
  const navigate = useNavigate();

  // DATOS REALES DEL MAESTRO LOGUEADO
  const maestroData = JSON.parse(localStorage.getItem('usuario') || '{}');
  const token = localStorage.getItem('token');

  // ESTADOS PARA DATOS
  const [cursos, setCursos] = useState([]);
  const [misHorariosGenerales, setMisHorariosGenerales] = useState([]);
  const [horariosCurso, setHorariosCurso] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); 

  // ESTADOS DE MODALES
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);
  const [editClassModal, setEditClassModal] = useState({ isOpen: false, data: null });
  const [deleteHorarioConfirmation, setDeleteHorarioConfirmation] = useState({ isOpen: false, data: null });
  const [actionModal, setActionModal] = useState({ isOpen: false, data: null });
  const [showSuccessModal, setShowSuccessModal] = useState({ isOpen: false, mensaje: '' });
  const [error24h, setError24h] = useState({ isOpen: false, horas: 0 });
  const [passwordPrompt, setPasswordPrompt] = useState({ isOpen: false, type: null, actionToExecute: null });

  // 1. CARGAR CURSOS (Solo para verlos)
  const fetchCursos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/cursos', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const cursosMapeados = response.data.map(curso => ({
        id: curso.id,
        nombre: curso.nombre,
        flag: curso.urlImagen
      }));
      setCursos(cursosMapeados);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  // 2. CARGAR TODOS LOS HORARIOS DEL MAESTRO (Para la vista de "Mis Clases")
  const fetchMisHorariosGenerales = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/horarios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // FILTRAMOS SOLO LOS DEL MAESTRO ACTUAL
      const misHorarios = response.data.filter(h => h.docente?.id === maestroData.id);
      
      const horariosMapeados = misHorarios.map(h => {
        const fechaObj = new Date(h.fechaHoraClase);
        return {
          id: h.id,
          curso: h.curso?.nombre || 'Curso',
          modalidad: h.modalidad || 'Presencial', // Asumiendo que tengas modalidad, o pon un default
          fecha: fechaObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
          hora: fechaObj.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
          datosCrudos: h
        };
      });
      setMisHorariosGenerales(horariosMapeados);
    } catch (error) {
      console.error("Error al cargar todos los horarios:", error);
    }
  };

  // 3. CARGAR HORARIOS DE UN CURSO ESPECÍFICO (Para el Calendario)
  const fetchHorariosDeCurso = async (cursoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/horarios/curso/${cursoId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // FILTRAMOS SOLO LOS DEL MAESTRO ACTUAL EN ESTE CURSO
      const misHorariosEnCurso = response.data.filter(h => h.docente?.id === maestroData.id);

      const horariosMapeados = misHorariosEnCurso.map(h => {
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
          datosCrudos: h 
        };
      });
      setHorariosCurso(horariosMapeados);
    } catch (error) {
      console.error("Error al cargar horarios del curso:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
    fetchMisHorariosGenerales();
  }, []);

  useEffect(() => {
    if (selectedCourse && selectedCourse.id) {
      setHorariosCurso([]);
      fetchHorariosDeCurso(selectedCourse.id);
    }
  }, [selectedCourse]);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  console.log("Datos exactos del maestro:", maestroData);
  
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
          <h1 className="dashboard-greeting">Hola ¡{maestroData.nombre || maestroData.fullName || 'Docente'}!</h1>
          <h2 className="section-title">Acciones Rápidas</h2>
          <div className="quick-actions">
            <ActionCard title="Horarios" icon={relojRellenoIcon} onClick={() => setActiveView('assigned_courses')} />
            <ActionCard title="Cursos" icon={bookIcon2} onClick={() => setActiveView('courses')} />
          </div>
        </>
      )}

      {/* VISTA B: BANDERAS (CURSOS) */}
      {activeView === 'courses' && (
        <>
          <h1 className="dashboard-greeting" style={{marginBottom: '1.5rem'}}>Hola ¡{maestroData.nombre || maestroData.fullName || 'Docente'}!</h1>
          <div className="courses-subtitle" style={{marginBottom: '1rem', color: '#4b5563'}}>Cursos Disponibles:</div>
          
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {cursos.map((curso) => (
              <CursoCard
                key={curso.id}
                curso={curso}
                onClick={(c) => { setSelectedCourse(c); setActiveView('calendar'); }}
                // NO PASAMOS onEdit NI onDelete PARA QUE EL MAESTRO NO PUEDA HACERLO
              />
            ))}
          </div>
        </>
      )}

      {/* VISTA C: CALENDARIO */}
      {activeView === 'calendar' && (
        <CalendarioSemanario 
          curso={selectedCourse}
          horarios={horariosCurso}
          onBack={() => { setActiveView('courses'); setSelectedCourse(null); }}
          onAddSchedule={() => setIsAddScheduleModalOpen(true)}
          onEventClick={(datosHorario) => { 
            setActionModal({ 
              isOpen: true, 
              data: { ...datosHorario, curso: selectedCourse?.nombre } 
            }); 
          }}
        />
      )}

      {/* VISTA D: TABLA GENERAL DE HORARIOS DEL MAESTRO */}
      {activeView === 'assigned_courses' && (
        <>
          <div className="calendar-top-bar">
            <div style={{width: '100%'}}>
              <div className="breadcrumbs">Mis clases {'>'} <strong>Cursos asignados</strong></div>
              <div className="calendar-title-container" style={{marginBottom: '1.5rem'}}>
                <h2>Mis próximos horarios</h2>
              </div>
            </div>
            <button className="btn-back" onClick={() => setActiveView('main')} style={{flexShrink: 0}}>{'<'} Atrás</button>
          </div>

          <TablaHorarios 
            data={misHorariosGenerales} 
            onEdit={(item) => setEditClassModal({ isOpen: true, data: item.datosCrudos })} 
            onDelete={(item) => {
              setDeleteHorarioConfirmation({ 
                isOpen: true, 
                data: { ...item.datosCrudos, curso: item.curso }
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
        // LE PASAMOS SOLO AL MAESTRO LOGUEADO COMO OPCIÓN
        maestros={[{ id: maestroData.id, fullName: maestroData.fullName, nombre: maestroData.fullName }]}
        onClose={() => setIsAddScheduleModalOpen(false)}
        onSave={async (datosHorarioRecopilados) => {
          // --- VALIDACIÓN DE DUPLICADOS ---
          const yaExiste = horariosCurso.some(horario => 
            horario.datosCrudos.fechaHoraClase === datosHorarioRecopilados.fechaHoraClase
          );

          if (yaExiste) {
            alert("Ya tienes una clase programada exactamente a esa misma hora para este curso.");
            return;
          }

          try {
            const payload = {
              ...datosHorarioRecopilados,
              curso: { id: selectedCourse.id },
              docente: { id: maestroData.id } // Aseguramos que sea él mismo
            };

            await axios.post('http://localhost:8080/api/horarios', payload, {
              headers: { Authorization: `Bearer ${token}` }
            });

            setIsAddScheduleModalOpen(false);
            await fetchHorariosDeCurso(selectedCourse.id);
            await fetchMisHorariosGenerales(); // Refrescamos la tabla global también

            setShowSuccessModal({ 
              isOpen: true, 
              mensaje: <>El horario se ha añadido con <strong style={{color: '#4b5563'}}>éxito</strong>.</>
            });
          } catch (error) {
            console.error("Error al crear horario:", error);
            alert("Hubo un error al guardar el horario.");
          }
        }}
      />

      <ModalAccionHorario 
        isOpen={actionModal.isOpen}
        datos={actionModal.data}
        onClose={() => setActionModal({ isOpen: false, data: null })}
        onEdit={() => {
          setEditClassModal({ isOpen: true, data: actionModal.data });
          setActionModal({ isOpen: false, data: null });
        }}
        onDelete={() => {
          setDeleteHorarioConfirmation({ isOpen: true, data: actionModal.data });
          setActionModal({ isOpen: false, data: null });
        }}
      />

      <ModalEditarHorario 
        isOpen={editClassModal.isOpen}
        initialData={editClassModal.data}
        onClose={() => setEditClassModal({ isOpen: false, data: null })}
        onSave={async (datosModificados, idHorario) => {
          try {
            // Aseguramos que el maestro no cambie el docente al editar
            datosModificados.docente = { id: maestroData.id };

            await axios.put(`http://localhost:8080/api/horarios/${idHorario}`, datosModificados, {
              headers: { Authorization: `Bearer ${token}` }
            });

            setEditClassModal({ isOpen: false, data: null });
            if (selectedCourse) await fetchHorariosDeCurso(selectedCourse.id);
            await fetchMisHorariosGenerales(); 

            setShowSuccessModal({
              isOpen: true,
              mensaje: <>El horario se ha modificado con <strong style={{ color: '#4b5563' }}>éxito</strong>.</>
            });
          } catch (error) {
            if (error.response?.data?.includes('24 horas') || error.response?.status === 500) {
              setEditClassModal({ isOpen: false, data: null });
              setError24h({ isOpen: true, horas: 24 });
            } else {
              alert("Ocurrió un error al modificar el horario.");
            }
          }
        }}
      />

      <ModalConfirmarEliminarHorario 
        isOpen={deleteHorarioConfirmation.isOpen}
        datosHorario={deleteHorarioConfirmation.data}
        onClose={() => setDeleteHorarioConfirmation({ isOpen: false, data: null })}
        onConfirm={() => {
          const horarioAEliminar = deleteHorarioConfirmation.data;
          setDeleteHorarioConfirmation({ isOpen: false, data: null });

          setPasswordPrompt({
            isOpen: true,
            type: 'horario',
            actionToExecute: async () => {
              try {
                await axios.delete(`http://localhost:8080/api/horarios/${horarioAEliminar.id || horarioAEliminar.datosCrudos?.id}`, {
                  headers: { Authorization: `Bearer ${token}` }
                });

                if (selectedCourse) await fetchHorariosDeCurso(selectedCourse.id);
                await fetchMisHorariosGenerales();
                
                setShowSuccessModal({ 
                  isOpen: true, 
                  mensaje: <>El horario se ha eliminado con <strong style={{color: '#4b5563'}}>éxito</strong>.</>
                });
              } catch (error) {
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

      <ModalConfirmarPassword
        isOpen={passwordPrompt.isOpen}
        onClose={() => setPasswordPrompt({ isOpen: false, type: null, actionToExecute: null })}
        onConfirm={async (passwordIngresada) => {
          try {
            await axios.post('http://localhost:8080/api/usuarios/login', {
              email: maestroData.email || maestroData.correo,
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

      <ModalErrorCancelacion isOpen={error24h.isOpen} horasRestantes={error24h.horas} onClose={() => setError24h({ isOpen: false, horas: 0 })} />
      <ModalExito isOpen={showSuccessModal.isOpen} mensaje={showSuccessModal.mensaje} onClose={() => setShowSuccessModal({ isOpen: false, mensaje: '' })} />

    </DashboardLayout>
  );
};