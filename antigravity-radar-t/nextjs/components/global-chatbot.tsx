"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ASISTENTE_FLUJOS } from "@/lib/store";

export default function GlobalChatbot() {
  const router = useRouter();
  const pathname = usePathname();
  const [asistenteOpen, setAsistenteOpen] = useState(false);
  const [asistenteCurrentKey, setAsistenteCurrentKey] = useState("bienvenida");
  const [asistenteHistory, setAsistenteHistory] = useState<{ sender: "radar" | "user"; text: string }[]>([
    { sender: "radar", text: ASISTENTE_FLUJOS.bienvenida.mensaje }
  ]);

  // Reset chat if pathname changes
  useEffect(() => {
    resetAsistente();
    setAsistenteOpen(false);
  }, [pathname]);

  const handleAsistenteOption = (text: string, siguienteKey: string) => {
    // Add user message
    const updatedHistory = [...asistenteHistory, { sender: "user" as const, text }];

    // Handle special actions/routing
    if (siguienteKey === "buscar_mision") {
      setTimeout(() => {
        router.push("/desafios");
      }, 1500);
    }

    // Fetch next assistant block
    const flow = ASISTENTE_FLUJOS[siguienteKey] || ASISTENTE_FLUJOS.bienvenida;

    setAsistenteHistory([...updatedHistory, { sender: "radar" as const, text: flow.mensaje }]);
    setAsistenteCurrentKey(siguienteKey);
  };

  const resetAsistente = () => {
    setAsistenteHistory([
      { sender: "radar", text: ASISTENTE_FLUJOS.bienvenida.mensaje }
    ]);
    setAsistenteCurrentKey("bienvenida");
  };

  return (
    <div className="fixed bottom-6 right-4 z-50">
      
      {/* Chatbot Bubble Button */}
      <button
        onClick={() => {
          setAsistenteOpen(!asistenteOpen);
          if (!asistenteOpen) resetAsistente();
        }}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-3xl shadow-2xl cursor-pointer hover:scale-105 transition-all btn-3d",
          asistenteOpen 
            ? "bg-slate-900 border-2 border-slate-700 shadow-slate-900/40 text-white" 
            : "bg-rtTeal border-2 border-slate-900 shadow-rtTeal/40 text-white"
        )}
      >
        {asistenteOpen ? <X className="w-6 h-6" /> : "🤖"}
      </button>

      {/* Chat Dialog Panel */}
      {asistenteOpen && (
        <div className="absolute right-0 bottom-16 w-72 bg-white border-2 border-slate-900 rounded-3xl shadow-2xl p-4 flex flex-col gap-3 animate-slide-up max-h-[365px] overflow-hidden">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-xl">🤖</span>
              <div>
                <h4 className="text-xs font-black text-slate-800">Asistente Rádar</h4>
                <p className="text-[8px] text-rtTeal font-black uppercase tracking-wider leading-none">Piloto 2026</p>
              </div>
            </div>
            <button 
              onClick={resetAsistente}
              className="text-[9px] font-black text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
              title="Reiniciar chat"
            >
              <Undo2 className="w-3 h-3" /> Reiniciar
            </button>
          </div>

          {/* Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-2 max-h-[180px] p-1 pr-2 no-scrollbar bg-slate-50/50 rounded-xl border border-slate-100">
            {asistenteHistory.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-2.5 rounded-2xl text-[10px] font-bold leading-normal max-w-[85%] border",
                  item.sender === "radar" 
                    ? "bg-rtTealLight border-rtTeal/20 text-rtTeal font-bold mr-auto rounded-tl-none" 
                    : "bg-white border-slate-200 text-slate-800 ml-auto rounded-tr-none"
                )}
              >
                {item.text}
              </div>
            ))}
          </div>

          {/* Action Options */}
          <div className="space-y-1 mt-1 border-t border-slate-150 pt-2 shrink-0 max-h-[120px] overflow-y-auto pr-1 no-scrollbar">
            {ASISTENTE_FLUJOS[asistenteCurrentKey]?.opciones.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAsistenteOption(opt.texto, opt.siguiente)}
                className="w-full text-left bg-white border border-slate-200 hover:border-rtTeal hover:bg-rtTealLight/40 px-3 py-1.5 rounded-xl font-bold text-[9px] text-slate-700 transition-all cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis block"
              >
                {opt.texto}
              </button>
            ))}
            {asistenteCurrentKey !== "soporte_tecnico" && !asistenteCurrentKey.startsWith("crear_ticket") && (
              <button
                onClick={() => handleAsistenteOption("🛠️ Soporte Técnico", "soporte_tecnico")}
                className="w-full text-left bg-slate-50 border border-slate-200 hover:border-rtPink hover:bg-rtPinkLight/30 px-3 py-1.5 rounded-xl font-black text-[9px] text-slate-700 transition-all cursor-pointer flex items-center justify-between"
              >
                <span>🛠️ Reportar Incidencia (Crear Ticket)</span>
              </button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
