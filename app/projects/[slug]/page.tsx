import Image from 'next/image';
import TransitionLink from '@/components/ui/TransitionLink';
import { ButtonLink } from '@/components/ui/Button';
import { notFound } from 'next/navigation';
import projects, { getProjectBySlug } from '@/data/projects';
import Header from '@/components/layout/Header';
import {
  ArrowLeftIcon,
  ExternalIcon,
  ArrowIcon,
  GithubIcon,
  UserIcon,
  CodeIcon,
  CalendarIcon,
  LinkIcon,
  SpeedIcon,
  DevicesIcon,
  AccessibilityIcon,
  SeoIcon
} from '@/components/ui/icons';
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
      <Header />
      <main
        id="top"
        className="bg-canvas min-dvh pt-5 md:pt-8"
        style={
          {
            '--project-bg': project.bgColor,
            '--project-accent': project.accent
          } as React.CSSProperties
        }
      >
        {/* Seção Hero do Projeto */}
        <section className="w-site relative mx-auto pb-10">
          {/* Kanji e Linhas Verticais de Fundo estilo Wabi-Sabi */}
          <div className="pointer-events-none absolute top-16 -left-6 z-10 hidden flex-col items-center select-none md:flex">
            <span className="text-line/20 font-serif text-[6rem] leading-none font-bold">作</span>
            <span className="text-muted/35 mt-4 text-[0.62rem] font-bold tracking-[0.3em] uppercase [writing-mode:vertical-lr]">
              Sakuhin / 作品
            </span>
            <span className="text-muted/20 mt-8 text-[0.58rem] font-medium tracking-[0.25em] [writing-mode:vertical-lr]">
              余白の中に、意図がある。
            </span>
          </div>

          <div className="grid items-center gap-12 pt-8 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:pt-14 md:pl-20 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Coluna da Esquerda: Metadados e Informações */}
            <div className="flex flex-col justify-center">
              <div className="relative">
                {/* Tag de Destaque */}
                <span
                  style={{ color: 'var(--project-accent)' }}
                  className="text-[0.68rem] font-bold tracking-[0.2em] uppercase"
                >
                  {project.isNew ? 'Projeto em Destaque' : 'Projeto em Foco'}
                </span>

                {/* Nome do Projeto */}
                <h1 className="font-heading text-ink f mt-2 text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-tight">
                  {project.name}
                </h1>

                {/* Subtítulo / Tagline */}
                <p
                  style={{ color: 'var(--project-accent)' }}
                  className="font-heading mt-1.5 text-[clamp(1.1rem,2vw,1.6rem)] leading-snug opacity-80"
                >
                  {project.title}
                </p>

                <hr className="border-line/50 my-6 w-12" />

                {/* Resumo */}
                <p className="text-muted max-w-[48ch] text-[0.92rem] leading-relaxed text-pretty">
                  {project.description || project.summary}
                </p>

                {/* Tabela de metadados shoji-like */}
                <div className="border-line/60 my-8 flex flex-col gap-4.5 border-y py-5.5 text-[0.82rem]">
                  {/* Meu papel */}
                  <div className="grid grid-cols-[110px_1fr] items-start gap-4">
                    <span className="text-muted gap-1.8 flex items-center text-[0.68rem] font-semibold tracking-wider uppercase select-none">
                      <UserIcon />
                      Meu papel
                    </span>
                    <span className="text-ink leading-relaxed font-medium">{project.role}</span>
                  </div>

                  {/* Tecnologias */}
                  <div className="grid grid-cols-[110px_1fr] items-start gap-4">
                    <span className="text-muted gap-1.8 flex items-center text-[0.68rem] font-semibold tracking-wider uppercase select-none">
                      <CodeIcon />
                      Tecnologias
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techs.map((tech) => (
                        <span
                          key={tech.name}
                          className="border-line/60 text-muted bg-paper/60 rounded border px-2.5 py-0.5 text-[0.7rem] font-medium"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ano */}
                  <div className="grid grid-cols-[110px_1fr] items-center gap-4">
                    <span className="text-muted gap-1.8 flex items-center text-[0.68rem] font-semibold tracking-wider uppercase select-none">
                      <CalendarIcon />
                      Ano
                    </span>
                    <span className="text-ink font-medium">{project.year}</span>
                  </div>

                  {/* Links */}
                  <div className="grid grid-cols-[110px_1fr] items-center gap-4">
                    <span className="text-muted gap-1.8 flex items-center text-[0.68rem] font-semibold tracking-wider uppercase select-none">
                      <LinkIcon />
                      Links
                    </span>
                    <div className="flex items-center gap-4">
                      <a
                        href={project.deploy}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--project-accent)' }}
                        className="flex items-center gap-1 font-bold transition-opacity hover:opacity-85"
                      >
                        Ver projeto ↗
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted hover:text-ink flex items-center gap-1.5 font-bold transition-colors"
                      >
                        Código fonte
                        <GithubIcon />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-wrap items-center gap-6">
                  <ButtonLink
                    href={project.deploy}
                    target="_blank"
                    rel="noreferrer"
                    variant="filled"
                    intent="primary"
                    style={{ backgroundColor: 'var(--project-accent)' }}
                    className="py-3.2 rounded-none px-7 font-semibold shadow-sm transition-opacity hover:opacity-90"
                  >
                    Ver projeto completo →
                  </ButtonLink>
                  <TransitionLink
                    href={`/projects/${nextProject.slug}`}
                    className="text-muted text-nav flex items-center gap-1.5 font-bold transition-colors duration-200 hover:text-(--project-accent)"
                  >
                    Próximo projeto
                    <span className="inline-block transition-transform duration-300 hover:translate-x-1">
                      →
                    </span>
                  </TransitionLink>
                </div>
              </div>
            </div>

            {/* Coluna da Direita: Mockup 3D Inclinado */}
            <div
              className="flex items-center justify-center py-6 md:py-0"
              style={{ perspective: '1200px' }}
            >
              <div
                className="relative aspect-16/10 w-full max-w-[540px] transform-[rotateY(-20deg)_rotateX(6deg)_rotateZ(-1deg)] transition-all duration-700 ease-out transform-3d hover:scale-[1.01] hover:transform-[rotateY(-8deg)_rotateX(4deg)_rotateZ(0deg)] md:max-w-none"
                style={{
                  boxShadow:
                    '-15px 20px 35px rgba(24, 24, 27, 0.12), -5px 5px 15px rgba(24, 24, 27, 0.08)'
                }}
              >
                {/* Mockup de Desktop 3D */}
                <div className="border-line bg-paper/40 relative h-full w-full transform-[translateZ(10px)] overflow-hidden rounded-md border p-1.5">
                  <div className="bg-canvas border-line/80 relative h-full w-full overflow-hidden rounded-sm border">
                    <Image
                      src={project.mockups.desktop}
                      alt={`Preview desktop do projeto ${project.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 650px"
                      className="object-cover object-top transition-transform duration-700 ease-out"
                      quality={100}
                      priority
                    />
                  </div>
                </div>

                {/* Efeito de Reflexo/Brilho no Mockup (Vidro Realista) */}
                <div className="pointer-events-none absolute inset-0 transform-[translateZ(12px)] rounded-md bg-linear-to-tr from-white/0 via-white/5 to-white/18 opacity-90" />
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Performance e Destaques Técnicos */}
        <section className="w-site mx-auto mb-8 md:pl-20">
          <div className="border-line/60 bg-paper/20 rounded-md border-y px-6 py-10 md:px-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1.9fr] lg:gap-14">
              {/* Lado Esquerdo: Kanji e Texto de Performance */}
              <div className="flex items-start gap-4">
                {/* Kanji vertical */}
                <div className="flex flex-col items-center leading-none select-none">
                  <span className="text-accent/25 font-serif text-[4.2rem] leading-none font-bold">
                    技術
                  </span>
                  <span className="text-muted/35 mt-1 text-[0.52rem] font-bold tracking-[0.2em] uppercase">
                    Gijutsu
                  </span>
                </div>
                {/* Descrição */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-heading text-ink text-base tracking-tight">
                    Performance e experiência
                  </h3>
                  <p className="text-muted text-nav mt-1.5 max-w-[38ch] leading-relaxed">
                    Foco em desempenho, acessibilidade e uma interface intuitiva que coloca o
                    conteúdo em primeiro plano.
                  </p>
                </div>
              </div>

              {/* Lado Direito: Grid de 4 Colunas para os Highlights */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-4">
                {/* Highlight 1: Velocidade */}
                <div className="flex flex-col gap-1.5">
                  <div
                    style={{
                      color: 'var(--project-accent)',
                      backgroundColor: 'color-mix(in srgb, var(--project-accent) 8%, transparent)'
                    }}
                    className="flex h-8.5 w-8.5 items-center justify-center rounded-full"
                  >
                    <SpeedIcon />
                  </div>
                  <h4 className="text-ink text-[0.82rem] font-bold">
                    {project.highlights[0] || 'Desempenho'}
                  </h4>
                  <p className="text-muted text-[0.72rem] leading-relaxed">
                    Carregamento ultrarrápido e interações instantâneas.
                  </p>
                </div>

                {/* Highlight 2: Responsividade */}
                <div className="flex flex-col gap-1.5">
                  <div
                    style={{
                      color: 'var(--project-accent)',
                      backgroundColor: 'color-mix(in srgb, var(--project-accent) 8%, transparent)'
                    }}
                    className="flex h-8.5 w-8.5 items-center justify-center rounded-full"
                  >
                    <DevicesIcon />
                  </div>
                  <h4 className="text-ink text-[0.82rem] font-bold">
                    {project.highlights[1] || 'Responsividade'}
                  </h4>
                  <p className="text-muted text-[0.72rem] leading-relaxed">
                    Totalmente responsivo e otimizado para dispositivos.
                  </p>
                </div>

                {/* Highlight 3: Acessibilidade */}
                <div className="flex flex-col gap-1.5">
                  <div
                    style={{
                      color: 'var(--project-accent)',
                      backgroundColor: 'color-mix(in srgb, var(--project-accent) 8%, transparent)'
                    }}
                    className="flex h-8.5 w-8.5 items-center justify-center rounded-full"
                  >
                    <AccessibilityIcon />
                  </div>
                  <h4 className="text-ink text-[0.82rem] font-bold">
                    {project.highlights[2] || 'Acessibilidade'}
                  </h4>
                  <p className="text-muted text-[0.72rem] leading-relaxed">
                    Acessível, semântico e inclusivo por design.
                  </p>
                </div>

                {/* Highlight 4: SEO */}
                <div className="flex flex-col gap-1.5">
                  <div
                    style={{
                      color: 'var(--project-accent)',
                      backgroundColor: 'color-mix(in srgb, var(--project-accent) 8%, transparent)'
                    }}
                    className="flex h-8.5 w-8.5 items-center justify-center rounded-full"
                  >
                    <SeoIcon />
                  </div>
                  <h4 className="text-ink text-[0.82rem] font-bold">Otimização SEO</h4>
                  <p className="text-muted text-[0.72rem] leading-relaxed">
                    Estrutura indexável e amigável aos motores de busca.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seções de Problema e Solução */}
        <section className="w-site border-line/60 mx-auto border-t py-12 md:pl-20">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1.85fr] lg:gap-16">
            <div className="flex flex-col gap-10">
              <div className="project-content-block flex flex-col gap-4">
                <h2 className="font-heading text-ink text-xl tracking-tight">Problema</h2>
                <p className="text-muted text-[0.92rem] leading-[1.75] text-pretty">
                  {project.problem}
                </p>
              </div>

              <div className="project-content-block flex flex-col gap-4">
                <h2 className="font-heading text-ink text-xl tracking-tight">Solucao</h2>
                <p className="text-muted text-[0.92rem] leading-[1.75] text-pretty">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Galeria de mockups */}
            <div className="project-content-block flex flex-col gap-6">
              <h2 className="font-heading text-ink text-xl tracking-tight">Galeria</h2>
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
                          ? 'border-line bg-paper shadow-soft relative aspect-16/8 overflow-hidden rounded-md border max-md:aspect-4/3'
                          : 'border-line bg-paper shadow-soft relative aspect-16/11 overflow-hidden rounded-md border max-md:aspect-4/3'
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
