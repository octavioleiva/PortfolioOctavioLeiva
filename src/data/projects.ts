export interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    title: "WAYFINDER",
    description:
      "Aplicación integral de búsqueda y geolocalización de destinos integrando APIs de GeoDB. Arquitectura escalable y bases de datos relacionales.",
    tags: [".NET", "Angular", "SQL Server"],
    repoUrl: "https://github.com/Equipo-de-desarrollo-LSD/App.git",
  },
  {
    title: "INTÉRPRETE PASCAL",
    description:
      "Desarrollo desde cero de un intérprete de lenguaje de programación. Implementación profunda de algoritmos de análisis léxico, sintáctico y semántico.",
    tags: ["Pascal", "Teoría de Compiladores"],
    repoUrl: "https://github.com/octavioleiva/Bilingue-Interprete.git",
  },
  {
    title: "SISTEMA DE SCORING",
    description:
      "Aplicación de escritorio para la gestión y cálculo de puntuaciones. Interfaz de usuario y lógica de negocios construida en entornos de desarrollo rápido.",
    tags: ["Pascal", "Lazarus"],
    repoUrl: "https://github.com/octavioleiva/Proyecto-Scoring.git",
  },
  {
    title: "WEB KWS",
    description:
      "Desarrollo y maquetación de plataforma web corporativa enfocada en la presentación de servicios, optimización de interfaz y experiencia de usuario.",
    tags: ["Frontend", "Web Development"],
    demoUrl: "https://keywaysolution.vercel.app/",
  },
];
