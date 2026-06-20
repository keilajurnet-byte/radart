"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Building2, 
  Zap, 
  Trophy, 
  Check, 
  PlusCircle, 
  ListTodo, 
  Users, 
  LogOut, 
  ArrowRight,
  X,
  Award,
  Search,
  Mail,
  UserCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  getRadarState, 
  saveRadarState, 
  categories, 
  Challenge, 
  UserProfile, 
  ChallengeCategory,
  GradeLevel,
  gradeLevels
} from "@/lib/store";
import Navigation from "@/components/navigation";

export default function EmpresaPortal() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [radarState, setRadarState] = useState<any>(null);

  // Tab navigation: 'inicio' | 'publicar' | 'misiones' | 'postulantes' | 'talento'
  const [activeTab, setActiveTab] = useState<'inicio' | 'publicar' | 'misiones' | 'postulantes' | 'talento'>('inicio');

  // Form state
  const [formStep, setFormStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | null>(null);
  const [challengeTitle, setChallengeTitle] = useState("");
  const [challengeGrade, setChallengeGrade] = useState<GradeLevel>("4° Año");
  const [challengeDuration, setChallengeDuration] = useState("2 semanas");
  const [challengeXp, setChallengeXp] = useState(200);

  // Enriched 7 sections form state
  const [challengeProblema, setChallengeProblema] = useState("");
  const [challengeResultado, setChallengeResultado] = useState("");
  const [challengeModalidad, setChallengeModalidad] = useState("Documento/informe subido a la plataforma");
  const [challengeEtapas, setChallengeEtapas] = useState("Etapa 1: Investigación — Semana 1\nEtapa 2: Desarrollo del Contenido — Semanas 2-3\nEtapa 3: Entrega final y Feedback — Semana 4");
  const [challengeRecursos, setChallengeRecursos] = useState(true);
  const [challengeCriterios, setChallengeCriterios] = useState("");

  // Evaluation states
  const [evaluatingPostulante, setEvaluatingPostulante] = useState<any | null>(null);
  const [evalGrade, setEvalGrade] = useState("Excelente (A+)");
  const [evalComment, setEvalComment] = useState("");

  // Talent Invitation state
  const [invitingStudent, setInvitingStudent] = useState<any | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const state = getRadarState();
    setRadarState(state);
    
    // Auto-login as Avistaje Patagonia if no user or wrong role
    if (!state.currentUser || state.currentUser.rol !== 'empresa') {
      const defaultCompany = state.users.find(u => u.email === "empresa@avistajepatagonia.com") || {
        email: "empresa@avistajepatagonia.com",
        rol: "empresa",
        nombre: "Avistaje Patagonia SRL",
        contacto: "María González"
      };
      state.currentUser = defaultCompany;
      saveRadarState(state);
      setRadarState(state);
      setCurrentUser(defaultCompany);
    } else {
      setCurrentUser(state.currentUser);
    }
  }, []);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !radarState || !selectedCategory) return;

    const state = { ...radarState };
    const newId = state.challenges.length + 1;

    // Parse etapas
    const parsedEtapas = challengeEtapas.split('\n').filter(Boolean).map(line => {
      const parts = line.split('—');
      return {
        titulo: parts[0]?.trim() || line,
        plazo: parts[1]?.trim() || "Plazo estimado"
      };
    });

    const newChallenge: Challenge = {
      id: newId,
      companyName: currentUser.nombre,
      category: selectedCategory,
      title: challengeTitle,
      description: challengeProblema,
      status: "Abierta",
      gradeLevel: challengeGrade,
      createdAt: "Recién publicado",
      slots: 2,
      xpReward: challengeXp,
      difficulty: "Medio",
      duration: challengeDuration,
      shift: ["Tarde"],
      hoursPerWeek: "3-5 horas",
      
      problema: challengeProblema,
      resultadoEsperado: challengeResultado,
      modalidadEntrega: challengeModalidad,
      etapas: parsedEtapas,
      recursosCompartidos: challengeRecursos,
      criteriosEvaluacion: challengeCriterios
    };

    state.challenges.push(newChallenge);
    saveRadarState(state);
    setRadarState(state);

    // Reset Form
    setSelectedCategory(null);
    setChallengeTitle("");
    setChallengeProblema("");
    setChallengeResultado("");
    setChallengeCriterios("");
    setFormStep(1);
    setActiveTab("inicio");
    
    triggerToast("¡Misión Publicada con Éxito! 🚀");
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  };

  const handleEvaluate = () => {
    if (!evaluatingPostulante || !radarState || !currentUser) return;

    const state = { ...radarState };
    const ch = state.challenges.find((c: any) => c.id === evaluatingPostulante.challenge.id);
    if (ch) {
      ch.status = "Completada";
      ch.evaluation = {
        grade: evalGrade,
        comment: evalComment,
        approvedAt: new Date().toLocaleDateString()
      };
    }

    // Award student completion
    const student = state.users.find((u: any) => u.email === evaluatingPostulante.student.email);
    if (student) {
      student.misionesEnCurso = (student.misionesEnCurso || []).filter(
        (id: number) => id !== Number(ch.id)
      );
      if (!student.misionesCompletadas) student.misionesCompletadas = [];
      student.misionesCompletadas.push(Number(ch.id));

      if (!student.certificados) student.certificados = {};
      student.certificados.nivel2 = "desbloqueado";

      if (student.certificados.nivel1 === "desbloqueado") {
        student.certificados.nivel3 = "desbloqueado";
      }

      student.xp = (student.xp || 0) + ch.xpReward;
    }

    if (state.currentUser && state.currentUser.email === student.email) {
      state.currentUser = student;
    }

    saveRadarState(state);
    setRadarState(state);
    setEvaluatingPostulante(null);
    setEvalComment("");
    setEvalGrade("Excelente (A+)");
    triggerToast("¡Estudiante Evaluado e Insignia Desbloqueada! 🏆");
    confetti({ particleCount: 100, spread: 60 });
  };

  const handleInviteStudent = () => {
    if (!invitingStudent) return;
    setInvitingStudent(null);
    triggerToast("¡Invitación enviada! El alumno recibirá una notificación 📩");
  };

  if (!currentUser) return null;

  // Filter challenges owned by this company
  const companyMisiones = (radarState?.challenges || []).filter(
    (c: any) => c.companyName === currentUser.nombre
  );

  // Extract applicants
  const applicants: any[] = [];
  const completedEvaluations: any[] = [];

  (radarState?.users || []).forEach((user: any) => {
    if (user.rol === "estudiante") {
      (user.misionesEnCurso || []).forEach((mId: number) => {
        const matchingChallenge = companyMisiones.find((ch: any) => Number(ch.id) === mId);
        if (matchingChallenge) {
          applicants.push({ student: user, challenge: matchingChallenge });
        }
      });

      (user.misionesCompletadas || []).forEach((mId: number) => {
        const matchingChallenge = companyMisiones.find((ch: any) => Number(ch.id) === mId);
        if (matchingChallenge && matchingChallenge.evaluation) {
          completedEvaluations.push({ student: user, challenge: matchingChallenge });
        }
      });
    }
  });

  // Fetch all students for the anonymous talent radar
  const allStudents = (radarState?.users || []).filter((u: any) => u.rol === "estudiante");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row pb-24 md:pb-0">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-rtDark text-white p-6 flex flex-col justify-between shrink-0 md:min-h-screen">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight">
                <span className="text-white">Radar</span>
                <span className="text-rtPink"> T</span>
              </span>
              <span className="text-[10px] font-bold bg-rtPink text-white px-2 py-0.5 rounded">Organización</span>
            </Link>
          </div>

          <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto no-scrollbar pb-2 md:pb-0 border-b border-white/10 md:border-b-0">
            <button 
              onClick={() => setActiveTab("inicio")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs md:text-sm text-left transition-colors whitespace-nowrap",
                activeTab === "inicio" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              🏢 Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("publicar")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs md:text-sm text-left transition-colors whitespace-nowrap",
                activeTab === "publicar" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              <PlusCircle className="h-4 w-4" /> Crear Desafío
            </button>
            <button 
              onClick={() => setActiveTab("misiones")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs md:text-sm text-left transition-colors whitespace-nowrap",
                activeTab === "misiones" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              <ListTodo className="h-4 w-4" /> Mis Desafíos
            </button>
            <button 
              onClick={() => setActiveTab("postulantes")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs md:text-sm text-left transition-colors whitespace-nowrap",
                activeTab === "postulantes" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              <Users className="h-4 w-4" /> Postulantes
            </button>
            <button 
              onClick={() => setActiveTab("talento")}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs md:text-sm text-left transition-colors whitespace-nowrap",
                activeTab === "talento" ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
              )}
            >
              📡 Explorar Talento
            </button>
          </nav>
        </div>

        <div className="space-y-4 mt-6 md:mt-0">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10 hidden md:block">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Organización</p>
            <p className="font-extrabold text-sm mt-1 text-white">{currentUser.nombre}</p>
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
        
        {/* TOAST */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 p-4 text-white shadow-2xl animate-fade-in text-sm font-black">
            <span>🎉</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* TAB 1: INICIO (DASHBOARD) */}
        {activeTab === "inicio" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-black text-rtDark">Panel de Organización</h1>
                <p className="text-sm text-slate-500 font-semibold">{currentUser.nombre} · {currentUser.contacto}</p>
              </div>
              <button 
                onClick={() => setActiveTab("publicar")}
                className="bg-rtPink text-white font-black px-5 py-3 rounded-2xl btn-3d shadow-[0_4px_0_#9a0050] text-xs"
              >
                + Publicar Desafío
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_#1a1a2e]">
                <span className="text-xs text-slate-400 font-black uppercase tracking-wider block">Desafíos Activos</span>
                <p className="text-4xl font-black text-rtDark mt-1">{companyMisiones.length}</p>
              </div>
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_#1a1a2e]">
                <span className="text-xs text-slate-400 font-black uppercase tracking-wider block">Postulantes en Curso</span>
                <p className="text-4xl font-black text-rtBlue mt-1">{applicants.length}</p>
              </div>
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_#1a1a2e]">
                <span className="text-xs text-slate-400 font-black uppercase tracking-wider block">Misiones Aprobadas</span>
                <p className="text-4xl font-black text-rtGreen mt-1">{completedEvaluations.length}</p>
              </div>
            </div>

            {/* Table of applicants */}
            <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-[4px_4px_0px_#1a1a2e] space-y-4">
              <h3 className="text-lg font-black text-slate-800">Postulantes Activos ({applicants.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-slate-400">
                      <th className="pb-3 font-black uppercase text-xs">Alumno</th>
                      <th className="pb-3 font-black uppercase text-xs">Desafío</th>
                      <th className="pb-3 font-black uppercase text-xs">Perfil Vocacional</th>
                      <th className="pb-3 font-black uppercase text-xs">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((app, index) => (
                      <tr key={index} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50">
                        <td className="py-3 font-bold text-slate-800">{app.student.nombre} <span className="text-slate-400 text-xs font-normal">({app.student.curso})</span></td>
                        <td className="py-3 font-bold text-slate-600">{app.challenge.title}</td>
                        <td className="py-3">
                          <span className="bg-rtPinkLight text-rtPink text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                            {app.student.perfil}
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => setEvaluatingPostulante(app)}
                            className="bg-rtBlue text-white font-black px-4 py-2 rounded-xl text-xs btn-3d shadow-[0_2.5px_0_#0f5b82]"
                          >
                            Evaluar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {applicants.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 font-bold">
                          No tenés postulantes activos por el momento.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PUBLICAR NUEVO DESAFIO (Enriched 7 Steps/Sections Form) */}
        {activeTab === "publicar" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-rtDark">Crear Desafío</h1>
              <p className="text-sm text-slate-500 font-semibold">Publicá una propuesta de práctica profesionalizante digital y guiada</p>
            </div>

            <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-[4px_4px_0px_#1a1a2e] max-w-3xl">
              <form onSubmit={handlePublish} className="space-y-6">
                
                {formStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-black text-rtDark">Paso 1: Seleccioná la Categoría</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.name}
                          type="button"
                          onClick={() => setSelectedCategory(cat.name)}
                          className={cn(
                            "flex items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all",
                            selectedCategory === cat.name
                              ? "border-rtPink bg-rtPinkLight/10"
                              : "border-slate-200 hover:border-slate-400 hover:bg-slate-50/50"
                          )}
                        >
                          <span className="text-3xl">{cat.emoji}</span>
                          <div>
                            <h4 className="font-extrabold text-slate-800 text-sm leading-tight">{cat.name}</h4>
                            <p className="text-[10px] text-slate-400 font-semibold mt-1 leading-snug">{cat.description}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => selectedCategory && setFormStep(2)}
                        disabled={!selectedCategory}
                        className="bg-rtPink text-white font-black px-6 py-3 rounded-xl btn-3d shadow-[0_3px_0_#9a0050] disabled:opacity-50 text-sm flex items-center gap-1.5"
                      >
                        Continuar <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                {formStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-black text-rtDark border-b pb-2">Paso 2: Detalles en 7 Secciones</h3>

                    {/* Section 1: Title & Problema */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black text-rtPink uppercase tracking-wider">Sección 1: El Desafío</h4>
                      <div>
                        <label className="block text-xs font-black text-slate-400 mb-1">Título del Desafío</label>
                        <input 
                          type="text" 
                          value={challengeTitle}
                          onChange={(e) => setChallengeTitle(e.target.value)}
                          required
                          placeholder="Ej: Estrategia de redes sociales para temporada alta"
                          className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-rtPink focus:ring-4 focus:ring-rtPink/15 transition-all text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black text-slate-400 mb-1">¿Qué está pasando en tu negocio que querés resolver?</label>
                        <textarea 
                          rows={3}
                          value={challengeProblema}
                          onChange={(e) => setChallengeProblema(e.target.value)}
                          required
                          placeholder="Ej: No tenemos forma de mostrar nuestra oferta turística de avistajes de manera interactiva a extranjeros. Las guías impresas actuales son costosas..."
                          className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-rtPink focus:ring-4 focus:ring-rtPink/15 transition-all text-xs leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Section 2: Resultado */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-rtBlue uppercase tracking-wider">Sección 2: Resultado Esperado</h4>
                      <label className="block text-xs font-black text-slate-400 mb-1">¿Qué te gustaría recibir al finalizar la misión?</label>
                      <textarea 
                        rows={2}
                        value={challengeResultado}
                        onChange={(e) => setChallengeResultado(e.target.value)}
                        required
                        placeholder="Ej: Un archivo PDF estructurado con la guía redactada en los tres idiomas, mapas con coordenadas de referencia e itinerarios sugeridos."
                        className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-rtBlue focus:ring-4 focus:ring-rtBlue/15 transition-all text-xs"
                      />
                    </div>

                    {/* Section 3: Tiempos */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-rtYellow uppercase tracking-wider">Sección 3: Duración y Plazos</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-black text-slate-400 mb-1">Año Escolar Recomendado</label>
                          <select
                            value={challengeGrade}
                            onChange={(e) => setChallengeGrade(e.target.value as GradeLevel)}
                            className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none bg-white text-xs"
                          >
                            {gradeLevels.map((lvl) => (
                              <option key={lvl} value={lvl}>{lvl}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-black text-slate-400 mb-1">Duración Estimada</label>
                          <input 
                            type="text" 
                            value={challengeDuration}
                            onChange={(e) => setChallengeDuration(e.target.value)}
                            required
                            placeholder="Ej: 2 semanas"
                            className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Modalidad */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-rtTeal uppercase tracking-wider">Sección 4: Modalidad de Entrega (100% Digital)</h4>
                      <label className="block text-xs font-black text-slate-400 mb-1">¿Cómo entrega el proyecto el estudiante?</label>
                      <select
                        value={challengeModalidad}
                        onChange={(e) => setChallengeModalidad(e.target.value)}
                        className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none bg-white text-xs"
                      >
                        <option value="Documento/informe subido a la plataforma">Documento/informe subido a la plataforma</option>
                        <option value="Presentación (slides) subida a la plataforma">Presentación (slides) subida a la plataforma</option>
                        <option value="Archivo multimedia (fotos, videos, diseños)">Archivo multimedia (fotos, videos, diseños)</option>
                      </select>
                    </div>

                    {/* Section 5: Etapas */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-rtPurple uppercase tracking-wider">Sección 5: Etapas del Proyecto (Una por línea, separando con '—' el plazo)</h4>
                      <textarea 
                        rows={3}
                        value={challengeEtapas}
                        onChange={(e) => setChallengeEtapas(e.target.value)}
                        required
                        className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-mono focus:outline-none text-xs"
                      />
                    </div>

                    {/* Section 6: Recursos */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-rtGreen uppercase tracking-wider">Sección 6: Recursos Compartidos</h4>
                      <label className="flex items-center gap-3 cursor-pointer text-xs font-bold text-slate-650 bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <input 
                          type="checkbox"
                          checked={challengeRecursos}
                          onChange={(e) => setChallengeRecursos(e.target.checked)}
                          className="rounded text-rtGreen focus:ring-rtGreen h-4 w-4"
                        />
                        <span>¿Compartirás accesos a materiales (fotos, datos)?</span>
                      </label>
                    </div>

                    {/* Section 7: Criterios */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">Sección 7: Criterios de Evaluación</h4>
                      <textarea 
                        rows={2}
                        value={challengeCriterios}
                        onChange={(e) => setChallengeCriterios(e.target.value)}
                        required
                        placeholder="Ej: Consistencia en el diseño, fidelidad de las traducciones a los términos de avistaje y un mapa claro..."
                        className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none text-xs"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between pt-4 border-t">
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="border-2 border-slate-250 text-slate-700 font-black px-5 py-3 rounded-xl btn-3d shadow-[0_3px_0_#e2e8f0] text-xs"
                      >
                        Atrás
                      </button>
                      <button
                        type="submit"
                        className="bg-rtPink text-white font-black px-6 py-3 rounded-xl btn-3d shadow-[0_3px_0_#9a0050] hover:bg-rtPink/90 text-xs flex items-center gap-1.5"
                      >
                        <Check className="h-4 w-4" /> Publicar Desafío
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: MIS DESAFIOS */}
        {activeTab === "misiones" && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-slate-800">Misiones Publicadas ({companyMisiones.length})</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {companyMisiones.map((ch: any) => {
                const categoryData = categories.find(c => c.name === ch.category);
                return (
                  <div key={ch.id} className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <span className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br",
                        categoryData?.color || "from-slate-100 to-slate-200"
                      )}>
                        {categoryData?.emoji || "📡"}
                      </span>
                      <span className={cn(
                        "text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider",
                        ch.status === "Abierta" ? "bg-rtGreenLight text-rtGreen" :
                        ch.status === "En curso" ? "bg-rtYellowLight text-rtYellow" :
                        "bg-slate-100 text-slate-400"
                      )}>
                        {ch.status}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-slate-800 text-sm leading-tight truncate">{ch.title}</h3>
                    <p className="text-xs text-slate-400 font-bold leading-normal line-clamp-2">{ch.description}</p>
                    
                    {ch.studentName && (
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-2 text-xs flex items-center justify-between">
                        <span className="font-bold text-slate-650">Postulado: {ch.studentName}</span>
                        <span className="text-[10px] text-slate-400 font-bold">{ch.gradeLevel}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: POSTULANTES */}
        {activeTab === "postulantes" && (
          <div className="space-y-6">
            <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-800">Postulantes en Curso ({applicants.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200 text-slate-400">
                      <th className="pb-3 font-black uppercase text-xs">Alumno</th>
                      <th className="pb-3 font-black uppercase text-xs">Desafío</th>
                      <th className="pb-3 font-black uppercase text-xs">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicants.map((app, idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0">
                        <td className="py-3 font-bold text-slate-800">{app.student.nombre}</td>
                        <td className="py-3 font-bold text-slate-600 truncate max-w-xs">{app.challenge.title}</td>
                        <td className="py-3">
                          <button
                            onClick={() => setEvaluatingPostulante(app)}
                            className="bg-rtBlue text-white font-black px-4 py-2 rounded-xl text-xs btn-3d shadow-[0_2.5px_0_#0f5b82]"
                          >
                            Evaluar Práctica
                          </button>
                        </td>
                      </tr>
                    ))}
                    {applicants.length === 0 && (
                      <tr>
                        <td colSpan={3} className="py-8 text-center text-slate-400 font-bold">
                          No hay postulantes activos.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-black text-slate-800">Misiones Evaluadas / Completadas ({completedEvaluations.length})</h3>
              <div className="space-y-3">
                {completedEvaluations.map((app, index) => (
                  <div key={index} className="border-2 border-slate-100 rounded-3xl p-4 flex gap-4 items-start bg-slate-50/30">
                    <span className="text-3xl">🏆</span>
                    <div>
                      <h4 className="font-extrabold text-slate-800 text-sm">{app.student.nombre}</h4>
                      <p className="text-xs text-slate-500 font-bold leading-tight">{app.challenge.title}</p>
                      
                      <div className="flex gap-2 mt-2">
                        <span className="bg-rtGreenLight text-rtGreen text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Calificación: {app.challenge.evaluation?.grade}
                        </span>
                        <span className="text-[9px] text-slate-400 font-bold">
                          Fecha: {app.challenge.evaluation?.approvedAt}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-semibold italic mt-1 leading-relaxed">
                        Observación: "{app.challenge.evaluation?.comment}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: EXPLORAR TALENTO (Anonymous Students Radar) */}
        {activeTab === "talento" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-black text-rtDark">Radar de Talento Local 📡</h1>
              <p className="text-sm text-slate-500 font-semibold">Encontrá estudiantes alineados con tus desafíos de forma 100% segura y anónima.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allStudents.map((stud: any, sIdx: number) => {
                const completedCount = stud.misionesCompletadas?.length || 0;
                const badgesCount = (stud.misionesCompletadas?.length || 0) + 1 + Object.keys(stud.habilidadesBlandasCompletadas || {}).length;
                return (
                  <div 
                    key={stud.email} 
                    className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl font-black border border-slate-200">
                            👤
                          </div>
                          <div>
                            <span className="bg-rtTealLight text-rtTeal text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider block w-fit">
                              {stud.perfil}
                            </span>
                            <h4 className="font-extrabold text-slate-800 text-sm mt-0.5">Alumno Anónimo #{sIdx + 101}</h4>
                          </div>
                        </div>
                        <span className="text-xs font-black text-slate-450">{stud.anio}</span>
                      </div>

                      {/* Strengths */}
                      <div className="mt-3 space-y-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Fortalezas</span>
                        <div className="flex flex-wrap gap-1">
                          {stud.fortalezas?.slice(0, 3).map((f: string, idx: number) => (
                            <span key={idx} className="bg-slate-50 text-slate-600 border border-slate-150 text-[9px] font-black px-2 py-0.5 rounded">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Indicators */}
                      <div className="grid grid-cols-3 gap-2 mt-4 text-center border-t pt-3">
                        <div>
                          <span className="text-[9px] font-black text-slate-400 block uppercase">Completas</span>
                          <span className="font-black text-xs text-slate-700">{completedCount}</span>
                        </div>
                        <div className="border-l border-r">
                          <span className="text-[9px] font-black text-slate-400 block uppercase">Insignias</span>
                          <span className="font-black text-xs text-slate-700">{badgesCount}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-black text-slate-400 block uppercase">Nivel</span>
                          <span className="font-black text-xs text-slate-700">Nv.{stud.nivel}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setInvitingStudent(stud)}
                      className="mt-4 w-full bg-rtTeal text-white font-black py-2.5 rounded-xl btn-3d shadow-[0_3px_0_#127d7d] text-xs flex items-center justify-center gap-1"
                    >
                      <Mail className="w-3.5 h-3.5" /> Invitar a mi próximo desafío
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* EVALUATION MODAL */}
      {evaluatingPostulante && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 animate-scale-up">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-black text-rtDark">Evaluar Práctica</h3>
                <p className="text-xs text-slate-400 font-bold">Asignar calificación e informe final digital</p>
              </div>
              <button 
                onClick={() => setEvaluatingPostulante(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-bold text-slate-650 space-y-1">
              <p><strong>Alumno:</strong> {evaluatingPostulante.student.nombre}</p>
              <p><strong>Desafío:</strong> {evaluatingPostulante.challenge.title}</p>
              <p><strong>Colegio:</strong> E.E.S. N° 736 · {evaluatingPostulante.student.curso}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Calificación conceptual</label>
                <select
                  value={evalGrade}
                  onChange={(e) => setEvalGrade(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none bg-white text-xs"
                >
                  <option value="Excelente (A+)">Excelente (A+)</option>
                  <option value="Muy Bueno (A)">Muy Bueno (A)</option>
                  <option value="Bueno (B)">Bueno (B)</option>
                  <option value="Satisfactorio (C)">Satisfactorio (C)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-wider mb-1">Observaciones / Desempeño</label>
                <textarea 
                  rows={3}
                  value={evalComment}
                  onChange={(e) => setEvalComment(e.target.value)}
                  required
                  placeholder="Escribí comentarios sobre el desarrollo de las tareas digitales del estudiante..."
                  className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none text-xs"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setEvaluatingPostulante(null)}
                className="w-1/3 border-2 border-slate-250 text-slate-700 font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#e2e8f0] text-xs"
              >
                Cancelar
              </button>
              <button
                onClick={handleEvaluate}
                disabled={!evalComment}
                className="w-2/3 bg-rtGreen text-white font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#2b7326] disabled:opacity-50 text-xs flex items-center justify-center gap-1"
              >
                <Award className="h-4 w-4" /> Aprobar y Emitir Nivel 2
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INVITE TALENT CONFIRM MODAL */}
      {invitingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-sm bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 animate-scale-up">
            <h3 className="text-xl font-black text-rtDark leading-tight">¿Invitar Estudiante?</h3>
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
              Le enviaremos una invitación digital anónima al estudiante para postularse a tu próximo desafío.
            </p>
            <div className="bg-slate-50 border p-3 rounded-2xl text-[10px] text-slate-400 font-bold">
              ℹ️ Los datos de contacto del alumno se revelarán únicamente si el estudiante y su docente coordinador aprueban el contacto de forma explícita.
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setInvitingStudent(null)}
                className="w-1/3 border-2 border-slate-250 text-slate-700 font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#e2e8f0] text-xs"
              >
                Cerrar
              </button>
              <button
                onClick={handleInviteStudent}
                className="w-2/3 bg-rtTeal text-white font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#127d7d] text-xs flex items-center justify-center gap-1"
              >
                <UserCheck className="w-4 h-4" /> Confirmar Invitación
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
