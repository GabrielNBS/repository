import Image from 'next/image';
import TransitionLink from '@/components/ui/TransitionLink';
import { ButtonLink } from '@/components/ui/Button';
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
        style={
          {
            '--project-bg': project.bgColor,
            '--project-accent': project.accent
          } as React.CSSProperties
        }
      >
        {/* Hero */}
        <section className="border-line relative overflow-hidden border-b">
          <div
            className="absolute inset-0 -z-10 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle at 80% 20%, var(--project-accent) 0, transparent 60%)`
            }}
          />
          <div className="w-site mx-auto py-16 md:py-24">
            <ButtonLink
              href={`/#${project.slug}`}
              variant="text"
              intent="secondary"
              className="back-link group"
            >
              <ArrowLeftIcon />
              Voltar
            </ButtonLink>

            <div className="project-meta mt-10 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: 'var(--project-accent)' }}
                  aria-hidden="true"
                />
                <span className="text-muted font-mono text-xs font-bold tracking-[0.2em] uppercase">
                  {project.role} · {project.year}
                </span>
              </div>

              <h1 className="project-title font-heading max-w-3xl text-[clamp(2.45rem,5.5vw,4.85rem)] leading-[1.05] tracking-tight text-balance">
                {project.name}
                <span className="text-muted mt-2 block text-[clamp(1.25rem,2.8vw,2.15rem)] font-normal">
                  {project.subtitle}
                </span>
              </h1>

              <p className="project-desc text-muted max-w-2xl text-[clamp(1.05rem,1.6vw,1.15rem)] leading-[1.75] text-pretty">
                {project.summary}
              </p>

              <div className="project-actions flex flex-wrap gap-3 pt-2">
                <ButtonLink
                  href={project.deploy}
                  target="_blank"
                  rel="noreferrer"
                  variant="filled"
                  intent="primary"
                >
                  Deploy
                  <ExternalIcon />
                </ButtonLink>
                <ButtonLink
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  intent="secondary"
                >
                  <GithubIcon />
                  Codigo
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        {/* Cover */}
        <section className="border-line border-b">
          <div className="w-site mx-auto py-12 md:py-16">
            <div className="project-cover border-line shadow-soft relative aspect-[16/9] overflow-hidden rounded-md border bg-[var(--project-bg)]">
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
                <h2 className="text-muted text-xs font-bold tracking-[0.15em] uppercase">
                  Tecnologias
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((tech) => (
                    <span
                      key={tech.name}
                      className="border-line text-muted bg-paper rounded-full border px-[0.58rem] py-[0.35rem] text-[0.75rem] font-bold"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-line" />

              <div className="flex flex-col gap-3">
                <h2 className="text-muted text-xs font-bold tracking-[0.15em] uppercase">
                  Detalhes
                </h2>
                <dl className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted font-medium">Ano</dt>
                    <dd className="text-ink font-bold">{project.year}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted font-medium">Funcao</dt>
                    <dd className="text-ink font-bold">{project.role}</dd>
                  </div>
                </dl>
              </div>

              <hr className="border-line" />

              <div className="flex flex-col items-center gap-3">
                {/* Círculo estilo Ensō estático do projeto */}
                <svg
                  viewBox="0 0 100 100"
                  className="h-9 w-9 opacity-70 select-none"
                  aria-hidden="true"
                >
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
                <span className="text-muted text-sm font-bold">Destaque Visual</span>
                <ButtonLink
                  href={`/#${project.slug}`}
                  variant="text"
                  intent="secondary"
                  className="back-link group mt-6"
                >
                  <ArrowLeftIcon />
                  Voltar
                </ButtonLink>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-col gap-16">
              <div className="project-content-block flex flex-col gap-4">
                <h2 className="font-heading text-ink text-2xl tracking-tight">Problema</h2>
                <p className="text-muted text-[clamp(1rem,1.6vw,1.13rem)] leading-[1.75] text-pretty">
                  {project.problem}
                </p>
              </div>

              <div className="project-content-block flex flex-col gap-4">
                <h2 className="font-heading text-ink text-2xl tracking-tight">Solucao</h2>
                <p className="text-muted text-[clamp(1rem,1.6vw,1.13rem)] leading-[1.75] text-pretty">
                  {project.solution}
                </p>
              </div>

              <div className="project-content-block flex flex-col gap-6">
                <h2 className="font-heading text-ink text-2xl tracking-tight">Galeria</h2>
                <div className="gallery-grid grid grid-cols-2 gap-4 max-md:grid-cols-1">
                  {project.gallery.map((image, index) => (
                    <figure
                      key={image}
                      className={
                        index === 0
                          ? 'gallery-item col-span-2 flex flex-col gap-3 max-md:col-span-1'
                          : 'gallery-item flex flex-col gap-3'
                      }
                    >
                      <div
                        className={
                          index === 0
                            ? 'border-line bg-paper shadow-soft relative aspect-[16/8] overflow-hidden rounded-md border max-md:aspect-[4/3]'
                            : 'border-line bg-paper shadow-soft relative aspect-[16/11] overflow-hidden rounded-md border max-md:aspect-[4/3]'
                        }
                      >
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
        <section className="border-line border-t">
          <div className="w-site bg-line mx-auto grid grid-cols-2 gap-px max-sm:grid-cols-1">
            <TransitionLink
              href={`/projects/${prevProject.slug}`}
              className="group bg-paper hover:bg-soft flex items-center justify-between gap-4 p-8 transition-all duration-180 md:p-10"
            >
              <div className="flex flex-col gap-1">
                <span className="text-muted flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase">
                  <span className="transition-transform group-hover:-translate-x-0.5">
                    <ArrowLeftIcon />
                  </span>
                  Anterior
                </span>
                <span className="font-heading text-ink text-lg tracking-tight">
                  {prevProject.name}
                </span>
              </div>
              <span className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ExternalIcon />
              </span>
            </TransitionLink>

            <TransitionLink
              href={`/projects/${nextProject.slug}`}
              className="group bg-paper hover:bg-soft flex items-center justify-between gap-4 p-8 transition-all duration-180 sm:text-right md:p-10"
            >
              <span className="transition-transform group-hover:translate-x-0.5 sm:order-2">
                <ArrowIcon />
              </span>
              <div className="flex flex-col gap-1 sm:items-end">
                <span className="text-muted flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase sm:flex-row-reverse">
                  Proximo
                </span>
                <span className="font-heading text-ink text-lg tracking-tight">
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
