'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import TransitionLink from '@/components/ui/TransitionLink';
import { ButtonLink } from '@/components/ui/Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animateFadeIn, animateSplitText } from '@/animations';
import projects from '@/data/projects';
import { ArrowIcon, ExternalIcon } from '@/components/ui/Icons';

interface ColorRevealMockupProps {
  src: string;
  alt: string;
  priority?: boolean;
}

interface Splat {
  x: number;
  y: number;
  radius: number;
  intensity: number;
}

function ColorRevealMockup({ src, alt, priority = false }: ColorRevealMockupProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const grayscaleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const splatsRef = useRef<Splat[]>([]);
  const lastSplatRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const isLoopingRef = useRef(false);
  const hasDrawnStaticRef = useRef(false);

  const drawStaticGrayscale = () => {
    const imgObj = imageRef.current;
    const canvas = canvasRef.current;
    const grayCanvas = grayscaleCanvasRef.current;
    if (!canvas || !grayCanvas || !imgObj || !imgObj.complete || imgObj.naturalWidth === 0) return;

    const rect = containerRef.current?.getBoundingClientRect();
    const canvasWidth = rect ? rect.width : canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = rect ? rect.height : canvas.height / (window.devicePixelRatio || 1);

    if (grayCanvas.width !== canvas.width || grayCanvas.height !== canvas.height) {
      grayCanvas.width = canvas.width;
      grayCanvas.height = canvas.height;
    }

    const gCtx = grayCanvas.getContext('2d');
    if (!gCtx) return;

    gCtx.clearRect(0, 0, grayCanvas.width, grayCanvas.height);
    gCtx.save();
    gCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

    const imgWidth = imgObj.naturalWidth;
    const imgHeight = imgObj.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const containerRatio = canvasWidth / canvasHeight;

    let sx = 0, sWidth = imgWidth, sHeight = imgHeight;
    const sy = 0;
    if (imgRatio > containerRatio) {
      sWidth = imgHeight * containerRatio;
      sx = (imgWidth - sWidth) / 2;
    } else {
      sWidth = imgWidth;
      sHeight = imgWidth / containerRatio;
      sx = 0;
    }

    gCtx.filter = 'grayscale(100%)';
    gCtx.drawImage(imgObj, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
    gCtx.restore();

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(grayCanvas, 0, 0);
    }
  };

  useEffect(() => {
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
    }
    if (!grayscaleCanvasRef.current) {
      grayscaleCanvasRef.current = document.createElement('canvas');
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isActive = true;
    let nextImgEl: HTMLImageElement | null = null;
    let loadListener: (() => void) | null = null;

    const checkImage = () => {
      if (imageRef.current) return true;
      const nextImg = containerRef.current?.querySelector('img') as HTMLImageElement | null;
      if (nextImg) {
        if (nextImg.complete && nextImg.naturalWidth > 0) {
          imageRef.current = nextImg;
          drawStaticGrayscale();
          return true;
        } else {
          nextImgEl = nextImg;
          loadListener = () => {
            if (isActive) {
              imageRef.current = nextImg;
              drawStaticGrayscale();
            }
          };
          nextImg.addEventListener('load', loadListener);
        }
      }
      return false;
    };

    checkImage();

    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      drawStaticGrayscale();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      isActive = false;
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      if (nextImgEl && loadListener) {
        nextImgEl.removeEventListener('load', loadListener);
      }
    };
  }, [src]);

  const startLoop = () => {
    if (!isLoopingRef.current) {
      isLoopingRef.current = true;
      hasDrawnStaticRef.current = false;
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      
      const renderFrame = () => {
        const splats = splatsRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const imgObj = imageRef.current;
        const grayCanvas = grayscaleCanvasRef.current;

        if (!canvas || !ctx || !imgObj || !grayCanvas) {
          isLoopingRef.current = false;
          animationFrameId.current = null;
          return;
        }
        
        const needsRender = splats.length > 0;
        if (!needsRender) {
          if (!hasDrawnStaticRef.current) {
            drawStaticGrayscale();
            hasDrawnStaticRef.current = true;
          }
          isLoopingRef.current = false;
          animationFrameId.current = null;
          return;
        }

        hasDrawnStaticRef.current = false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(grayCanvas, 0, 0);

        const rect = containerRef.current?.getBoundingClientRect();
        const canvasWidth = rect ? rect.width : canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = rect ? rect.height : canvas.height / (window.devicePixelRatio || 1);

        const imgWidth = imgObj.naturalWidth;
        const imgHeight = imgObj.naturalHeight;
        const imgRatio = imgWidth / imgHeight;
        const containerRatio = canvasWidth / canvasHeight;

        let sx = 0, sWidth = imgWidth, sHeight = imgHeight;
        const sy = 0;
        if (imgRatio > containerRatio) {
          sWidth = imgHeight * containerRatio;
          sx = (imgWidth - sWidth) / 2;
        } else {
          sWidth = imgWidth;
          sHeight = imgWidth / containerRatio;
          sx = 0;
        }

        const offscreen = offscreenCanvasRef.current;
        if (offscreen) {
          if (offscreen.width !== canvas.width || offscreen.height !== canvas.height) {
            offscreen.width = canvas.width;
            offscreen.height = canvas.height;
          }

          const oCtx = offscreen.getContext('2d');
          if (oCtx) {
            oCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            oCtx.save();
            oCtx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);

            oCtx.globalCompositeOperation = 'source-over';
            splats.forEach((splat) => {
              const grad = oCtx.createRadialGradient(
                splat.x,
                splat.y,
                0,
                splat.x,
                splat.y,
                splat.radius
              );
              grad.addColorStop(0, `rgba(0, 0, 0, ${splat.intensity})`);
              grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

              oCtx.fillStyle = grad;
              oCtx.beginPath();
              oCtx.arc(splat.x, splat.y, splat.radius, 0, Math.PI * 2);
              oCtx.fill();
            });

            oCtx.globalCompositeOperation = 'source-in';
            oCtx.drawImage(imgObj, sx, sy, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
            oCtx.restore();

            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.drawImage(offscreen, 0, 0);
            ctx.restore();
          }
        }

        splatsRef.current = splats
          .map((splat) => ({
            ...splat,
            intensity: splat.intensity - 0.015,
            radius: splat.radius + 0.5
          }))
          .filter((splat) => splat.intensity > 0);

        animationFrameId.current = requestAnimationFrame(renderFrame);
      };

      animationFrameId.current = requestAnimationFrame(renderFrame);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !canvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const last = lastSplatRef.current;
    if (last) {
      const dx = x - last.x;
      const dy = y - last.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 8) return;
    }

    lastSplatRef.current = { x, y };

    splatsRef.current.push({
      x,
      y,
      radius: 95,
      intensity: 1.0
    });

    if (splatsRef.current.length > 80) {
      splatsRef.current.shift();
    }

    startLoop();
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="50vw"
        priority={priority}
        className="opacity-0 pointer-events-none"
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full z-10"
      />
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopShowcaseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;

      const section = sectionRef.current;
      const desktopShowcase = desktopShowcaseRef.current;
      if (!section) return;

      // Register plugin inside hook to ensure it's client-only
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

      // 2. Timeline complexa de scroll para Desktop
      if (desktopShowcase) {
        projects.forEach((_, i) => {
          if (i === 0) {
            gsap.set(`.text-block-${i}`, { autoAlpha: 1, y: 0, filter: 'blur(0px)', pointerEvents: 'auto' });
            gsap.set(`.project-number-${i}`, { autoAlpha: 1, filter: 'blur(0px)' });
          } else {
            gsap.set(`.text-block-${i}`, { autoAlpha: 0, y: 30, filter: 'blur(10px)', pointerEvents: 'none' });
            gsap.set(`.project-number-${i}`, { autoAlpha: 0, filter: 'blur(10px)' });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopShowcase,
            start: 'top 72px',
            end: 'bottom bottom',
            scrub: 1
          }
        });

        const OUT_DURATION = 0.35;
        const IN_DURATION = 0.35;
        const GAP = 0.3;

        for (let i = 0; i < projects.length - 1; i++) {
          const outStart = i;
          const outEnd = outStart + OUT_DURATION;
          const inStart = outEnd + GAP;

          tl.to(
            `.text-block-${i}`,
            {
              autoAlpha: 0,
              y: -30,
              filter: 'blur(10px)',
              pointerEvents: 'none',
              ease: 'power3.in',
              duration: OUT_DURATION,
              onStart: () => {
                const el = document.querySelector(`.text-block-${i}`) as HTMLElement | null;
                if (el) el.inert = true;
              },
              onReverseComplete: () => {
                const el = document.querySelector(`.text-block-${i}`) as HTMLElement | null;
                if (el) el.inert = false;
              }
            },
            outStart
          );

          tl.to(
            `.project-number-${i}`,
            {
              autoAlpha: 0,
              filter: 'blur(5px)',
              ease: 'power2.in',
              duration: OUT_DURATION
            },
            outStart
          );

          tl.to(
            `.text-block-${i + 1}`,
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              pointerEvents: 'auto',
              ease: 'power3.out',
              duration: IN_DURATION,
              onStart: () => {
                const el = document.querySelector(`.text-block-${i + 1}`) as HTMLElement | null;
                if (el) el.inert = false;
              },
              onReverseComplete: () => {
                const el = document.querySelector(`.text-block-${i + 1}`) as HTMLElement | null;
                if (el) el.inert = true;
              }
            },
            inStart
          );

          tl.to(
            `.project-number-${i + 1}`,
            {
              autoAlpha: 1,
              filter: 'blur(0px)',
              ease: 'power2.out',
              duration: IN_DURATION
            },
            inStart
          );
        }

        // Progresso do divisor de bambu acompanhando o scroll de forma linear
        gsap.to('.bamboo-progress', {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: desktopShowcase,
            start: 'top 72px',
            end: 'bottom bottom',
            scrub: true
          }
        });
      }

      // 3. Animação dos Cards Mobile (Estética Shoji alternada: direita/esquerda)
      const mobileCards = Array.from(section.querySelectorAll<HTMLElement>('.project-card-mobile'));
      mobileCards.forEach((card, idx) => {
        const direction = idx % 2 === 0 ? -40 : 40;
        animateFadeIn(card, {
          x: direction,
          y: 0,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%'
          }
        });
      });

      // 4. Efeito de Tilt 3D interativo nos Mockups (Desktop)
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

  return (
    <section id="projects" className="py-section" ref={sectionRef}>
      {/* Section Header */}
      <div className="w-site mb-heading-gap mx-auto">
        <p className="projects-label text-accent text-label font-label mb-4 tracking-widest uppercase">
          Projetos
        </p>
        <h2
          id="projects-title"
          className="text-display font-heading max-w-[15ch] leading-[1.05] max-md:max-w-[11ch]"
        >
          Provas tecnicas em contexto real.
        </h2>
      </div>

      {/* Desktop GSAP Pinned Showcase with Natural Image Scroll */}
      <div
        className="w-site gap-grid relative mx-auto hidden items-start lg:flex"
        ref={desktopShowcaseRef}
      >
        {/* Left Column: Fixed Text Content */}
        <div className="sticky top-[72px] z-10 flex h-[calc(100vh-72px)] w-[45%] flex-row items-center gap-10">
          <div className="bamboo-divider h-[60vh]">
            <div
              className="bamboo-progress absolute inset-x-0 top-0 w-full origin-top"
              style={{ height: '0%' }}
            />
          </div>
          <div className="relative flex h-[60vh] flex-1 flex-col justify-center">
            {/* Números com crossfade e blur fixos */}
            <div className="pointer-events-none absolute top-[8vh] left-0 z-10 w-full">
              {projects.map((project, index) => (
                <div
                  key={`num-${project.slug}`}
                  className={`project-number-${index} text-accent text-index font-label absolute top-0 left-0`}
                  style={index === 0 ? {} : { visibility: 'hidden', opacity: 0 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
              ))}
            </div>

            {projects.map((project, index) => (
              <div
                key={project.slug}
                className={`text-block-${index} absolute inset-x-0 flex flex-col justify-center gap-5`}
                style={index === 0 ? {} : { visibility: 'hidden', opacity: 0 }}
                inert={index === 0 ? undefined : true}
              >
                <div className="pointer-events-none h-[20px]" />
                <div>
                  <h3 className="text-display font-heading text-ink mb-2 leading-[1.1] tracking-normal">
                    {project.name}
                  </h3>
                  <p className="text-muted text-body max-w-[28rem]">{project.summary}</p>
                </div>

                <div className="flex flex-wrap gap-3" aria-label={`Tecnologias de ${project.name}`}>
                  {project.techs.slice(0, 4).map((tech) => (
                    <span
                      className="border-line text-muted px-tag-x py-tag-y text-tag bg-paper border font-bold"
                      key={tech.name}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <ButtonLink href={`/projects/${project.slug}`} variant="filled" intent="primary">
                    Ver projeto
                    <ArrowIcon />
                  </ButtonLink>
                  <ButtonLink
                    href={project.deploy}
                    target="_blank"
                    rel="noreferrer"
                    variant="outlined"
                    intent="secondary"
                  >
                    Deploy
                    <ExternalIcon />
                  </ButtonLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Naturally Scrolling Images */}
        <div className="flex w-[55%] flex-col">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              id={project.slug}
              className="project-row flex h-[calc(100vh-72px)] items-center justify-center"
            >
              <div className="border-line bg-paper shadow-soft mockup-container relative aspect-16/14 w-full overflow-hidden border">
                <ColorRevealMockup
                  src={project.mockups.desktop}
                  alt={`Preview desktop do projeto ${project.name}`}
                  priority={index === 0}
                />
                <div className="mockup-shine pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Fallback Layout */}
      <div className="w-site mx-auto lg:hidden">
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              id={project.slug}
              className="project-card-mobile border-line hover:shadow-soft flex flex-col overflow-hidden rounded-md border bg-[rgb(255,255,255,0.74)] transition-all duration-180 hover:-translate-y-1 hover:border-[rgb(24,24,27,0.28)]"
            >
              <TransitionLink
                href={`/projects/${project.slug}`}
                className="border-line relative block aspect-16/10 rounded-none border-0 border-b shadow-none"
              >
                <Image
                  src={project.mockups.desktop}
                  alt={`Preview desktop do projeto ${project.name}`}
                  fill
                  sizes="(max-width: 800px) 92vw"
                  className="object-cover object-top"
                />
              </TransitionLink>
              <div className="p-card-body flex flex-col gap-5 p-6">
                <div className="text-accent text-index font-label">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-title font-title tracking-normal">{project.name}</h3>
                  <p className="text-muted text-body">{project.summary}</p>
                </div>
                <div className="flex flex-wrap gap-3" aria-label={`Tecnologias de ${project.name}`}>
                  {project.techs.slice(0, 4).map((tech) => (
                    <span
                      className="border-line text-muted px-tag-x py-tag-y text-tag rounded-full border font-bold"
                      key={tech.name}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                  <ButtonLink href={`/projects/${project.slug}`} variant="text" intent="primary">
                    Ver projeto
                    <ArrowIcon />
                  </ButtonLink>
                  <ButtonLink
                    href={project.deploy}
                    target="_blank"
                    rel="noreferrer"
                    variant="text"
                    intent="secondary"
                  >
                    Deploy
                    <ExternalIcon />
                  </ButtonLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
