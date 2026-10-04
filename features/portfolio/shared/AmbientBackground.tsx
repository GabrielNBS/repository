'use client';

import { useRef, type RefObject, type CSSProperties } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AmbientBackground.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const homeFields = [
  { selector: '#inicio', x: 4, height: 0.35, color: 'lilac', drift: -70 },
  { selector: '#inicio', x: 94, height: 0.8, color: 'peach', drift: 95 },
  { selector: '#manifesto', x: 86, height: 0.18, color: 'cream', drift: -100 },
  { selector: '#projetos', x: 96, height: 0.22, color: 'lilac', drift: -110 },
  { selector: '#projetos', x: 8, height: 0.78, color: 'peach', drift: 75 },
  { selector: '#sobre', x: 2, height: 0.7, color: 'lilac', drift: -85 },
  { selector: '#sobre', x: 90, height: 0.2, color: 'cream', drift: 100 },
  { selector: '#skills', x: 90, height: 0.25, color: 'peach', drift: -90 },
  { selector: '#skills', x: 16, height: 0.75, color: 'lilac', drift: 65 },
  { selector: '#contato', x: 100, height: 0.28, color: 'lilac', drift: -80 },
  { selector: '#contato', x: 12, height: 0.85, color: 'peach', drift: 90 }
] as const;

const detailFields = [
  { selector: '[data-detail-hero]', x: 4, height: 0.25, color: 'lilac', drift: -70 },
  { selector: '[data-detail-hero]', x: 96, height: 0.8, color: 'peach', drift: 90 },
  { selector: '[data-detail-narrative]', x: 8, height: 0.6, color: 'cream', drift: -85 },
  { selector: '[data-detail-narrative]', x: 92, height: 0.3, color: 'lilac', drift: 100 }
] as const;

export default function AmbientBackground({
  page,
  detail = false
}: {
  page: RefObject<HTMLElement | null>;
  detail?: boolean;
}) {
  const layer = useRef<HTMLDivElement>(null);
  const fields = detail ? detailFields : homeFields;

  useGSAP(() => {
    if (!page.current || !layer.current) return;
    const canvas = page.current;
    const spots = Array.from(layer.current.children) as HTMLElement[];
    const sections = fields.map((field) => canvas.querySelector<HTMLElement>(field.selector));
    const positionFields = () => {
      const canvasTop = canvas.getBoundingClientRect().top;
      const positions = fields.map((field, index) => {
        const section = sections[index];
        return section
          ? section.getBoundingClientRect().top - canvasTop + section.offsetHeight * field.height
          : null;
      });
      positions.forEach((top, index) => {
        if (top === null) return;
        spots[index].style.top = `${top}px`;
        spots[index].style.visibility = 'visible';
      });
    };

    positionFields();
    ScrollTrigger.addEventListener('refresh', positionFields);
    const media = gsap.matchMedia();
    media.add({
      mobile: '(max-width: 800px)',
      reduced: '(prefers-reduced-motion: reduce)',
      desktop: '(min-width: 801px)'
    }, (context) => {
      if (context.conditions?.reduced) return;
      const animateField = (index: number) => {
        const field = fields[index];
        const section = sections[index];
        if (!section) return;
        const drift = field.drift * (context.conditions?.mobile ? 0.4 : 1);
        gsap.fromTo(spots[index], { y: -drift }, {
          y: drift,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'clamp(top bottom)',
            end: 'clamp(bottom top)',
            scrub: 1.2,
            invalidateOnRefresh: true
          }
        });
      };
      if (context.conditions?.mobile) {
        const initialized = new Set<number>();
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            fields.forEach((_, index) => {
              if (sections[index] !== entry.target || initialized.has(index)) return;
              initialized.add(index);
              context.add(() => animateField(index));
            });
            observer.unobserve(entry.target);
          });
        }, { rootMargin: '240px 0px' });
        new Set(sections).forEach((section) => { if (section) observer.observe(section); });
        return () => observer.disconnect();
      }
      fields.forEach((_, index) => animateField(index));
    });

    return () => {
      ScrollTrigger.removeEventListener('refresh', positionFields);
      media.revert();
    };
  }, { scope: layer, dependencies: [detail], revertOnUpdate: true });

  return (
    <div ref={layer} className={styles.layer} aria-hidden="true">
      {fields.map((field, index) => (
        <div
          key={`${field.selector}-${index}`}
          className={`${styles.spot} ${styles[field.color]}`}
          style={{ '--spot-x': `${field.x}%` } as CSSProperties}
        />
      ))}
    </div>
  );
}
