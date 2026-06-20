# Plan de Implementación: Ajustes de UX, Legales, Chatbot Global y Onboarding (Radar T v3)

Este plan detalla los cambios necesarios para hacer que la plataforma **Radar T** sea completamente auto-explicativa e intuitiva. Incorpora un chatbot global, un flujo de inducción ("onboarding") para cada rol, una sección de "Acerca de" clara e informativa, y las regulaciones legales para la protección de menores (DDJJ de tutor parental) y responsabilidad de intermediación de la plataforma.

---

## User Review Required

> [!IMPORTANT]
> **1. Chatbot Global y Multidispositivo:**
> - El asistente "Rádar" dejará de existir únicamente en el panel de estudiantes. Se creará el componente [global-chatbot.tsx](file:///Users/keilajurnet/Downloads/radar-t-platform/antigravity-radar-t/nextjs/components/global-chatbot.tsx) y se incluirá directamente en [layout.tsx](file:///Users/keilajurnet/Downloads/radar-t-platform/antigravity-radar-t/nextjs/app/layout.tsx).
> - Estará disponible y responderá dudas básicas de todos los usuarios en la landing page, el portal docente, empresa y estudiante.
>
> **2. Onboarding Específico por Rol:**
> - Al ingresar a los paneles (`/estudiante`, `/empresa`, `/docente`), si es la primera vez (evaluado con `localStorage` o al iniciar sesión en la demo), se mostrará automáticamente un modal de **Onboarding** con un carousel visual de 3 pasos que explica:
>   - **Estudiante**: 1. Hacé tu test -> 2. Tomá desafíos -> 3. Certificá y compartí en LinkedIn.
>   - **Empresa**: 1. Definí tu desafío -> 2. Buscá talento anónimo -> 3. Validador de Convenios.
>   - **Docente**: 1. Monitoreá el curso -> 2. Evaluá bitácoras -> 3. Firma digital institucional.
>
> **3. Validación de Tutor Parental para Estudiantes:**
> - En el registro del estudiante, se agregará un **Paso 1.7 (DDJJ y Validación Parental)**.
> - El estudiante podrá descargar una planilla modelo de DDJJ, previsualizar la declaración pre-llenada en un modal, y subir la declaración jurada firmada (simulado mediante un selector de archivos).
> - Se añade una casilla de verificación obligatoria de consentimiento del adulto responsable.
>
> **4. Verificación y Validación de Empresas:**
> - Añadiremos en el portal de empresas un indicador de estado de Convenio y Validación en el header: `"Convenio Escolar: Validado y Activo"`.
> - Se detallará en los Términos y Condiciones que para publicar desafíos visibles, las organizaciones deben completar el CUIT y firmar el Convenio Marco Escolar, el cual es validado por el Docente Coordinador.
>
> **5. LinkedIn Integration:**
> - Se añaden botones con el color corporativo de LinkedIn (`#0A66C2`) en la pestaña "Mi CV" y dentro del modal de Certificados del estudiante para permitirles "Añadir a mi perfil de LinkedIn" y "Compartir logro".

---

## Open Questions

> [!NOTE]
> **Planilla de DDJJ:**
> - ¿Qué formato de archivo se simulará en la subida de la Declaración Jurada? Planeamos admitir archivos `.pdf`, `.png` y `.jpg` con un visualizador simulado de "Subida Exitosa" y preview.
>
> **Filtro de Registro de Empresas:**
> - ¿Deberíamos simular una sección de "Empresas Pendientes de Aprobación" en el panel del Docente? Proponemos que las nuevas empresas queden en estado "Pendiente de Validación de Convenio" hasta que el docente apruebe su CUIT/Firma en una sección de "Organizaciones" en `/docente`.

---

## Proposed Changes

### Componentes Globales

#### [NEW] [global-chatbot.tsx](file:///Users/keilajurnet/Downloads/radar-t-platform/antigravity-radar-t/nextjs/components/global-chatbot.tsx)
- Crear un componente de cliente que maneje el chatbot flotante del asistente "Rádar".
- Utilizar el árbol de diálogo `ASISTENTE_FLUJOS` adaptado para responder a estudiantes, empresas y docentes.
- Ubicarlo de manera flotante fija (`fixed bottom-6 right-4 z-50`).

#### [NEW] [legal-modal.tsx](file:///Users/keilajurnet/Downloads/radar-t-platform/antigravity-radar-t/nextjs/components/legal-modal.tsx)
- Modal reutilizable de Términos y Condiciones que detalla las cláusulas para Estudiantes (Validación parental), Docentes (Seguimiento institucional) y la Cláusula de Exención de Responsabilidad de Radar T como intermediario.

#### [NEW] [onboarding-carousel.tsx](file:///Users/keilajurnet/Downloads/radar-t-platform/antigravity-radar-t/nextjs/components/onboarding-carousel.tsx)
- Componente de inducción que muestra tarjetas animadas explicativas del rol respectivo con botones "Siguiente" e "Iniciar Demo".

#### [MODIFY] [layout.tsx](file:///Users/keilajurnet/Downloads/radar-t-platform/antigravity-radar-t/nextjs/app/layout.tsx)
- Importar y renderizar `<GlobalChatbot />` en el cuerpo general de la aplicación.

---

### Landing Page y Acerca de

#### [MODIFY] [page.tsx](file:///Users/keilajurnet/Downloads/radar-t-platform/antigravity-radar-t/nextjs/app/page.tsx)
- **Ajuste visual**: Eliminar el componente de mapa SVG continental de la sección de escalabilidad (`scale` tab).
- **Sección de Escalabilidad sin mapa**: Reemplazar por una grilla responsiva de tarjetas con las 5 localidades (Rada Tilly, Neuquén, Tierra del Fuego, San Luis, San Juan) mostrando sus respectivos datos de piloto y sectores productivos.
- **Sección Acerca de**: Rediseñar la sección `about` reemplazando el contenido antiguo por la estructura y textos provistos:
  - Título principal: ¿Qué es Radar T?
  - Texto explicativo de la plataforma digital gamificada.
  - Subtítulo: Objetivos y Misión con viñetas responsivas.
  - Subtítulo: ¿Por qué una plataforma virtual y gamificada? con texto explicativo del lenguaje de los jóvenes y eliminación de fricción.
- **Footer**: Añadir links para abrir el `<LegalModal />` y el Onboarding explicativo general.

---

### Portal Estudiante

#### [MODIFY] [estudiante/page.tsx](file:///Users/keilajurnet/Downloads/radar-t-platform/antigravity-radar-t/nextjs/app/estudiante/page.tsx)
- **Eliminación**: Quitar el chatbot asistente local que estaba al final de la página.
- **Registro Paso 1.7 (Validación Parental y DDJJ)**:
  - Insertar entre el selector de disponibilidad y el quiz.
  - Explicación de la necesidad legal por protección de menores.
  - Enlace simulado `"Planilla_DDJJ_Tutor.pdf"` para descargar.
  - Botón `"Previsualizar DDJJ"` que abre un modal con el documento pre-llenado (Nombre del alumno, Escuela, Firmas vacías).
  - Selector de archivo simulado para cargar la DDJJ.
  - Checkbox obligatoria: `"Confirmo que cuento con la DDJJ firmada por mi tutor"`.
  - El botón `"Iniciar Test"` permanecerá bloqueado hasta cumplir ambos requisitos.
- **LinkedIn**:
  - En el modal de diplomas, añadir el botón `#0A66C2` `"Añadir a mi perfil de LinkedIn"`.
  - En la sección `"Mi CV"`, añadir el botón de vinculación de certificaciones de LinkedIn.
- **Onboarding**: Renderizar `<OnboardingCarousel role="estudiante" />` al cargar el dashboard.

---

### Portal Empresa

#### [MODIFY] [empresa/page.tsx](file:///Users/keilajurnet/Downloads/radar-t-platform/antigravity-radar-t/nextjs/app/empresa/page.tsx)
- **Filtro de Validación de Organización**:
  - Añadir en el panel principal el estatus: `"Estado de Convenio: Firmado y Verificado (Válido para publicar)"`.
  - Mostrar una sección o banner explicativo de la regulación: "Radar T requiere la validación del CUIT y la firma del Convenio Escolar para publicar misiones en el tablero estudiantil".
- **Onboarding**: Renderizar `<OnboardingCarousel role="empresa" />` al abrir el panel para guiar al oferente.

---

### Portal Docente

#### [MODIFY] [docente/page.tsx](file:///Users/keilajurnet/Downloads/radar-t-platform/antigravity-radar-t/nextjs/app/docente/page.tsx)
- **Aprobación de Organizaciones**:
  - Añadir una pequeña pestaña/sección en el panel para validar y autorizar los convenios de nuevas empresas registradas.
- **Onboarding**: Renderizar `<OnboardingCarousel role="docente" />` para explicar las métricas de monitoreo y validación digital.

---

## Verification Plan

### Automated Tests
- Ejecutar `npm run build` en `antigravity-radar-t/nextjs/` para garantizar la compatibilidad de todos los tipos y empaquetamiento final.

### Manual Verification
1. **Chatbot Global**: Navegar entre `/`, `/estudiante`, `/empresa` y `/docente` y comprobar que la burbuja 🤖 está visible, se puede interactuar con ella en cada portal, y mantiene o reinicia el flujo correctamente.
2. **Onboarding Carousels**: Borrar el almacenamiento local o iniciar sesión con un usuario y verificar que aparece el modal de Onboarding de bienvenida explicativo.
3. **Validación Parental en Registro**: Registrar un nuevo estudiante, avanzar hasta el paso 1.7, descargar la DDJJ, abrir el preview del documento, comprobar que no deja avanzar al quiz sin subir la DDJJ y marcar el check, subir el archivo de prueba, y verificar el paso al quiz.
4. **LinkedIn**: Abrir un certificado obtenido y pulsar "Agregar a LinkedIn", validando el toast informativo y redirección simulada.
5. **Verificación de Empresa**: Validar en el panel de empresa que se muestra el estatus del Convenio y que el docente puede autorizar nuevas organizaciones.
