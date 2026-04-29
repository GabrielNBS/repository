# 🚀 PROMPT DE MIGRAÇÃO — React CRA → Next.js 15 (App Router)

### Portfólio Gabriel Nascimento · github.com/GabrielNBS/repository

---

## 🎯 CONTEXTO DO PROJETO

Você está migrando um portfólio pessoal de **React 18 + Create React App** para **Next.js 15 com App Router**.

### Stack atual (origem)

- React 18.3 + TypeScript 4.9 + CRA (`react-scripts 5`)
- Styled-Components v6 (a ser substituído por Tailwind CSS v4)
- GSAP 3.13, Framer Motion (pacote `motion` v12), AOS 2.3, Rellax, react-scroll-parallax
- React Icons v5, react-svg
- ESLint + Prettier configurados
- Deploy: Vercel

### Estrutura de pastas atual

```
src/
├── assets/icons/
├── cards/          → Anchor, Button, Card, Header, Logo, Modal, ProjectCard, PulsePointer
├── Containers/     → About, Contact, Footer, Main, Projects
├── gsap/           → animações GSAP
├── hooks/          → custom hooks
├── Image/
├── keyframes/      → keyframes CSS
├── motion/         → animações Framer Motion
├── projects/       → dados dos projetos (provavelmente array/JSON)
├── styles/         → GlobalStyles, temas
└── types/          → tipos TypeScript
```

---

## 📐 ARQUITETURA ALVO (Next.js 15 — App Router)

### Nova estrutura de pastas

```
portfolio-next/
├── app/
│   ├── layout.tsx              ← RootLayout com metadata global, fontes, providers
│   ├── page.tsx                ← Página principal (Single Page — scroll)
│   ├── globals.css             ← Tailwind directives + CSS custom properties
│   └── not-found.tsx           ← Página 404
├── components/
│   ├── ui/                     ← Componentes puros sem lógica (Button, Card, Modal…)
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   └── …
│   ├── sections/               ← Seções da página (Server Components por padrão)
│   │   ├── Hero/
│   │   ├── About/
│   │   ├── Projects/
│   │   ├── Contact/
│   │   └── Footer/
│   ├── layout/                 ← Header, Navbar, Logo, Anchor
│   └── animations/             ← Wrappers de animação (Client Components isolados)
│       ├── GSAPProvider.tsx
│       ├── MotionWrapper.tsx
│       └── AOSInit.tsx
├── data/
│   └── projects.ts             ← Dados dos projetos (migrado de src/projects/)
├── hooks/                      ← Custom hooks (migrados)
├── lib/
│   ├── gsap.ts                 ← Setup GSAP centralizado
│   └── utils.ts                ← cn(), helpers
├── public/
│   └── …
├── types/
│   └── index.ts
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📋 INSTRUÇÕES DE MIGRAÇÃO — PASSO A PASSO

### FASE 1 — Setup do projeto Next.js

```bash
npx create-next-app@latest portfolio-next \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"
```

Instalar dependências necessárias:

```bash
npm install gsap motion react-icons
npm install -D @types/node
```

Remover dependências descontinuadas:

- ❌ `react-scripts` (CRA)
- ❌ `styled-components` e `@types/styled-components`
- ❌ `aos` e `@types/aos` (substituir por Intersection Observer nativo ou Motion)
- ❌ `rellax`, `react-scroll-parallax` (substituir por scroll-driven animations CSS ou motion/react)
- ❌ `react-svg` (usar `next/image` com SVG ou importação direta)

---

### FASE 2 — Configurações base

#### `next.config.ts`

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920]
  },
  experimental: {
    optimizeCss: true // critters inline CSS
  },
  compress: true,
  poweredByHeader: false
};

export default nextConfig;
```

#### `app/layout.tsx` — RootLayout com Metadata

```tsx
import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Gabriel Nascimento — Frontend Developer',
  description:
    'Portfólio de Gabriel Nascimento, desenvolvedor frontend especializado em interfaces modernas e animações.',
  keywords: ['frontend', 'react', 'nextjs', 'typescript', 'portfolio'],
  authors: [{ name: 'Gabriel Nascimento' }],
  openGraph: {
    title: 'Gabriel Nascimento — Frontend Developer',
    description: 'Portfólio interativo com animações modernas.',
    url: 'https://personal-portfolio-flax-gamma.vercel.app',
    siteName: 'Gabriel Nascimento Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'pt_BR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gabriel Nascimento — Frontend Developer',
    images: ['/og-image.png']
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${mono.variable}`}>
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
```

---

### FASE 3 — Migração de Styled-Components → Tailwind CSS v4

#### Regras de conversão

- Todo `styled.div` com estilos inline → componente com `className` Tailwind
- CSS variables de tema (cores, fontes, espaçamentos) → `globals.css` com `@theme`
- Keyframes em `src/keyframes/` → `globals.css` com `@keyframes` + classes Tailwind `animate-*`
- Mixins e temas → `tailwind.config.ts` com `theme.extend`

#### `app/globals.css`

```css
@import 'tailwindcss';

@theme {
  --color-background: #0a0a0a;
  --color-foreground: #f5f5f5;
  --color-accent: #6366f1; /* ajuste para a cor principal do seu portfólio */
  --color-muted: #71717a;
  --font-inter: var(--font-inter);
  --font-mono: var(--font-mono);
}

/* Animações migradas de src/keyframes/ */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-pointer {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.6;
  }
}
```

#### Exemplo de migração de componente

```tsx
// ANTES — Styled-Components
const CardWrapper = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

// DEPOIS — Tailwind
function CardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-900 rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1">
      {children}
    </div>
  );
}
```

---

### FASE 4 — Server vs Client Components

**Regra de ouro:** tudo é Server Component por padrão. Use `'use client'` APENAS quando necessário.

| Componente                 | Tipo   | Motivo                          |
| -------------------------- | ------ | ------------------------------- |
| `sections/Hero`            | Server | Conteúdo estático               |
| `sections/About`           | Server | Conteúdo estático               |
| `sections/Projects`        | Server | Dados de projetos estáticos     |
| `sections/Contact`         | Client | Formulário com estado           |
| `sections/Footer`          | Server | Conteúdo estático               |
| `layout/Header`            | Client | scroll listener, estado de menu |
| `ui/Modal`                 | Client | estado open/close               |
| `animations/GSAPProvider`  | Client | acesso ao DOM (useEffect)       |
| `animations/MotionWrapper` | Client | Framer Motion requer browser    |
| `animations/AOSInit`       | Client | inicialização no browser        |
| `ui/PulsePointer`          | Client | interação com cursor            |

#### Padrão de isolamento de animações (CRÍTICO para performance)

```tsx
// components/animations/MotionWrapper.tsx
'use client';
import { motion, type HTMLMotionProps } from 'motion/react';

interface Props extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export function MotionWrapper({ children, ...props }: Props) {
  return <motion.div {...props}>{children}</motion.div>;
}

// Uso em Server Component:
// <MotionWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//   <ConteudoEstatico />
// </MotionWrapper>
```

#### Padrão de GSAP com Next.js

```tsx
// components/animations/GSAPProvider.tsx
'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(selector: string) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current.querySelectorAll(selector),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%'
          }
        }
      );
    },
    { scope: ref }
  );

  return ref;
}
```

---

### FASE 5 — Migração de dados de projetos

```ts
// data/projects.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techs: string[];
  liveUrl?: string;
  repoUrl?: string;
  mockup: {
    desktop: string;
    mobile: string;
  };
  featured: boolean;
}

// Migrar array de src/projects/ para cá
export const projects: Project[] = [
  // ... seus projetos
];
```

---

### FASE 6 — Otimizações de performance

#### Imagens

```tsx
// ANTES
<img src="/screens/desktop.png" alt="..." />;

// DEPOIS
import Image from 'next/image';
<Image
  src="/screens/desktop.png"
  alt="Desktop mockup do projeto X"
  width={1280}
  height={720}
  quality={85}
  priority={false} // true apenas para hero/LCP
  placeholder="blur" // adicionar blurDataURL para melhor UX
/>;
```

#### Lazy loading de seções pesadas

```tsx
// app/page.tsx
import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';

// Seções abaixo do fold → lazy load
const Projects = dynamic(() => import('@/components/sections/Projects'), {
  loading: () => <ProjectsSkeleton />
});
const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <ContactSkeleton />
});
```

#### Preload de fontes críticas

As fontes já são otimizadas automaticamente pelo `next/font` configurado no layout.

---

### FASE 7 — Acessibilidade (WCAG 2.1 AA)

Aplicar em todos os componentes interativos:

- `aria-label` em botões sem texto visível
- `role="dialog"` + `aria-modal="true"` + `aria-labelledby` no Modal
- Navegação por teclado: `onKeyDown` com `Enter/Space` em elementos clicáveis não-button
- `focus-visible` com outline visível via Tailwind (`focus-visible:ring-2 focus-visible:ring-accent`)
- Atributo `alt` descritivo em todas as imagens
- Estrutura de headings semântica: `h1` único por página, hierarquia correta
- `prefers-reduced-motion`: respeitar em todas as animações

```tsx
// lib/utils.ts — helper para reduced motion
export function useReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Uso em animações
const shouldReduce = useReducedMotion();
const variants = {
  hidden: { opacity: 0, y: shouldReduce ? 0 : 24 },
  visible: { opacity: 1, y: 0 }
};
```

---

### FASE 8 — Internacionalização (i18n) — estrutura preparatória

Instalar e configurar `next-intl`:

```bash
npm install next-intl
```

```
messages/
├── pt-BR.json
└── en.json

app/
└── [locale]/
    ├── layout.tsx
    └── page.tsx
```

Mesmo que a implementação completa seja futura, estruturar as pastas agora evita refatoração.

---

### FASE 9 — Testes

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

Estrutura de testes colocalizados:

```
components/
└── ui/
    └── Button/
        ├── Button.tsx
        ├── Button.test.tsx   ← teste unitário
        └── index.ts
```

---

## ✅ CHECKLIST DE VALIDAÇÃO PÓS-MIGRAÇÃO

### Funcionalidade

- [ ] Todas as seções renderizam corretamente (Hero, About, Projects, Contact, Footer)
- [ ] Modal de projeto abre e fecha com teclado e mouse
- [ ] Animações GSAP disparam no scroll corretamente
- [ ] Animações Framer Motion funcionam
- [ ] Links externos abrem em nova aba com `rel="noopener noreferrer"`
- [ ] Formulário de contato funciona (se houver)

### Performance (Lighthouse)

- [ ] LCP < 2.5s
- [ ] FID/INP < 100ms
- [ ] CLS < 0.1
- [ ] Performance score ≥ 90
- [ ] Accessibility score ≥ 90
- [ ] SEO score = 100

### Build

- [ ] `npm run build` sem erros ou warnings críticos
- [ ] Sem `useEffect` desnecessários em Server Components
- [ ] Nenhum `useState` em Server Components
- [ ] Imagens com `width` e `height` definidos

### Acessibilidade

- [ ] Navegação completa por teclado (Tab, Shift+Tab, Enter, Escape)
- [ ] Screen reader anuncia conteúdo corretamente
- [ ] Contraste de cores WCAG AA em todos os textos
- [ ] `prefers-reduced-motion` respeitado

---

## 🚫 ARMADILHAS COMUNS — EVITAR

1. **Não usar `useEffect` para buscar dados** → use `async/await` direto em Server Components
2. **Não adicionar `'use client'` em tudo** → só onde realmente precisar de estado/browser APIs
3. **Não importar GSAP no topo de Server Components** → sempre dentro de Client Components
4. **Não usar `<img>` diretamente** → sempre `next/image`
5. **Não esquecer de testar `npm run build`** → erros de hidratação só aparecem no build
6. **Styled-Components e SSR** → se mantiver styled-components temporariamente, adicionar `ServerStyleSheet` no layout
7. **AOS requer `document`** → inicializar apenas via `useEffect` dentro de Client Component
8. **`rellax` usa `window`** → substituir por `motion` scroll ou CSS `animation-timeline: scroll()`

---

## 📦 DEPENDÊNCIAS FINAIS ESPERADAS

```json
{
  "dependencies": {
    "next": "^15.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "gsap": "^3.13.x",
    "motion": "^12.x",
    "react-icons": "^5.x",
    "next-intl": "^3.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "@types/node": "^22.x",
    "@types/react": "^19.x",
    "tailwindcss": "^4.x",
    "eslint": "^9.x",
    "eslint-config-next": "^15.x",
    "vitest": "^3.x",
    "@testing-library/react": "^16.x"
  }
}
```

---

_Prompt gerado com base na análise do repositório github.com/GabrielNBS/repository_
_Stack analisada: React 18 + CRA + Styled-Components v6 + GSAP + Framer Motion + AOS + TypeScript 4.9_
