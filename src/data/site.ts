/**
 * Configuración central del sitio.
 * Editá estos valores para personalizar textos y enlaces sin tocar los componentes.
 */
export const siteConfig = {
  name: "Octavio Nicolás Leiva",
  role: "Software Engineering & IT Architecture",
  location: "Argentina",
  email: "contacto@octavioleiva.dev",
  cvUrl: "/cv/Octavio-Leiva-CV.pdf",
  socials: {
    github: "https://github.com/octavioleiva",
    linkedin: "https://www.linkedin.com/in/octavioleiva",
  },
} as const;

export const navLinks = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
] as const;

/** Tecnologías que se muestran en la cinta (marquee). */
export const stack = [
  "IT Architecture",
  "Software Engineering",
  ".NET",
  "SQL Server",
  "Angular",
  "Pascal",
  "Docker",
  "DevOps",
  "Sistemas & Modelado",
  "TypeScript",
  "Next.js",
] as const;
