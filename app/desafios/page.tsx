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
  sampleChallenges,
  categories,
  gradeLevels,
  statuses,
  type ChallengeCategory,
  type ChallengeStatus,
  type GradeLevel,
  type Challenge,
} from "@/lib/store";

export default function DesafiosPage() {
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ChallengeStatus | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [acceptedIds, setAcceptedIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const stored = localStorage.getItem('radar_misiones_aceptadas');
      setAcceptedIds(stored ? JSON.parse(stored) : []);
    } catch (e) {
      // ignore
    }
  }, []);

  const filteredChallenges = sampleChallenges.filter((challenge) => {
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
      case "Facil": return "bg-green-500 text-white";
      case "Medio": return "bg-yellow-500 text-white";
      case "Dificil": return "bg-red-500 text-white";
      default: return "bg-primary text-white";
    }
  };

  const getStatusColor = (status: ChallengeStatus) => {
    switch (status) {
      case "Abierto": return "bg-green-500/20 text-green-600";
      case "En curso": return "bg-yellow-500/20 text-yellow-600";
      case "Completado": return "bg-muted text-muted-foreground";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pb-24">
      <Navigation />
      
      <main className="px-4 py-6">
        <div className="mx-auto max-w-lg md:max-w-6xl">
          {/* Header */}
          <div className="mb-6 text-center md:text-left">
            <h1 className="flex items-center justify-center gap-2 text-2xl font-black md:justify-start md:text-3xl">
              <Sparkles className="h-6 w-6 text-primary" />
              Misiones
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {filteredChallenges.length} misiones disponibles
            </p>
          </div>

          {/* Category Pills - Horizontal Scroll on Mobile */}
          <div className="mb-4 -mx-4 px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                  !selectedCategory
                    ? "bg-primary text-white shadow-lg"
                    : "bg-muted text-muted-foreground"
                )}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all",
                    selectedCategory === cat.name
                      ? "bg-primary text-white shadow-lg"
                      : "bg-muted text-muted-foreground"
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
              className="gap-2 rounded-full"
            >
              <Filter className="h-4 w-4" />
              Filtros
              {hasFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {[selectedCategory, selectedStatus, selectedGrade].filter(Boolean).length}
                </span>
              )}
            </Button>
            
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm font-medium text-primary"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mb-6 rounded-2xl bg-card p-4 shadow-lg">
              {/* Status Filter */}
              <div className="mb-4">
                <h3 className="mb-2 text-xs font-bold uppercase text-muted-foreground">Estado</h3>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-semibold transition-all",
                        selectedStatus === status
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grade Filter */}
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase text-muted-foreground">Anio escolar</h3>
                <div className="flex flex-wrap gap-2">
                  {gradeLevels.map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm font-semibold transition-all",
                        selectedGrade === grade
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground"
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
              
              return (
                <Link
                  key={challenge.id}
                  href={`/desafios/${challenge.id}`}
                  className="w-full rounded-2xl bg-card p-4 text-left shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl shadow-sm",
                      `bg-gradient-to-br ${categoryData?.color || "from-primary to-accent"}`
                    )}>
                      {categoryData?.emoji || ""}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-1.5">
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold",
                          getStatusColor(challenge.status)
                        )}>
                          {challenge.status}
                        </span>
                        {challenge.status === "Abierto" && (
                          <span className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold",
                            getDifficultyColor(challenge.difficulty)
                          )}>
                            {challenge.difficulty}
                          </span>
                        )}
                      </div>
                      
                        <div className="flex items-center gap-2">
                          <h3 className="mb-1 line-clamp-2 font-bold text-foreground leading-tight">
                            {challenge.title}
                          </h3>
                          {acceptedIds.includes(challenge.id) && (
                            <span className="ml-2 rounded-full bg-green-100 text-green-700 px-2 py-0.5 text-xs font-bold">Aceptada</span>
                          )}
                        </div>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        <span className="truncate">{challenge.companyName}</span>
                      </div>
                    </div>
                    
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
                  </div>
                  
                  {/* Bottom info */}
                  <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 font-bold text-primary">
                        <Zap className="h-3.5 w-3.5" />
                        +{challenge.xpReward} XP
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {challenge.duration}
                      </span>
                    </div>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">
                      {challenge.gradeLevel}
                    </span>
                  </div>
                  
                  {challenge.studentName && (
                    <div className="mt-2 rounded-xl bg-primary/10 p-2 text-xs">
                      <span className="text-muted-foreground">Jugador: </span>
                      <span className="font-bold text-primary">{challenge.studentName}</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {filteredChallenges.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-card py-16 text-center shadow-lg">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold">No hay misiones</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Proba ajustando los filtros
              </p>
              <Button
                variant="outline"
                className="mt-4 rounded-full"
                onClick={clearFilters}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Mission Detail replaced with dedicated detail page */}
    </div>
  );
}
