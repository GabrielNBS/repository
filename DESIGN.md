# Portfolio Design System

## Direction

Portfolio front-end premium, moderno e minimalista, com influencia japonesa contemporanea aplicada com sutileza. A interface deve comunicar clareza, precisao, dominio tecnico e maturidade visual sem parecer tematica demais.

## Visual Principles

- Use espaco vazio como composicao: secoes amplas, respiro real e poucos elementos competindo por atencao.
- Use linhas finas e grids modulares inspirados em paineis shoji para criar ritmo e organizacao.
- Use detalhes wabi-sabi de forma discreta: textura sugerida pelo fundo, assimetria controlada e marcas circulares imperfeitas como apoio visual.
- Evite cliches japoneses: sem kanjis decorativos, templos, samurais, anime ou ornamentos sem funcao.
- Valorize projetos por screenshots reais, mockups grandes e descricoes curtas.

## Token Source

`app/globals.css` declara os tokens Tailwind v4 dentro de `@theme`. `styles.json` documenta os mesmos valores para referencia de agentes e futuras alteracoes. Ao criar UI nova, prefira utilitarios semanticos como `w-site`, `gap-grid`, `py-section`, `text-body`, `text-display`, `font-heading` e `font-ui` antes de usar valores arbitrarios.

## Color Tokens

- Canvas: `#f7f7f5`
- Paper: `#ffffff`
- Ink: `#18181b`
- Muted text: `#68645f`
- Border line: `#dedbd4`
- Soft band: `#eeece7`
- Accent: `#a43f2f`
- Accent dark: `#7f2d22`

## Spacing Tokens

- `w-site`: largura principal, `min(1180px, calc(100% - 2rem))`.
- `gap-grid`: gap estrutural entre colunas, `clamp(1.25rem, 3vw, 3rem)`.
- `py-section`: respiro padrao de secoes, `clamp(5rem, 10vw, 9rem)`.
- `py-section-tight`: respiro compacto para transicoes/cases, `clamp(3rem, 7vw, 5rem)`.
- `min-h-hero-min`: altura minima do hero da home, `calc(86svh - 4.25rem)`.
- `min-h-case-hero-min`: altura minima do hero de case, `calc(88svh - 4.25rem)`.
- `py-hero-start` / `pb-hero-end`: respiro vertical especifico do hero.
- `mb-heading-gap`: separacao entre cabecalho de secao e conteudo.
- `p-card` / `p-card-body`: padding de cards e corpo de cards.
- `pl-contact-indent`: indentacao da coluna de contato.
- `min-h-touch`: altura minima para botoes e alvos clicaveis.
- `min-h-bridge`, `min-h-bridge-band`, `min-h-service-card`: alturas semanticas de links de transicao, faixa editorial e cards de servico.
- `gap-action-gap`, `gap-link-gap`, `px-button-x`, `py-button-y`, `px-tag-x`, `py-tag-y`: tokens de chrome para botoes, links e tags.

## Typography Tokens

Use Inter or system sans fallback. Keep headings heavy, compact and direct. Body text should stay calm, readable and concise.

- `text-hero`: hero da home.
- `text-case-hero`: titulo de paginas internas.
- `text-display`: headings principais de secoes.
- `text-case-display`: heading de problema/solucao em cases.
- `text-bridge`: texto editorial em faixa de ligacao.
- `text-body`: corpo principal com line-height `1.75`.
- `text-summary`: metadados destacados de case.
- `text-nav`, `text-nav-mobile`, `text-ui`, `text-link`, `text-label`, `text-tag`, `text-index`, `text-note`, `text-title`: escala de textos de interface.

## Font Weight Tokens

- `font-heading`: `760`, para H1/H2 grandes.
- `font-title`: `720`, para H3 e titulos de card.
- `font-nav`: `650`, para navegacao.
- `font-ui`: `760`, para botoes e CTAs.
- `font-label`: `800`, para labels, indices e metadados pequenos.

## Components

- Navbar: sticky, compacta, superficie neutra, pill container permitido apenas para agrupar navegacao.
- Buttons: 6px radius, `min-h-touch`, `px-button-x`, `py-button-y`, labels curtos.
- Project cards: 8px radius max, screenshot-first, no nested card treatment.
- Tags: use `text-tag`, `px-tag-x`, `py-tag-y`.
- Case pages: use the same identity, with project accent colors only as restrained contextual variation.
- Scroll-to-top: fixed circular utility control.

## Responsiveness

The layout must work across small mobile, large mobile, tablet, desktop and wide screens. Grids collapse cleanly, buttons remain touch-friendly, and media keeps stable aspect ratios.

## Inspiration Notes

References considered: premium developer portfolios, high-end project case study pages, SaaS landing page hierarchy, minimal Japanese web composition, shoji-like grids and wabi-sabi spacing. These references informed spacing, modular rhythm, quiet contrast, case-study structure and restrained interaction states. They do not replace this design system.
