'use client';

import React from 'react';
import Image from 'next/image';
import { PinIcon, ArrowIcon } from '@/components/ui/Icons';
import TransitionLink from '@/components/ui/TransitionLink';
import {
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  XIcon,
  MapRouteIcon,
  BarChartIcon,
  ThunderIcon,
  ClipboardIcon,
  MessageIcon,
  TargetIcon,
  QualityIcon,
  DesignIcon,
  CheckIcon,
  MonitorIcon,
  FileIcon,
  DashboardIcon,
  CartIcon,
  CloudIcon,
  ApiIcon,
  EyeIcon,
  UserIcon,
  RocketIcon,
  BookIcon
} from './RecruiterIcons';

export function BentoIntroductionCard() {
  return (
    <div className="recruiter-block border-line bg-paper/60 relative flex flex-col justify-between overflow-hidden rounded-xl border p-5 md:p-6 lg:col-span-8 lg:row-span-5">
      <div className="border-accent/5 pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full border-[12px] border-r-transparent" />
      <div>
        <div className="recruiter-block border-accent/40 bg-paper shadow-xs mb-4 flex w-fit items-center gap-2.5 rounded-sm border px-3.5 py-1.5 select-none">
          <div className="flex items-center gap-1">
            <span className="text-accent text-[0.62rem]">和</span>
            <div className="bg-accent/40 h-3 w-px" />
          </div>
          <span className="text-accent font-mono text-[0.68rem] font-bold tracking-[0.15em] uppercase">
            Para recrutadores
          </span>
          <div className="border-accent/60 text-accent/80 flex h-4.5 w-4.5 items-center justify-center rounded-sm border text-[0.45rem] font-bold">
            招
          </div>
        </div>
        <h1 className="font-heading text-ink max-w-[20ch] text-xl leading-tight tracking-normal md:text-2xl lg:text-[1.8rem] xl:text-3xl">
          Soluções completas, entregues com propósito.
        </h1>
        <p className="text-muted mt-3 max-w-[560px] text-xs leading-relaxed md:text-sm">
          Atuo unindo estratégia, design e tecnologia para criar produtos digitais com foco em
          desempenho, experiência do usuário e impacto real. Abaixo estão informações que podem
          ajudar na sua avaliação.
        </p>
      </div>

      <div className="relative z-10 mt-6 flex flex-wrap gap-3 lg:mt-0">
        <TransitionLink
          href="/#projects"
          className="bg-ink text-paper hover:bg-accent-dark min-h-touch font-ui inline-flex items-center justify-center gap-2 rounded-sm border border-transparent px-4 py-2.5 text-xs transition-all duration-180"
        >
          Ver projetos
          <ArrowIcon />
        </TransitionLink>
        <a
          href="/cv-gabriel-nbs.pdf"
          download
          className="border-line text-ink hover:border-ink hover:bg-soft min-h-touch font-ui bg-paper/50 inline-flex items-center justify-center gap-2 rounded-sm border px-4 py-2.5 text-xs transition-all duration-180"
        >
          Baixar CV
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
}

export function BentoIdentityCard() {
  return (
    <div className="recruiter-block border-line bg-paper/70 relative flex flex-col justify-between overflow-hidden rounded-xl border p-5 md:p-6 lg:col-span-4 lg:row-span-5">
      <div className="border-accent/10 pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full border-[8px] border-l-transparent" />

      <div className="relative z-10 flex items-center gap-4">
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
          <h2 className="font-heading text-ink text-lg leading-tight tracking-normal">
            Gabriel NBS
          </h2>
          <p className="text-accent mt-0.5 text-[0.65rem] font-bold tracking-wider uppercase">
            Desenvolvedor & Designer
          </p>
          <p className="text-muted mt-1 inline-flex items-center gap-1 text-[0.7rem]">
            <PinIcon />
            São Paulo, Brasil
          </p>
        </div>
      </div>

      <p className="text-muted relative z-10 mt-4 text-xs leading-relaxed">
        Desenvolvo experiências digitais completas, unindo interface, performance e código limpo para
        transformar ideias em produtos reais.
      </p>

      <div className="border-line relative z-10 mt-4 border-t pt-4">
        <span className="text-accent font-label mb-2 block text-[0.65rem] tracking-[0.08em] uppercase">
          Conecte-se comigo
        </span>
        <div className="flex gap-2">
          {[
            { icon: <GithubIcon />, href: 'https://github.com/GabrielNBS', label: 'GitHub' },
            {
              icon: <LinkedinIcon />,
              href: 'https://www.linkedin.com/in/gabriel-nbs/',
              label: 'LinkedIn'
            },
            { icon: <XIcon />, href: 'https://x.com/', label: 'X' }
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
              className="border-line text-muted hover:text-ink hover:border-ink bg-canvas/30 hover:bg-canvas flex h-9 w-9 items-center justify-center rounded-md border transition-colors duration-180"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BentoTimelineCard() {
  const trajectory = [
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
  ];

  return (
    <div className="recruiter-block border-line bg-paper/70 flex flex-col justify-between overflow-hidden rounded-xl border p-5 lg:col-span-3 lg:row-span-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="text-accent bg-accent/10 rounded p-1">
          <MapRouteIcon />
        </div>
        <span className="text-muted font-label text-[0.65rem] tracking-[0.08em] uppercase">
          MINHA TRAJETÓRIA
        </span>
      </div>

      <div className="border-line relative mt-1 ml-3 flex flex-1 flex-col justify-center space-y-4 border-l">
        {trajectory.map((item, idx) => (
          <div key={idx} className="relative pl-5">
            <span className="bg-accent absolute top-1.5 -left-[4.5px] h-2 w-2 rounded-full" />
            <span className="text-accent block text-[0.65rem] font-bold">{item.date}</span>
            <h4 className="text-ink mt-0.5 text-xs leading-tight font-bold">{item.role}</h4>
            <p className="text-muted mt-0.5 text-[0.65rem] leading-snug">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BentoStatsCard() {
  const stats = [
    { num: '+ 25', label: 'Projetos entregues' },
    { num: '+ 4', label: 'Anos de experiência' },
    { num: '98%', label: 'Satisfação dos clientes' },
    { num: '+ 18k', label: 'Usuários impactados' }
  ];

  return (
    <div className="recruiter-block border-line bg-paper/70 flex flex-col justify-between overflow-hidden rounded-xl border p-5 lg:col-span-3 lg:row-span-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="text-accent bg-accent/10 rounded p-1">
          <BarChartIcon />
        </div>
        <span className="text-muted font-label text-[0.65rem] tracking-[0.08em] uppercase">
          NÚMEROS QUE IMPORTAM
        </span>
      </div>

      <div className="mt-1 flex flex-1 flex-col justify-center space-y-3.5 pl-1">
        {stats.map((stat, idx) => (
          <div key={idx} className="flex items-baseline gap-2">
            <span className="text-accent font-heading w-12 shrink-0 text-lg leading-none font-bold xl:text-xl">
              {stat.num}
            </span>
            <span className="text-muted text-[0.65rem] leading-snug">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BentoWorkflowCard() {
  const items = [
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
  ];

  return (
    <div className="recruiter-block border-line bg-paper/70 flex flex-col justify-between overflow-hidden rounded-xl border p-5 lg:col-span-3 lg:row-span-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="text-accent bg-accent/10 rounded p-1">
          <ThunderIcon />
        </div>
        <span className="text-muted font-label text-[0.65rem] tracking-[0.08em] uppercase">
          COMO TRABALHO
        </span>
      </div>

      <div className="mt-1 flex flex-1 flex-col justify-center space-y-3 pl-1">
        {items.map((work, idx) => (
          <div key={idx} className="flex gap-2.5">
            <div className="text-accent bg-accent/5 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm p-0.5">
              {work.icon}
            </div>
            <div className="min-w-0">
              <h4 className="text-ink text-[0.7rem] leading-tight font-bold">{work.title}</h4>
              <p className="text-muted text-[0.65rem] leading-snug">{work.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BentoJobDetailsCard() {
  const details = [
    { label: 'Disponibilidade', val: 'Início imediato' },
    { label: 'Modelo', val: 'Remoto ou híbrido' },
    { label: 'Tipo de contratação', val: 'CLT / PJ' },
    { label: 'Interesses', val: 'Front-end, UX/UI e performance' }
  ];

  return (
    <div className="recruiter-block border-line bg-paper/70 flex flex-col justify-between overflow-hidden rounded-xl border p-5 lg:col-span-3 lg:row-span-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="text-accent bg-accent/10 rounded p-1">
          <ClipboardIcon />
        </div>
        <span className="text-muted font-label text-[0.65rem] tracking-[0.08em] uppercase">
          PARA ESTA VAGA
        </span>
      </div>

      <div className="mt-1 flex flex-1 flex-col justify-center space-y-2.5 pl-1">
        {details.map((job, idx) => (
          <div key={idx} className="flex gap-2">
            <div className="text-accent bg-accent/10 mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full p-0.5">
              <CheckIcon />
            </div>
            <div className="min-w-0">
              <h4 className="text-ink text-[0.7rem] leading-tight font-bold">{job.label}</h4>
              <p className="text-muted text-[0.65rem] leading-snug">{job.val}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BentoAreasCard() {
  const areas = [
    { label: 'Web Apps', icon: <MonitorIcon /> },
    { label: 'Landing Pages', icon: <FileIcon /> },
    { label: 'Dashboards', icon: <DashboardIcon /> },
    { label: 'E-commerces', icon: <CartIcon /> },
    { label: 'SaaS', icon: <CloudIcon /> },
    { label: 'APIs & Integrações', icon: <ApiIcon /> }
  ];

  const diffs = [
    { label: 'Visão de produto', icon: <EyeIcon /> },
    { label: 'Autonomia', icon: <UserIcon /> },
    { label: 'Proatividade', icon: <RocketIcon /> },
    { label: 'Aprendizado contínuo', icon: <BookIcon /> }
  ];

  return (
    <div className="recruiter-block border-line bg-paper/70 flex flex-col justify-between gap-4 overflow-hidden rounded-xl border p-4 lg:col-span-12 lg:row-span-2 lg:flex-row lg:items-center lg:gap-8">
      <div className="min-w-0 flex-1">
        <h3 className="text-accent font-label mb-2 text-[0.65rem] tracking-[0.08em] uppercase">
          ÁREAS DE ATUAÇÃO
        </h3>
        <div className="flex flex-wrap gap-2">
          {areas.map((area) => (
            <span
              key={area.label}
              className="border-line text-muted bg-paper hover:border-accent hover:text-ink flex cursor-default items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.65rem] font-medium transition-colors duration-180"
            >
              <span className="text-accent">{area.icon}</span>
              {area.label}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-line hidden h-8 w-px shrink-0 lg:block" />

      <div className="min-w-0 flex-1">
        <h3 className="text-accent font-label mb-2 text-[0.65rem] tracking-[0.08em] uppercase">
          DIFERENCIAIS
        </h3>
        <div className="flex flex-wrap gap-2">
          {diffs.map((dif) => (
            <span
              key={dif.label}
              className="border-line text-muted bg-paper hover:border-accent hover:text-ink flex cursor-default items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.65rem] font-medium transition-colors duration-180"
            >
              <span className="text-accent">{dif.icon}</span>
              {dif.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
