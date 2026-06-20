"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  Gamepad2,
  User,
  Trophy,
  Building2,
  School,
  LogOut,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { getRadarState, saveRadarState, UserProfile } from "@/lib/store";

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Load session from localStorage on mount
    const state = getRadarState();
    setCurrentUser(state.currentUser);
  }, [pathname]); // Refresh on path changes

  const handleLogout = () => {
    const state = getRadarState();
    state.currentUser = null;
    saveRadarState(state);
    setCurrentUser(null);
    setMobileOpen(false);
    router.push("/");
  };

  // Build nav items dynamically based on current user role
  const getNavItems = () => {
    const items = [
      { href: "/", label: "Inicio", icon: Home, color: "text-rtPink" },
      { href: "/desafios", label: "Misiones", icon: Gamepad2, color: "text-rtBlue" },
    ];

    if (currentUser) {
      if (currentUser.rol === "estudiante") {
        items.push({ href: "/estudiante", label: "Mi Perfil", icon: User, color: "text-rtGreen" });
      } else if (currentUser.rol === "empresa") {
        items.push({ href: "/empresa", label: "Organización", icon: Building2, color: "text-rtBlue" });
      } else if (currentUser.rol === "docente") {
        items.push({ href: "/docente", label: "Docente", icon: School, color: "text-rtPurple" });
      }
    }

    return items;
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md hidden md:block">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight">
              <span className="text-rtPink">R</span>
              <span className="text-rtYellow">a</span>
              <span className="text-rtGreen">d</span>
              <span className="text-rtBlue">a</span>
              <span className="text-rtPurple">r</span>
              <span className="text-rtTeal"> T</span>
            </span>
            <span className="text-[10px] font-bold bg-rtBlueLight text-rtBlue px-2 py-0.5 rounded-md">Piloto 2026</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              // Get active border and background color based on destination
              let activeStyle = "bg-rtPink text-white shadow-[0_3px_0_#9a0050]";
              if (item.href === "/estudiante") activeStyle = "bg-rtGreen text-white shadow-[0_3px_0_#2b7326]";
              if (item.href === "/empresa") activeStyle = "bg-rtBlue text-white shadow-[0_3px_0_#0f5b82]";
              if (item.href === "/docente") activeStyle = "bg-rtPurple text-white shadow-[0_3px_0_#623475]";
              if (item.href === "/desafios") activeStyle = "bg-rtBlue text-white shadow-[0_3px_0_#0f5b82]";

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black transition-all btn-3d",
                    isActive
                      ? activeStyle
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Auth Button */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className={cn(
                  "text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider",
                  currentUser.rol === "estudiante" ? "bg-rtGreenLight text-rtGreen" :
                  currentUser.rol === "empresa" ? "bg-rtBlueLight text-rtBlue" :
                  "bg-rtPurpleLight text-rtPurple"
                )}>
                  {currentUser.rol === "estudiante" ? `🎒 Estudiante` :
                   currentUser.rol === "empresa" ? `🏢 Organización` :
                   `🏫 Docente`}
                </span>
                
                <span className="text-sm font-bold text-slate-700 max-w-[120px] truncate">
                  {currentUser.nombre}
                </span>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/?login=true"
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/");
                  // Give homepage time to mount and switch
                  setTimeout(() => {
                    const btn = document.querySelector('[onclick*="landing-login"]') as HTMLElement;
                    if (btn) btn.click();
                  }, 200);
                }}
                className="flex items-center gap-2 rounded-full bg-rtPink text-white px-5 py-2.5 text-sm font-black btn-3d shadow-[0_4px_0_#9a0050]"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Top Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight">
              <span className="text-rtPink">R</span>
              <span className="text-rtYellow">a</span>
              <span className="text-rtGreen">d</span>
              <span className="text-rtBlue">a</span>
              <span className="text-rtPurple">r</span>
              <span className="text-rtTeal"> T</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleLogout}
                className="rounded-xl bg-slate-100 p-2 text-slate-500 active:bg-slate-200"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-xl bg-slate-100 p-2 text-slate-700 active:bg-slate-200"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="absolute left-0 right-0 top-14 border-b border-slate-100 bg-white p-4 shadow-xl flex flex-col gap-3">
            {currentUser ? (
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{currentUser.rol === "empresa" ? "organización" : currentUser.rol}</p>
                  <p className="font-extrabold text-slate-800">{currentUser.nombre}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-red-100 text-red-700 font-bold text-xs"
                >
                  <LogOut className="h-3 w-3" /> Salir
                </button>
              </div>
            ) : (
              <Link
                href="/"
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/");
                  setTimeout(() => {
                    const btn = document.querySelector('[onclick*="landing-login"]') as HTMLElement;
                    if (btn) btn.click();
                  }, 200);
                }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-rtPink text-white px-4 py-3.5 font-bold shadow-md"
              >
                Ingresar a la Demo
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation - Game Style */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-150 bg-white/95 backdrop-blur-md md:hidden pb-safe">
        <div className="grid h-[64px] grid-cols-3 items-center px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            let activeColor = "bg-rtPink text-white";
            if (item.href === "/estudiante") activeColor = "bg-rtGreen text-white";
            if (item.href === "/empresa") activeColor = "bg-rtBlue text-white";
            if (item.href === "/docente") activeColor = "bg-rtPurple text-white";
            if (item.href === "/desafios") activeColor = "bg-rtBlue text-white";

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 py-1"
              >
                <div
                  className={cn(
                    "flex h-9 w-14 items-center justify-center rounded-2xl transition-all duration-200",
                    isActive
                      ? `${activeColor} shadow-md scale-105`
                      : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <span className={cn(
                  "text-[9px] font-black tracking-tight",
                  isActive ? "text-slate-900" : "text-slate-400"
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
export default Navigation;
