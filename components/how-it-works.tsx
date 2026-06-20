"use client";

import { Zap, Trophy, Rocket, Star } from "lucide-react";

const steps = [
  {
    icon: Rocket,
    title: "Elegi tu mision",
    description: "Explora desafios reales de empresas locales",
    color: "from-blue-500 to-cyan-500",
    emoji: "1",
  },
  {
    icon: Zap,
    title: "Completala",
    description: "Trabaja en el proyecto y gana experiencia real",
    color: "from-orange-500 to-yellow-500",
    emoji: "2",
  },
  {
    icon: Trophy,
    title: "Gana XP",
    description: "Subi de nivel y desbloquea nuevas oportunidades",
    color: "from-purple-500 to-pink-500",
    emoji: "3",
  },
  {
    icon: Star,
    title: "Crece",
    description: "Construi tu futuro en tu propia comunidad",
    color: "from-green-500 to-emerald-500",
    emoji: "4",
  },
];

export function HowItWorks() {
  return (
    <section className="px-4 py-8 md:py-16">
      <div className="mx-auto max-w-lg md:max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-xl font-black md:text-2xl">Como funciona?</h2>
          <p className="text-sm text-muted-foreground">
            4 pasos para convertirte en heroe local
          </p>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="space-y-4 md:hidden">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="flex gap-4">
                {/* Number bubble */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-xl font-black text-white shadow-lg`}>
                    {step.emoji}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mt-2 h-full w-1 rounded-full bg-gradient-to-b from-primary/30 to-transparent" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 rounded-2xl bg-card p-4 shadow-lg">
                  <div className="mb-2 flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <h3 className="font-bold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: Horizontal Cards */}
        <div className="hidden gap-4 md:grid md:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div 
                key={i}
                className="group relative rounded-2xl bg-card p-5 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} text-2xl font-black text-white shadow-lg`}>
                  {step.emoji}
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <h3 className="font-bold">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                
                {/* Arrow connector */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-primary/30 lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
