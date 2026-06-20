"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LegalModal({ isOpen, onClose }: LegalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 animate-fade-in">
      <div className="w-full max-w-2xl bg-white border-4 border-slate-900 rounded-3xl p-6 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto relative no-scrollbar">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-full p-2 border border-slate-200 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 pb-4 border-b-2 border-slate-100">
          <span className="text-3xl">⚖️</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Términos, Condiciones y Bases Legales</h2>
          <p className="text-xs font-bold text-rtPink uppercase tracking-widest leading-none">Radar T · Chubut Piloto 2026</p>
        </div>

        {/* Legal Body */}
        <div className="space-y-6 text-xs text-slate-650 leading-relaxed font-sans">
          
          {/* Section 0: Disclaimer */}
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 space-y-2">
            <h4 className="font-extrabold text-red-700 uppercase tracking-wider text-[10px]">⚠️ Descargo de Responsabilidad Importante</h4>
            <p className="text-red-750 font-bold">
              Radar T es únicamente una <strong>plataforma digital de intermediación cívico-educativa</strong>. No asume ninguna responsabilidad civil, comercial o laboral sobre las ofertas de desafíos de las organizaciones ni sobre las acciones de los estudiantes participantes. <strong>La participación en la plataforma no garantiza en ningún caso la obtención de un empleo</strong>, contrato o relación laboral efectiva; las actividades se circunscriben estrictamente bajo el marco de las Prácticas Profesionalizantes Educativas.
            </p>
          </div>

          {/* Section 1: Estudiantes */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-rtGreen pl-2">1. Perfil Estudiantes y Protección de Menores</h3>
            <p className="font-semibold text-slate-600">
              Dado que los estudiantes participantes tienen entre 15 y 17 años de edad, Radar T aplica estrictas normativas para la protección de menores en entornos virtuales:
            </p>
            <ul className="list-disc pl-4 space-y-1 font-bold text-slate-550">
              <li>
                <strong>Validación Parental Obligatoria:</strong> Para comenzar cualquier desafío, el estudiante debe descargar, firmar y cargar en la plataforma la Declaración Jurada (DDJJ) de autorización firmada por su tutor legal responsable, o contar con la validación de la autoridad escolar.
              </li>
              <li>
                <strong>Privacidad de Datos Sensibles:</strong> Toda la información de contacto personal, dirección física y número telefónico queda resguardada y nunca se expone a las organizaciones. Las postulaciones se gestionan de forma anónima hasta la validación formal del tutor escolar.
              </li>
            </ul>
          </div>

          {/* Section 2: Empresas */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-rtBlue pl-2">2. Perfil Organizaciones y Filtro de Verificación</h3>
            <p className="font-semibold text-slate-600">
              No se permite el libre registro o publicación de ofertas sin fiscalización institucional:
            </p>
            <ul className="list-disc pl-4 space-y-1 font-bold text-slate-550">
              <li>
                <strong>Filtro de Registro:</strong> Para registrarse como Organización Oferente, se requiere la presentación del CUIT, Razón Social e identificación del representante legal.
              </li>
              <li>
                <strong>Convenio Escolar Marco:</strong> El Docente Coordinador escolar debe verificar y firmar el Convenio Marco correspondiente de forma offline u online antes de que la organización reciba el sello de "Validada".
              </li>
              <li>
                Las publicaciones que no cumplan con el carácter formativo pedagógico o que vulneren derechos serán eliminadas inmediatamente.
              </li>
            </ul>
          </div>

          {/* Section 3: Docentes */}
          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-rtPurple pl-2">3. Perfil Instituciones y Docentes Coordinadores</h3>
            <p className="font-semibold text-slate-600">
              Los docentes autorizados por el Ministerio de Educación actúan como administradores y validadores de las prácticas:
            </p>
            <ul className="list-disc pl-4 space-y-1 font-bold text-slate-550">
              <li>
                Son responsables del seguimiento de las bitácoras digitales semanales de los estudiantes asignados a su curso.
              </li>
              <li>
                La aprobación pedagógica docente otorga la firma digital institucional al Certificado Nivel 1 (Participación).
              </li>
            </ul>
          </div>

          {/* Section 4: Uso Aceptable */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">4. Propiedad Intelectual y Uso Aceptable</h3>
            <p className="font-semibold text-slate-600">
              Las soluciones digitales, reportes, diseños e informes entregados por los estudiantes son de carácter público-cívico para beneficio de la comunidad local de Rada Tilly. Se prohíbe el uso comercial no autorizado de las propuestas escolares sin el previo consentimiento por escrito del alumno y la escuela.
            </p>
          </div>

        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-rtDark text-white font-black rounded-2xl btn-3d shadow-[0_4px_0_#1e293b] text-xs hover:bg-slate-800 transition-all cursor-pointer"
          >
            Entendido y Acepto las Bases
          </button>
        </div>

      </div>
    </div>
  );
}
