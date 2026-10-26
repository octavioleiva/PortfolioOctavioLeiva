export interface Project {
  title: string;
  description: string;
  extendedDescription: string;
  technicalHighlights: string[];
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  image?: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    title: "WAYFINDER",
    description:
      "Aplicación integral de búsqueda y geolocalización de destinos integrando APIs de GeoDB. Arquitectura escalable y bases de datos relacionales.",
    extendedDescription:
      "Plataforma integral de turismo e interacción. El sistema permite a los usuarios autenticados explorar destinos geolocalizados, interactuar mediante calificaciones y reseñas, y gestionar alertas personalizadas sobre eventos guardados.",
    technicalHighlights: [
      "Implementación de sistema de autenticación, autorización y gestión de sesiones de usuario.",
      "Desarrollo de módulos de interacción social (CRUD de comentarios y sistema de rating).",
      "Arquitectura de notificaciones y seguimiento de eventos favoritos.",
      "Backend en .NET con base de datos relacional en SQL Server.",
      "Frontend SPA desarrollado en Angular con integración de APIs externas (GeoDB).",
    ],
    tags: [".NET", "Angular", "SQL Server"],
    repoUrl: "https://github.com/Equipo-de-desarrollo-LSD/App.git",
    image: "/wayfinder-captura.png",
  },
  {
    title: "INTÉRPRETE PASCAL",
    description:
      "Desarrollo desde cero de un intérprete de lenguaje de programación. Implementación profunda de algoritmos de análisis léxico, sintáctico y semántico.",
    extendedDescription:
      "Proyecto de bajo nivel fundamentado en la teoría de compiladores. Construido enteramente desde cero sin dependencias externas de procesamiento, demostrando un dominio profundo en estructuras de datos, recursividad y lógica computacional dura.",
    technicalHighlights: [
      "Implementación de analizador léxico (Scanner) para tokenización y validación de caracteres.",
      "Desarrollo de analizador sintáctico (Parser) mediante la construcción de Árboles de Sintaxis Abstracta (AST).",
      "Análisis semántico y gestión robusta de tabla de símbolos.",
      "Motor de evaluación de expresiones matemáticas y lógicas en tiempo de ejecución.",
    ],
    tags: ["Pascal", "Teoría de Compiladores"],
    repoUrl: "https://github.com/octavioleiva/Bilingue-Interprete.git",
  },
  {
    title: "SISTEMA DE SCORING",
    description:
      "Aplicación de escritorio para la gestión y cálculo de puntuaciones. Interfaz de usuario y lógica de negocios construida en entornos de desarrollo rápido.",
    extendedDescription:
      "Sistema integral de cálculo de scoring para infracciones de tránsito. El desarrollo del ABMC (Alta, Baja, Modificación y Consulta) y la lógica de negocio fueron construidos 100% desde cero (backend y frontend), sin dependencias de frameworks externos.",
    technicalHighlights: [
      "Gestión de memoria manual y dinámica mediante el uso intensivo de punteros.",
      "Implementación de estructuras de datos complejas: árboles para búsquedas optimizadas y arreglos.",
      "Persistencia de datos mediante lectura y escritura directa de archivos a bajo nivel.",
      "Diseño y optimización de algoritmos personalizados y estructuras de control (bucles) para la evaluación de penalizaciones.",
      "Entorno de desarrollo: Pascal / Lazarus.",
    ],
    tags: ["Pascal", "Lazarus"],
    repoUrl: "https://github.com/octavioleiva/Proyecto-Scoring.git",
  },
  {
    title: "WEB KWS",
    description:
      "Desarrollo y maquetación de plataforma web corporativa enfocada en la presentación de servicios, optimización de interfaz y experiencia de usuario.",
    extendedDescription:
      "Plataforma web corporativa orientada a la presentación de servicios. Se priorizó el rendimiento de carga (performance), la semántica del código y una experiencia de usuario (UX) fluida en múltiples dispositivos.",
    technicalHighlights: [
      "Estructuración frontend orientada a componentes.",
      "Diseño 100% responsivo (enfoque Mobile-First).",
      "Optimización de assets visuales y rendimiento de renderizado.",
    ],
    tags: ["Frontend", "Web Development"],
    demoUrl: "https://keywaysolution.vercel.app/",
    image: "/kws-captura.png",
  },
  {
    title: "SIMULACIONES NUMÉRICAS",
    description:
      "Modelado matemático y resolución de Ecuaciones Diferenciales Parciales para simulación de sistemas lógicos y físicos.",
    extendedDescription:
      "Desarrollo algorítmico en GNU Octave para la resolución numérica de Ecuaciones Diferenciales Parciales (EDPs) con condiciones de borde de Dirichlet y Neumann.",
    technicalHighlights: [
      "Problema 1: Redes Neuronales Profundas (Diferencias Finitas): Modelado de la propagación y disipación de información utilizando la ecuación de difusión parabólica en 1D. Implementación de un esquema numérico explícito y análisis de condiciones de estabilidad temporal y espacial.",
      "Problema 2: Propagación de Señales (Elementos Finitos - FEM): Simulación de interferencia de señal inalámbrica ante obstáculos físicos mediante la ecuación de Laplace elíptica en 2D. Desarrollo completo del mallado triangular, ensamblaje de la matriz de rigidez global y resolución del sistema.",
    ],
    tags: ["GNU Octave", "EDPs", "FEM", "Diferencias Finitas"],
    repoUrl: "https://github.com/octavioleiva/Proyectos-Octave.git",
    images: ["/octave-red.png", "/octave-fem.png"],
  },
];
