import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            {/* Logo matching nav style */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold lowercase tracking-tight">
                <span className="text-primary">radar</span>
                <span className="text-secondary-foreground">t</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              Conectando el talento local con las oportunidades de la nueva
              economía. Transformando comunidades a través de pasantías
              significativas.
            </p>
            {/* Hearts like INJUVE */}
            <div className="mt-4 flex items-center gap-2">
              <Heart className="h-4 w-4 fill-primary text-primary" />
              <Heart className="h-4 w-4 fill-secondary text-secondary" />
              <Heart className="h-4 w-4 fill-accent text-accent" />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Navegación
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/empresa"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Soy Empresa
                </Link>
              </li>
              <li>
                <Link
                  href="/estudiante"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Soy Estudiante
                </Link>
              </li>
              <li>
                <Link
                  href="/desafios"
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  Ver Desafíos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Comunidad
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">
                  Puerto Madryn, Chubut
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">Patagonia Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            &copy; {new Date().getFullYear()} Radar T. Construyendo futuros
            locales con{" "}
            <Heart className="inline h-3 w-3 fill-accent text-accent" />
          </p>
        </div>
      </div>
    </footer>
  );
}
