import Image from 'next/image';
import Link from 'next/link';
import projects from '@/data/projects';

const services = [
  {
    title: 'Interfaces precisas',
    description: 'Componentes limpos, responsivos e alinhados ao objetivo de cada produto.'
  },
  {
    title: 'Estado e fluxos',
    description: 'Experiencias com carrinho, formularios, dashboards e interacoes reais.'
  },
  {
    title: 'Entrega front-end',
    description: 'Implementacao com TypeScript, acessibilidade, performance e acabamento visual.'
  }
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/GabrielNBS' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Portfolio', href: '#projects' }
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon icon-sm">
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

function SectionLink({ label, href }: { label: string; href: string }) {
  return (
    <a className="section-link" href={href}>
      <span>{label}</span>
      <ArrowIcon />
    </a>
  );
}

export default function Home() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <main id="top" className="site-shell">
      <header className="site-header">
        <Link href="#top" className="brand" aria-label="Voltar ao topo">
          <span className="brand-mark" aria-hidden="true" />
          <span>Gabriel NBS</span>
        </Link>
        <nav className="site-nav" aria-label="Navegacao principal">
          <a href="#about">Sobre</a>
          <a href="#projects">Projetos</a>
          <a href="#contact">Contato</a>
        </nav>
      </header>

      <section className="hero section-grid" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="vertical-note">Front-end portfolio</p>
          <h1 id="hero-title">Interfaces front-end com clareza, ritmo e precisao.</h1>
          <p className="hero-text">
            Desenvolvo experiencias web responsivas que combinam arquitetura de componentes,
            usabilidade e acabamento visual para valorizar produtos reais.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="#projects">
              Ver projetos
              <ArrowIcon />
            </a>
            <a className="button button-secondary" href="#contact">
              Contato
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Preview de projetos em mockups responsivos">
          <div className="enso" aria-hidden="true" />
          <div className="desktop-frame">
            <Image
              src="/mockups/Desktop/Regula-Desktop.png"
              alt="Preview desktop do projeto Regula"
              fill
              priority
              sizes="(max-width: 900px) 92vw, 50vw"
            />
          </div>
          <div className="mobile-frame">
            <Image
              src="/mockups/Mobile/Regula-Mobile.png"
              alt="Preview mobile do projeto Regula"
              fill
              priority
              sizes="180px"
            />
          </div>
        </div>
      </section>

      <section className="bridge" aria-label="Navegacao rapida">
        <SectionLink label="Sobre" href="#about" />
        <SectionLink label="Projetos" href="#projects" />
        <SectionLink label="Contato" href="#contact" />
      </section>

      <section id="about" className="about section-grid" aria-labelledby="about-title">
        <div>
          <p className="section-kicker">Sobre</p>
          <h2 id="about-title">Design limpo com base tecnica.</h2>
        </div>
        <div className="about-content">
          <p>
            Sou desenvolvedor front-end focado em construir interfaces consistentes, acessiveis
            e prontas para evoluir. Meus projetos exploram e-commerce, dashboards, landing pages
            e experiencias com estado global.
          </p>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-item" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="divider-section" aria-label="Principios de trabalho">
        <p>Espaco, contraste e ordem para cada decisao de interface.</p>
      </section>

      <section id="projects" className="projects" aria-labelledby="projects-title">
        <div className="section-heading">
          <p className="section-kicker">Projetos</p>
          <h2 id="projects-title">Provas tecnicas em contexto real.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <article className="project-card" key={project.slug}>
              <Link href={`/projects/${project.slug}`} className="project-media">
                <Image
                  src={project.mockups.desktop}
                  alt={`Preview desktop do projeto ${project.name}`}
                  fill
                  sizes="(max-width: 800px) 92vw, (max-width: 1200px) 44vw, 31vw"
                />
              </Link>
              <div className="project-body">
                <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="tag-list" aria-label={`Tecnologias de ${project.name}`}>
                  {project.techs.slice(0, 4).map((tech) => (
                    <span className="tag" key={tech.name}>
                      {tech.name}
                    </span>
                  ))}
                </div>
                <div className="card-actions">
                  <Link className="text-link" href={`/projects/${project.slug}`}>
                    Ver projeto
                    <ArrowIcon />
                  </Link>
                  <a className="icon-link" href={project.deploy} target="_blank" rel="noreferrer">
                    Deploy
                    <ExternalIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact section-grid" aria-labelledby="contact-title">
        <div>
          <p className="section-kicker">Contato</p>
          <h2 id="contact-title">Vamos construir algo claro e bem acabado.</h2>
        </div>
        <div className="contact-panel">
          <p>
            Aberto a oportunidades front-end, projetos freelance e conversas sobre produto,
            interface e implementacao.
          </p>
          <div className="button-row">
            <a className="button button-primary" href="https://github.com/GabrielNBS" target="_blank" rel="noreferrer">
              GitHub
              <ArrowIcon />
            </a>
            <a className="button button-secondary" href="https://github.com/GabrielNBS" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <div className="social-list" aria-label="Links sociais">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel={social.href.startsWith('http') ? 'noreferrer' : undefined}>
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>Gabriel NBS</span>
        <span>Portfolio front-end</span>
      </footer>

      <a href="#top" className="scroll-top" aria-label="Voltar ao topo">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m6 15 6-6 6 6" />
        </svg>
      </a>
    </main>
  );
}

