'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import GradientText from '@/components/ui/GradientText';
import CustomImage from '@/components/ui/CustomImage';
import Tag from '@/components/ui/Tag';
import { FaGithub } from 'react-icons/fa6';
import { FaExternalLinkAlt } from 'react-icons/fa';
import TechSpan from '../ui/TechSpan';

const MacbookMockup = ({ src, alt }: { src?: string; alt?: string }) => (
  <div className="relative w-[110%] lg:w-[125%] max-w-none transition-transform duration-700 hover:scale-[1.02] -ml-4 lg:-ml-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
    <svg viewBox="0 0 1000 600" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      {/* Top lid (bezel edge) */}
      <rect
        x="50"
        y="30"
        width="900"
        height="530"
        rx="30"
        className="fill-zinc-400 dark:fill-zinc-800"
      />

      {/* Inner Bezel */}
      <rect x="52" y="32" width="896" height="526" rx="28" fill="#18181b" />

      {/* Screen Content */}
      <foreignObject x="64" y="44" width="872" height="502">
        <div className="w-full h-full overflow-hidden flex items-center justify-center bg-zinc-950 border border-zinc-900 rounded-sm relative">
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt || 'Mockup'} className="w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center opacity-60">
              <svg
                className="w-20 h-20 text-zinc-500 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-zinc-400 font-medium text-xl">Placeholder da Imagem</span>
            </div>
          )}
          {/* Subtle Screen Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
        </div>
      </foreignObject>

      {/* Camera & Sensor */}
      <circle cx="500" cy="38" r="4" className="fill-zinc-950" />
      <circle cx="512" cy="38" r="1.5" className="fill-zinc-800" />

      {/* Base Body */}
      <path
        d="M 0 560 L 1000 560 L 980 585 A 15 15 0 0 1 965 595 L 35 595 A 15 15 0 0 1 20 585 Z"
        className="fill-zinc-300 dark:fill-zinc-700"
      />

      {/* Base Front Lip */}
      <path
        d="M 0 560 L 1000 560 L 1000 564 L 0 564 Z"
        className="fill-zinc-200 dark:fill-zinc-600"
      />

      {/* Trackpad notch */}
      <path
        d="M 430 560 L 570 560 L 565 568 L 435 568 Z"
        className="fill-zinc-400 dark:fill-zinc-800"
      />
    </svg>
  </div>
);

type ProjectCardProps = {
  id: number;
  name: string;
  title: string;
  description: string;
  techs: string[];
  mockups: string[];
  deploy: string;
  github: string;
  isNew?: boolean;
  bgColor: string;
};

function useScreenType() {
  const [screenType, setScreenType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setScreenType('desktop');
      else if (width >= 768) setScreenType('tablet');
      else setScreenType('mobile');
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return screenType;
}

export default function ProjectCard({
  id,
  name,
  title,
  description,
  techs,
  mockups,
  deploy,
  github,
  isNew = false,
  bgColor
}: ProjectCardProps) {
  const screenType = useScreenType();
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Configurar perspectiva do mockup
      gsap.set(mockupRef.current, {
        transformPerspective: 1200,
        transformOrigin: 'bottom center',
        willChange: 'transform, opacity'
      });

      gsap.from(mockupRef.current, {
        y: 120,
        scale: 0.85,
        rotationX: -60,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.5,
          toggleActions: 'play none none reverse'
        }
      });
    },
    { scope: sectionRef }
  );

  const getMockupImage = () => {
    switch (screenType) {
      case 'desktop':
        return mockups[2];
      case 'tablet':
        return mockups[1];
      case 'mobile':
        return mockups[0];
      default:
        return mockups[2];
    }
  };

  return (
    <div
      ref={sectionRef}
      data-number={id}
      data-bg-color={bgColor}
      id={name}
      className="section-standard grid grid-cols-[45%_55%] items-center justify-center gap-12 project-section
      before:content-[attr(data-number)] before:absolute before:bg-transparent before:top-4 before:right-4
      before:text-[8rem] before:font-bold before:[-webkit-text-stroke:2px_var(--color-shadow-secondary)] before:opacity-50
      max-[1023px]:flex max-[1023px]:flex-col max-[767px]:before:top-0 max-[767px]:before:text-[5rem]
      [&_h2]:mb-2 [&_h2]:flex [&_h2]:items-center [&_h2]:flex-wrap [&_h2]:gap-4"
    >
      {/* Description (hidden on mobile) */}
      {screenType !== 'mobile' && (
        <div className="flex flex-col justify-center gap-6 text-foreground w-full">
          <div className="flex items-center gap-4">
            <h2 className="text-fluid-2xl font-bold">
              <GradientText
                colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
                animationSpeed={4}
                showBorder={false}
              >
                {title}
              </GradientText>
            </h2>
            {isNew && <Tag />}
          </div>

          <p className="text-fluid-base leading-relaxed opacity-60">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {techs.map((tech) => (
              <TechSpan key={tech}>
                <p className="text-fluid-base font-bold">{tech}</p>
              </TechSpan>
            ))}
          </div>

          <div className="flex gap-4 overflow-visible">
            {github && (
              <Button
                as="a"
                href={github}
                title="Link do GitHub"
                aria-label={`Ver código de ${title} no GitHub`}
                target="_blank"
                rel="noreferrer noopener nofollow"
              >
                <FaGithub className="inline mr-1" /> Código
              </Button>
            )}
            {deploy && (
              <Button
                as="a"
                href={deploy}
                aria-label={`Ver site do projeto ${title}`}
                title="Link do deploy"
                target="_blank"
                rel="noreferrer noopener nofollow"
              >
                <FaExternalLinkAlt className="inline mr-1" /> Site
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Mockup image */}
      <div
        ref={mockupRef}
        className="flex justify-center items-center w-full h-auto
        max-[767px]:flex-col max-[767px]:gap-8 max-[767px]:max-w-[90%]"
      >
        {/* Usando imagem livre de direitos (Picsum Photos) baseada no ID do projeto para exemplificar */}
        <MacbookMockup
          src={`https://picsum.photos/seed/${id}/800/480`}
          alt={`Mockup ${screenType} do projeto ${title}`}
        />
        {screenType === 'mobile' && (
          <Button
            as="button"
            onClick={() => setShowModal(true)}
            aria-label={`Abrir detalhes do projeto ${title}`}
            className="bg-accent! text-tertiary!"
          >
            Saiba +
          </Button>
        )}
      </div>

      {showModal && (
        <Modal
          title={title}
          description={description}
          techs={techs}
          deploy={deploy}
          github={github}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
