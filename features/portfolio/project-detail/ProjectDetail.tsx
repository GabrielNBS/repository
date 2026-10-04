import AppIcon from '@/features/portfolio/shared/AppIcon';
import Link from 'next/link';
import contactStyles from '../sections/contact/ContactSection.module.css';
import ProjectVisual from '../projects/ProjectVisual';
import projects, { type Project } from '../projects/data/projects';
import { getOrderedProjects } from '../projects/data/projectOrder';
import { getStackIcon } from '../projects/data/projectStackIconLogic';
import HeadingSplit from '../shared/motion/HeadingSplit';
import ProjectBackLink from './ProjectBackLink';
import ProjectDetailExperience from './ProjectDetailExperience';
import styles from './ProjectDetail.module.css';
import RasterDrawing from '../shared/motion/RasterDrawing';
import { getProjectIllustration } from './projectIllustrations';

export default function ProjectDetail({ project }: { project: Project }) {
  const orderedProjects = getOrderedProjects(projects);
  const projectIndex = orderedProjects.findIndex((item) => item.slug === project.slug);
  const previousProject = orderedProjects[(projectIndex - 1 + orderedProjects.length) % orderedProjects.length];
  const nextProject = orderedProjects[(projectIndex + 1) % orderedProjects.length];
  const illustration = getProjectIllustration(project.slug);
  const technologies = project.techs.map((technology) => {
    const { Icon, color } = getStackIcon(technology.name);
    return {
      name: technology.name,
      color,
      icon: <Icon aria-hidden="true" />
    };
  });
  const narrativeSections = [
    { label: 'O desafio', body: project.problem },
    { label: 'A solução', body: project.solution },
    { label: 'O que ficou', body: project.outcome }
  ];
  const hasSeparateDeploy = project.deploy !== project.github;
  const hasLongTitlePart = project.name.split(/\s+/).some((part) => part.length > 10);

  return (
    <ProjectDetailExperience>
      {illustration && (
        <link rel="preload" as="image" href={illustration.src} fetchPriority="high" />
      )}
      <a className={styles.skipLink} href="#projeto-titulo">
        Pular para o conteúdo
      </a>
      <ProjectBackLink className={styles.backButton} />

      <section className={styles.heroSection} data-detail-hero>
        <div className={styles.heroVisualContainer} data-detail-visual>
          <div className={styles.heroGrid}>
            <aside className={styles.asideMeta}>
              <div>
                <p className={styles.projectEyebrow}>Projeto / 0{project.id}</p>
                <h1
                  id="projeto-titulo"
                  tabIndex={-1}
                  className={`${styles.projectTitle} ${hasLongTitlePart ? styles.projectTitleCompact : ''}`}
                  data-detail-title
                >
                  {project.name}
                </h1>
                <p className={styles.projectDescription}>{project.description}</p>
                <p className={styles.projectSubtitle}>{project.subtitle}</p>
              </div>
              {illustration && (
                <div className={styles.heroIllustration}>
                  <RasterDrawing
                    src={illustration.src}
                    alt={illustration.alt}
                    drawing={illustration.drawing}
                    className={styles.heroDrawing}
                  />
                </div>
              )}
              <div className={styles.metaSpecs}>
                <div>
                  <span className={styles.metaLabel}>Ano</span>
                  <strong className={styles.metaValue}>{project.year}</strong>
                </div>
                <div>
                  <span className={styles.metaLabel}>Tipo</span>
                  <strong className={styles.metaValue}>{project.title}</strong>
                </div>
                <div className={styles.metaFullWidth}>
                  <span className={styles.metaLabel}>Atuação</span>
                  <strong className={styles.metaValue}>{project.role}</strong>
                </div>
              </div>
            </aside>

            <div className={styles.visualWrapper}>
              <span aria-hidden="true" className={styles.visualBackdropPeach} />
              <span aria-hidden="true" className={styles.visualBackdropBorder} />
              <ProjectVisual
                project={project}
                label={project.subtitle}
                priority
                className={styles.visualContent}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        data-detail-narrative
        className={styles.narrativeSection}
        aria-label={`Leitura do projeto ${project.name}`}
      >
        <div className={styles.narrativeContainer}>
          <div data-detail-narrative-heading className={styles.narrativeLeft}>
            <p className={styles.narrativeEyebrow}>Leitura do projeto</p>
            <HeadingSplit as="h2" className={styles.narrativeHeading} data-split="lines">
              Do problema ao produto
            </HeadingSplit>
            <p className={styles.narrativeIntro}>
              {project.subtitle}. Uma leitura direta das decisões que dão forma a {project.name} e
              ao modo como ele responde no uso real.
            </p>

            <nav aria-label="Navegação do projeto" className={styles.projectActionsNav}>
              {hasSeparateDeploy ? (
                <a
                  className={styles.actionButton}
                  href={project.deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver projeto ${project.name} em uma nova guia`}
                >
                  Ver projeto <AppIcon name="arrowUpRight" size="compact" />
                </a>
              ) : null}
              <a
                className={styles.actionButton}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${hasSeparateDeploy ? 'Código' : 'Repositório'} de ${project.name} em uma nova guia`}
              >
                {hasSeparateDeploy ? 'Código' : 'Repositório'} <AppIcon name="arrowUpRight" size="compact" />
              </a>
            </nav>
          </div>

          <div data-detail-narrative-copy className={styles.narrativeRight}>
            <div className={styles.articlesList}>
              {narrativeSections.map((section, index) => (
                <article key={section.label} className={styles.articleItem}>
                  <span className={styles.articleIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={styles.articleTitle}>{section.label}</h3>
                    <p className={styles.articleBody}>{section.body}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.deliverablesGrid}>
              <div>
                <p className={styles.deliverablesHeading}>Sinais de entrega</p>
                <ul className={styles.highlightsList} aria-label="Destaques do projeto">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className={styles.highlightTag}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.deliverablesHeading}>Tecnologias</p>
                <ul className={styles.techsList} aria-label="Tecnologias utilizadas">
                  {technologies.map((technology) => (
                    <li key={technology.name} className={styles.techItem}>
                      <span
                        className={styles.techIcon}
                        style={{ color: technology.color }}
                        aria-hidden="true"
                      >
                        {technology.icon}
                      </span>
                      <span>{technology.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <nav className={styles.projectNavigation} aria-label="Navegação entre projetos">
          <Link
            href={`/projetos/${previousProject.slug}`}
            className={`${contactStyles.contactLink} ${styles.previousProject}`}
          >
            <AppIcon name="arrowLeft" />
            <span><span className={styles.navigationLabel}>Projeto anterior</span><span className={styles.navigationProjectName}>{previousProject.name}</span></span>
          </Link>
          <Link
            href={`/projetos/${nextProject.slug}`}
            className={`${contactStyles.contactLink} ${styles.nextProject}`}
          >
            <span><span className={styles.navigationLabel}>Próximo projeto</span><span className={styles.navigationProjectName}>{nextProject.name}</span></span>
            <AppIcon name="arrowRight" />
          </Link>
        </nav>
        <span>Gabriel Nascimento © 2026</span>
      </footer>
    </ProjectDetailExperience>
  );
}
