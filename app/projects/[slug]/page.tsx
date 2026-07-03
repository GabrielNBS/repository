import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import projects, { getProjectBySlug } from '@/data/projects';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function ArrowLeftIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon">
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
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

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Projeto nao encontrado'
    };
  }

  return {
    title: `${project.name} | Gabriel NBS`,
    description: project.summary
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main id="top" className="site-shell project-page" style={{ '--project-bg': project.bgColor, '--project-accent': project.accent } as React.CSSProperties}>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Voltar ao portfolio">
          <span className="brand-mark" aria-hidden="true" />
          <span>Gabriel NBS</span>
        </Link>
        <nav className="site-nav" aria-label="Navegacao do projeto">
          <Link href="/#about">Sobre</Link>
          <Link href="/#projects">Projetos</Link>
          <Link href="/#contact">Contato</Link>
        </nav>
      </header>

      <section className="case-hero section-grid">
        <div className="case-copy">
          <Link href="/#projects" className="back-link">
            <ArrowLeftIcon />
            Voltar
          </Link>
          <h1>{project.name}</h1>
          <p>{project.title}</p>
          <div className="case-actions">
            <a className="button button-primary" href={project.deploy} target="_blank" rel="noreferrer">
              Deploy
              <ExternalIcon />
            </a>
            <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer">
              Codigo
            </a>
          </div>
        </div>
        <div className="case-visual">
          <Image
            src={project.mockups.desktop}
            alt={`Preview desktop do projeto ${project.name}`}
            fill
            priority
            sizes="(max-width: 900px) 92vw, 52vw"
          />
        </div>
      </section>

      <section className="case-summary">
        <div>
          <span>Escopo</span>
          <strong>{project.role}</strong>
        </div>
        <div>
          <span>Ano</span>
          <strong>{project.year}</strong>
        </div>
        <div>
          <span>Foco</span>
          <strong>{project.subtitle}</strong>
        </div>
      </section>

      <section className="case-details section-grid">
        <article>
          <p className="section-kicker">Problema</p>
          <h2>{project.problem}</h2>
        </article>
        <article>
          <p className="section-kicker">Solucao</p>
          <p>{project.solution}</p>
          <div className="tag-list">
            {project.techs.map((tech) => (
              <span className="tag" key={tech.name}>
                {tech.name}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="case-gallery" aria-labelledby="gallery-title">
        <div className="section-heading">
          <p className="section-kicker">Galeria</p>
          <h2 id="gallery-title">Layouts em diferentes telas.</h2>
        </div>
        <div className="gallery-grid">
          {project.gallery.map((image, index) => (
            <figure className={index === 0 ? 'gallery-item gallery-wide' : 'gallery-item'} key={image}>
              <Image
                src={image}
                alt={`Galeria ${index + 1} do projeto ${project.name}`}
                fill
                sizes={index === 0 ? '92vw' : '(max-width: 800px) 92vw, 44vw'}
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="case-next">
        <div>
          <p className="section-kicker">Proximo</p>
          <h2>{nextProject.name}</h2>
        </div>
        <Link className="button button-secondary" href={`/projects/${nextProject.slug}`}>
          Ver projeto
        </Link>
      </section>
    </main>
  );
}
