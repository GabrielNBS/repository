# Catálogo técnico de motion

Inventário das animações ativas do portfólio, com foco em GSAP, timelines,
ScrollTrigger, plugins, gestos e transições que participam da navegação entre
a home e os detalhes de projeto.

## Estado da auditoria

As animações foram revisadas em três níveis:

1. composição das timelines e posição relativa dos tweens;
2. ciclo de vida React: montagem, desmontagem, mudança de breakpoint e
   `prefers-reduced-motion`;
3. fluxo de navegação home → detalhe → home com âncoras.

Correções aplicadas durante a auditoria:

- a âncora `/#projetos` é reaplicada depois que os pins da home medem e inserem
  seus spacers, evitando que uma âncora profunda caia dentro do hero pinado; o
  retorno principal dos detalhes usa `/` para recomeçar a experiência pelo
  hero;
- `history.scrollRestoration` usado na rota de detalhe é restaurado ao sair da
  página;
- `SkillsSection` não cria `ScrollTrigger`, drag ou carrossel horizontal em
  `prefers-reduced-motion: reduce`; nesse modo os cards ficam no fluxo normal;
- callbacks, observers, listeners, timelines, splits e triggers ficam dentro de
  escopos `useGSAP` e são revertidos ou destruídos no cleanup.

## Convenções para reutilização

- **Timeline:** sequência de tweens com labels e posições relativas.
- **Scroll-linked timeline:** timeline cujo playhead é controlado por
  `ScrollTrigger` e `scrub`.
- **Pin:** mantém uma cena no viewport durante um intervalo vertical de scroll.
- **Batch reveal:** vários elementos compartilham um `ScrollTrigger.batch`.
- **Imperative controller:** não é uma timeline única; mede o layout e atualiza
  transformações/estado conforme scroll, drag ou navegação.
- **Progress mapping:** valores de progresso entre `0` e `1` são convertidos em
  fases visuais.

## Mapa rápido

| Nome técnico | Sessão | Tecnologia | Arquivo principal |
| --- | --- | --- | --- |
| `HeroIntroLoaderTimeline` | Hero | GSAP timeline | `features/portfolio/sections/hero/heroMotion.ts` |
| `HeroPortalRevealTimeline` | Hero → Manifesto | GSAP + ScrollTrigger | `features/portfolio/sections/hero/heroMotion.ts` |
| `ManifestoStoryTimeline` | Manifesto | GSAP + ScrollTrigger + SplitText + MorphSVG + MotionPath | `features/portfolio/sections/manifesto/manifestoStoryMotion.ts` |
| `HomeBlurRevealBatch` | Home | `ScrollTrigger.batch` | `features/portfolio/shared/motion/blurRevealMotion.ts` |
| `HeadingSplitRevealTimeline` | About, Projects, Skills, Contact e detalhes | GSAP + SplitText + ScrollTrigger | `features/portfolio/shared/motion/headingSplitMotion.ts` |
| `ProjectsAboutTransitionTimeline` | Projects → About | GSAP timeline + scrub | `features/portfolio/shell/portfolioHomeMotion.ts` |
| `ProjectsAgendaEnter` | Projects | GSAP `from` + stagger | `features/portfolio/sections/projects/projectsAgendaMotion.ts` |
| `ProjectElasticHoverObserver` | Projects | GSAP Observer + elastic ease | `features/portfolio/sections/projects/projectsAgendaMotion.ts` |
| `SkillsHorizontalTrackController` | Skills | ScrollTrigger + transform manual | `features/portfolio/sections/skills/skillsMotion.ts` |
| `ProjectDetailIntroTimeline` | Detalhe | GSAP timeline | `features/portfolio/project-detail/projectDetailMotion.ts` |
| `ProjectDetailVisualParallax` | Detalhe | GSAP + ScrollTrigger | `features/portfolio/project-detail/projectDetailMotion.ts` |
| `ProjectCursorFollow` | Projects | `quickTo` | `features/portfolio/projects/cursor/projectCursorMotion.ts` |
| `ScrollSplitCardProgressController` | Detalhe | Framer Motion | `components/ui/scroll-split-card.tsx` |

## 1. Hero

### `HeroIntroLoaderTimeline`

**Arquivo:** `features/portfolio/sections/hero/heroMotion.ts`

Timeline de entrada executada uma vez por montagem quando o usuário não prefere
movimento reduzido.

- `loaderLetters`: entrada com `rotationX`, `rotationY`, `x`, `y` e stagger
  randômico;
- `loaderIndex`: contador textual até `100`, usando `snap.textContent`;
- saída das letras do loader e fade do loader;
- entrada de `heroLetters` com rotação 3D e `yPercent`;
- entrada sequencial de metadata, portal, papéis laterais e footer;
- ao completar, remove o loader e chama `ScrollTrigger.refresh()`.

**Padrão reutilizável:** timeline de abertura com `defaults`, posições
relativas (`'<0.1'`, `'<0.16'`) e refresh apenas depois da alteração de display.

### `HeroPortalPin`

**ID do trigger:** `hero-portal-pin`

`ScrollTrigger.create()` mantém a seção hero pinada durante a soma de duas
distâncias:

- `heroDistance`: `2.2 * window.innerHeight` para a revelação do portal;
- `manifestoDistance`: `max(3.35 * window.innerHeight, 2500)` para a história do
  manifesto.

O pin é criado no hero, mas os elementos animados são seus filhos. Isso evita
  animar diretamente o elemento pinado e reduz conflitos de cálculo.

### `HeroPortalRevealTimeline`

**ID do trigger:** `hero-portal-reveal`

Timeline scrubbada com `scrub: 0.9`, usando `main` como trigger e o hero como
seção pinada.

Labels:

- `drift`: reduz o nome, remove metadata, papéis e footer;
- `expand`: move o card até o centro da viewport e escala a seção real de
  manifesto de miniatura para `scale: 1`;
- `handoff`: encerra a presença visual do nome e deixa a seção de manifesto
  assumir o viewport.

O card não é uma cópia visual: o alvo é a própria
`<ManifestoSection embedded />`, declarada em
`features/portfolio/sections/hero/HeroSection.tsx`. A função
`scaleToMini()` mede a seção real contra o frame do hero; `centerOffset()`
calcula a correção final de posição para evitar faixa superior, inferior ou
desalinhamento durante a expansão.

## 2. Manifesto

### `ManifestoStoryTimeline`

**Arquivo:** `features/portfolio/sections/manifesto/manifestoStoryMotion.ts`

Plugins registrados:

- `SplitText`: palavras do título e títulos dos beats;
- `CustomEase`: curva `manifesto-focus`;
- `MorphSVGPlugin`: transformação das formas de ritmo e forma;
- `MotionPathPlugin`: órbita da tag;
- `ScrollTrigger`: timeline scrubbada e pin da seção independente.

Configuração:

- manifesto normal: `trigger: section`, `start: 'top top'`, `pin: pin`;
- manifesto embutido no hero: `trigger: main`, início em `2.2vh` convertido
  para pixels, `pin: false`;
- `scrub: 1.05`;
- duração vertical: `max(3.35 * viewportHeight, 2500)`;
- `onUpdate` sincroniza beat ativo, contador e `aria-hidden`.

Labels da timeline:

| Label | Nome técnico | Função |
| --- | --- | --- |
| `thesis` | `ManifestoThesisReveal` | entrada palavra a palavra do título inicial |
| `converge` | `ManifestoKeywordConvergence` | palavras-chave entram e convergem para o stack |
| `rhythm` | `ManifestoRhythmBeat` | segundo beat, rotação dos cards, órbita e morph para ritmo |
| `form` | `ManifestoFormBeat` | terceiro beat, morph para forma e reorganização do stack |
| `release` | `ManifestoReleaseToCard` | saída da história, redução dos cards e composição final |

### `ManifestoPointerParallax`

Quatro canais `gsap.quickTo()` respondem ao ponteiro:

- `frameX` e `frameY`: deslocamento do stack;
- `atmosphereX` e `atmosphereY`: deslocamento sutil da atmosfera.

O movimento é ignorado quando o progresso da timeline chega a `0.78`, para não
competir com o release final. Os listeners `pointermove` e `pointerleave` são
removidos pela função de cleanup do `matchMedia`.

### Estado inicial e cleanup

O stack, cards, keywords, progress, closing e projects são posicionados com
`gsap.set()` dentro do contexto desktop com movimento habilitado. O manifesto
embutido começa apenas com a frase inicial; o título e os demais beats entram
pela timeline depois do portal.

`media.revert()` desmonta a composição por breakpoint; os `SplitText` são
revertidos e a timeline é destruída. Isso é importante quando a mesma rota é
montada novamente ou quando o viewport muda de faixa.

## 3. Reveals compartilhados da home

### `HomeBlurRevealBatch`

**Arquivo:** `features/portfolio/shared/motion/blurRevealMotion.ts`

Seleciona `[data-motion="blur-reveal"]`, define estado inicial com
`autoAlpha: 0`, `filter: blur(14px)` e `y: 36`, e cria um único
`ScrollTrigger.batch`:

- `start: 'top 88%'`;
- `once: true`;
- entrada com `stagger: 0.1`, `power3.out` e blur removido.

É usado pelo bloco de About, Contact e shell de Skills. O retorno destrói cada
instância do batch.

### `HeadingSplitRevealTimeline`

**Arquivo:** `features/portfolio/shared/motion/headingSplitMotion.ts`

Componente reutilizável `HeadingSplit` com registro por elemento em
`WeakMap<HTMLElement, cleanup>` para impedir dois `SplitText` ou dois triggers
no mesmo heading.

- separa `words,chars` com `SplitText`;
- protege as máscaras para acentos e tracking;
- estado inicial: `autoAlpha: 0`, blur e `y`;
- timeline raiz com `ScrollTrigger`;
- padrão: `start: 'top 85%'`, `end: 'bottom 15%'`;
- fora de pin: `restart reverse restart reverse`;
- dentro de contexto pinado: `play none none none`.

O cleanup mata a timeline, chama `split.revert()` e remove o elemento do
`WeakMap`. Em detalhes de projeto, `createDetailHeadingSplits()` registra os
headings da página como um grupo, enquanto o registro evita duplicação com os
componentes `HeadingSplit` declarados no JSX.

### `ProjectsAboutTransitionTimeline`

**Arquivo:** `features/portfolio/shell/portfolioHomeMotion.ts`

Ponte scrubbada entre Projects e About:

- trigger: `[data-motion="about-section"]`;
- `start: 'top 90%'`;
- `end: 'top top'`;
- `scrub: 0.9`;
- grade determinística de `18 × 15` pixels;
- pixels entram em diagonal usando delays pré-calculados;
- About sobe de `y: 100`, blur e `rotateX: 10` para o estado final;
- pixels reduzem para `scale: 0.35` e desaparecem no fim.

### `HomeNavigationStateTrigger`

Trigger discreto sem timeline longa:

- `trigger: main`;
- `start: 'top -80'`;
- `onEnter`: define `data-state="scrolled"`;
- `onLeaveBack`: remove o atributo.

O componente de navegação usa esse atributo para a transição CSS de largura,
fundo, sombra e backdrop blur.

### `HomeHashAnchorNormalizer`

Correção de sincronização de rota. Quando a home é montada com hash, o alvo é
reaplicado depois de dois `requestAnimationFrame()`:

1. `ScrollTrigger.refresh()` recalcula pins e spacers;
2. a posição documentada do alvo é lida;
3. `window.scrollTo(..., behavior: 'instant')` alinha a seção.

Esse passo evita o bug em que `/projetos/regula` → `/#projetos` parava em
`scrollY` intermediário dentro do `HeroPortalPin`.

## 4. Projects

### `ProjectsAgendaEnter`

**Arquivo:** `features/portfolio/sections/projects/projectsAgendaMotion.ts`

Entrada imediata com `gsap.from()` para cabeçalho, capa, cards e arquivo:

- `autoAlpha: 0`;
- `y: 22`;
- `duration: 0.7`;
- `stagger: 0.075`;
- `power3.out`.

Não usa `ScrollTrigger`; a criação dentro de `useGSAP` garante revert quando a
home sai da árvore.

### `ProjectElasticHoverObserver`

Cada card recebe um `Observer` de ponteiro. No hover, o card sobe `16px` com
`elastic.out(1, 0.3)`; no fim do hover retorna a `y: 0`. Os callbacks usam
`contextSafe`, têm `overwrite: 'auto'` e o cleanup mata observers e tweens.

É uma interação de hover deliberadamente mais expressiva que o restante do
site; em touch e movimento reduzido não é criada.

### Hover CSS e `ProjectShaderGradient`

Além do GSAP, os cards usam transições CSS para borda, sombra, escala e rotação
dos elementos gráficos. `ProjectShaderGradient` usa
`@shadergradient/react`, `ResizeObserver`, `lazyLoad` e `prefers-reduced-motion`
para controlar a animação de shader; ele não é uma timeline GSAP.

## 5. Skills

### `SkillsHorizontalTrackController`

**Arquivo:** `features/portfolio/sections/skills/skillsMotion.ts`

É um controller imperativo, não uma timeline única. O CSS mantém o shell
`sticky`; o GSAP atualiza apenas o `transform: translateX()` do track.

- **ID:** `skills-horizontal-track`;
- trigger: `#skills-title`;
- início: `center center`;
- fim: `+=pinDistance`;
- `pinDistance = maxTranslate + 0.14 * viewportHeight`;
- `onUpdate`: converte progresso vertical em posição horizontal;
- `onRefresh`: mede card, gap, `scrollWidth` e viewport novamente;
- `invalidateOnRefresh: true`.

### `SkillsActiveCardStateTransition`

Quando o índice ativo muda:

- card ativo expande o `height` do copy até `scrollHeight`;
- descrições alternam `opacity` e `y`;
- botões da navegação sobem ou descem conforme o índice;
- vídeos são pausados/resetados ou reproduzidos para o card ativo.

As alterações de altura são intencionais: o texto precisa revelar conteúdo
real. Todas as transições usam `overwrite: true` para evitar tweens concorrentes
quando scroll, drag e navegação acontecem próximos.

### `SkillsPointerDragGesture`

Listeners `pointerdown`, `pointermove`, `pointerup` e `pointercancel` controlam
o track no desktop. O movimento é limitado entre `0` e `maxTranslate`; ao
soltar, o índice mais próximo é calculado e a janela faz scroll suave até a
posição correspondente.

No mobile, o track volta ao fluxo nativo e cada botão usa
`scrollIntoView({ behavior: 'smooth' })`. Em movimento reduzido, nenhum
`ScrollTrigger` ou listener de drag é criado e os cards ficam empilhados.

## 6. Detalhe de projeto

### `ProjectDetailIntroTimeline`

**Arquivo:** `features/portfolio/project-detail/projectDetailMotion.ts`

Timeline de entrada da rota de detalhe:

- targets: `[data-detail-intro] > *` e `[data-detail-visual]`;
- `autoAlpha: 0`, `y: 35`;
- `duration: 0.8`;
- `stagger: 0.1`;
- `power3.out`.

### `ProjectDetailHeadingSplit`

`createDetailHeadingSplits()` percorre `h1, h2` dentro da página e delega ao
`HeadingSplitRevealTimeline`. O registro em WeakMap evita disputa entre esse
orquestrador e instâncias `HeadingSplit` renderizadas no conteúdo.

### `ProjectDetailVisualParallax`

Tween GSAP ligado ao hero do detalhe:

- trigger: `[data-detail-hero]`;
- `start: 'top top'`;
- `end: 'bottom top'`;
- `scrub: 1`;
- alvo: `[data-project-visual]`;
- movimento: `yPercent: -5`.

O parallax usa `ease: 'none'`, deixando a posição proporcional ao scroll.

### `DetailLayoutRefreshCoordinator`

Imagens e fontes podem alterar a altura do layout. O detalhe agenda no máximo
um refresh por frame com `requestAnimationFrame`; listeners de `load`, a promise
de `document.fonts.ready` e o frame pendente são removidos ou cancelados no
cleanup.

### `DetailScrollRestorationGuard`

A rota salva o valor anterior de `window.history.scrollRestoration`, usa
`manual` enquanto está montada e restaura o valor original ao desmontar. Isso
impede que a página de detalhe contamine a próxima montagem da home.

## 7. Cursor de projeto

### `ProjectCursorFollow`

**Arquivo:** `features/portfolio/projects/cursor/projectCursorMotion.ts`

Cursor customizado para ponteiro de mouse:

- posição X/Y com `gsap.quickTo()`;
- atraso de `0.28s`, `power3.out`;
- entrada imediata na primeira posição para evitar viagem desde coordenadas
  antigas;
- show: `autoAlpha`, `scale`, largura medida do conteúdo;
- hide: `autoAlpha: 0`, `scale: 0.78`, `width: 0`;
- `overwrite: 'auto'` em show/hide;
- desabilitado quando não há hover fine ou há movimento reduzido.

O provider cancela o `requestAnimationFrame` de reveal ao trocar rapidamente de
card. O hook remove listeners de media query e mata tweens no cleanup.

## 8. `ScrollSplitCard` — animação não-GSAP

**Arquivo:** `components/ui/scroll-split-card.tsx`

O card de detalhes usa Framer Motion, não GSAP. Ele deve ser tratado como uma
unidade independente para não misturar dois controladores de scroll no mesmo
elemento.

### `ScrollSplitCardProgressController`

`useScroll()` mede o progresso do container de `500vh` com offset
`['start start', 'end end']`. `useTransform()` mapeia esse progresso em fases:

1. `0 → 0.32`: separação dos três painéis, escala para `0.9` e alteração de
   bordas/sombra;
2. `0.32 → 0.72`: flip 3D de `rotateY: 0 → 180`, com rotação Z oposta nas
   laterais;
3. `0.8 → 1`: cards sobem, texto final aparece, escala para `1.1` e tecnologias
   entram.

### `TechPopoverPresence`

`AnimatePresence` controla o tooltip de cada tecnologia. O botão usa spring para
   estado ativo/inativo; o tooltip usa entrada com `opacity`, `y` e `scale`, e
   saída curta com `exit`.

## Checklist para reutilizar uma animação

1. Renderize alvos sem depender do estado final aplicado por JavaScript.
2. Crie a animação dentro de `useGSAP({ scope: root })`.
3. Coloque o `ScrollTrigger` na timeline raiz, nunca em tweens internos de uma
   timeline.
4. Use labels e position parameters para nomear fases e reduzir delays soltos.
5. Meça layout em `onRefresh` ou em uma função dinâmica; não congele offsets
   dependentes de viewport.
6. Anime `transform`, `opacity` e blur curto; evite layout salvo quando a altura
   do conteúdo realmente precisa ser revelada.
7. Use `quickTo()` em ponteiro ou valores atualizados frequentemente.
8. Para rotas React, mate/reverta timelines, triggers, observers, splits,
   listeners e frames pendentes.
9. Defina uma estratégia explícita para `prefers-reduced-motion` e mobile.
10. Depois de imagens, fontes, abertura de conteúdo ou mudança de layout,
    chame `ScrollTrigger.refresh()` de forma agrupada.

## Arquivos de referência

- [Hero motion](../features/portfolio/sections/hero/heroMotion.ts)
- [Manifesto motion](../features/portfolio/sections/manifesto/manifestoStoryMotion.ts)
- [Home orchestration](../features/portfolio/shell/portfolioHomeMotion.ts)
- [Shared blur reveal](../features/portfolio/shared/motion/blurRevealMotion.ts)
- [Shared heading split](../features/portfolio/shared/motion/headingSplitMotion.ts)
- [Projects motion](../features/portfolio/sections/projects/projectsAgendaMotion.ts)
- [Skills motion](../features/portfolio/sections/skills/skillsMotion.ts)
- [Detail motion](../features/portfolio/project-detail/projectDetailMotion.ts)
- [Project cursor motion](../features/portfolio/projects/cursor/projectCursorMotion.ts)
- [Scroll split card](../components/ui/scroll-split-card.tsx)
