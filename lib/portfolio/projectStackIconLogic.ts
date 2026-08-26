import type { IconType } from 'react-icons';
import {
  SiBootstrap,
  SiCss,
  SiFormik,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiRadixui,
  SiReact,
  SiReacthookform,
  SiRedux,
  SiSass,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiZod
} from 'react-icons/si';

type StackIcon = { Icon: IconType; tone: string };

const stackIcons: Record<string, StackIcon> = {
  'Next.js': { Icon: SiNextdotjs, tone: 'text-ink' },
  TypeScript: { Icon: SiTypescript, tone: 'text-[#3178c6]' },
  Tailwind: { Icon: SiTailwindcss, tone: 'text-[#38bdf8]' },
  'Radix UI': { Icon: SiRadixui, tone: 'text-ink' },
  Zod: { Icon: SiZod, tone: 'text-[#3156a5]' },
  'React Hook Form': { Icon: SiReacthookform, tone: 'text-[#ec5990]' },
  Context: { Icon: SiReact, tone: 'text-[#2f9cc4]' },
  React: { Icon: SiReact, tone: 'text-[#2f9cc4]' },
  'Styled-Components': { Icon: SiStyledcomponents, tone: 'text-[#db7093]' },
  Redux: { Icon: SiRedux, tone: 'text-[#764abc]' },
  Formik: { Icon: SiFormik, tone: 'text-[#2563eb]' },
  Yup: { Icon: SiZod, tone: 'text-[#3156a5]' },
  JavaScript: { Icon: SiJavascript, tone: 'text-[#d5b700]' },
  Bootstrap: { Icon: SiBootstrap, tone: 'text-[#7952b3]' },
  HTML: { Icon: SiHtml5, tone: 'text-[#e34f26]' },
  CSS: { Icon: SiCss, tone: 'text-[#1572b6]' },
  Sass: { Icon: SiSass, tone: 'text-[#cc6699]' }
};

export function getStackIcon(stack: string): StackIcon {
  return stackIcons[stack] ?? { Icon: SiReact, tone: 'text-ink' };
}
