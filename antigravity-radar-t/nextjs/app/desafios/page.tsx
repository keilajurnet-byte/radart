"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Clock,
  Zap,
  Filter,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getRadarState,
  categories,
  gradeLevels,
  statuses,
  type ChallengeCategory,
  type ChallengeStatus,
  type GradeLevel,
  type Challenge,
} from "@/lib/store";

export default function DesafiosPage() {
  const [radarState, setRadarState] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ChallengeStatus | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const state = getRadarState();
    setRadarState(state);
    if (state.currentUser) {
      setCurrentUser(state.currentUser);
    }
  }, []);

  const challengesList = radarState?.challenges || [];

  const filteredChallenges = challengesList.filter((challenge: Challenge) => {
    if (selectedCategory && challenge.category !== selectedCategory) return false;
    if (selectedStatus && challenge.status !== selectedStatus) return false;
    if (selectedGrade && challenge.gradeLevel !== selectedGrade) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedStatus(null);
    setSelectedGrade(null);
  };

  const hasFilters = selectedCategory || selectedStatus || selectedGrade;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-rtGreenLight text-rtGreen";
      case "Medio": return "bg-rtYellowLight text-rtYellow";
      case "Difícil": return "bg-rtPinkLight text-rtPink";
      default: return "bg-slate-100 text-slate-500";
    }
  };

  const getStatusColor = (status: ChallengeStatus) => {
    switch (status) {
      case "Abierta": return "bg-rtGreenLight text-rtGreen";
      case "En curso": return "bg-rtYellowLight text-rtYellow";
      case "Completada": return "bg-slate-100 text-slate-500";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      <Navigation />
      
      <main className="px-4 py-6">
        <div className="mx-auto max-w-lg md:max-w-6xl">
          {/* Header */}
          <div className="mb-6 text-center md:text-left">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-black md:justify-start md:text-3xl text-rtDark">
              <Sparkles className="h-6 w-6 text-rtPink" />
              Misiones Disponibles
            </h1>
            <p className="mt-1 text-xs font-bold text-slate-500">
              {filteredChallenges.length} desafìos en Rada Tilly
            </p>
          </div>

          {/* Category Pills */}
          <div className="mb-4 -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-xs font-black transition-all btn-3d",
                  !selectedCategory
                    ? "bg-rtDark text-white shadow-md"
                    : "bg-white text-slate-650 border"
                )}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black transition-all btn-3d",
                    selectedCategory === cat.name
                      ? "bg-rtDark text-white shadow-md"
                      : "bg-white text-slate-650 border"
                  )}
                >
                  <span>{cat.emoji}</span>
                  <span className="whitespace-nowrap">{cat.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="mb-4 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 rounded-full font-black text-xs border-slate-350"
            >
              <Filter className="h-4 w-4" />
              Filtros
              {hasFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rtPink text-[10px] text-white">
                  {[selectedCategory, selectedStatus, selectedGrade].filter(Boolean).length}
                </span>
              )}
            </Button>
            
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-black text-rtPink hover:underline"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mb-6 rounded-3xl bg-white border-2 border-slate-900 p-5 shadow-sm space-y-4">
              {/* Status Filter */}
              <div>
                <h3 className="mb-2 text-[10px] font-black uppercase text-slate-400">Estado</h3>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-black border transition-all btn-3d",
                        selectedStatus === status
                          ? "bg-rtDark text-white shadow-sm"
                          : "bg-white text-slate-650"
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grade Filter */}
              <div>
                <h3 className="mb-2 text-[10px] font-black uppercase text-slate-400">Año escolar</h3>
                <div className="flex flex-wrap gap-2">
                  {gradeLevels.map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-black border transition-all btn-3d",
                        selectedGrade === grade
                          ? "bg-rtDark text-white shadow-sm"
                          : "bg-white text-slate-650"
                      )}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mission Cards */}
          <div className="space-y-3 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 xl:grid-cols-3">
            {filteredChallenges.map((challenge) => {
              const categoryData = categories.find(c => c.name === challenge.category);
              const isAccepted = currentUser && currentUser.misionesEnCurso?.includes(Number(challenge.id));
              
              return (
                <Link
                  key={challenge.id}
                  href={`/desafios/${challenge.id}`}
                  className="w-full rounded-3xl bg-white p-5 text-left border-2 border-slate-900 shadow-sm transition-all hover:shadow-md hover:scale-[1.01] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl shadow-inner bg-gradient-to-br",
                        categoryData?.color || "from-slate-100 to-slate-200"
                      )}>
                        {categoryData?.emoji || "📡"}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="mb-1 flex flex-wrap items-center gap-1.5">
                          <span className={cn(
                            "rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider",
                            getStatusColor(challenge.status)
                          )}>
                            {challenge.status}
                          </span>
                          <span className={cn(
                            "rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider",
                            getDifficultyColor(challenge.difficulty)
                          )}>
                            {challenge.difficulty}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <h3 className="mb-1 line-clamp-2 font-extrabold text-slate-800 text-sm leading-snug">
                            {challenge.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                          <Building2 className="h-3.5 w-3.5" />
                          <span className="truncate">{challenge.companyName}</span>
                        </div>
                      </div>
                      
                      <ChevronRight className="h-5 w-5 shrink-0 text-slate-300" />
                    </div>
                  </div>
                  
                  {/* Bottom info */}
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500">
                      <span className="flex items-center gap-0.5 font-black text-rtPink">
                        <Zap className="h-3.5 w-3.5 fill-current" />
                        +{challenge.xpReward} XP
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {challenge.duration}
                      </span>
                    </div>
                    
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-black text-slate-650">
                      {challenge.gradeLevel}
                    </span>
                  </div>
                  
                  {isAccepted && (
                    <div className="mt-2 rounded-xl bg-rtGreenLight p-2 text-center text-[10px] font-black text-rtGreen">
                      ✓ Misión en curso en tu tablero
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {filteredChallenges.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white border-2 border-slate-900 py-16 text-center shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <Filter className="h-8 w-8 text-slate-450" />
              </div>
              <h3 className="text-lg font-black text-slate-800">No hay misiones</h3>
              <p className="mt-2 text-xs font-bold text-slate-400">
                Proba ajustando los filtros de búsqueda
              </p>
              <Button
                variant="outline"
                className="mt-4 rounded-full text-xs font-black"
                onClick={clearFilters}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
