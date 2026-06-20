"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Database,
  Map,
  Truck,
  Megaphone,
  Leaf,
  Check,
  ArrowRight,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChallengeCategory, GradeLevel } from "@/lib/store";
import { gradeLevels } from "@/lib/store";

const categoryOptions: {
  name: ChallengeCategory;
  icon: React.ElementType;
  description: string;
}[] = [
  {
    name: "Gestión de Datos",
    icon: Database,
    description: "Organización y digitalización",
  },
  {
    name: "Atención al Turista",
    icon: Map,
    description: "Experiencias para visitantes",
  },
  {
    name: "Logística",
    icon: Truck,
    description: "Distribución y transporte",
  },
  {
    name: "Marketing Digital",
    icon: Megaphone,
    description: "Promoción digital",
  },
  {
    name: "Conservación Ambiental",
    icon: Leaf,
    description: "Protección ambiental",
  },
];

export default function EmpresaPage() {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] =
    useState<ChallengeCategory | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    description: "",
    gradeLevel: "" as GradeLevel | "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedCategory && formData.title && formData.description) {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              ¡Desafío publicado!
            </h1>
            <p className="mt-4 text-muted-foreground">
              Tu desafío ya está visible para los estudiantes. Te notificaremos
              cuando alguien aplique.
            </p>
            <Button
              className="mt-8"
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
                setSelectedCategory(null);
                setFormData({
                  companyName: "",
                  title: "",
                  description: "",
                  gradeLevel: "",
                });
              }}
            >
              Publicar otro desafío
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
              <Building2 className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Publicar un desafío
            </h1>
            <p className="mt-3 text-muted-foreground">
              En 2 pasos, conectá tu empresa con el talento local
            </p>
          </div>

          {/* Progress indicator */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                step >= 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              1
            </div>
            <div
              className={cn(
                "h-1 w-16 rounded-full transition-colors",
                step >= 2 ? "bg-primary" : "bg-muted"
              )}
            />
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                step >= 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              2
            </div>
          </div>

          {/* Step 1: Category Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground">
                  ¿Qué tipo de desafío querés publicar?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Seleccioná la categoría que mejor describe tu necesidad
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {categoryOptions.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.name;
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={cn(
                        "flex items-start gap-4 rounded-xl border-2 p-5 text-left transition-all",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {category.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      {isSelected && (
                        <Check className="ml-auto h-5 w-5 shrink-0 text-primary" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedCategory}
                  className="gap-2"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-foreground">
                  Contanos más sobre el desafío
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Esta información ayudará a los estudiantes a entender mejor la
                  oportunidad
                </p>
              </div>

              <div className="space-y-5 rounded-xl border border-border bg-card p-6">
                <div>
                  <label
                    htmlFor="companyName"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Nombre de la empresa
                  </label>
                  <Input
                    id="companyName"
                    placeholder="Ej: Patagonia Tours"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Título del desafío
                  </label>
                  <Input
                    id="title"
                    placeholder="Ej: Crear una guía turística digital"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Describí brevemente qué necesitás y qué aprenderá el estudiante..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="gradeLevel"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Nivel de año recomendado
                  </label>
                  <select
                    id="gradeLevel"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    value={formData.gradeLevel}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        gradeLevel: e.target.value as GradeLevel,
                      })
                    }
                  >
                    <option value="">Seleccionar...</option>
                    {gradeLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Volver
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.title || !formData.description}
                  className="gap-2"
                >
                  Publicar desafío
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
