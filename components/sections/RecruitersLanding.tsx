'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowIcon, PinIcon } from '@/components/ui/Icons';
import TransitionLink from '@/components/ui/TransitionLink';

// ==========================================
// Ícones Customizados SVG (Inline)
// ==========================================

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="stroke-linecap-round stroke-linejoin-round h-icon-sm w-icon-sm fill-none stroke-current stroke-[1.8]"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MapRouteIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 20 3 17V4l6 3 6-3 6 3v13z" />
      <path d="M9 7v13" />
      <path d="M15 4v13" />
    </svg>
  );
}

function BarChartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function ThunderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function DesignIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[2.2]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="9" />
      <rect x="14" y="3" width="7" height="5" />
      <rect x="14" y="12" width="7" height="9" />
      <rect x="3" y="16" width="7" height="5" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a6 6 0 0 0 0-12z" />
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 2.5 1 4.5 2.5 6l6-6 6 6c1.5-1.5 2.5-3.5 2.5-6 0-5.5-4.5-10-10-10z" />
      <path d="M12 22s8-4 8-10h-8v10z" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-3 h-3 fill-none stroke-current stroke-[1.8]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

// ==========================================
// Componente Principal
// ==========================================

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
      className="w-site mx-auto p-4 md:p-6 lg:h-screen lg:max-h-screen lg:flex lg:flex-col lg:justify-between lg:gap-4 lg:box-border overflow-y-auto lg:overflow-hidden"
    >
      {/* Bento Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-12 gap-4 lg:flex-1 lg:min-h-0">
        
        {/* Card 1: Introdução */}
        <div className="recruiter-block lg:col-span-8 lg:row-span-5 border border-line bg-paper/60 rounded-xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="border-accent/5 absolute -bottom-10 -left-10 h-32 w-32 rounded-full border-[12px] border-r-transparent pointer-events-none" />
          <div>
            <span className="text-accent text-[0.7rem] font-label tracking-[0.1em] uppercase mb-2 block">
              Para recrutadores
            </span>
            <h1 className="text-xl md:text-2xl lg:text-[1.8rem] xl:text-3xl font-heading leading-tight tracking-normal text-ink max-w-[20ch]">
              Soluções completas, entregues com propósito.
            </h1>
            <p className="text-muted text-xs md:text-sm mt-3 leading-relaxed max-w-[560px]">
              Atuo unindo estratégia, design e tecnologia para criar produtos digitais com foco em desempenho, experiência do usuário e impacto real. Abaixo estão informações que podem ajudar na sua avaliação.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6 lg:mt-0 relative z-10">
            <TransitionLink
              href="/#projects"
              className="bg-ink text-paper hover:bg-accent-dark min-h-touch gap-2 px-4 py-2.5 text-xs font-ui inline-flex items-center justify-center rounded-sm border border-transparent transition-all duration-180"
            >
              Ver projetos
              <ArrowIcon />
            </TransitionLink>
            <a
              href="/cv-gabriel-nbs.pdf"
              download
              className="border-line text-ink hover:border-ink hover:bg-soft min-h-touch gap-2 px-4 py-2.5 text-xs font-ui inline-flex items-center justify-center rounded-sm border bg-paper/50 transition-all duration-180"
            >
              Baixar CV
              <DownloadIcon />
            </a>
          </div>
        </div>

        {/* Card 2: Identidade */}
        <div className="recruiter-block lg:col-span-4 lg:row-span-5 border border-line bg-paper/70 rounded-xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="border-accent/10 absolute -top-8 -right-8 h-24 w-24 rounded-full border-[8px] border-l-transparent pointer-events-none" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-soft border-line relative h-14 w-14 shrink-0 overflow-hidden rounded-full border shadow-inner">
              <Image
                src="/images/avatar.png"
                alt="Foto de Gabriel NBS"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <h2 className="font-heading text-lg leading-tight tracking-normal text-ink">
                Gabriel NBS
              </h2>
              <p className="text-accent text-[0.65rem] font-bold mt-0.5 tracking-wider uppercase">
                Desenvolvedor & Designer
              </p>
              <p className="text-muted text-[0.7rem] gap-1 mt-1 inline-flex items-center">
                <PinIcon />
                São Paulo, Brasil
              </p>
            </div>
          </div>

          <p className="text-muted text-xs leading-relaxed mt-4 relative z-10">
            Desenvolvo experiências digitais completas, unindo interface, performance e código limpo para transformar ideias em produtos reais.
          </p>

          <div className="mt-4 border-t border-line pt-4 relative z-10">
            <span className="text-accent text-[0.65rem] font-label tracking-[0.08em] uppercase mb-2 block">
              Conecte-se comigo
            </span>
            <div className="flex gap-2">
              {[
                { icon: <GithubIcon />, href: 'https://github.com/GabrielNBS', label: 'GitHub' },
                { icon: <LinkedinIcon />, href: 'https://www.linkedin.com/in/gabriel-nbs/', label: 'LinkedIn' },
                { icon: <XIcon />, href: 'https://x.com/', label: 'X' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="border-line text-muted hover:text-ink hover:border-ink w-9 h-9 flex items-center justify-center rounded-md border bg-canvas/30 hover:bg-canvas transition-colors duration-180"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Card 3: Trajetória */}
        <div className="recruiter-block lg:col-span-3 lg:row-span-5 border border-line bg-paper/70 rounded-xl p-5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-accent bg-accent/10 p-1 rounded">
              <MapRouteIcon />
            </div>
            <span className="text-muted text-[0.65rem] font-label tracking-[0.08em] uppercase">MINHA TRAJETÓRIA</span>
          </div>
          
          <div className="relative border-l border-line ml-3 mt-1 space-y-4 flex-1 flex flex-col justify-center">
            {[
              {
                date: '2024 – Atual',
                role: 'Dev & Designer Freelancer',
                desc: 'Soluções digitais para startups'
              },
              {
                date: '2021 – 2024',
                role: 'Desenvolvedor Front-end',
                desc: 'Agência digital • SP'
              },
              {
                date: '2019 – 2021',
                role: 'Designer de Interfaces',
                desc: 'Studio Criativo • SP'
              }
            ].map((item, idx) => (
              <div key={idx} className="relative pl-5">
                <span className="bg-accent absolute -left-[4.5px] top-1.5 h-2 w-2 rounded-full" />
                <span className="text-accent text-[0.65rem] font-bold block">{item.date}</span>
                <h4 className="text-ink text-xs font-bold leading-tight mt-0.5">{item.role}</h4>
                <p className="text-muted text-[0.65rem] mt-0.5 leading-snug">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Números */}
        <div className="recruiter-block lg:col-span-3 lg:row-span-5 border border-line bg-paper/70 rounded-xl p-5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-accent bg-accent/10 p-1 rounded">
              <BarChartIcon />
            </div>
            <span className="text-muted text-[0.65rem] font-label tracking-[0.08em] uppercase">NÚMEROS QUE IMPORTAM</span>
          </div>
          
          <div className="space-y-3.5 mt-1 pl-1 flex-1 flex flex-col justify-center">
            {[
              { num: '+ 25', label: 'Projetos entregues' },
              { num: '+ 4', label: 'Anos de experiência' },
              { num: '98%', label: 'Satisfação dos clientes' },
              { num: '+ 18k', label: 'Usuários impactados' }
            ].map((stat, idx) => (
              <div key={idx} className="flex items-baseline gap-2">
                <span className="text-accent text-lg xl:text-xl font-heading font-bold leading-none w-12 shrink-0">{stat.num}</span>
                <span className="text-muted text-[0.65rem] leading-snug">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5: Como Trabalho */}
        <div className="recruiter-block lg:col-span-3 lg:row-span-5 border border-line bg-paper/70 rounded-xl p-5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-accent bg-accent/10 p-1 rounded">
              <ThunderIcon />
            </div>
            <span className="text-muted text-[0.65rem] font-label tracking-[0.08em] uppercase">COMO TRABALHO</span>
          </div>
          
          <div className="space-y-3 mt-1 pl-1 flex-1 flex flex-col justify-center">
            {[
              {
                icon: <MessageIcon />,
                title: 'Comunicação clara',
                desc: 'Transparência em cada etapa'
              },
              {
                icon: <TargetIcon />,
                title: 'Foco em resultados',
                desc: 'Objetivos e impacto real'
              },
              {
                icon: <QualityIcon />,
                title: 'Qualidade & Performance',
                desc: 'Código limpo e escalável'
              },
              {
                icon: <DesignIcon />,
                title: 'Design com propósito',
                desc: 'Experiências que convertem'
              }
            ].map((work, idx) => (
              <div key={idx} className="flex gap-2.5">
                <div className="text-accent mt-0.5 shrink-0 bg-accent/5 p-0.5 rounded-sm w-5 h-5 flex items-center justify-center">
                  {work.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-ink text-[0.7rem] font-bold leading-tight">{work.title}</h4>
                  <p className="text-muted text-[0.65rem] leading-snug">{work.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 6: Para Esta Vaga */}
        <div className="recruiter-block lg:col-span-3 lg:row-span-5 border border-line bg-paper/70 rounded-xl p-5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-accent bg-accent/10 p-1 rounded">
              <ClipboardIcon />
            </div>
            <span className="text-muted text-[0.65rem] font-label tracking-[0.08em] uppercase">PARA ESTA VAGA</span>
          </div>
          
          <div className="space-y-2.5 mt-1 pl-1 flex-1 flex flex-col justify-center">
            {[
              { label: 'Disponibilidade', val: 'Início imediato' },
              { label: 'Modelo', val: 'Remoto ou híbrido' },
              { label: 'Tipo de contratação', val: 'CLT / PJ' },
              { label: 'Interesses', val: 'Front-end, UX/UI e performance' }
            ].map((job, idx) => (
              <div key={idx} className="flex gap-2">
                <div className="text-accent mt-0.5 shrink-0 bg-accent/10 p-0.5 rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  <CheckIcon />
                </div>
                <div className="min-w-0">
                  <h4 className="text-ink text-[0.7rem] font-bold leading-tight">{job.label}</h4>
                  <p className="text-muted text-[0.65rem] leading-snug">{job.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 7: Áreas de Atuação & Diferenciais */}
        <div className="recruiter-block lg:col-span-12 lg:row-span-2 border border-line bg-paper/70 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8 overflow-hidden">
          
          {/* Áreas de Atuação */}
          <div className="flex-1 min-w-0">
            <h3 className="text-accent text-[0.65rem] font-label tracking-[0.08em] uppercase mb-2">ÁREAS DE ATUAÇÃO</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Web Apps', icon: <MonitorIcon /> },
                { label: 'Landing Pages', icon: <FileIcon /> },
                { label: 'Dashboards', icon: <DashboardIcon /> },
                { label: 'E-commerces', icon: <CartIcon /> },
                { label: 'SaaS', icon: <CloudIcon /> },
                { label: 'APIs & Integrações', icon: <ApiIcon /> }
              ].map((area) => (
                <span
                  key={area.label}
                  className="border-line text-muted px-2.5 py-1 text-[0.65rem] rounded-full border font-medium bg-paper flex items-center gap-1.5 hover:border-accent hover:text-ink transition-colors duration-180 cursor-default"
                >
                  <span className="text-accent">{area.icon}</span>
                  {area.label}
                </span>
              ))}
            </div>
          </div>

          {/* Divisor vertical no desktop */}
          <div className="hidden lg:block h-8 w-px bg-line shrink-0" />

          {/* Diferenciais */}
          <div className="flex-1 min-w-0">
            <h3 className="text-accent text-[0.65rem] font-label tracking-[0.08em] uppercase mb-2">DIFERENCIAIS</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Visão de produto', icon: <EyeIcon /> },
                { label: 'Autonomia', icon: <UserIcon /> },
                { label: 'Proatividade', icon: <RocketIcon /> },
                { label: 'Aprendizado contínuo', icon: <BookIcon /> }
              ].map((dif) => (
                <span
                  key={dif.label}
                  className="border-line text-muted px-2.5 py-1 text-[0.65rem] rounded-full border font-medium bg-paper flex items-center gap-1.5 hover:border-accent hover:text-ink transition-colors duration-180 cursor-default"
                >
                  <span className="text-accent">{dif.icon}</span>
                  {dif.label}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Footer Fixo e Compacto no Fim */}
      <div className="recruiter-block mt-4 lg:mt-0">
        <div className="grid grid-cols-3 divide-x divide-line border border-line rounded-md bg-paper overflow-hidden text-center shadow-sm">
          <TransitionLink
            href="/"
            className="hover:bg-soft py-3 text-[0.75rem] font-ui transition-colors duration-180 block text-muted hover:text-ink group"
          >
            Sobre <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-180 ml-1">→</span>
          </TransitionLink>
          <TransitionLink
            href="/#projects"
            className="hover:bg-soft py-3 text-[0.75rem] font-ui transition-colors duration-180 block text-muted hover:text-ink group"
          >
            Projetos <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-180 ml-1">→</span>
          </TransitionLink>
          <TransitionLink
            href="/#contact"
            className="hover:bg-soft py-3 text-[0.75rem] font-ui transition-colors duration-180 block text-muted hover:text-ink group"
          >
            Contato <span className="inline-block translate-x-0 group-hover:translate-x-1 transition-transform duration-180 ml-1">→</span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
