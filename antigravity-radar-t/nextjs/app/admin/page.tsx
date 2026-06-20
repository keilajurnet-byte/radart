"use client";

import { Navigation } from "@/components/navigation";
import { Zap, Trophy, Flame, Medal, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { sampleChallenges, leaderboard, categories } from "@/lib/store";

export default function AdminPage() {
  const totalXP = sampleChallenges.reduce((acc, c) => acc + c.xpReward, 0);
  const activePlayers = leaderboard.length + 13; // Mock more players
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background pb-24">
      <Navigation />
      
      <main className="px-4 py-6">
        <div className="mx-auto max-w-lg md:max-w-4xl">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-4 py-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-bold text-yellow-600">Ranking Global</span>
            </div>
            <h1 className="text-2xl font-black md:text-3xl">Tabla de Lideres</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Los mejores jugadores de la comunidad
            </p>
          </div>

          {/* Stats Bar */}
          <div className="mb-6 grid grid-cols-3 gap-3">
            <div className="rounded-2xl bg-card p-4 text-center shadow-lg">
              <div className="flex items-center justify-center gap-1 text-xl font-black text-primary md:text-2xl">
                <Zap className="h-5 w-5" />
                {totalXP.toLocaleString()}
              </div>
              <p className="text-[10px] text-muted-foreground md:text-xs">XP totales</p>
            </div>
            <div className="rounded-2xl bg-card p-4 text-center shadow-lg">
              <div className="flex items-center justify-center gap-1 text-xl font-black text-secondary-foreground md:text-2xl">
                <Star className="h-5 w-5 text-yellow-500" />
                {activePlayers}
              </div>
              <p className="text-[10px] text-muted-foreground md:text-xs">Jugadores</p>
            </div>
            <div className="rounded-2xl bg-card p-4 text-center shadow-lg">
              <div className="flex items-center justify-center gap-1 text-xl font-black text-accent md:text-2xl">
                <Flame className="h-5 w-5 text-orange-500" />
                {sampleChallenges.length}
              </div>
              <p className="text-[10px] text-muted-foreground md:text-xs">Misiones</p>
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="mb-6 flex items-end justify-center gap-2">
            {/* 2nd Place */}
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 text-3xl shadow-lg md:h-20 md:w-20">
                {leaderboard[1].avatar}
              </div>
              <div className="flex h-20 w-20 flex-col items-center justify-center rounded-t-2xl bg-gradient-to-t from-gray-400 to-gray-300 md:h-24 md:w-24">
                <Medal className="h-5 w-5 text-white" />
                <span className="text-xl font-black text-white">2</span>
              </div>
              <div className="w-full rounded-b-xl bg-card p-2 text-center shadow-lg">
                <p className="text-xs font-bold truncate">{leaderboard[1].name}</p>
                <p className="flex items-center justify-center gap-0.5 text-[10px] text-primary">
                  <Zap className="h-3 w-3" />
                  {leaderboard[1].xp}
                </p>
              </div>
            </div>
            
            {/* 1st Place */}
            <div className="flex flex-col items-center -mt-4">
              <Crown className="mb-1 h-8 w-8 text-yellow-500 animate-pulse" />
              <div className="mb-2 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 text-4xl shadow-xl ring-4 ring-yellow-300 md:h-24 md:w-24">
                {leaderboard[0].avatar}
              </div>
              <div className="flex h-28 w-24 flex-col items-center justify-center rounded-t-2xl bg-gradient-to-t from-yellow-500 to-yellow-400 md:h-32 md:w-28">
                <Trophy className="h-6 w-6 text-white" />
                <span className="text-2xl font-black text-white">1</span>
              </div>
              <div className="w-full rounded-b-xl bg-card p-2 text-center shadow-lg">
                <p className="text-sm font-bold">{leaderboard[0].name}</p>
                <p className="flex items-center justify-center gap-0.5 text-xs font-bold text-primary">
                  <Zap className="h-3.5 w-3.5" />
                  {leaderboard[0].xp}
                </p>
              </div>
            </div>
            
            {/* 3rd Place */}
            <div className="flex flex-col items-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 text-3xl shadow-lg md:h-20 md:w-20">
                {leaderboard[2].avatar}
              </div>
              <div className="flex h-16 w-20 flex-col items-center justify-center rounded-t-2xl bg-gradient-to-t from-amber-700 to-amber-600 md:h-20 md:w-24">
                <Medal className="h-5 w-5 text-white" />
                <span className="text-xl font-black text-white">3</span>
              </div>
              <div className="w-full rounded-b-xl bg-card p-2 text-center shadow-lg">
                <p className="text-xs font-bold truncate">{leaderboard[2].name}</p>
                <p className="flex items-center justify-center gap-0.5 text-[10px] text-primary">
                  <Zap className="h-3 w-3" />
                  {leaderboard[2].xp}
                </p>
              </div>
            </div>
          </div>

          {/* Full Ranking List */}
          <div className="rounded-2xl bg-card p-4 shadow-lg">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Star className="h-5 w-5 text-yellow-500" />
              Ranking completo
            </h2>
            <div className="space-y-2">
              {leaderboard.map((player, i) => (
                <div
                  key={player.rank}
                  className={cn(
                    "flex items-center gap-3 rounded-xl p-3 transition-all",
                    i < 3 ? "bg-gradient-to-r from-primary/10 to-transparent" : "bg-muted/30"
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black",
                    i === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white" :
                    i === 1 ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white" :
                    i === 2 ? "bg-gradient-to-br from-amber-600 to-amber-700 text-white" :
                    "bg-muted text-muted-foreground"
                  )}>
                    {player.rank}
                  </div>
                  <span className="text-2xl">{player.avatar}</span>
                  <div className="flex-1">
                    <p className="font-bold">{player.name}</p>
                    <p className="text-xs text-muted-foreground">Nivel {player.level}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm font-black text-primary">
                      <Zap className="h-4 w-4" />
                      {player.xp.toLocaleString()}
                    </div>
                    <p className="text-[10px] text-muted-foreground">XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category Stats */}
          <div className="mt-6 rounded-2xl bg-card p-4 shadow-lg">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Flame className="h-5 w-5 text-orange-500" />
              Misiones por categoria
            </h2>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              {categories.map((cat) => {
                const count = sampleChallenges.filter(c => c.category === cat.name).length;
                return (
                  <div 
                    key={cat.name}
                    className={cn(
                      "flex items-center gap-2 rounded-xl p-3",
                      `bg-gradient-to-br ${cat.color}/10`
                    )}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <div>
                      <p className="text-xs font-bold leading-tight">{cat.name.split(" ")[0]}</p>
                      <p className="text-lg font-black text-foreground">{count}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
