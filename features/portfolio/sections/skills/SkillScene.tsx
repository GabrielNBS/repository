'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import * as Zdog from 'zdog';

gsap.registerPlugin(useGSAP);

export type SkillSceneVariant =
  'react-next' | 'typescript' | 'performance' | 'design-system' | 'accessibility' | 'ai-frontend';

interface SkillSceneProps {
  variant: SkillSceneVariant;
}

interface SceneResult {
  floaters: Zdog.Anchor[];
  root: Zdog.Anchor;
}

const COLORS = {
  ink: 'var(--color-ink)',
  paper: 'var(--color-paper)',
  peach: 'var(--color-peach)',
  lilac: 'var(--color-lilac)',
  cream: 'var(--color-cream)',
  rose: 'var(--color-rose)'
} as const;

function addPlatform(root: Zdog.Anchor) {
  new Zdog.Box({
    addTo: root,
    width: 220,
    height: 12,
    depth: 140,
    translate: { y: 52 },
    color: COLORS.ink,
    stroke: 2,
    frontFace: COLORS.rose,
    rearFace: COLORS.rose,
    leftFace: COLORS.cream,
    rightFace: COLORS.lilac,
    topFace: COLORS.peach,
    bottomFace: COLORS.ink
  });

  new Zdog.RoundedRect({
    addTo: root,
    width: 220,
    height: 140,
    cornerRadius: 12,
    translate: { y: 45 },
    rotate: { x: Zdog.TAU / 4 },
    color: COLORS.ink,
    stroke: 2,
    fill: false
  });
}

function addPanel(
  addTo: Zdog.Anchor,
  {
    width,
    height,
    color,
    translate,
    rotate
  }: {
    width: number;
    height: number;
    color: string;
    translate: Zdog.VectorOptions;
    rotate?: Zdog.VectorOptions;
  }
) {
  const panel = new Zdog.Anchor({ addTo, translate, rotate });

  new Zdog.RoundedRect({
    addTo: panel,
    width,
    height,
    cornerRadius: 7,
    color: COLORS.ink,
    stroke: 8,
    fill: true
  });

  new Zdog.RoundedRect({
    addTo: panel,
    width: width - 5,
    height: height - 5,
    cornerRadius: 5,
    translate: { z: 1 },
    color,
    stroke: 3,
    fill: true
  });

  new Zdog.Shape({
    addTo: panel,
    path: [
      { x: -width * 0.28, y: -height * 0.24, z: 2 },
      { x: width * 0.28, y: -height * 0.24, z: 2 }
    ],
    color: COLORS.ink,
    stroke: 3
  });

  return panel;
}

function addTile(
  addTo: Zdog.Anchor,
  translate: Zdog.VectorOptions,
  color: string,
  width = 45,
  height = 34
) {
  const tile = new Zdog.Anchor({ addTo, translate, rotate: { x: Zdog.TAU / 4 } });

  new Zdog.RoundedRect({
    addTo: tile,
    width,
    height,
    cornerRadius: 5,
    color: COLORS.ink,
    stroke: 7,
    fill: true
  });

  new Zdog.RoundedRect({
    addTo: tile,
    width: width - 4,
    height: height - 4,
    cornerRadius: 4,
    translate: { z: 1 },
    color,
    stroke: 2,
    fill: true
  });

  return tile;
}

function addNode(addTo: Zdog.Anchor, translate: Zdog.VectorOptions, color: string, size = 10) {
  const node = new Zdog.Shape({
    addTo,
    translate,
    color: COLORS.ink,
    stroke: size + 5
  });

  new Zdog.Shape({
    addTo: node,
    translate: { z: 1 },
    color,
    stroke: size
  });

  return node;
}

function buildReactScene(root: Zdog.Anchor) {
  const first = addPanel(root, {
    width: 64,
    height: 54,
    color: COLORS.paper,
    translate: { x: -62, y: 2, z: 18 },
    rotate: { y: -0.08 }
  });
  const second = addPanel(root, {
    width: 72,
    height: 62,
    color: COLORS.lilac,
    translate: { x: 0, y: -24, z: -4 }
  });
  const third = addPanel(root, {
    width: 58,
    height: 48,
    color: COLORS.rose,
    translate: { x: 64, y: -2, z: 12 },
    rotate: { y: 0.08 }
  });

  new Zdog.Shape({
    addTo: root,
    path: [
      { x: -70, y: 29, z: 19 },
      { x: -28, y: 15, z: 2 },
      { x: 16, y: 17, z: -1 },
      { x: 71, y: 22, z: 13 }
    ],
    color: COLORS.ink,
    stroke: 5,
    closed: false
  });

  addNode(root, { x: -28, y: 15, z: 3 }, COLORS.peach, 8);
  addNode(root, { x: 16, y: 17, z: 0 }, COLORS.paper, 8);

  return [first, second, third];
}

function buildTypeScriptScene(root: Zdog.Anchor) {
  const modules = [
    new Zdog.Box({
      addTo: root,
      width: 48,
      height: 48,
      depth: 48,
      translate: { x: -57, y: 14, z: 15 },
      color: COLORS.ink,
      stroke: 2,
      frontFace: COLORS.cream,
      rearFace: COLORS.cream,
      leftFace: COLORS.rose,
      rightFace: COLORS.lilac,
      topFace: COLORS.paper,
      bottomFace: COLORS.ink
    }),
    new Zdog.Box({
      addTo: root,
      width: 52,
      height: 52,
      depth: 52,
      translate: { x: 0, y: -18, z: -13 },
      color: COLORS.ink,
      stroke: 2,
      frontFace: COLORS.lilac,
      rearFace: COLORS.lilac,
      leftFace: COLORS.cream,
      rightFace: COLORS.rose,
      topFace: COLORS.paper,
      bottomFace: COLORS.ink
    }),
    new Zdog.Box({
      addTo: root,
      width: 42,
      height: 42,
      depth: 42,
      translate: { x: 60, y: 15, z: 13 },
      color: COLORS.ink,
      stroke: 2,
      frontFace: COLORS.rose,
      rearFace: COLORS.rose,
      leftFace: COLORS.lilac,
      rightFace: COLORS.cream,
      topFace: COLORS.paper,
      bottomFace: COLORS.ink
    })
  ];

  new Zdog.Shape({
    addTo: root,
    path: [
      { x: -57, y: 14, z: 15 },
      { x: 0, y: -18, z: -13 },
      { x: 60, y: 15, z: 13 }
    ],
    color: COLORS.ink,
    stroke: 5,
    closed: false
  });

  return modules;
}

function buildPerformanceScene(root: Zdog.Anchor) {
  const route = [
    { x: -94, y: 42, z: 28 },
    { x: -31, y: 40, z: -31 },
    { x: 36, y: 39, z: -4 },
    { x: 94, y: 38, z: 31 }
  ];

  new Zdog.Shape({
    addTo: root,
    path: route,
    color: COLORS.ink,
    stroke: 15,
    closed: false
  });
  new Zdog.Shape({
    addTo: root,
    path: route.map((point) => ({ ...point, y: point.y - 1 })),
    color: COLORS.paper,
    stroke: 6,
    closed: false
  });

  const parcel = new Zdog.Box({
    addTo: root,
    width: 34,
    height: 26,
    depth: 30,
    translate: { x: 23, y: 15, z: -9 },
    rotate: { y: 0.18 },
    color: COLORS.ink,
    stroke: 2,
    frontFace: COLORS.rose,
    rearFace: COLORS.rose,
    leftFace: COLORS.lilac,
    rightFace: COLORS.cream,
    topFace: COLORS.peach,
    bottomFace: COLORS.ink
  });

  [-74, -48, 62].forEach((x, index) => {
    new Zdog.Shape({
      addTo: root,
      path: [
        { x, y: 4 + index * 6, z: -17 + index * 14 },
        { x: x + 28, y: 4 + index * 6, z: -17 + index * 14 }
      ],
      color: COLORS.ink,
      stroke: 3,
      closed: false
    });
  });

  return [parcel];
}

function buildDesignSystemScene(root: Zdog.Anchor) {
  [-62, -21, 20, 61].forEach((x) => {
    new Zdog.Shape({
      addTo: root,
      path: [
        { x, y: 44, z: -58 },
        { x, y: 44, z: 58 }
      ],
      color: COLORS.ink,
      stroke: 1,
      closed: false
    });
  });
  [-42, 0, 42].forEach((z) => {
    new Zdog.Shape({
      addTo: root,
      path: [
        { x: -96, y: 44, z },
        { x: 96, y: 44, z }
      ],
      color: COLORS.ink,
      stroke: 1,
      closed: false
    });
  });

  const first = addTile(root, { x: -55, y: 34, z: -25 }, COLORS.paper, 48, 34);
  const second = addTile(root, { x: 6, y: 18, z: -13 }, COLORS.lilac, 54, 38);
  const third = addTile(root, { x: 61, y: 29, z: 31 }, COLORS.rose, 42, 42);
  const token = addNode(root, { x: -6, y: 18, z: 42 }, COLORS.cream, 14);

  return [first, second, third, token];
}

function buildAccessibilityScene(root: Zdog.Anchor) {
  const first = addTile(root, { x: -53, y: 31, z: -18 }, COLORS.paper, 62, 39);
  const second = addTile(root, { x: 49, y: 22, z: 8 }, COLORS.lilac, 56, 36);

  new Zdog.Shape({
    addTo: root,
    path: [
      { x: -63, y: 19, z: -18 },
      {
        bezier: [
          { x: -19, y: -18, z: -38 },
          { x: 18, y: 12, z: 29 },
          { x: 49, y: 10, z: 8 }
        ]
      }
    ],
    color: COLORS.ink,
    stroke: 5,
    closed: false
  });

  const focusA = new Zdog.Ellipse({
    addTo: root,
    diameter: 42,
    translate: { x: -63, y: 15, z: -18 },
    rotate: { x: Zdog.TAU / 4 },
    color: COLORS.ink,
    stroke: 4
  });
  const focusB = new Zdog.Ellipse({
    addTo: root,
    diameter: 39,
    translate: { x: 49, y: 7, z: 8 },
    rotate: { x: Zdog.TAU / 4 },
    color: COLORS.ink,
    stroke: 4
  });

  addNode(root, { x: -63, y: 10, z: -18 }, COLORS.peach, 9);
  addNode(root, { x: 49, y: 2, z: 8 }, COLORS.rose, 9);

  return [first, second, focusA, focusB];
}

function buildAiScene(root: Zdog.Anchor) {
  const terminal = addPanel(root, {
    width: 72,
    height: 58,
    color: COLORS.paper,
    translate: { x: -55, y: -1, z: 11 },
    rotate: { y: -0.15 }
  });

  const points = [
    { x: 8, y: -24, z: -12, color: COLORS.lilac, size: 15 },
    { x: 58, y: -34, z: 2, color: COLORS.rose, size: 12 },
    { x: 76, y: 7, z: 26, color: COLORS.cream, size: 14 },
    { x: 35, y: 25, z: -5, color: COLORS.paper, size: 13 },
    { x: 12, y: 8, z: 30, color: COLORS.peach, size: 11 }
  ];

  const networkNodes = points.map((point) =>
    addNode(root, { x: point.x, y: point.y, z: point.z }, point.color, point.size)
  );

  const center = points[0];
  points.slice(1).forEach((point) => {
    new Zdog.Shape({
      addTo: root,
      path: [
        { x: center.x, y: center.y, z: center.z },
        { x: point.x, y: point.y, z: point.z }
      ],
      color: COLORS.ink,
      stroke: 3,
      closed: false
    });
  });

  new Zdog.Shape({
    addTo: root,
    path: [
      { x: -20, y: 0, z: 12 },
      { x: 8, y: -24, z: -12 }
    ],
    color: COLORS.ink,
    stroke: 4,
    closed: false
  });

  return [terminal, ...networkNodes];
}

const builders: Record<SkillSceneVariant, (root: Zdog.Anchor) => Zdog.Anchor[]> = {
  'react-next': buildReactScene,
  typescript: buildTypeScriptScene,
  performance: buildPerformanceScene,
  'design-system': buildDesignSystemScene,
  accessibility: buildAccessibilityScene,
  'ai-frontend': buildAiScene
};

function createScene(illustration: Zdog.Illustration, variant: SkillSceneVariant): SceneResult {
  const root = new Zdog.Anchor({
    addTo: illustration,
    translate: { y: 2 },
    rotate: { x: -0.34, y: 0.62, z: -0.04 }
  });

  addPlatform(root);
  return { root, floaters: builders[variant](root) };
}

export default function SkillScene({ variant }: SkillSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      svg.replaceChildren();
      const illustration = new Zdog.Illustration({
        element: svg,
        centered: true,
        zoom: 1.12
      });
      illustration.setSize(390, 280);

      const { root, floaters } = createScene(illustration, variant);
      const render = () => illustration.updateRenderGraph();
      render();

      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const timeline = gsap.timeline({
          defaults: { ease: 'sine.inOut' },
          repeat: -1,
          yoyo: true,
          onUpdate: render
        });

        timeline.to(
          root.rotate,
          { y: root.rotate.y + 0.09, z: root.rotate.z + 0.018, duration: 5.2 },
          0
        );
        floaters.forEach((floater, index) => {
          timeline.to(
            floater.translate,
            {
              y: floater.translate.y - 4 - (index % 3) * 1.5,
              duration: 3.7 + index * 0.22
            },
            index * 0.08
          );
        });

        gsap.fromTo(
          svg,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );

        return () => timeline.kill();
      });

      return () => {
        media.revert();
        svg.replaceChildren();
      };
    },
    { scope: rootRef, dependencies: [variant], revertOnUpdate: true }
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute top-[2%] right-[18%] z-0 h-[72%] w-[68%] max-[560px]:top-[4%] max-[560px]:right-[16%] max-[560px]:w-[66%]"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        className="block size-full overflow-visible"
        width="390"
        height="280"
        focusable="false"
      />
    </div>
  );
}
