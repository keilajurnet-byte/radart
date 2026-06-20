"use client";

import { useState } from "react";
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingCarouselProps {
  role: "estudiante" | "empresa" | "docente";
  isOpen: boolean;
  onClose: () => void;
}

const ONBOARDING_DATA = {
  estudiante: [
    {
      emoji: "🎒",
      title: "¡Bienvenido a Radar T!",
      desc: "Tu puente digital hacia el mundo profesional. Conectamos tus intereses con desafíos digitales de organizaciones reales en Rada Tilly para validar tus prácticas profesionalizantes."
    },
    {
      emoji: "🤝",
      title: "Entrená Habilidades Blandas",
      desc: "Participá en ejercicios interactivos cortos de oratoria, resolución de conflictos o liderazgo. Respondé dilemas reales de trabajo, obtené feedback constructivo y ganá experiencia (XP)."
    },
    {
      emoji: "🎓",
      title: "Certificá y Conectá a LinkedIn",
      desc: "Completá desafíos cívicos y ganá certificados oficiales emitidos por tu escuela y las organizaciones participantes. Sincronizá tus logros directamente con LinkedIn para impulsar tu futuro laboral."
    }
  ],
  empresa: [
    {
      emoji: "🏢",
      title: "Desafíos de Impacto Local",
      desc: "Publicá problemas reales de tu organización en un formulario estructurado de 7 secciones. Obtené soluciones e ideas innovadoras desarrolladas por jóvenes entusiasmados."
    },
    {
      emoji: "🔍",
      title: "Radar de Talento Anónimo",
      desc: "Explorá perfiles estudiantiles filtrando por fortalezas, intereses y niveles de certificados. Postulá e invitá estudiantes a tus desafíos manteniendo protegida su identidad al 100%."
    },
    {
      emoji: "⚖️",
      title: "Convenios y Acreditación Válida",
      desc: "Una vez que firmás el Convenio Marco Escolar validado por el docente, podés comenzar a emitir certificados de Nivel 2 (Competencias Laborales) que acreditan el desarrollo local."
    }
  ],
  docente: [
    {
      emoji: "🏫",
      title: "Gestión Digital de Pasantías",
      desc: "Supervisá a todos los estudiantes de tus cursos asignados. Analizá estadísticas de perfiles vocacionales y distribución de intereses en tiempo real."
    },
    {
      emoji: "⏰",
      title: "Monitoreo y Alertas",
      desc: "Revisá las bitácoras de trabajo digital de los alumnos. El sistema te alertará automáticamente si un alumno está inactivo o solicita abandonar una misión para brindarle apoyo oportuno."
    },
    {
      emoji: "✍️",
      title: "Firma y Emisión Digital",
      desc: "Revisá las propuestas finales entregadas, verificalas con un clic y firmá digitalmente el Certificado Nivel 1 (Participación) con validez oficial ministerial."
    }
  ]
};

export default function OnboardingCarousel({ role, isOpen, onClose }: OnboardingCarouselProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const slides = ONBOARDING_DATA[role];

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < slides.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 animate-fade-in">
      <div className="w-full max-w-md bg-white border-4 border-slate-900 rounded-3xl p-6 shadow-2xl space-y-6 animate-scale-up relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-full p-2 border border-slate-200 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Carousel Content */}
        <div className="text-center space-y-4 py-4">
          <div className="text-6xl animate-bounce">{slides[currentStep].emoji}</div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{slides[currentStep].title}</h2>
          <p className="text-xs font-bold text-slate-500 leading-relaxed max-w-sm mx-auto">
            {slides[currentStep].desc}
          </p>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-1.5">
          {slides.map((_, idx) => (
            <span 
              key={idx}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                currentStep === idx ? "bg-rtPink w-6" : "bg-slate-200 w-2"
              )}
            />
          ))}
        </div>

        {/* Actions buttons */}
        <div className="flex gap-2 pt-2">
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="w-1/3 border-2 border-slate-200 text-slate-700 font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#e2e8f0] text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Atrás
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-1/3 border-2 border-slate-200 text-slate-400 font-black py-3 rounded-2xl text-xs cursor-pointer"
            >
              Omitir
            </button>
          )}
          
          <button
            onClick={handleNext}
            className="w-2/3 bg-rtDark text-white font-black py-3 rounded-2xl btn-3d shadow-[0_3px_0_#1e293b] text-xs flex items-center justify-center gap-1 cursor-pointer hover:bg-slate-800"
          >
            {currentStep === slides.length - 1 ? (
              <>¡Comenzar! <Check className="w-4 h-4" /></>
            ) : (
              <>Siguiente <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
