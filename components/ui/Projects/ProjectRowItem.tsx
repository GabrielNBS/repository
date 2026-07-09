'use client';

import React from 'react';
import TransitionLink from '@/components/ui/TransitionLink';
import ColorRevealMockup from './ColorRevealMockup';
import { Project } from '@/data/projects';

interface ProjectRowItemProps {
  project: Project;
  index: number;
  priority?: boolean;
  isExtra?: boolean;
}

export default function ProjectRowItem({
  project,
  index,
  priority = false,
  isExtra = false
}: ProjectRowItemProps) {
  const projectNumber = String(index + 1).padStart(2, '0');
  return (
    <div
      className={`project-row-item gap-grid border-line grid grid-cols-1 items-center border-b py-4 lg:grid-cols-12 lg:py-2.5 ${
        isExtra ? 'project-row-extra overflow-hidden opacity-0' : ''
      }`}
      style={
        isExtra
          ? {
              height: 0,
              borderBottomWidth: 0,
              paddingTop: 0,
              paddingBottom: 0
            }
          : undefined
      }
    >
      {/* Lado Esquerdo: Informações do Projeto */}
      <div className="lg:col-span-6">
        <TransitionLink
          href={`/projects/${project.slug}`}
          className="group flex w-full items-center justify-between"
          style={{ '--project-accent': project.accent } as React.CSSProperties}
        >
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-[1.75rem] leading-none font-bold text-[#c59b6c] md:text-[2rem]">
              {projectNumber}
            </span>
            <span className="bg-line block h-[1px] w-10 md:w-16" />
            <div>
              <h3 className="text-ink font-soft text-xl leading-tight transition-colors duration-300 group-hover:text-(--project-accent) md:text-2xl">
                {project.name}
              </h3>
              <p className="text-muted font-body mt-1 text-sm">{project.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 md:gap-10">
            <span className="text-muted font-label text-sm">{project.year}</span>
            <span className="transform text-xl font-light transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-(--project-accent) md:text-2xl">
              →
            </span>
          </div>
        </TransitionLink>
      </div>

      {/* Lado Direito: Imagem de Mockup correspondente */}
      <div className="mt-6 lg:col-span-6 lg:mt-0">
        <div className="mockup-container border-line bg-paper shadow-soft group relative mx-auto aspect-20/8 w-full max-w-[340px] overflow-hidden rounded-2xl border transition-transform duration-300 hover:scale-[1.01] lg:ml-auto lg:max-w-[200px] xl:max-w-[245px] 2xl:max-w-[280px]">
          <TransitionLink href={`/projects/${project.slug}`} className="block h-full w-full">
            <ColorRevealMockup
              src={project.mockups.desktop}
              alt={`Preview desktop do projeto ${project.name}`}
              priority={priority}
            />
            <div className="mockup-shine pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay" />
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
