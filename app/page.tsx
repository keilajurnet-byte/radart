import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { CategoriesSection } from "@/components/categories-section";
import { HowItWorks } from "@/components/how-it-works";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <Navigation />
      <main>
        <Hero />
        <CategoriesSection />
        <HowItWorks />

        <section className="mx-auto mt-12 max-w-5xl rounded-3xl border border-border/70 bg-card/80 p-6 shadow-xl shadow-primary/5 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">¿Querés ver la versión clásica?</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-foreground md:text-3xl">
                Accedé al sitio navegable en HTML/CSS/JS
              </h2>
            </div>
            <a
              href="/legacy/index.html"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Abrir versión clásica
            </a>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            Esta ruta abre la versión estática heredada de Radar T para que puedas comparar el diseño y la navegación con la nueva plataforma Next.js.
          </p>
        </section>
      </main>
    </div>
  );
}
