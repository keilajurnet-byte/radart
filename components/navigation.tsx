"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Gamepad2,
  Trophy,
  User,
  Building2,
  Menu,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/desafios", label: "Misiones", icon: Gamepad2 },
  { href: "/estudiante", label: "Perfil", icon: User },
  { href: "/admin", label: "Ranking", icon: Trophy },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-card/80 backdrop-blur-xl hidden md:block">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary shadow-lg shadow-primary/30">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">
              <span className="text-primary">radar</span>
              <span className="text-accent">t</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/empresa"
            className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground shadow-lg transition-all hover:scale-105"
          >
            <Building2 className="h-4 w-4" />
            Empresas
          </Link>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-card/90 backdrop-blur-xl md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-accent to-secondary shadow-lg">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-black tracking-tight">
              <span className="text-primary">radar</span>
              <span className="text-accent">t</span>
            </span>
          </Link>
          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-xl bg-muted p-2.5 transition-colors active:bg-muted/80"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileOpen && (
          <div className="absolute left-0 right-0 top-14 border-b border-border bg-card p-4 shadow-xl">
            <Link
              href="/empresa"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-secondary to-primary/20 px-4 py-3.5 font-bold text-secondary-foreground shadow-lg"
            >
              <Building2 className="h-5 w-5" />
              Portal Empresas
            </Link>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation - Game Style */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-primary/20 bg-card/95 backdrop-blur-xl md:hidden">
        <div className="grid h-[72px] grid-cols-4 items-center px-2 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-1 py-1"
              >
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-2xl transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/40 scale-110"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className={cn(
                  "text-[10px] font-bold",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
