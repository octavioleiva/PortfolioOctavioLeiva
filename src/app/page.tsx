"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import TechText from "@/components/TechText";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

const translations = {
  es: {
    navProjects: "[01] PROYECTOS",
    navAbout: "[02] SOBRE MÍ",
    navContact: "[03] CONTACTO",
    available: "DISPONIBLE",
    location: "[02] ARGENTINA",
    viewProjects: "VER PROYECTOS",
    profileTitle: "> PERFIL.EXE",
    heroP1: "Estudiante avanzado (4to año) de Ingeniería en Sistemas de Información (UTN FRCU). Mi perfil abarca el ciclo de vida completo de un proyecto tecnológico, no solo el código. Tengo experiencia práctica en análisis y diseño de sistemas, administración y formulación de planes de trabajo, simulación de sistemas y modelado.",
    heroP2: "Tengo experiencia práctica construyendo ecosistemas Full-Stack, realizando relevamiento exhaustivo de requisitos para el diseño y arquitectura de Bases de Datos, y programando lógica de bajo nivel. Además, aplico modelado matemático y simulación computacional mediante GNU Octave, aportando una visión ingenieril orientada a la resolución de problemas complejos y la escalabilidad de la infraestructura.",
    sectionProjectsTitle: "PROYECTOS",
    sectionProjectsCount: "[01] 05 ENTRADAS",
    btnDetails: "[ DETALLES + ]",
    projWayfinder: {
      title: "WAYFINDER",
      extDescTitle: "> DESCRIPCIÓN EXTENDIDA",
      extDescText: "Plataforma integral de turismo e interacción. El sistema permite a los usuarios autenticados explorar destinos geolocalizados, interactuar mediante calificaciones y reseñas, y gestionar alertas personalizadas sobre eventos guardados.",
      techTitle: "> ASPECTOS TÉCNICOS",
      techBullets: [
        "Implementación de sistema de autenticación, autorización y gestión de sesiones de usuario.",
        "Desarrollo de módulos de interacción social (CRUD de comentarios y sistema de rating).",
        "Arquitectura de notificaciones y seguimiento de eventos favoritos.",
        "Backend en .NET con base de datos relacional en SQL Server.",
        "Frontend SPA desarrollado en Angular con integración de APIs externas (GeoDB)."
      ],
      stackTitle: "> STACK TECNOLÓGICO",
      previewTitle: "> VISTA PREVIA DEL PROYECTO",
      repoBtn: "REPOSITORIO"
    },
    projPascal: {
      title: "INTÉRPRETE PASCAL",
      extDescTitle: "> DESCRIPCIÓN EXTENDIDA",
      extDescText: "Proyecto de bajo nivel fundamentado en la teoría de compiladores. Construido enteramente desde cero sin dependencias externas de procesamiento, demostrando un dominio profundo en estructuras de datos, recursividad y lógica computacional dura.",
      techTitle: "> ASPECTOS TÉCNICOS",
      techBullets: [
        "Implementación de analizador léxico (Scanner) para tokenización y validación de caracteres.",
        "Desarrollo de analizador sintáctico (Parser) mediante la construcción de Árboles de Sintaxis Abstracta (AST).",
        "Análisis semántico y gestión robusta de tabla de símbolos.",
        "Motor de evaluación de expresiones matemáticas y lógicas en tiempo de ejecución."
      ],
      stackTitle: "> STACK TECNOLÓGICO",
      stackCompiler: "TEORÍA DE COMPILADORES",
      repoBtn: "REPOSITORIO"
    },
    projScoring: { title: "SISTEMA DE SCORING" },
    projKws: { title: "WEB KWS" },
    projOctave: { title: "SIMULACIONES NUMÉRICAS" }
  },
  en: {
    navProjects: "[01] PROJECTS",
    navAbout: "[02] ABOUT ME",
    navContact: "[03] CONTACT",
    available: "AVAILABLE",
    location: "[02] ARGENTINA",
    viewProjects: "VIEW PROJECTS",
    profileTitle: "> PROFILE.EXE",
    heroP1: "Advanced student (4th year) of Information Systems Engineering (UTN FRCU). My profile covers the entire lifecycle of a technological project, not just the code. I have practical experience in systems analysis and design, administration and formulation of work plans, systems simulation, and modeling.",
    heroP2: "I have practical experience building Full-Stack ecosystems, performing exhaustive requirements gathering for Database design and architecture, and programming low-level logic. Additionally, I apply mathematical modeling and computational simulation using GNU Octave, providing an engineering vision focused on solving complex problems and infrastructure scalability.",
    sectionProjectsTitle: "PROJECTS",
    sectionProjectsCount: "[01] 05 ENTRIES",
    btnDetails: "[ DETAILS + ]",
    projWayfinder: {
      title: "WAYFINDER",
      extDescTitle: "> EXTENDED DESCRIPTION",
      extDescText: "Comprehensive tourism and interaction platform. The system allows authenticated users to explore geolocated destinations, interact through ratings and reviews, and manage personalized alerts for saved events.",
      techTitle: "> TECHNICAL ASPECTS",
      techBullets: [
        "Implementation of an authentication, authorization, and user session management system.",
        "Development of social interaction modules (comments CRUD and rating system).",
        "Notification architecture and favorite events tracking.",
        ".NET backend with a relational SQL Server database.",
        "SPA frontend developed in Angular with external API integration (GeoDB)."
      ],
      stackTitle: "> TECH STACK",
      previewTitle: "> PROJECT PREVIEW",
      repoBtn: "REPOSITORY"
    },
    projPascal: {
      title: "PASCAL INTERPRETER",
      extDescTitle: "> EXTENDED DESCRIPTION",
      extDescText: "Low-level project based on compiler theory. Built entirely from scratch with no external processing dependencies, demonstrating deep mastery of data structures, recursion, and hard computational logic.",
      techTitle: "> TECHNICAL ASPECTS",
      techBullets: [
        "Implementation of a lexical analyzer (Scanner) for character tokenization and validation.",
        "Development of a syntax analyzer (Parser) through the construction of Abstract Syntax Trees (AST).",
        "Semantic analysis and robust symbol table management.",
        "Runtime evaluation engine for mathematical and logical expressions."
      ],
      stackTitle: "> TECH STACK",
      stackCompiler: "COMPILER THEORY",
      repoBtn: "REPOSITORY"
    },
    projScoring: { title: "SCORING SYSTEM" },
    projKws: { title: "KWS WEBSITE" },
    projOctave: { title: "NUMERICAL SIMULATIONS" }
  }
};

/* ==========================================================================
 *  NEO-BRUTALISMO / INDUSTRIAL
 *  Reglas: sin radios · sin sombras difusas · bordes de 2px · sombras sólidas
 *  desplazadas · títulos display gigantes en mayúsculas · negro/blanco/rojo.
 * ========================================================================== */

const pad = (n: number) => String(n).padStart(2, "0");

/** Sombras brutales reutilizables (sólidas, sin blur). */
const SHADOW_RED = "shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]";
const SHADOW_WHITE = "shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]";
/** Al hacer hover el botón "se hunde" sobre su sombra. */
const PRESS =
  "transition-all duration-100 hover:translate-x-1.5 hover:translate-y-1.5 hover:shadow-none";

export default function Home() {
  const [lang, setLang] = useState<'es' | 'en'>('es');

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <main className="flex-1 pt-14">
        <Hero lang={lang} />
        <Projects lang={lang} />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* --------------------------------------------------------------------------
 *  NAVBAR
 * ------------------------------------------------------------------------ */
function Navbar({
  lang,
  setLang,
}: {
  lang: 'es' | 'en';
  setLang: (lang: 'es' | 'en') => void;
}) {
  const navItems = [
    { href: "#proyectos", label: translations[lang].navProjects, id: "nav-proyectos" },
    { href: "#sobre-mi", label: translations[lang].navAbout, id: "nav-sobre-mi" },
    { href: "#contacto", label: translations[lang].navContact, id: "nav-contacto" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b-2 border-white bg-black">
      <nav aria-label="Navegación principal" className="flex h-full items-stretch justify-between">
        <a
          href="#inicio"
          id="nav-logo"
          className="flex items-center bg-red-600 px-4 font-display text-xl text-black sm:px-6"
        >
          OL<span className="animate-blink">_</span>
        </a>

        <ul className="flex items-stretch">
          {navItems.map((item) => (
            <li key={item.href} className="flex border-l-2 border-white">
              <a
                href={item.href}
                id={item.id}
                className="flex items-center gap-2 px-3 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-100 hover:bg-white hover:text-black sm:px-6 sm:text-sm"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="flex border-l-2 border-white">
            <button
              type="button"
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              id="nav-lang-toggle"
              aria-label="Alternar idioma"
              className="flex items-center justify-center bg-white px-3 font-mono text-xs font-black uppercase tracking-wider text-black transition-colors duration-100 hover:bg-red-600 hover:text-black sm:px-5 sm:text-sm cursor-pointer"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

/* --------------------------------------------------------------------------
 *  HERO — asimétrico
 * ------------------------------------------------------------------------ */
function Hero({ lang }: { lang: 'es' | 'en' }) {
  const meta = [
    siteConfig.name,
    siteConfig.location,
  ];

  return (
    <section id="inicio" className="border-b-2 border-white">
      {/* Barra de metadatos */}
      <div className="grid grid-cols-1 border-b-2 border-white text-[11px] uppercase tracking-widest sm:grid-cols-3 md:text-xs">
        {meta.map((item, i) => (
          <p
            key={item}
            className="border-b-2 border-white px-4 py-3 sm:border-b-0 sm:border-r-2 md:px-6"
          >
            <span className="text-red-600">[{pad(i)}]</span> {item}
          </p>
        ))}
        <p className="flex items-center gap-2 px-4 py-3 md:px-6">
          <span className="inline-block h-2.5 w-2.5 animate-blink bg-red-600" aria-hidden />
          Disponible
        </p>
      </div>

      {/* Bloque: texto + CTAs | animación interactiva TechText */}
      <div className="grid lg:grid-cols-12">
        <Reveal
          delay={0.1}
          className="flex flex-col justify-between gap-10 border-b-2 border-white p-6 md:p-10 lg:col-span-5 lg:border-b-0 lg:border-r-2"
        >
          <div>
            <p className="mb-4 text-xs uppercase tracking-widest text-red-600">
              {translations[lang].profileTitle}
            </p>
            <p className="text-base leading-relaxed text-neutral-100 md:text-lg">
              {translations[lang].heroP1}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300 md:text-base">
              {translations[lang].heroP2}
            </p>
          </div>

          <div className="flex">
            <a
              href="#proyectos"
              id="hero-cta-projects"
              className={`inline-flex items-center justify-center gap-3 border-2 border-red-600 bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-widest text-black ${SHADOW_WHITE} ${PRESS}`}
            >
              {translations[lang].viewProjects} <ArrowRight size={18} strokeWidth={3} />
            </a>
          </div>
        </Reveal>

        <div className="flex items-center justify-center overflow-hidden p-6 md:p-10 lg:col-span-7">
          <div className="flex w-full flex-col items-center justify-center gap-8">
            <div className="w-full h-[200px] md:h-[250px] flex items-center justify-center -ml-4">
              <TechText accentColor="#dc2626" color="#ffffff" fontSize={140} sweep={true} text="OCTAVIO LEIVA" />
            </div>
            <Image
              src="/foto.jpg"
              alt={siteConfig.name}
              width={256}
              height={256}
              priority
              className="h-56 w-56 md:h-64 md:w-64 object-cover grayscale hover:grayscale-0 transition-all duration-300 border-4 border-white shadow-[8px_8px_0px_0px_rgba(220,38,38,1)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 *  ENCABEZADO DE SECCIÓN
 * ------------------------------------------------------------------------ */
function SectionHeader({ index, title, note }: { index: number; title: string; note: string }) {
  return (
    <Reveal className="flex flex-col justify-between gap-4 border-b-2 border-white px-4 py-10 md:flex-row md:items-end md:px-6 md:py-14">
      <h2 className="font-display uppercase leading-[0.85] tracking-tighter text-[clamp(2.75rem,10vw,9rem)]">
        {title}
      </h2>
      <p className="text-xs uppercase tracking-widest text-red-600">
        {note.startsWith("[") ? note : `[${pad(index)}] ${note}`}
      </p>
    </Reveal>
  );
}

/* --------------------------------------------------------------------------
 *  PROYECTOS — lista de filas completas
 * ------------------------------------------------------------------------ */
function Projects({ lang }: { lang: 'es' | 'en' }) {
  const [openProject, setOpenProject] = useState<number | null>(null);

  const getProjectTitle = (index: number) => {
    switch (index) {
      case 0:
        return translations[lang].projWayfinder.title;
      case 1:
        return translations[lang].projPascal.title;
      case 2:
        return translations[lang].projScoring.title;
      case 3:
        return translations[lang].projKws.title;
      case 4:
        return translations[lang].projOctave.title;
      default:
        return projects[index].title;
    }
  };

  const getProjectExtDesc = (index: number) => {
    switch (index) {
      case 0:
        return translations[lang].projWayfinder.extDescText;
      case 1:
        return translations[lang].projPascal.extDescText;
      default:
        return projects[index].extendedDescription;
    }
  };

  const getProjectBullets = (index: number) => {
    switch (index) {
      case 0:
        return translations[lang].projWayfinder.techBullets;
      case 1:
        return translations[lang].projPascal.techBullets;
      default:
        return projects[index].technicalHighlights;
    }
  };

  return (
    <section id="proyectos">
      <SectionHeader
        index={1}
        title={translations[lang].sectionProjectsTitle}
        note={translations[lang].sectionProjectsCount}
      />

      <ul>
        {projects.map((project, i) => {
          const slug = project.title.toLowerCase().replace(/\s+/g, "-");
          const isOpen = openProject === i;
          const hasImages = Boolean(project.image || (project.images && project.images.length > 0));

          return (
            <Reveal as="li" key={project.title} className="group/item">
              {/* Encabezado / Botón clickeable */}
              <button
                type="button"
                onClick={() => setOpenProject(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between border-b-2 border-white px-4 py-8 text-left transition-colors duration-150 hover:bg-red-600 hover:text-black md:px-6 md:py-10 bg-black text-white cursor-pointer"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="text-sm font-bold text-red-600 group-hover:text-black">
                    /{pad(i + 1)}
                  </span>
                  <h3 className="font-display text-3xl uppercase leading-none tracking-tight transition-transform duration-150 group-hover:translate-x-2 md:text-5xl">
                    {getProjectTitle(i)}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden font-mono text-xs font-bold uppercase tracking-widest sm:inline text-neutral-400 group-hover:text-black">
                    {isOpen ? (lang === "es" ? "[ CERRAR - ]" : "[ CLOSE - ]") : translations[lang].btnDetails}
                  </span>
                  <span
                    aria-hidden
                    className={`flex h-9 w-9 items-center justify-center border-2 border-white font-display text-xl transition-all duration-300 group-hover:border-black ${
                      isOpen ? "rotate-45 bg-white text-black group-hover:bg-black group-hover:text-white" : ""
                    }`}
                  >
                    +
                  </span>
                </div>
              </button>

              {/* Panel expandido con animación suave */}
              <div
                className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-b-4 border-l-4 border-r-4 border-white bg-black p-6 md:p-10">
                    <div
                      className={`flex flex-col ${
                        hasImages ? "lg:flex-row lg:items-start lg:justify-between" : ""
                      } gap-8`}
                    >
                      {/* Lado izquierdo: Descripción extendida, Aspectos técnicos, Stack y Botones */}
                      <div className={`flex flex-col gap-6 ${hasImages ? "flex-1" : ""}`}>
                        <div>
                          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-red-600">
                            {translations[lang].projPascal.extDescTitle}
                          </p>
                          <p className="text-sm md:text-base leading-relaxed text-neutral-200">
                            {getProjectExtDesc(i)}
                          </p>
                        </div>

                        <div>
                          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-red-600">
                            {translations[lang].projPascal.techTitle}
                          </p>
                          <ul className="space-y-2.5 text-sm leading-relaxed" aria-label="Aspectos Técnicos">
                            {getProjectBullets(i).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span
                                  className="font-mono text-red-600 font-bold select-none text-base leading-none mt-1"
                                  aria-hidden
                                >
                                  —
                                </span>
                                <span className="text-neutral-300">
                                  {item.startsWith("Problema ") ? (
                                    <>
                                      <strong className="text-white font-bold">
                                        {item.slice(0, item.indexOf("):") + 2)}
                                      </strong>{" "}
                                      {item.slice(item.indexOf("):") + 2).trim()}
                                    </>
                                  ) : (
                                    item
                                  )}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-red-600">
                            {translations[lang].projPascal.stackTitle}
                          </p>
                          <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
                            {project.tags.map((tag) => {
                              const displayTag =
                                i === 1 && (tag === "Teoría de Compiladores" || tag === "TEORÍA DE COMPILADORES")
                                  ? translations[lang].projPascal.stackCompiler
                                  : tag;
                              return (
                                <li
                                  key={tag}
                                  className="border-2 border-red-600 bg-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-[2px_2px_0px_0px_rgba(220,38,38,1)]"
                                >
                                  {displayTag}
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                          {project.repoUrl && (
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              id={`project-${slug}-repo`}
                              className="inline-flex items-center justify-center gap-2.5 border-2 border-white bg-red-600 px-6 py-3.5 text-xs md:text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-white hover:text-black hover:border-black active:translate-x-1.5 active:translate-y-1.5"
                            >
                              <GithubIcon size={18} /> {translations[lang].projPascal.repoBtn} <ArrowUpRight size={16} strokeWidth={3} />
                            </a>
                          )}
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              id={`project-${slug}-demo`}
                              className="inline-flex items-center justify-center gap-2.5 border-2 border-white bg-black px-6 py-3.5 text-xs md:text-sm font-bold uppercase tracking-widest text-white shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] transition-all duration-100 hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-white hover:text-black hover:border-black active:translate-x-1.5 active:translate-y-1.5"
                            >
                              Ver Demo en vivo <ArrowUpRight size={16} strokeWidth={3} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Lado derecho: Imagen o galería de imágenes de vista previa */}
                      {hasImages && (
                        <div className="flex flex-col items-start lg:items-end justify-start shrink-0">
                          <div className="w-full sm:w-auto">
                            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-red-600">
                              {translations[lang].projWayfinder.previewTitle}
                            </p>
                            {project.images && project.images.length > 0 ? (
                              <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
                                {project.images.map((imgSrc, imgIdx) => (
                                  <a
                                    key={imgIdx}
                                    href={project.repoUrl || imgSrc}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group/img block border-2 border-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] transition-all duration-150 hover:border-red-600"
                                  >
                                    <Image
                                      src={imgSrc}
                                      alt={`Simulación ${imgIdx + 1} de ${project.title}`}
                                      width={600}
                                      height={500}
                                      className="w-48 md:w-64 object-cover border-2 border-white transition-transform duration-200 group-hover/img:scale-[1.02]"
                                    />
                                  </a>
                                ))}
                              </div>
                            ) : project.image && (
                              project.demoUrl ? (
                                <a
                                  href={project.demoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/img block border-2 border-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] transition-all duration-150 hover:border-red-600"
                                >
                                  <Image
                                    src={project.image}
                                    alt={`Captura de ${project.title}`}
                                    width={1024}
                                    height={500}
                                    className="w-full sm:w-64 md:w-80 object-cover border-2 border-white transition-transform duration-200 group-hover/img:scale-[1.02]"
                                  />
                                </a>
                              ) : project.repoUrl ? (
                                <a
                                  href={project.repoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group/img block border-2 border-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)] transition-all duration-150 hover:border-red-600"
                                >
                                  <Image
                                    src={project.image}
                                    alt={`Captura de ${project.title}`}
                                    width={1024}
                                    height={500}
                                    className="w-full sm:w-64 md:w-80 object-cover border-2 border-white transition-transform duration-200 group-hover/img:scale-[1.02]"
                                  />
                                </a>
                              ) : (
                                <div className="border-2 border-white shadow-[6px_6px_0px_0px_rgba(220,38,38,1)]">
                                  <Image
                                    src={project.image}
                                    alt={`Captura de ${project.title}`}
                                    width={1024}
                                    height={500}
                                    className="w-full sm:w-64 md:w-80 object-cover border-2 border-white"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------------------------
 *  SOBRE MÍ — ficha técnica
 * ------------------------------------------------------------------------ */
const specs = [
  {
    key: "Formación",
    value: "ING. EN SISTEMAS (UTN FRCU) · FUNDAMENTOS IA Y LLMs (ESC. INF. INT.)",
  },
  {
    key: "Práctica",
    value: "DISEÑO UML · APIs REST · POO · SIMULACIÓN (OCTAVE / VENSIM / SIMIO) · RPA",
  },
  {
    key: "Lenguajes & Stack",
    value: "C# · .NET · ANGULAR · NEXT.JS · PASCAL · SMALLTALK · SQL SERVER",
  },
  {
    key: "Cloud & Servicios",
    value: "AWS · VERCEL · SUPABASE · EMAILJS · RESEND",
  },
  {
    key: "IA & Hardware",
    value: "CLAUDE · ANTIGRAVITY · OLLAMA (LLMs) · ESP32 · ARDUINO IDE",
  },
  {
    key: "Dev Tools",
    value: "GIT · VS CODE · VISUAL STUDIO · POSTMAN · DBEAVER · SSMS",
  },
  {
    key: "Ubicación",
    value: "CONCEPCIÓN DEL URUGUAY, ARGENTINA",
  },
];

function About() {
  return (
    <section id="sobre-mi" className="border-b-2 border-white">
      <SectionHeader index={2} title="Sobre mí" note="ficha técnica" />

      <div className="grid lg:grid-cols-12">
        <Reveal className="border-b-2 border-white p-6 md:p-10 lg:col-span-5 lg:border-b-0 lg:border-r-2">
          <p className="text-lg leading-relaxed md:text-xl">
            Ingeniería aplicada al software: concibo sistemas integrales, desde el modelado formal y bases de datos, hasta la{" "}
            <span className="text-red-600">automatización de hardware y la integración de Inteligencia Artificial</span>.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            Combino la formación académica en la UTN FRCU con el desarrollo de ecosistemas modernos. Tengo experiencia práctica en arquitecturas Cloud, RPA, diseño de sistemas mediante UML, simulación computacional y el funcionamiento profundo de <span className="text-red-600">modelos LLMs y agentes autónomos</span>.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <dl>
            {specs.map((spec, i) => (
              <div
                key={spec.key}
                className={`grid grid-cols-3 gap-4 px-6 py-5 md:px-10 ${i < specs.length - 1 ? "border-b-2 border-white" : ""}`}
              >
                <dt className="text-xs font-bold uppercase tracking-widest text-red-600">
                  {spec.key}
                </dt>
                <dd className="col-span-2 text-sm font-bold uppercase tracking-wide">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 *  CONTACTO — bloque rojo a sangre
 * ------------------------------------------------------------------------ */
function Contact() {
  return (
    <section id="contacto" className="border-b-2 border-white bg-red-600 text-black">
      <Reveal className="px-4 py-16 md:px-6 md:py-24">
        <p className="text-xs font-bold uppercase tracking-widest">[03] Contacto</p>
        <h2 className="mt-4 font-display uppercase leading-[0.85] tracking-tighter text-[clamp(3rem,13vw,12rem)]">
          Hablemos.
        </h2>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row">
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            id="contact-linkedin"
            className={`inline-flex items-center justify-center gap-3 border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-widest text-white ${SHADOW_WHITE} ${PRESS}`}
          >
            <LinkedinIcon size={18} /> LinkedIn
          </a>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            id="contact-github"
            className={`inline-flex items-center justify-center gap-3 border-2 border-black bg-black px-6 py-4 text-sm font-bold uppercase tracking-widest text-white ${SHADOW_WHITE} ${PRESS}`}
          >
            <GithubIcon size={18} /> GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function CurrentYear() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}

function Footer() {
  const socials = [
    { label: "GitHub", href: siteConfig.socials.github, Icon: GithubIcon },
    { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedinIcon },
  ];

  return (
    <footer className="flex flex-col items-stretch justify-between text-xs uppercase tracking-widest sm:flex-row">
      <p className="border-b-2 border-white px-4 py-5 sm:border-b-0 md:px-6">
        © <CurrentYear /> {siteConfig.name}
      </p>
      <ul className="flex">
        {socials.map(({ label, href, Icon }) => (
          <li key={label} className="flex border-white sm:border-l-2 [&:not(:first-child)]:border-l-2">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              id={`footer-${label.toLowerCase()}`}
              className="flex items-center gap-3 px-6 py-5 font-bold transition-colors duration-100 hover:bg-red-600 hover:text-black"
            >
              <Icon size={18} /> {label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
