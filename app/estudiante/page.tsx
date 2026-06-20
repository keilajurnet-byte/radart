"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Star,
  Trophy,
  Flame,
  Clock,
  Building2,
  ChevronRight,
  Lock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { sampleChallenges, sampleStudent, leaderboard, categories, type Challenge } from "@/lib/store";

export default function EstudiantePage() {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [appliedChallenges, setAppliedChallenges] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const student = sampleStudent;

  const openChallenges = sampleChallenges.filter((c) => c.status === "Abierto");

  const [storedXp, setStoredXp] = useState(0);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const ids = localStorage.getItem('radar_misiones_aceptadas');
      setAppliedChallenges(ids ? JSON.parse(ids) : []);
      const xp = parseInt(localStorage.getItem('radar_xp') || '0', 10) || 0;
      setStoredXp(xp);
    } catch (e) {
      // ignore
    }
  }, []);

  const totalXp = student.xp + storedXp;
  const xpProgress = (totalXp / student.xpToNextLevel) * 100;

  const handleApply = (challengeId: string) => {
    const next = Array.from(new Set([...(appliedChallenges || []), challengeId]));
    setAppliedChallenges(next);
    try {
      localStorage.setItem('radar_misiones_aceptadas', JSON.stringify(next));
      const currentXp = parseInt(localStorage.getItem('radar_xp') || '0', 10) || 0;
      const ch = sampleChallenges.find(c => c.id === challengeId);
      const add = ch ? ch.xpReward : 0;
      localStorage.setItem('radar_xp', String(currentXp + add));
      setStoredXp(currentXp + add);
    } catch (e) {
      console.error(e);
    }
    setSelectedChallenge(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Facil": return "bg-green-500/20 text-green-600";
      case "Medio": return "bg-yellow-500/20 text-yellow-600";
      case "Dificil": return "bg-red-500/20 text-red-600";
      default: return "bg-primary/20 text-primary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pb-24">
      <Navigation />
      
      <main className="px-4 py-6">
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed left-4 right-4 top-20 z-50 flex items-center justify-center gap-2 rounded-2xl bg-green-500 p-4 text-white shadow-xl md:left-auto md:right-4 md:w-auto">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold">Mision aceptada! +50 XP de bonus</span>
          </div>
        )}

        {/* Profile Header Card */}
        <div className="mx-auto max-w-lg">
          <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-accent p-5 text-white shadow-xl">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl backdrop-blur-sm">
                {student.avatar}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black">Hola, {student.name}!</h1>
                  <div className="rounded-lg bg-white/20 px-2 py-0.5 text-xs font-bold">
                    Nv.{student.level}
                  </div>
                </div>
                
                {/* XP Bar */}
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3" /> {student.xp} XP
                    </span>
                    <span>{student.xpToNextLevel} XP</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/20">
                    <div 
                      className="h-full rounded-full bg-secondary transition-all duration-500"
                      style={{ width: `${xpProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white/10 p-2.5 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1">
                  <Flame className="h-4 w-4 text-orange-300" />
                  <span className="text-lg font-black">{student.streak}</span>
                </div>
                <p className="text-[10px] opacity-80">Dias racha</p>
              </div>
              <div className="rounded-xl bg-white/10 p-2.5 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-300" />
                  <span className="text-lg font-black">{student.completedChallenges}</span>
                </div>
                <p className="text-[10px] opacity-80">Completadas</p>
              </div>
              <div className="rounded-xl bg-white/10 p-2.5 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="text-lg font-black">{student.badges.filter(b => b.earned).length}</span>
                </div>
                <p className="text-[10px] opacity-80">Insignias</p>
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="mb-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
              <Star className="h-5 w-5 text-secondary" />
              Mis Insignias
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {student.badges.map((badge) => (
                <div
                  key={badge.id}
                  className={cn(
                    "flex flex-col items-center rounded-2xl p-3 text-center transition-all",
                    badge.earned 
                      ? "bg-gradient-to-br from-secondary/20 to-primary/10 shadow-md" 
                      : "bg-muted/50 opacity-50"
                  )}
                >
                  <div className={cn(
                    "mb-1 flex h-10 w-10 items-center justify-center rounded-xl text-xl",
                    badge.earned ? "bg-white shadow-sm" : "bg-muted"
                  )}>
                    {badge.earned ? badge.icon : <Lock className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <span className="text-[10px] font-semibold leading-tight">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mini Leaderboard */}
          <div className="mb-6 rounded-2xl bg-card p-4 shadow-lg">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Top Jugadores
            </h2>
            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((player, i) => (
                <div
                  key={player.rank}
                  className={cn(
                    "flex items-center gap-3 rounded-xl p-2.5 transition-all",
                    player.name === "Lucia F." ? "bg-primary/10 ring-2 ring-primary/30" : "bg-muted/30"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black",
                    i === 0 ? "bg-yellow-500 text-white" :
                    i === 1 ? "bg-gray-400 text-white" :
                    i === 2 ? "bg-amber-600 text-white" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {player.rank}
                  </div>
                  <span className="text-lg">{player.avatar}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{player.name}</p>
                    <p className="text-xs text-muted-foreground">Nv.{player.level}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-bold text-primary">
                    <Zap className="h-3.5 w-3.5" />
                    {player.xp}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Available Missions */}
          <div>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">
              <Sparkles className="h-5 w-5 text-primary" />
              Misiones Disponibles
            </h2>
            <div className="space-y-3">
              {openChallenges.map((challenge) => {
                const hasApplied = (appliedChallenges || []).includes(challenge.id);
                const categoryData = categories.find(c => c.name === challenge.category);
                
                return (
                  <button
                    key={challenge.id}
                    onClick={() => !hasApplied && setSelectedChallenge(challenge)}
                    disabled={hasApplied}
                    className={cn(
                      "w-full rounded-2xl bg-card p-4 text-left shadow-lg transition-all",
                      hasApplied 
                        ? "opacity-60" 
                        : "active:scale-[0.98] hover:shadow-xl"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl text-2xl",
                        `bg-gradient-to-br ${categoryData?.color || "from-primary to-accent"}`
                      )}>
                        {categoryData?.emoji || ""}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold",
                            getDifficultyColor(challenge.difficulty)
                          )}>
                            {challenge.difficulty}
                          </span>
                          <span className="flex items-center gap-0.5 text-xs font-bold text-primary">
                            <Zap className="h-3 w-3" />+{challenge.xpReward} XP
                          </span>
                        </div>
                        
                        <h3 className="mb-1 truncate font-bold text-foreground">
                          {challenge.title}
                        </h3>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Building2 className="h-3 w-3" />
                          <span className="truncate">{challenge.companyName}</span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="h-3 w-3" />
                            {challenge.duration}
                          </span>
                        </div>
                      </div>
                      
                      <ChevronRight className={cn(
                        "h-5 w-5 shrink-0",
                        hasApplied ? "text-green-500" : "text-muted-foreground"
                      )} />
                    </div>
                    
                    {hasApplied && (
                      <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-green-500/10 py-2 text-sm font-bold text-green-600">
                        <Sparkles className="h-4 w-4" />
                        Aplicacion enviada
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Misiones tomadas */}
            {appliedChallenges && appliedChallenges.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-3 text-lg font-bold">Mis misiones</h3>
                <div className="space-y-2">
                  {appliedChallenges.map(id => {
                    const c = sampleChallenges.find(x => x.id === id);
                    if (!c) return null;
                    return (
                      <div key={id} className="rounded-xl bg-card p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-sm">{c.title}</p>
                            <p className="text-xs text-muted-foreground">{c.companyName}</p>
                          </div>
                          <div className="text-xs font-bold text-primary">+{c.xpReward} XP</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mission Detail Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/60 p-4 md:items-center">
          <div className="w-full max-w-lg overflow-hidden rounded-t-3xl bg-card shadow-2xl md:rounded-3xl">
            {/* Header with gradient */}
            <div className={cn(
              "p-6 text-white",
              `bg-gradient-to-br ${categories.find(c => c.name === selectedChallenge.category)?.color || "from-primary to-accent"}`
            )}>
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-bold">
                  {selectedChallenge.category}
                </span>
                <button 
                  onClick={() => setSelectedChallenge(null)}
                  className="rounded-full bg-white/20 p-2"
                >
                  <span className="text-xl">X</span>
                </button>
              </div>
              <h2 className="text-xl font-black">{selectedChallenge.title}</h2>
              <p className="mt-1 text-sm opacity-90">{selectedChallenge.companyName}</p>
            </div>
            
            <div className="p-6">
              {/* Rewards */}
              <div className="mb-4 flex items-center justify-around rounded-2xl bg-muted/50 p-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-black text-primary">
                    <Zap className="h-5 w-5" />
                    +{selectedChallenge.xpReward}
                  </div>
                  <p className="text-xs text-muted-foreground">XP</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-xl font-black">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    {selectedChallenge.duration}
                  </div>
                  <p className="text-xs text-muted-foreground">Duracion</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div className="text-center">
                  <span className={cn(
                    "rounded-full px-3 py-1 text-sm font-bold",
                    getDifficultyColor(selectedChallenge.difficulty)
                  )}>
                    {selectedChallenge.difficulty}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">Dificultad</p>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {selectedChallenge.description}
              </p>

              <Button
                className="h-14 w-full gap-2 rounded-2xl bg-gradient-to-r from-primary to-accent text-lg font-bold shadow-xl"
                onClick={() => handleApply(selectedChallenge.id)}
              >
                <Sparkles className="h-5 w-5" />
                Aceptar Mision
              </Button>
              
              <button
                onClick={() => setSelectedChallenge(null)}
                className="mt-3 w-full py-2 text-sm font-medium text-muted-foreground"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
