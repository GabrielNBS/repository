import Image from 'next/image';
import TransitionLink from '@/components/ui/TransitionLink';
import { notFound } from 'next/navigation';
import projects, { getProjectBySlug } from '@/data/projects';
import Header from '@/components/layout/Header';
import { ArrowLeftIcon, ExternalIcon, ArrowIcon } from '@/components/ui/Icons';
import ProjectAnimator from '@/components/ProjectAnimator';

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-icon w-icon fill-current" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <ProjectAnimator>
      <main 
        id="top" 
        className="min-h-screen overflow-x-clip" 
        style={{ 
          '--project-bg': project.bgColor, 
          '--project-accent': project.accent 
        } as React.CSSProperties}
      >
        <Header />

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-line">
          <div
            className="absolute inset-0 -z-10 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 20%, var(--project-accent) 0, transparent 60%)`,
            }}
          />
          <div className="w-site mx-auto py-16 md:py-24">
            <TransitionLink
              href={`/#${project.slug}`}
              className="back-link group inline-flex items-center gap-[0.45rem] text-muted text-[0.86rem] font-extrabold transition-all duration-180 hover:-translate-y-0.5"
            >
              <ArrowLeftIcon />
              Voltar
            </TransitionLink>

            <div className="project-meta mt-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: 'var(--project-accent)' }}
                  aria-hidden="true"
                />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted font-bold">
                  {project.role} · {project.year}
                </span>
              </div>

              <h1 className="project-title max-w-3xl text-balance text-[clamp(2.45rem,5.5vw,4.85rem)] font-heading leading-[1.05] tracking-tight">
                {project.name}
                <span className="block text-muted font-normal mt-2 text-[clamp(1.25rem,2.8vw,2.15rem)]">
                  {project.subtitle}
                </span>
              </h1>

              <p className="project-desc max-w-2xl text-pretty text-[clamp(1.05rem,1.6vw,1.15rem)] leading-[1.75] text-muted">
                {project.summary}
              </p>

              <div className="project-actions flex flex-wrap gap-3 pt-2">
                <a
                  className="inline-flex items-center justify-center min-h-[2.8rem] gap-[0.55rem] rounded-sm border border-transparent text-[0.9rem] font-[760] px-6 py-[0.82rem] transition-all duration-180 hover:-translate-y-0.5 max-sm:w-full bg-ink text-paper hover:bg-accent-dark"
                  href={project.deploy}
                  target="_blank"
                  rel="noreferrer"
                >
                  Deploy
                  <ExternalIcon />
                </a>
                <a
                  className="inline-flex items-center justify-center min-h-[2.8rem] gap-[0.55rem] rounded-sm border border-line text-[0.9rem] font-[760] px-6 py-[0.82rem] transition-all duration-180 hover:-translate-y-0.5 max-sm:w-full bg-[rgb(255,255,255,0.72)] text-ink hover:border-ink"
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon />
                  Codigo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Cover */}
        <section className="border-b border-line">
          <div className="w-site mx-auto py-12 md:py-16">
            <div className="project-cover relative aspect-[16/9] overflow-hidden rounded-md border border-line bg-[var(--project-bg)] shadow-soft">
              <Image
                src={project.mockups.desktop}
                alt={`Preview desktop do projeto ${project.name}`}
                fill
                sizes="(max-width: 1280px) 100vw, 1152px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-section-tight">
          <div className="w-site mx-auto grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
            {/* Sidebar */}
            <aside className="project-sidebar flex flex-col gap-10 lg:sticky lg:top-24 lg:self-start">
              <div className="flex flex-col gap-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
                  Tecnologias
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span
                      key={tech.name}
                      className="border border-line rounded-full text-muted text-[0.75rem] font-bold px-[0.58rem] py-[0.35rem] bg-paper"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-line" />

              <div className="flex flex-col gap-3">
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-muted">
                  Detalhes
                </h2>
                <dl className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted font-medium">Ano</dt>
                    <dd className="font-bold text-ink">{project.year}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted font-medium">Funcao</dt>
                    <dd className="font-bold text-ink">{project.role}</dd>
                  </div>
                </dl>
              </div>

              <hr className="border-line" />

              <div className="flex items-center gap-3">
                {/* Círculo estilo Ensō estático do projeto */}
                <svg viewBox="0 0 100 100" className="h-9 w-9 select-none opacity-70" aria-hidden="true">
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    stroke="var(--project-accent)"
                    strokeWidth="3.2"
                    fill="transparent"
                    strokeDasharray="238.76"
                    strokeDashoffset="35"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span className="text-sm font-bold text-muted">
                  Destaque Visual
                </span>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-col gap-16">
              <div className="project-content-block flex flex-col gap-4">
                <h2 className="text-2xl font-heading tracking-tight text-ink">
                  Problema
                </h2>
                <p className="text-pretty text-[clamp(1rem,1.6vw,1.13rem)] leading-[1.75] text-muted">
                  {project.problem}
                </p>
              </div>

              <div className="project-content-block flex flex-col gap-4">
                <h2 className="text-2xl font-heading tracking-tight text-ink">
                  Solucao
                </h2>
                <p className="text-pretty text-[clamp(1rem,1.6vw,1.13rem)] leading-[1.75] text-muted">
                  {project.solution}
                </p>
              </div>

              <div className="project-content-block flex flex-col gap-6">
                <h2 className="text-2xl font-heading tracking-tight text-ink">
                  Galeria
                </h2>
                <div className="gallery-grid grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  {project.gallery.map((image, index) => (
                    <figure
                      key={image}
                      className={index === 0 ? 'gallery-item flex flex-col gap-3 col-span-2 max-md:col-span-1' : 'gallery-item flex flex-col gap-3'}
                    >
                      <div className={index === 0 ? 'relative aspect-[16/8] max-md:aspect-[4/3] overflow-hidden rounded-md border border-line bg-paper shadow-soft' : 'relative aspect-[16/11] max-md:aspect-[4/3] overflow-hidden rounded-md border border-line bg-paper shadow-soft'}>
                        <Image
                          src={image}
                          alt={`Galeria do projeto ${project.name}`}
                          fill
                          sizes={index === 0 ? '92vw' : '(max-width: 800px) 92vw, 44vw'}
                          className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                        />
                      </div>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Prev / Next */}
        <section className="border-t border-line">
          <div className="w-site mx-auto grid grid-cols-2 gap-px bg-line max-sm:grid-cols-1">
            <TransitionLink
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center justify-between gap-4 bg-paper p-8 transition-all duration-180 hover:bg-soft md:p-10"
            >
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted font-bold">
                  <span className="transition-transform group-hover:-translate-x-0.5">
                    <ArrowLeftIcon />
                  </span>
                  Anterior
                </span>
                <span className="text-lg font-heading tracking-tight text-ink">
                  {prevProject.name}
                </span>
              </div>
              <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-muted">
                <ExternalIcon />
              </span>
            </TransitionLink>

            <TransitionLink
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-between gap-4 bg-paper p-8 transition-all duration-180 hover:bg-soft sm:text-right md:p-10"
            >
              <span className="transition-transform group-hover:translate-x-0.5 sm:order-2">
                <ArrowIcon />
              </span>
              <div className="flex flex-col gap-1 sm:items-end">
                <span className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted font-bold sm:flex-row-reverse">
                  Proximo
                </span>
                <span className="text-lg font-heading tracking-tight text-ink">
                  {nextProject.name}
                </span>
              </div>
            </TransitionLink>
          </div>
        </section>
      </main>
    </ProjectAnimator>
  );
}
