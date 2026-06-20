"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Zap, 
  Trophy, 
  Star, 
  Flame, 
  Clock, 
  Building2, 
  ChevronRight, 
  Lock, 
  Sparkles, 
  Check, 
  ArrowLeft,
  X,
  Award,
  BookOpen,
  Send,
  Calendar,
  AlertTriangle,
  HelpCircle,
  Briefcase,
  FileText,
  UserCheck,
  Undo2,
  Download,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  getRadarState, 
  saveRadarState, 
  categories, 
  Challenge, 
  UserProfile,
  SOFT_SKILLS,
  ASISTENTE_FLUJOS,
  SoftSkill,
  SoftSkillExercise
} from "@/lib/store";
import Navigation from "@/components/navigation";
import LegalModal from "@/components/legal-modal";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "¿Cuál de estas actividades te divierte más en tu tiempo libre?",
    options: [
      { text: "📱 Crear contenido para redes sociales", val: "Creador Digital" },
      { text: "📊 Organizar listas y archivos de datos", val: "Analista de Datos" },
      { text: "🐳 Cuidar plantas, mascotas o estar al aire libre", val: "Guardián Patagónico" },
      { text: "🗺️ Guiar y recomendar lugares a amigos", val: "Anfitrión Local" },
      { text: "📦 Planificar eventos o tareas grupales", val: "Organizador Maestro" },
      { text: "🎨 Dibujar, pintar o diseñar en Canva", val: "Comunicador Creativo" }
    ]
  },
  {
    id: 2,
    question: "Si pudieras colaborar en un proyecto local hoy, ¿cuál elegirías?",
    options: [
      { text: "Lanzar la campaña de Instagram de un café local", val: "Creador Digital" },
      { text: "Ayudar a científicos a clasificar avistajes de ballenas", val: "Guardián Patagónico" },
      { text: "Trabajar en la oficina de turismo municipal recibiendo gente", val: "Anfitrión Local" },
      { text: "Diseñar una planilla automatizada de reservas de hotel", val: "Organizador Maestro" },
      { text: "Armar el análisis estadístico de visitas de la temporada", val: "Analista de Datos" },
      { text: "Diseñar los folletos y carteles del corredor turístico", val: "Comunicador Creativo" }
    ]
  },
  {
    id: 3,
    question: "¿Cuál sería tu espacio ideal de trabajo?",
    options: [
      { text: "Una oficina con múltiples pantallas organizando tareas", val: "Analista de Datos" },
      { text: "En equipo con otras personas resolviendo retos", val: "Organizador Maestro" },
      { text: "Al aire libre, en contacto directo con la naturaleza", val: "Guardián Patagónico" },
      { text: "Un espacio creativo para grabar videos y editar", val: "Creador Digital" },
      { text: "Frente al público, conversando con turistas", val: "Anfitrión Local" },
      { text: "Tener libertad para crear e idear diseños", val: "Comunicador Creativo" }
    ]
  },
  {
    id: 4,
    question: "¿Qué materias disfrutas más o te resultan más accesibles?",
    options: [
      { text: "Matemática / Estadística / Lógica", val: "Analista de Datos" },
      { text: "Lengua / Literatura / Oratoria", val: "Creador Digital" },
      { text: "Biología / Química / Ciencias de la Tierra", val: "Guardián Patagónico" },
      { text: "Tecnología / Programación / Computación", val: "Organizador Maestro" },
      { text: "Historia / Geografía / Idiomas", val: "Anfitrión Local" },
      { text: "Plástica / Arte / Música", val: "Comunicador Creativo" }
    ]
  },
  {
    id: 5,
    question: "Tus amigos dicen que tu mayor fortaleza (superpoder) es:",
    options: [
      { text: "🎨 Ser muy creativo/a e imaginativo/a", val: "Comunicador Creativo" },
      { text: "📐 Ser ordenado/a y prestar atención al detalle", val: "Analista de Datos" },
      { text: "🤝 Comunicarte y conectar muy fácil con otros", val: "Anfitrión Local" },
      { text: "🔍 Observar y resolver problemas complejos", val: "Guardián Patagónico" },
      { text: "⚡ Ejecutar y coordinar cosas rápido", val: "Organizador Maestro" }
    ]
  }
];

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

const INSIGNIAS_MOCK = [
  { id: "1", name: "Primer Paso 🚀", desc: "Te uniste a tu primera misión", icon: "🚀", category: "General" },
  { id: "2", name: "Eco Ballena 🐳", desc: "Completaste una misión de Conservación", icon: "🐳", category: "Conservación" },
  { id: "3", name: "Data Miner 📊", desc: "Completaste una misión de Gestión de Datos", icon: "📊", category: "Datos" },
  { id: "4", name: "Social Star 📱", desc: "Completaste una misión de Marketing", icon: "📱", category: "Marketing" },
  { id: "5", name: "Racha Incombustible 🔥", desc: "Entraste a la app por 5 días seguidos", icon: "🔥", category: "General" }
];

export default function EstudiantePortal() {
  const router = useRouter();
  const [radarState, setRadarState] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Student navigation tab: 'home' | 'misiones' | 'orientacion' | 'certificados' | 'cv'
  const [activeTab, setActiveTab] = useState<'home' | 'misiones' | 'orientacion' | 'certificados' | 'cv'>('home');

  // Tablero subtab: 'misiones' | 'habilidades'
  const [tableroSubTab, setTableroSubTab] = useState<'misiones' | 'habilidades'>('misiones');
  const [filterCompatibleOnly, setFilterCompatibleOnly] = useState(false);

  // Registration Flow state
  const [regStep, setRegStep] = useState<number>(0); // 0: Select / Registration form, 1: Curso/Docente, 1.5: Disponibilidad, 2: Quiz, 3: Result
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regAnio, setRegAnio] = useState("4to año");
  const [regCurso, setRegCurso] = useState("4°B");
  const [regDocente, setRegDocente] = useState("Prof. Laura Martínez");
  const [regConsent, setRegConsent] = useState(false);
  const [regTutorConsent, setRegTutorConsent] = useState(false);
  const [regParentalAuth, setRegParentalAuth] = useState(false);
  const [regDDJJFile, setRegDDJJFile] = useState<string | null>(null);
  const [regDDJJLater, setRegDDJJLater] = useState(false);
  const [regTermsAcceptedStep3, setRegTermsAcceptedStep3] = useState(false);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [linkedinVinculado, setLinkedinVinculado] = useState(false);
  const [regShift, setRegShift] = useState<string[]>([]);
  const [regHours, setRegHours] = useState<string>("3-5 horas");

  // Quiz States
  const [currentQuizQ, setCurrentQuizQ] = useState(0);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [finalProfile, setFinalProfile] = useState<string>("Guardián Patagónico");

  // Interaction States
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showCertificateModal, setShowCertificateModal] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "info" } | null>(null);

  // Exit Mission modal states
  const [showExitModal, setShowExitModal] = useState<Challenge | null>(null);
  const [exitReason, setExitReason] = useState("No tengo tiempo en este momento");

  // Soft Skill active exercise state
  const [activeSoftSkill, setActiveSoftSkill] = useState<SoftSkill | null>(null);
  const [activeExerciseIdx, setActiveExerciseIdx] = useState(0);
  const [selectedSoftOptionIdx, setSelectedSoftOptionIdx] = useState<number | null>(null);

  // Virtual Assistant states
  const [asistenteOpen, setAsistenteOpen] = useState(false);
  const [asistenteCurrentKey, setAsistenteCurrentKey] = useState("bienvenida");
  const [asistenteHistory, setAsistenteHistory] = useState<{ sender: 'radar' | 'user'; text: string }[]>([
    { sender: 'radar', text: ASISTENTE_FLUJOS.bienvenida.mensaje }
  ]);

  // Load state on mount
  useEffect(() => {
    const state = getRadarState();
    setRadarState(state);
    if (state.currentUser && state.currentUser.rol === 'estudiante') {
      setCurrentUser(state.currentUser);
      setLinkedinVinculado(state.currentUser.linkedinVinculado || false);
    }
  }, []);

  const triggerToast = (text: string, type: "success" | "info" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [levelUpModalData, setLevelUpModalData] = useState<any | null>(null);

  // Audio Synthesizers for Gamification chimes
  const playLevelUpSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4 -> E4 -> G4 -> C5 -> E5
      const duration = 0.12;
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime + idx * duration);
        gainNode.gain.setValueAtTime(0.25, audioCtx.currentTime + idx * duration);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + (idx + 1) * duration);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime + idx * duration);
        osc.stop(audioCtx.currentTime + (idx + 1) * duration);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const playXPSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.08); // G5
      gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
      console.error(e);
    }
  };

  const getLevelFromXP = (xp: number): number => {
    if (xp < 500) return 1;
    if (xp < 1500) return 2;
    if (xp < 3000) return 3;
    return 4;
  };

  const getLevelName = (level: number): string => {
    switch (level) {
      case 1: return "Explorador Patagónico";
      case 2: return "Aventurero Costero";
      case 3: return "Experto Local";
      case 4: return "Pionero Patagónico";
      default: return "Explorador Patagónico";
    }
  };

  const getLevelProgress = (xp: number) => {
    if (xp < 500) {
      return {
        min: 0,
        max: 500,
        percentage: Math.min(100, (xp / 500) * 100),
        label: `${xp} / 500 XP`
      };
    } else if (xp < 1500) {
      return {
        min: 500,
        max: 1500,
        percentage: Math.min(100, ((xp - 500) / 1000) * 100),
        label: `${xp} / 1500 XP`
      };
    } else if (xp < 3000) {
      return {
        min: 1500,
        max: 3000,
        percentage: Math.min(100, ((xp - 1500) / 1500) * 100),
        label: `${xp} / 3000 XP`
      };
    } else {
      return {
        min: 3000,
        max: 5000,
        percentage: Math.min(100, ((xp - 3000) / 2000) * 100),
        label: `${xp} XP (Nivel Máximo)`
      };
    }
  };

  // Assign teacher tutor automatically when curso changes
  useEffect(() => {
    if (regCurso === "4°B" || regCurso === "5°A") {
      setRegDocente("Prof. Laura Martínez");
    } else if (regCurso === "3°C" || regCurso === "3°D") {
      setRegDocente("Prof. Diego García");
    }
  }, [regCurso]);

  // Quiz handler
  const handleAnswerQuiz = (val: string) => {
    const nextScores = { ...quizScores };
    nextScores[val] = (nextScores[val] || 0) + 1;
    setQuizScores(nextScores);

    const nextAnswers = [...quizAnswers, currentQuizQ];
    setQuizAnswers(nextAnswers);

    if (currentQuizQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizQ(currentQuizQ + 1);
    } else {
      // Calculate final profile
      let maxScore = -1;
      let finalProf = "Guardián Patagónico";
      Object.keys(nextScores).forEach(p => {
        if (nextScores[p] > maxScore) {
          maxScore = nextScores[p];
          finalProf = p;
        }
      });
      setFinalProfile(finalProf);
      setRegStep(3);
    }
  };

  const handleFinishRegistration = () => {
    const state = getRadarState();
    const details = PERFILES_DETALLES[finalProfile as keyof typeof PERFILES_DETALLES];
    
    const newStudent: UserProfile = {
      email: regEmail || `invitado_${Math.floor(Math.random() * 1000)}@ees736.edu.ar`,
      rol: "estudiante",
      nombre: regName || "Estudiante Invitado",
      anio: regAnio,
      curso: regCurso,
      docente: regDocente,
      nivel: 1,
      xp: 50, // Welcome XP
      perfil: finalProfile,
      misionesEnCurso: [],
      misionesCompletadas: [],
      certificados: { nivel1: "bloqueado", nivel2: "bloqueado", nivel3: "bloqueado" },
      fortalezas: details.fortalezas,
      intereses: details.intereses,
      respuestasQuiz: quizAnswers,
      disponibilidad: regShift.length > 0 ? regShift : ["Tarde"],
      horasSemanales: regHours,
      habilidadesBlandasCompletadas: {},
      ddjjFile: regDDJJFile || undefined,
      ddjjValidada: false,
      linkedinVinculado: false
    };

    state.users.push(newStudent);
    state.currentUser = newStudent;
    saveRadarState(state);
    
    setRadarState(state);
    setCurrentUser(newStudent);
    triggerToast("¡Registro completado! Ganaste +50 XP 🚀");
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
  };

  // Taking a mission
  const handleTakeMission = (ch: Challenge) => {
    if (!currentUser || !radarState) return;

    const state = { ...radarState };
    
    // Find updated user in state users list
    const userIndex = state.users.findIndex((u: any) => u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (userIndex === -1) return;

    const student = state.users[userIndex];
    
    // Add mission to in progress
    if (!student.misionesEnCurso) student.misionesEnCurso = [];
    student.misionesEnCurso.push(Number(ch.id) || ch.id);

    // Update challenge status in global state
    const chalIndex = state.challenges.findIndex((c: any) => String(c.id) === String(ch.id));
    if (chalIndex !== -1) {
      state.challenges[chalIndex].status = "En curso";
      state.challenges[chalIndex].studentName = student.nombre;
      state.challenges[chalIndex].studentEmail = student.email;
    }

    // Add XP
    const oldXP = student.xp || 0;
    const newXP = oldXP + 25;
    student.xp = newXP;
    
    const oldLevel = getLevelFromXP(oldXP);
    const newLevel = getLevelFromXP(newXP);
    student.nivel = newLevel;
    
    if (newLevel > oldLevel) {
      setLevelUpModalData({
        oldLevel,
        newLevel,
        levelName: getLevelName(newLevel),
        xp: newXP
      });
      playLevelUpSound();
    } else {
      playXPSound();
    }

    state.currentUser = student;
    saveRadarState(state);

    setRadarState(state);
    setCurrentUser(student);
    setSelectedChallenge(null);
    triggerToast("¡Misión Tomada! +25 XP · Tu docente recibirá una notificación ⚡");
    
    confetti({
      particleCount: 100,
      spread: 60,
      colors: ['#E91B8C', '#F7C022', '#4BB543', '#1B96D5', '#9B59B6']
    });
  };

  // Abandon mission logic
  const handleExitMission = () => {
    if (!showExitModal || !currentUser || !radarState) return;
    
    const state = { ...radarState };
    const student = state.users.find((u: any) => u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (!student) return;

    // Remove from in-progress
    student.misionesEnCurso = (student.misionesEnCurso || []).filter(
      (id: any) => String(id) !== String(showExitModal.id)
    );

    // Release challenge slots
    const chIdx = state.challenges.findIndex((c: any) => String(c.id) === String(showExitModal.id));
    if (chIdx !== -1) {
      state.challenges[chIdx].status = "Abierta";
      state.challenges[chIdx].studentName = undefined;
      state.challenges[chIdx].studentEmail = undefined;
    }

    state.currentUser = student;
    saveRadarState(state);
    setRadarState(state);
    setCurrentUser(student);
    
    const wasUncomfortable = exitReason === "Me sentí incómodo/a con algo";
    setShowExitModal(null);
    setSelectedChallenge(null);

    if (wasUncomfortable) {
      triggerToast("Saliste de la misión.", "info");
      alert("Gracias por contarnos. Tu docente coordinador va a estar en contacto con vos para acompañarte. Recordá que podés hablar con la escuela en cualquier momento.");
    } else {
      triggerToast("Misión liberada con éxito.", "info");
    }
  };

  const handleUploadDDJJDashboard = (fileName: string) => {
    if (!currentUser || !radarState) return;
    const state = { ...radarState };
    const userIndex = state.users.findIndex((u: any) => u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (userIndex !== -1) {
      state.users[userIndex].ddjjFile = fileName;
      state.users[userIndex].ddjjValidada = false;
      state.currentUser = state.users[userIndex];
      saveRadarState(state);
      setRadarState(state);
      setCurrentUser(state.users[userIndex]);
      triggerToast("¡Declaración Jurada cargada con éxito! Pendiente de validación docente 🚀", "success");
    }
  };

  // Compatibility checking helper
  const isTimeCompatible = (ch: Challenge) => {
    if (!currentUser || !currentUser.disponibilidad) return false;
    const studentShifts = currentUser.disponibilidad;
    const matchShift = ch.shift ? ch.shift.some(s => studentShifts.includes(s)) : false;
    
    let compatible = matchShift;
    if (compatible && ch.hoursPerWeek && currentUser.horasSemanales) {
      const getHoursVal = (h: string) => {
        if (h.includes("1-3")) return 1;
        if (h.includes("3-5")) return 2;
        return 3;
      };
      compatible = getHoursVal(ch.hoursPerWeek) <= getHoursVal(currentUser.horasSemanales);
    }
    return compatible;
  };

  // Soft Skill complete action
  const handleSoftSkillOption = (idx: number) => {
    setSelectedSoftOptionIdx(idx);
  };

  const handleNextSoftExercise = () => {
    if (!activeSoftSkill) return;
    
    setSelectedSoftOptionIdx(null);
    if (activeExerciseIdx < activeSoftSkill.ejercicios.length - 1) {
      setActiveExerciseIdx(activeExerciseIdx + 1);
    } else {
      // Completed all exercises for this skill
      const state = { ...radarState };
      const student = state.users.find((u: any) => u.email.toLowerCase() === currentUser?.email?.toLowerCase());
      if (student) {
        if (!student.habilidadesBlandasCompletadas) student.habilidadesBlandasCompletadas = {};
        student.habilidadesBlandasCompletadas[activeSoftSkill.id] = (student.habilidadesBlandasCompletadas[activeSoftSkill.id] || 0) + 1;
        
        // Reward XP
        const oldXP = student.xp || 0;
        const newXP = oldXP + activeSoftSkill.xp;
        student.xp = newXP;
        
        const oldLevel = getLevelFromXP(oldXP);
        const newLevel = getLevelFromXP(newXP);
        student.nivel = newLevel;
        
        if (newLevel > oldLevel) {
          setLevelUpModalData({
            oldLevel,
            newLevel,
            levelName: getLevelName(newLevel),
            xp: newXP
          });
          playLevelUpSound();
        } else {
          playXPSound();
        }
        
        state.currentUser = student;
        saveRadarState(state);
        setRadarState(state);
        setCurrentUser(student);
      }

      const xpEarned = activeSoftSkill.xp;
      setActiveSoftSkill(null);
      triggerToast(`¡Ejercicio completado! Ganaste +${xpEarned} XP 🎤`);
      confetti({ particleCount: 80, spread: 50 });
    }
  };

  // Virtual Assistant chat engine
  const handleAsistenteOption = (text: string, siguienteKey: string) => {
    // Add user bubble
    const updatedHistory = [...asistenteHistory, { sender: 'user' as const, text }];
    
    // Fetch next assistant block
    const flow = ASISTENTE_FLUJOS[siguienteKey] || ASISTENTE_FLUJOS.bienvenida;
    
    setAsistenteHistory([...updatedHistory, { sender: 'radar' as const, text: flow.mensaje }]);
    setAsistenteCurrentKey(siguienteKey);
  };

  const resetAsistente = () => {
    setAsistenteHistory([
      { sender: 'radar', text: ASISTENTE_FLUJOS.bienvenida.mensaje }
    ]);
    setAsistenteCurrentKey("bienvenida");
  };

  // Render SVG radar chart
  const renderRadarChart = () => {
    if (!currentUser) return null;

    const profiles = Object.keys(PERFILES_DETALLES);
    const scores = {
      "Creador Digital": currentUser.perfil === "Creador Digital" ? 4 : 1.5,
      "Analista de Datos": currentUser.perfil === "Analista de Datos" ? 4 : 1.5,
      "Guardián Patagónico": currentUser.perfil === "Guardián Patagónico" ? 4 : 1.5,
      "Anfitrión Local": currentUser.perfil === "Anfitrión Local" ? 4 : 1.5,
      "Organizador Maestro": currentUser.perfil === "Organizador Maestro" ? 4 : 1.5,
      "Comunicador Creativo": currentUser.perfil === "Comunicador Creativo" ? 4 : 1.5,
    };

    const center = 150;
    const rMax = 95;
    const points: string[] = [];
    const axesLines: JSX.Element[] = [];
    const labelPoints: JSX.Element[] = [];

    profiles.forEach((profile, i) => {
      const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
      const scoreVal = scores[profile as keyof typeof scores] || 1;
      const val = scoreVal / 4.5; // Normalize
      
      const x = center + rMax * val * Math.cos(angle);
      const y = center + rMax * val * Math.sin(angle);
      points.push(`${x},${y}`);

      // Grid line
      const lx = center + rMax * Math.cos(angle);
      const ly = center + rMax * Math.sin(angle);
      axesLines.push(
        <line 
          key={`axis-${i}`} 
          x1={center} 
          y1={center} 
          x2={lx} 
          y2={ly} 
          stroke="#cbd5e1" 
          strokeWidth="1.5" 
          strokeDasharray="2"
        />
      );

      // Label positions offset
      const labelDist = rMax + 18;
      const tx = center + labelDist * Math.cos(angle);
      const ty = center + labelDist * Math.sin(angle) + 4;
      const profileEmoji = PERFILES_DETALLES[profile as keyof typeof PERFILES_DETALLES].emoji;
      
      labelPoints.push(
        <text 
          key={`label-${i}`} 
          x={tx} 
          y={ty} 
          textAnchor="middle" 
          className="text-[9px] font-black fill-slate-700"
        >
          {profileEmoji} {profile.split(" ")[0]}
        </text>
      );
    });

    const polygonPoints = points.join(" ");

    // Draw concentric background rings (hexagons)
    const concentricHexagons = [0.25, 0.5, 0.75, 1.0].map((scale, sIdx) => {
      const ringPoints = profiles.map((_, i) => {
        const angle = (i * 2 * Math.PI) / 6 - Math.PI / 2;
        const rx = center + rMax * scale * Math.cos(angle);
        const ry = center + rMax * scale * Math.sin(angle);
        return `${rx},${ry}`;
      }).join(" ");

      return (
        <polygon 
          key={`ring-${sIdx}`}
          points={ringPoints}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="1.2"
        />
      );
    });

    return (
      <div className="flex justify-center bg-white p-4 rounded-3xl border border-slate-100 shadow-inner">
        <svg viewBox="0 0 300 300" className="w-64 h-64 overflow-visible">
          {concentricHexagons}
          {axesLines}
          
          {/* Data Polygon */}
          <polygon 
            points={polygonPoints} 
            fill="rgba(233, 27, 140, 0.15)" 
            stroke="#E91B8C" 
            strokeWidth="3"
            strokeLinejoin="round"
          />
          
          {/* Data Points */}
          {points.map((pt, pIdx) => {
            const [px, py] = pt.split(",");
            return (
              <circle 
                key={`point-${pIdx}`} 
                cx={px} 
                cy={py} 
                r="4.5" 
                fill="#E91B8C" 
                stroke="#fff" 
                strokeWidth="1.5" 
                className="shadow-sm"
              />
            );
          })}

          {labelPoints}
        </svg>
      </div>
    );
  };

  // --- REGISTRATION SCREEN VIEWS ---
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col">
        <header className="bg-white border-b border-slate-100 shadow-sm px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-rtPink">R</span>
              <span className="text-rtYellow">a</span>
              <span className="text-rtGreen">d</span>
              <span className="text-rtBlue">a</span>
              <span className="text-rtPurple">r</span>
              <span className="text-rtTeal"> T</span>
            </span>
          </Link>
          <button onClick={() => router.push("/")} className="text-sm font-bold text-slate-500 hover:text-slate-800">
            Volver
          </button>
        </header>

        <main className="flex-1 flex justify-center items-center py-8 px-4">
          
          {/* REGISTRAR STEP 0: BASIC INFO */}
          {regStep === 0 && (
            <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-black text-rtPink bg-rtPinkLight px-3 py-1 rounded-full uppercase tracking-wider">Paso 1 de 4</span>
                <h2 className="text-3xl font-black text-rtDark">Crear Cuenta</h2>
                <p className="text-sm font-bold text-slate-500">Unite al piloto de Rada Tilly</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setRegStep(1); }} className="space-y-4">
                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-1">Nombre y Apellido</label>
                  <input 
                    type="text" 
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required 
                    placeholder="Valentina López" 
                    className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-rtPink focus:ring-4 focus:ring-rtPink/15 transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-1">Correo electrónico</label>
                  <input 
                    type="email" 
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required 
                    placeholder="valentina@ees736.edu.ar" 
                    className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-rtPink focus:ring-4 focus:ring-rtPink/15 transition-all"
                  />
                  <p className="text-[10px] text-slate-400 mt-1 font-bold">Usá el correo de tu escuela si tenés uno asignado.</p>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-1">Contraseña simulada</label>
                  <input 
                    type="password" 
                    value={regPass}
                    onChange={(e) => setRegPass(e.target.value)}
                    required 
                    placeholder="radar123" 
                    className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-rtPink focus:ring-4 focus:ring-rtPink/15 transition-all"
                  />
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold text-slate-500 leading-relaxed">
                  <AlertTriangle className="h-4 w-4 text-rtYellow inline mr-1 -mt-1" />
                  Radar T es educativo para 15-18 años. Tus datos sensibles no se comparten con terceros. Tu tutor coordinará digitalmente tus prácticas.
                </div>

                <div className="flex items-start gap-2">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    checked={regConsent}
                    onChange={(e) => setRegConsent(e.target.checked)}
                    required 
                    className="mt-1 h-4 w-4 accent-rtPink rounded border-gray-300 focus:ring-rtPink" 
                  />
                  <label htmlFor="consent" className="text-xs font-bold text-slate-600 leading-snug cursor-pointer">
                    Acepto los términos de uso y el aviso de privacidad escolar.
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={!regConsent}
                  className="w-full bg-rtPink text-white font-black py-4 rounded-2xl btn-3d shadow-[0_4px_0_#9a0050] hover:bg-rtPink/90 disabled:opacity-50 text-lg transition-transform"
                >
                  Continuar →
                </button>
              </form>
            </div>
          )}

          {/* REGISTRAR STEP 1: CURSO & DOCENTE */}
          {regStep === 1 && (
            <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-black text-rtPurple bg-rtPurpleLight px-3 py-1 rounded-full uppercase tracking-wider">Paso 2 de 4</span>
                <h2 className="text-3xl font-black text-rtDark">Mi Curso</h2>
                <p className="text-sm font-bold text-slate-500">Completá tus datos académicos</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-1">Año escolar que cursás</label>
                  <select 
                    value={regAnio} 
                    onChange={(e) => setRegAnio(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-rtPurple focus:ring-4 focus:ring-rtPurple/15 transition-all bg-white"
                  >
                    <option value="3er año">3er Año</option>
                    <option value="4to año">4to Año</option>
                    <option value="5to año">5to Año</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-1">Clase / División</label>
                  <select 
                    value={regCurso} 
                    onChange={(e) => setRegCurso(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-rtPurple focus:ring-4 focus:ring-rtPurple/15 transition-all bg-white"
                  >
                    <option value="4°B">4°B (Administración)</option>
                    <option value="5°A">5°A (Economía)</option>
                    <option value="3°C">3°C (Ciclo Básico)</option>
                    <option value="3°D">3°D (Ciclo Básico)</option>
                  </select>
                </div>

                <div className="bg-rtPurpleLight border border-rtPurple/30 rounded-2xl p-4">
                  <span className="text-[10px] font-black text-rtPurple uppercase tracking-wider block">Docente Coordinador Radar T</span>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-2xl">👩‍🏫</span>
                    <div>
                      <p className="font-extrabold text-slate-800 text-sm">{regDocente}</p>
                      <p className="text-[10px] font-bold text-slate-500">Coordinador Institucional escolar</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input 
                    type="checkbox" 
                    id="tutorConsent" 
                    checked={regTutorConsent}
                    onChange={(e) => setRegTutorConsent(e.target.checked)}
                    required
                    className="mt-1 h-4 w-4 accent-rtPurple rounded border-gray-300 focus:ring-rtPurple" 
                  />
                  <label htmlFor="tutorConsent" className="text-xs font-bold text-slate-600 leading-snug cursor-pointer">
                    Autorizo a mi docente coordinador a supervisar mis postulaciones, ver mi progreso y validar mis misiones para los certificados.
                  </label>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setRegStep(0)}
                    className="w-1/3 border-2 border-slate-200 text-slate-700 font-black py-4 rounded-2xl btn-3d shadow-[0_4px_0_#e2e8f0]"
                  >
                    Atrás
                  </button>
                  <button 
                    onClick={() => setRegStep(1.5)}
                    disabled={!regTutorConsent}
                    className="w-2/3 bg-rtPurple text-white font-black py-4 rounded-2xl btn-3d shadow-[0_4px_0_#623475] disabled:opacity-50"
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* REGISTRAR STEP 1.5: DISPONIBILIDAD */}
          {regStep === 1.5 && (
            <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-black text-rtBlue bg-rtBlueLight px-3 py-1 rounded-full uppercase tracking-wider">Paso 3 de 4</span>
                <h2 className="text-3xl font-black text-rtDark">Disponibilidad</h2>
                <p className="text-sm font-bold text-slate-500">¿En qué momentos podés resolver desafíos?</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-2">Horarios Disponibles</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Mañana", "Tarde", "Noche", "Fin de semana"].map((shift) => {
                      const active = regShift.includes(shift);
                      return (
                        <button
                          key={shift}
                          type="button"
                          onClick={() => {
                            if (active) {
                              setRegShift(regShift.filter(s => s !== shift));
                            } else {
                              setRegShift([...regShift, shift]);
                            }
                          }}
                          className={cn(
                            "border-2 py-3 rounded-2xl font-bold text-xs transition-all",
                            active ? "border-rtBlue bg-rtBlueLight/30 text-rtBlue" : "border-slate-200 text-slate-650 hover:bg-slate-50"
                          )}
                        >
                          {shift === "Mañana" ? "🌅 Mañana" :
                           shift === "Tarde" ? "☀️ Tarde" :
                           shift === "Noche" ? "🌙 Noche" : "🏖️ Fin de semana"}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-2">Horas Semanales de dedicación</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["1-3 horas", "3-5 horas", "5+ horas"].map((h) => {
                      const active = regHours === h;
                      return (
                        <button
                          key={h}
                          type="button"
                          onClick={() => setRegHours(h)}
                          className={cn(
                            "border-2 py-3 rounded-2xl font-bold text-xs transition-all",
                            active ? "border-rtBlue bg-rtBlueLight/30 text-rtBlue" : "border-slate-200 text-slate-650 hover:bg-slate-50"
                          )}
                        >
                          {h}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 space-y-4 my-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-slate-700">📋 Requisitos Legales</span>
                    <button 
                      type="button"
                      onClick={() => setIsLegalOpen(true)}
                      className="text-rtPink font-black hover:underline text-[10px]"
                    >
                      Ver Términos y Condiciones ⚖️
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {/* DOWNLOAD DDJJ BUTTON */}
                    <button
                      type="button"
                      onClick={() => {
                        triggerToast("📥 Descargando DDJJ_Autorizacion_Padres.pdf...", "info");
                        triggerToast("Declaración Jurada descargada. Firmala y subila a continuación.", "success");
                      }}
                      className="flex items-center justify-center gap-2 border-2 border-dashed border-rtBlue hover:bg-rtBlueLight/30 text-rtBlue font-black py-2.5 px-4 rounded-xl text-xs transition-colors"
                    >
                      <Download className="h-4 w-4" /> Descargar DDJJ para Padres (.pdf)
                    </button>

                    {/* UPLOAD DDJJ FILE */}
                    <div className="relative">
                      <input 
                        type="file" 
                        id="ddjj-upload" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setRegDDJJFile(file.name);
                            setRegDDJJLater(false);
                            triggerToast(`✔️ Archivo "${file.name}" cargado con éxito.`, "success");
                          } else {
                            setRegDDJJFile("DDJJ_Firmada_Tutor.pdf");
                            setRegDDJJLater(false);
                            triggerToast("✔️ Archivo simulado cargado con éxito.", "success");
                          }
                        }}
                      />
                      <label 
                        htmlFor="ddjj-upload"
                        className="flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-800 bg-white hover:bg-slate-50 text-slate-700 font-black py-2.5 px-4 rounded-xl text-xs transition-all cursor-pointer"
                      >
                        <Upload className="h-4 w-4" /> {regDDJJFile ? `Documento: ${regDDJJFile}` : "Subir DDJJ Firmada (.pdf, .jpg, .png)"}
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-2">
                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="parentalAuth" 
                        checked={regParentalAuth}
                        onChange={(e) => setRegParentalAuth(e.target.checked)}
                        required
                        className="mt-1 h-4 w-4 accent-rtBlue rounded border-gray-300 focus:ring-rtBlue" 
                      />
                      <label htmlFor="parentalAuth" className="text-[10px] font-bold text-slate-650 leading-snug cursor-pointer">
                        Certifico que cuento con la autorización / tutoría firmada por mis padres (tutor responsable) para participar del programa.
                      </label>
                    </div>

                    <div className="flex items-start gap-2">
                      <input 
                        type="checkbox" 
                        id="ddjjLater" 
                        checked={regDDJJLater}
                        onChange={(e) => {
                          setRegDDJJLater(e.target.checked);
                          if (e.target.checked) {
                            setRegDDJJFile(null);
                          }
                        }}
                        className="mt-1 h-4 w-4 accent-rtBlue rounded border-gray-300 focus:ring-rtBlue" 
                      />
                      <label htmlFor="ddjjLater" className="text-[10px] font-bold text-slate-650 leading-snug cursor-pointer">
                        Prefiero cargar la Declaración Jurada (DDJJ) más tarde (mi perfil quedará pendiente de carga y revisión para poder registrar misiones oficialmente).
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setRegStep(1)}
                    className="w-1/3 border-2 border-slate-200 text-slate-700 font-black py-4 rounded-2xl btn-3d shadow-[0_4px_0_#e2e8f0]"
                  >
                    Atrás
                  </button>
                  <button 
                    onClick={() => setRegStep(2)}
                    disabled={regShift.length === 0 || !regParentalAuth || (!regDDJJFile && !regDDJJLater)}
                    className="w-2/3 bg-rtBlue text-white font-black py-4 rounded-2xl btn-3d shadow-[0_4px_0_#0f5b82] disabled:opacity-50"
                  >
                    Iniciar Test →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* REGISTRAR STEP 2: TEST VOCACIONAL */}
          {regStep === 2 && (
            <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-black text-rtTeal bg-rtTealLight px-3 py-1 rounded-full uppercase tracking-wider">Paso 4 de 4 · Cuestionario</span>
                <h3 className="text-2xl font-black text-slate-800">Cuestionario Vocacional</h3>
                
                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-rtTeal h-full transition-all duration-300"
                    style={{ width: `${((currentQuizQ) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] font-black text-slate-400">Pregunta {currentQuizQ + 1} de {QUIZ_QUESTIONS.length}</p>
              </div>

              <div className="space-y-4">
                <p className="font-extrabold text-slate-800 text-base leading-snug">
                  {QUIZ_QUESTIONS[currentQuizQ].question}
                </p>

                <div className="grid grid-cols-1 gap-2">
                  {QUIZ_QUESTIONS[currentQuizQ].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerQuiz(opt.val)}
                      className="w-full text-left bg-white border-2 border-slate-200 hover:border-rtTeal hover:bg-rtTealLight p-3.5 rounded-2xl font-bold text-xs text-slate-700 transition-all cursor-pointer hover:scale-[1.01]"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REGISTRAR STEP 3: QUIZ RESULT */}
          {regStep === 3 && (
            <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-black text-rtGreen bg-rtGreenLight px-3 py-1 rounded-full uppercase tracking-wider">Tu Perfil Vocacional</span>
                <h2 className="text-3xl font-black text-rtDark">¡Listo tu Mapa!</h2>
                <p className="text-sm font-bold text-slate-500">Tus intereses principales coinciden con:</p>
              </div>

              {/* Profile Card */}
              <div 
                className="border-2 rounded-3xl p-6 text-center space-y-4 shadow-sm"
                style={{ 
                  borderColor: PERFILES_DETALLES[finalProfile as keyof typeof PERFILES_DETALLES]?.color || '#4BB543',
                  backgroundColor: PERFILES_DETALLES[finalProfile as keyof typeof PERFILES_DETALLES]?.colorBg || '#E8F8E7'
                }}
              >
                <div className="text-6xl">{PERFILES_DETALLES[finalProfile as keyof typeof PERFILES_DETALLES]?.emoji}</div>
                <h3 
                  className="text-2xl font-black uppercase"
                  style={{ color: PERFILES_DETALLES[finalProfile as keyof typeof PERFILES_DETALLES]?.color || '#4BB543' }}
                >
                  {finalProfile}
                </h3>
                
                <div className="text-left space-y-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Fortalezas del perfil:</span>
                  <ul className="text-xs font-bold text-slate-700 list-disc pl-4 space-y-1">
                    {PERFILES_DETALLES[finalProfile as keyof typeof PERFILES_DETALLES]?.fortalezas.map((fort, fIdx) => (
                      <li key={fIdx}>{fort}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 p-4 border border-slate-200 rounded-2xl text-xs font-bold text-slate-500 leading-relaxed text-center">
                Te recomendaremos desafíos relacionados en tu Tablero de Misiones compatibles con tu disponibilidad.
              </div>

              <div className="flex items-start gap-2.5 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <input 
                  type="checkbox" 
                  id="termsAcceptedStep3" 
                  checked={regTermsAcceptedStep3}
                  onChange={(e) => setRegTermsAcceptedStep3(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-rtPink rounded border-gray-300 focus:ring-rtPink shrink-0" 
                />
                <label htmlFor="termsAcceptedStep3" className="text-[11px] font-bold text-slate-650 leading-snug cursor-pointer text-left">
                  Acepto las <button type="button" onClick={() => setIsLegalOpen(true)} className="text-rtPink font-black hover:underline">Bases y Condiciones</button> para participar del programa Radar T.
                </label>
              </div>

              <button
                onClick={handleFinishRegistration}
                disabled={!regTermsAcceptedStep3}
                className="w-full bg-rtPink text-white font-black py-4 rounded-2xl btn-3d shadow-[0_4px_0_#9a0050] hover:bg-rtPink/90 text-lg transition-transform disabled:opacity-50"
              >
                Comenzar Aventura 🚀
              </button>
            </div>
          )}

        </main>
      </div>
    );
  }

  // --- LOGGED IN STUDENT DASHBOARD VIEW ---
  const filteredChallenges = radarState?.challenges || [];
  
  // Exclude completed or taken
  const inCursoIds = currentUser.misionesEnCurso || [];
  const compIds = currentUser.misionesCompletadas || [];
  
  const openChallenges = filteredChallenges.filter(
    (c: any) => c.status === "Abierta" && !inCursoIds.map(String).includes(String(c.id)) && !compIds.map(String).includes(String(c.id))
  );

  // Suggested challenges matching interest profile
  const getProfileTheme = () => {
    switch(currentUser.perfil) {
      case "Guardián Patagónico": return "Conservación Ambiental";
      case "Creador Digital": return "Marketing Digital";
      case "Analista de Datos": return "Gestión de Datos";
      case "Organizador Maestro": return "Logística";
      case "Anfitrión Local": return "Atención al Turista";
      default: return "Conservación Ambiental";
    }
  };

  const recommendedChallenges = openChallenges.filter(
    (c: any) => c.category === getProfileTheme()
  );

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "Fácil": return "bg-rtGreenLight text-rtGreen";
      case "Medio": return "bg-rtYellowLight text-rtYellow";
      case "Difícil": return "bg-rtPinkLight text-rtPink";
      default: return "bg-slate-100 text-slate-500";
    }
  };

  // Filtered Tablero challenges listing
  const visibleTableroChallenges = openChallenges.filter(ch => {
    if (filterCompatibleOnly) {
      return isTimeCompatible(ch);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-100 pb-24 relative">
      <Navigation />

      {/* SUCCESS TOAST */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 p-4 text-white shadow-2xl animate-fade-in text-sm font-black">
          <span>{toastMessage.type === "success" ? "🎉" : "📡"}</span>
          <span>{toastMessage.text}</span>
        </div>
      )}

      <main className="max-w-lg mx-auto p-4 md:max-w-4xl space-y-6 pt-6">
        
        {/* PENDING DDJJ VALIDATION WARNING BANNER */}
        {currentUser.ddjjValidada === false && (
          currentUser.ddjjFile ? (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in">
              <div className="flex items-center gap-3">
                <span className="text-3xl shrink-0">⏳</span>
                <div>
                  <h4 className="text-xs font-black text-amber-850 leading-tight">Autorización Parental en Revisión</h4>
                  <p className="text-[10px] text-amber-600 font-bold leading-normal mt-0.5">
                    Tu Declaración Jurada ({currentUser.ddjjFile}) fue cargada con éxito. Tu docente coordinador ({currentUser.docente}) debe validarla para que tus misiones queden registradas formalmente.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setIsLegalOpen(true)}
                  className="bg-white border border-amber-300 hover:border-amber-500 text-amber-800 font-black px-3.5 py-1.5 rounded-xl text-[10px] transition-colors"
                >
                  Ver Términos
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 shadow-sm animate-fade-in space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl shrink-0">⚠️</span>
                <div>
                  <h4 className="text-sm font-black text-amber-850 leading-tight">Declaración Jurada (DDJJ) Pendiente</h4>
                  <p className="text-xs text-amber-700 font-bold leading-normal mt-1">
                    Elegiste cargar la autorización más tarde. Para comenzar tus misiones oficiales y obtener certificados válidos por la escuela, tu docente coordinador ({currentUser.docente}) debe verificar tu DDJJ firmada.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    triggerToast("📥 Descargando DDJJ_Autorizacion_Padres.pdf...", "info");
                    triggerToast("Declaración Jurada descargada. Firmala y subila a continuación.", "success");
                  }}
                  className="flex items-center justify-center gap-2 border-2 border-dashed border-amber-500 hover:bg-amber-100/40 text-amber-800 font-black py-2 px-4 rounded-xl text-xs transition-colors"
                >
                  <Download className="h-4 w-4" /> Descargar DDJJ para Padres (.pdf)
                </button>

                <div className="relative">
                  <input 
                    type="file" 
                    id="ddjj-upload-dashboard" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleUploadDDJJDashboard(file.name);
                      } else {
                        handleUploadDDJJDashboard("DDJJ_Firmada_Tutor.pdf");
                      }
                    }}
                  />
                  <label 
                    htmlFor="ddjj-upload-dashboard"
                    className="flex items-center justify-center gap-2 border-2 border-amber-500 bg-white hover:bg-amber-100/30 text-amber-800 font-black py-2 px-4 rounded-xl text-xs transition-all cursor-pointer shadow-sm"
                  >
                    <Upload className="h-4 w-4" /> Subir DDJJ Firmada (.pdf, .jpg, .png)
                  </label>
                </div>

                <button
                  onClick={() => setIsLegalOpen(true)}
                  className="text-xs font-black text-amber-600 hover:text-amber-850 self-center px-2 py-1"
                >
                  Ver Términos ⚖️
                </button>
              </div>
            </div>
          )
        )}
        
        {/* STUDENT INFO HEADER BAR */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-rtPink via-rtPurple to-rtBlue p-5 text-white shadow-xl flex flex-col gap-4 border border-white/10 relative">
          <div className="absolute right-0 bottom-0 opacity-10 text-9xl pointer-events-none">📡</div>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-4xl shadow-inner backdrop-blur-sm">
              🎒
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black truncate">{currentUser.nombre}</h1>
                <div className="rounded-lg bg-white/20 px-2.5 py-0.5 text-xs font-black backdrop-blur-sm flex items-center gap-1.5 border border-white/10">
                  <span>Nv.{currentUser.nivel}</span>
                  <span className="text-[9px] opacity-90 font-extrabold uppercase">({getLevelName(currentUser.nivel)})</span>
                </div>
              </div>
              <p className="text-xs font-bold text-white/80">{currentUser.curso} · Coordinador: {currentUser.docente}</p>
              
              {(() => {
                const prog = getLevelProgress(currentUser.xp || 0);
                return (
                  <div className="mt-2">
                    <div className="mb-1 flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5 text-rtYellow fill-current animate-pulse" /> {currentUser.xp} XP
                      </span>
                      <span className="opacity-80">{prog.label}</span>
                    </div>
                    <div className="h-3.5 overflow-hidden rounded-full bg-black/20 p-0.5 shadow-inner border border-white/5">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-rtYellow via-rtTeal to-rtGreen transition-all duration-500"
                        style={{ width: `${prog.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 border-t border-white/15 pt-3">
            <div className="rounded-2xl bg-white/10 p-2.5 text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1">
                <Flame className="h-5 w-5 text-rtYellow fill-current" />
                <span className="text-lg font-black">5</span>
              </div>
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Días Racha</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-2.5 text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1">
                <Trophy className="h-5 w-5 text-rtTeal" />
                <span className="text-lg font-black">{compIds.length}</span>
              </div>
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Completadas</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-2.5 text-center backdrop-blur-sm">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-5 w-5 text-rtPink fill-current" />
                <span className="text-lg font-black">{(compIds.length + 1) + Object.keys(currentUser.habilidadesBlandasCompletadas || {}).length}</span>
              </div>
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Insignias</p>
            </div>
          </div>
        </div>

        {/* TABS SELECTOR BUTTONS */}
        <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-slate-100 overflow-x-auto no-scrollbar">
          {(["home", "misiones", "orientacion", "certificados", "cv"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-3 px-2 rounded-xl text-xs font-black transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "bg-rtDark text-white shadow-md"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              {tab === "home" ? "🏠 Inicio" :
               tab === "misiones" ? "📡 Tablero" :
               tab === "orientacion" ? "🧭 Orientación" :
               tab === "certificados" ? "🎓 Certificados" : "📄 Mi CV"}
            </button>
          ))}
        </div>

        {/* TAB 1: HOME PANEL */}
        {activeTab === "home" && (
          <div className="space-y-6">
            
            {/* SUGGESTED MISSIONS FOR PROFILE */}
            <div className="space-y-3">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-rtPink fill-current" />
                Recomendadas por tu perfil ({currentUser.perfil})
              </h2>
              
              {recommendedChallenges.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {recommendedChallenges.slice(0, 2).map((ch: any) => {
                    const categoryData = categories.find(c => c.name === ch.category);
                    const compatible = isTimeCompatible(ch);
                    return (
                      <div 
                        key={ch.id} 
                        onClick={() => setSelectedChallenge(ch)}
                        className="bg-white border-2 border-slate-900 rounded-3xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex gap-4"
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 bg-gradient-to-br",
                          categoryData?.color || "from-slate-100 to-slate-200"
                        )}>
                          {categoryData?.emoji || "📡"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={cn("text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full block w-fit", getDifficultyColor(ch.difficulty))}>
                              {ch.difficulty}
                            </span>
                            {compatible && (
                              <span className="text-[9px] font-black bg-rtGreenLight text-rtGreen px-2 py-0.5 rounded-full block w-fit">
                                ⏱️ Compatible
                              </span>
                            )}
                          </div>
                          <h3 className="font-extrabold text-slate-800 truncate text-sm mt-1">{ch.title}</h3>
                          <p className="text-xs text-slate-400 font-bold truncate">{ch.companyName} · {ch.duration}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 shrink-0 text-slate-300 self-center" />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center text-slate-500 font-bold text-xs">
                  Completaste todas las misiones sugeridas. ¡Excelente trabajo!
                </div>
              )}
            </div>

            {/* MY MISSIONS (IN PROGRESS) */}
            <div className="space-y-3">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-rtBlue" />
                Mis misiones activas (100% Digitales)
              </h2>
              
              {inCursoIds.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {inCursoIds.map((id: any) => {
                    const ch = filteredChallenges.find((c: any) => String(c.id) === String(id));
                    if (!ch) return null;
                    const isApprovedByTeacher = ch.validatedByTeacher;
                    const isGradedByCompany = ch.evaluation;
                    return (
                      <div 
                        key={ch.id} 
                        onClick={() => setSelectedChallenge(ch)}
                        className="bg-white border-2 border-slate-900 rounded-3xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-shadow space-y-3"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-extrabold text-slate-800 text-sm leading-tight">{ch.title}</h3>
                            <p className="text-xs text-slate-400 font-bold">{ch.companyName} · +{ch.xpReward} XP</p>
                          </div>
                          <span className="text-[10px] font-black bg-rtYellowLight text-rtYellow px-2 py-0.5 rounded-full uppercase tracking-wider">
                            En Curso
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] font-bold text-slate-500">
                          <div className="flex gap-1.5">
                            <span className={cn(
                              "px-2 py-0.5 rounded-md",
                              isApprovedByTeacher ? "bg-rtGreenLight text-rtGreen" : "bg-slate-100 text-slate-400"
                            )}>
                              {isApprovedByTeacher ? "✓ Validada" : "⏳ Pendiente Escuela"}
                            </span>
                            <span className={cn(
                              "px-2 py-0.5 rounded-md",
                              isGradedByCompany ? "bg-rtGreenLight text-rtGreen" : "bg-slate-100 text-slate-400"
                            )}>
                              {isGradedByCompany ? `✓ Evaluada` : "⏳ Pendiente Org."}
                            </span>
                          </div>
                          <span className="text-xs text-rtPink hover:underline">Ver detalle</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white border-2 border-slate-200 border-dashed rounded-3xl p-6 text-center text-slate-400 font-bold text-xs">
                  No tenés misiones activas en este momento. ¡Buscá una en el Tablero!
                </div>
              )}
            </div>

            {/* SOFT SKILLS QUICK PREVIEW */}
            <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Award className="h-5 w-5 text-rtPurple" />
                  Habilidades Blandas
                </h2>
                <button 
                  onClick={() => { setActiveTab("misiones"); setTableroSubTab("habilidades"); }}
                  className="text-xs text-rtPink font-bold hover:underline"
                >
                  Ver todas →
                </button>
              </div>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Entrená tus habilidades interpersonales y ganá XP adicional resolviendo dilemas locales en 10 minutos.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {SOFT_SKILLS.slice(0, 2).map((skill) => {
                  const compCount = currentUser.habilidadesBlandasCompletadas?.[skill.id] || 0;
                  return (
                    <div 
                      key={skill.id}
                      onClick={() => { setActiveTab("misiones"); setTableroSubTab("habilidades"); setActiveSoftSkill(skill); setActiveExerciseIdx(0); setSelectedSoftOptionIdx(null); }}
                      className="border border-slate-200 hover:border-rtPurple p-3 rounded-2xl cursor-pointer text-center space-y-1 bg-slate-50/50 hover:bg-white transition-all"
                    >
                      <span className="text-2xl">{skill.icono}</span>
                      <h4 className="text-xs font-black text-slate-800 tracking-tight">{skill.nombre.split(" ")[0]}</h4>
                      <span className="text-[9px] font-black bg-rtPurpleLight text-rtPurple px-2 py-0.5 rounded-full">
                        {compCount > 0 ? "Completado" : `+${skill.xp} XP`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* INSIGNIAS SECTION */}
            <div className="space-y-3">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Star className="h-5 w-5 text-rtYellow fill-current" />
                Mis Insignias ({compIds.length + 1 + Object.keys(currentUser.habilidadesBlandasCompletadas || {}).length})
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {INSIGNIAS_MOCK.map((badge, idx) => {
                  const earned = idx === 0 || (badge.category === "Conservación" && compIds.map(String).includes("4")) || (badge.category === "Datos" && compIds.map(String).includes("3")) || (badge.category === "Marketing" && compIds.map(String).includes("1"));
                  return (
                    <div 
                      key={badge.id}
                      className={cn(
                        "bg-white border-2 rounded-2xl p-3 text-center transition-all flex flex-col items-center justify-center space-y-1",
                        earned 
                          ? "border-slate-900 shadow-[2px_2px_0_#0f172a] bg-gradient-to-tr from-rtPinkLight/30 to-white" 
                          : "border-slate-250 opacity-40"
                      )}
                    >
                      <div className="text-3xl mb-1">{badge.icon}</div>
                      <h3 className="text-[10px] font-black text-slate-800 leading-tight">{badge.name}</h3>
                      <p className="text-[9px] font-bold text-slate-400 leading-none">{badge.desc}</p>
                    </div>
                  );
                })}
                {/* Dynamically earned soft skills badges */}
                {SOFT_SKILLS.map((skill) => {
                  const completed = (currentUser.habilidadesBlandasCompletadas?.[skill.id] || 0) > 0;
                  if (!completed) return null;
                  return (
                    <div 
                      key={`badge-soft-${skill.id}`}
                      className="bg-white border-2 border-slate-900 shadow-[2px_2px_0_#0f172a] rounded-2xl p-3 text-center flex flex-col items-center justify-center space-y-1 bg-gradient-to-tr from-rtPurpleLight/30 to-white"
                    >
                      <div className="text-3xl mb-1">{skill.icono}</div>
                      <h3 className="text-[10px] font-black text-slate-800 leading-tight">Pro {skill.id}</h3>
                      <p className="text-[9px] font-bold text-slate-400 leading-none">Habilidad demostrada</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MINI LEADERBOARD */}
            <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Trophy className="h-5 w-5 text-rtYellow fill-current" />
                Top Jugadores del Piloto
              </h2>
              <div className="space-y-2">
                {(radarState?.users || [])
                  .filter((u: any) => u.rol === "estudiante")
                  .sort((a: any, b: any) => (b.xp || 0) - (a.xp || 0))
                  .slice(0, 3)
                  .map((player: any, idx: number) => (
                    <div 
                      key={player.email}
                      className={cn(
                        "flex items-center gap-3 p-2.5 rounded-2xl border-2 transition-transform",
                        player.email.toLowerCase() === currentUser.email.toLowerCase() 
                          ? "border-rtPink bg-rtPinkLight/20 shadow-sm" 
                          : "border-slate-100 bg-slate-50/50"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white shrink-0",
                        idx === 0 ? "bg-rtYellow shadow-[0_2px_0_#d19b0d]" :
                        idx === 1 ? "bg-slate-400 shadow-[0_2px_0_#64748b]" :
                        "bg-amber-600 shadow-[0_2px_0_#92400e]"
                      )}>
                        {idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-slate-800 text-xs truncate">{player.nombre}</p>
                        <p className="text-[9px] font-bold text-slate-400 leading-none">{player.perfil} · {player.curso}</p>
                      </div>
                      <div className="font-black text-xs text-rtPink shrink-0 flex items-center gap-0.5">
                        <Zap className="h-3 w-3 fill-current" /> {player.xp} XP
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TABLERO DE MISIONES */}
        {activeTab === "misiones" && (
          <div className="space-y-6 animate-fade-in">
            
            {/* Sub-tab Selector */}
            <div className="flex bg-slate-200/60 border border-slate-200 p-1 rounded-2xl">
              <button
                onClick={() => setTableroSubTab('misiones')}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all",
                  tableroSubTab === 'misiones' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"
                )}
              >
                Misiones de Organizaciones
              </button>
              <button
                onClick={() => setTableroSubTab('habilidades')}
                className={cn(
                  "flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all",
                  tableroSubTab === 'habilidades' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"
                )}
              >
                Habilidades Blandas
              </button>
            </div>

            {tableroSubTab === 'misiones' ? (
              <div className="space-y-4">
                {/* Active missions block */}
                {inCursoIds.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">Mis misiones activas</h3>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {inCursoIds.map((id: any) => {
                        const ch = filteredChallenges.find((c: any) => String(c.id) === String(id));
                        if (!ch) return null;
                        const categoryData = categories.find(c => c.name === ch.category);
                        return (
                          <div 
                            key={ch.id} 
                            onClick={() => setSelectedChallenge(ch)}
                            className="bg-white border-2 border-amber-300 rounded-3xl p-5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between animate-fade-in"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <span className={cn(
                                  "w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br",
                                  categoryData?.color || "from-slate-100 to-slate-200"
                                )}>
                                  {categoryData?.emoji || "📡"}
                                </span>
                                <span className="text-[9px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                                  ⏳ En Curso
                                </span>
                              </div>
                              <h3 className="font-extrabold text-slate-800 text-sm leading-tight mb-1">{ch.title}</h3>
                              <p className="text-xs text-slate-400 font-bold mb-3">{ch.companyName}</p>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] font-bold text-slate-500">
                              <span className="flex items-center gap-0.5 text-rtPink font-black">
                                <Zap className="h-3.5 w-3.5 fill-current animate-pulse" /> +{ch.xpReward} XP
                              </span>
                              <span className="text-xs text-rtPink hover:underline">Ver detalle / Darse de baja</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Active filters display */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-black text-slate-800">Misiones Disponibles</h2>
                  
                  {/* Time Compatibility Checkbox */}
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-slate-650 bg-slate-50 hover:bg-slate-100 py-1.5 px-3 rounded-xl border border-slate-200 transition-colors">
                    <input 
                      type="checkbox"
                      checked={filterCompatibleOnly}
                      onChange={(e) => setFilterCompatibleOnly(e.target.checked)}
                      className="rounded text-rtBlue focus:ring-rtBlue h-4 w-4 accent-rtBlue"
                    />
                    <span>Filtrar por compatibilidad horaria</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {visibleTableroChallenges.map((ch: any) => {
                    const categoryData = categories.find(c => c.name === ch.category);
                    const compatible = isTimeCompatible(ch);
                    return (
                      <div 
                        key={ch.id} 
                        onClick={() => setSelectedChallenge(ch)}
                        className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br",
                              categoryData?.color || "from-slate-100 to-slate-200"
                            )}>
                              {categoryData?.emoji || "📡"}
                            </span>
                            <div className="flex gap-1.5">
                              <span className={cn("text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full block w-fit", getDifficultyColor(ch.difficulty))}>
                                {ch.difficulty}
                              </span>
                              {compatible && (
                                <span className="text-[9px] font-black bg-rtGreenLight text-rtGreen px-2 py-0.5 rounded-full">
                                  ⏱️ Compatible
                                </span>
                              )}
                            </div>
                          </div>
                          <h3 className="font-extrabold text-slate-800 text-sm leading-tight mb-1">{ch.title}</h3>
                          <p className="text-xs text-slate-400 font-bold mb-3">{ch.companyName}</p>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] font-bold text-slate-500">
                          <span className="flex items-center gap-0.5 text-rtPink font-black">
                            <Zap className="h-3.5 w-3.5 fill-current" /> +{ch.xpReward} XP
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {ch.duration}
                          </span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                            {ch.gradeLevel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {visibleTableroChallenges.length === 0 && (
                  <div className="bg-white border-2 border-slate-200 border-dashed rounded-3xl p-12 text-center text-slate-450 font-bold">
                    No hay misiones que coincidan con tu filtro actual de compatibilidad horaria.
                  </div>
                )}
              </div>
            ) : (
              // Habilidades Blandas
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                  <h2 className="text-lg font-black text-slate-800">Ejercicios de Habilidades Blandas</h2>
                  <p className="text-xs font-bold text-slate-400 mt-1 leading-snug">Cada entrenamiento resuelto te brinda XP inmediata y desbloquea insignias vocacionales.</p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SOFT_SKILLS.map((skill) => {
                    const compCount = currentUser.habilidadesBlandasCompletadas?.[skill.id] || 0;
                    const isCompleted = compCount > 0;
                    return (
                      <div 
                        key={skill.id}
                        onClick={() => { setActiveSoftSkill(skill); setActiveExerciseIdx(0); setSelectedSoftOptionIdx(null); }}
                        className={cn(
                          "bg-white border-2 rounded-3xl p-5 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer flex justify-between gap-4 border-slate-900"
                        )}
                      >
                        <div className="flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1.5">
                              <span className="text-3xl">{skill.icono}</span>
                              <h3 className="font-extrabold text-slate-800 text-sm leading-tight">{skill.nombre}</h3>
                            </div>
                            <p className="text-[11px] text-slate-400 font-bold leading-snug line-clamp-2">{skill.descripcion}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-4 text-[9px] font-black uppercase tracking-wider text-slate-500">
                            <span className="bg-rtPurpleLight text-rtPurple px-2.5 py-0.5 rounded-full font-black">+{skill.xp} XP</span>
                            <span className="bg-slate-100 px-2 py-0.5 rounded-full">{skill.duracion}</span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-center items-end shrink-0">
                          {isCompleted ? (
                            <span className="text-xs font-black bg-rtGreenLight text-rtGreen px-2.5 py-1 rounded-full uppercase tracking-wider">✓ Completado</span>
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-300" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORIENTACION VOCACIONAL */}
        {activeTab === "orientacion" && (
          <div className="space-y-6">
            
            <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="text-center space-y-2">
                <span className="text-3xl">{PERFILES_DETALLES[currentUser.perfil as keyof typeof PERFILES_DETALLES]?.emoji || "📡"}</span>
                <h2 className="text-2xl font-black text-rtDark uppercase tracking-tight">{currentUser.perfil}</h2>
                <p className="text-sm font-bold text-slate-500">Mapa de intereses según tu Cuestionario</p>
              </div>

              {renderRadarChart()}
            </div>

            {/* Strengths & Careers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-sm space-y-3">
                <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                  <Star className="h-5 w-5 text-rtYellow fill-current" /> Fortalezas Clave
                </h3>
                <ul className="space-y-2">
                  {currentUser.fortalezas?.map((f: string, fIdx: number) => (
                    <li key={fIdx} className="flex gap-2 text-sm font-bold text-slate-600">
                      <span className="text-rtPink font-black">✦</span> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-sm space-y-3">
                <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-rtTeal" /> Carreras sugeridas
                </h3>
                <ul className="space-y-2">
                  {PERFILES_DETALLES[currentUser.perfil as keyof typeof PERFILES_DETALLES]?.carreras.map((c: string, cIdx: number) => (
                    <li key={cIdx} className="flex gap-2 text-sm font-bold text-slate-600">
                      <span className="text-rtTeal font-black">🎓</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-rtBlueLight border-2 border-rtBlue rounded-3xl p-6 space-y-2">
              <h4 className="text-lg font-black text-rtBlue">Vía de Continuidad de Estudios</h4>
              <p className="text-sm font-bold text-slate-700 leading-relaxed">
                Este perfil vocacional asocia tus habilidades cívico-prácticas con la oferta formativa del **Instituto Superior de Formación Docente y Técnica (ISFDyT)** y la **UNPSJB** en la provincia del Chubut.
              </p>
            </div>

          </div>
        )}

        {/* TAB 4: CERTIFICADOS */}
        {activeTab === "certificados" && (
          <div className="space-y-4">
            <div className="text-center max-w-sm mx-auto space-y-1 mb-2">
              <h2 className="text-xl font-black text-slate-800">Certificaciones Digitales</h2>
              <p className="text-xs font-bold text-slate-500 leading-tight">Completá y aprobá tus misiones asignadas para emitir certificados oficiales tripartitos.</p>
            </div>

            <div className="space-y-3">
              {/* LEVEL 1 CERTIFICATE CARD */}
              {(() => {
                const conMission = filteredChallenges.find((c: any) => c.studentEmail?.toLowerCase() === currentUser.email.toLowerCase() && c.validatedByTeacher);
                const isUnlocked = !!conMission;
                const inProgress = inCursoIds.length > 0;
                
                return (
                  <div 
                    onClick={() => isUnlocked && setShowCertificateModal({ level: 1, mission: conMission })}
                    className={cn(
                      "bg-white border-2 rounded-3xl p-5 flex items-center gap-4 transition-all",
                      isUnlocked 
                        ? "border-slate-900 shadow-[3px_3px_0_#0f172a] cursor-pointer hover:scale-[1.01]" 
                        : "border-slate-200 opacity-60"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0",
                      isUnlocked ? "bg-rtGreenLight text-rtGreen" : "bg-slate-100 text-slate-400"
                    )}>
                      {isUnlocked ? "🌱" : <Lock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full block w-fit mb-0.5",
                        isUnlocked ? "bg-rtGreenLight text-rtGreen" : 
                        inProgress ? "bg-rtYellowLight text-rtYellow" : "bg-slate-100 text-slate-400"
                      )}>
                        {isUnlocked ? "Emitido" : inProgress ? "En Curso" : "Bloqueado"}
                      </span>
                      <h3 className="font-extrabold text-slate-800 text-sm">Nivel 1: Certificado de Participación</h3>
                      <p className="text-[10px] text-slate-400 font-bold leading-tight font-sans">Emitido por la Escuela Coordinadora tras validar la entrega digital.</p>
                    </div>
                    {isUnlocked && <ChevronRight className="w-5 h-5 shrink-0 text-slate-300" />}
                  </div>
                );
              })()}

              {/* LEVEL 2 CERTIFICATE CARD */}
              {(() => {
                const gradedMission = filteredChallenges.find(
                  (c: any) => c.studentEmail?.toLowerCase() === currentUser.email.toLowerCase() && c.evaluation
                );
                const isUnlocked = !!gradedMission;
                const inProgress = inCursoIds.length > 0;
                
                return (
                  <div 
                    onClick={() => isUnlocked && setShowCertificateModal({ level: 2, mission: gradedMission })}
                    className={cn(
                      "bg-white border-2 rounded-3xl p-5 flex items-center gap-4 transition-all",
                      isUnlocked 
                        ? "border-slate-900 shadow-[3px_3px_0_#0f172a] cursor-pointer hover:scale-[1.01]" 
                        : "border-slate-200 opacity-60"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0",
                      isUnlocked ? "bg-rtBlueLight text-rtBlue" : "bg-slate-100 text-slate-400"
                    )}>
                      {isUnlocked ? "⭐" : <Lock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full block w-fit mb-0.5",
                        isUnlocked ? "bg-rtBlueLight text-rtBlue" : 
                        inProgress ? "bg-rtYellowLight text-rtYellow" : "bg-slate-100 text-slate-400"
                      )}>
                        {isUnlocked ? "Emitido" : inProgress ? "En Curso" : "Bloqueado"}
                      </span>
                      <h3 className="font-extrabold text-slate-800 text-sm">Nivel 2: Certificado de Competencia</h3>
                      <p className="text-[10px] text-slate-400 font-bold leading-tight">Emitido por la Organización o Institución tras evaluar tu trabajo.</p>
                    </div>
                    {isUnlocked && <ChevronRight className="w-5 h-5 shrink-0 text-slate-300" />}
                  </div>
                );
              })()}

              {/* LEVEL 3 CERTIFICATE CARD */}
              {(() => {
                const conicetMission = filteredChallenges.find((c: any) => c.studentEmail?.toLowerCase() === currentUser.email.toLowerCase() && c.validatedByTeacher);
                const gradedMission = filteredChallenges.find((c: any) => c.studentEmail?.toLowerCase() === currentUser.email.toLowerCase() && c.evaluation);
                const isUnlocked = !!conicetMission && !!gradedMission;
                
                return (
                  <div 
                    onClick={() => isUnlocked && setShowCertificateModal({ level: 3, mission: conicetMission })}
                    className={cn(
                      "bg-white border-2 rounded-3xl p-5 flex items-center gap-4 transition-all",
                      isUnlocked 
                        ? "border-slate-900 shadow-[3px_3px_0_#0f172a] cursor-pointer hover:scale-[1.01]" 
                        : "border-slate-200 opacity-60"
                    )}
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0",
                      isUnlocked ? "bg-rtPurpleLight text-rtPurple" : "bg-slate-100 text-slate-400"
                    )}>
                      {isUnlocked ? "🏅" : <Lock className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full block w-fit mb-0.5",
                        isUnlocked ? "bg-rtPurpleLight text-rtPurple" : "bg-slate-100 text-slate-400"
                      )}>
                        {isUnlocked ? "Emitido" : "Bloqueado"}
                      </span>
                      <h3 className="font-extrabold text-slate-800 text-sm">Nivel 3: Aval Institucional</h3>
                      <p className="text-[10px] text-slate-400 font-bold leading-tight">Co-firmado por Organización, Escuela y Municipio.</p>
                    </div>
                    {isUnlocked && <ChevronRight className="w-5 h-5 shrink-0 text-slate-300" />}
                  </div>
                );
              })()}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-[10px] text-slate-400 font-bold leading-normal">
              ℹ️ Los certificados son reconocidos por el sistema educativo de la Provincia del Chubut como horas válidas de Práctica Profesionalizante.
            </div>
          </div>
        )}

        {/* TAB 5: DYNAMIC CV PANEL */}
        {activeTab === "cv" && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center max-w-sm mx-auto space-y-1">
              <h2 className="text-2xl font-black text-slate-800">Tu Primer CV 📄</h2>
              <p className="text-xs font-bold text-slate-500 leading-tight">Generado automáticamente con lo que hiciste en Radar T.</p>
            </div>

            {/* Simulated CV Sheet */}
            <div className="bg-white border-4 border-slate-900 shadow-[6px_6px_0px_#1a1a2e] rounded-3xl p-6 md:p-8 space-y-6 font-sans select-none relative">
              <div className="absolute top-4 right-4 text-[10px] font-black text-slate-300 tracking-wider">RADAR T PROFILE</div>

              {/* Name & Title */}
              <div className="border-b-2 border-slate-900 pb-4">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">{currentUser.nombre}</h2>
                <p className="text-sm font-bold text-slate-500 uppercase mt-0.5">Estudiante de Secundaria · {currentUser.anio} ({currentUser.curso})</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs font-bold text-slate-400">
                  <span>✉️ {currentUser.email}</span>
                  <span>📍 Rada Tilly, Chubut</span>
                  <span>🏫 E.E.S. N° 736</span>
                </div>
              </div>

              {/* Vocational profile */}
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Perfil Vocacional</h3>
                <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 p-3 rounded-2xl">
                  <span className="text-3xl">{PERFILES_DETALLES[currentUser.perfil as keyof typeof PERFILES_DETALLES]?.emoji}</span>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">{currentUser.perfil}</h4>
                    <p className="text-[10px] text-slate-400 font-bold leading-none mt-0.5">Definido mediante cuestionario de intereses Radar T</p>
                  </div>
                </div>
              </div>

              {/* Strengths */}
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Fortalezas Destacadas</h3>
                <div className="flex flex-wrap gap-1.5">
                  {currentUser.fortalezas?.map((fort, idx) => (
                    <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-extrabold px-3 py-1.5 rounded-full">
                      ✓ {fort}
                    </span>
                  ))}
                </div>
              </div>

              {/* Radar T Experience */}
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Experiencia Práctica (Radar T)</h3>
                
                {/* Completed */}
                {compIds.length > 0 ? (
                  <div className="space-y-3">
                    {compIds.map((id) => {
                      const ch = filteredChallenges.find((c: any) => Number(c.id) === id);
                      if (!ch) return null;
                      return (
                        <div key={id} className="border border-slate-200 p-3.5 rounded-2xl bg-slate-50/30 space-y-1">
                          <div className="flex justify-between items-start gap-2 text-xs">
                            <span className="font-extrabold text-slate-800">{ch.title}</span>
                            <span className="shrink-0 text-rtGreen font-black">Aprobado</span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold">{ch.companyName} · Mayo 2026</p>
                          <p className="text-[10px] text-slate-600 font-semibold leading-relaxed line-clamp-2">{ch.description}</p>
                          {ch.evaluation && (
                            <div className="text-[9px] bg-rtGreenLight text-rtGreen px-2 py-0.5 rounded block w-fit font-black mt-1">
                              Calificación conceptual: {ch.evaluation.grade}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs font-semibold text-slate-450 italic">Pendiente de completar desafíos de organizaciones.</p>
                )}
              </div>

              {/* Soft Skills badges */}
              <div className="space-y-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Habilidades Blandas Acreditadas</h3>
                {Object.keys(currentUser.habilidadesBlandasCompletadas || {}).length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {Object.keys(currentUser.habilidadesBlandasCompletadas || {}).map(sId => {
                      const s = SOFT_SKILLS.find(item => item.id === sId);
                      return (
                        <div key={sId} className="flex items-center gap-2 border border-slate-100 p-2 rounded-xl text-xs bg-slate-50/50">
                          <span className="text-xl">{s?.icono}</span>
                          <span className="font-extrabold text-slate-700">{s?.nombre}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs font-semibold text-slate-450 italic">Pendiente de completar dilemas de habilidades blandas en el tablero.</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <div className="flex gap-2">
                <button
                  onClick={() => triggerToast("Descarga simulada de CV en PDF... 📥")}
                  className="flex-1 bg-rtDark text-white font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#1e293b] text-xs"
                >
                  📥 Descargar CV (PDF)
                </button>
                <button
                  onClick={() => triggerToast("CV enviado por email... 📧")}
                  className="flex-1 bg-white border-2 border-rtDark text-rtDark font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#1e293b] text-xs"
                >
                  📧 Enviar a mi mail
                </button>
              </div>

              <button
                onClick={() => {
                  if (linkedinVinculado) {
                    triggerToast("Tu CV ya está sincronizado con LinkedIn.", "info");
                  } else {
                    triggerToast("🔄 Conectando con LinkedIn...", "info");
                    setTimeout(() => {
                      setLinkedinVinculado(true);
                      const state = getRadarState();
                      if (state.currentUser) {
                        state.currentUser.linkedinVinculado = true;
                        const uIdx = state.users.findIndex(u => u.email.toLowerCase() === state.currentUser?.email?.toLowerCase());
                        if (uIdx !== -1) state.users[uIdx].linkedinVinculado = true;
                        saveRadarState(state);
                        setRadarState(state);
                      }
                      triggerToast("✔️ ¡Perfil de LinkedIn vinculado y CV sincronizado!", "success");
                    }, 1500);
                  }
                }}
                className={cn(
                  "w-full font-black py-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 transition-all btn-3d",
                  linkedinVinculado
                    ? "bg-rtGreenLight border border-rtGreen/30 text-rtGreen"
                    : "bg-[#0077b5] text-white shadow-[0_3px_0_#005987] hover:bg-[#006297]"
                )}
              >
                <span>{linkedinVinculado ? "✔️ Sincronizado con LinkedIn" : "🔗 Vincular y Sincronizar con LinkedIn"}</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* DETAIL MODAL (Enriched 7 Sections & Abandon buttons) */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-4 md:items-center">
          <div className="w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-2xl md:rounded-3xl border-2 border-slate-900 animate-slide-up flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className={cn(
              "p-6 text-white bg-gradient-to-br shrink-0 relative",
              categories.find(c => c.name === selectedChallenge.category)?.color || "from-rtPink to-rtPurple"
            )}>
              <button 
                onClick={() => setSelectedChallenge(null)}
                className="absolute right-4 top-4 rounded-full bg-black/20 p-2 text-white hover:bg-black/30 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-wider">
                {selectedChallenge.category}
              </span>
              <h2 className="text-2xl font-black mt-4 leading-tight">{selectedChallenge.title}</h2>
              <p className="mt-1 text-xs font-bold text-white/80">{selectedChallenge.companyName}</p>
            </div>
            
            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Quick info row */}
              <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 border border-slate-100 rounded-2xl p-3">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">XP RECOMPENSA</p>
                  <p className="text-lg font-black text-rtPink flex items-center justify-center gap-0.5">
                    <Zap className="h-4 w-4 fill-current text-rtPink" /> +{selectedChallenge.xpReward}
                  </p>
                </div>
                <div className="border-l border-slate-250">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">DURACIÓN</p>
                  <p className="text-sm font-black text-slate-700 mt-1 flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4" /> {selectedChallenge.duration}
                  </p>
                </div>
                <div className="border-l border-slate-250">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">DIFICULTAD</p>
                  <p className="text-sm font-black text-slate-700 mt-1">{selectedChallenge.difficulty}</p>
                </div>
              </div>

              {/* Accordion-Style 100% Digital Sections */}
              <div className="space-y-2.5">
                
                {/* 1. El Problema */}
                <details open className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                  <summary className="font-black text-xs uppercase text-slate-750 cursor-pointer list-none flex justify-between items-center">
                    <span>SECCIÓN 1: El Problema Local</span>
                    <span className="text-rtPink font-bold text-xs">+</span>
                  </summary>
                  <p className="mt-2 text-xs font-bold text-slate-600 leading-relaxed">
                    {selectedChallenge.problema || selectedChallenge.description}
                  </p>
                </details>

                {/* 2. Lo que se espera */}
                <details className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                  <summary className="font-black text-xs uppercase text-slate-750 cursor-pointer list-none flex justify-between items-center">
                    <span>SECCIÓN 2: Entrega Esperada (Digital)</span>
                    <span className="text-rtPink font-bold text-xs">+</span>
                  </summary>
                  <p className="mt-2 text-xs font-bold text-slate-600 leading-relaxed">
                    {selectedChallenge.resultadoEsperado || "Un reporte digital estructurado que resuelva los puntos claves planteados."}
                  </p>
                </details>

                {/* 3. Etapas */}
                {selectedChallenge.etapas && (
                  <details className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <summary className="font-black text-xs uppercase text-slate-750 cursor-pointer list-none flex justify-between items-center">
                      <span>SECCIÓN 3: Etapas del Proyecto</span>
                      <span className="text-rtPink font-bold text-xs">+</span>
                    </summary>
                    <div className="mt-3 space-y-2">
                      {selectedChallenge.etapas.map((et: any, idx: number) => (
                        <div key={idx} className="flex gap-3 text-xs font-bold text-slate-650 items-center">
                          <span className="w-5 h-5 rounded-full bg-rtPink/20 text-rtPink flex items-center justify-center font-black shrink-0">{idx+1}</span>
                          <span>{et.titulo} ({et.plazo})</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}

                {/* 4. Modalidad de entrega */}
                <details className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                  <summary className="font-black text-xs uppercase text-slate-750 cursor-pointer list-none flex justify-between items-center">
                    <span>SECCIÓN 4: Modalidad de Entrega</span>
                    <span className="text-rtPink font-bold text-xs">+</span>
                  </summary>
                  <p className="mt-2 text-xs font-bold text-slate-650">
                    📂 Formato: {selectedChallenge.modalidadEntrega || "Archivo PDF/Multimedia subido a la plataforma"}
                  </p>
                </details>

                {/* 5. Criterios de evaluacion */}
                {selectedChallenge.criteriosEvaluacion && (
                  <details className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <summary className="font-black text-xs uppercase text-slate-750 cursor-pointer list-none flex justify-between items-center">
                      <span>SECCIÓN 5: Criterios de Evaluación</span>
                      <span className="text-rtPink font-bold text-xs">+</span>
                    </summary>
                    <p className="mt-2 text-xs font-bold text-slate-650 leading-relaxed">
                      {selectedChallenge.criteriosEvaluacion}
                    </p>
                  </details>
                )}

                {/* 6. Recursos */}
                <details className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                  <summary className="font-black text-xs uppercase text-slate-750 cursor-pointer list-none flex justify-between items-center">
                    <span>SECCIÓN 6: Materiales Proporcionados</span>
                    <span className="text-rtPink font-bold text-xs">+</span>
                  </summary>
                  <p className="mt-2 text-xs font-bold text-slate-650">
                    {selectedChallenge.recursosCompartidos ? "✓ Acceso digital a bases de fotos, mapas e información oficial provista por el tutor." : "El alumno trabajará con materiales abiertos recolectados en internet."}
                  </p>
                </details>

                {/* 7. Privacidad y Seguridad */}
                <details className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                  <summary className="font-black text-xs uppercase text-slate-750 cursor-pointer list-none flex justify-between items-center">
                    <span>SECCIÓN 7: Privacidad y Medios</span>
                    <span className="text-rtPink font-bold text-xs">+</span>
                  </summary>
                  <p className="mt-2 text-xs font-bold text-slate-600 leading-relaxed">
                    Radar T es una plataforma mediada de forma asincrónica. Queda estrictamente prohibida la presencialidad física del estudiante en las locaciones de la organización o el contacto por canales externos.
                  </p>
                </details>

              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-6 border-t border-slate-100 shrink-0 bg-slate-50">
              {inCursoIds.includes(Number(selectedChallenge.id)) ? (
                // Already accepted challenge details
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    className="w-1/3 border-2 border-slate-200 text-slate-700 font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#e2e8f0] text-xs"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => setShowExitModal(selectedChallenge)}
                    className="w-2/3 bg-red-600 hover:bg-red-700 text-white font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#991b1b] text-xs flex items-center justify-center gap-1.5"
                  >
                    ❌ Darse de Baja
                  </button>
                </div>
              ) : (
                // Open challenge details
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    className="w-1/3 border-2 border-slate-200 text-slate-700 font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#e2e8f0] text-xs"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => handleTakeMission(selectedChallenge)}
                    className="w-2/3 bg-rtGreen text-white font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#2b7326] hover:bg-rtGreen/90 text-xs flex items-center justify-center gap-1.5"
                  >
                    <Check className="h-4 w-4" /> Inscribirme
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DETAILED HIGH-FIDELITY DIPLOMA MODAL */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-2xl bg-white border-[12px] border-double border-slate-900 rounded-3xl p-8 shadow-2xl space-y-6 animate-scale-up relative">
            
            {/* Close button */}
            <button 
              onClick={() => setShowCertificateModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-full p-2 border border-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
            
            {/* Certificate Border & Header */}
            <div className="text-center space-y-3 pb-4 border-b-4 border-slate-900">
              <span className="text-4xl">📡</span>
              <h1 className="text-2xl font-serif font-black tracking-tight text-slate-900 uppercase">
                {showCertificateModal.level === 1 && "Certificado de Participación Escolar"}
                {showCertificateModal.level === 2 && "Certificación de Competencias Laborales"}
                {showCertificateModal.level === 3 && "Aval de Prácticas Profesionalizantes"}
              </h1>
              <p className="text-[10px] font-black text-rtPink uppercase tracking-widest font-sans">Radar T · Conexión Productiva Local · Piloto 2026</p>
            </div>

            {/* Main content */}
            <div className="py-4 text-center space-y-4 font-serif">
              <p className="text-sm italic text-slate-500 font-bold">Por cuanto la institución certifica que el estudiante:</p>
              
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">{currentUser.nombre}</h2>
              
              <div className="text-xs font-bold text-slate-400 uppercase font-sans py-1">
                DNI: [Validado por la Escuela]
              </div>

              <p className="text-sm text-slate-650 leading-relaxed max-w-md mx-auto">
                Ha completado satisfactoriamente la práctica profesionalizante 100% digital de impacto cívico local denominada:
                <strong className="text-slate-900 block my-2 font-sans font-black text-sm">
                  "{showCertificateModal.mission?.title || 'Desafío en Práctica'}"
                </strong>
                Para la organización asociada 
                <strong className="text-slate-900 block font-sans font-extrabold text-xs">
                  "{showCertificateModal.mission?.companyName || 'Avistaje Patagonia SRL'}"
                </strong>
                Cumpliendo la carga horaria pedagógica certificada y validada digitalmente.
              </p>
            </div>

            {/* Signatures Row */}
            <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-6 text-center text-xs font-sans">
              <div className="space-y-1">
                <div className="h-10 flex items-end justify-center">
                  <span className="text-slate-350 italic text-[11px] font-semibold border-b border-dashed border-slate-300 px-4 pb-1">
                    {currentUser.docente}
                  </span>
                </div>
                <p className="text-[9px] font-black text-slate-800 uppercase leading-none">Coordinador Pedagógico</p>
                <p className="text-[8px] text-slate-400 font-semibold leading-none">E.E.S. N° 736</p>
              </div>
              <div className="space-y-1">
                <div className="h-10 flex items-end justify-center">
                  <span className="text-slate-350 italic text-[11px] font-semibold border-b border-dashed border-slate-300 px-4 pb-1">
                    {showCertificateModal.mission?.companyName?.split(" ")[0] || "Avistaje"} SRL
                  </span>
                </div>
                <p className="text-[9px] font-black text-slate-800 uppercase leading-none">Organización Asociada</p>
                <p className="text-[8px] text-slate-400 font-semibold leading-none">Rada Tilly, Chubut</p>
              </div>
              <div className="space-y-1">
                <div className="h-10 flex items-end justify-center">
                  <span className="text-slate-350 italic text-[11px] font-semibold border-b border-dashed border-slate-300 px-4 pb-1">
                    {showCertificateModal.level === 3 ? "Mariela Novack" : "—"}
                  </span>
                </div>
                <p className="text-[9px] font-black text-slate-800 uppercase leading-none">
                  {showCertificateModal.level === 3 ? "Firma Municipio" : "Requisito Nivel 3"}
                </p>
                <p className="text-[8px] text-slate-400 font-semibold leading-none">
                  {showCertificateModal.level === 3 ? "Aval Municipal" : "Pendiente"}
                </p>
              </div>
            </div>

            {/* Validation verification code */}
            <div className="text-center pt-2">
              <span className="text-[9px] text-slate-350 font-mono font-bold tracking-widest bg-slate-50 border border-slate-200/50 py-1 px-3 rounded-full">
                COD. VERIFICACIÓN: RT-2026-VL-0{showCertificateModal.level}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  triggerToast("Descarga de PDF iniciada... 📄");
                  setShowCertificateModal(null);
                }}
                className="w-full bg-rtDark text-white font-black py-3.5 rounded-2xl btn-3d shadow-[0_3px_0_#1e293b] hover:bg-slate-800 text-xs flex items-center justify-center gap-1.5"
              >
                Descargar Diploma Oficial (PDF) 📥
              </button>
              <button
                onClick={() => {
                  triggerToast("🔄 Compartiendo en tu perfil de LinkedIn...", "info");
                  setTimeout(() => {
                    triggerToast("✔️ ¡Certificación compartida con éxito en tu cuenta de LinkedIn!", "success");
                    setShowCertificateModal(null);
                  }, 1200);
                }}
                className="w-full bg-[#0077b5] text-white font-black py-3.5 rounded-2xl btn-3d shadow-[0_3px_0_#005987] hover:bg-[#006297] text-xs flex items-center justify-center gap-1.5"
              >
                Compartir Certificado en LinkedIn 🔗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXIT CHALLENGE MODAL (Necesito Salir) */}
      {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-sm bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 animate-scale-up">
            <h3 className="text-xl font-black text-rtDark leading-tight">¿Dejar esta misión?</h3>
            <p className="text-xs font-bold text-slate-500 leading-relaxed">
              Está bien si necesitás salir del desafío en este momento. Podés contarnos el motivo (es opcional y confidencial para la escuela):
            </p>
            
            <div className="space-y-3">
              <select
                value={exitReason}
                onChange={(e) => setExitReason(e.target.value)}
                className="w-full border-2 border-slate-200 rounded-2xl px-4 py-3 font-semibold focus:outline-none focus:border-rtPink bg-white text-xs"
              >
                <option value="No tengo tiempo en este momento">No tengo tiempo en este momento</option>
                <option value="Encontré otra misión que me interesa más">Encontré otra misión que me interesa más</option>
                <option value="No entendí bien lo que pedían">No entendí bien lo que pedían</option>
                <option value="Necesito apoyo de mi docente">Necesito apoyo de mi docente</option>
                <option value="Me sentí incómodo/a con algo">Me sentí incómodo/a con algo</option>
                <option value="Prefiero no decir">Prefiero no decir</option>
              </select>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowExitModal(null)}
                className="w-1/2 bg-slate-100 text-slate-700 border-2 border-slate-200 font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#e2e8f0] text-xs"
              >
                Cancelar, sigo
              </button>
              <button
                onClick={handleExitMission}
                className="w-1/2 bg-rtPink text-white font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#9a0050] hover:bg-rtPink/90 text-xs"
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SOFT SKILL EXERCISE PLAYER MODAL */}
      {activeSoftSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-2xl space-y-4 animate-scale-up">
            
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeSoftSkill.icono}</span>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-sm">{activeSoftSkill.nombre}</h3>
                  <p className="text-[10px] text-slate-400 font-bold">Ejercicio {activeExerciseIdx + 1} de {activeSoftSkill.ejercicios.length}</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveSoftSkill(null)}
                className="text-slate-400 hover:text-slate-700 bg-slate-50 border rounded-full p-1.5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl">
                <span className="text-[9px] font-black text-rtPurple uppercase tracking-wider block mb-1">Caso de Estudio</span>
                <p className="text-xs font-bold text-slate-750 leading-relaxed">
                  {activeSoftSkill.ejercicios[activeExerciseIdx].caso}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {activeSoftSkill.ejercicios[activeExerciseIdx].opciones.map((opt, idx) => {
                  const isSelected = selectedSoftOptionIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => selectedSoftOptionIdx === null && handleSoftSkillOption(idx)}
                      className={cn(
                        "w-full text-left p-3 border-2 rounded-2xl font-bold text-xs leading-snug transition-all flex justify-between items-center",
                        isSelected 
                          ? "border-rtPurple bg-rtPurpleLight/30 text-rtPurple" 
                          : selectedSoftOptionIdx === null
                            ? "border-slate-200 text-slate-650 hover:border-slate-300 hover:bg-slate-50/50"
                            : "border-slate-100 text-slate-400 opacity-60"
                      )}
                    >
                      <span>{opt.texto}</span>
                      {isSelected && <Check className="w-4 h-4 text-rtPurple shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback banner */}
              {selectedSoftOptionIdx !== null && (
                <div className="bg-rtPurpleLight/20 border border-rtPurple/30 rounded-2xl p-4 text-xs font-bold text-rtPurple leading-relaxed animate-fade-in">
                  💡 {activeSoftSkill.ejercicios[activeExerciseIdx].opciones[selectedSoftOptionIdx].feedback}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNextSoftExercise}
                disabled={selectedSoftOptionIdx === null}
                className="bg-rtPurple text-white font-black px-6 py-3 rounded-2xl btn-3d shadow-[0_3px_0_#623475] disabled:opacity-50 text-xs flex items-center gap-1"
              >
                <span>Siguiente</span>
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEVEL UP MODAL */}
      {levelUpModalData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-800 border-4 border-rtYellow rounded-3xl p-6 text-center shadow-2xl relative overflow-hidden space-y-6 animate-scale-up">
            
            {/* Sparkle effects */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-rtYellow/20 to-transparent pointer-events-none" />
            
            {/* Level Trophy / Star Icon */}
            <div className="relative inline-block mt-4">
              <div className="absolute -inset-1 rounded-full bg-rtYellow animate-pulse opacity-50 blur" />
              <div className="relative w-24 h-24 rounded-full bg-slate-900 border-4 border-rtYellow flex items-center justify-center text-5xl shadow-lg">
                ⭐
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-rtYellow uppercase tracking-tight animate-bounce">
                ¡SUBISTE DE NIVEL!
              </h2>
              <p className="text-white font-bold text-sm leading-relaxed">
                ¡Felicitaciones! Alcanzaste el nivel de:
              </p>
              <div className="inline-block px-4 py-2 rounded-2xl bg-rtYellow/25 border-2 border-rtYellow text-rtYellow font-black text-sm uppercase tracking-wider">
                {levelUpModalData.levelName}
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-white bg-slate-850 border border-slate-700/50 p-4 rounded-2xl shadow-inner">
              <div className="text-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Nivel Anterior</span>
                <span className="text-2xl font-black text-slate-300">Nv.{levelUpModalData.oldLevel}</span>
              </div>
              <div className="text-2xl text-rtYellow animate-pulse">➔</div>
              <div className="text-center">
                <span className="text-[10px] font-black text-rtYellow uppercase tracking-widest block">Nuevo Nivel</span>
                <span className="text-3xl font-black text-rtYellow font-mono">Nv.{levelUpModalData.newLevel}</span>
              </div>
            </div>

            <p className="text-slate-400 font-bold text-[10px] leading-relaxed">
              Seguí resolviendo misiones cívicas y demostrando habilidades para alcanzar el rango máximo de <strong>Pionero Patagónico</strong>.
            </p>

            <button
              onClick={() => {
                setLevelUpModalData(null);
                confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
              }}
              className="w-full bg-rtYellow text-slate-900 font-black py-4 rounded-2xl btn-3d shadow-[0_4px_0_#b8860b] text-xs hover:bg-yellow-400 transition-all uppercase tracking-wider animate-pulse"
            >
              Continuar Misión 🎒
            </button>
          </div>
        </div>
      )}

      {/* Legal Modal Render */}
      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />

    </div>
  );
}
