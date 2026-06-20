# RADAR T — Prompt completo para Antigravity
### Conexión Productiva Local · Rada Tilly, Chubut · Piloto 2026

---

## 🧭 CONTEXTO DEL PROYECTO

**Radar T** es una plataforma cívico-educativa diseñada para comunidades en
reconversión productiva. El caso piloto es Rada Tilly (Chubut), que transita
de una economía petrolera madura hacia el turismo de la ballena sei. La
plataforma conecta a empresas y emprendedores locales con estudiantes de
escuela secundaria pública, usando un sistema de "desafíos estandarizados"
(misiones) que los alumnos resuelven como práctica profesionalizante oficial.
El modelo es replicable en cualquier pequeña comunidad argentina en
reconversión (pueblos mineros, agrícolas, pesqueros, etc.).

---

## 🚀 PROMPT PARA ANTIGRAVITY

```
Estamos desarrollando un prototipo de nuestra solución.

Desarrolla una aplicación de CONEXIÓN PRODUCTIVA LOCAL llamada "Radar T"
para ESTUDIANTES DE ESCUELA SECUNDARIA (15-17 años), EMPRESAS/EMPRENDEDORES
LOCALES y DOCENTES de Rada Tilly, Chubut.

El objetivo es conectar desafíos reales de empresas locales con estudiantes
que los resuelven como práctica profesionalizante, con un sistema de
certificación digital tripartito y orientación vocacional basada en intereses.

La app debe cumplir con las siguientes funcionalidades:

1. Pantalla de bienvenida / splash con identidad de Radar T
2. Selección de rol: Estudiante / Empresa / Docente
3. Registro de estudiante con datos mínimos + consentimiento para menores
   + cuestionario de orientación vocacional (5 preguntas de intereses)
4. Registro de empresa/emprendedor con datos básicos del negocio
5. Home del estudiante: perfil gamificado (XP, nivel, badges), misiones
   recomendadas según intereses, acceso al tablero
6. Tablero de misiones: cards filtrables por categoría y estado, con
   botón "Tomar misión"
7. Detalle de misión: descripción completa, empresa, año recomendado,
   cupos, XP disponible, botón de postulación
8. Perfil del estudiante: progreso, historial de misiones, certificados
   obtenidos, recomendaciones vocacionales personalizadas
9. Sistema de certificados: visualización de los 3 niveles (Participación,
   Competencia, Aval Institucional), estado de cada uno, descarga simulada
10. Interfaz de empresa (web/desktop): publicación de misión en 2 pasos
    (elegir categoría + completar formulario), tablero de postulantes,
    botón de evaluación/aprobación
11. Panel docente: listado de misiones activas de sus alumnos, estado de
    cada práctica, botón de validación
12. Pantalla de orientación vocacional: resultados del cuestionario inicial,
    mapa de fortalezas del estudiante, sugerencias de misiones alineadas

MUY IMPORTANTE: Este es un prototipo visual, NO una app real.
- Usá solo HTML, CSS y JavaScript vanilla. Sin backend, sin base de datos,
  sin autenticación real.
- Los datos pueden ser hardcodeados o simulados.
- Priorizá que se vea bien y sea clickeable.
- Todas las pantallas deben estar en un solo archivo o con navegación simple.
- No instales librerías pesadas. Podés usar Tailwind CDN o Google Fonts.
- Debe funcionar en celular (max-width 430px) Y en desktop (min-width 1024px).
```

---

## 📱 DESCRIPCIÓN DETALLADA DE PANTALLAS

### PANTALLA 0 — Splash / Bienvenida
- Logo animado: "RadarT" con letras multicolor (rosa, amarillo, verde, azul,
  violeta — estilo INJUVE Argentina)
- Ícono de radar/onda con animación de pulso
- Tagline: "Tu primera misión real te espera"
- Botón grande: "Entrar"
- Badge inferior: "Piloto 2026 · Rada Tilly, Chubut 🐳"

---

### PANTALLA 1 — Selección de rol
- Fondo blanco, tres cards grandes clickeables
- **Card Estudiante** (rosa/verde): emoji 🎒, "Soy estudiante", subtítulo
  "Encontrá tu misión y ganás experiencia real"
- **Card Empresa** (azul/amarillo): emoji 🏢, "Soy empresa o emprendedor",
  subtítulo "Publicá tu desafío en 2 clics"
- **Card Docente** (violeta/teal): emoji 🏫, "Soy docente", subtítulo
  "Acompañá a tus alumnos en sus prácticas"
- Link pequeño abajo: "¿Ya tenés cuenta? Iniciá sesión"

---

### PANTALLA 2A — Registro estudiante (Paso 1 de 3: Datos básicos)
Indicador de progreso: ●○○

**Campos (mínimos para menores):**
- Nombre y apellido
- Año escolar que cursás (3°, 4°, 5° año) — desplegable
- Correo electrónico institucional o personal
  - Nota explicativa: "Usá el mail de tu escuela si tenés. Ahí
    recibirás tus certificados digitales."
- Contraseña (solo para el prototipo: simulada)

**Aviso de privacidad para menores (texto visible, no modal):**
```
⚠️ Radar T es una plataforma educativa para estudiantes de 15 a 18 años.
No compartimos tus datos con terceros. Solo usamos tu mail para enviarte
certificados y notificaciones de tus misiones. Si tenés menos de 16 años,
te recomendamos comentarle a un adulto de confianza antes de registrarte.
```
- Checkbox: "Leí y acepto las condiciones de uso"
- Botón: "Continuar →"

---

### PANTALLA 2B — Registro estudiante (Paso 2 de 3: Orientación vocacional)
Indicador de progreso: ●●○

Título: "¿Qué cosas te copan hacer?" 🔍
Subtítulo: "Estas respuestas nos ayudan a recomendarte las mejores misiones"

**5 preguntas de intereses (selección múltiple con íconos):**

**P1 — ¿Cuál de estas actividades te divierte más?**
- 📱 Crear contenido para redes sociales
- 📊 Organizar datos en planillas
- 🐳 Cuidar el medioambiente y la naturaleza
- 🗺️ Ayudar a turistas o personas que visitan el lugar
- 📦 Organizar cosas, coordinar personas o eventos
- 💻 Usar tecnología para resolver problemas

**P2 — Si pudieras trabajar en algo ahora mismo, ¿qué elegirías?**
- Crear el Instagram de un negocio local
- Registrar datos de avistajes de ballenas para científicos
- Ayudar en la recepción de un hotel o restaurante
- Armar el sistema de reservas de un negocio
- Analizar cuántos turistas visitaron Rada Tilly este mes
- Diseñar la guía digital de la costa patagónica

**P3 — ¿Cómo preferís trabajar?**
- 👥 En equipo
- 🧍 Solo/a
- 🌊 Al aire libre
- 💻 En computadora
- 🗣️ Hablando con gente

**P4 — ¿Qué materia te resulta más fácil o interesante?**
- Matemática / Estadística
- Lengua / Comunicación
- Ciencias Naturales / Biología
- Informática / Tecnología
- Ciencias Sociales / Historia
- Arte / Diseño

**P5 — ¿Cuál es tu super poder?**
- 🎨 Soy creativo/a, se me ocurren ideas
- 📐 Soy ordenado/a, me gustan los detalles
- 🤝 Soy buena/o comunicándome con otros
- 🔍 Me gusta investigar y entender cómo funcionan las cosas
- ⚡ Me gusta hacer cosas rápido y resolver problemas

Botón: "Ver mi perfil vocacional →"

---

### PANTALLA 2C — Registro estudiante (Paso 3 de 3: Tu perfil)
Indicador de progreso: ●●●

**Resultado de orientación vocacional — card animada:**

Título: "¡Tu perfil está listo! 🚀"

Ejemplo de resultado según respuestas:
```
┌─────────────────────────────────────┐
│  🌊 PERFIL: GUARDIÁN PATAGÓNICO     │
│                                     │
│  Tus fortalezas:                    │
│  ✦ Conexión con el entorno natural  │
│  ✦ Trabajo en equipo                │
│  ✦ Pensamiento científico           │
│                                     │
│  Misiones recomendadas para vos:    │
│  🐳 Conservación ambiental          │
│  📊 Gestión de datos                │
│  🗺️ Atención al turista             │
└─────────────────────────────────────┘
```

Otros perfiles posibles según respuestas:
- 📱 **Creador Digital** → Marketing digital, contenido para redes
- 📊 **Analista de Datos** → Gestión de datos, administración
- 🐳 **Guardián Patagónico** → Conservación, ciencia ciudadana
- 🗺️ **Anfitrión Local** → Turismo, atención al visitante
- ⚡ **Organizador Maestro** → Logística, administración, reservas
- 🎨 **Comunicador Creativo** → Marketing, guías, diseño

Debajo del perfil:
- Barra de XP inicial: 0/500 · Nivel 1 · Explorador
- Botón grande: "¡Empezar a jugar! →"

---

### PANTALLA 3 — Home del estudiante (Mobile)
**Top bar:** logo Radar T + XP pill ("60 XP") + avatar inicial

**Card de bienvenida:**
```
¡Hola, [Nombre]! 🎒
Nivel 1 · Explorador Patagónico
[Barra XP: ████░░░░ 60/500]
```

**Sección "Misiones para vos"** (scroll horizontal de cards):
3 misiones recomendadas según el perfil vocacional

**Sección "Lo nuevo"**:
- Últimas 2 misiones publicadas

**Sección "Tu progreso"**:
- Badges desbloqueados (con candado en los no ganados)
- Próximo certificado a alcanzar

**Barra de navegación inferior (5 ítems):**
🏠 Inicio | 🎯 Misiones | 🏅 Logros | 👤 Perfil | 📩 Mensajes

---

### PANTALLA 4 — Tablero de misiones
**Filtros superiores (pills scrolleables):**
- Por estado: Todas · Abiertas · En curso · Completadas
- Por categoría: Todas · 🐳 Turista · 📊 Datos · 📱 Marketing
  · 🚚 Logística · 🌊 Conservación · 📋 Admin

**Cards de misiones (lista vertical):**

Cada card incluye:
- Borde izquierdo de color por categoría
- Nombre de la empresa
- Título de la misión (negrita)
- Categoría (pill de color)
- Estado (Abierta / En curso / Completada)
- Año recomendado + cupos disponibles
- XP que se ganan
- Tiempo desde publicación
- Flecha "Ver →"

**Datos hardcodeados (6 misiones de ejemplo):**

1. **Avistaje Patagonia SRL** · Atención al turista · Abierta
   "Guía digital multilingüe de avistaje de ballena sei"
   4to año · 2 cupos · +200 XP · Hace 2 días

2. **Hotel Costero Rada Tilly** · Marketing Digital · Abierta
   "Estrategia de redes sociales para temporada alta"
   5to año · 1 cupo · +220 XP · Hace 3 días

3. **Municipio Rada Tilly** · Gestión de Datos · En curso
   "Digitalización de registros de visitantes del parque"
   4to o 5to · 2/2 cupos · +180 XP · Hace 1 semana

4. **CONICET Patagonia** · Conservación Ambiental · Abierta
   "Asistente de registro GPS de avistajes de ballena sei"
   4to año · 3 cupos · +250 XP · Ayer

5. **Restaurante La Ballena** · Administración · Abierta
   "Sistema de reservas online para temporada"
   5to año · 1 cupo · +140 XP · Hace 5 días

6. **Agencia Turismo Comodoro** · Marketing Digital · Completada
   "Contenido para guía turística digital de Rada Tilly"
   3er año · 2/2 cupos · +220 XP · Completada

---

### PANTALLA 5 — Detalle de misión
**Encabezado:**
- Pill de categoría (color)
- Pill de estado
- Título grande
- Nombre de empresa

**Descripción completa** (2-3 párrafos)

**Grilla de info (2x2):**
- 🏫 Año recomendado
- 👥 Cupos (X/Y ocupados)
- 🏢 Organización
- ⏰ Publicado hace X días

**XP disponibles:** "+200 XP al completar"

**Botón principal:**
- Si abierta: "⚡ Tomar esta misión" (rosa/verde)
- Si tomada: "✅ Misión en curso"
- Si completada: "🔒 Misión cerrada"

Al presionar "Tomar esta misión":
- Micro-animación de confeti
- Toast: "+25 XP · ¡Misión tomada! Tu docente recibirá una notificación"
- Botón cambia a "✅ Misión en curso"

---

### PANTALLA 6 — Perfil del estudiante
**Header:**
- Avatar (emoji grande)
- Nombre + Año escolar
- Nivel + XP (barra animada)
- Perfil vocacional: "🌊 Guardián Patagónico"

**Sección "Mis misiones":**
- En curso (1 misión)
- Completadas (1 misión de demo)
- Postuladas (1 misión de demo)

**Sección "Mis certificados"** (ver Pantalla 7)

**Sección "Mi orientación vocacional":**
- Fortalezas detectadas (3 pills de colores)
- Áreas de interés (3 pills)
- Botón: "Ver mis sugerencias personalizadas"

---

### PANTALLA 7 — Certificados digitales
Título: "Tus logros 🏅"
Subtítulo: "Los certificados son reconocidos como horas de práctica profesionalizante"

**3 cards de certificado:**

**NIVEL 1 — Certificado de Participación 🌱**
Estado: [Desbloqueado / En progreso / Bloqueado]

Card si desbloqueado:
```
┌────────────────────────────────────┐
│  🌱 CERTIFICADO DE PARTICIPACIÓN  │
│  Radar T · Piloto 2026            │
│                                    │
│  Otorgado a: [Nombre Apellido]    │
│  Por completar: [Nombre misión]   │
│  Empresa: [Nombre empresa]        │
│  Fecha: [Fecha simulada]          │
│                                    │
│  Firmado por:                     │
│  🏫 E.E.S. N° 736                 │
│  🏢 [Empresa]                     │
│                                    │
│  [Botón: 📧 Enviar a mi mail]     │
│  [Botón: 📄 Ver certificado]      │
└────────────────────────────────────┘
```

Card si en progreso:
- Barra de avance: "██░░░ 60% completado"
- Requisitos faltantes con checkboxes

Card si bloqueado:
- Candado 🔒
- "Completá el Nivel 1 para desbloquear"

**NIVEL 2 — Certificado de Competencia ⭐**
- Requiere: Nivel 1 + evaluación positiva de la empresa
- Firmado por: Empresa + Escuela
- +500 XP al desbloquear

**NIVEL 3 — Aval Institucional 🏅**
- Requiere: Niveles 1 y 2 + resultado de impacto
- Firmado por: Empresa + Escuela + Municipio
- +800 XP · El logro máximo

**Nota legal visible:**
"Los certificados son reconocidos por el sistema educativo de la Provincia del
Chubut como horas válidas de práctica profesionalizante."

---

### PANTALLA 8 — Orientación vocacional (resultado completo)
Título: "Tu mapa de talentos 🗺️"

**Radar/telaraña visual (SVG simplificado) con 6 ejes:**
- Creatividad digital
- Análisis de datos
- Trabajo en equipo
- Conexión con el entorno
- Comunicación
- Organización y logística

**Sección "Tus fortalezas":**
3 cards con emoji, nombre de fortaleza, descripción corta

**Sección "Misiones que van con vos":**
3 cards de misiones recomendadas (mismo formato que tablero)

**Sección "¿Qué podrías estudiar después?":**
Pills de carreras/orientaciones:
- Turismo y Hotelería · Biología Marina · Marketing Digital
- Administración · Tecnología de la Información · Ciencias Ambientales

Nota: "Esta es una orientación exploratoria, no un test psicológico.
Sirve para ayudarte a descubrir qué te interesa."

---

### PANTALLA 9 — Interfaz empresa (Desktop/Web)
**Layout:** sidebar izquierdo + contenido principal

**Sidebar:**
- Logo Radar T
- Nombre de la empresa
- Menú: 🏠 Inicio · ➕ Nueva misión · 📋 Mis misiones · 👥 Postulantes · 📊 Estadísticas

**Panel principal — Vista "Mis misiones":**
Tabla con columnas: Título · Categoría · Estado · Postulantes · Cupos · Acciones

**Flujo "Publicar nueva misión" (2 pasos):**

Paso 1 — Elegí la categoría:
Grid de 6 cards de categorías (mismos colores INJUVE)
Cada una con ícono, nombre y descripción de un ejemplo

Paso 2 — Completá el desafío:
- Nombre de la empresa (pre-completo)
- Título del desafío
- Descripción (textarea)
- Año escolar recomendado (selector)
- Número de cupos (selector 1-5)
- Criterios de evaluación (textarea opcional)
- Botón: "Publicar misión ✅"

Confirmación:
- Modal de éxito: "¡Misión publicada! Ya está visible para los estudiantes.
  La escuela recibirá una notificación."

**Panel "Postulantes":**
Lista de estudiantes que tomaron una misión:
Nombre · Año · Perfil vocacional · Estado · Botón "Evaluar"

Modal de evaluación:
- Rating de 1-5 estrellas
- Checkbox: "Apruebo la emisión del Certificado de Competencia"
- Botón: "Confirmar evaluación"

---

### PANTALLA 10 — Panel docente
**Vista simplificada, enfocada en seguimiento:**

Header: Nombre docente · E.E.S. N° 736 · Materia/curso

**Sección "Misiones activas de mis alumnos":**
Lista con: Alumno · Misión · Empresa · Estado · Acción

**Acciones disponibles:**
- "Ver detalle"
- "Validar práctica" → abre modal con criterios pedagógicos
- "Marcar como completada"

Modal validación:
- Checkbox: "El alumno cumplió con los objetivos pedagógicos"
- Checkbox: "La práctica se realizó en el tiempo estipulado"
- Checkbox: "Apruebo la emisión del Certificado de Participación"
- Botón: "Firmar digitalmente (simulado)"

---

## 🎨 ESPECIFICACIONES DE DISEÑO

### Paleta de colores (estilo INJUVE Argentina)
```
--pink:    #E91B8C   (principal · botones CTA · logo)
--green:   #4BB543   (confirmaciones · nivel 1 · botón secundario)
--yellow:  #F7C022   (XP · nivel 2 · tarjetas de estudiante)
--blue:    #1B96D5   (datos · misiones de gestión)
--purple:  #9B59B6   (niveles de usuario · docentes)
--teal:    #1BBFBF   (conservación · estadísticas en vivo)

--white:   #FFFFFF   (fondo principal)
--offwhite:#F8F9FA   (fondo de secciones)
--dark:    #1A1A2E   (texto principal · footer)
--gray:    #6B7280   (texto secundario)
--border:  #EDEFF2   (bordes de cards)
```

Colores pastel (fondos de cards):
```
--pink-l:  #FDE8F4
--green-l: #E8F8E7
--yellow-l:#FEF8E3
--blue-l:  #E3F4FC
--purple-l:#F2EAF8
--teal-l:  #E3F8F8
```

### Tipografía
- **Display/Headings:** Nunito 900 (Google Fonts)
- **Body:** Nunito 600-700
- Tamaño mínimo: 12px

### Elementos de diseño
- Bordes redondeados: 16-22px en cards, 20px en botones
- Bordes de color sólido (2-3px) en todas las cards
- Barra arcoíris (4px) separando secciones importantes:
  `background: linear-gradient(90deg, #E91B8C, #F7C022, #4BB543, #1B96D5, #9B59B6)`
- Botones principales: efecto 3D con `box-shadow: 0 4px 0 [color-oscuro]`
  y `transform: translateY(3px)` al presionar
- Microanimaciones: confeti en logros, contador XP, barra de progreso animada
- Toast notifications para feedback de acciones

### Responsive
- **Mobile** (max-width: 430px): layout de una columna, nav inferior de 5 ítems
- **Desktop** (min-width: 1024px): layout con sidebar + contenido,
  grid de 2-3 columnas para cards

---

## 🔐 PRIVACIDAD Y MENORES DE EDAD

### Datos que se solicitan al estudiante (mínimos)
| Campo | Obligatorio | Sensible | Nota |
|-------|-------------|----------|------|
| Nombre y apellido | ✅ | No | Solo nombre de pila si prefieren |
| Año escolar | ✅ | No | Selector desplegable |
| Email (institucional o personal) | ✅ | Sí | Para envío de certificados |
| Perfil vocacional (intereses) | ✅ | No | No se comparte con empresas sin consentimiento |
| Contraseña | ✅ | Sí | Simulada en el prototipo |

### No se solicita
- DNI / número de documento
- Dirección
- Teléfono
- Foto de perfil (solo avatar emoji)
- Datos de los padres/tutores

### Textos de consentimiento (integrados en el registro)
```
AVISO PARA ESTUDIANTES (visible, no modal):
"Radar T es una plataforma educativa para estudiantes de 15 a 18 años.
- No compartimos tus datos personales con empresas sin tu consentimiento.
- Tu email solo se usa para enviarte certificados y notificaciones.
- Podés eliminar tu cuenta cuando quieras contactando a tu escuela.
- Si tenés dudas, podés preguntarle a tu docente o preceptor."

CHECKBOX obligatorio:
☐ "Leí y acepto las condiciones de uso de Radar T"
```

### Autenticación para el prototipo
- Login simulado: cualquier email + contraseña acepta el ingreso
- Roles diferenciados por la pantalla de selección inicial
- No hay tokens reales ni sesiones persistentes

---

## 🎮 SISTEMA DE GAMIFICACIÓN

### Niveles de estudiante
| Nivel | Nombre | XP requerido | Color |
|-------|--------|--------------|-------|
| 1 | Explorador Patagónico | 0–500 | Verde |
| 2 | Aventurero Costero | 500–1500 | Azul |
| 3 | Experto Local | 1500–3000 | Violeta |
| 4 | Pionero Patagónico | 3000+ | Dorado |

### XP por acción
| Acción | XP |
|--------|----|
| Completar registro | +50 |
| Completar cuestionario vocacional | +30 |
| Tomar una misión | +25 |
| Completar una misión | +150 |
| Recibir evaluación positiva de empresa | +200 |
| Obtener Certificado Nivel 1 | +300 |
| Obtener Certificado Nivel 2 | +500 |
| Obtener Aval Institucional | +800 |

### Badges del perfil vocacional
Según el resultado del cuestionario, el estudiante obtiene uno de estos perfiles:
- 📱 **Creador Digital** — Fortaleza en comunicación y creatividad
- 📊 **Analista de Datos** — Fortaleza en organización y análisis
- 🐳 **Guardián Patagónico** — Fortaleza en ciencia y entorno natural
- 🗺️ **Anfitrión Local** — Fortaleza en atención a personas y turismo
- ⚡ **Organizador Maestro** — Fortaleza en logística y coordinación
- 🎨 **Comunicador Creativo** — Fortaleza en diseño y narrativa

---

## 📋 DATOS HARDCODEADOS PARA EL PROTOTIPO

### Usuario demo — Estudiante
```javascript
const estudiantDemo = {
  nombre: "Valentina López",
  anio: "4to año",
  email: "vlopez@ees736.edu.ar",
  nivel: 1,
  xp: 75,
  perfil: "Guardián Patagónico",
  fortalezas: ["Conexión con el entorno", "Trabajo en equipo", "Análisis"],
  misionesEnCurso: [1],
  misionesCompletadas: [],
  certificados: { nivel1: "en-progreso", nivel2: "bloqueado", nivel3: "bloqueado" }
}
```

### Usuario demo — Empresa
```javascript
const empresaDemo = {
  nombre: "Avistaje Patagonia SRL",
  contacto: "María González",
  email: "mgonzalez@avistajepatagonia.com",
  misionesPublicadas: [1, 2],
  postulantes: 3
}
```

### Misiones (6 cards completas)
Ver descripción de Pantalla 4 — Tablero de misiones

---

## 🗂️ ESTRUCTURA DE ARCHIVOS SUGERIDA

```
radar-t/
├── index.html          ← Splash + selección de rol
├── registro.html       ← Flujo de registro estudiante (3 pasos)
├── home-estudiante.html ← Home mobile del estudiante
├── tablero.html        ← Tablero de misiones + detalle
├── perfil.html         ← Perfil + certificados + orientación vocacional
├── empresa.html        ← Dashboard empresa (desktop)
├── docente.html        ← Panel docente
└── styles.css          ← Estilos globales (variables INJUVE)
```

O bien: **todo en un solo archivo** `radar-t.html` con navegación
por `display: none / block` de secciones (recomendado para Antigravity).

---

## 💡 NOTAS PARA LA PRESENTACIÓN EN VIVO

El prototipo debe ser **demostrable en tiempo real** durante una presentación.
Las interacciones mínimas que deben funcionar:

1. **Splash → Selección de rol** (click en card Estudiante)
2. **Registro** → paso 1 (datos) → paso 2 (cuestionario) → paso 3 (perfil)
3. **Home** con XP animado y misiones recomendadas
4. **Tablero** → filtrar por categoría → ver detalle de misión → "Tomar misión"
   → toast de confirmación + XP sube
5. **Perfil** → ver certificados → nivel 1 en progreso con barra de avance
6. **Cambiar a rol Empresa** → publicar nueva misión en 2 pasos
7. El flujo completo debe poder hacerse en **menos de 3 minutos**

---

## 📌 TAGLINE Y COPY CLAVE

- **Hero:** "¿Listo para tu primera misión real?"
- **CTA principal:** "⚡ Ver misiones disponibles"
- **CTA secundario:** "🏅 Cómo ganar certificados"
- **Empresa:** "Publicá tu desafío en 2 clics"
- **Manifiesto:** "Hoy Rada Tilly ve irse al petróleo y descubre a la ballena sei.
  Radar T es la plataforma para que cualquier comunidad de Argentina logre
  que su escuela abrace su nuevo futuro económico."
- **Footer CTA:** "¿Tu comunidad también está en transición productiva?"

---

*Radar T · Piloto 2026 · Rada Tilly, Chubut, Argentina*
*Diseñado para escalar a toda Argentina*

---
---

# ✦ AMPLIACIÓN v2 — Nuevas funcionalidades y especificaciones

---

## 🔑 SISTEMA DE LOGIN SIMULADO PARA DEMO EN VIVO

El prototipo debe tener una pantalla de login real (con campos email + contraseña)
que acepte credenciales hardcodeadas. Al ingresar, el sistema detecta el rol
según el email y lleva directamente al home correspondiente.

### Credenciales de demo (hardcodeadas en el JS)

```javascript
const DEMO_USERS = [

  // ── ESTUDIANTES ──────────────────────────────────────────────
  {
    email: "valentina@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Valentina López",
    anio: "4to año",
    curso: "4°B",
    docente: "Prof. Martínez",
    nivel: 2,
    xp: 620,
    perfil: "Guardián Patagónico",
    misionesEnCurso: [4],        // CONICET Patagonia
    misionesCompletadas: [1],    // Avistaje Patagonia
    certificados: { nivel1: "desbloqueado", nivel2: "en-progreso", nivel3: "bloqueado" }
  },
  {
    email: "lucas@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Lucas Fernández",
    anio: "5to año",
    curso: "5°A",
    docente: "Prof. Martínez",
    nivel: 1,
    xp: 105,
    perfil: "Creador Digital",
    misionesEnCurso: [2],        // Hotel Costero — redes sociales
    misionesCompletadas: [],
    certificados: { nivel1: "en-progreso", nivel2: "bloqueado", nivel3: "bloqueado" }
  },
  {
    email: "sofia@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Sofía Reyes",
    anio: "3er año",
    curso: "3°C",
    docente: "Prof. García",
    nivel: 1,
    xp: 30,
    perfil: "Anfitriona Local",
    misionesEnCurso: [],
    misionesCompletadas: [],
    certificados: { nivel1: "bloqueado", nivel2: "bloqueado", nivel3: "bloqueado" }
  },

  // ── EMPRESAS ─────────────────────────────────────────────────
  {
    email: "empresa@avistajepatagonia.com",
    password: "radar123",
    rol: "empresa",
    nombre: "Avistaje Patagonia SRL",
    contacto: "María González",
    misionesPublicadas: [1, 4],
    postulantes: 3
  },
  {
    email: "empresa@hotelcostero.com",
    password: "radar123",
    rol: "empresa",
    nombre: "Hotel Costero Rada Tilly",
    contacto: "Roberto Díaz",
    misionesPublicadas: [2],
    postulantes: 1
  },

  // ── DOCENTES ─────────────────────────────────────────────────
  {
    email: "docente@ees736.edu.ar",
    password: "radar123",
    rol: "docente",
    nombre: "Prof. Laura Martínez",
    materia: "Economía y Administración",
    cursos: ["4°B", "5°A"],
    escuela: "E.E.S. N° 736 · Rada Tilly"
  },
  {
    email: "docente2@ees736.edu.ar",
    password: "radar123",
    rol: "docente",
    nombre: "Prof. Diego García",
    materia: "Ciencias Naturales",
    cursos: ["3°C", "3°D"],
    escuela: "E.E.S. N° 736 · Rada Tilly"
  }
]
```

### Pantalla de login

Diseño de la pantalla de inicio de sesión:

- Logo Radar T (multicolor) centrado arriba
- Título: "¡Bienvenido de vuelta! 👋"
- Campo: Email
- Campo: Contraseña (con ojito para mostrar/ocultar)
- Botón: "Ingresar →" (rosa, efecto 3D)
- Separador: "— o —"
- Botón outline: "Ingresar como invitado (demo)" → va directo al selector de rol
- Link abajo: "¿Primera vez? Registrate"

**Lógica de login simulado:**
```javascript
function handleLogin(email, password) {
  const user = DEMO_USERS.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    navigateTo(user.rol + '-home');  // estudiante-home / empresa-home / docente-home
  } else {
    showError("Email o contraseña incorrectos. Probá con las credenciales de demo.");
  }
}
```

**Hint visible en la pantalla de login para la presentación:**
```
💡 Para la demo, podés usar:
   Estudiante: valentina@ees736.edu.ar / radar123
   Empresa:    empresa@avistajepatagonia.com / radar123
   Docente:    docente@ees736.edu.ar / radar123
```
Este hint puede estar en un recuadro desplegable o directamente visible
durante la presentación para que el público lo pueda usar desde su celular.

---

## 🏫 NUEVAS PANTALLAS — INSCRIPCIÓN A CLASE Y SEGUIMIENTO DOCENTE

### PANTALLA NUEVA A — Inscripción a curso (estudiante, durante registro)

Se agrega como **Paso 1.5** entre el formulario de datos y el cuestionario vocacional.

Título: "¿A qué clase pertenecés? 🏫"
Subtítulo: "Así tu docente puede ver tu progreso y acompañarte"

**Selector de clase:**
- Desplegable o cards clickeables:
  - 3°A · 3°B · 3°C · 3°D
  - 4°A · 4°B · 4°C
  - 5°A · 5°B

**Al seleccionar:**
- Aparece el nombre del docente asignado a ese curso:
  "👩‍🏫 Tu docente es: Prof. Laura Martínez"
- Mensaje: "Una vez que te registres, la Prof. Martínez podrá ver tus misiones
  y ayudarte con tu práctica."

**Checkbox opcional:**
☐ "Autorizo a mi docente a ver mis misiones y certificados en Radar T"
(pre-tildado, con posibilidad de destildar)

---

### PANTALLA NUEVA B — Dashboard docente expandido

Esta pantalla reemplaza y amplía la Pantalla 10 anterior.

**Layout desktop (sidebar + contenido):**
- Sidebar: logo · nombre docente · cursos (tabs) · métricas globales

**Tab 1 — Mi clase (vista por curso)**

Selector de curso activo: `[4°B ▼]` | `[5°A ▼]`

Tabla de estudiantes del curso con columnas:
| Estudiante | Perfil vocacional | Misión activa | Estado | XP | Certificado | Acción |
|------------|------------------|---------------|--------|----|-------------|--------|
| Valentina L. | 🐳 Guardián | CONICET · GPS | En curso | 620 | Nivel 1 ✅ | Ver |
| Lucas F. | 📱 Creador | Hotel · Redes | En curso | 105 | En progreso | Ver |
| Mateo G. | 📊 Analista | Sin misión | — | 0 | — | Asignar |

Al hacer clic en "Ver":
- Panel lateral con perfil completo del alumno
- Historial de misiones
- Notas del docente (campo de texto simulado)
- Botón: "Validar práctica"

Al hacer clic en "Asignar":
- Modal con misiones abiertas que encajan con el perfil del alumno
- Botón: "Sugerir esta misión al alumno"

**Tab 2 — Intereses del aula**

Visualización agregada de los perfiles vocacionales del curso:

```
Distribución de perfiles en 4°B:
🐳 Guardián Patagónico    ████████  8 alumnos
📱 Creador Digital         ██████    6 alumnos
📊 Analista de Datos       ████      4 alumnos
🗺️ Anfitrión Local         ███       3 alumnos
⚡ Organizador Maestro     ██        2 alumnos
🎨 Comunicador Creativo    ██        2 alumnos
```

Insight automático (hardcodeado):
```
💡 Tu clase tiene un fuerte interés en conservación y datos.
   Hay 3 misiones abiertas del CONICET y Municipio que encajan
   perfectamente con este perfil.
```

Botón: "Ver misiones sugeridas para mi clase →"

**Tab 3 — Cronograma de prácticas**

Vista de calendario o línea de tiempo con:
- Fecha de inicio de cada misión activa
- Fecha límite estimada de entrega
- Estado actual (semáforo: verde/amarillo/rojo)
- Alertas de vencimiento próximo

Tabla de plazos:
| Alumno | Misión | Inicio | Fecha límite | Días restantes | Estado |
|--------|--------|--------|--------------|----------------|--------|
| Valentina L. | CONICET · GPS | 15/05 | 30/06 | 18 días | 🟢 En tiempo |
| Lucas F. | Hotel · Redes | 20/05 | 25/06 | 13 días | 🟡 Revisar |
| Emilia R. | Municipio | 10/05 | 15/06 | 3 días | 🔴 Urgente |

**Notificación de alerta** (toast automático al entrar):
"⚠️ Emilia Rodríguez tiene 3 días para entregar su práctica en el Municipio.
   Podés contactarla desde su perfil."

**Tab 4 — Validaciones pendientes**

Lista de prácticas que esperan la firma del docente:
- Card por alumno + misión
- Criterios pedagógicos checklist
- Botón "Firmar y certificar"

---

## 🗺️ ESTRATEGIA DE PRESENTACIÓN EN VIVO — QR Y ACCESO INMEDIATO

### Concepto: "Ingresá ahora desde tu celular"

Durante la presentación, proyectar en pantalla grande:

```
┌──────────────────────────────────────────┐
│                                          │
│         📡 PROBÁ RADAR T                 │
│         en tu celular ahora              │
│                                          │
│    ┌──────────────────────────────┐      │
│    │  [QR CODE aquí — enlace al  │      │
│    │   archivo HTML hosteado     │      │
│    │   en GitHub Pages o similar]│      │
│    └──────────────────────────────┘      │
│                                          │
│    O entrá a:  radart.vercel.app         │
│                                          │
│    Usuario de prueba:                    │
│    📧  valentina@ees736.edu.ar           │
│    🔑  radar123                          │
│                                          │
└──────────────────────────────────────────┘
```

### Opciones de hosting gratuito para el prototipo

| Opción | Cómo | URL resultante | QR |
|--------|------|----------------|----|
| **GitHub Pages** | Subir HTML a repo público | `usuario.github.io/radart` | Generar con qr-code-generator.com |
| **Vercel** | Drag & drop del archivo | `radart.vercel.app` | Generar con el mismo sitio |
| **Netlify Drop** | Drag & drop | `radart.netlify.app` | Generar con el mismo sitio |
| **Glitch** | Pegar el código | `radart.glitch.me` | Generar con qr-code-generator.com |

**Recomendación:** Vercel o Netlify Drop. En 2 minutos el archivo HTML
está online con URL memorable y el QR se genera en 30 segundos.

### Dinámica de presentación sugerida (5 minutos)

1. **Min 0-1:** Mostrar QR en pantalla · "Escaneen esto con su celular"
2. **Min 1-2:** Guiar el login → "Usen valentina@ees736.edu.ar / radar123"
3. **Min 2-3:** Navegar juntos: Home → Tablero → Tomar una misión
4. **Min 3-4:** Ver los certificados y el perfil vocacional
5. **Min 4-5:** Cambiar a rol Empresa y publicar una misión demo

---

## ❓ "¿POR QUÉ EXISTE RADAR T?" — Copy por rol

Cada rol tiene su propia pantalla de valor propuesto. Se muestra:
- Al seleccionar el rol antes del registro
- Como sección "Acerca de" accesible desde el menú

### Para EMPRESAS — lenguaje de beneficio y ROI

**Título:** "Resolvé problemas reales con talento local 🚀"

**Subtítulo:** "Sin burocracia, sin costos de selección, con impacto en tu comunidad."

**¿Qué te permite Radar T?**

```
✅ Publicar un desafío en 2 clics
   Elegís la categoría (Marketing, Datos, Turismo...) y describís
   tu necesidad. Sin intermediarios, sin formularios interminables.

✅ Acceder a talento joven formado para tu nueva economía
   No son pasantes genéricos. Son estudiantes de Rada Tilly que
   conocen el territorio, entienden el contexto y quieren quedarse.

✅ Cero costo de reclutamiento
   La escuela valida y asigna. Vos evaluás el resultado y firmás
   el certificado. Nada más.

✅ Responsabilidad social con retorno concreto
   Cada empresa que participa aparece en el perfil del estudiante
   como parte de su formación. Tu marca queda asociada al
   futuro de Rada Tilly.

✅ Lo que las empresas están logrando con Radar T:
   — Avistaje Patagonia SRL creó su guía digital en 3 semanas
   — Hotel Costero duplicó su engagement en redes durante la temporada
   — CONICET tiene sus primeros datos GPS de ballena sei registrados
     por estudiantes locales
```

**CTA:** "Publicar mi primera misión →"

---

### Para ESTUDIANTES — lenguaje de posibilidad y futuro propio

**Título:** "Tu futuro está acá, no en otro lado 🐳"

**Subtítulo:** "Antes de terminar el colegio, podés tener experiencia real,
un certificado y saber qué querés ser."

**¿Qué te da Radar T?**

```
🎒 Tu primera experiencia laboral real
   No una simulación. Un desafío real de una empresa de tu ciudad
   que necesita lo que vos podés hacer.

🗺️ Descubrís qué se te da bien
   El cuestionario de orientación vocacional no es un test aburrido.
   Es un mapa de tus fortalezas que te ayuda a elegir qué misión
   tomar y qué camino seguir después.

🏅 Un certificado que vale
   Firmado por la empresa, la escuela y el municipio. Reconocido
   como horas de práctica profesionalizante por la provincia del Chubut.
   Algo concreto para mostrar cuando salgas al mundo laboral.

⚡ XP, niveles y badges
   Cada misión que completás suma experiencia y te sube de nivel.
   Explorador → Aventurero → Experto → Pionero Patagónico.

🌱 Lo que la plataforma te ofrece además de misiones:
   — Sugerencias de carrera basadas en tus intereses
   — Cursos y recursos que las empresas comparten con los alumnos
   — Conexión directa con los negocios de tu territorio
   — Un perfil profesional desde los 16 años
```

**CTA:** "Encontrá tu primera misión →"

---

### Para DOCENTES — lenguaje de acompañamiento y herramienta pedagógica

**Título:** "Acompañá las prácticas de tus alumnos con información real 📋"

**Subtítulo:** "Radar T no reemplaza tu rol. Lo potencia."

**¿Qué te permite Radar T?**

```
👥 Ver el progreso de toda tu clase en un solo lugar
   Estado de cada misión, XP acumulado, certificados obtenidos
   y alertas de plazos próximos a vencer.

🔍 Conocer los intereses reales de tus alumnos
   El cuestionario vocacional genera un mapa de perfiles de tu clase
   que podés usar para orientar proyectos, grupos de trabajo
   y conversaciones sobre el futuro.

📅 Gestionar los tiempos de las prácticas
   Calendario de entregas, alertas automáticas y seguimiento
   individualizado sin papeles ni planillas manuales.

✍️ Firmar y validar de forma simple
   Con un clic certificás que el alumno cumplió con los objetivos
   pedagógicos. El certificado se emite automáticamente.

🏫 Conectar el aula con la nueva economía del territorio
   Tus alumnos no hacen "tareas". Resuelven problemas reales de
   empresas locales. Vos sos quien los acompaña en ese proceso.

💡 Lo que Radar T te da como institución:
   — Trazabilidad completa de las prácticas profesionalizantes
   — Evidencia concreta del vínculo escuela-empresa
   — Datos sobre intereses vocacionales de cada cohorte
   — Herramienta de presentación ante la supervisión educativa
```

**CTA:** "Ver el panel de mi clase →"

---

## 📈 CONSIDERACIONES DE ESCALABILIDAD

Esta sección debe aparecer en la app como pantalla "Acerca de Radar T"
o en el footer de la versión web, visible para todos los roles.

### ¿Por qué Radar T puede escalar?

**1. El modelo es replicable sin costo de adaptación**
Cada nueva comunidad solo necesita:
- Cargar sus empresas locales
- Registrar su escuela y docentes
- Activar las categorías de desafíos relevantes para su economía

**2. Las categorías son modulares**
Una comunidad minera en Neuquén activa "Gestión de Recursos Naturales"
y "Logística Industrial". Un pueblo pesquero en Santa Cruz activa
"Procesamiento de Datos de Captura" y "Marketing de Producto Local".
El núcleo de la plataforma es siempre el mismo.

**3. El sistema de certificación es estándar nacional**
El marco de Práctica Profesionalizante (Res. CFE 261/06) aplica en todas
las provincias argentinas. El certificado de Radar T tiene base legal
en todo el país sin necesidad de adaptación normativa.

**4. El costo de replicación es mínimo**
- No requiere desarrollo técnico por localidad
- Un docente coordinador + acceso a internet es suficiente
- Las empresas se auto-registran y publican sin soporte

**5. Datos que generan valor a escala**
A medida que crece la red, Radar T puede ofrecer:
- Mapa nacional de reconversiones productivas
- Tendencias de intereses vocacionales por región
- Red de certificación reconocida a nivel federal
- Banco de misiones reutilizables entre comunidades similares

### Comunidades target para expansión (hardcodeadas en la pantalla de escala)

```javascript
const comunidadesTarget = [
  { nombre: "Rada Tilly", provincia: "Chubut", sector: "Turismo de ballenas", estado: "activo" },
  { nombre: "Malargüe", provincia: "Mendoza", sector: "Minería en transición", estado: "proyectado" },
  { nombre: "Rufino", provincia: "Santa Fe", sector: "Agroindustria", estado: "proyectado" },
  { nombre: "Tres Arroyos", provincia: "Buenos Aires", sector: "Agro + turismo rural", estado: "proyectado" },
  { nombre: "San Martín de los Andes", provincia: "Neuquén", sector: "Turismo de aventura", estado: "proyectado" },
  { nombre: "Gálvez", provincia: "Santa Fe", sector: "Reconversión industrial", estado: "proyectado" },
  { nombre: "Puerto Madryn", provincia: "Chubut", sector: "Ecoturismo costero", estado: "proyectado" },
]
```

---

## 🔄 PROMPT ACTUALIZADO PARA ANTIGRAVITY (versión completa v2)

Reemplazar el prompt original por este:

```
Estamos desarrollando un prototipo de nuestra solución.

Desarrolla una aplicación de CONEXIÓN PRODUCTIVA LOCAL llamada "Radar T"
para ESTUDIANTES DE ESCUELA SECUNDARIA (15-17 años), EMPRESAS/EMPRENDEDORES
LOCALES y DOCENTES de Rada Tilly, Chubut.

El objetivo es conectar desafíos reales de empresas locales con estudiantes
que los resuelven como práctica profesionalizante, con sistema de certificación
digital tripartito, orientación vocacional, seguimiento docente y acceso
demostrablemente funcional en presentaciones en vivo.

La app debe cumplir con las siguientes funcionalidades:

1.  Splash screen animado con logo multicolor y botón "Entrar"
2.  Pantalla de login simulado con campos email + contraseña.
    Credenciales hardcodeadas para 3 roles:
    · Estudiante: valentina@ees736.edu.ar / radar123
    · Empresa:    empresa@avistajepatagonia.com / radar123
    · Docente:    docente@ees736.edu.ar / radar123
    Mostrar hint con credenciales visible para uso en demo.
    También permitir "Ingresar como invitado" que lleva al selector de rol.
3.  Pantalla "¿Por qué Radar T?" con copy diferenciado por rol:
    · Empresas: beneficios, ROI, cero fricción, impacto local
    · Estudiantes: orientación vocacional, experiencia real, certificados
    · Docentes: seguimiento, intereses del aula, gestión de plazos
4.  Registro de estudiante en 4 pasos:
    · Paso 1: datos básicos + aviso de privacidad para menores + checkbox
    · Paso 1.5: inscripción a curso (selector de clase + nombre del docente)
    · Paso 2: cuestionario de orientación vocacional (5 preguntas con íconos)
    · Paso 3: resultado del perfil vocacional animado + XP iniciales
5.  Registro de empresa: nombre, rubro, contacto, descripción en 2 pasos
6.  Home del estudiante (mobile): bienvenida con XP + nivel gamificado,
    misiones recomendadas según perfil, sección "lo nuevo", badges
7.  Tablero de misiones: filtros por categoría y estado, 6 cards con datos
    completos, botón "Tomar misión" con toast + XP animado
8.  Detalle de misión: descripción, empresa, datos, XP disponible,
    botón de postulación con microanimación de confirmación
9.  Perfil del estudiante: nivel, XP, perfil vocacional, misiones activas,
    certificados, recomendaciones de carrera
10. Sistema de certificados (3 niveles): visualización de estado, requisitos
    de cada nivel, XP por desbloquear, pantalla de certificado emitido
    con nombres de la empresa y escuela firmantes
11. Dashboard empresa (desktop): sidebar + publicación de misión en 2 pasos,
    tablero de postulantes, botón de evaluación y firma de certificado
12. Dashboard docente (desktop): 4 tabs:
    · Tab 1: Mi clase (tabla de alumnos con estado de misiones y XP)
    · Tab 2: Intereses del aula (gráfico de perfiles vocacionales del curso)
    · Tab 3: Cronograma de prácticas (plazos, semáforo de estado, alertas)
    · Tab 4: Validaciones pendientes (firma de prácticas completadas)
13. Pantalla "¿Por qué Radar T escala?" con mapa de comunidades target
    y módulos de expansión

MUY IMPORTANTE: Este es un prototipo visual, NO una app real.
- Usá solo HTML, CSS y JavaScript vanilla. Sin backend, sin base de datos.
- Los datos deben ser hardcodeados o simulados con los valores provistos.
- Priorizá que se vea bien, sea clickeable y funcione en presentación en vivo.
- Todo en un solo archivo HTML con navegación por show/hide de secciones.
- No instales librerías pesadas. Podés usar Tailwind CDN o Google Fonts.
- Funcionar en celular (max-width: 430px) Y en desktop (min-width: 1024px).
- Estilo visual: INJUVE Argentina — fondo blanco, colores vibrantes multicolor
  (rosa #E91B8C, verde #4BB543, amarillo #F7C022, azul #1B96D5,
  violeta #9B59B6, teal #1BBFBF), tipografía Nunito redondeada,
  bordes de colores en cards, botones con efecto 3D, barras arcoíris.
- Gamificación: XP visible en todo momento, toasts de feedback,
  barras de progreso animadas, badges desbloqueables.
```

---

## 📊 DATOS HARDCODEADOS COMPLETOS v2

### Todos los usuarios demo

Ver sección "Sistema de Login Simulado" arriba (DEMO_USERS array completo)

### Docente — cursos y alumnos

```javascript
const CURSOS = {
  "4°B": {
    docente: "Prof. Laura Martínez",
    alumnos: [
      { nombre: "Valentina López",  perfil: "Guardián Patagónico", xp: 620, mision: "CONICET · GPS",   estado: "En curso",   cert1: true  },
      { nombre: "Lucas Fernández",  perfil: "Creador Digital",     xp: 105, mision: "Hotel · Redes",   estado: "En curso",   cert1: false },
      { nombre: "Emilia Rodríguez", perfil: "Anfitriona Local",    xp: 320, mision: "Municipio · Datos", estado: "⚠️ Urgente", cert1: true  },
      { nombre: "Mateo González",   perfil: "Analista de Datos",   xp: 0,   mision: "Sin misión",      estado: "—",          cert1: false },
      { nombre: "Camila Torres",    perfil: "Creadora Digital",    xp: 75,  mision: "Agencia · Guía",  estado: "En curso",   cert1: false },
    ],
    distribucionPerfiles: {
      "Guardián Patagónico": 8,
      "Creador Digital": 6,
      "Analista de Datos": 4,
      "Anfitrión Local": 3,
      "Organizador Maestro": 2,
      "Comunicador Creativo": 2
    }
  },
  "5°A": {
    docente: "Prof. Laura Martínez",
    alumnos: [
      { nombre: "Lucas Fernández",   perfil: "Creador Digital",     xp: 105, mision: "Hotel · Redes",  estado: "En curso",  cert1: false },
      { nombre: "Pilar Méndez",      perfil: "Organizadora Maestra",xp: 450, mision: "Restaurante · Reservas", estado: "En curso", cert1: true },
      { nombre: "Franco Ibáñez",     perfil: "Guardián Patagónico", xp: 800, mision: "CONICET · GPS",  estado: "Completada", cert1: true },
    ]
  }
}
```

### Cronograma de prácticas (para el tab docente)

```javascript
const CRONOGRAMA = [
  { alumno: "Valentina López",  mision: "CONICET · Registro GPS",   inicio: "15/05/2026", limite: "30/06/2026", diasRestantes: 18, estado: "verde"   },
  { alumno: "Lucas Fernández",  mision: "Hotel Costero · Redes",    inicio: "20/05/2026", limite: "25/06/2026", diasRestantes: 13, estado: "amarillo" },
  { alumno: "Emilia Rodríguez", mision: "Municipio · Digitalización", inicio: "10/05/2026", limite: "15/06/2026", diasRestantes: 3, estado: "rojo"    },
  { alumno: "Camila Torres",    mision: "Agencia · Guía turística", inicio: "22/05/2026", limite: "05/07/2026", diasRestantes: 23, estado: "verde"   },
  { alumno: "Pilar Méndez",     mision: "Restaurante · Reservas",   inicio: "18/05/2026", limite: "20/06/2026", diasRestantes: 8, estado: "amarillo" },
]
```

---

## 💡 NOTAS PARA LA PRESENTACIÓN EN VIVO (v2 actualizada)

### Flujo demo de 5 minutos — guión sugerido

**Minuto 0:** Proyectar el QR en pantalla grande
> "Escaneen esto. Los lleva directo a Radar T. Usen el mail de Valentina
> y la contraseña radar123 para entrar como estudiante."

**Minuto 1:** El público entra en sus celulares · Login con credenciales demo
> "Esto es lo que ve un estudiante de 4to año de la E.E.S. 736 de Rada Tilly
> cuando abre la app por primera vez."

**Minuto 2:** Navegar el Home del estudiante · Ver misiones recomendadas
> "El sistema ya sabe que Valentina es una Guardián Patagónica y le sugiere
> las misiones del CONICET y el Municipio."

**Minuto 3:** Ir al tablero · Filtrar por categoría · Abrir detalle de CONICET
> "Tocá 'Tomar esta misión'. Ven cómo sube el XP."

**Minuto 4:** Ir al perfil · Ver el certificado nivel 1 desbloqueado
> "Este certificado está firmado digitalmente por el CONICET y la escuela.
> Es reconocido como práctica profesionalizante en toda la provincia."

**Minuto 5 (opcional):** Cambiar a rol Empresa · Publicar una misión en 2 clics
> "Ahora les muestro lo que ve la empresa. Dos clics y la misión está publicada."

### Puntos de interacción que el público puede explorar solo

1. El login con credenciales de los 3 roles
2. El cuestionario vocacional y ver qué perfil les sale
3. Filtrar el tablero de misiones por categoría
4. Tomar una misión y ver el toast de XP
5. Ver los 3 niveles de certificado y qué se necesita para cada uno
6. (Empresa) Publicar una misión nueva
7. (Docente) Ver el cronograma con semáforos de alerta

---

*Radar T · Piloto 2026 · Rada Tilly, Chubut, Argentina*
*Versión del documento: v2 — Ampliado para presentación en vivo con Antigravity*
