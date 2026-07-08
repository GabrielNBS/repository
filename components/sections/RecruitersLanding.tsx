'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import TransitionLink from '@/components/ui/TransitionLink';
import {
  BentoIntroductionCard,
  BentoIdentityCard,
  BentoTimelineCard,
  BentoStatsCard,
  BentoWorkflowCard,
  BentoJobDetailsCard,
  BentoAreasCard
} from '@/components/ui/Recruiters/BentoCards';

export default function RecruitersLanding() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set('.recruiter-block', { opacity: 1, y: 0 });
        return;
      }

      gsap.from('.recruiter-block', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.05
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="mx-auto w-dvw overflow-y-auto p-4 md:p-6 lg:box-border lg:flex lg:h-screen lg:max-h-screen lg:flex-col lg:justify-between lg:gap-4 lg:overflow-hidden"
    >
      {/* Bento Grid Principal */}
      <div className="grid grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-12 lg:grid-rows-12">
        <BentoIntroductionCard />
        <BentoIdentityCard />
        <BentoTimelineCard />
        <BentoStatsCard />
        <BentoWorkflowCard />
        <BentoJobDetailsCard />
        <BentoAreasCard />
      </div>

      {/* Footer Fixo e Compacto no Fim */}
      <div className="recruiter-block mt-4 lg:mt-0">
        <div className="divide-line border-line bg-paper grid grid-cols-3 divide-x overflow-hidden rounded-md border text-center shadow-sm">
          <TransitionLink
            href="/"
            className="hover:bg-soft font-ui text-muted hover:text-ink group block py-3 text-[0.75rem] transition-colors duration-180"
          >
            Sobre{' '}
            <span className="ml-1 inline-block translate-x-0 transition-transform duration-180 group-hover:translate-x-1">
              →
            </span>
          </TransitionLink>
          <TransitionLink
            href="/#projects"
            className="hover:bg-soft font-ui text-muted hover:text-ink group block py-3 text-[0.75rem] transition-colors duration-180"
          >
            Projetos{' '}
            <span className="ml-1 inline-block translate-x-0 transition-transform duration-180 group-hover:translate-x-1">
              →
            </span>
          </TransitionLink>
          <TransitionLink
            href="/#contact"
            className="hover:bg-soft font-ui text-muted hover:text-ink group block py-3 text-[0.75rem] transition-colors duration-180"
          >
            Contato{' '}
            <span className="ml-1 inline-block translate-x-0 transition-transform duration-180 group-hover:translate-x-1">
              →
            </span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
