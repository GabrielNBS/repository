'use client';
import { useGSAP } from '@gsap/react';
import projects, { type Project } from '@/features/portfolio/projects/data/projects';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef, useState } from 'react';
import HeadingSplit from '@/features/portfolio/shared/motion/HeadingSplit';
import ProjectCard from './ProjectCard';
import styles from '../styles/ProjectsSection.module.css';

gsap.registerPlugin(useGSAP);
export default function ProjectsSection({ items = projects }: { items?: Project[] }) {
  const root = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showArchive, setShowArchive] = useState(false);
  const featured = items.slice(0, 4);
  const archived = items.slice(4);
  useGSAP(
    () => {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('[data-agenda-enter]', {
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.075,
        y: 22
      });
    },
    { scope: root }
  );
  return (
    <section id="projetos" ref={root} className={styles.section} aria-label="Projetos">
      <div className={styles.story}>
        <header className={styles.header}>
          <span>02 / Seleção recente</span>
          <span>4 em foco · {archived.length} no arquivo</span>
        </header>
        <div className={styles.agenda}>
          <div className={styles.cover} data-agenda-enter>
            <HeadingSplit as="h2">
              Meus trabalhos recentes<span>.</span>
            </HeadingSplit>
            <p>
              Quatro projetos em primeiro plano. Passe pelos dias para ler o recorte de cada
              sistema.
            </p>
          </div>
          <div className={styles.days}>
            {featured.map((p, i) => (
              <Link
                key={p.slug}
                href={`/projetos/${p.slug}`}
                data-agenda-enter
                data-active={i === activeIndex}
                onFocus={() => setActiveIndex(i)}
                onPointerEnter={() => setActiveIndex(i)}
                className={styles.day}
              >
                <span>Case {String(i + 1).padStart(2, '0')}</span>
                <h3>{p.name}</h3>
                <small>
                  {p.year} · {p.title}
                </small>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </div>

        {archived.length > 0 && (
          <div className={styles.archive} data-agenda-enter>
            <button
              type="button"
              onClick={() => setShowArchive((visible) => !visible)}
              aria-expanded={showArchive}
            >
              {showArchive ? 'Ocultar arquivo' : `Ver mais ${archived.length} projetos`}
            </button>
            {showArchive && (
              <div className={styles.archiveCards}>
                {archived.map((project, index) => (
                  <Link
                    key={project.slug}
                    href={`/projetos/${project.slug}`}
                    className={styles.archiveCard}
                  >
                    <span>0{index + 5}</span>
                    <strong>{project.name}</strong>
                    <small>
                      {project.year} · {project.title}
                    </small>
                    <b>↗</b>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.fallback}>
        {items.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
