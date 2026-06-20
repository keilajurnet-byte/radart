export type ChallengeCategory =
  | "Gestión de Datos"
  | "Atención al Turista"
  | "Logística"
  | "Marketing Digital"
  | "Conservación Ambiental";

export type ChallengeStatus = "Abierto" | "En curso" | "Completado";

export type GradeLevel = "1° Año" | "2° Año" | "3° Año" | "4° Año" | "5° Año";

export interface Challenge {
  id: string;
  companyName: string;
  category: ChallengeCategory;
  title: string;
  description: string;
  status: ChallengeStatus;
  gradeLevel: GradeLevel;
  createdAt: Date;
  studentName?: string;
  xpReward: number;
  difficulty: "Fácil" | "Medio" | "Difícil";
  duration: string;
}

export interface StudentProfile {
  name: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedChallenges: number;
  badges: Badge[];
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

export interface Stats {
  totalChallenges: number;
  studentsMatched: number;
  companiesActive: number;
}

// Sample student profile for gamification
export const sampleStudent: StudentProfile = {
  name: "Lucía",
  avatar: "🦊",
  level: 3,
  xp: 450,
  xpToNextLevel: 600,
  completedChallenges: 2,
  badges: [
    { id: "1", name: "Primer Paso", icon: "🚀", description: "Completaste tu primer desafío", earned: true },
    { id: "2", name: "Explorador", icon: "🗺️", description: "Probaste 3 categorías diferentes", earned: true },
    { id: "3", name: "En Racha", icon: "🔥", description: "5 días seguidos activo", earned: false },
    { id: "4", name: "Maestro Digital", icon: "💻", description: "Completaste 5 desafíos de Marketing Digital", earned: false },
    { id: "5", name: "Eco Warrior", icon: "🌿", description: "Completaste 3 desafíos de Conservación", earned: false },
    { id: "6", name: "Top 10", icon: "⭐", description: "Entraste al ranking top 10", earned: false },
  ],
  streak: 3,
};

// Sample data for demonstration
export const sampleChallenges: Challenge[] = [
  {
    id: "1",
    companyName: "Patagonia Tours",
    category: "Atención al Turista",
    title: "Diseño de experiencia turística digital",
    description:
      "Crear una guía interactiva para turistas que visitan el Parque Nacional, incluyendo puntos de interés y fauna local.",
    status: "Abierto",
    gradeLevel: "4° Año",
    createdAt: new Date("2024-01-15"),
    xpReward: 150,
    difficulty: "Medio",
    duration: "2 semanas",
  },
  {
    id: "2",
    companyName: "Puerto Madryn Logistics",
    category: "Logística",
    title: "Optimización de rutas de entrega",
    description:
      "Mapear y proponer mejoras en las rutas de distribución local para reducir tiempos y costos operativos.",
    status: "En curso",
    gradeLevel: "5° Año",
    createdAt: new Date("2024-01-10"),
    studentName: "Lucía Fernández",
    xpReward: 200,
    difficulty: "Difícil",
    duration: "3 semanas",
  },
  {
    id: "3",
    companyName: "Ballenas Australes",
    category: "Conservación Ambiental",
    title: "Monitoreo de avistamientos de ballenas",
    description:
      "Desarrollar un sistema simple para registrar y analizar datos de avistamientos de ballenas francas australes.",
    status: "Completado",
    gradeLevel: "3° Año",
    createdAt: new Date("2024-01-05"),
    studentName: "Martín González",
    xpReward: 180,
    difficulty: "Medio",
    duration: "2 semanas",
  },
  {
    id: "4",
    companyName: "Cooperativa Sur Digital",
    category: "Marketing Digital",
    title: "Campaña de redes sociales",
    description:
      "Diseñar y ejecutar una campaña de promoción en redes sociales para productos artesanales de la región.",
    status: "Abierto",
    gradeLevel: "4° Año",
    createdAt: new Date("2024-01-20"),
    xpReward: 120,
    difficulty: "Fácil",
    duration: "1 semana",
  },
  {
    id: "5",
    companyName: "Municipalidad de Rawson",
    category: "Gestión de Datos",
    title: "Digitalización de archivos históricos",
    description:
      "Organizar y digitalizar documentos históricos del archivo municipal para su preservación y acceso público.",
    status: "Abierto",
    gradeLevel: "2° Año",
    createdAt: new Date("2024-01-18"),
    xpReward: 100,
    difficulty: "Fácil",
    duration: "1 semana",
  },
  {
    id: "6",
    companyName: "Pescadería El Delfín",
    category: "Gestión de Datos",
    title: "Sistema de inventario básico",
    description:
      "Crear una planilla de seguimiento de inventario y ventas para mejorar el control del negocio.",
    status: "En curso",
    gradeLevel: "3° Año",
    createdAt: new Date("2024-01-12"),
    studentName: "Ana Rodríguez",
    xpReward: 130,
    difficulty: "Medio",
    duration: "2 semanas",
  },
];

export const leaderboard = [
  { rank: 1, name: "Martín G.", avatar: "🦁", xp: 1250, level: 6 },
  { rank: 2, name: "Sofía R.", avatar: "🦋", xp: 1100, level: 5 },
  { rank: 3, name: "Lucas P.", avatar: "🐺", xp: 980, level: 5 },
  { rank: 4, name: "Valentina M.", avatar: "🦊", xp: 850, level: 4 },
  { rank: 5, name: "Lucía F.", avatar: "🦊", xp: 450, level: 3 },
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
    description: "Organización, análisis y digitalización de información",
    color: "from-blue-500 to-cyan-500",
    emoji: "📊",
  },
  {
    name: "Atención al Turista",
    icon: "map",
    description: "Experiencias y servicios para visitantes",
    color: "from-orange-500 to-yellow-500",
    emoji: "🗺️",
  },
  {
    name: "Logística",
    icon: "truck",
    description: "Distribución, transporte y cadena de suministro",
    color: "from-purple-500 to-pink-500",
    emoji: "🚚",
  },
  {
    name: "Marketing Digital",
    icon: "megaphone",
    description: "Promoción y comunicación en medios digitales",
    color: "from-pink-500 to-rose-500",
    emoji: "📱",
  },
  {
    name: "Conservación Ambiental",
    icon: "leaf",
    description: "Protección del medio ambiente y fauna local",
    color: "from-green-500 to-emerald-500",
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

export const statuses: ChallengeStatus[] = ["Abierto", "En curso", "Completado"];
