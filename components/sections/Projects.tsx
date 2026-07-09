'use client';

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateFadeIn, animateSplitText } from '@/animations';
import projects from '@/data/projects';
import { LeftDecorations, RightDecorations } from '@/components/ui/Projects/ProjectDecorations';
import ProjectRowItem from '@/components/ui/Projects/ProjectRowItem';
import { Button } from '../ui/Button';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;

      const section = sectionRef.current;
      if (!section) return;

      // Registrar plugin dentro do hook para garantir execução no cliente
      gsap.registerPlugin(ScrollTrigger);

      // 1. Animação do cabeçalho da seção
      animateFadeIn('.projects-label', {
        y: 20,
        scrollTrigger: {
          trigger: '.projects-label',
          start: 'top 90%'
        }
      });

      const projectsTitle = section.querySelector('#projects-title');
      let splitInstance: { revert: () => void } | null = null;
      if (projectsTitle) {
        splitInstance = animateSplitText(projectsTitle, {
          scrollTrigger: {
            trigger: projectsTitle,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
            scrub: true
          }
        });
      }

      // 2. Animação das linhas de projeto (Fade in & Blur sutil)
      const rows = gsap.utils.toArray<HTMLElement>('.project-row-item');
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 30, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });

      // 3. Efeito de Tilt 3D interativo nos Mockups (Desktop)
      const mockupContainers = section.querySelectorAll<HTMLElement>('.mockup-container');
      const cleanupHandlers: Array<() => void> = [];

      mockupContainers.forEach((container) => {
        const shine = container.querySelector<HTMLElement>('.mockup-shine');
        if (!shine) return;

        gsap.set(container, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
        gsap.set(shine, {
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%)',
          scale: 1.5,
          xPercent: -50,
          yPercent: -50,
          left: '50%',
          top: '50%',
          width: '200%',
          height: '200%',
          position: 'absolute'
        });

        const rotateXTo = gsap.quickTo(container, 'rotateX', { duration: 0.4, ease: 'power2.out' });
        const rotateYTo = gsap.quickTo(container, 'rotateY', { duration: 0.4, ease: 'power2.out' });
        const shineXTo = gsap.quickTo(shine, 'xPercent', { duration: 0.4, ease: 'power2.out' });
        const shineYTo = gsap.quickTo(shine, 'yPercent', { duration: 0.4, ease: 'power2.out' });
        const shineOpacityTo = gsap.quickTo(shine, 'opacity', {
          duration: 0.4,
          ease: 'power2.out'
        });

        const onMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          const xPercent = mouseX / rect.width - 0.5;
          const yPercent = mouseY / rect.height - 0.5;

          const maxTilt = 5;
          const rotX = -yPercent * maxTilt * 2;
          const rotY = xPercent * maxTilt * 2;

          rotateXTo(rotX);
          rotateYTo(rotY);

          shineXTo(-50 + xPercent * 80);
          shineYTo(-50 + yPercent * 80);
        };

        const onMouseEnter = () => {
          shineOpacityTo(1);
        };

        const onMouseLeave = () => {
          rotateXTo(0);
          rotateYTo(0);
          shineXTo(-50);
          shineYTo(-50);
          shineOpacityTo(0);
        };

        container.addEventListener('mousemove', onMouseMove);
        container.addEventListener('mouseenter', onMouseEnter);
        container.addEventListener('mouseleave', onMouseLeave);

        cleanupHandlers.push(() => {
          container.removeEventListener('mousemove', onMouseMove);
          container.removeEventListener('mouseenter', onMouseEnter);
          container.removeEventListener('mouseleave', onMouseLeave);
        });
      });

      return () => {
        if (splitInstance) splitInstance.revert();
        cleanupHandlers.forEach((cleanup) => cleanup());
      };
    },
    { scope: sectionRef }
  );

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;

      const section = sectionRef.current;
      if (!section) return;

      const extras = gsap.utils.toArray<HTMLElement>('.project-row-extra', section);
      if (extras.length === 0) return;

      if (showAll) {
        gsap.killTweensOf(extras);
        gsap.fromTo(
          extras,
          {
            height: 0,
            opacity: 0,
            filter: 'blur(6px)',
            borderBottomWidth: '0px',
            paddingTop: 0,
            paddingBottom: 0
          },
          {
            height: 'auto',
            opacity: 1,
            filter: 'blur(0px)',
            borderBottomWidth: '1px',
            paddingTop: '',
            paddingBottom: '',
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            overwrite: 'auto'
          }
        );
      } else {
        gsap.killTweensOf(extras);
        gsap.to(extras, {
          height: 0,
          opacity: 0,
          filter: 'blur(6px)',
          borderBottomWidth: '0px',
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power3.inOut',
          overwrite: 'auto'
        });
      }
    },
    { dependencies: [showAll], scope: sectionRef }
  );

  return (
    <section
      id="projects"
      className={`relative w-full ${
        showAll ? 'py-section' : 'py-section lg:flex lg:flex-col lg:justify-between lg:py-6'
      }`}
      ref={sectionRef}
    >
      {/* Ornamentos Estéticos Wabi-Sabi Laterais */}
      <LeftDecorations />
      <RightDecorations />

      {/* Grid Principal do Site */}
      <div
        className={`w-site relative z-10 mx-auto ${
          showAll ? 'flex flex-col' : 'lg:flex lg:h-full lg:flex-col lg:justify-between'
        }`}
      >
        {/* Cabeçalho da Seção */}
        <div className="mb-8 max-w-lg lg:mb-4">
          <span className="projects-label text-accent text-label font-label mb-3 block tracking-widest uppercase">
            Meu trabalho
          </span>
          <h2
            id="projects-title"
            className="text-display mb-4 leading-tight font-normal whitespace-nowrap"
          >
            Projetos recentes
          </h2>
          <p className="text-muted text-body">
            Uma seleção de projetos que unem design, código e propósito.
          </p>
        </div>

        {/* Lista de Projetos */}
        <div className={`flex flex-col ${showAll ? '' : 'lg:flex-1 lg:justify-center'}`}>
          {projects.map((project, index) => (
            <ProjectRowItem
              key={project.slug}
              project={project}
              index={index}
              priority={index === 0}
              isExtra={index >= 4}
            />
          ))}
        </div>

        {/* Botão de Ver Mais/Menos */}
        <div className="mt-8 flex justify-center lg:mt-4">
          <Button variant="text" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Ver menos projetos' : 'Ver todos os projetos'}
          </Button>
        </div>
      </div>
    </section>
  );
}
