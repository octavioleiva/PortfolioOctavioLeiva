import Image from "next/image";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import TechText from "@/components/TechText";
import { projects } from "@/data/projects";
import { navLinks, siteConfig, stack } from "@/data/site";

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
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-14">
        <Hero />
        <StackMarquee />
        <Projects />
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
function Navbar() {
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
          {navLinks.map((link, i) => (
            <li key={link.href} className="flex border-l-2 border-white">
              <a
                href={link.href}
                id={`nav-${link.href.slice(1)}`}
                className="flex items-center gap-2 px-3 text-[11px] font-bold uppercase tracking-widest transition-colors duration-100 hover:bg-white hover:text-black sm:px-6 sm:text-sm"
              >
                <span className="hidden text-red-600 sm:inline">{pad(i + 1)}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

/* --------------------------------------------------------------------------
 *  HERO — asimétrico
 * ------------------------------------------------------------------------ */
function Hero() {
  const meta = [
    siteConfig.name,
    siteConfig.role,
    siteConfig.location,
  ];

  return (
    <section id="inicio" className="border-b-2 border-white">
      {/* Barra de metadatos */}
      <div className="grid grid-cols-2 border-b-2 border-white text-[11px] uppercase tracking-widest md:grid-cols-4 md:text-xs">
        {meta.map((item, i) => (
          <p
            key={item}
            className={`border-white px-4 py-3 md:px-6 ${i % 2 === 0 ? "border-r-2" : "md:border-r-2"} ${i < 2 ? "border-b-2 md:border-b-0" : ""}`}
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
              &gt; perfil.exe
            </p>
            <p className="text-base leading-relaxed text-neutral-100 md:text-lg">
              Estudiante avanzado (4to año) de <strong className="bg-white px-1 text-black">Ingeniería en Sistemas de Información (UTN FRCU)</strong>. Mi perfil abarca el ciclo de vida completo de un proyecto tecnológico, no solo el código. Tengo experiencia práctica en análisis y diseño de sistemas, administración y formulación de planes de trabajo, simulación de sistemas y modelado.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300 md:text-base">
              Busco roles dinámicos en <span className="border-b-2 border-red-600 font-bold text-white">Ingeniería de Software</span>, <span className="border-b-2 border-red-600 font-bold text-white">Arquitectura IT</span> o <span className="border-b-2 border-red-600 font-bold text-white">DevOps</span>, aportando una visión estructurada desde la infraestructura hasta el despliegue.
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row">
            <a
              href="#proyectos"
              id="hero-cta-projects"
              className={`inline-flex items-center justify-center gap-3 border-2 border-red-600 bg-red-600 px-6 py-4 text-sm font-bold uppercase tracking-widest text-black ${SHADOW_WHITE} ${PRESS}`}
            >
              Ver proyectos <ArrowRight size={18} strokeWidth={3} />
            </a>
            <a
              href="/cv-octavio-leiva.pdf"
              id="hero-cta-cv"
              download
              className={`inline-flex items-center justify-center gap-3 border-2 border-white bg-black px-6 py-4 text-sm font-bold uppercase tracking-widest text-white ${SHADOW_RED} ${PRESS}`}
            >
              Descargar CV <ArrowDown size={18} strokeWidth={3} />
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
 *  CINTA DE STACK (marquee)
 * ------------------------------------------------------------------------ */
function StackMarquee() {
  const items = [...stack, ...stack];
  return (
    <div className="overflow-hidden border-b-2 border-white bg-red-600 py-3 text-black">
      <ul className="flex w-max animate-marquee">
        {items.map((tech, i) => (
          <li
            key={`${tech}-${i}`}
            aria-hidden={i >= stack.length}
            className="flex items-center gap-6 px-3 font-display text-xl uppercase md:text-2xl"
          >
            {tech}
            <span aria-hidden>✶</span>
          </li>
        ))}
      </ul>
    </div>
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
        [{pad(index)}] {note}
      </p>
    </Reveal>
  );
}

/* --------------------------------------------------------------------------
 *  PROYECTOS — lista de filas completas
 * ------------------------------------------------------------------------ */
function Projects() {
  return (
    <section id="proyectos">
      <SectionHeader index={1} title="Proyectos" note={`${pad(projects.length)} entradas`} />

      <ul>
        {projects.map((project, i) => {
          const slug = project.title.toLowerCase().replace(/\s+/g, "-");
          return (
            <Reveal
              as="li"
              key={project.title}
              className="group border-b-2 border-white transition-colors duration-150 hover:bg-red-600 hover:text-black"
            >
              <article className="grid gap-6 px-4 py-8 md:grid-cols-12 md:items-start md:px-6 md:py-10">
                <span className="text-sm font-bold text-red-600 group-hover:text-black md:col-span-1">
                  /{pad(i + 1)}
                </span>

                <h3 className="font-display text-3xl uppercase leading-none tracking-tight transition-transform duration-150 group-hover:translate-x-2 md:col-span-5 md:text-5xl">
                  {project.title}
                </h3>

                <div className="md:col-span-4">
                  <p className="text-sm leading-relaxed">{project.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologías">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="border-2 border-red-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-red-600 group-hover:border-black group-hover:text-black"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-6 text-sm font-bold uppercase tracking-widest md:col-span-2 md:flex-col md:items-end md:gap-3">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`project-${slug}-code`}
                      className="inline-flex items-center gap-1 border-b-2 border-current hover:bg-black hover:text-white"
                    >
                      Código <ArrowUpRight size={16} strokeWidth={3} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`project-${slug}-demo`}
                      className="inline-flex items-center gap-1 border-b-2 border-current hover:bg-black hover:text-white"
                    >
                      Demo <ArrowUpRight size={16} strokeWidth={3} />
                    </a>
                  )}
                </div>
              </article>
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
  { key: "Formación", value: "Ing. en Sistemas de Información (UTN FRCU — 4to año)" },
  { key: "Enfoque", value: "Software Engineering · IT Architecture · DevOps" },
  { key: "Práctica", value: "Análisis & Diseño · Modelado · Simulación · Planes de trabajo" },
  { key: "Stack", value: ".NET · SQL Server · Angular · Pascal · Docker" },
  { key: "Ubicación", value: siteConfig.location },
];

function About() {
  return (
    <section id="sobre-mi" className="border-b-2 border-white">
      <SectionHeader index={2} title="Sobre mí" note="ficha técnica" />

      <div className="grid lg:grid-cols-12">
        <Reveal className="border-b-2 border-white p-6 md:p-10 lg:col-span-5 lg:border-b-0 lg:border-r-2">
          <p className="text-lg leading-relaxed md:text-xl">
            Ingeniería aplicada al software: concibo sistemas con visión de{" "}
            <span className="text-red-600">arquitectura integral, método riguroso y ciclo completo</span>.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-white/70">
            Formación sólida en la UTN FRCU conectando la formulación estratégica y el modelado formal con código robusto, infraestructura y despliegue continuo.
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

        <a
          href={`mailto:${siteConfig.email}`}
          id="contact-email"
          className="mt-10 inline-block break-all font-display text-[clamp(1.25rem,4.5vw,3.5rem)] uppercase leading-tight underline decoration-4 underline-offset-8 transition-colors duration-100 hover:bg-black hover:text-red-600"
        >
          {siteConfig.email}
        </a>

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

/* --------------------------------------------------------------------------
 *  FOOTER
 * ------------------------------------------------------------------------ */

/** Next 16 + Cache Components: `new Date()` debe estar en un scope cacheado. */
async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

function Footer() {
  const socials = [
    { label: "GitHub", href: siteConfig.socials.github, Icon: GithubIcon },
    { label: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedinIcon },
  ];

  return (
    <footer className="flex flex-col items-stretch justify-between text-xs uppercase tracking-widest sm:flex-row">
      <p className="border-b-2 border-white px-4 py-5 sm:border-b-0 md:px-6">
        © <CurrentYear /> {siteConfig.name} <span className="text-red-600">{"//"}</span> Next.js +
        Tailwind
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
