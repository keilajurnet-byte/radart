export type ChallengeCategory =
  | "Gestión de Datos"
  | "Atención al Turista"
  | "Logística"
  | "Marketing Digital"
  | "Conservación Ambiental";

export type ChallengeStatus = "Abierta" | "En curso" | "Completada";

export type GradeLevel = "1° Año" | "2° Año" | "3° Año" | "4° Año" | "5° Año";

export interface Challenge {
  id: string | number;
  companyName: string;
  category: ChallengeCategory;
  title: string;
  description: string;
  status: ChallengeStatus;
  gradeLevel: GradeLevel | string;
  createdAt: string;
  slots: number;
  xpReward: number;
  difficulty: "Fácil" | "Medio" | "Difícil" | string;
  duration: string;
  studentName?: string;
  studentEmail?: string;
  evaluation?: {
    grade: string;
    comment: string;
    approvedAt: string;
  };
  validatedByTeacher?: boolean;
  shift?: string[]; // ["Mañana", "Tarde", "Noche", "Fin de semana"]
  hoursPerWeek?: string; // "1-3 horas", "3-5 horas", "5+ horas"
  
  // Enriched detail fields
  problema?: string;
  resultadoEsperado?: string;
  modalidadEntrega?: string;
  etapas?: { titulo: string; plazo: string }[];
  recursosCompartidos?: boolean;
  criteriosEvaluacion?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

export interface UserProfile {
  email: string;
  password?: string;
  rol: "estudiante" | "empresa" | "docente";
  nombre: string;
  anio?: string;
  curso?: string;
  docente?: string;
  nivel?: number;
  xp?: number;
  perfil?: string;
  misionesEnCurso?: number[];
  misionesCompletadas?: number[];
  certificados?: {
    nivel1: "bloqueado" | "en-progreso" | "desbloqueado";
    nivel2: "bloqueado" | "en-progreso" | "desbloqueado";
    nivel3: "bloqueado" | "en-progreso" | "desbloqueado";
  };
  fortalezas?: string[];
  intereses?: string[];
  respuestasQuiz?: number[];
  notasDocente?: string;
  contacto?: string;
  materia?: string;
  cursos?: string[];
  escuela?: string;
  
  // Availability fields
  disponibilidad?: string[]; // ["Mañana", "Tarde", "Noche", "Fin de semana"]
  horasSemanales?: string; // "1-3 horas", "3-5 horas", "5+ horas"
  
  // Soft skills progress
  habilidadesBlandasCompletadas?: Record<string, number>; // { oratoria: 1, conflictos: 2 }
  ddjjFile?: string;
  ddjjValidada?: boolean;
  linkedinVinculado?: boolean;
}

export const INITIAL_USERS: UserProfile[] = [
  {
    email: "valentina@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Valentina López",
    anio: "4to año",
    curso: "4°B",
    docente: "Prof. Laura Martínez",
    nivel: 2,
    xp: 620,
    perfil: "Guardián Patagónico",
    misionesEnCurso: [4],
    misionesCompletadas: [1],
    certificados: { nivel1: "desbloqueado", nivel2: "en-progreso", nivel3: "bloqueado" },
    fortalezas: ["Conexión con el entorno", "Trabajo en equipo", "Pensamiento científico"],
    intereses: ["Naturaleza", "Biología", "Turismo ecológico"],
    respuestasQuiz: [2, 1, 2, 2, 3],
    notasDocente: "Valentina muestra un excelente desempeño en su práctica con el CONICET. Está muy entusiasmada con la georreferenciación y entrega todas sus bitácoras digitales a tiempo.",
    disponibilidad: ["Tarde", "Fin de semana"],
    horasSemanales: "3-5 horas",
    habilidadesBlandasCompletadas: { oratoria: 1 },
    ddjjFile: "DDJJ_firmada_Lopez.pdf",
    ddjjValidada: true,
    linkedinVinculado: false
  },
  {
    email: "lucas@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Lucas Fernández",
    anio: "5to año",
    curso: "5°A",
    docente: "Prof. Laura Martínez",
    nivel: 1,
    xp: 105,
    perfil: "Creador Digital",
    misionesEnCurso: [2],
    misionesCompletadas: [],
    certificados: { nivel1: "en-progreso", nivel2: "bloqueado", nivel3: "bloqueado" },
    fortalezas: ["Creatividad", "Comunicación", "Tecnología"],
    intereses: ["Redes Sociales", "Diseño", "Marketing"],
    respuestasQuiz: [0, 0, 3, 1, 2],
    notasDocente: "Lucas necesita apoyo para terminar su plan de contenidos en redes, pero es muy creativo en las entregas digitales.",
    disponibilidad: ["Mañana", "Tarde"],
    horasSemanales: "1-3 horas",
    habilidadesBlandasCompletadas: {}
  },
  {
    email: "sofia@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Sofía Reyes",
    anio: "3er año",
    curso: "3°C",
    docente: "Prof. Diego García",
    nivel: 1,
    xp: 30,
    perfil: "Anfitrión Local",
    misionesEnCurso: [],
    misionesCompletadas: [],
    certificados: { nivel1: "bloqueado", nivel2: "bloqueado", nivel3: "bloqueado" },
    fortalezas: ["Atención al visitante", "Comunicación", "Empatía"],
    intereses: ["Turismo", "Idiomas", "Atención"],
    respuestasQuiz: [3, 2, 4, 4, 2],
    notasDocente: "",
    disponibilidad: ["Tarde"],
    horasSemanales: "3-5 horas",
    habilidadesBlandasCompletadas: {}
  },
  {
    email: "emilia@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Emilia Rodríguez",
    anio: "4to año",
    curso: "4°B",
    docente: "Prof. Laura Martínez",
    nivel: 1,
    xp: 320,
    perfil: "Anfitriona Local",
    misionesEnCurso: [3],
    misionesCompletadas: [],
    certificados: { nivel1: "en-progreso", nivel2: "bloqueado", nivel3: "bloqueado" },
    fortalezas: ["Atención", "Comunicación", "Resolución de problemas"],
    intereses: ["Gestión", "Turismo", "Administración"],
    respuestasQuiz: [3, 2, 4, 4, 2],
    notasDocente: "Atención: La práctica vence pronto. Estar atento al reporte de digitalización de registros.",
    disponibilidad: ["Mañana", "Fin de semana"],
    horasSemanales: "3-5 horas",
    habilidadesBlandasCompletadas: {},
    ddjjFile: "DDJJ_Emilia_Firmada.png",
    ddjjValidada: false,
    linkedinVinculado: false
  },
  {
    email: "mateo@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Mateo González",
    anio: "4to año",
    curso: "4°B",
    docente: "Prof. Laura Martínez",
    nivel: 1,
    xp: 0,
    perfil: "Analista de Datos",
    misionesEnCurso: [],
    misionesCompletadas: [],
    certificados: { nivel1: "bloqueado", nivel2: "bloqueado", nivel3: "bloqueado" },
    fortalezas: ["Análisis lógico", "Organización", "Precisión"],
    intereses: ["Matemáticas", "Sistemas", "Finanzas"],
    respuestasQuiz: [1, 4, 1, 0, 1],
    notasDocente: "Pendiente de elegir misión inicial en el tablero.",
    disponibilidad: ["Tarde"],
    horasSemanales: "1-3 horas",
    habilidadesBlandasCompletadas: {}
  },
  {
    email: "camila@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Camila Torres",
    anio: "4to año",
    curso: "4°B",
    docente: "Prof. Laura Martínez",
    nivel: 1,
    xp: 75,
    perfil: "Creador Digital",
    misionesEnCurso: [6],
    misionesCompletadas: [],
    certificados: { nivel1: "en-progreso", nivel2: "bloqueado", nivel3: "bloqueado" },
    fortalezas: ["Creatividad", "Diseño", "Innovación"],
    intereses: ["Redes", "Diseño de Guías", "Fotografía"],
    respuestasQuiz: [0, 0, 3, 5, 0],
    notasDocente: "Avanzando en la redacción de contenidos digitales.",
    disponibilidad: ["Tarde", "Noche"],
    horasSemanales: "3-5 horas",
    habilidadesBlandasCompletadas: {}
  },
  {
    email: "pilar@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Pilar Méndez",
    anio: "5to año",
    curso: "5°A",
    docente: "Prof. Laura Martínez",
    nivel: 1,
    xp: 450,
    perfil: "Organizadora Maestra",
    misionesEnCurso: [5],
    misionesCompletadas: [],
    certificados: { nivel1: "en-progreso", nivel2: "bloqueado", nivel3: "bloqueado" },
    fortalezas: ["Planificación", "Coordinación", "Logística"],
    intereses: ["Administración", "Eventos", "Sistemas de Reservas"],
    respuestasQuiz: [4, 3, 0, 3, 4],
    notasDocente: "Trabajando en el sistema de reservas web.",
    disponibilidad: ["Noche", "Fin de semana"],
    horasSemanales: "3-5 horas",
    habilidadesBlandasCompletadas: {}
  },
  {
    email: "franco@ees736.edu.ar",
    password: "radar123",
    rol: "estudiante",
    nombre: "Franco Ibáñez",
    anio: "5to año",
    curso: "5°A",
    docente: "Prof. Laura Martínez",
    nivel: 2,
    xp: 800,
    perfil: "Guardián Patagónico",
    misionesEnCurso: [],
    misionesCompletadas: [4],
    certificados: { nivel1: "desbloqueado", nivel2: "desbloqueado", nivel3: "bloqueado" },
    fortalezas: ["Ciencia", "Trabajo de Campo", "Ecología"],
    intereses: ["Naturaleza", "Biología", "Georreferenciación"],
    respuestasQuiz: [2, 1, 2, 2, 3],
    notasDocente: "Excelente participación en la campaña digital de avistajes.",
    disponibilidad: ["Tarde"],
    horasSemanales: "5+ horas",
    habilidadesBlandasCompletadas: {}
  },
  // Companies
  {
    email: "empresa@avistajepatagonia.com",
    password: "radar123",
    rol: "empresa",
    nombre: "Avistaje Patagonia SRL",
    contacto: "María González"
  },
  {
    email: "empresa@hotelcostero.com",
    password: "radar123",
    rol: "empresa",
    nombre: "Hotel Costero Rada Tilly",
    contacto: "Roberto Díaz"
  },
  // Teachers
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
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 1,
    companyName: "Avistaje Patagonia SRL",
    title: "Guía digital multilingüe de avistaje de ballena sei",
    category: "Atención al Turista",
    gradeLevel: "4° Año",
    slots: 2,
    xpReward: 200,
    status: "Abierta",
    createdAt: "Hace 2 días",
    difficulty: "Medio",
    duration: "2 semanas",
    description: "Desarrollo de una guía digital interactiva para turistas en español, inglés y portugués, enfocada en la observación responsable de la ballena sei en las costas de Rada Tilly. La guía debe incluir fichas técnicas de la especie, mapa de avistajes y recomendaciones ambientales.",
    shift: ["Mañana", "Tarde"],
    hoursPerWeek: "3-5 horas",
    problema: "No tenemos forma de mostrar nuestra oferta turística de avistajes de manera interactiva a extranjeros. Las guías impresas actuales son costosas e inflexibles, y los turistas que no hablan español se pierden información clave sobre la ballena sei.",
    resultadoEsperado: "Un documento PDF interactivo o una presentación en diapositivas con la guía redactada en los tres idiomas, mapas con coordenadas de referencia e itinerarios sugeridos.",
    modalidadEntrega: "Presentación (slides) subida a la plataforma",
    etapas: [
      { titulo: "Investigación y recopilación de fichas biológicas", plazo: "Semana 1" },
      { titulo: "Traducción de textos e itinerarios sugeridos", plazo: "Semana 2" }
    ],
    recursosCompartidos: true,
    criteriosEvaluacion: "Consistencia en el diseño, fidelidad de las traducciones a los términos de avistaje y un mapa claro con al menos 4 puntos de avistaje desde Rada Tilly."
  },
  {
    id: 2,
    companyName: "Hotel Costero Rada Tilly",
    title: "Estrategia de redes sociales para temporada alta",
    category: "Marketing Digital",
    gradeLevel: "5° Año",
    slots: 1,
    xpReward: 220,
    status: "Abierta",
    createdAt: "Hace 3 días",
    difficulty: "Fácil",
    duration: "1 semana",
    description: "Planificación y diseño de contenidos para Instagram y TikTok con el objetivo de posicionar a Rada Tilly como destino turístico sustentable y promocionar los servicios del hotel durante la temporada estival.",
    shift: ["Tarde", "Noche"],
    hoursPerWeek: "3-5 horas",
    problema: "El hotel carece de una identidad marcada en redes durante el verano. No comunicamos activamente el valor ecológico de la región ni enlazamos las actividades turísticas locales con nuestra oferta de hospedaje.",
    resultadoEsperado: "Un plan de contenidos estructurado para una cuadrícula de 9 publicaciones de Instagram y 3 ideas de videos cortos para TikTok con sus respectivos copys y hashtags.",
    modalidadEntrega: "Archivo multimedia (fotos, videos, diseños)",
    etapas: [
      { titulo: "Definición de pilares de contenido e imágenes base", plazo: "Días 1-3" },
      { titulo: "Creación de copys y plantillas de diseño en Canva", plazo: "Días 4-7" }
    ],
    recursosCompartidos: true,
    criteriosEvaluacion: "Entrega de 9 publicaciones, uso de hashtags de Rada Tilly y un diseño visual coherente con la paleta de colores del hotel."
  },
  {
    id: 3,
    companyName: "Municipio Rada Tilly",
    title: "Digitalización de registros de visitantes del parque",
    category: "Gestión de Datos",
    gradeLevel: "4° Año",
    slots: 2,
    xpReward: 180,
    status: "En curso",
    createdAt: "Hace 1 semana",
    difficulty: "Fácil",
    duration: "1 semana",
    description: "Sistematización de planillas físicas y digitalización de datos históricos de visitantes de la Reserva Natural Punta Marqués, generando un tablero de control básico en Excel o Google Sheets para facilitar la toma de decisiones municipales.",
    shift: ["Mañana"],
    hoursPerWeek: "1-3 horas",
    problema: "Las planillas mensuales de ingreso de visitantes a Punta Marqués están acumuladas físicamente en papel, impidiendo realizar un análisis rápido del crecimiento de visitas, procedencias o impacto turístico real.",
    resultadoEsperado: "Una base de datos digitalizada en Google Sheets con el registro consolidado de los últimos seis meses de visitantes, incluyendo origen y cantidad.",
    modalidadEntrega: "Documento/informe subido a la plataforma",
    etapas: [
      { titulo: "Carga de datos de planillas de papel a hoja de cálculo", plazo: "Días 1-4" },
      { titulo: "Generación de gráficos de barras por procedencia y edad", plazo: "Días 5-7" }
    ],
    recursosCompartidos: false,
    criteriosEvaluacion: "Exactitud en los registros numéricos y gráficos automatizados por mes."
  },
  {
    id: 4,
    companyName: "CONICET Patagonia",
    title: "Asistente de registro GPS de avistajes de ballena sei",
    category: "Conservación Ambiental",
    gradeLevel: "4° Año",
    slots: 3,
    xpReward: 250,
    status: "Abierta",
    createdAt: "Ayer",
    difficulty: "Medio",
    duration: "2 semanas",
    description: "Apoyo en el trabajo de campo digital para georreferenciar avistajes de ballenas sei desde los acantilados. El alumno registrará coordenadas a partir de planillas y mapas satelitales, comportamientos observados y condiciones climáticas básicas bajo supervisión científica.",
    shift: ["Tarde", "Fin de semana"],
    hoursPerWeek: "5+ horas",
    problema: "Los investigadores del CONICET recopilan avistajes de ballena sei pero necesitan digitalizar las posiciones GPS exactas cruzando datos meteorológicos locales para mapear áreas de alimentación prioritarias.",
    resultadoEsperado: "Un reporte en formato digital con mapas interactivos de Google Earth conteniendo las marcas de avistamiento documentadas.",
    modalidadEntrega: "Documento/informe subido a la plataforma",
    etapas: [
      { titulo: "Cruzamiento de coordenadas y mapeo satelital", plazo: "Semana 1" },
      { titulo: "Redacción del informe climático por avistamiento", plazo: "Semana 2" }
    ],
    recursosCompartidos: true,
    criteriosEvaluacion: "Coordenadas geográficas sin errores de tipeo y reporte climático completo por fecha."
  },
  {
    id: 5,
    companyName: "Restaurante La Ballena",
    title: "Sistema de reservas online para temporada",
    category: "Logística",
    gradeLevel: "5° Año",
    slots: 1,
    xpReward: 140,
    status: "Abierta",
    createdAt: "Hace 5 días",
    difficulty: "Medio",
    duration: "2 semanas",
    description: "Desarrollo e implementación de un sistema de reservas en línea automatizado para optimizar la ocupación del salón durante la temporada de verano, incluyendo la gestión de base de datos de clientes y notificaciones por WhatsApp/Email.",
    shift: ["Noche", "Fin de semana"],
    hoursPerWeek: "3-5 horas",
    problema: "Las reservas telefónicas manuales provocan ausencias sin aviso y sobreventas en las noches de temporada de avistamiento, congestionando la cocina y afectando la experiencia del comensal.",
    resultadoEsperado: "Un flujo interactivo configurado de reservas por formulario web con envío de mails automáticos simulados.",
    modalidadEntrega: "Documento/informe subido a la plataforma",
    etapas: [
      { titulo: "Maquetación del formulario de reserva y campos de entrada", plazo: "Semana 1" },
      { titulo: "Configuración de notificaciones y testeo de reservas", plazo: "Semana 2" }
    ],
    recursosCompartidos: false,
    criteriosEvaluacion: "Formulario de reserva sin errores de campos y base de datos simulada funcional."
  },
  {
    id: 6,
    companyName: "Agencia Turismo Comodoro",
    title: "Contenido para guía turística digital de Rada Tilly",
    category: "Marketing Digital",
    gradeLevel: "3° Año",
    slots: 2,
    xpReward: 220,
    status: "Completada",
    createdAt: "Hace 2 semanas",
    difficulty: "Medio",
    duration: "2 semanas",
    description: "Redacción de reseñas, selección de fotografías y creación de itinerarios recomendados para la nueva guía turística digital del corredor de la Ruta Azul, destacando los atractivos naturales de Rada Tilly.",
    shift: ["Tarde"],
    hoursPerWeek: "1-3 horas",
    problema: "Los folletos actuales no describen la fauna costera de Rada Tilly adecuadamente y están orientados únicamente al público local, dejando de lado los senderos autoguiados.",
    resultadoEsperado: "Redacción digital de senderos y fotos seleccionadas organizadas en formato de infografía.",
    modalidadEntrega: "Archivo multimedia (fotos, videos, diseños)",
    etapas: [
      { titulo: "Investigación y redacción de senderos turísticos", plazo: "Semana 1" },
      { titulo: "Selección fotográfica y armado final de la guía", plazo: "Semana 2" }
    ],
    recursosCompartidos: true,
    criteriosEvaluacion: "Guía con al menos 3 senderos locales descriptos detalladamente."
  },
  {
    id: 7,
    companyName: "Parque Solar Iglesia (San Juan)",
    title: "Tablero de trazabilidad logística y generación solar",
    category: "Gestión de Datos",
    gradeLevel: "5° Año",
    slots: 2,
    xpReward: 260,
    status: "Abierta",
    createdAt: "Hace 1 día",
    difficulty: "Difícil",
    duration: "3 semanas",
    description: "Desarrollo de un panel estructurado de reporte para el monitoreo de la generación diaria del parque fotovoltaico, vinculando la producción energética limpia con el consumo de agua del riego de la Escuela Agrotécnica Manuel Belgrano de Jáchal.",
    shift: ["Mañana", "Tarde"],
    hoursPerWeek: "3-5 horas",
    problema: "La escuela agrotécnica carece de herramientas sencillas para contrastar la energía generada por sus paneles experimentales y el agua utilizada por sus sistemas de riego local en una región árida.",
    resultadoEsperado: "Plantilla automatizada de control de riego y energía solar con gráficos interactivos.",
    modalidadEntrega: "Archivo multimedia (fotos, videos, diseños)",
    etapas: [
      { titulo: "Carga de consumos hídricos y registros de irradiación", plazo: "Semana 1" },
      { titulo: "Conexión lógica y maquetación de gráficos de eficiencia", plazo: "Semana 2" }
    ],
    recursosCompartidos: true,
    criteriosEvaluacion: "Cálculos matemáticos precisos y presentación de gráficos interactivos claros."
  },
  {
    id: 8,
    companyName: "Puerto Almanza Ecoturismo (Tierra del Fuego)",
    title: "Guía digital de ecoturismo científico en el Canal Beagle",
    category: "Atención al Turista",
    gradeLevel: "4° Año",
    slots: 3,
    xpReward: 240,
    status: "Abierta",
    createdAt: "Hace 4 días",
    difficulty: "Medio",
    duration: "2 semanas",
    description: "Creación de contenidos educativos digitales para turistas que visitan el Canal Beagle, describiendo la biodiversidad costera de centollas e invertebrados. El trabajo se articula con la Escuela Provincial N° 44 'Héroes de Malvinas' de Puerto Almanza.",
    shift: ["Tarde", "Fin de semana"],
    hoursPerWeek: "3-5 horas",
    problema: "La afluencia de turismo en Puerto Almanza crece rápido, pero no hay guías locales estructuradas en formato virtual que detallen el frágil ecosistema marino.",
    resultadoEsperado: "Catálogo interactivo bilingüe detallando la fauna costera del Canal Beagle.",
    modalidadEntrega: "Presentación (slides) subida a la plataforma",
    etapas: [
      { titulo: "Relevamiento de especies biológicas locales", plazo: "Semana 1" },
      { titulo: "Redacción interactiva bilingüe y mapas satelitales", plazo: "Semana 2" }
    ],
    recursosCompartidos: true,
    criteriosEvaluacion: "Exactitud en las descripciones zoológicas y diseño premium."
  },
  {
    id: 9,
    companyName: "Cooperativa de Tejedoras de El Volcán (San Luis)",
    title: "Diseño de e-commerce y catálogo para cooperativa de artesanas",
    category: "Marketing Digital",
    gradeLevel: "4° Año",
    slots: 2,
    xpReward: 190,
    status: "Abierta",
    createdAt: "Hace 6 días",
    difficulty: "Fácil",
    duration: "1 semana",
    description: "Armado del catálogo digital y diseño de la estrategia de e-commerce para revalorizar y comercializar artesanías tejidas en telar por mujeres rurales. Articulado con la Escuela Hogar N° 6.",
    shift: ["Mañana", "Fin de semana"],
    hoursPerWeek: "1-3 horas",
    problema: "Las tejedoras venden únicamente de manera física en la plaza, reduciendo su visibilidad fuera de la temporada turística del pueblo.",
    resultadoEsperado: "Mockup de e-commerce y catálogo en PDF interactivo con historias de vida de las artesanas.",
    modalidadEntrega: "Archivo multimedia (fotos, videos, diseños)",
    etapas: [
      { titulo: "Fotografía de productos y redacción de historias de vida", plazo: "Días 1-3" },
      { titulo: "Armado de cuadrícula y propuesta de carrito digital", plazo: "Días 4-7" }
    ],
    recursosCompartidos: false,
    criteriosEvaluacion: "Catálogo con al menos 6 productos, fotos limpias y diseño de flujo de compra."
  },
  {
    id: 10,
    companyName: "Minera Zapala & Ecología (Neuquén)",
    title: "Plan de analítica digital para reconversión ambiental de pozos",
    category: "Gestión de Datos",
    gradeLevel: "5° Año",
    slots: 1,
    xpReward: 280,
    status: "Abierta",
    createdAt: "Hace 1 semana",
    difficulty: "Difícil",
    duration: "3 semanas",
    description: "Sistematización de los reportes de muestreos de suelo y de revegetación en antiguos yacimientos para consolidar un tablero de monitoreo ambiental. Articulación con el CPEM N° 49 de Zapala.",
    shift: ["Tarde"],
    hoursPerWeek: "5+ horas",
    problema: "Los muestreos se reportan en archivos de texto desestructurados, lo que demora el control de avance de la revegetación en la estepa neuquina.",
    resultadoEsperado: "Reporte estructurado con base de datos consolidada y curvas de crecimiento por especie nativa.",
    modalidadEntrega: "Documento/informe subido a la plataforma",
    etapas: [
      { titulo: "Consolidación de muestreos e índices de humedad", plazo: "Semanas 1-2" },
      { titulo: "Generación de modelos de revegetación y curvas", plazo: "Semana 3" }
    ],
    recursosCompartidos: true,
    criteriosEvaluacion: "Precisión en los cálculos y presentación de datos estructurados."
  },
  {
    id: 11,
    companyName: "Molinos Eólicos Chubut (Rada Tilly)",
    title: "Monitoreo digital de micro-generación eólica escolar",
    category: "Conservación Ambiental",
    gradeLevel: "5° Año",
    slots: 2,
    xpReward: 210,
    status: "Abierta",
    createdAt: "Hace 3 días",
    difficulty: "Medio",
    duration: "2 semanas",
    description: "Digitalización y análisis del rendimiento mensual de un microgenerador eólico instalado en el patio escolar de la E.E.S. N° 736 para calcular la reducción de huella de carbono escolar.",
    shift: ["Mañana", "Tarde"],
    hoursPerWeek: "3-5 horas",
    problema: "La escuela produce energía pero los estudiantes de secundaria no participan activamente en calcular cuánta electricidad eólica se genera ni el ahorro de CO2 en comparación con la red local.",
    resultadoEsperado: "Informe interactivo con cálculos de eficiencia y ahorro de emisiones equivalentes de carbono.",
    modalidadEntrega: "Documento/informe subido a la plataforma",
    etapas: [
      { titulo: "Recopilación de mediciones de viento y energía del inversor", plazo: "Semana 1" },
      { titulo: "Cálculo de huella reducida y diseño de infografía", plazo: "Semana 2" }
    ],
    recursosCompartidos: true,
    criteriosEvaluacion: "Uso correcto de fórmulas de emisiones y gráficos eólicos claros."
  },
  {
    id: 12,
    companyName: "Turismo Aventura Norte Neuquino (Andacollo)",
    title: "Catálogo interactivo de pesca con mosca y ríos del Norte Neuquino",
    category: "Atención al Turista",
    gradeLevel: "5° Año",
    slots: 2,
    xpReward: 230,
    status: "Abierta",
    createdAt: "Hace 1 día",
    difficulty: "Medio",
    duration: "2 semanas",
    description: "Creación de un catálogo digital y mapa interactivo para promover la pesca deportiva sustentable y senderismo en Varvarco, Huinganco y Andacollo. Articulado con el CPEM N° 11 de Andacollo.",
    shift: ["Tarde", "Fin de semana"],
    hoursPerWeek: "3-5 horas",
    problema: "El Norte Neuquino está cambiando su matriz basada en minería y ganadería de subsistencia hacia el turismo sustentable. Carecemos de una guía digital integrada sobre pesca deportiva y gastronomía regional para atraer visitantes.",
    resultadoEsperado: "Un documento PDF interactivo con el catálogo estructurado, mapas georreferenciados y recomendaciones de pesca responsable.",
    modalidadEntrega: "Presentación (slides) subida a la plataforma",
    etapas: [
      { titulo: "Relevamiento de ríos y regulaciones de pesca", plazo: "Semana 1" },
      { titulo: "Diseño del catálogo bilingüe y mapa turístico", plazo: "Semana 2" }
    ],
    recursosCompartidos: true,
    criteriosEvaluacion: "Mapas claros con al menos 5 puntos de pesca, redacción atractiva y cumplimiento de normativas de devolución de peces."
  },
  {
    id: 13,
    companyName: "Asociación Hotelera de Villa de Merlo (San Luis)",
    title: "Estrategia digital de posicionamiento del microclima y turismo de bienestar",
    category: "Marketing Digital",
    gradeLevel: "4° Año",
    slots: 3,
    xpReward: 200,
    status: "Abierta",
    createdAt: "Hace 3 días",
    difficulty: "Fácil",
    duration: "1 semana",
    description: "Planificación y diseño de una campaña de contenidos para redes sociales para posicionar el microclima de Villa de Merlo como destino de bienestar para el turismo nacional.",
    shift: ["Mañana", "Tarde"],
    hoursPerWeek: "1-3 horas",
    problema: "Necesitamos potenciar el turismo fuera de temporada alta en la zona serrana de San Luis (La Punta, Juana Koslay, Merlo). Falta una campaña digital que comunique los beneficios del microclima y el ecoturismo de bienestar.",
    resultadoEsperado: "Un calendario de publicaciones de 6 piezas para Instagram y 2 propuestas de videos cortos con copys enfocados en bienestar.",
    modalidadEntrega: "Archivo multimedia (fotos, videos, diseños)",
    etapas: [
      { titulo: "Definición del tono y pilares del microclima", plazo: "Días 1-3" },
      { titulo: "Diseño de plantillas en Canva y copys promocionales", plazo: "Días 4-7" }
    ],
    recursosCompartidos: false,
    criteriosEvaluacion: "Presentación estética, uso de hashtags regionales de San Luis y mensajes enfocados en turismo saludable."
  },
  {
    id: 14,
    companyName: "Cámara de Comercio y Turismo de Tolhuin (TDF)",
    title: "Guía digital de senderos históricos del aserradero y termas de Tolhuin",
    category: "Atención al Turista",
    gradeLevel: "4° Año",
    slots: 2,
    xpReward: 240,
    status: "Abierta",
    createdAt: "Ayer",
    difficulty: "Medio",
    duration: "2 semanas",
    description: "Sistematización de contenidos históricos y diseño de una guía turística digital sobre los antiguos aserraderos de Tolhuin, Lago Escondido y el potencial termal de la zona para el turismo de aventura.",
    shift: ["Tarde"],
    hoursPerWeek: "3-5 horas",
    problema: "La región del corazón de la isla de Tierra del Fuego diversifica su turismo. Los visitantes conocen el puerto pesquero de Puerto Almanza pero se pierden la rica historia forestal de los aserraderos de Tolhuin y las termas.",
    resultadoEsperado: "Guía interactiva estructurada con mapas de senderos autoguiados y reseñas de aserraderos históricos.",
    modalidadEntrega: "Documento/informe subido a la plataforma",
    etapas: [
      { titulo: "Investigación y redacción del circuito forestal e histórico", plazo: "Semana 1" },
      { titulo: "Diseño gráfico e integración de mapas de senderos", plazo: "Semana 2" }
    ],
    recursosCompartidos: true,
    criteriosEvaluacion: "Información histórica precisa y un mapa de senderos con descripciones biológicas y de dificultad."
  }
];


export const categories: {
  name: ChallengeCategory;
  icon: string;
  description: string;
  color: string;
  emoji: string;
}[] = [
  {
    name: "Gestión de Datos",
    icon: "database",
    description: "Organización, análisis y digitalización de información cívica",
    color: "from-rtBlue to-rtTeal",
    emoji: "📊",
  },
  {
    name: "Atención al Turista",
    icon: "map",
    description: "Desarrollo de guías y asistencia local multilingüe",
    color: "from-rtYellow to-rtBlue",
    emoji: "🗺️",
  },
  {
    name: "Logística",
    icon: "truck",
    description: "Organización de reservas y flujos de distribución",
    color: "from-rtPurple to-rtPink",
    emoji: "🚚",
  },
  {
    name: "Marketing Digital",
    icon: "megaphone",
    description: "Diseño y planificación de redes para economía azul",
    color: "from-rtPink to-rtYellow",
    emoji: "📱",
  },
  {
    name: "Conservación Ambiental",
    icon: "leaf",
    description: "Investigación científica y ecología marina patagónica",
    color: "from-rtGreen to-rtTeal",
    emoji: "🌿",
  },
];

export const gradeLevels: GradeLevel[] = [
  "1° Año",
  "2° Año",
  "3° Año",
  "4° Año",
  "5° Año",
];

export const statuses: ChallengeStatus[] = ["Abierta", "En curso", "Completada"];

// Radar State management local storage key
export const RADAR_STATE_KEY = "radar_t_state_v2";

export interface RadarState {
  users: UserProfile[];
  challenges: Challenge[];
  currentUser: UserProfile | null;
}

export function getRadarState(): RadarState {
  if (typeof window === "undefined") {
    return { users: INITIAL_USERS, challenges: INITIAL_CHALLENGES, currentUser: null };
  }
  const raw = localStorage.getItem(RADAR_STATE_KEY);
  if (!raw) {
    const defaultState: RadarState = {
      users: INITIAL_USERS,
      challenges: INITIAL_CHALLENGES,
      currentUser: null,
    };
    localStorage.setItem(RADAR_STATE_KEY, JSON.stringify(defaultState));
    return defaultState;
  }
  try {
    const parsed = JSON.parse(raw) as RadarState;
    let needsSave = false;

    // Heal challenges: add INITIAL_CHALLENGES that are missing (by ID)
    const existingChallengeIds = new Set(parsed.challenges.map(c => String(c.id)));
    INITIAL_CHALLENGES.forEach(initCh => {
      if (!existingChallengeIds.has(String(initCh.id))) {
        parsed.challenges.push(initCh);
        needsSave = true;
      }
    });

    // Heal users: add INITIAL_USERS that are missing (by email, case-insensitive)
    const existingUserEmails = new Set(parsed.users.map(u => u.email.toLowerCase()));
    INITIAL_USERS.forEach(initUs => {
      if (!existingUserEmails.has(initUs.email.toLowerCase())) {
        parsed.users.push(initUs);
        needsSave = true;
      }
    });

    if (needsSave) {
      localStorage.setItem(RADAR_STATE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch (e) {
    const defaultState: RadarState = {
      users: INITIAL_USERS,
      challenges: INITIAL_CHALLENGES,
      currentUser: null,
    };
    localStorage.setItem(RADAR_STATE_KEY, JSON.stringify(defaultState));
    return defaultState;
  }
}

export function saveRadarState(state: RadarState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(RADAR_STATE_KEY, JSON.stringify(state));
}

// v3 Soft Skills
export interface SoftSkillExercise {
  caso: string;
  opciones: { texto: string; feedback: string }[];
}

export interface SoftSkill {
  id: string;
  icono: string;
  nombre: string;
  descripcion: string;
  xp: number;
  duracion: string;
  ejercicios: SoftSkillExercise[];
}

export const SOFT_SKILLS: SoftSkill[] = [
  {
    id: 'oratoria',
    icono: '🎤',
    nombre: 'Oratoria y comunicación',
    descripcion: 'Practicá hablar frente a otros con claridad y confianza',
    xp: 80,
    duracion: '10 min',
    ejercicios: [
      {
        caso: "Durante una llamada de seguimiento digital con la organización, te trabás al explicar tu propuesta de diseño. ¿Cómo reaccionás?",
        opciones: [
          { texto: "Me detengo, pido disculpas, tomo aire y retomo la idea con calma explicándola de otra manera.", feedback: "¡Excelente! La naturalidad y el control de la respiración demuestran profesionalismo y seguridad." },
          { texto: "Apago la cámara simulando un problema de internet para escribir la respuesta por el chat.", feedback: "Aunque resuelve el apuro inmediato, afrontar la conversación oral entrena mejor tus habilidades interpersonales." },
          { texto: "Intento hablar muy rápido para terminar la idea de inmediato y que no se note la traba.", feedback: "Hablar rápido suele generar más confusión. Siempre es mejor bajar la velocidad y modular." }
        ]
      },
      {
        caso: "Tenés que grabar una breve presentación audiovisual para explicar tu proyecto al CONICET. ¿Qué priorizás en el encuadre y sonido?",
        opciones: [
          { texto: "Un fondo silencioso, iluminación de frente y explicar el proyecto usando ejemplos prácticos locales.", feedback: "¡Impecable! Un entorno controlado y un mensaje con arraigo local captan de inmediato el interés científico." },
          { texto: "Grabar al aire libre frente a la playa con viento patagónico de fondo para que sea más natural.", feedback: "El viento en la Patagonia dificulta la audición del micrófono. Cuidar el audio es clave para una buena oratoria." }
        ]
      }
    ]
  },
  {
    id: 'conflictos',
    icono: '🤝',
    nombre: 'Resolución de conflictos',
    descripcion: 'Aprendé a manejar situaciones difíciles con calma y empatía',
    xp: 90,
    duracion: '15 min',
    ejercicios: [
      {
        caso: "El tutor de la organización te devuelve el reporte digital indicando que 'no cumple con las expectativas del negocio', pero no te da detalles específicos. ¿Qué hacés?",
        opciones: [
          { texto: "Le escribo un mensaje formal solicitando una breve reunión digital para repasar los puntos específicos a mejorar.", feedback: "¡Excelente decisión! La comunicación proactiva y constructiva aclara dudas y destraba los procesos." },
          { texto: "Rehago todo el informe desde cero adivinando qué es lo que pudo haber estado mal.", feedback: "Trabajar a ciegas consume mucha energía y tiempo. Preguntar los criterios es un derecho del estudiante." },
          { texto: "Me quejo directamente con el docente coordinador indicando que la organización es injusta.", feedback: "Es preferible intentar un primer contacto claro y asertivo con la organización antes de escalar el reclamo." }
        ]
      }
    ]
  },
  {
    id: 'equipo',
    icono: '👥',
    nombre: 'Trabajo en equipo',
    descripcion: 'Roles, responsabilidades y cómo colaborar mejor de forma remota',
    xp: 75,
    duracion: '10 min',
    ejercicios: [
      {
        caso: "Estás haciendo una misión digital en parejas. Tu compañero no responde los mensajes y la fecha límite de entrega es en dos días. ¿Cómo procedés?",
        opciones: [
          { texto: "Le envío un último mensaje consultando si tiene algún inconveniente y notifico formalmente al docente coordinador para que esté al tanto.", feedback: "¡Muy bien! Esto demuestra compañerismo pero mantiene informada a la institución para proteger el plazo." },
          { texto: "Hago todo el trabajo solo y quito su nombre de la presentación final sin avisarle.", feedback: "Aunque la frustración es comprensible, es mejor mediar a través del coordinador pedagógico antes de tomar decisiones unilaterales." }
        ]
      }
    ]
  },
  {
    id: 'gestion',
    icono: '⏰',
    nombre: 'Gestión del tiempo',
    descripcion: 'Organizá tus tareas para cumplir plazos sin estresarte',
    xp: 70,
    duracion: '10 min',
    ejercicios: [
      {
        caso: "Tenés acumuladas tareas de la escuela y el desafío de Radar T. Sentís que no llegás a entregar a tiempo. ¿Qué hacés?",
        opciones: [
          { texto: "Armo una matriz de prioridades, divido el desafío de Radar T en tareas pequeñas de 15 minutos y le dedico un bloque fijo al día.", feedback: "¡Estrategia brillante! Dividir objetivos grandes en micro-tareas reduce el estrés y previene la procrastinación." },
          { texto: "Dejo de ir a clases de educación física para quedarme en casa terminando la misión de Radar T.", feedback: "No es saludable sacrificar la escuela o tu bienestar físico por una práctica. Pedir ayuda pedagógica es mejor." }
        ]
      }
    ]
  },
  {
    id: 'creatividad',
    icono: '💡',
    nombre: 'Pensamiento creativo',
    descripcion: 'Generá ideas nuevas y abordá problemas desde otro ángulo',
    xp: 85,
    duracion: '12 min',
    ejercicios: [
      {
        caso: "El hotel te pide fotos atractivas de Rada Tilly para las redes sociales, pero no tenés una cámara profesional. ¿Cómo lo resolvés?",
        opciones: [
          { texto: "Saco fotos con mi celular en la 'hora dorada' (atardecer), aplico técnicas básicas de encuadre y compongo con elementos de la playa local.", feedback: "¡Perfecto! La creatividad y el ojo artístico superan a la tecnología. Los atardeceres en la villa son hermosos." },
          { texto: "Descargo imágenes genéricas de playas del Caribe en internet y les pongo el logo del hotel.", feedback: "El turismo sustentable de Rada Tilly se basa en su identidad local única. Usar fotos falsas arruina la credibilidad." }
        ]
      }
    ]
  },
  {
    id: 'digital',
    icono: '📲',
    nombre: 'Ciudadanía digital',
    descripcion: 'Cómo comunicarte profesionalmente en entornos virtuales',
    xp: 65,
    duracion: '8 min',
    ejercicios: [
      {
        caso: "Tenés que mandarle tu propuesta final al tutor de la organización por mail. ¿Cómo redactás el asunto y el mensaje?",
        opciones: [
          { texto: "Asunto: 'Entrega Desafío - Valentina López - EES 736' y un mensaje cordial detallando el adjunto.", feedback: "¡Exacto! El asunto descriptivo y el saludo formal son esenciales para una comunicación profesional corporativa." },
          { texto: "Asunto: 'aca esta' y le adjunto el archivo sin escribir nada en el cuerpo del correo.", feedback: "La falta de formalidad puede retrasar la revisión de tu trabajo por parte de la organización. Siempre saludá y contextualizá." }
        ]
      }
    ]
  }
];

// Asistente Flujos
export const ASISTENTE_FLUJOS: Record<string, { mensaje: string; opciones: { texto: string; siguiente: string }[] }> = {
  bienvenida: {
    mensaje: "¡Hola! Soy Rádar, tu asistente virtual. ¿En qué te puedo ayudar hoy? 👋",
    opciones: [
      { texto: "¿Cómo funciona Radar T?", siguiente: "como_funciona" },
      { texto: "Quiero encontrar una misión", siguiente: "buscar_mision" },
      { texto: "¿Qué es un certificado?", siguiente: "sobre_certificados" },
      { texto: "Tengo un problema", siguiente: "ayuda_urgente" }
    ]
  },
  como_funciona: {
    mensaje: "Radar T conecta tus ganas de aprender con desafíos 100% digitales de organizaciones de Rada Tilly. Tomás una misión, la resolvés desde tu casa o la escuela en línea, y ganás experiencia y certificados de práctica oficial sin moverte de tu casa. ¿Querés ver los desafíos?",
    opciones: [
      { texto: "Sí, mostrame misiones", siguiente: "buscar_mision" },
      { texto: "Contame más del certificado", siguiente: "sobre_certificados" },
      { texto: "Volver", siguiente: "bienvenida" }
    ]
  },
  buscar_mision: {
    mensaje: "¡Genial! En el tablero de misiones podés ver los desafíos abiertos. Te recomiendo activar los filtros de compatibilidad horaria para ver cuáles se ajustan mejor a tus materias y tiempos libres.",
    opciones: [
      { texto: "Entendido, gracias", siguiente: "bienvenida" },
      { texto: "Ver certificados", siguiente: "sobre_certificados" }
    ]
  },
  sobre_certificados: {
    mensaje: "Los certificados tienen 3 niveles: el Nivel 1 (Participación) lo emite tu escuela al validar tu entrega digital. El Nivel 2 (Competencia) lo emite la organización al calificar tu trabajo. El Nivel 3 (Aval) suma al Municipio. ¡Además se consolidan en tu CV digital automatizado!",
    opciones: [
      { texto: "¡Qué bueno! Volver", siguiente: "bienvenida" }
    ]
  },
  ayuda_urgente: {
    mensaje: "Entiendo perfectamente. Tu bienestar y comodidad digital son lo más importante. Podés hablar con tu docente coordinador escolar desde tu panel en cualquier momento. ¿Qué tipo de asistencia necesitás?",
    opciones: [
      { texto: "🛠️ Soporte técnico (Crear ticket)", siguiente: "soporte_tecnico" },
      { texto: "Sí, quiero salir de una misión", siguiente: "salir_mision" },
      { texto: "No, todo bien por ahora", siguiente: "bienvenida" }
    ]
  },
  salir_mision: {
    mensaje: "Está muy bien. Dentro del detalle de tu misión activa tenés el botón 'Necesito salir de esta misión'. Al presionarlo, el cupo se libera y se envía una notificación silenciosa a tu docente para ayudarte sin dramatismo.",
    opciones: [
      { texto: "Entendido, gracias Rádar", siguiente: "bienvenida" }
    ]
  },
  soporte_tecnico: {
    mensaje: "¿Tenés algún inconveniente técnico con la plataforma? Podés crear un ticket de soporte de inmediato y nuestro equipo lo resolverá en menos de 2 horas. ¿Qué problema estás experimentando?",
    opciones: [
      { texto: "No puedo subir mi entrega digital", siguiente: "crear_ticket_entrega" },
      { texto: "Error al visualizar mi certificado", siguiente: "crear_ticket_cert" },
      { texto: "Otro problema técnico", siguiente: "crear_ticket_otro" },
      { texto: "Volver", siguiente: "bienvenida" }
    ]
  },
  crear_ticket_entrega: {
    mensaje: "¡Entendido! Generamos el ticket de soporte técnico #TK-9481 por 'Error en carga de archivos'. Se notificó al administrador y a tu docente. Te avisaremos por este chat en cuanto esté resuelto.",
    opciones: [
      { texto: "Gracias, volver", siguiente: "bienvenida" }
    ]
  },
  crear_ticket_cert: {
    mensaje: "¡Entendido! Generamos el ticket de soporte técnico #TK-9482 por 'Error de renderizado de certificado'. Se notificó al administrador y a tu docente. Te avisaremos por este chat en cuanto esté resuelto.",
    opciones: [
      { texto: "Gracias, volver", siguiente: "bienvenida" }
    ]
  },
  crear_ticket_otro: {
    mensaje: "¡Entendido! Generamos el ticket de soporte técnico #TK-9483 por 'Incidencia general en plataforma'. Se notificó al administrador y a tu docente. Te avisaremos por este chat en cuanto esté resuelto.",
    opciones: [
      { texto: "Gracias, volver", siguiente: "bienvenida" }
    ]
  }
};

export const sampleChallenges = INITIAL_CHALLENGES;

export interface LeaderboardEntry {
  rank: number;
  avatar: string;
  name: string;
  level: number;
  xp: number;
}

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, avatar: "🦊", name: "Franco Ibáñez", level: 2, xp: 800 },
  { rank: 2, avatar: "🦁", name: "Valentina López", level: 2, xp: 620 },
  { rank: 3, avatar: "🦉", name: "Pilar Méndez", level: 1, xp: 450 },
  { rank: 4, avatar: "🐰", name: "Emilia Rodríguez", level: 1, xp: 320 },
  { rank: 5, avatar: "🐼", name: "Lucas Fernández", level: 1, xp: 105 }
];

