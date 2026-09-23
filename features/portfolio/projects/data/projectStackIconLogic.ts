import type { IconType } from 'react-icons';
import { FiCode, FiLayers } from 'react-icons/fi';
import {
  SiBootstrap,
  SiCss,
  SiFormik,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiPrisma,
  SiPuppeteer,
  SiRadixui,
  SiReact,
  SiReacthookform,
  SiRedux,
  SiSass,
  SiSqlite,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
  SiWhatsapp,
  SiZod
} from 'react-icons/si';

export type StackIcon = { Icon: IconType; color: string };

const stackIcons: Record<string, StackIcon> = {
  'Next.js': { Icon: SiNextdotjs, color: 'var(--color-ink)' },
  TypeScript: { Icon: SiTypescript, color: '#3178c6' },
  Tailwind: { Icon: SiTailwindcss, color: '#38bdf8' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: 'var(--color-ink)' },
  Prisma: { Icon: SiPrisma, color: 'var(--color-ink)' },
  SQLite: { Icon: SiSqlite, color: 'var(--color-ink)' },
  Puppeteer: { Icon: SiPuppeteer, color: 'var(--color-ink)' },
  'whatsapp-web.js': { Icon: SiWhatsapp, color: 'var(--color-ink)' },
  Zustand: { Icon: FiLayers, color: 'var(--color-ink)' },
  Vitest: { Icon: SiVitest, color: 'var(--color-ink)' },
  'Radix UI': { Icon: SiRadixui, color: 'var(--color-ink)' },
  Zod: { Icon: SiZod, color: '#3156a5' },
  'React Hook Form': { Icon: SiReacthookform, color: '#ec5990' },
  Context: { Icon: SiReact, color: '#2f9cc4' },
  React: { Icon: SiReact, color: '#2f9cc4' },
  'Styled-Components': { Icon: SiStyledcomponents, color: '#db7093' },
  Redux: { Icon: SiRedux, color: '#764abc' },
  Formik: { Icon: SiFormik, color: '#2563eb' },
  Yup: { Icon: SiZod, color: '#3156a5' },
  JavaScript: { Icon: SiJavascript, color: '#d5b700' },
  Bootstrap: { Icon: SiBootstrap, color: '#7952b3' },
  HTML: { Icon: SiHtml5, color: '#e34f26' },
  CSS: { Icon: SiCss, color: '#1572b6' },
  Sass: { Icon: SiSass, color: '#cc6699' }
};

export function getStackIcon(stack: string): StackIcon {
  return stackIcons[stack] ?? { Icon: FiCode, color: 'var(--color-ink)' };
}
