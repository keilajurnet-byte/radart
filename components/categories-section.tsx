"use client";

import Link from "next/link";
import { categories } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Sparkles, ChevronRight } from "lucide-react";

export function CategoriesSection() {
  return (
    <section className="px-4 py-8 md:py-16">
      <div className="mx-auto max-w-lg md:max-w-4xl">
        <div className="mb-6 text-center md:text-left">
          <h2 className="flex items-center justify-center gap-2 text-xl font-black md:justify-start md:text-2xl">
            <Sparkles className="h-5 w-5 text-primary" />
            Tipos de Misiones
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Elige tu aventura favorita
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/desafios?category=${encodeURIComponent(category.name)}`}
              className={cn(
                "group relative overflow-hidden rounded-2xl p-4 text-white shadow-lg transition-all active:scale-95 hover:scale-105 hover:shadow-xl md:p-6",
                `bg-gradient-to-br ${category.color}`
              )}
            >
              {/* Decorative circle */}
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/10 md:h-24 md:w-24" />
              
              <div className="relative">
                <span className="mb-2 block text-3xl md:text-4xl">{category.emoji}</span>
                <h3 className="mb-1 text-sm font-bold leading-tight md:text-base">
                  {category.name}
                </h3>
                <p className="hidden text-[10px] leading-snug opacity-80 md:block md:text-xs">
                  {category.description.slice(0, 40)}...
                </p>
                
                <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold opacity-90 md:text-xs">
                  Ver misiones
                  <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
