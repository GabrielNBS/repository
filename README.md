# Portfolio interativo

Portfólio pessoal de Gabriel Nascimento, construído com Next.js, React, TypeScript, Tailwind CSS, GSAP, React Icons e Zdog. A experiência combina narrativa editorial, transições guiadas por scroll e páginas de detalhe para cada projeto.

## Desenvolvimento

```bash
npm install
npm run dev
```

Scripts disponíveis:

- `npm run dev` inicia o servidor local com Turbopack.
- `npm run lint` executa o ESLint.
- `npm run build` cria a build de produção.
- `npm run start` inicia a build de produção.

## Arquitetura

```text
app/                         # Rotas e configuração global do Next.js
features/portfolio/
├── shell/                   # Composição da home, navegação e rodapé
├── sections/                # Sections isoladas por responsabilidade
├── projects/                # Dados, cards, cursor e animações de projetos
├── project-detail/          # Página e motion de detalhe do projeto
├── transitions/             # Transições entre sections
├── motion/                  # Motion da home
└── shared/motion/           # Utilitários GSAP compartilhados
public/mockups/              # Imagens estáticas dos projetos
docs/previews/               # Protótipos e referências visuais
```

As animações GSAP são organizadas pelo contexto que controla cada experiência. Hooks `useGSAP`, escopos por `ref`, `matchMedia` e cleanup automático evitam efeitos persistentes entre montagens e mudanças responsivas.

## Acessibilidade e performance

- Respeito a `prefers-reduced-motion` nas animações principais.
- Navegação por teclado e estados de foco nos elementos interativos.
- Uso prioritário de `transform`, `opacity` e `gsap.quickTo()` nas interações frequentes.
- ScrollTriggers criados com escopo, pinning explícito e refresh quando necessário.
