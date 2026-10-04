'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';
import { prepareProjectReturnTransition } from '../../projects/projectReturnNavigation';
import styles from './ProjectPageTransition.module.css';

gsap.registerPlugin(useGSAP);

type Transition = {
  overlay: HTMLDivElement;
  outgoing: HTMLDivElement;
  timeline: gsap.core.Timeline;
  from: string;
  direction: number;
  timeout: number;
};

// Animate viewport copies so transforms never disturb the live ScrollTrigger pins.
function snapshot(page: HTMLElement) {
  const panel = document.createElement('div');
  panel.className = styles.panel;
  panel.inert = true;
  panel.setAttribute('aria-hidden', 'true');
  const bounds = page.getBoundingClientRect();
  // Only copy branches that can appear in this viewport. Preserve off-screen
  // boxes so the visible content keeps its position without duplicating the site.
  const branches = Array.from(page.childNodes).map((node) => ({
    node,
    rect: node instanceof HTMLElement ? node.getBoundingClientRect() : null
  }));
  const copy = page.cloneNode(false) as HTMLElement;
  branches.forEach(({ node, rect }) => {
    if (
      node instanceof HTMLElement &&
      rect &&
      (rect.bottom < -80 || rect.top > window.innerHeight + 80)
    ) {
      const spacer = node.cloneNode(false) as HTMLElement;
      spacer.style.height = `${rect.height}px`;
      spacer.style.minHeight = `${rect.height}px`;
      copy.append(spacer);
    } else {
      copy.append(node.cloneNode(true));
    }
  });
  copy.removeAttribute('data-project-return-pending');
  copy.style.setProperty('visibility', 'visible', 'important');
  copy.style.width = `${bounds.width}px`;
  copy.style.transform = `translateY(${bounds.top}px)`;
  copy.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
  const canvases = branches.flatMap(({ node, rect }) =>
    node instanceof HTMLElement &&
    (!rect || (rect.bottom >= -80 && rect.top <= window.innerHeight + 80))
      ? Array.from(node.querySelectorAll('canvas'))
      : []
  );
  copy.querySelectorAll('canvas').forEach((canvas, index) => {
    const source = canvases[index];
    if (source) canvas.getContext('2d')?.drawImage(source, 0, 0);
  });
  panel.append(copy);
  return panel;
}

export default function ProjectPageTransition() {
  const pathname = usePathname();
  const host = useRef<HTMLDivElement>(null);
  const active = useRef<Transition | null>(null);

  useGSAP(
    (_context, contextSafe) => {
      const finish = () => {
        const transition = active.current;
        if (!transition) return;
        active.current = null;
        window.clearTimeout(transition.timeout);
        transition.timeline.kill();
        transition.overlay.remove();
      };

      const begin = contextSafe!((destination: string) => {
        const from = window.location.pathname;
        const isDetail = (path: string) => path.startsWith('/projetos/');
        if (from === destination || (!isDetail(from) && !isDetail(destination))) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const page = document.querySelector<HTMLElement>('main');
        if (!page || !host.current) return;
        finish();
        const direction = isDetail(destination) ? 1 : -1;
        const overlay = document.createElement('div');
        overlay.className = styles.overlay;
        const outgoing = snapshot(page);
        overlay.append(outgoing);
        host.current.append(overlay);
        const timeline = gsap.timeline();
        timeline.to(outgoing, {
          scale: 0.94,
          rotation: -1 * direction,
          xPercent: -3 * direction,
          opacity: 0.8,
          duration: 0.42,
          ease: 'power2.out'
        });
        active.current = {
          overlay,
          outgoing,
          timeline,
          from,
          direction,
          // A cancelled or failed navigation must never leave an inert curtain.
          timeout: window.setTimeout(finish, 8000)
        };
      });

      const click = (event: MouseEvent) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const link = (event.target as Element).closest<HTMLAnchorElement>('a[href]');
        if (!link || link.download || (link.target && link.target !== '_self')) return;
        const url = new URL(link.href, window.location.href);
        if (url.origin === window.location.origin) begin(url.pathname);
      };
      // Capture before Next's handler replaces the outgoing route.
      const popstate = contextSafe!(() => {
        const page = document.querySelector<HTMLElement>('main');
        if (!page) return;
        // popstate already exposes the destination URL; the mounted main is still outgoing.
        const destination = window.location.pathname;
        const from = page.hasAttribute('data-portfolio-home') ? '/' : '/projetos/current';
        if (from === '/' && destination === '/') return;
        if (from !== '/' && destination === '/') prepareProjectReturnTransition();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        finish();
        const overlay = document.createElement('div');
        overlay.className = styles.overlay;
        const outgoing = snapshot(page);
        overlay.append(outgoing);
        host.current?.append(overlay);
        const direction = destination.startsWith('/projetos/') ? 1 : -1;
        const timeline = gsap.timeline().to(outgoing, {
          scale: 0.94,
          rotation: -1 * direction,
          xPercent: -3 * direction,
          opacity: 0.8,
          duration: 0.42,
          ease: 'power2.out'
        });
        active.current = {
          overlay,
          outgoing,
          timeline,
          from,
          direction,
          timeout: window.setTimeout(finish, 8000)
        };
      });
      document.addEventListener('click', click, true);
      window.addEventListener('popstate', popstate);
      return () => {
        document.removeEventListener('click', click, true);
        window.removeEventListener('popstate', popstate);
        finish();
      };
    },
    { scope: host }
  );

  useGSAP(
    () => {
      const transition = active.current;
      if (!transition || pathname === transition.from) return;
      let frame = 0;
      const reveal = () => {
        if (active.current !== transition) return;
        const page = document.querySelector<HTMLElement>('main');
        // Wait for home to finish restoring Projects, including Next's hash scroll.
        if (!page || getComputedStyle(page).visibility === 'hidden') {
          frame = requestAnimationFrame(reveal);
          return;
        }
        const incoming = snapshot(page);
        incoming.querySelectorAll<HTMLElement>('h1, h1 *, h2, h2 *').forEach((element) => {
          element.style.opacity = '1';
          element.style.visibility = 'visible';
          element.style.transform = 'none';
        });
        transition.overlay.append(incoming);
        transition.timeline.fromTo(
          incoming,
          { xPercent: 100 * transition.direction },
          { xPercent: 0, duration: 0.42, ease: 'power3.out' },
          transition.timeline.time()
        );
        transition.timeline.eventCallback('onComplete', () => {
          window.clearTimeout(transition.timeout);
          transition.overlay.remove();
          active.current = null;
        });
        transition.timeline.play();
      };
      frame = requestAnimationFrame(reveal);
      return () => cancelAnimationFrame(frame);
    },
    { dependencies: [pathname], scope: host }
  );

  return <div ref={host} aria-hidden="true" />;
}
