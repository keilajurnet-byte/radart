"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  School, 
  Users, 
  Sparkles, 
  Calendar, 
  CheckCircle, 
  Search, 
  Award, 
  LogOut, 
  ArrowRight,
  BookOpen,
  Info,
  Clock,
  Zap,
  Edit3,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  getRadarState, 
  saveRadarState, 
  UserProfile, 
  Challenge, 
  categories
} from "@/lib/store";
import Navigation from "@/components/navigation";

const PERFILES_DETALLES = {
  "Creador Digital": {
    emoji: "📱",
    color: "#E91B8C",
    colorBg: "#FDE8F4",
    fortalezas: ["Comunicación Efectiva", "Creatividad Digital", "Redacción Audiovisual"],
    intereses: ["Redes Sociales", "Diseño", "Marketing"],
    carreras: ["Lic. en Comunicación Social", "Tec. en Marketing Digital", "Diseño Multimedial"]
  },
  "Analista de Datos": {
    emoji: "📊",
    color: "#1B96D5",
    colorBg: "#E3F4FC",
    fortalezas: ["Análisis Lógico", "Orden y Detalle", "Uso de Hojas de Cálculo"],
    intereses: ["Estadísticas", "Sistemas", "Administración"],
    carreras: ["Lic. en Informática", "Tec. en Ciencia de Datos", "Contador Público"]
  },
  "Guardián Patagónico": {
    emoji: "🐳",
    color: "#4BB543",
    colorBg: "#E8F8E7",
    fortalezas: ["Conexión con el Entorno", "Trabajo de Campo", "Conciencia Ecológica"],
    intereses: ["Fauna Marina", "Conservación", "Turismo Sustentable"],
    carreras: ["Lic. en Ciencias Biológicas", "Tec. en Guardaparque", "Lic. en Gestión Ambiental"]
  },
  "Anfitrión Local": {
    emoji: "🗺️",
    color: "#F7C022",
    colorBg: "#FEF8E3",
    fortalezas: ["Atención al Visitante", "Idiomas", "Relaciones Públicas"],
    intereses: ["Guiado", "Servicio Turístico", "Historia Local"],
    carreras: ["Lic. en Turismo y Hotelería", "Guía de Turismo", "Traductorado de Inglés"]
  },
  "Organizador Maestro": {
    emoji: "⚡",
    color: "#9B59B6",
    colorBg: "#F2EAF8",
    fortalezas: ["Planificación", "Coordinación de Grupos", "Logística Operativa"],
    intereses: ["Eventos", "Administración", "Procesos Organizativos"],
    carreras: ["Lic. en Administración", "Tec. en Logística", "Relaciones Públicas"]
  },
  "Comunicador Creativo": {
    emoji: "🎨",
    color: "#1BBFBF",
    colorBg: "#E3F8F8",
    fortalezas: ["Diseño Gráfico", "Expresión Artística", "Generación de Ideas"],
    intereses: ["Ilustración", "Campañas Publicitarias", "Identidad de Marca"],
    carreras: ["Lic. en Diseño de Comunicación Visual", "Publicidad", "Artes Plásticas"]
  }
};

export default function DocentePortal() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [radarState, setRadarState] = useState<any>(null);

  // Tab navigation: 'alumnos' | 'intereses' | 'cronograma' | 'validaciones'
  const [activeTab, setActiveTab] = useState<'alumnos' | 'intereses' | 'cronograma' | 'validaciones'>('alumnos');

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Selection for right drawer (student detail sheet)
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  // Validation modal
  const [validatingStudent, setValidatingStudent] = useState<any | null>(null);
  const [validationTasks, setValidationTasks] = useState({
    asistencia: true,
    objetivos: true,
    bitacora: true
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const state = getRadarState();
    setRadarState(state);

    // Auto-login as Laura Martínez if no user or wrong role
    if (!state.currentUser || state.currentUser.rol !== 'docente') {
      const defaultDocente = state.users.find(u => u.email === "docente@ees736.edu.ar") || {
        email: "docente@ees736.edu.ar",
        rol: "docente",
        nombre: "Prof. Laura Martínez",
        materia: "Economía y Administración",
        cursos: ["4°B", "5°A"],
        escuela: "E.E.S. N° 736 · Rada Tilly"
      };
      state.currentUser = defaultDocente;
      saveRadarState(state);
      setRadarState(state);
      setCurrentUser(defaultDocente);
    } else {
      setCurrentUser(state.currentUser);
    }
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveStudentNotes = (studentEmail: string, note: string) => {
    if (!radarState) return;
    const state = { ...radarState };
    const userIdx = state.users.findIndex((u: any) => u.email === studentEmail);
    if (userIdx !== -1) {
      state.users[userIdx].notasDocente = note;
      saveRadarState(state);
      setRadarState(state);
      
      // Update selected student reference
      if (selectedStudent && selectedStudent.email === studentEmail) {
        setSelectedStudent({ ...selectedStudent, notasDocente: note });
      }
    }
  };

  const handleApproveDDJJ = (studentEmail: string) => {
    if (!radarState) return;
    const state = { ...radarState };
    const userIdx = state.users.findIndex((u: any) => u.email === studentEmail);
    if (userIdx !== -1) {
      state.users[userIdx].ddjjValidada = true;
      state.users[userIdx].xp = (state.users[userIdx].xp || 0) + 15;
      if (state.users[userIdx].xp >= 500 && state.users[userIdx].nivel === 1) {
        state.users[userIdx].nivel = 2;
      }
      saveRadarState(state);
      setRadarState(state);
      triggerToast("¡Declaración Jurada Aprobada! +15 XP para el alumno ✍️");
      
      if (selectedStudent && selectedStudent.email === studentEmail) {
        setSelectedStudent({
          ...selectedStudent,
          ddjjValidada: true,
          xp: state.users[userIdx].xp,
          nivel: state.users[userIdx].nivel
        });
      }
    }
  };

  const handleValidateCertificate = () => {
    if (!validatingStudent || !radarState) return;

    const state = { ...radarState };
    const student = state.users.find((u: any) => u.email === validatingStudent.student.email);
    if (student) {
      if (!student.certificados) student.certificados = {};
      student.certificados.nivel1 = "desbloqueado";

      // If level 2 is already unlocked, unlock level 3
      if (student.certificados.nivel2 === "desbloqueado") {
        student.certificados.nivel3 = "desbloqueado";
      }

      // Find challenge in progress to mark as validated
      const mId = validatingStudent.challenge.id;
      const ch = state.challenges.find((c: any) => c.id === mId);
      if (ch) {
        ch.validatedByTeacher = true;
      }

      // Add validation bonus XP
      student.xp = (student.xp || 0) + 100;
      if (student.xp >= 600 && student.nivel === 1) {
        student.nivel = 2;
      }
    }

    // Update session user if it matches validated student
    if (state.currentUser && state.currentUser.email === student.email) {
      state.currentUser = student;
    }

    saveRadarState(state);
    setRadarState(state);
    setValidatingStudent(null);
    setSelectedStudent(null);
    triggerToast("¡Certificado Nivel 1 Emitido y +100 XP Otorgados! ✍️");
    confetti({ particleCount: 100, spread: 60 });
  };

  if (!currentUser) return null;

  // Filter students assigned to this teacher (e.g. course matching Laura's course list: 4°B, 5°A)
  const allStudents = (radarState?.users || []).filter(
    (u: any) => u.rol === "estudiante" && (currentUser.cursos || []).includes(u.curso)
  );

  const filteredStudents = allStudents.filter((s: any) => 
    s.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.curso.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Extract active missions for this teacher's class
  const activePrácticas: any[] = [];
  const pendingValidations: any[] = [];

  allStudents.forEach((student: any) => {
    (student.misionesEnCurso || []).forEach((mId: number) => {
      const matchingCh = (radarState?.challenges || []).find((c: any) => Number(c.id) === mId);
      if (matchingCh) {
        const pr = { student, challenge: matchingCh };
        activePrácticas.push(pr);

        // Submissions that are not validated by teacher yet
        if (!matchingCh.validatedByTeacher) {
          pendingValidations.push(pr);
        }
      }
    });
  });

  // Calculate profile distribution counts
  const profileCounts: Record<string, number> = {
    "Creador Digital": 0,
    "Analista de Datos": 0,
    "Guardián Patagónico": 0,
    "Anfitrión Local": 0,
    "Organizador Maestro": 0,
    "Comunicador Creativo": 0,
  };

  allStudents.forEach((s: any) => {
    if (s.perfil && s.perfil in profileCounts) {
      profileCounts[s.perfil]++;
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pb-24 md:pb-0">
      
      {/* Sidebar - Desktop Layout */}
      <aside className="w-full md:w-64 bg-rtDark text-white p-6 flex flex-col justify-between shrink-0 md:min-h-screen">
        <div className="space-y-8">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-white">Radar</span>
                <span className="text-rtPurple"> T</span>
              </span>
              <span className="text-[10px] font-bold bg-rtPurple text-white px-2 py-0.5 rounded">Docente</span>
            </Link>
          </div>

          <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto no-scrollbar pb-2 md:pb-0 border-b border-white/10 md:border-b-0">
            <button 
              onClick={() => setActiveTab("alumnos")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs md:text-sm text-left transition-colors whitespace-nowrap",
                activeTab === "alumnos" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              🏫 Mi Clase
            </button>
            <button 
              onClick={() => setActiveTab("intereses")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs md:text-sm text-left transition-colors whitespace-nowrap",
                activeTab === "intereses" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              <Sparkles className="h-4 w-4" /> Intereses del Aula
            </button>
            <button 
              onClick={() => setActiveTab("cronograma")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs md:text-sm text-left transition-colors whitespace-nowrap",
                activeTab === "cronograma" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              <Calendar className="h-4 w-4" /> Cronograma
            </button>
            <button 
              onClick={() => setActiveTab("validaciones")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs md:text-sm text-left transition-colors whitespace-nowrap",
                activeTab === "validaciones" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              <CheckCircle className="h-4 w-4" /> Validaciones ({pendingValidations.length})
            </button>
          </nav>
        </div>

        <div className="space-y-4 mt-6 md:mt-0">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hidden md:block">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Docente Tutor</p>
            <p className="font-extrabold text-sm mt-1 text-white">{currentUser.nombre}</p>
            <p className="text-[10px] text-slate-400 font-semibold">{currentUser.escuela}</p>
          </div>
          <button 
            onClick={() => {
              const state = getRadarState();
              state.currentUser = null;
              saveRadarState(state);
              router.push("/");
            }} 
            className="w-full bg-red-600/20 text-red-400 hover:bg-red-600/30 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-xs"
          >
            <LogOut className="w-4 h-4" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-5xl mx-auto w-full space-y-6">
        
        {/* TOAST MESSAGE */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 p-4 text-white shadow-2xl animate-fade-in text-sm font-black">
            <span>🎉</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* TAB 1: MI CLASE */}
        {activeTab === "alumnos" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Class roster list */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-black text-rtDark">Mi Clase ({allStudents.length})</h1>
                  <p className="text-xs text-slate-500 font-bold">Cursos asignados: {currentUser.cursos?.join(", ")}</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Buscar alumno..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs font-semibold rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-rtPurple bg-white"
                  />
                </div>
              </div>

              {/* Students Table */}
              <div className="bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-55 border-b border-slate-200 text-slate-400 font-black">
                        <th className="p-4 uppercase">Alumno</th>
                        <th className="p-4 uppercase">Curso</th>
                        <th className="p-4 uppercase">Puntos XP</th>
                        <th className="p-4 uppercase text-right">Insignias</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr 
                          key={student.email}
                          onClick={() => setSelectedStudent(student)}
                          className={cn(
                            "border-b border-slate-100 last:border-0 hover:bg-slate-50 cursor-pointer transition-colors",
                            selectedStudent?.email === student.email && "bg-rtPurpleLight/10"
                          )}
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">🎒</span>
                              <div>
                                <p className="font-extrabold text-slate-800">{student.nombre}</p>
                                <p className="text-[10px] text-slate-400 font-bold">{student.perfil}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-bold text-slate-500">{student.curso}</td>
                          <td className="p-4 font-black text-rtPurple flex items-center gap-0.5 mt-2">
                            <Zap className="h-3 w-3 fill-current" /> {student.xp}
                          </td>
                          <td className="p-4 text-right font-extrabold text-slate-600">
                            {student.misionesCompletadas?.length || 0} completas
                          </td>
                        </tr>
                      ))}
                      {filteredStudents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-slate-400 font-bold">
                            No se encontraron alumnos en la lista.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right student details sheet / sidebar */}
            <div className="lg:col-span-4 space-y-4">
              {selectedStudent ? (
                <div className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm space-y-5 animate-slide-in">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🦊</span>
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-sm leading-tight">{selectedStudent.nombre}</h3>
                        <p className="text-[10px] font-bold text-slate-400">{selectedStudent.curso} · {selectedStudent.anio}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedStudent(null)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Fortalezas Vocacionales</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedStudent.fortalezas?.map((f: string, fIdx: number) => (
                        <span key={fIdx} className="bg-slate-100 text-slate-600 text-[9px] font-black px-2 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic validation options */}
                  {(() => {
                    const activeMissionId = selectedStudent.misionesEnCurso?.[0];
                    const ch = activeMissionId && (radarState?.challenges || []).find((c: any) => Number(c.id) === activeMissionId);
                    
                    if (ch) {
                      return (
                        <div className="bg-rtPurpleLight/20 border border-rtPurple/30 rounded-2xl p-4 space-y-2">
                          <span className="text-[9px] font-black text-rtPurple uppercase tracking-wider block">Misión en Curso</span>
                          <h4 className="font-extrabold text-slate-800 text-xs leading-snug">{ch.title}</h4>
                          <p className="text-[10px] text-slate-400 font-bold">{ch.companyName}</p>
                          
                          {!ch.validatedByTeacher ? (
                            <button
                              onClick={() => setValidatingStudent({ student: selectedStudent, challenge: ch })}
                              className="mt-3 w-full bg-rtPurple text-white font-black py-2.5 rounded-xl text-xs btn-3d shadow-[0_2.5px_0_#623475] hover:bg-rtPurple/90"
                            >
                              Validar Práctica ✍️
                            </button>
                          ) : (
                            <div className="mt-2 flex items-center justify-center gap-1.5 rounded-xl bg-rtGreenLight py-2 text-xs font-black text-rtGreen">
                              <CheckCircle className="h-3.5 w-3.5" /> Práctica Validada
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {/* Parental Authorization (DDJJ) Validation Section */}
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Autorización Parental (DDJJ)</span>
                    {selectedStudent.ddjjFile ? (
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-650 truncate max-w-[150px]">📄 {selectedStudent.ddjjFile}</span>
                          <span className={cn(
                            "text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider",
                            selectedStudent.ddjjValidada ? "bg-rtGreenLight text-rtGreen" : "bg-rtYellowLight text-rtYellow"
                          )}>
                            {selectedStudent.ddjjValidada ? "Validada" : "Pendiente"}
                          </span>
                        </div>
                        {!selectedStudent.ddjjValidada ? (
                          <button
                            onClick={() => handleApproveDDJJ(selectedStudent.email)}
                            className="w-full bg-rtTeal text-white font-black py-2 rounded-xl text-xs btn-3d shadow-[0_2px_0_#116c6c] hover:bg-rtTeal/90"
                          >
                            Aprobar Autorización ✓
                          </button>
                        ) : (
                          <p className="text-[10px] text-rtGreen font-bold italic">✓ Autorización aprobada por el tutor escolar.</p>
                        )}
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-center text-red-650 text-xs font-bold">
                        ⚠️ Sin Declaración Jurada cargada por el estudiante.
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Notas Pedagógicas</label>
                    <textarea 
                      rows={4}
                      value={selectedStudent.notasDocente || ""}
                      onChange={(e) => saveStudentNotes(selectedStudent.email, e.target.value)}
                      placeholder="Escribí aquí observaciones sobre el desempeño, puntualidad y trabajo del alumno..."
                      className="w-full border-2 border-slate-200 rounded-2xl px-3 py-2 font-bold focus:outline-none focus:border-rtPurple text-xs leading-relaxed"
                    />
                    <p className="text-[9px] text-slate-400 font-bold italic">Las notas se guardan automáticamente en tiempo real.</p>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-bold text-xs">
                  Seleccioná un alumno de la clase para ver detalles y gestionar notas.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: INTERESES DEL AULA */}
        {activeTab === "intereses" && (
          <div className="space-y-6">
            <div className="text-center max-w-lg mx-auto space-y-1">
              <h1 className="text-3xl font-black text-rtDark">Intereses del Aula</h1>
              <p className="text-xs text-slate-500 font-bold">Consolidado vocacional basado en los tests de orientación del curso.</p>
            </div>

            {/* Custom SVG Profile Chart */}
            <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_#1a1a2e] space-y-6">
              <h3 className="text-base font-black text-slate-800">Distribución de Perfiles Vocacionales</h3>
              
              <div className="space-y-4">
                {Object.keys(profileCounts).map((profile) => {
                  const count = profileCounts[profile];
                  const details = PERFILES_DETALLES[profile as keyof typeof PERFILES_DETALLES];
                  const maxCount = Math.max(...Object.values(profileCounts)) || 1;
                  const percent = (count / maxCount) * 100;
                  
                  return (
                    <div key={profile} className="space-y-1">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="flex items-center gap-1">
                          <span>{details.emoji}</span>
                          <span className="text-slate-800">{profile}</span>
                        </span>
                        <span className="text-slate-500">{count} {count === 1 ? "alumno" : "alumnos"}</span>
                      </div>
                      
                      <div className="h-5 bg-slate-100 rounded-lg overflow-hidden border border-slate-200/50 p-0.5">
                        <div 
                          className="h-full rounded-md transition-all duration-500"
                          style={{ 
                            width: `${percent}%`,
                            backgroundColor: details.color
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI pedagogical insight comments */}
            <div className="bg-rtPurpleLight/20 border-2 border-rtPurple rounded-3xl p-6 space-y-3">
              <h4 className="text-lg font-black text-rtPurple flex items-center gap-2">
                <Sparkles className="h-5 w-5 fill-current" /> Recomendaciones Pedagógicas de Radar T
              </h4>
              <p className="text-sm font-bold text-slate-700 leading-relaxed">
                * Basado en el alto interés del aula en **Conservación Ambiental** y **Atención al Turista** (perfiles *Guardián Patagónico* y *Anfitrión Local*), te sugerimos articular proyectos interdisciplinarios vinculando las materias Biología y Geografía con las misiones del CONICET y guías de turismo costero.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: CRONOGRAMA */}
        {activeTab === "cronograma" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-rtDark">Cronograma de Prácticas</h1>
              <p className="text-xs text-slate-500 font-bold">Monitoreo de plazos y días restantes para la validación escolar.</p>
            </div>

            <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_#1a1a2e] space-y-4">
              <h3 className="text-base font-black text-slate-850">Semáforo de Plazos de Entrega</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-slate-400 font-black">
                      <th className="pb-3 text-xs uppercase">Alumno</th>
                      <th className="pb-3 text-xs uppercase">Misión</th>
                      <th className="pb-3 text-xs uppercase">Días Restantes</th>
                      <th className="pb-3 text-xs uppercase">Semáforo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activePrácticas.map((pr, index) => {
                      // Mock remaining days based on student name
                      let remainingDays = 12;
                      if (pr.student.nombre.includes("Valentina")) remainingDays = 4;
                      if (pr.student.nombre.includes("Camila")) remainingDays = 22;
                      
                      const isUrgent = remainingDays < 7;
                      const isMedium = remainingDays >= 7 && remainingDays <= 15;

                      return (
                        <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                          <td className="py-3 font-bold text-slate-800">{pr.student.nombre}</td>
                          <td className="py-3 font-bold text-slate-600 truncate max-w-xs">{pr.challenge.title}</td>
                          <td className="py-3 font-black text-slate-700">{remainingDays} días</td>
                          <td className="py-3">
                            <span className={cn(
                              "inline-flex items-center gap-1 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider",
                              isUrgent ? "bg-rtPinkLight text-rtPink" : 
                              isMedium ? "bg-rtYellowLight text-rtYellow" : "bg-rtGreenLight text-rtGreen"
                            )}>
                              <span className={cn(
                                "w-2 h-2 rounded-full",
                                isUrgent ? "bg-rtPink" : isMedium ? "bg-rtYellow" : "bg-rtGreen"
                              )} />
                              {isUrgent ? "Crítico" : isMedium ? "Atención" : "A Tiempo"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {activePrácticas.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 font-bold">
                          No hay prácticas activas registradas en este curso.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VALIDACIONES PENDIENTES */}
        {activeTab === "validaciones" && (
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-black text-rtDark">Validaciones Pendientes</h1>
              <p className="text-xs text-slate-500 font-bold">Firma digital de docentes tutores para la emisión de Certificados de Participación (Nivel 1).</p>
            </div>

            <div className="space-y-3">
              {pendingValidations.map((pr, index) => (
                <div 
                  key={index}
                  className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="bg-rtPurpleLight text-rtPurple text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider block w-fit">
                      Pendiente Firma
                    </span>
                    <h3 className="font-extrabold text-slate-800 text-sm leading-snug">{pr.challenge.title}</h3>
                    <p className="text-xs text-slate-500 font-bold">
                      Alumno: {pr.student.nombre} · Tutor: {pr.challenge.companyName}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setValidatingStudent(pr)}
                    className="bg-rtPurple text-white font-black px-5 py-3 rounded-2xl btn-3d shadow-[0_4px_0_#623475] hover:bg-rtPurple/90 text-xs shrink-0 self-start sm:self-center"
                  >
                    Firmar y Validar ✍️
                  </button>
                </div>
              ))}
              
              {pendingValidations.length === 0 && (
                <div className="bg-white border-2 border-slate-200 rounded-3xl p-12 text-center text-slate-400 font-bold">
                  No tenés validaciones pendientes en este momento.
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* VALIDATION CONFIRM MODAL */}
      {validatingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-rtDark">Firma de Certificación</h3>
                <p className="text-xs text-slate-400 font-bold">Validar objetivos pedagógicos oficiales</p>
              </div>
              <button 
                onClick={() => setValidatingStudent(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-bold text-slate-650 space-y-1">
              <p><strong>Alumno:</strong> {validatingStudent.student.nombre}</p>
              <p><strong>Curso:</strong> {validatingStudent.student.curso}</p>
              <p><strong>Práctica:</strong> {validatingStudent.challenge.title}</p>
              <p className="text-rtPink"><strong>DNI Alumno:</strong> [Verificado y cargado automáticamente por la institución escolar]</p>
            </div>

            {/* Validation Checklist */}
            <div className="space-y-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Control de Criterios de Validación</span>
              
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={validationTasks.asistencia}
                    onChange={(e) => setValidationTasks({ ...validationTasks, asistencia: e.target.checked })}
                    className="h-4 w-4 rounded accent-rtPurple border-gray-300 focus:ring-rtPurple"
                  />
                  <span className="text-xs font-bold text-slate-600">Cumplimiento del 80% de participación y entrega digital de tareas.</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={validationTasks.objetivos}
                    onChange={(e) => setValidationTasks({ ...validationTasks, objetivos: e.target.checked })}
                    className="h-4 w-4 rounded accent-rtPurple border-gray-300 focus:ring-rtPurple"
                  />
                  <span className="text-xs font-bold text-slate-600">Alcanzó los objetivos técnicos de la misión.</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={validationTasks.bitacora}
                    onChange={(e) => setValidationTasks({ ...validationTasks, bitacora: e.target.checked })}
                    className="h-4 w-4 rounded accent-rtPurple border-gray-300 focus:ring-rtPurple"
                  />
                  <span className="text-xs font-bold text-slate-600">Bitácora de actividades pedagógica completada.</span>
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setValidatingStudent(null)}
                className="w-1/3 border-2 border-slate-250 text-slate-700 font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#e2e8f0] text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={handleValidateCertificate}
                disabled={!validationTasks.asistencia || !validationTasks.objetivos || !validationTasks.bitacora}
                className="w-2/3 bg-rtPurple text-white font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#623475] disabled:opacity-50 text-xs flex items-center justify-center gap-1"
              >
                Firmar y Validar ✍️
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
