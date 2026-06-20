# Radar T — Conexión Productiva Local (Piloto 2026) 📡🐳

¡Bienvenido al repositorio oficial de **Radar T**! Una plataforma web digital gamificada y modular que conecta la educación secundaria con la transición productiva y económica de los municipios de la Argentina.

---

## 📌 ¿Qué es Radar T?

**Radar T** es un banco de proyectos de innovación local y un "radar" de talento joven. Nace de un caso piloto en **Rada Tilly, Chubut**, una localidad enfrentando la transición de una cuenca petrolera madura en retiro hacia la conservación marina (investigación de la ballena sei) y el ecoturismo de avistamiento científico.

La plataforma permite a los estudiantes realizar y acreditar sus **Prácticas Profesionalizantes obligatorias** de forma 100% virtual, resolviendo desafíos reales planteados por organizaciones locales de su territorio.

---

## 🚀 Arquitectura del Proyecto

El repositorio está estructurado de la siguiente manera:

```text
radar-t-platform/
├── antigravity-radar-t/
│   ├── nextjs/          📡 [APLICACIÓN PRINCIPAL NEXT.JS v3] Portal unificado de Estudiantes, Empresas y Docentes.
│   └── vanilla/         🎒 Prototipo interactivo monocapa de alta fidelidad en HTML/CSS/JS clásico.
├── app/                 ⚙️ Next.js App original / wrapper.
├── components/          🎨 Componentes UI compartidos (Shadcn/Tailwind).
├── public/              📂 Recursos estáticos y previsualizaciones.
└── package.json         📦 Configuración de dependencias raíz.
```

### Portal de Aplicación Principal (`antigravity-radar-t/nextjs`)
Incluye todas las funcionalidades de la **Versión v3/v4**:
- **Test Vocacional Interactivo**: Asigna dinámicamente perfiles sugeridos basados en intereses de desarrollo local.
- **Entrenamiento de Habilidades Blandas ("Soft Skills")**: Simulador de dilemas socio-productivos locales.
- **Tablero de Misiones**: Desafíos clasificados por perfiles locales vinculados a la conservación de ballena sei, marketing y ecoturismo.
- **Validación Parental Digital**: Flujo legal con Declaración Jurada (DDJJ) digitalizable y firmada para la protección de menores.
- **Filtro de Convenio Marco para Empresas**: Publicación de misiones sujeta a la validación fiscal del CUIT y convenio firmado por el docente.
- **CV Dinámico & Certificados**: Diplomas de alta fidelidad exportables y currículum autogenerado en tiempo real.
- **Chatbot Asistente "Rádar"**: Chatbot flotante interactivo y guiado en toda la plataforma.

---

## 🛠️ Guía de Despliegue en Render (Paso a Paso)

Para desplegar la aplicación principal de Next.js en **Render.com**, sigue estos sencillos pasos:

1. **Crear una cuenta o iniciar sesión** en [Render Dashboard](https://dashboard.render.com).
2. Haz clic en **New +** y selecciona **Web Service**.
3. Vincula tu cuenta de GitHub y selecciona el repositorio **`radart`**.
4. **Configura los parámetros del Web Service** exactamente de la siguiente manera:
   - **Name:** `radar-t` (o el nombre que prefieras).
   - **Environment:** `Node`
   - **Region:** Selecciona la más cercana a tus usuarios (ej: `Oregon, USA` o `Ohio, USA`).
   - **Branch:** `main`
   - **Root Directory:** `antigravity-radar-t/nextjs`  *(⚠️ MUY IMPORTANTE: Esto asegura que Render compile la aplicación principal v3 en lugar de la raíz).*
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start`
   - **Instance Type:** `Free` (o el plan que desees).
5. Haz clic en **Create Web Service**.

Render detectará la configuración de Next.js, descargará las dependencias de la subcarpeta, compilará las páginas estáticas y levantará el servidor automáticamente.

---

## 💻 Desarrollo Local

Si deseas ejecutar y experimentar con la plataforma en tu máquina local:

### Requisitos previos:
- Node.js (v18 o superior recomendado)
- npm o pnpm

### Ejecución de la aplicación principal:
```bash
# 1. Clonar el repositorio
git clone git@github.com:keilajurnet-byte/radart.git
cd radart

# 2. Navegar a la carpeta de la aplicación Next.js
cd antigravity-radar-t/nextjs

# 3. Instalar las dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la plataforma interactiva.

---

## 🔑 Credenciales Rápidas para Demo

Para evaluar los paneles interactivos de la demo, puedes usar estos accesos pre-guardados en el login de la plataforma:
- **Estudiante**: `valentina@ees736.edu.ar` (Contraseña: `radar123`)
- **Organización/Empresa**: `empresa@avistajepatagonia.com` (Contraseña: `radar123`)
- **Docente Coordinador**: `docente@ees736.edu.ar` (Contraseña: `radar123`)

---

## 📄 Licencia e Intermediación Legal

Este software fue desarrollado para el Piloto 2026 de Rada Tilly, Chubut. La plataforma actúa estrictamente como un canal de intermediación y vinculación formativa entre la institución educativa (colegio secundario) y las organizaciones oferentes, quedando la responsabilidad pedagógica y de validación legal bajo jurisdicción exclusiva de la institución escolar.
