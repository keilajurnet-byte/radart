"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowLeft, Clock, Zap, CheckCircle } from "lucide-react";
import { sampleChallenges, categories } from "@/lib/store";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ChallengeDetailPage({ params }: PageProps) {
  const challenge = sampleChallenges.find((item) => item.id === params.id);
  const [accepted, setAccepted] = useState(false);

  if (!challenge) {
    notFound();
  }

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const stored = localStorage.getItem('radar_misiones_aceptadas');
      const ids = stored ? JSON.parse(stored) : [];
      if (challenge && ids.includes(challenge.id)) setAccepted(true);
    } catch (e) {
      // ignore
    }
  }, [challenge]);

  const acceptMission = () => {
    if (!challenge) return;
    try {
      const stored = localStorage.getItem('radar_misiones_aceptadas');
      const ids = stored ? JSON.parse(stored) : [];
      if (!ids.includes(challenge.id)) {
        ids.push(challenge.id);
        localStorage.setItem('radar_misiones_aceptadas', JSON.stringify(ids));
        const currentXp = parseInt(localStorage.getItem('radar_xp') || '0', 10) || 0;
        localStorage.setItem('radar_xp', String(currentXp + (challenge.xpReward || 0)));
        setAccepted(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const category = categories.find((c) => c.name === challenge?.category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pb-24">
      <Navigation />

      <main className="px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex items-center justify-between gap-3 rounded-3xl bg-card p-4 shadow-lg">
            <Link href="/desafios" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
              <ArrowLeft className="h-4 w-4" /> Volver a misiones
            </Link>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
              {challenge.gradeLevel}
            </span>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-6 text-white shadow-xl">
            <div className="flex flex-wrap items-start gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/20 text-3xl">{category?.emoji}</div>
              <div className="min-w-0 flex-1">
                <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white/90">
                  {challenge.category}
                </span>
                <h1 className="mt-4 text-3xl font-black leading-tight">{challenge.title}</h1>
                <p className="mt-2 text-sm text-white/80">{challenge.companyName}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-4 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">XP</p>
                <p className="mt-2 text-2xl font-black">+{challenge.xpReward}</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Duración</p>
                <p className="mt-2 text-2xl font-black"><Clock className="inline h-5 w-5 align-middle" /> {challenge.duration}</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 text-center">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Dificultad</p>
                <p className="mt-2 text-2xl font-black">{challenge.difficulty}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-card p-6 shadow-lg">
            <h2 className="text-xl font-bold">Descripción de la misión</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{challenge.description}</p>
          </div>

          <div className="rounded-3xl bg-card p-6 shadow-lg">
            <h2 className="text-xl font-bold">Pasos rápidos</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">1.</span>
                <span>Lee la misión y verificá que tu año escolar coincide con la recomendación.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">2.</span>
                <span>Hacé click en aceptar misión y contá con un mensaje de confirmación.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">3.</span>
                <span>Visitá “Misiones” para ver otras oportunidades y subir tu XP.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Button
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-primary to-accent text-lg font-bold text-white"
              onClick={acceptMission}
              disabled={accepted}
            >
              {accepted ? <CheckCircle className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
              {accepted ? "Misión aceptada" : "Aceptar misión"}
            </Button>
            {accepted && (
              <div className="rounded-3xl border border-green-300 bg-green-50 p-4 text-sm text-green-700">
                ¡Genial! Tu misión quedó registrada localmente en la plataforma.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
