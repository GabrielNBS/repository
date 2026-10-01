# Auditoria de padrões de design e acessibilidade

> Este documento preserva o diagnóstico anterior às correções. O estado validado após a implementação está em [reauditoria-design-system-2026-10-01.md](./reauditoria-design-system-2026-10-01.md).

Data: 01/10/2026  
Escopo: página inicial, todas as seções do portfólio, navegação, rodapé e o template compartilhado pelas oito páginas de projeto.

## Resumo executivo

O projeto tem uma direção visual forte e coerente: paleta editorial reconhecível, contraste alto nas combinações principais, hierarquia expressiva, componentes responsivos e boas bases de acessibilidade. A implementação, porém, ainda não constitui um design system completo. Cor e tipografia estão parcialmente tokenizadas, enquanto espaçamento, containers, raios, camadas e breakpoints são definidos localmente.

Avaliação heurística geral: **6,7/10 — base visual madura, sistema de tokens incompleto**.

| Dimensão                     | Avaliação | Diagnóstico                                                                                                                        |
| ---------------------------- | --------: | ---------------------------------------------------------------------------------------------------------------------------------- |
| Paleta e contraste principal |    8,5/10 | Paleta coerente e combinações principais acima de WCAG AA; há uma falha no placeholder.                                            |
| Tipografia                   |      7/10 | Escala fluida e papéis claros, mas há valores locais, entrelinhas apertadas e uma quebra defeituosa em títulos.                    |
| Espaçamento e whitespace     |      4/10 | Ritmo visual geralmente bom, porém sem escala de spacing central.                                                                  |
| Layout e responsividade      |    7,5/10 | Sem overflow horizontal nos viewports testados; breakpoints e gutters não estão sistematizados.                                    |
| Acessibilidade               |      7/10 | Semântica, foco, redução de movimento e alvos mobile são bons; contraste de placeholder e estados de formulário precisam correção. |
| Copy e feedback              |      6/10 | Voz consistente e autoral, mas o formulário comunica um envio que não acontece.                                                    |
| Governança de tokens         |    4,5/10 | Tipos e cores têm base; faltam tokens semânticos e de fundação para o restante do sistema.                                         |

## Método e cobertura

- Leitura estática de 17 arquivos CSS, totalizando 3.875 linhas, além dos componentes TSX e dados dos oito projetos.
- Inspeção visual e medição do DOM em 320 × 568, 390 × 844, 768 × 900 e 1440 × 900.
- Verificação da página inicial e do template de detalhe usado por Regula, E-Food, E-Play, To-Do, Spider-Verse, Clone Disney+, Hoje Tá Doce e WhatsApp Sender.
- Comparação com WCAG 2.2 para contraste, alvo mínimo, foco não encoberto e adaptação a espaçamento de texto.
- O baseline da auditoria anterior marcou 100 em acessibilidade no Lighthouse. Esse número é apenas um indicador automatizado e não substitui os achados manuais desta revisão.

## Inventário do sistema atual

### Pontos já bem estruturados

- 7 tokens de cor, 2 famílias tipográficas, 2 curvas de easing e 35 tokens tipográficos em `app/globals.css`.
- 79 de 101 declarações de `font-size` usam tokens de texto: aproximadamente 78% de cobertura.
- 51 de 54 declarações de `font-family` usam os tokens globais.
- 233 referências a tokens de cor preservam boa consistência da paleta principal.
- `:focus-visible` global de 3 px, skip links na home e nos detalhes e alternativa para `prefers-reduced-motion`.
- Idioma do documento definido como `pt-BR`.
- Imagens informativas com texto alternativo e imagens decorativas removidas da árvore acessível.
- Hierarquia semântica consistente: um `h1` por página, seguido por `h2` e `h3`.
- Comprimentos de leitura geralmente controlados com `ch` e `rem`.
- Nenhum overflow horizontal foi encontrado nos quatro viewports testados.
- Todos os controles medidos em mobile tinham pelo menos 44 px de altura; no desktop, todos ficaram acima do mínimo WCAG de 24 × 24 px.

### Cobertura ainda ausente

- 253 declarações de padding, margin e gap sem uma escala global `--space-*`.
- 97 ocorrências de cores literais ou funções `rgb/rgba`, muitas repetindo variantes translúcidas de ink e paper.
- 17 valores distintos de `z-index`.
- 13 valores/formas distintas de `border-radius`.
- 25 valores distintos de `letter-spacing` e 19 de `line-height`.
- 7 breakpoints de `max-width` (480, 600, 800, 900, 960, 1024 e 1050 px), além da fronteira de 801 px usada em `min-width`.
- Não existe token compartilhado para gutter, largura de container, camada, raio, sombra, borda ou breakpoint.

## Achados prioritários

### P1 — corrigir antes de ampliar o sistema

#### 1. O formulário confirma uma ação que não acontece

Em `features/portfolio/sections/contact/ContactSection.tsx`, `handleSubmit` apenas impede o submit e define `sent=true`. Mesmo assim, o feedback muda para “Recebido. Em breve a gente conversa.” Isso é um problema de confiança, não só uma ausência de integração.

Recomendação: integrar um endpoint real com estados `idle/loading/success/error`; até isso existir, substituir o formulário por um link `mailto:` ou mudar o texto e o CTA para não alegar envio.

#### 2. Contraste insuficiente no placeholder

O placeholder usa `rgb(37 34 31 / 35%)` sobre `#f6efe5`. A composição resulta aproximadamente em `#ada7a0`, com contraste de **2,09:1**. Texto normal, inclusive placeholder, precisa de **4,5:1** no nível AA.

Recomendação: criar `--color-text-placeholder` com contraste mínimo de 4,5:1; `--color-muted` já atinge 5,57:1 sobre paper.

#### 3. Títulos de projeto quebram dentro da palavra em desktop

No viewport 1440 × 900, “WhatsApp Sender” é renderizado como “WhatsAp” / “p” / “Sender”. A causa é a combinação da coluna lateral estreita com os caracteres `inline-block` criados pelo SplitText; o wrapper de palavra não preserva `white-space: nowrap`. “Spider-Verse” também se divide internamente no hífen.

Recomendação: impedir quebra dentro do wrapper de palavra, reduzir a escala do título conforme o espaço efetivo da coluna ou aumentar a largura mínima da coluna. Validar todos os oito nomes de projeto em uma matriz de 320, 390, 768, 1024 e 1440 px.

### P2 — consolidar o design system

#### 4. Espaçamento visual bom, mas não governado por tokens

O gutter recorrente `clamp(1.25rem, 3vw, 3.75rem)` aparece em várias áreas, mas outras seções usam valores próprios como `3.7vw`, `6vw`, `0.75rem`, `1.4rem` e `1.5625rem`. Algumas diferenças são parte da composição; outras são deriva acidental.

Recomendação: introduzir uma escala de 4/8 px e papéis semânticos, por exemplo:

- `--space-1` a `--space-12`;
- `--gutter-page`;
- `--section-block-start` e `--section-block-end`;
- `--content-max`, `--content-reading` e `--content-wide`.

Os componentes continuam livres para exceções editoriais, mas a exceção passa a ser explícita.

#### 5. Cores são tokenizadas por pigmento, não por função

`paper`, `ink`, `peach`, `lilac`, `cream`, `rose` e `muted` cobrem a identidade. Entretanto, bordas, sombras, superfícies translúcidas e estados usam repetidamente `rgb(37 34 31 / n%)` e `rgb(246 239 229 / n%)`.

Recomendação: manter os tokens de marca e acrescentar aliases semânticos como `--color-bg-canvas`, `--color-text-primary`, `--color-text-secondary`, `--color-border-subtle`, `--color-surface-glass`, `--color-focus` e `--shadow-floating`.

#### 6. Breakpoints, raios e camadas não têm escala comum

A base usa sete `max-width`, uma fronteira complementar de 801 px, 17 níveis de `z-index` e 13 padrões de raio. Isso torna difícil saber se um novo valor é parte do sistema ou apenas uma correção local.

Recomendação: reduzir a fundação a poucos breakpoints por intenção (`compact`, `medium`, `wide`), criar `--radius-sm/md/lg/pill` e uma escala curta de camadas (`base`, `sticky`, `nav`, `overlay`, `cursor`, `loader`).

#### 7. Entrelinha de copy está apertada em pontos importantes

- Texto introdutório de Sobre: `line-height: 1.25`.
- Descrição dos cartões de habilidades: `line-height: 1.18`.
- Diversos títulos usam `0.75–0.9`, adequado como recurso editorial, mas sem tokens de papel tipográfico.

Recomendação: usar cerca de `1.45–1.6` para corpo e manter a compactação apenas em display. Criar tokens de line-height e tracking por papel: display, title, body, label e utility.

#### 8. Seções com altura fixa exigem teste formal de text spacing

Contato usa `height: 100dvh` e `overflow: hidden`; Hero e Manifesto também usam recortes intensivos. O conteúdo padrão coube até em 320 × 568, mas essa estratégia pode perder conteúdo quando o usuário força line-height, letter-spacing e word-spacing conforme WCAG 1.4.12.

Recomendação: executar teste de text spacing; onde houver conteúdo funcional, preferir `min-height` e permitir crescimento/overflow vertical. Reservar recorte rígido para elementos puramente decorativos.

#### 9. A tipografia é eficiente, mas varia entre plataformas

Georgia/Times e Arial/Helvetica eliminam downloads de fonte e favorecem a performance. Em contrapartida, as métricas mudam por sistema operacional e tornam composições muito apertadas mais frágeis — exatamente o que aparece nos títulos divididos.

Recomendação: manter a estratégia de system fonts se performance for prioridade, mas criar papéis `--font-display`, `--font-body` e `--font-label` e testar métricas em Windows, macOS e Android. Uma fonte local/variável só deve ser adotada se o ganho de identidade compensar o custo.

### P3 — refinamentos de acessibilidade, copy e manutenção

#### 10. Ações duplicadas em WhatsApp Sender

Nesse projeto, `deploy` e `github` apontam para a mesma URL, mas a interface exibe dois botões: “Ver projeto” e “Código”. Isso sugere destinos diferentes.

Recomendação: quando as URLs forem iguais, renderizar apenas “Ver repositório”; quando existir demo, manter “Ver projeto” + “Código”.

#### 11. Campo de e-mail sem autocomplete

O input tem label, `type="email"`, `required`, status descrito e live region — uma base boa — mas não possui `autoComplete="email"`.

Recomendação: adicionar autocomplete e estados visuais/programáticos de erro, com `aria-invalid` e mensagem associada somente quando houver validação real.

#### 12. Alvos desktop podem ganhar conforto

As abas de habilidades mediram cerca de 28,8 px de altura. Atendem ao mínimo WCAG de 24 px, mas ficam abaixo de um alvo confortável de 40–44 px, especialmente em dispositivos híbridos.

Recomendação: aumentar a área clicável sem necessariamente ampliar o texto visível.

#### 13. `aria-current` pode ser mais preciso na navegação por âncoras

Os links da navegação usam `aria-current="page"` para seções da mesma página. `aria-current="location"` comunica melhor uma localização dentro do documento.

#### 14. CSS obsoleto no Hero

As classes `.copy`, `.cta`, `.logoWall` e `.logoPill` permanecem em `HeroSection.module.css`, mas não são referenciadas por `HeroSection.tsx`. Elas incluem cores, tipografia e breakpoints de uma composição anterior e aumentam o ruído da auditoria.

Recomendação: remover após confirmar que não fazem parte de uma variante planejada.

## Contraste da paleta principal

| Combinação                | Relação aproximada | Resultado                  |
| ------------------------- | -----------------: | -------------------------- |
| ink / paper               |            13,86:1 | Passa AA/AAA               |
| muted / paper             |             5,57:1 | Passa AA para texto normal |
| ink / peach               |             8,32:1 | Passa AA/AAA               |
| ink / lilac               |             8,62:1 | Passa AA/AAA               |
| ink / cream               |            11,10:1 | Passa AA/AAA               |
| ink / rose                |             8,82:1 | Passa AA/AAA               |
| placeholder atual / paper |             2,09:1 | Falha para texto normal    |

## Recomendações de fundação

Uma próxima versão do `@theme` deveria separar três níveis:

1. **Primitivos**: pigmentos, escala de espaço, raios, duração e easing.
2. **Semânticos**: background, surface, text, border, focus, shadow, gutter e containers.
3. **Papéis de componente**: nav-height, card-padding, section-space e content-width, usados somente quando o papel é recorrente.

Evitar tokenizar cada número existente. O objetivo é reduzir decisões repetidas, não esconder todas as exceções editoriais atrás de variáveis.

## Ordem sugerida de implementação

1. Corrigir o feedback falso do formulário, o contraste do placeholder e a quebra dos títulos.
2. Criar tokens semânticos de texto/borda/surface/focus e a escala de spacing/gutter/container.
3. Consolidar breakpoint, raio e z-index.
4. Migrar uma seção por vez, começando por Contact e Project Detail, depois Nav, Projects, About, Skills, Manifesto e Hero.
5. Remover CSS morto e duplicações.
6. Criar regressões visuais para os quatro viewports auditados e para os oito nomes de projeto.
7. Revalidar teclado, foco, redução de movimento, contraste e text spacing.

## Referências normativas

- [WCAG 2.2 — contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 — tamanho mínimo de alvo](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- [WCAG 2.2 — foco não encoberto](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
- [WCAG 2.2 — espaçamento de texto](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html)

## Conclusão

O projeto já parece intencional e reconhecível; o problema não é falta de direção visual. O principal desvio é que essa direção ainda depende demais de decisões locais. Ao corrigir os três problemas P1 e formalizar spacing, containers, aliases semânticos e camadas, a implementação passa de um conjunto de boas composições para um sistema realmente governável e previsível.
