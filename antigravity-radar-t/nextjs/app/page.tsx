"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Zap, 
  Building2, 
  User, 
  Trophy, 
  Play, 
  Info, 
  Eye, 
  EyeOff, 
  Check, 
  MapPin, 
  School, 
  Activity,
  Globe,
  Volume2,
  VolumeX,
  Pause
} from "lucide-react";
import { getRadarState, saveRadarState, UserProfile } from "@/lib/store";
import LegalModal from "@/components/legal-modal";
import { cn } from "@/lib/utils";

const MAP_PIN_DETAILS = {
  'rada-tilly': {
    title: 'Rada Tilly, Chubut 🐳',
    badge: 'Piloto Activo',
    schoolName: 'E.E.S. N° 736 - Colegio Secundario',
    desc: 'La cuna del piloto Radar T. Conectamos la educación secundaria con la transición productiva del petróleo al ecoturismo científico y conservación de la ballena sei, junto con el CONICET.',
    sector: 'Ecoturismo y Conservación Marina',
    escuelas: '1 (E.E.S. N° 736)',
    top: '74%',
    left: '42%'
  },
  'neuquen': {
    title: 'Huinganco, Andacollo y Varvarco, Neuquén ⛰️',
    badge: 'Piloto Proyectado 2027',
    schoolName: 'CPEM N° 11 (Andacollo) y CPEM N° 30 (Huinganco)',
    desc: 'Ubicados en el Norte Neuquino, estos pueblos están cambiando su matriz basada en la minería histórica y ganadería de subsistencia para posicionarse como destinos clave del turismo de aventura, pesca deportiva y gastronomía regional.',
    sector: 'Turismo de Aventura, Pesca y Gastronomía Regional',
    escuelas: '2 (CPEM N° 11 y CPEM N° 30)',
    top: '64%',
    left: '34%'
  },
  'tdf': {
    title: 'Tolhuin, Lago Escondido y Puerto Almanza, Tierra del Fuego ❄️',
    badge: 'Piloto Proyectado 2027',
    schoolName: 'Colegio Trejo Noel (Tolhuin), Escuela de Lago Escondido y Escuela N° 44 (Puerto Almanza)',
    desc: 'Foco en el puerto pesquero más austral y la actividad de centollas en Puerto Almanza, junto con los aserraderos históricos de Tolhuin. Impulsa la diversificación del turismo local potenciado por las termas y senderos subantárticos.',
    sector: 'Desarrollo Pesquero Artesanal, Forestal y Diversificación Termal',
    escuelas: '3 (Colegio Trejo Noel y anexos Lago Escondido / Almanza)',
    top: '90%',
    left: '40%'
  },
  'san-luis': {
    title: 'San Luis (Eje Central) ⛰️',
    badge: 'Piloto Proyectado 2027',
    schoolName: 'Colegios Secundarios de Villa Mercedes, La Punta, Villa de Merlo, San Luis Capital y Justo Daract',
    desc: 'Red de nodos educativos en San Luis. Promueve la digitalización de servicios de hospitalidad, circuitos de microclima y catálogos de e-commerce regional en el corredor serrano y centros urbanos.',
    sector: 'E-Commerce Serrano, Hotelería y Bienestar',
    escuelas: '5 (Nodos Villa Mercedes, La Punta, Merlo, Capital y J. Daract)',
    top: '52%',
    left: '46%'
  },
  'san-juan': {
    title: 'Jáchal / Iglesia, San Juan ☀️',
    badge: 'Piloto Proyectado 2027',
    schoolName: 'Escuela Agrotécnica Manuel Belgrano (Jáchal)',
    desc: 'Escuela rural andina en zona de reconversión de minería tradicional a parques solares. Desafíos sobre optimización hídrica escolar cruzando datos climáticos y generación limpia.',
    sector: 'Energía Solar y Trazabilidad Hídrica',
    escuelas: '1 (Esc. Agrotécnica Manuel Belgrano)',
    top: '42%',
    left: '34%'
  }
};

export default function HomePage() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'login'>('home');
  const [selectedPin, setSelectedPin] = useState<'rada-tilly' | 'tdf' | 'neuquen' | 'san-luis' | 'san-juan'>('rada-tilly');
  const [aboutTab, setAboutTab] = useState<'contexto' | 'ejecucion' | 'seguridad' | 'onboarding'>('contexto');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => console.log(e));
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (!showSplash && videoRef.current) {
      // Try playing unmuted
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMuted(false);
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log("Unmuted autoplay blocked, playing muted", error);
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log(e));
            }
          });
      }
    }
  }, [showSplash]);
  
  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Tab states for Auth card
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [registerRole, setRegisterRole] = useState<'estudiante' | 'organizacion' | 'escuela'>('estudiante');

  // Register Form Fields
  // Student
  const [studentTermsChecked, setStudentTermsChecked] = useState(false);

  // Organization (Empresa)
  const [orgName, setOrgName] = useState('');
  const [orgCuit, setOrgCuit] = useState('');
  const [orgRubro, setOrgRubro] = useState('Ecoturismo');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgPassword, setOrgPassword] = useState('');
  const [orgConvenioChecked, setOrgConvenioChecked] = useState(false);

  // School / Teacher (Docente)
  const [schoolNameInput, setSchoolNameInput] = useState('');
  const [teacherNameInput, setTeacherNameInput] = useState('');
  const [teacherEmailInput, setTeacherEmailInput] = useState('');
  const [teacherPasswordInput, setTeacherPasswordInput] = useState('');
  const [teacherMateria, setTeacherMateria] = useState('');
  const [teacherCursos, setTeacherCursos] = useState('');
  const [schoolConvenioChecked, setSchoolConvenioChecked] = useState(false);

  // App state from localStorage
  const [radarState, setRadarState] = useState<any>(null);
  const [isLegalOpen, setIsLegalOpen] = useState(false);

  useEffect(() => {
    // Initialize radar state
    const state = getRadarState();
    setRadarState(state);
    
    // Check if splash was already dismissed
    const dismissed = sessionStorage.getItem("radar_splash_dismissed");
    if (dismissed) {
      setShowSplash(false);
    }
  }, []);

  const handleDismissSplash = () => {
    setShowSplash(false);
    sessionStorage.setItem("radar_splash_dismissed", "true");
    
    // Play with sound enabled since user clicked the splash button
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current.play().catch((err) => {
          console.log("Autoplay was prevented by browser even after gesture", err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(e => console.log(e));
          }
        });
      }
    }, 150);
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const state = getRadarState();
    const user = state.users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      // Set active session
      state.currentUser = user;
      saveRadarState(state);
      
      setSuccessMsg(`¡Bienvenido, ${user.nombre}! Redirigiendo...`);
      
      // Redirect based on role
      setTimeout(() => {
        if (user.rol === 'estudiante') {
          router.push('/estudiante');
        } else if (user.rol === 'empresa') {
          router.push('/empresa');
        } else if (user.rol === 'docente') {
          router.push('/docente');
        }
      }, 1000);
    } else {
      setErrorMsg('Credenciales incorrectas. Verifique los accesos rápidos de prueba.');
    }
  };

  const handleRegister = (e?: React.FormEvent) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const state = getRadarState();

    if (registerRole === 'estudiante') {
      if (!studentTermsChecked) {
        setErrorMsg('Debes aceptar los Términos y Condiciones.');
        return;
      }
      // Student registration: redirect to the student dashboard wizard (resets currentUser to null to launch step 0)
      state.currentUser = null;
      saveRadarState(state);
      setSuccessMsg('Redirigiendo al formulario de test vocacional y registro de estudiante...');
      setTimeout(() => {
        router.push('/estudiante');
      }, 1000);

    } else if (registerRole === 'organizacion') {
      if (!orgName.trim() || !orgCuit.trim() || !orgEmail.trim() || !orgPassword.trim()) {
        setErrorMsg('Por favor completa todos los campos.');
        return;
      }
      if (!orgConvenioChecked) {
        setErrorMsg('Debes aceptar la declaración sobre el Convenio Marco de Vinculación Educativa.');
        return;
      }

      // Check format of CUIT
      const cuitRegex = /^\d{2}-\d{8}-\d{1}$|^\d{11}$/;
      if (!cuitRegex.test(orgCuit.replace(/[-\s]+/g, ''))) {
        setErrorMsg('El formato del CUIT es inválido. Debe tener 11 dígitos (ej: 20-12345678-9).');
        return;
      }

      // Check if email already exists
      const exists = state.users.some(u => u.email.toLowerCase() === orgEmail.toLowerCase());
      if (exists) {
        setErrorMsg('El correo electrónico ya se encuentra registrado.');
        return;
      }

      const newOrg: UserProfile = {
        email: orgEmail,
        password: orgPassword,
        rol: 'empresa',
        nombre: orgName,
        contacto: 'Coordinador de Prácticas',
        perfil: orgRubro
      };

      state.users.push(newOrg);
      state.currentUser = newOrg;
      saveRadarState(state);
      if (radarState) {
        setRadarState(state);
      }

      setSuccessMsg(`¡Organización "${orgName}" registrada con éxito! Redirigiendo a tu panel...`);
      setTimeout(() => {
        router.push('/empresa');
      }, 1000);

    } else if (registerRole === 'escuela') {
      if (!schoolNameInput.trim() || !teacherNameInput.trim() || !teacherEmailInput.trim() || !teacherPasswordInput.trim() || !teacherMateria.trim() || !teacherCursos.trim()) {
        setErrorMsg('Por favor completa todos los campos.');
        return;
      }
      if (!schoolConvenioChecked) {
        setErrorMsg('Debes aceptar la declaración sobre la firma de Convenios.');
        return;
      }

      // Check if email already exists
      const exists = state.users.some(u => u.email.toLowerCase() === teacherEmailInput.toLowerCase());
      if (exists) {
        setErrorMsg('El correo electrónico docente ya se encuentra registrado.');
        return;
      }

      const newTeacher: UserProfile = {
        email: teacherEmailInput,
        password: teacherPasswordInput,
        rol: 'docente',
        nombre: teacherNameInput,
        escuela: schoolNameInput,
        materia: teacherMateria,
        cursos: teacherCursos.split(',').map(c => c.trim()).filter(Boolean)
      };

      state.users.push(newTeacher);
      state.currentUser = newTeacher;
      saveRadarState(state);
      if (radarState) {
        setRadarState(state);
      }

      setSuccessMsg(`¡Establecimiento "${schoolNameInput}" y Docente registrados! Redirigiendo a tu panel...`);
      setTimeout(() => {
        router.push('/docente');
      }, 1000);
    }
  };

  const fillLoginAndTrigger = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    
    // Auto submit
    setTimeout(() => {
      const state = getRadarState();
      const user = state.users.find(
        u => u.email.toLowerCase() === demoEmail.toLowerCase() && u.password === demoPass
      );
      if (user) {
        state.currentUser = user;
        saveRadarState(state);
        setSuccessMsg(`¡Bienvenido, ${user.nombre}! Redirigiendo...`);
        if (user.rol === 'estudiante') {
          router.push('/estudiante');
        } else if (user.rol === 'empresa') {
          router.push('/empresa');
        } else if (user.rol === 'docente') {
          router.push('/docente');
        }
      }
    }, 100);
  };

  const selectRoleFromAbout = (role: 'estudiante' | 'empresa' | 'docente') => {
    setActiveSection('login');
    if (role === 'estudiante') {
      fillLoginAndTrigger('valentina@ees736.edu.ar', 'radar123');
    } else if (role === 'empresa') {
      setAuthTab('register');
      setRegisterRole('organizacion');
    } else if (role === 'docente') {
      setAuthTab('register');
      setRegisterRole('escuela');
    }
  };

  // Splash Screen Overlay
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-rtDark text-white p-6 transition-all duration-500">
        <div className="relative mb-8 flex h-48 w-48 items-center justify-center">
          {/* Radar Waves */}
          <div className="absolute inset-0 animate-ping rounded-full border border-rtPink/20" />
          <div className="absolute inset-4 animate-ping rounded-full border border-rtTeal/30" style={{ animationDelay: "0.5s" }} />
          <div className="absolute inset-8 animate-ping rounded-full border border-rtYellow/40" style={{ animationDelay: "1s" }} />
          
          {/* Central Logo Symbol */}
          <div className="z-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-rtPink via-rtPurple to-rtBlue shadow-2xl">
            <span className="text-5xl animate-pulse">📡</span>
          </div>
        </div>

        <h1 className="text-5xl font-black tracking-tight mb-3">
          <span className="text-rtPink">R</span>
          <span className="text-rtYellow">a</span>
          <span className="text-rtGreen">d</span>
          <span className="text-rtBlue">a</span>
          <span className="text-rtPurple">r</span>
          <span className="text-rtTeal"> T</span>
        </h1>
        
        <p className="text-lg text-slate-400 font-semibold mb-8 text-center max-w-sm">
          Tu primera misión real te espera
        </p>

        <button 
          onClick={handleDismissSplash}
          className="bg-rtPink text-white font-black text-xl px-10 py-4 rounded-2xl btn-3d shadow-[0_4px_0_#9a0050] hover:bg-rtPink/90 flex items-center gap-2"
        >
          <Play className="h-5 w-5 fill-current" /> Entrar al Piloto
        </button>

        <div className="absolute bottom-8 rounded-full bg-slate-800 border border-slate-700 px-4 py-1.5 text-xs font-bold text-slate-400">
          Piloto 2026 · Rada Tilly, Chubut 🐳
        </div>
      </div>
    );
  }

  const pinDetails = MAP_PIN_DETAILS[selectedPin];

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50">
      {/* Header / Navbar */}
      <header className="bg-white border-b border-slate-100 shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveSection('home')}>
          <span className="text-3xl font-black tracking-tight">
            <span className="text-rtPink">R</span>
            <span className="text-rtYellow">a</span>
            <span className="text-rtGreen">d</span>
            <span className="text-rtBlue">a</span>
            <span className="text-rtPurple">r</span>
            <span className="text-rtTeal"> T</span>
          </span>
          <span className="text-xs font-bold bg-rtBlueLight text-rtBlue px-2 py-0.5 rounded-md">Piloto 2026</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => setActiveSection('about')} 
            className={`font-bold transition-colors ${activeSection === 'about' ? 'text-rtPink' : 'text-slate-600 hover:text-rtPink'}`}
          >
            ¿Qué es Radar T?
          </button>

          <button 
            onClick={() => setActiveSection('login')} 
            className="bg-rtPink text-white font-black px-5 py-2.5 rounded-2xl btn-3d shadow-[0_4px_0_#9a0050] hover:bg-rtPink/90"
          >
            Iniciar Sesión
          </button>
        </nav>
        <button 
          onClick={() => setActiveSection('login')} 
          className="md:hidden bg-rtPink text-white font-black px-4 py-2 rounded-xl text-sm btn-3d shadow-[0_3px_0_#9a0050]"
        >
          Ingresar
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4">
        
        {/* SECTION 1: HOME */}
        {activeSection === 'home' && (
          <div className="max-w-4xl w-full mx-auto flex flex-col items-center gap-8 py-10">
            {/* 1. Spotlight Video Frame */}
            <div className="w-full bg-white border-2 border-slate-900 rounded-3xl p-4 shadow-[8px_8px_0px_#1a1a2e] relative group hover:scale-[1.01] transition-transform duration-300 border-b-[8px]">
              {/* Simulated browser toolbar */}
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3 mb-3">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Radar T · Spot Oficial</span>
                <span className="flex items-center gap-1 bg-rtGreenLight text-rtGreen text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-rtGreen" /> SPOT
                </span>
              </div>
              
              {/* Outer video frame container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-900 bg-slate-950 aspect-video shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/bg-hero.mp4" type="video/mp4" />
                </video>

                {/* Pulsing Audio/Overlay Button (if muted) */}
                {isMuted && (
                  <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all duration-300 z-10">
                    <button
                      onClick={toggleMute}
                      className="bg-rtPink text-white font-black text-sm px-6 py-3.5 rounded-2xl btn-3d shadow-[0_4px_0_#9a0050] hover:bg-rtPink/90 flex items-center gap-2.5 animate-bounce cursor-pointer"
                    >
                      <Volume2 className="h-4 w-4 fill-current animate-pulse" /> ESCUCHAR SPOT CON AUDIO 🔊
                    </button>
                  </div>
                )}

                {/* Custom Overlay Controls (visible on hover) */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-slate-900/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white z-20">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={togglePlay}
                      className="text-white hover:text-rtPink transition-colors focus:outline-none cursor-pointer"
                    >
                      {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="text-white hover:text-rtPink transition-colors focus:outline-none cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[9px] font-black text-slate-300">
                    <span>🐳 RADA TILLY</span>
                    <span>•</span>
                    <span>🎒 E.E.S. N° 736</span>
                  </div>
                </div>

                {/* Contextual badges overlay (static) */}
                <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[8px] font-black px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider">
                  🐳 Rada Tilly
                </span>
                <span className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm text-white text-[8px] font-black px-2 py-0.5 rounded border border-white/10 uppercase tracking-wider pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                  🎒 E.E.S. N° 736
                </span>
                <span className="absolute bottom-2.5 right-2.5 bg-rtPink text-white text-[8px] font-black px-2 py-0.5 rounded border border-rtPink/20 uppercase tracking-wider animate-bounce pointer-events-none group-hover:opacity-0 transition-opacity duration-300" style={{ animationDuration: '3s' }}>
                  📡 Prácticas 2026
                </span>
              </div>
            </div>

            {/* 2. Sección CTA ("¿Listo para tu primera misión real?") */}
            <div className="w-full text-center space-y-6 py-6 border-t-2 border-slate-100 mt-2">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-rtDark leading-none">
                ¿Listo para tu <span className="text-rtPink">primera misión</span> real?
              </h1>
              <p className="text-base text-slate-600 font-bold leading-relaxed max-w-2xl mx-auto">
                Conectamos desafíos reales de organizaciones locales de Rada Tilly con estudiantes que desean acreditar sus prácticas profesionalizantes de forma dinámica y gamificada.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => setActiveSection('login')}
                  className="bg-rtPink text-white font-black text-lg px-8 py-4 rounded-2xl btn-3d shadow-[0_4px_0_#9a0050] flex items-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  <Play className="w-5 h-5 fill-current" /> Comenzar la Demo
                </button>
                <button 
                  onClick={() => setActiveSection('about')}
                  className="bg-white border-2 border-rtDark text-rtDark font-black text-lg px-8 py-4 rounded-2xl btn-3d shadow-[0_4px_0_#1a1a2e] flex items-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  Saber más <Info className="w-5 h-5" />
                </button>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rtGreen opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rtGreen"></span>
                </span>
                <span className="text-xs font-bold text-slate-500">Piloto Activo: Rada Tilly, Chubut 🐳</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: ABOUT */}
        {activeSection === 'about' && (
          <div className="max-w-5xl w-full mx-auto py-12 space-y-12 animate-fade-in">
            {/* Header & description of the city transformation */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-black text-rtPink bg-rtPinkLight px-3 py-1 rounded-full uppercase tracking-wider">Acerca de Radar T</span>
              <h2 className="text-4xl md:text-5xl font-black text-rtDark tracking-tight leading-none">
                Conexión productiva local
              </h2>
              <p className="text-base font-bold text-slate-600 leading-relaxed bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md shadow-slate-200">
                Radar T es una plataforma diseñada para responder a la transformación productiva de las ciudades. Nace del caso piloto en Rada Tilly, que enfrenta la transición de una cuenca petrolera madura en retirada hacia el ecoturismo y la conservación marina (investigación y avistaje de la ballena sei).
              </p>
            </div>



            {/* INTERACTIVE SEGMENTED CONTROL */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 bg-slate-100 border-2 border-slate-900 rounded-3xl max-w-4xl mx-auto shadow-[0_4px_0_#0f172a]">
              <button
                type="button"
                onClick={() => setAboutTab('contexto')}
                className={cn(
                  "px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-2",
                  aboutTab === 'contexto'
                    ? "bg-rtDark text-white border-slate-950 shadow-[0_3px_0_#020617]"
                    : "text-slate-650 hover:text-slate-900 hover:bg-slate-200 border-transparent"
                )}
              >
                <span>📍</span> Origen y Contexto
              </button>
              <button
                type="button"
                onClick={() => setAboutTab('ejecucion')}
                className={cn(
                  "px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-2",
                  aboutTab === 'ejecucion'
                    ? "bg-rtDark text-white border-slate-950 shadow-[0_3px_0_#020617]"
                    : "text-slate-650 hover:text-slate-900 hover:bg-slate-200 border-transparent"
                )}
              >
                <span>⚙️</span> Cómo se Ejecuta
              </button>
              <button
                type="button"
                onClick={() => setAboutTab('seguridad')}
                className={cn(
                  "px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-2",
                  aboutTab === 'seguridad'
                    ? "bg-rtDark text-white border-slate-950 shadow-[0_3px_0_#020617]"
                    : "text-slate-650 hover:text-slate-900 hover:bg-slate-200 border-transparent"
                )}
              >
                <span>🔒</span> Seguridad y Rol Escolar
              </button>
              <button
                type="button"
                onClick={() => setAboutTab('onboarding')}
                className={cn(
                  "px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 border-2",
                  aboutTab === 'onboarding'
                    ? "bg-rtDark text-white border-slate-950 shadow-[0_3px_0_#020617]"
                    : "text-slate-650 hover:text-slate-900 hover:bg-slate-200 border-transparent"
                )}
              >
                <span>🏢</span> Onboarding de Organizaciones
              </button>
            </div>

            {/* TAB CONTENT PANELS */}
            <div className="w-full transition-all duration-300">
              {aboutTab === 'contexto' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                  {/* Contexto Local */}
                  <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all border-b-[8px]">
                    <h3 className="text-lg font-black text-rtDark flex items-center gap-2 mb-3">
                      <span>🗺️</span> Origen y Contexto Local
                    </h3>
                    <p className="text-xs font-bold text-slate-655 leading-relaxed">
                      Rada Tilly está atravesando una transformación productiva relevante. Durante años, gran parte de las oportunidades estuvieron vinculadas al petróleo, pero hoy emerge una nueva economía asociada al turismo y la conservación, especialmente a partir del avistaje de la ballena sei.
                    </p>
                    <p className="text-xs font-bold text-slate-655 leading-relaxed mt-3">
                      Sin embargo, existe una brecha: los estudiantes siguen formándose muchas veces sin conexión con estas nuevas oportunidades locales, mientras emprendedores y organizaciones no encuentran mecanismos simples para vincularse con las escuelas.
                    </p>
                  </div>

                  {/* La Propuesta */}
                  <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md hover:shadow-lg transition-all border-b-[8px]">
                    <h3 className="text-lg font-black text-rtGreen flex items-center gap-2 mb-3">
                      <span>💡</span> ¿Qué proponemos?
                    </h3>
                    <p className="text-xs font-bold text-slate-655 leading-relaxed">
                      Proponemos <strong>Radar T</strong>, una plataforma digital que conecta empresas, emprendedores, organizaciones y escuelas secundarias.
                    </p>
                    <p className="text-xs font-bold text-slate-655 leading-relaxed mt-3">
                      A través de plantillas simples y estandarizadas, las organizaciones cargan desafíos reales vinculados a sus necesidades. Los estudiantes seleccionan esos desafíos para desarrollar prácticas formativas acreditables, generando experiencias concretas de aprendizaje y aportando valor al territorio.
                    </p>
                  </div>
                </div>
              )}

              {aboutTab === 'ejecucion' && (
                <div className="space-y-8 animate-fade-in">
                  {/* Banco de Innovación */}
                  <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md border-b-[8px] flex flex-col justify-between max-w-3xl mx-auto">
                    <div>
                      <h3 className="text-lg font-black text-rtPink flex items-center gap-2 mb-3">
                        <span>📡</span> Banco de Proyectos de Innovación Local
                      </h3>
                      <p className="text-xs font-bold text-slate-655 leading-relaxed">
                        Radar T actúa como un banco de proyectos de innovación local donde la tecnología sirve como un radar de talento joven, buscando que las habilidades no emigren de las pequeñas comunidades.
                      </p>
                      <p className="text-xs font-bold text-slate-655 leading-relaxed mt-3">
                        Los jóvenes dejan de formarse para una industria que se está retirando (el petróleo) y se insertan tempranamente en el futuro económico de su territorio (turismo y conservación de la ballena sei), ganando experiencia real.
                      </p>
                    </div>
                  </div>

                  {/* Qué mejora */}
                  <div className="bg-slate-50 border-2 border-slate-900 rounded-3xl p-6 shadow-md border-b-[8px] max-w-3xl mx-auto">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">📈 ¿Qué mejora en el ecosistema?</h3>
                    <p className="text-xs font-bold text-slate-600 leading-relaxed">
                      Radar T permite que los jóvenes desarrollen habilidades en situaciones reales, fortalece el vínculo entre la escuela y la comunidad local, y acompaña la reconversión productiva de la ciudad para que el talento impulse la nueva economía del pueblo.
                    </p>
                  </div>
                </div>
              )}

              {aboutTab === 'seguridad' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                  {/* Seguridad del Estudiante */}
                  <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md border-b-[8px] space-y-4">
                    <h3 className="text-lg font-black text-rtGreen flex items-center gap-2">
                      <span>🛡️</span> Seguridad de los Estudiantes
                    </h3>
                    <div className="space-y-3 text-xs font-bold text-slate-655">
                      <div className="flex gap-2">
                        <span className="text-rtGreen text-base">✓</span>
                        <p><strong>100% Digital y Remoto:</strong> Ningún desafío implica presencialidad física en las instalaciones de la organización, eliminando riesgos de traslado o accidentes.</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-rtGreen text-base">✓</span>
                        <p><strong>Privacidad Blindada:</strong> Los datos de contacto del estudiante (teléfono, email personal, dirección) nunca se comparten. Las postulaciones se gestionan de forma anónima hasta la validación docente.</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-rtGreen text-base">✓</span>
                        <p><strong>Declaración Jurada (DDJJ):</strong> Es obligatorio que el alumno cargue su Declaración Jurada firmada por su tutor legal (padre/madre/responsable) para poder activar su cuenta.</p>
                      </div>
                    </div>
                  </div>

                  {/* Rol de la Institución */}
                  <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md border-b-[8px] space-y-4">
                    <h3 className="text-lg font-black text-rtPurple flex items-center gap-2">
                      <span>🏫</span> Rol de la Institución Educativa
                    </h3>
                    <div className="space-y-3 text-xs font-bold text-slate-655">
                      <div className="flex gap-2">
                        <span className="text-rtPurple text-base">✓</span>
                        <p><strong>Filtro y Tutoría:</strong> El docente coordinador es responsable de revisar y validar cada DDJJ de autorización parental antes de habilitar las prácticas del alumno.</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-rtPurple text-base">✓</span>
                        <p><strong>Mentores Pedagógicos:</strong> Los docentes realizan el seguimiento a través de las bitácoras digitales y revisan los avances semanales para garantizar el carácter pedagógico.</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-rtPurple text-base">✓</span>
                        <p><strong>Aprobación y Certificado:</strong> Una vez finalizado el desafío, el docente es el único con capacidad de emitir y firmar digitalmente el Certificado Nivel 1 homologado.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {aboutTab === 'onboarding' && (
                <div className="bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-md border-b-[8px] animate-fade-in space-y-6">
                  <h3 className="text-lg font-black text-rtBlue flex items-center gap-2">
                    <span>🏢</span> Cómo Incorporamos a las Organizaciones
                  </h3>
                  <p className="text-xs font-bold text-slate-600">
                    El proceso de incorporación de empresas, emprendedores y ONGs se realiza de forma totalmente segura y fiscalizada por la escuela para evitar burocracia sin perder rigor institucional:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                      <div className="bg-rtBlue/10 text-rtBlue font-black text-xs w-6 h-6 rounded-full flex items-center justify-center">1</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Filtro de Registro</h4>
                      <p className="text-[10px] text-slate-500 font-bold leading-normal">
                        La organización se registra cargando su CUIT, Razón Social e identificación del representante legal.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                      <div className="bg-rtBlue/10 text-rtBlue font-black text-xs w-6 h-6 rounded-full flex items-center justify-center">2</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Convenio Marco</h4>
                      <p className="text-[10px] text-slate-500 font-bold leading-normal">
                        Se vincula un Convenio Marco de prácticas profesionalizantes virtuales firmado entre la escuela y la organización.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                      <div className="bg-rtBlue/10 text-rtBlue font-black text-xs w-6 h-6 rounded-full flex items-center justify-center">3</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Carga en 2 Clics</h4>
                      <p className="text-[10px] text-slate-500 font-bold leading-normal">
                        Selecciona un área de dolor y carga el desafío usando plantillas estandarizadas prediseñadas por la escuela.
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                      <div className="bg-rtBlue/10 text-rtBlue font-black text-xs w-6 h-6 rounded-full flex items-center justify-center">4</div>
                      <h4 className="font-extrabold text-[11px] text-slate-800">Sello de Homologación</h4>
                      <p className="text-[10px] text-slate-500 font-bold leading-normal">
                        El docente coordinador verifica la propuesta y otorga el sello de "Validada" para publicar y recibir alumnos.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* INTEGRATION OF SCALABILITY TARGETS DIRECTLY INSIDE ABOUT SECTION */}
            <div className="border-t-2 border-slate-100 pt-8 space-y-6">
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <h3 className="text-2xl font-black text-rtDark">📍 Escalabilidad y Expansión Nacional</h3>
                <p className="text-xs font-bold text-slate-500">
                  Radar T es una solución modular paramétrica aplicada a municipios en transición productiva de la Argentina. Hacé clic en una localidad para conocer el sector prioritario del piloto:
                </p>
              </div>

              {/* Side-by-side interactive map and details view */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                
                {/* Visual Interactive Map of Argentina (Col-span 5) */}
                <div className="md:col-span-5 bg-slate-900 border-2 border-slate-950 rounded-3xl p-4 flex flex-col justify-between relative overflow-hidden shadow-inner min-h-[420px]">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block animate-pulse text-rtTeal">Mapa de Expansión</span>
                    <span className="text-white font-black text-xs">Transición Productiva</span>
                  </div>

                  {/* Stylized Argentina Map Layout */}
                  <div className="relative w-full h-[320px] mx-auto mt-6 flex justify-center">
                    {/* SVG Silhouette representing Argentina */}
                    <svg viewBox="0 0 200 450" className="w-[140px] h-[320px] opacity-15 stroke-slate-700 fill-slate-800" strokeWidth="2">
                      <path d="M 60 40 L 90 20 L 110 30 L 130 50 L 120 70 L 140 100 L 160 140 L 120 180 L 110 210 L 90 240 L 80 270 L 70 300 L 60 340 L 50 380 L 70 410 L 80 430 L 72 440 L 60 420 L 50 400 L 40 360 L 50 320 L 60 280 L 70 240 L 80 200 L 85 160 L 70 120 L 55 90 Z" />
                      <path d="M 65 442 L 85 442 L 78 448 Z" />
                    </svg>

                    {/* Interactive glowing pins */}
                    {Object.entries(MAP_PIN_DETAILS).map(([key, details]) => {
                      const isSelected = selectedPin === key;
                      const isActive = details.badge === 'Piloto Activo';
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedPin(key as any)}
                          style={{ top: details.top, left: details.left }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                          title={details.title}
                        >
                          <span className={cn(
                            "absolute -inset-3 rounded-full opacity-60 animate-ping pointer-events-none",
                            isActive ? "bg-rtPink/40" : "bg-rtTeal/30"
                          )} />
                          <span className={cn(
                            "absolute -inset-1.5 rounded-full blur-sm",
                            isActive ? "bg-rtPink/50" : "bg-rtTeal/40"
                          )} />
                          <span className={cn(
                            "relative block w-3.5 h-3.5 rounded-full border-2 border-slate-900 transition-all",
                            isSelected 
                              ? (isActive ? "bg-rtPink scale-125 ring-4 ring-rtPink/20" : "bg-rtTeal scale-125 ring-4 ring-rtTeal/20")
                              : (isActive ? "bg-rtPink/90" : "bg-slate-400 hover:bg-rtTeal")
                          )} />
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 bg-slate-950 text-white text-[8px] font-black tracking-wider px-2 py-0.5 rounded border border-slate-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase z-20">
                            {details.title.split(",")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="text-center text-[8px] font-bold text-slate-500 pb-2 leading-none uppercase">
                    Hacé clic en los puntos interactivos del mapa
                  </div>
                </div>

                {/* Detail Panel of Selected Pin (Col-span 7) */}
                <div className="md:col-span-7 bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-sm flex flex-col justify-between min-h-[420px] relative">
                  <div className="absolute right-6 top-6 text-7xl opacity-5 pointer-events-none select-none">
                    {selectedPin === 'rada-tilly' ? "🐳" :
                     selectedPin === 'tdf' ? "❄️" :
                     selectedPin === 'neuquen' ? "🛢️" :
                     selectedPin === 'san-luis' ? "🌾" : "☀️"}
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <span className={cn(
                          "text-[8px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest block w-fit mb-1",
                          pinDetails.badge === 'Piloto Activo' ? "bg-rtPinkLight text-rtPink" : "bg-rtTealLight text-rtTeal"
                        )}>
                          {pinDetails.badge}
                        </span>
                        <h4 className="text-xl font-black text-rtDark leading-none">📍 {pinDetails.title}</h4>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Escuela del Piloto</span>
                        <p className="font-extrabold text-sm text-rtDark">{pinDetails.schoolName}</p>
                      </div>

                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Sector de Transición Industrial</span>
                        <p className="font-black text-xs text-rtPink">{pinDetails.sector}</p>
                      </div>

                      <div>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Descripción y Foco Local</span>
                        <p className="text-xs font-bold text-slate-500 leading-relaxed mt-1">
                          {pinDetails.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2 items-center justify-between text-xs">
                    <div className="flex gap-4 text-[10px]">
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider block text-[8px]">Escuelas</span>
                        <span className="font-black text-slate-800">{pinDetails.escuelas}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold uppercase tracking-wider block text-[8px]">Modalidad</span>
                        <span className="font-black text-slate-800">100% Digital</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveSection('login');
                        if (selectedPin === 'rada-tilly') {
                          fillLoginAndTrigger('valentina@ees736.edu.ar', 'radar123');
                        } else if (selectedPin === 'neuquen') {
                          fillLoginAndTrigger('lucas@ees736.edu.ar', 'radar123');
                        } else {
                          const state = getRadarState();
                          state.currentUser = null;
                          saveRadarState(state);
                          router.push('/estudiante');
                        }
                      }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-black py-2.5 px-4 rounded-xl text-[10px] btn-3d shadow-[0_3px_0_#1e293b] flex items-center gap-1.5 cursor-pointer"
                    >
                      Probar Demo de este Municipio →
                    </button>
                  </div>

                </div>

              </div>

              {/* Info Box */}
              <div className="bg-rtBlueLight border-2 border-rtBlue rounded-3xl p-5 space-y-2 text-xs">
                <h4 className="font-black text-rtBlue flex items-center gap-2">
                  <Globe className="h-4 w-4 animate-spin-slow" /> ¿Cómo se adapta a otra localidad?
                </h4>
                <p className="font-bold text-slate-700 leading-relaxed">
                  Radar T es una plataforma paramétrica. Cada municipio define sus <strong>Ejes Productivos Locales</strong> y asocia colegios secundarios. Los desafíos siguen una metodología homologable sobre prácticas profesionalizantes.
                </p>
              </div>
            </div>

            {/* Quick Access buttons */}
            <div className="bg-slate-100/50 border-2 border-slate-900 rounded-3xl p-6 text-center space-y-4 border-b-[6px]">
              <h3 className="text-lg font-black text-slate-800">Probá la demo interactiva según tu perfil:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  onClick={() => selectRoleFromAbout('estudiante')}
                  className="bg-white border-2 border-rtGreen text-rtGreen font-black py-3 px-4 rounded-2xl btn-3d shadow-[0_4px_0_#2b7326] text-sm hover:scale-102 transition-transform"
                >
                  Unirse como Estudiante 🎒
                </button>
                <button 
                  onClick={() => selectRoleFromAbout('empresa')}
                  className="bg-white border-2 border-rtBlue text-rtBlue font-black py-3 px-4 rounded-2xl btn-3d shadow-[0_4px_0_#0f5b82] text-sm hover:scale-102 transition-transform"
                >
                  Registrar Organización 🏢
                </button>
                <button 
                  onClick={() => selectRoleFromAbout('docente')}
                  className="bg-white border-2 border-rtPurple text-rtPurple font-black py-3 px-4 rounded-2xl btn-3d shadow-[0_4px_0_#623475] text-sm hover:scale-102 transition-transform"
                >
                  Acceso Docentes 🏫
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: AUTHENTICATION (LOGIN & MULTI-ROLE REGISTER) */}
        {activeSection === 'login' && (
          <div className="w-full max-w-md bg-white border-2 border-slate-900 rounded-3xl p-6 shadow-xl space-y-6 animate-fade-in border-b-[8px]">
            {/* Main Tabs */}
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => { setAuthTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
                className={cn(
                  "flex-1 pb-3 text-center font-black text-sm transition-all border-b-4",
                  authTab === 'login' ? "border-rtPink text-rtPink" : "border-transparent text-slate-400 hover:text-slate-650"
                )}
              >
                Iniciar Sesión
              </button>
              <button 
                onClick={() => { setAuthTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
                className={cn(
                  "flex-1 pb-3 text-center font-black text-sm transition-all border-b-4",
                  authTab === 'register' ? "border-rtPink text-rtPink" : "border-transparent text-slate-400 hover:text-slate-650"
                )}
              >
                Crear Cuenta
              </button>
            </div>

            {/* Error and Success Alert Banners */}
            {errorMsg && (
              <div className="bg-red-50 text-red-650 px-4 py-3 rounded-xl text-xs font-black border border-red-200">
                ⚠️ {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="bg-green-50 text-green-650 px-4 py-3 rounded-xl text-xs font-black border border-green-200">
                ✨ {successMsg}
              </div>
            )}

            {/* TAB: LOGIN */}
            {authTab === 'login' && (
              <div className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">Correo electrónico</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      placeholder="correo@ejemplo.com" 
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-rtPink focus:ring-4 focus:ring-rtPink/10 transition-all"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-extrabold text-slate-700">Contraseña</label>
                    </div>
                    <div className="relative">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        placeholder="••••••••" 
                        className="w-full border-2 border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold focus:outline-none focus:border-rtPink focus:ring-4 focus:ring-rtPink/10 transition-all"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-650"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-rtPink text-white font-black py-3.5 rounded-2xl btn-3d shadow-[0_4px_0_#9a0050] hover:bg-rtPink/90 text-sm transition-transform"
                  >
                    Ingresar →
                  </button>
                </form>

                {/* DEMO SHORTCUTS */}
                <div className="border-t-2 border-dashed border-slate-100 pt-5 space-y-3">
                  <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-wider">Accesos Rápidos para Demo</p>
                  <div className="grid grid-cols-1 gap-2">
                    <button 
                      onClick={() => fillLoginAndTrigger('valentina@ees736.edu.ar', 'radar123')}
                      className="flex items-center justify-between bg-rtGreenLight border border-rtGreen/20 text-rtGreen font-black px-4 py-2.5 rounded-xl text-xs hover:bg-rtGreen/10 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2"><User className="h-3.5 w-3.5" /> Estudiante (Valentina)</span>
                      <span className="text-[10px] font-bold text-slate-500">4°B</span>
                    </button>
                    <button 
                      onClick={() => fillLoginAndTrigger('empresa@avistajepatagonia.com', 'radar123')}
                      className="flex items-center justify-between bg-rtBlueLight border border-rtBlue/20 text-rtBlue font-black px-4 py-2.5 rounded-xl text-xs hover:bg-rtBlue/10 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" /> Organización (Avistaje Pat.)</span>
                      <span className="text-[10px] font-bold text-slate-500">Admin</span>
                    </button>
                    <button 
                      onClick={() => fillLoginAndTrigger('docente@ees736.edu.ar', 'radar123')}
                      className="flex items-center justify-between bg-rtPurpleLight border border-rtPurple/20 text-rtPurple font-black px-4 py-2.5 rounded-xl text-xs hover:bg-rtPurple/10 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2"><School className="h-3.5 w-3.5" /> Docente (Prof. Laura M.)</span>
                      <span className="text-[10px] font-bold text-slate-500">4°B & 5°A</span>
                    </button>
                  </div>
                  <div className="text-center pt-2">
                    <button 
                      onClick={() => {
                        const state = getRadarState();
                        state.currentUser = null;
                        saveRadarState(state);
                        router.push('/estudiante');
                      }} 
                      className="text-xs text-rtPink font-bold hover:underline bg-transparent border-none cursor-pointer"
                    >
                      ¿No tenés cuenta? Creá una cuenta de invitado
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REGISTER (MULTI-ROLE) */}
            {authTab === 'register' && (
              <div className="space-y-5">
                {/* Role selection badges */}
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    type="button"
                    onClick={() => { setRegisterRole('estudiante'); setErrorMsg(''); setSuccessMsg(''); }}
                    className={cn(
                      "py-2 px-1 text-center text-[10px] font-black rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1",
                      registerRole === 'estudiante' 
                        ? "border-rtGreen bg-rtGreenLight text-rtGreen scale-102" 
                        : "border-slate-100 text-slate-400 hover:border-slate-300"
                    )}
                  >
                    <span className="text-lg">🎒</span>
                    <span>Estudiante</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setRegisterRole('organizacion'); setErrorMsg(''); setSuccessMsg(''); }}
                    className={cn(
                      "py-2 px-1 text-center text-[10px] font-black rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1",
                      registerRole === 'organizacion' 
                        ? "border-rtBlue bg-rtBlueLight text-rtBlue scale-102" 
                        : "border-slate-100 text-slate-400 hover:border-slate-300"
                    )}
                  >
                    <span className="text-lg">🏢</span>
                    <span>Organización</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setRegisterRole('escuela'); setErrorMsg(''); setSuccessMsg(''); }}
                    className={cn(
                      "py-2 px-1 text-center text-[10px] font-black rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1",
                      registerRole === 'escuela' 
                        ? "border-rtPurple bg-rtPurpleLight text-rtPurple scale-102" 
                        : "border-slate-100 text-slate-400 hover:border-slate-300"
                    )}
                  >
                    <span className="text-lg">🏫</span>
                    <span>Escuela / Doc.</span>
                  </button>
                </div>

                {/* ROLE SUB-FORMS */}
                {registerRole === 'estudiante' && (
                  <div className="space-y-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider">El camino en Radar T:</h4>
                      <ul className="space-y-2 text-xs font-bold text-slate-600">
                        <li className="flex gap-2 items-start">
                          <span className="text-rtGreen font-black">1.</span>
                          <span>Hacés un Test Vocacional interactivo para obtener tu perfil sugerido.</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className="text-rtGreen font-black">2.</span>
                          <span>Descargás tu DDJJ parental y la subís firmada en la plataforma.</span>
                        </li>
                        <li className="flex gap-2 items-start">
                          <span className="text-rtGreen font-black">3.</span>
                          <span>Tu docente valida la DDJJ para que tus misiones queden activas oficialmente.</span>
                        </li>
                      </ul>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer text-[10px] font-bold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <input 
                        type="checkbox"
                        checked={studentTermsChecked}
                        onChange={(e) => setStudentTermsChecked(e.target.checked)}
                        className="rounded text-rtGreen focus:ring-rtGreen h-4 w-4 shrink-0 mt-0.5"
                      />
                      <span>
                        Acepto los <button type="button" onClick={(e) => { e.preventDefault(); setIsLegalOpen(true); }} className="text-rtPink font-bold hover:underline bg-transparent border-none">Términos y Condiciones</button> y declaro estar cursando el último año del colegio secundario.
                      </span>
                    </label>

                    <button 
                      type="button" 
                      onClick={handleRegister}
                      className="w-full bg-rtGreen text-white font-black py-3.5 rounded-2xl btn-3d shadow-[0_4px_0_#2b7326] hover:bg-rtGreen/90 text-xs transition-transform flex items-center justify-center gap-1.5"
                    >
                      Comenzar Registro de Estudiante 🎒 →
                    </button>
                  </div>
                )}

                {registerRole === 'organizacion' && (
                  <form onSubmit={handleRegister} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">Nombre de la Organización</label>
                      <input 
                        type="text" 
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        required 
                        placeholder="Ej: Avistajes del Golfo" 
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtBlue"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">CUIT Organizacional</label>
                      <input 
                        type="text" 
                        value={orgCuit}
                        onChange={(e) => setOrgCuit(e.target.value)}
                        required 
                        placeholder="Ej: 30-12345678-9" 
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtBlue"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">Rubro / Sector Industrial</label>
                      <select
                        value={orgRubro}
                        onChange={(e) => setOrgRubro(e.target.value)}
                        className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtBlue"
                      >
                        <option value="Ecoturismo">Ecoturismo y Conservación</option>
                        <option value="Atención al Turista">Atención al Turista</option>
                        <option value="Logística">Logística / Distribución</option>
                        <option value="Marketing Digital">Marketing Digital</option>
                        <option value="Conservación Ambiental">Conservación Ambiental</option>
                        <option value="Tecnología e Información">Tecnología e Información</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">Correo electrónico institucional</label>
                      <input 
                        type="email" 
                        value={orgEmail}
                        onChange={(e) => setOrgEmail(e.target.value)}
                        required 
                        placeholder="contacto@organizacion.org" 
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtBlue"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">Contraseña</label>
                      <input 
                        type="password" 
                        value={orgPassword}
                        onChange={(e) => setOrgPassword(e.target.value)}
                        required 
                        placeholder="••••••••" 
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtBlue"
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer text-[9px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-250">
                      <input 
                        type="checkbox"
                        checked={orgConvenioChecked}
                        onChange={(e) => setOrgConvenioChecked(e.target.checked)}
                        className="rounded text-rtBlue focus:ring-rtBlue h-4 w-4 shrink-0 mt-0.5"
                      />
                      <span>
                        Declaro que nos incorporamos bajo la firma de un <strong>Convenio Marco de Prácticas Profesionalizantes</strong> con la autoridad escolar regional.
                      </span>
                    </label>

                    <button 
                      type="submit" 
                      className="w-full bg-rtBlue text-white font-black py-3.5 rounded-2xl btn-3d shadow-[0_4px_0_#0f5b82] hover:bg-rtBlue/90 text-xs transition-transform"
                    >
                      Registrar Organización 🏢
                    </button>
                  </form>
                )}

                {registerRole === 'escuela' && (
                  <form onSubmit={handleRegister} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">Establecimiento Educativo</label>
                      <input 
                        type="text" 
                        value={schoolNameInput}
                        onChange={(e) => setSchoolNameInput(e.target.value)}
                        required 
                        placeholder="Ej: E.E.S. N° 736 Rada Tilly" 
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtPurple"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">Nombre Docente Coordinador</label>
                      <input 
                        type="text" 
                        value={teacherNameInput}
                        onChange={(e) => setTeacherNameInput(e.target.value)}
                        required 
                        placeholder="Ej: Prof. Laura Martínez" 
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtPurple"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">Materia / Práctica</label>
                      <input 
                        type="text" 
                        value={teacherMateria}
                        onChange={(e) => setTeacherMateria(e.target.value)}
                        required 
                        placeholder="Ej: Economía / Prácticas Prof." 
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtPurple"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">Cursos a Cargo</label>
                        <input 
                          type="text" 
                          value={teacherCursos}
                          onChange={(e) => setTeacherCursos(e.target.value)}
                          required 
                          placeholder="Ej: 4°B, 5°A" 
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtPurple"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">Contraseña</label>
                        <input 
                          type="password" 
                          value={teacherPasswordInput}
                          onChange={(e) => setTeacherPasswordInput(e.target.value)}
                          required 
                          placeholder="••••••••" 
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtPurple"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-450 mb-0.5 uppercase tracking-wide">Correo institucional docente</label>
                      <input 
                        type="email" 
                        value={teacherEmailInput}
                        onChange={(e) => setTeacherEmailInput(e.target.value)}
                        required 
                        placeholder="laura.martinez@escuela.edu.ar" 
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:border-rtPurple"
                      />
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer text-[9px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-250">
                      <input 
                        type="checkbox"
                        checked={schoolConvenioChecked}
                        onChange={(e) => setSchoolConvenioChecked(e.target.checked)}
                        className="rounded text-rtPurple focus:ring-rtPurple h-4 w-4 shrink-0 mt-0.5"
                      />
                      <span>
                        Confirmo que el establecimiento avala mi función coordinadora para la vinculación digital y validación del Convenio Marco.
                      </span>
                    </label>

                    <button 
                      type="submit" 
                      className="w-full bg-rtPurple text-white font-black py-3.5 rounded-2xl btn-3d shadow-[0_4px_0_#623475] hover:bg-rtPurple/90 text-xs transition-transform"
                    >
                      Registrar Escuela y Docente 🏫
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-rtDark text-white px-6 py-6 border-t-4 border-rtPink flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <p className="text-xs font-bold text-slate-400">
          © 2026 Radar T - Conexión Cívica & Educación. Desarrollado con ❤️ para Rada Tilly, Chubut.
        </p>
        <div className="flex gap-4 text-xs font-bold text-slate-400">
          <button 
            onClick={() => setIsLegalOpen(true)}
            className="hover:text-white transition-colors bg-transparent border-none cursor-pointer"
          >
            Términos y Condiciones
          </button>
          <span>·</span>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
        </div>
      </footer>

      {/* Legal Modal Render */}
      <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />
    </div>
  );
}
