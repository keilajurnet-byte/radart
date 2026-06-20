"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft, Clock, Zap, CheckCircle, AlertTriangle } from "lucide-react";
import confetti from "canvas-confetti";
import { getRadarState, saveRadarState, categories, type Challenge } from "@/lib/store";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ChallengeDetailPage({ params }: PageProps) {
  const router = useRouter();
  const [radarState, setRadarState] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [accepted, setAccepted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Abandon state
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitReason, setExitReason] = useState("No tengo tiempo en este momento");

  useEffect(() => {
    const state = getRadarState();
    setRadarState(state);
    if (state.currentUser) {
      setCurrentUser(state.currentUser);
    }
  }, []);

  const challengesList = radarState?.challenges || [];
  const challenge = challengesList.find((item: Challenge) => String(item.id) === String(params.id));

  useEffect(() => {
    if (currentUser && challenge) {
      const inCursoIds = currentUser.misionesEnCurso || [];
      if (inCursoIds.includes(Number(challenge.id))) {
        setAccepted(true);
      }
    }
  }, [currentUser, challenge]);

  if (radarState && !challenge) {
    notFound();
  }

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const acceptMission = () => {
    if (!challenge || !currentUser || !radarState) return;
    
    const state = { ...radarState };
    const student = state.users.find((u: any) => u.email === currentUser.email);
    if (!student) return;

    if (!student.misionesEnCurso) student.misionesEnCurso = [];
    if (!student.misionesEnCurso.includes(Number(challenge.id))) {
      student.misionesEnCurso.push(Number(challenge.id));
      
      const chIdx = state.challenges.findIndex((c: any) => c.id === challenge.id);
      if (chIdx !== -1) {
        state.challenges[chIdx].status = "En curso";
        state.challenges[chIdx].studentName = student.nombre;
        state.challenges[chIdx].studentEmail = student.email;
      }

      student.xp = (student.xp || 0) + 25; // Take XP
      if (student.xp >= 600 && student.nivel === 1) {
        student.nivel = 2;
      }

      state.currentUser = student;
      saveRadarState(state);
      setRadarState(state);
      setCurrentUser(student);
      setAccepted(true);

      triggerToast("¡Misión Aceptada! +25 XP · Tu docente recibirá una notificación ⚡");
      confetti({ particleCount: 100, spread: 60 });
    }
  };

  const handleExitMission = () => {
    if (!challenge || !currentUser || !radarState) return;

    const state = { ...radarState };
    const student = state.users.find((u: any) => u.email === currentUser.email);
    if (!student) return;

    student.misionesEnCurso = (student.misionesEnCurso || []).filter(
      (id: number) => id !== Number(challenge.id)
    );

    const chIdx = state.challenges.findIndex((c: any) => c.id === challenge.id);
    if (chIdx !== -1) {
      state.challenges[chIdx].status = "Abierta";
      state.challenges[chIdx].studentName = undefined;
      state.challenges[chIdx].studentEmail = undefined;
    }

    state.currentUser = student;
    saveRadarState(state);
    setRadarState(state);
    setCurrentUser(student);
    setAccepted(false);
    setShowExitModal(false);

    if (exitReason === "Me sentí incómodo/a con algo") {
      triggerToast("Saliste de la misión.");
      alert("Gracias por contarnos. Tu docente coordinador va a estar en contacto con vos para acompañarte. Recordá que podés hablar con la escuela en cualquier momento.");
    } else {
      triggerToast("Misión liberada con éxito.");
    }
  };

  if (!challenge) return null;

  const category = categories.find((c) => c.name === challenge?.category);

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      <Navigation />

      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-2xl bg-slate-900 border border-slate-800 p-4 text-white shadow-2xl animate-fade-in text-sm font-black">
          <span>🎉</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <main className="px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-between gap-3 rounded-3xl bg-white border-2 border-slate-900 p-4 shadow-sm">
            <Link href="/desafios" className="inline-flex items-center gap-2 text-xs font-black text-rtPink hover:underline">
              <ArrowLeft className="h-4 w-4" /> Volver a misiones
            </Link>
            <span className="rounded-full bg-slate-150 px-3 py-1 text-xs font-black text-slate-650">
              {challenge.gradeLevel}
            </span>
          </div>

          {/* Banner Card */}
          <div className={cn(
            "rounded-3xl p-6 text-white shadow-md border-2 border-slate-900 bg-gradient-to-br relative overflow-hidden",
            category?.color || "from-rtPink to-rtPurple"
          )}>
            <div className="absolute right-0 bottom-0 opacity-10 text-9xl pointer-events-none">📡</div>

            <div className="flex flex-wrap items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/20 text-3xl shrink-0">{category?.emoji}</div>
              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-white/95">
                  {challenge.category}
                </span>
                <h1 className="mt-4 text-2xl font-black leading-tight">{challenge.title}</h1>
                <p className="mt-2 text-xs font-bold text-white/80">{challenge.companyName}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-3 text-center border border-white/10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">XP</p>
                <p className="mt-1 text-xl font-black">+{challenge.xpReward}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3 text-center border border-white/10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">Duración</p>
                <p className="mt-1 text-base font-black truncate"><Clock className="inline h-4 w-4 mr-0.5" /> {challenge.duration}</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3 text-center border border-white/10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-black">Dificultad</p>
                <p className="mt-1 text-base font-black">{challenge.difficulty}</p>
              </div>
            </div>
          </div>

          {/* Enriched Sections Accordion */}
          <div className="space-y-3">
            {/* 1. El Problema */}
            <details open className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm">
              <summary className="font-black text-sm uppercase text-slate-800 cursor-pointer list-none flex justify-between items-center">
                <span>SECCIÓN 1: El Problema Local</span>
                <span className="text-rtPink font-bold">+</span>
              </summary>
              <p className="mt-3 text-xs font-bold text-slate-500 leading-relaxed">
                {challenge.problema || challenge.description}
              </p>
            </details>

            {/* 2. Resultado esperado */}
            <details className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm">
              <summary className="font-black text-sm uppercase text-slate-800 cursor-pointer list-none flex justify-between items-center">
                <span>SECCIÓN 2: Entrega Digital Solicitada</span>
                <span className="text-rtPink font-bold">+</span>
              </summary>
              <p className="mt-3 text-xs font-bold text-slate-500 leading-relaxed">
                {challenge.resultadoEsperado || "Un reporte digital estructurado subido a la plataforma."}
              </p>
            </details>

            {/* 3. Etapas */}
            {challenge.etapas && (
              <details className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm">
                <summary className="font-black text-sm uppercase text-slate-800 cursor-pointer list-none flex justify-between items-center">
                  <span>SECCIÓN 3: Etapas del Desafío</span>
                  <span className="text-rtPink font-bold">+</span>
                </summary>
                <div className="mt-3 space-y-2">
                  {challenge.etapas.map((et: any, idx: number) => (
                    <div key={idx} className="flex gap-3 text-xs font-bold text-slate-650 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-150">
                      <span className="w-5 h-5 rounded-full bg-rtPink/20 text-rtPink flex items-center justify-center font-black shrink-0">{idx+1}</span>
                      <span>{et.titulo} — {et.plazo}</span>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* 4. Modalidad */}
            <details className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm">
              <summary className="font-black text-sm uppercase text-slate-800 cursor-pointer list-none flex justify-between items-center">
                <span>SECCIÓN 4: Modalidad de Entrega</span>
                <span className="text-rtPink font-bold">+</span>
              </summary>
              <p className="mt-3 text-xs font-bold text-slate-500">
                📂 Formato: {challenge.modalidadEntrega || "Archivo PDF/Multimedia subido a la plataforma"}
              </p>
            </details>

            {/* 5. Criterios */}
            {challenge.criteriosEvaluacion && (
              <details className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm">
                <summary className="font-black text-sm uppercase text-slate-800 cursor-pointer list-none flex justify-between items-center">
                  <span>SECCIÓN 5: Criterios de Evaluación</span>
                  <span className="text-rtPink font-bold">+</span>
                </summary>
                <p className="mt-3 text-xs font-bold text-slate-500 leading-relaxed">
                  {challenge.criteriosEvaluacion}
                </p>
              </details>
            )}

            {/* 6. Recursos */}
            <details className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm">
              <summary className="font-black text-sm uppercase text-slate-800 cursor-pointer list-none flex justify-between items-center">
                <span>SECCIÓN 6: Recursos Proveídos</span>
                <span className="text-rtPink font-bold">+</span>
              </summary>
              <p className="mt-3 text-xs font-bold text-slate-500">
                {challenge.recursosCompartidos ? "✓ Acceso digital a bases de fotos, mapas e información oficial de la organización." : "El alumno trabajará con materiales abiertos recolectados en internet."}
              </p>
            </details>

            {/* 7. Privacidad */}
            <details className="bg-white border-2 border-slate-900 rounded-3xl p-5 shadow-sm">
              <summary className="font-black text-sm uppercase text-slate-800 cursor-pointer list-none flex justify-between items-center">
                <span>SECCIÓN 7: Privacidad y Medios</span>
                <span className="text-rtPink font-bold">+</span>
              </summary>
              <p className="mt-3 text-xs font-bold text-slate-500 leading-relaxed">
                Todo el intercambio ocurre dentro de la plataforma. Queda estrictamente prohibido el contacto por canales externos o de forma física por seguridad legal del menor.
              </p>
            </details>
          </div>

          {/* Action button */}
          {currentUser && currentUser.rol === "estudiante" && (
            <div className="space-y-3 pt-4">
              {accepted ? (
                <div className="space-y-3">
                  <div className="flex w-full items-center justify-center gap-2 rounded-3xl bg-rtGreenLight border-2 border-rtGreen p-4 text-xs font-black text-rtGreen">
                    <CheckCircle className="h-5 w-5" /> Misión en curso
                  </div>
                  <button
                    onClick={() => setShowExitModal(true)}
                    className="w-full text-slate-400 hover:text-red-500 font-extrabold text-xs py-1 text-center block"
                  >
                    Necesito salir de esta misión
                  </button>
                </div>
              ) : (
                <Button
                  className="flex w-full items-center justify-center gap-2 rounded-3xl bg-rtPink text-white py-4 font-black btn-3d shadow-[0_4px_0_#9a0050] text-sm"
                  onClick={acceptMission}
                  disabled={challenge.status !== "Abierta"}
                >
                  <Sparkles className="h-5 w-5" />
                  {challenge.status === "Abierta" ? "Tomar Misión" : "Misión ocupada"}
                </Button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* EXIT CHALLENGE MODAL */}
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
                onClick={() => setShowExitModal(false)}
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
    </div>
  );
}
