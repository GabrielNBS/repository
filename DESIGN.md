# Portfolio Design System

## Direction

Portfolio front-end premium, moderno e minimalista, com influencia japonesa contemporanea aplicada com sutileza. A interface deve comunicar clareza, precisao, dominio tecnico e maturidade visual sem parecer tematica demais.

## Visual Principles

- Use espaco vazio como composicao: secoes amplas, respiro real e poucos elementos competindo por atencao.
- Use linhas finas e grids modulares inspirados em paineis shoji para criar ritmo e organizacao.
- Use detalhes wabi-sabi de forma discreta: textura sugerida pelo fundo, assimetria controlada e marcas circulares imperfeitas como apoio visual.
- Evite cliches japoneses: sem kanjis decorativos, templos, samurais, anime ou ornamentos sem funcao.
- Valorize projetos por screenshots reais, mockups grandes e descricoes curtas.

## Tokens

- Background: `#f7f7f5`
- Surface: `#ffffff`
- Ink: `#18181b`
- Muted text: `#68645f`
- Border: `#dedbd4`
- Soft band: `#eeece7`
- Accent: `#a43f2f`
- Accent dark: `#7f2d22`
- Radius small: `6px`
- Radius medium: `8px`
- Shadow soft: `0 24px 70px rgb(24 24 27 / 0.08)`
- Content width: `1180px`

## Typography

Use Inter or system sans fallback. Keep headings heavy, compact and direct. Do not scale text with viewport width beyond controlled `clamp()` ranges. Body text should stay calm, readable and concise.

- Hero heading: large, tight line-height, max 11-12 characters per line.
- Section headings: strong but smaller than hero.
- Body copy: neutral, 1.6-1.75 line-height.
- UI labels: small, bold and direct.

## Components

- Navbar: sticky, compact, neutral surface, pill container allowed only for nav grouping.
- Buttons: 6px radius, clear primary/secondary states, short labels.
- Project cards: 8px radius max, screenshot-first, no nested card treatment.
- Tags: small outlined pills for technology only.
- Case pages: use the same identity, with project accent colors only as restrained contextual variation.
- Scroll-to-top: fixed circular utility control.

## Responsiveness

The layout must work across small mobile, large mobile, tablet, desktop and wide screens. Grids collapse cleanly, buttons remain touch-friendly, and media keeps stable aspect ratios.

## Inspiration Notes

References considered: premium developer portfolios, high-end project case study pages, SaaS landing page hierarchy, minimal Japanese web composition, shoji-like grids and wabi-sabi spacing. These references informed spacing, modular rhythm, quiet contrast, case-study structure and restrained interaction states. They do not replace this design system.
