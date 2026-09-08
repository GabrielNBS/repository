/* Isolated Regula detail fragments. Nothing here is imported by the app. */
(() => {
  gsap.registerPlugin(ScrollTrigger);

  const root = document.querySelector('[data-preview]');
  const story = root.querySelector('[data-section="story"]');
  const panels = [...root.querySelectorAll('[data-panel]')];
  const scenes = [...root.querySelectorAll('[data-gallery-scene]')];
  const theme = root.dataset.theme;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setPanelContent = (panel, visible = false) => {
    gsap.set(panel.querySelector('[data-panel-number]'), { autoAlpha: visible ? 0.14 : 0, scale: visible ? 1 : 0.84 });
    gsap.set(panel.querySelector('[data-panel-intro]'), { autoAlpha: visible ? 0.68 : 0, x: visible ? 0 : 24, y: visible ? 0 : 12 });
    gsap.set(panel.querySelector('[data-panel-title]'), { autoAlpha: visible ? 1 : 0, y: visible ? 0 : 42 });
    gsap.set(panel.querySelector('[data-panel-body]'), { autoAlpha: visible ? 1 : 0, x: visible ? 0 : -24, y: visible ? 0 : 16 });
    gsap.set(panel.querySelectorAll('[data-panel-highlights] li'), { autoAlpha: visible ? 1 : 0, y: visible ? 0 : 12 });
  };

  const resetStory = () => {
    gsap.set(panels, { autoAlpha: 0, clearProps: 'transform,clipPath,filter,zIndex' });
    panels.forEach((panel) => setPanelContent(panel));
    gsap.set('[data-story-progress]', { scaleX: 0, clearProps: 'transform' });
    gsap.set('[data-route-dot], [data-scanline]', { autoAlpha: 0, clearProps: 'transform' });
  };

  const storyTimeline = (options = {}) => gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: story,
      start: 'top top',
      end: `+=${options.end ?? 4300}`,
      pin: true,
      scrub: options.scrub ?? 0.9,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  const reveal = (tl, panel, label, offset = 0) => {
    tl.to(panel.querySelector('[data-panel-number]'), { autoAlpha: 0.14, scale: 1, duration: 0.28 }, `${label}+=${offset}`)
      .to(panel.querySelector('[data-panel-intro]'), { autoAlpha: 0.68, x: 0, y: 0, duration: 0.22 }, `${label}+=${offset + 0.04}`)
      .to(panel.querySelector('[data-panel-title]'), { autoAlpha: 1, y: 0, duration: 0.42 }, `${label}+=${offset + 0.12}`)
      .to(panel.querySelector('[data-panel-body]'), { autoAlpha: 1, x: 0, y: 0, duration: 0.34 }, `${label}+=${offset + 0.25}`)
      .to(panel.querySelectorAll('[data-panel-highlights] li'), { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.05 }, `${label}+=${offset + 0.38}`);
  };

  function editorial() {
    resetStory();
    gsap.set(panels, { autoAlpha: 0, scale: 0.975, yPercent: 7 });
    gsap.set(panels[0], { autoAlpha: 1, scale: 1, yPercent: 0, zIndex: 1 });
    const tl = storyTimeline({ end: 4500, scrub: 0.95 });
    tl.addLabel('one', 0); reveal(tl, panels[0], 'one', 0.03); tl.to('[data-story-progress]', { scaleX: .32, duration: 1.55 }, 'one').to({}, { duration: .95 }, 'one+=1.35');
    tl.addLabel('two', 'one+=2.3').to(panels[0], { autoAlpha: 0, scale: .97, yPercent: -5, duration: .42 }, 'two').set(panels[1], { zIndex: 2 }, 'two').to(panels[1], { autoAlpha: 1, scale: 1, yPercent: 0, duration: .56 }, 'two+=.08');
    reveal(tl, panels[1], 'two', .18); tl.to('[data-story-progress]', { scaleX: .66, duration: 1.55 }, 'two').to({}, { duration: .9 }, 'two+=1.45');
    tl.addLabel('three', 'two+=2.35').to(panels[1], { autoAlpha: 0, scale: .97, yPercent: -5, duration: .42 }, 'three').set(panels[2], { zIndex: 3 }, 'three').to(panels[2], { autoAlpha: 1, scale: 1, yPercent: 0, duration: .56 }, 'three+=.08');
    reveal(tl, panels[2], 'three', .18); return tl.to('[data-story-progress]', { scaleX: 1, duration: 1.55 }, 'three').to({}, { duration: 1.1 }, 'three+=1.45');
  }

  function route() {
    resetStory();
    const path = story.querySelector('[data-route-orbit] path'); const dot = story.querySelector('[data-route-dot]');
    gsap.set(panels, { autoAlpha: 0, clipPath: 'inset(0 100% 0 0)' }); gsap.set(panels[0], { autoAlpha: 1, clipPath: 'inset(0 0 0 0)' }); gsap.set(path, { strokeDasharray: 1800, strokeDashoffset: 1800 }); gsap.set(dot, { autoAlpha: 1, x: 80, y: 140 });
    const tl = storyTimeline({ end: 4200, scrub: .75 }).to(path, { strokeDashoffset: 0, duration: 4.2 }, 0).to(dot, { x: () => innerWidth * .62, y: () => innerHeight * .34, duration: 4.2 }, 0);
    panels.forEach((panel, index) => { const label = `route-${index}`; tl.addLabel(label, index * 1.35); if (index) tl.to(panels[index - 1], { autoAlpha: 0, clipPath: 'inset(0 0 0 100%)', duration: .34 }, label).to(panel, { autoAlpha: 1, clipPath: 'inset(0 0 0 0)', duration: .5 }, `${label}+=.06`); reveal(tl, panel, label, index ? .18 : .08); });
    return tl.to('[data-story-progress]', { scaleX: 1, duration: .8 }, 3.85);
  }

  function stack() {
    resetStory();
    gsap.set(panels, { autoAlpha: 1, yPercent: 80, rotate: 4, scale: .82, transformOrigin: '50% 100%' }); gsap.set(panels[0], { yPercent: 0, rotate: -1.5, scale: 1, zIndex: 3 }); gsap.set(panels[1], { yPercent: 12, rotate: 2.5, scale: .93, zIndex: 2 }); gsap.set(panels[2], { yPercent: 24, rotate: -3, scale: .86, zIndex: 1 });
    const tl = storyTimeline({ end: 4700, scrub: 1.1 }); reveal(tl, panels[0], 'start', .08); tl.to(panels[0], { yPercent: -4, rotate: 0, scale: .96, duration: 1.25 }, '+=1.3').to(panels[1], { yPercent: 0, rotate: -1, scale: 1, zIndex: 4, duration: 1.2 }, '<.15'); reveal(tl, panels[1], '>', .14); tl.to(panels[0], { yPercent: -92, rotate: -7, scale: .84, autoAlpha: .18, duration: .95 }, '+=1.1').to(panels[1], { yPercent: -4, rotate: 1, scale: .96, duration: 1.1 }, '<.14').to(panels[2], { yPercent: 0, rotate: 2, scale: 1, zIndex: 5, duration: 1.25 }, '<.22'); reveal(tl, panels[2], '>', .16); return tl.to('[data-story-progress]', { scaleX: 1, duration: .8 }, '+=.2');
  }

  function scan() {
    resetStory();
    const line = story.querySelector('[data-scanline]'); gsap.set(panels, { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', y: 30 }); gsap.set(panels[0], { autoAlpha: 1, clipPath: 'inset(0 0 0 0)', y: 0 }); gsap.set(line, { autoAlpha: 1 });
    const tl = storyTimeline({ end: 3900, scrub: .55 }).to(line, { x: () => innerWidth * .62, duration: 4.6 }, 0);
    panels.forEach((panel, index) => { const label = `scan-${index}`; tl.addLabel(label, index * 1.35); if (index) tl.to(panels[index - 1], { autoAlpha: 0, clipPath: 'inset(0 0 100% 0)', y: -30, duration: .28 }, label).to(panel, { autoAlpha: 1, clipPath: 'inset(0 0 0 0)', y: 0, duration: .42 }, `${label}+=.06`); reveal(tl, panel, label, .12); });
    return tl.to('[data-story-progress]', { scaleX: 1, duration: .45 }, 3.75);
  }

  function lens() {
    resetStory();
    gsap.set(panels, { autoAlpha: 0, scale: 1.18, filter: 'blur(18px)', clipPath: 'inset(13% 13% 13% 13% round 2rem)' }); gsap.set(panels[0], { autoAlpha: 1, scale: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0% round 0rem)', zIndex: 3 });
    const tl = storyTimeline({ end: 4800, scrub: 1.2 }); reveal(tl, panels[0], 'lens-one', .12); tl.to({}, { duration: 1.1 }, 'lens-one+=1.4');
    [1, 2].forEach((index) => { const label = `lens-${index + 1}`; const previous = panels[index - 1]; const panel = panels[index]; tl.addLabel(label, '>').to(previous, { autoAlpha: .18, scale: .86, filter: 'blur(16px)', clipPath: 'inset(11% 11% 11% 11% round 2rem)', duration: .65 }, label).set(panel, { zIndex: index + 3 }, `${label}+=.04`).to(panel, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0% round 0rem)', duration: .75 }, `${label}+=.1`); reveal(tl, panel, label, .24); tl.to({}, { duration: .85 }, `${label}+=1.5`); });
    return tl.to('[data-story-progress]', { scaleX: 1, duration: .7 }, '+=.1');
  }

  const factories = { editorial, route, stack, scan, lens };

  function createPageSupport() {
    const hero = root.querySelector('[data-section="hero"]'); const system = root.querySelector('[data-section="system"]'); const final = root.querySelector('[data-section="final"]');
    if (reducedMotion) { gsap.set('[data-hero-copy], [data-hero-media], [data-tech-cloud] span, [data-final-content]', { autoAlpha: 1, clearProps: 'all' }); return; }
    gsap.fromTo('[data-hero-copy]', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .7, stagger: .08, ease: 'power3.out' });
    gsap.fromTo('[data-hero-media]', { autoAlpha: 0, y: 70, rotate: 6, scale: .88, clipPath: 'inset(15% 18% 14% 18% round 2rem)' }, { autoAlpha: 1, y: 0, rotate: 0, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 2rem)', duration: 1.1, delay: .3, ease: 'power3.out' });
    gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 } }).to('[data-hero-title]', { yPercent: -14 }, 0).to('[data-hero-frame]', { yPercent: 12, rotate: -3, scale: .95 }, 0).to('[data-hero-glow]', { rotate: 18, scale: 1.18, xPercent: -8 }, 0);
    gsap.timeline({ scrollTrigger: { trigger: system, start: 'top 70%', end: 'top 30%', scrub: .6 } }).fromTo('[data-tech-cloud] span', { autoAlpha: 0, y: 50, rotateX: -60, scale: .76 }, { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: .8, stagger: { amount: .5, from: 'random' }, ease: 'back.out(1.3)' });
    gsap.timeline({ scrollTrigger: { trigger: final, start: 'top 75%', end: 'top 40%', scrub: .6 } }).fromTo('[data-final-content]', { autoAlpha: 0, y: 70, scale: .88 }, { autoAlpha: 1, y: 0, scale: 1, duration: .8, ease: 'power3.out' });
  }

  if (reducedMotion) { panels.forEach((panel) => { gsap.set(panel, { autoAlpha: 1, clearProps: 'all' }); setPanelContent(panel, true); }); }
  else { factories[theme](); }
  scenes.forEach((scene) => { const desktop = scene.querySelector('[data-desktop-frame]'); const mobile = scene.querySelector('[data-mobile-frame]'); const meta = scene.querySelector('.gallery-meta'); const progress = scene.querySelector('[data-scene-progress]'); if (reducedMotion) { gsap.set([desktop, mobile, meta], { autoAlpha: 1, clearProps: 'all' }); gsap.set(progress, { scaleX: 1 }); return; } gsap.timeline({ scrollTrigger: { trigger: scene, start: 'top 85%', end: 'top 25%', scrub: .6 } }).fromTo(meta, { autoAlpha: 0, x: -26 }, { autoAlpha: 1, x: 0, duration: .36 }, 0).fromTo(desktop, { clipPath: 'inset(14% 16% 16% 16% round 1.4rem)', scale: .9, y: 70 }, { clipPath: 'inset(0% 0% 0% 0% round 1.4rem)', scale: 1, y: 0, duration: .7 }, .04).fromTo(mobile, { autoAlpha: 0, scale: .72, y: 140 }, { autoAlpha: 1, scale: 1, y: 0, duration: .52 }, .18).to(progress, { scaleX: 1, duration: .5 }, .35); });
  createPageSupport();
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
})();
