"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Gamepad2, Trophy, Star, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background px-4 py-8 md:min-h-0 md:py-20">
      {/* Animated Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-10 h-40 w-40 animate-pulse rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -left-10 top-1/3 h-32 w-32 animate-pulse rounded-full bg-secondary/40 blur-2xl" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 right-1/4 h-24 w-24 animate-pulse rounded-full bg-accent/30 blur-2xl" style={{ animationDelay: "2s" }} />
        
        {/* Floating game elements */}
        <div className="absolute left-[10%] top-20 animate-bounce text-2xl" style={{ animationDuration: "3s" }}>
          <Star className="h-6 w-6 text-secondary" />
        </div>
        <div className="absolute right-[15%] top-32 animate-bounce text-2xl" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}>
          <Zap className="h-5 w-5 text-primary" />
        </div>
        <div className="absolute bottom-40 left-[20%] animate-bounce text-2xl" style={{ animationDuration: "2.8s", animationDelay: "1s" }}>
          <Trophy className="h-5 w-5 text-accent" />
        </div>
      </div>

      <div className="relative mx-auto max-w-lg md:max-w-4xl">
        {/* Level Badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 backdrop-blur-sm">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-bold text-foreground">Tu aventura empieza aca</span>
          </div>
        </div>

        {/* Main Title - Mobile Optimized */}
        <h1 className="mb-4 text-center text-4xl font-black leading-tight tracking-tight md:text-6xl">
          <span className="text-foreground">Convertite en</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            heroe local
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-md text-center text-base leading-relaxed text-muted-foreground md:text-lg">
          Completa misiones reales con empresas de tu ciudad, 
          <span className="font-semibold text-primary"> gana XP</span>, 
          subi de nivel y desbloquea tu futuro
        </p>

        {/* CTA Buttons - Big and Tappable for Mobile */}
        <div className="flex flex-col gap-3 px-4 md:flex-row md:justify-center md:gap-4">
          <Button
            asChild
            size="lg"
            className="h-14 gap-3 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-lg font-bold shadow-xl shadow-primary/30 transition-all active:scale-95 md:h-12 md:px-8"
          >
            <Link href="/estudiante">
              <Gamepad2 className="h-6 w-6" />
              Empezar a jugar
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 gap-3 rounded-2xl border-2 border-secondary bg-secondary/10 text-lg font-bold text-secondary-foreground transition-all active:scale-95 md:h-12 md:px-8"
          >
            <Link href="/desafios">
              <Trophy className="h-5 w-5" />
              Ver misiones
            </Link>
          </Button>
        </div>

        {/* Quick Stats Cards - Mobile Game Style */}
        <div className="mt-10 grid grid-cols-3 gap-3 md:mt-16 md:gap-6">
          <div className="group rounded-2xl bg-gradient-to-br from-card to-primary/5 p-4 text-center shadow-lg transition-all active:scale-95 md:rounded-3xl md:p-6">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 md:h-14 md:w-14 md:rounded-2xl">
              <Gamepad2 className="h-6 w-6 text-primary md:h-7 md:w-7" />
            </div>
            <p className="text-2xl font-black text-primary md:text-3xl">24</p>
            <p className="text-xs font-medium text-muted-foreground md:text-sm">Misiones</p>
          </div>
          
          <div className="group rounded-2xl bg-gradient-to-br from-card to-secondary/20 p-4 text-center shadow-lg transition-all active:scale-95 md:rounded-3xl md:p-6">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/40 md:h-14 md:w-14 md:rounded-2xl">
              <Star className="h-6 w-6 text-secondary-foreground md:h-7 md:w-7" />
            </div>
            <p className="text-2xl font-black text-secondary-foreground md:text-3xl">18</p>
            <p className="text-xs font-medium text-muted-foreground md:text-sm">Jugadores</p>
          </div>
          
          <div className="group rounded-2xl bg-gradient-to-br from-card to-accent/10 p-4 text-center shadow-lg transition-all active:scale-95 md:rounded-3xl md:p-6">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 md:h-14 md:w-14 md:rounded-2xl">
              <Trophy className="h-6 w-6 text-accent md:h-7 md:w-7" />
            </div>
            <p className="text-2xl font-black text-accent md:text-3xl">+5K</p>
            <p className="text-xs font-medium text-muted-foreground md:text-sm">XP totales</p>
          </div>
        </div>

        {/* Scroll indicator for mobile */}
        <div className="mt-8 flex justify-center md:hidden">
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <span className="text-xs">Desliza para ver mas</span>
            <div className="h-6 w-4 rounded-full border-2 border-muted-foreground/30 p-0.5">
              <div className="mx-auto h-1.5 w-1 animate-bounce rounded-full bg-muted-foreground/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
