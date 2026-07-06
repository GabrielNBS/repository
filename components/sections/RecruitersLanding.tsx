'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef, type ReactNode } from 'react';
import { ArrowIcon, ArrowLeftIcon, ExternalIcon, PinIcon } from '@/components/ui/Icons';
import TransitionLink from '@/components/ui/TransitionLink';

const timeline = [
  {
    period: '2019 - 2023',
    title: 'Supervisor e gestor de pessoas',
    description: 'Rotina de lideranca, priorizacao, comunicacao e acompanhamento de entregas.'
  },
  {
    period: '2023 - 2025',
    title: 'Transicao tecnica estruturada',
    description: 'Estudo aplicado em front-end, interfaces, arquitetura de componentes e produto.'
  },
  {
    period: 'Atual',
    title: 'Frontend Developer',
    description: 'React, Next.js, TypeScript, animacao web e experiencias digitais responsivas.'
  }
];

const stackGroups = [
  { label: 'Core', items: ['React', 'Next.js', 'TypeScript'] },
  { label: 'Animation', items: ['GSAP', 'Framer Motion', 'Three.js/R3F'] },
  { label: 'Backend/Infra', items: ['Supabase'] }
];

const differentials = [
  'Comunicacao clara em code review',
  'Ownership de entrega e follow-up',
  'Priorizacao objetiva sob pressao',
  'Documentacao e onboarding com contexto'
];

const practical = [
  ['Disponibilidade', 'Inicio imediato'],
  ['Modelo', 'Remoto ou hibrido'],
  ['Contratacao', 'CLT / PJ'],
  ['Interesses', 'Front-end, UX/UI, performance e interfaces animadas']
];

function BentoCard({
  title,
  eyebrow,
  children,
  className = ''
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.article
      className={`recruiter-block border-line bg-paper/70 shadow-soft rounded-md border p-5 backdrop-blur-sm ${className}`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
    >
      <p className="text-accent text-label font-label mb-3 tracking-[0.1em] uppercase">{eyebrow}</p>
      <h2 className="text-title font-title mb-4 tracking-normal">{title}</h2>
      {children}
    </motion.article>
  );
}

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
        y: 22,
        duration: 0.72,
        ease: 'power3.out',
        stagger: 0.075
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="w-site mx-auto py-4 pb-8 lg:h-[calc(100svh-5.75rem)]">
      <div className="grid gap-4 lg:h-full lg:grid-cols-12 lg:grid-rows-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <motion.div
          className="recruiter-block border-line bg-paper/55 shadow-soft relative overflow-hidden rounded-md border p-6 backdrop-blur-sm lg:col-span-8"
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        >
          <div className="border-accent/20 absolute top-5 right-6 h-28 w-28 rounded-full border-[10px] border-l-transparent" />
          <TransitionLink
            href="/"
            className="text-muted hover:text-ink text-link font-ui gap-link-gap mb-6 inline-flex items-center transition-colors duration-180"
          >
            <ArrowLeftIcon />
            Ver portfolio completo
          </TransitionLink>
          <div className="relative max-w-[760px]">
            <p className="text-accent text-label font-label mb-4 tracking-[0.1em] uppercase">
              Para recrutadores
            </p>
            <h1 className="text-display font-heading max-w-[13ch] tracking-normal md:max-w-[17ch]">
              Frontend com criterio tecnico e maturidade de gestao.
            </h1>
            <p className="text-muted text-body mt-5 max-w-[620px]">
              Um resumo direto para avaliar stack, trajetoria, disponibilidade e forma de trabalho.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <TransitionLink
                  href="/"
                  className="bg-ink text-paper hover:bg-accent-dark min-h-touch gap-action-gap px-button-x py-button-y text-ui font-ui inline-flex items-center justify-center rounded-sm border border-transparent transition-colors duration-180 max-sm:w-full"
                >
                  Ver portfolio completo
                  <ArrowIcon />
                </TransitionLink>
              </motion.div>
              <motion.a
                href="/cv-gabriel-nbs.pdf"
                download
                className="border-line text-ink hover:border-ink min-h-touch gap-action-gap px-button-x py-button-y text-ui font-ui inline-flex items-center justify-center rounded-sm border bg-[rgb(255,255,255,0.72)] transition-colors duration-180 max-sm:w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Baixar CV
                <span aria-hidden="true">↓</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.aside
          className="recruiter-block border-line bg-paper/75 shadow-soft rounded-md border p-5 backdrop-blur-sm lg:col-span-4 lg:row-span-2"
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        >
          <div className="flex items-start gap-4 lg:flex-col xl:flex-row">
            <div className="bg-soft border-line relative h-28 w-28 shrink-0 overflow-hidden rounded-full border">
              <Image
                src="/images/avatar.png"
                alt="Foto de Gabriel NBS"
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-accent text-label font-label mb-2 tracking-[0.1em] uppercase">
                Identidade
              </p>
              <h2 className="font-heading text-[1.65rem] leading-tight tracking-normal">
                Gabriel NBS
              </h2>
              <p className="text-muted text-link mt-2">Frontend Developer - Creative Engineering</p>
              <p className="text-muted text-link gap-link-gap mt-4 inline-flex items-center">
                <PinIcon />
                Brasil
              </p>
            </div>
          </div>

          <div className="border-line mt-5 border-t pt-5">
            <p className="text-ink text-title font-title">Disponivel para inicio imediato</p>
            <p className="text-muted text-link mt-2">Remoto, hibrido, CLT ou PJ.</p>
          </div>

          <div className="border-line mt-5 flex flex-wrap gap-3 border-t pt-5">
            {[
              ['GitHub', 'https://github.com/GabrielNBS'],
              ['LinkedIn', 'https://www.linkedin.com/']
            ].map(([label, href]) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="border-line text-muted hover:text-ink hover:border-ink gap-link-gap text-link font-ui inline-flex items-center rounded-sm border px-3 py-2 transition-colors duration-180"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {label}
                <ExternalIcon />
              </motion.a>
            ))}
          </div>
        </motion.aside>

        <BentoCard eyebrow="Trajetoria" title="Progressao linear" className="lg:col-span-3">
          <ol className="space-y-4">
            {timeline.map((item) => (
              <li key={item.period} className="border-line relative border-l pl-4">
                <span className="bg-accent absolute top-1.5 -left-[4.5px] h-2 w-2 rounded-full" />
                <p className="text-ink text-link font-ui">{item.period}</p>
                <h3 className="text-title font-title mt-1">{item.title}</h3>
                <p className="text-muted text-link mt-1">{item.description}</p>
              </li>
            ))}
          </ol>
        </BentoCard>

        <BentoCard eyebrow="Stack" title="Tecnico por categoria" className="lg:col-span-3">
          <div className="space-y-4">
            {stackGroups.map((group) => (
              <div key={group.label}>
                <p className="text-ink text-link font-ui mb-2">{group.label}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="border-line text-muted px-tag-x py-tag-y text-tag rounded-full border font-bold"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        <BentoCard eyebrow="Diferenciais" title="Gestao aplicada ao time" className="lg:col-span-3">
          <ul className="grid gap-3">
            {differentials.map((item) => (
              <li key={item} className="text-muted text-link flex gap-3">
                <span className="text-accent mt-0.5">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </BentoCard>

        <BentoCard eyebrow="Pratico" title="Respostas rapidas" className="lg:col-span-3">
          <dl className="grid gap-3">
            {practical.map(([label, value]) => (
              <div key={label} className="border-line border-b pb-3 last:border-b-0 last:pb-0">
                <dt className="text-ink text-link font-ui">{label}</dt>
                <dd className="text-muted text-link mt-1">{value}</dd>
              </div>
            ))}
          </dl>
        </BentoCard>
      </div>
    </section>
  );
}
