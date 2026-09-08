'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { FiArrowDown, FiArrowLeft, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import type { Project, ProjectGalleryItem } from '../projects/data/projects';
import { getProjectTone } from '../projects/data/projectTone';
import { getStackIcon } from '../projects/data/projectStackIconLogic';
import { useDetailMotion } from './projectDetailMotion';
import styles from './ProjectDetail.module.css';

const number = (value: number) => String(value).padStart(2, '0');

function ProjectLinks({ project }: { project: Project }) {
  const hasLiveSite = project.deploy && project.deploy !== project.github;
  return (
    <div className={styles.actions}>
      {hasLiveSite ? (
        <a
          className={styles.primaryAction}
          href={project.deploy}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visitar projeto <FiArrowUpRight aria-hidden="true" />
        </a>
      ) : null}
      <a href={project.github} target="_blank" rel="noopener noreferrer">
        <FiGithub aria-hidden="true" /> Explorar código <FiArrowUpRight aria-hidden="true" />
      </a>
    </div>
  );
}

function Capture({ item, mobile = false }: { item: ProjectGalleryItem; mobile?: boolean }) {
  return (
    <figure
      className={mobile ? styles.mobileCapture : styles.desktopCapture}
      data-motion={mobile ? 'detail-mobile' : 'detail-desktop'}
    >
      <div className={styles.captureImage}>
        <Image
          src={item.src}
          alt={item.alt}
          width={mobile ? 390 : 1440}
          height={mobile ? 844 : 1000}
          sizes={mobile ? '(max-width: 800px) 60vw, 22vw' : '(max-width: 800px) 92vw, 72vw'}
        />
      </div>
      <figcaption>
        <span>{item.label}</span>
        <span>{mobile ? 'Mobile' : 'Desktop'}</span>
      </figcaption>
    </figure>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  useDetailMotion(root, project.slug);
  const cover = project.gallery.desktop[0] ?? project.gallery.mobile[0];
  const galleryCount = Math.max(project.gallery.desktop.length, project.gallery.mobile.length);
  const chapters = [
    { id: 'contexto', label: 'Contexto', title: 'O ponto de partida.', body: project.description },
    { id: 'desafio', label: 'Desafio', title: 'O que precisava mudar.', body: project.problem },
    { id: 'solucao', label: 'Solução', title: 'A ideia encontra o código.', body: project.solution }
  ];

  return (
    <main
      ref={root}
      className={styles.page}
      data-variant={getProjectTone(project.id)}
      tabIndex={-1}
    >
      <a className={styles.skipLink} href="#projeto-titulo">
        Pular para o conteúdo
      </a>
      <nav className={styles.nav} aria-label="Navegação do projeto">
        <Link href="/#projetos">
          <FiArrowLeft aria-hidden="true" /> Projetos
        </Link>
        <span className={styles.navName}>{project.name}</span>
        <a href="#ficha">
          Ficha técnica <FiArrowDown aria-hidden="true" />
        </a>
        <span className={styles.readingProgress} aria-hidden="true">
          <i data-motion="detail-progress" />
        </span>
      </nav>

      <header className={styles.hero}>
        <div className={styles.heroMeta} data-motion="detail-intro">
          <span>Estudo de caso / {number(project.id)}</span>
          <span>
            {project.year} · {project.title}
          </span>
        </div>
        <div className={styles.heroHeading}>
          <h1 id="projeto-titulo" tabIndex={-1} data-motion="detail-title">
            {project.name}
          </h1>
          <p className={styles.subtitle} data-motion="detail-intro">
            {project.subtitle}
          </p>
        </div>
        <div className={styles.heroBottom} data-motion="detail-intro">
          <p>{project.summary}</p>
          <a href="#contexto" className={styles.storyLink}>
            Conhecer a história{' '}
            <span>
              <FiArrowDown aria-hidden="true" />
            </span>
          </a>
        </div>
      </header>

      <section
        className={styles.cover}
        aria-label={`Apresentação de ${project.name}`}
        data-motion="detail-cover"
      >
        <div className={styles.coverStage} data-motion="detail-cover-stage">
          <div className={styles.coverMat} data-motion="detail-cover-mat">
            {cover ? (
              <Image
                className={styles.coverImage}
                src={cover.src}
                alt={cover.alt}
                width={1440}
                height={1000}
                sizes="(max-width: 800px) 100vw, 90vw"
                priority
                data-motion="detail-cover-image"
              />
            ) : (
              <div className={styles.coverType}>
                <span>{project.title}</span>
                <p>
                  {project.name
                    .split(/[\s-]+/)
                    .map((word) => word[0])
                    .join('')}
                </p>
                <span>{project.subtitle}</span>
              </div>
            )}
          </div>
          <div className={styles.coverCaption}>
            <span>/{project.slug}</span>
            <span>
              {cover ? cover.label : 'Projeto em código'} <FiArrowUpRight aria-hidden="true" />
            </span>
          </div>
        </div>
      </section>

      <section className={styles.narrative} aria-label="Do contexto à solução">
        <aside className={styles.narrativeIndex}>
          <span className={styles.eyebrow}>Por trás da interface</span>
          <p>
            Antes da tela,
            <br />
            <em>uma intenção.</em>
          </p>
          <nav aria-label="Capítulos do case">
            {chapters.map((chapter, index) => (
              <a key={chapter.id} href={`#${chapter.id}`} data-motion="detail-chapter-link">
                <span>{number(index + 1)}</span>
                {chapter.label}
                <FiArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </nav>
          <span className={styles.indexCredit}>{project.role}</span>
        </aside>
        <div>
          {chapters.map((chapter, index) => (
            <article
              className={styles.chapter}
              key={chapter.id}
              id={chapter.id}
              data-motion="detail-chapter"
              aria-labelledby={`${chapter.id}-titulo`}
            >
              <span className={styles.eyebrow} data-motion="detail-reveal">
                {number(index + 1)} / {chapter.label}
              </span>
              <h2 id={`${chapter.id}-titulo`} data-motion="detail-reveal">
                {chapter.title}
              </h2>
              <p data-motion="detail-reveal">{chapter.body}</p>
              <div className={styles.chapterRule} aria-hidden="true">
                <i data-motion="detail-chapter-progress" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gallery} aria-labelledby="gallery-title">
        <header className={styles.sectionHeading} data-motion="detail-reveal">
          <div>
            <span className={styles.eyebrow}>A experiência, em detalhe</span>
            <h2 id="gallery-title">
              A ideia ganha <em>forma.</em>
            </h2>
          </div>
          <p>
            {galleryCount
              ? `${number(project.gallery.desktop.length)} capturas desktop · ${number(project.gallery.mobile.length)} capturas mobile`
              : 'O projeto está documentado no código.'}
          </p>
        </header>
        {galleryCount > 0 ? (
          <div className={styles.galleryList}>
            {Array.from({ length: galleryCount }, (_, index) => {
              const desktop = project.gallery.desktop[index];
              const mobile = project.gallery.mobile[index];
              return (
                <article
                  className={styles.galleryScene}
                  data-motion="detail-gallery-scene"
                  key={desktop?.src ?? mobile.src}
                >
                  <header className={styles.sceneHeading}>
                    <span>
                      {number(index + 1)} / {number(galleryCount)}
                    </span>
                    <h3>{desktop?.label ?? mobile.label}</h3>
                  </header>
                  <div
                    className={styles.capturePair}
                    data-variant={desktop && mobile ? 'pair' : 'single'}
                  >
                    {desktop ? <Capture item={desktop} /> : null}
                    {mobile ? <Capture item={mobile} mobile /> : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyGallery} data-motion="detail-reveal">
            <FiGithub aria-hidden="true" />
            <h3>Um olhar para a construção.</h3>
            <p>
              Este case ainda não possui capturas cadastradas. Explore a implementação e a
              documentação no repositório.
            </p>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              Abrir repositório <FiArrowUpRight aria-hidden="true" />
            </a>
          </div>
        )}
      </section>

      <section className={styles.craft} id="ficha" aria-labelledby="craft-title">
        <header className={styles.sectionHeading} data-motion="detail-reveal">
          <div>
            <span className={styles.eyebrow}>As escolhas que permanecem</span>
            <h2 id="craft-title">
              Detalhes que fazem
              <br />
              <em>a diferença.</em>
            </h2>
          </div>
        </header>
        <ul className={styles.highlights} aria-label="Destaques do projeto">
          {project.highlights.map((highlight, index) => (
            <li key={highlight} data-motion="detail-reveal">
              <span>{number(index + 1)}</span>
              <h3>{highlight}</h3>
              <FiArrowUpRight aria-hidden="true" />
            </li>
          ))}
        </ul>
        <div className={styles.technical}>
          <div data-motion="detail-reveal">
            <span className={styles.eyebrow}>Ficha técnica</span>
            <h3>
              Por trás
              <br />
              da experiência.
            </h3>
            <dl>
              <div>
                <dt>Atuação</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Ano</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Categoria</dt>
                <dd>{project.title}</dd>
              </div>
            </dl>
          </div>
          <ul className={styles.technologies} aria-label="Tecnologias utilizadas">
            {project.techs.map((tech) => {
              const Icon = getStackIcon(tech.name).Icon;
              return (
                <li key={tech.name} data-motion="detail-reveal">
                  <Icon aria-hidden="true" />
                  <span>{tech.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="closing-title">
        <span className={styles.eyebrow} data-motion="detail-reveal">
          {project.name} / {project.year}
        </span>
        <h2 id="closing-title" data-motion="detail-reveal">
          Da história
          <br />
          <em>à experiência.</em>
        </h2>
        <div data-motion="detail-reveal">
          <ProjectLinks project={project} />
        </div>
        <Link className={styles.backLink} href="/#projetos">
          Continuar pelos projetos <FiArrowUpRight aria-hidden="true" />
        </Link>
      </section>
      <footer className={styles.footer}>
        <span>Gabriel Nascimento © 2026</span>
        <Link href="/#contato">
          Vamos conversar <FiArrowUpRight aria-hidden="true" />
        </Link>
      </footer>
    </main>
  );
}
