'use client';

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface TransitionContextProps {
  navigate: (href: string) => void;
  isPending: boolean;
}

const TransitionContext = createContext<TransitionContextProps | null>(null);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition deve ser usado dentro de um TransitionProvider');
  }
  return context;
};

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const ensoCircleRef = useRef<SVGCircleElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const lightLineRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  
  const pendingRouteRef = useRef<string | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isInternalNavigationRef = useRef(false);



  const { contextSafe } = useGSAP(() => {
    if (typeof window === 'undefined') return;

    gsap.set(overlayRef.current, { display: 'flex', pointerEvents: 'auto' });
    
    if (isFirstLoad) {
      // Desativa o scroll no início da intro
      document.body.style.overflow = 'hidden';

      // 1. Primeira entrada: portas fechadas, conteúdo oculto e escala reduzida
      gsap.set(leftPanelRef.current, { xPercent: 0 });
      gsap.set(rightPanelRef.current, { xPercent: 0 });
      gsap.set(centerContentRef.current, { opacity: 0 });
      gsap.set(lightLineRef.current, { scaleY: 0, opacity: 0 });
      gsap.set(contentWrapperRef.current, { opacity: 0, scale: 1.02 });

      // Inicializa o Ensō fechado (totalmente invisível pelo offset do traço)
      gsap.set(ensoCircleRef.current, { strokeDashoffset: 238.76 });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none', pointerEvents: 'none' });
          setIsFirstLoad(false);
          // Restaura o scroll
          document.body.style.overflow = '';
        }
      });

      // Animação complexa e elaborada da primeira entrada
      tl.to(centerContentRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out'
      })
      // Desenha o círculo Ensō de forma fluida e analógica
      .to(ensoCircleRef.current, {
        strokeDashoffset: 35, // Deixa a abertura wabi-sabi clássica do Ensō
        duration: 1.4,
        ease: 'power2.inOut'
      }, '-=0.2')
      // Revela a escrita na língua-mãe de Sun Tzu (caractere de referência)
      .fromTo(nameRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' },
        '-=1.0'
      )
      // Revela a frase em português
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.7'
      )
      // Pausa de 3.0 segundos para leitura, conforme solicitado
      .to({}, { duration: 2.0 })
      // Fade out do conteúdo central da intro
      .to(centerContentRef.current, {
        opacity: 0,
        scale: 0.97,
        duration: 0.5,
        ease: 'power2.in'
      })
      // Acende a linha fina vertical vermelha (Accent) no meio das portas
      .fromTo(lightLineRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.5, ease: 'power3.inOut' },
        '-=0.1'
      )
      // As portas Shoji se abrem e revelam a página com zoom-out tridimensional sutil
      .to(leftPanelRef.current, {
        xPercent: -100,
        duration: 0.9,
        ease: 'power3.inOut'
      }, '+=0.2')
      .to(rightPanelRef.current, {
        xPercent: 100,
        duration: 0.9,
        ease: 'power3.inOut'
      }, '<')
      .to(lightLineRef.current, {
        opacity: 0,
        scaleY: 0.8,
        duration: 0.5,
        ease: 'power3.in'
      }, '<')
      .to(contentWrapperRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out'
      }, '<+=0.1');

      timelineRef.current = tl;
    } else {
      // 2. Estado pós-introdução ou montagem subsequente: apenas garante que as portas estejam abertas instantaneamente
      gsap.set(leftPanelRef.current, { xPercent: -100 });
      gsap.set(rightPanelRef.current, { xPercent: 100 });
      gsap.set(centerContentRef.current, { opacity: 0 });
      gsap.set(lightLineRef.current, { opacity: 0 });
      gsap.set(contentWrapperRef.current, { opacity: 1 });
      gsap.set(overlayRef.current, { display: 'none', pointerEvents: 'none' });
      document.documentElement.style.scrollBehavior = '';
      document.body.style.overflow = '';
    }
  }, { dependencies: [isFirstLoad], revertOnUpdate: true });

  const navigate = (href: string) => {
    if (isPending) return;

    const currentPath = pathname;
    const targetPath = href.split('#')[0] || '/';
    
    if (currentPath === targetPath) {
      router.push(href);
      return;
    }

    setIsPending(true);
    pendingRouteRef.current = href;
    isInternalNavigationRef.current = true;

    // Desativa o scroll suave global imediatamente para que o salto na nova rota seja instantâneo sob o overlay
    document.documentElement.style.scrollBehavior = 'auto';
    // Desativa o scroll durante a transição
    document.body.style.overflow = 'hidden';

    contextSafe(() => {
      gsap.set(overlayRef.current, { display: 'flex', pointerEvents: 'auto' });
      gsap.set(contentWrapperRef.current, { pointerEvents: 'none' });

      // Animação de saída: as portas shoji se fecham sobre a página atual de forma suave
      const tl = gsap.timeline({
        onComplete: () => {
          if (pendingRouteRef.current) {
            router.push(pendingRouteRef.current);
          }
        }
      });

      tl.to(leftPanelRef.current, {
        xPercent: 0,
        duration: 1.0,
        ease: 'power3.inOut'
      })
      .to(rightPanelRef.current, {
        xPercent: 0,
        duration: 1.0,
        ease: 'power3.inOut'
      }, '<');
    })();
  };

  useEffect(() => {
    pendingRouteRef.current = null;
    
    // Força a rolagem instantânea para o topo ou seção correspondente
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      
      // A rolagem para o hash (local anterior do projeto) só ocorre se for uma navegação interna de rota
      if (hash && isInternalNavigationRef.current) {
        const id = decodeURIComponent(hash.substring(1));
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            // Se for desktop e o elemento for a row do projeto, alinhamos ao topo
            // com compensação da barra de navegação sticky (72px)
            const isDesktop = window.innerWidth >= 1024;
            if (isDesktop && element.classList.contains('project-row')) {
              const yOffset = -72;
              const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({ top: y, behavior: 'auto' });
            } else {
              element.scrollIntoView({ behavior: 'auto', block: 'start' });
            }
          }, 35);
        }
      } else {
        // Refresh forçado (F5), entrada direta ou rotas sem hash sempre mandam para o topo
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        
        // Garante que o scroll vá para 0 mesmo que o navegador tente forçar a rolagem nativa para o hash no F5
        if (hash) {
          setTimeout(() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          }, 35);
        }
      }
    }

    // Roda a animação de entrada na nova rota montada (Somente em navegações internas)
    if (isInternalNavigationRef.current && overlayRef.current && leftPanelRef.current && rightPanelRef.current) {
      gsap.set(overlayRef.current, { display: 'flex', pointerEvents: 'auto' });
      gsap.set(contentWrapperRef.current, { opacity: 1 });

      gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none', pointerEvents: 'none' });
          gsap.set(contentWrapperRef.current, { pointerEvents: 'auto' });
          // Restaura o scroll behavior para o padrão (smooth)
          document.documentElement.style.scrollBehavior = '';
          // Restaura o scroll
          document.body.style.overflow = '';
          
          // Desativa a pendência de forma assíncrona após as portas se abrirem
          setTimeout(() => {
            setIsPending(false);
          }, 0);
        }
      })
      .to(leftPanelRef.current, {
        xPercent: -100,
        duration: 1.0,
        ease: 'power3.inOut'
      })
      .to(rightPanelRef.current, {
        xPercent: 100,
        duration: 1.0,
        ease: 'power3.inOut'
      }, '<');
    } else {
      // Para o primeiro carregamento (onde a intro está rodando ou acabou de rodar) ou F5
      setTimeout(() => {
        setIsPending(false);
      }, 0);
    }

    // Reseta a flag de navegação interna sempre no final do efeito
    if (typeof window !== 'undefined') {
      isInternalNavigationRef.current = false;
    }
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate, isPending }}>
      <div ref={contentWrapperRef} className="w-full">
        {children}
      </div>
      
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none"
        style={{ display: 'none' }}
      >
        {/* Painel Shoji Esquerdo */}
        <div
          ref={leftPanelRef}
          className="absolute left-0 top-0 bottom-0 w-1/2 bg-canvas border-r border-line flex justify-end items-center"
          style={{ transform: 'translateX(0%)' }}
        >
          <div className="absolute inset-y-0 right-8 w-[1px] bg-line/30" />
        </div>

        {/* Painel Shoji Direito */}
        <div
          ref={rightPanelRef}
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-canvas border-l border-line flex justify-start items-center"
          style={{ transform: 'translateX(0%)' }}
        >
          <div className="absolute inset-y-0 left-8 w-[1px] bg-line/30" />
        </div>

        {/* Linha fina de luz no centro */}
        <div
          ref={lightLineRef}
          className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-accent z-20 -translate-x-1/2 origin-center"
          style={{ transform: 'scaleY(0)', opacity: 0 }}
        />

        {/* Intro Ensō no primeiro carregamento */}
        {isFirstLoad && (
          <div
            ref={centerContentRef}
            className="relative z-10 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-6">
              {/* Círculo estilo Ensō animado */}
              <svg viewBox="0 0 100 100" className="h-20 w-20 select-none" aria-hidden="true">
                <circle
                  ref={ensoCircleRef}
                  cx="50"
                  cy="50"
                  r="38"
                  stroke="var(--color-accent)"
                  strokeWidth="2.2"
                  fill="transparent"
                  strokeDasharray="238.76"
                  strokeDashoffset="238.76"
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="flex flex-col items-center gap-3 select-none text-center">
                <span 
                  ref={nameRef}
                  className="text-ink text-[1.4rem] font-medium tracking-[0.4em] pl-[0.4em] opacity-0"
                >
                  合利而動
                </span>
                <span 
                  ref={subtitleRef}
                  className="text-[0.82rem] text-muted font-medium tracking-[0.05em] opacity-0"
                >
                  &quot;Movimente-se com propósito.&quot;
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </TransitionContext.Provider>
  );
}
